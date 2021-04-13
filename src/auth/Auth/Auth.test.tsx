import { supabase } from "@auth/supabase";
import { act, render, screen, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from ".";

describe("AuthProvider", () => {
  it("should provide its children with context values", async () => {
    const ChildComponent: FC = () => {
      const auth = useAuth();
      const ready =
        typeof auth?.isLoadingAuth !== "undefined" &&
        auth?.authenticatedUser === null &&
        auth?.error === null &&
        typeof auth?.authenticate === "function" &&
        typeof auth?.signOut === "function" &&
        auth?.magicLinkWasSent === false &&
        auth?.isAuthenticating === false;
      return <div>{ready && "READY"}</div>;
    };
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => expect(screen.getByText("READY")).toBeInTheDocument());
  });
  it("should send a magic link after authenticating", async () => {
    const oldSignIn = supabase.auth.signIn.bind(supabase.auth);
    const signInMock = jest
      .fn()
      .mockReturnValue(Promise.resolve({ error: false }));
    supabase.auth.signIn = signInMock;
    const ChildComponent: FC = () => {
      const auth = useAuth();
      useEffect(() => {
        auth.authenticate({ email: "contact@example.com" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const ready = !!(auth.magicLinkWasSent && !auth.isAuthenticating);
      return <div>{ready && "READY"}</div>;
    };
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("READY")).toBeInTheDocument();
      expect(signInMock).toHaveBeenCalled();
      supabase.auth.signIn = oldSignIn;
    });
  });
  it("should authenticate with errors", async () => {
    const oldSignIn = supabase.auth.signIn.bind(supabase.auth);
    const signInMock = jest
      .fn()
      .mockResolvedValue({ error: new Error("WRONG") });
    supabase.auth.signIn = signInMock;
    const ChildComponent: FC = () => {
      const auth = useAuth();
      useEffect(() => {
        auth.authenticate({ email: "spam@youdontwant.inyourinbox" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <div>{auth.error}</div>;
    };
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("WRONG")).toBeInTheDocument();
      supabase.auth.signIn = oldSignIn;
    });
  });
  it("should signOut", async () => {
    const signOutMock = jest
      .fn()
      .mockReturnValue(Promise.resolve({ error: false }));
    supabase.auth.signOut = signOutMock;
    const ChildComponent: FC = () => {
      const auth = useAuth();
      useEffect(() => {
        void auth.signOut();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return <div />;
    };
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalled();
    });
  });
});
