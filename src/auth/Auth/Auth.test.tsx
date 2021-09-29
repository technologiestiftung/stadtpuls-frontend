import { supabase } from "@auth/supabase";
import { act, render, screen, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { AuthProvider, useAuth } from ".";

const createChildComponent = ({
  isReady = () => true,
  inEffect = () => undefined,
}: {
  isReady?: (auth: ReturnType<typeof useAuth>) => boolean;
  inEffect?: (auth: ReturnType<typeof useAuth>) => Promise<void> | void;
}): FC => {
  const ChildComponent: FC = () => {
    const auth = useAuth();
    useEffect(() => {
      void inEffect(auth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ready = isReady(auth);
    return <div>{ready && "READY"}</div>;
  };
  return ChildComponent;
};

describe("AuthProvider", () => {
  it("should provide its children with context values", async () => {
    const ChildComponent = createChildComponent({
      isReady: auth =>
        !!(
          typeof auth?.isLoadingAuth !== "undefined" &&
          auth?.authenticatedUser === null &&
          auth?.error === null &&
          typeof auth?.signIn === "function" &&
          typeof auth?.signUp === "function" &&
          typeof auth?.signOut === "function" &&
          auth?.magicLinkWasSent === false &&
          auth?.isAuthenticating === false
        ),
    });
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => expect(screen.getByText("READY")).toBeInTheDocument());
  });
});

describe.skip("signIn aka. Authentication", () => {
  it("should send a magic link after authenticating", async () => {
    const ChildComponent = createChildComponent({
      isReady: auth => !!(auth.magicLinkWasSent && !auth.isAuthenticating),
      inEffect: auth => auth.signIn({ email: "contact@example.com" }),
    });
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("READY")).toBeInTheDocument();
    });
  });
  it("should signUp with errors", async () => {
    const ChildComponent = createChildComponent({
      isReady: auth => !!auth.error,
      inEffect: auth =>
        auth.signUp({
          username: "test",
          email: "spam@youdontwant.inyourinbox",
        }),
    });
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("READY")).toBeInTheDocument();
    });
  });
  it("should retrieve the user from the session", async () => {
    const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);
    supabase.auth.session = jest.fn().mockReturnValue({
      user: {
        email: "contact@example.com",
      },
    });
    const ChildComponent = createChildComponent({
      isReady: auth => auth.authenticatedUser?.email === "contact@example.com",
    });
    act(() => {
      render(
        <AuthProvider>
          <ChildComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("READY")).toBeInTheDocument();
      supabase.auth.session = oldSessionFuncion;
    });
  });
});

describe("signOut", () => {
  it("should signOut", async () => {
    const signOutMock = jest
      .fn()
      .mockReturnValue(Promise.resolve({ error: false }));
    supabase.auth.signOut = signOutMock;
    const ChildComponent = createChildComponent({
      inEffect: auth => void auth.signOut(),
    });
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
