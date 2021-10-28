import {
  useState,
  useEffect,
  createContext,
  FC,
  useContext,
  useCallback,
} from "react";
import { supabase } from "../supabase";
import { AuthenticatedUsersType } from "@common/types/authenticated_user";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { useRouter } from "next/router";

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();
  const [authenticatedUser, setUser] =
    useState<AuthContextType["authenticatedUser"]>();
  const [isLoadingAuth, setLoading] =
    useState<AuthContextType["isLoadingAuth"]>(true);
  const [accessToken, setAccessToken] =
    useState<AuthContextType["accessToken"]>(null);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setAccessToken(session?.access_token ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        if (user) {
          setUser(user);
          setAccessToken(session?.access_token ?? null);
        } else {
          void router.push("/");
        }
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, [router]);

  const value = {
    signOut: supabase.auth.signOut.bind(supabase.auth),
    authenticatedUser: authenticatedUser ?? null,
    isLoadingAuth,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface SignUpDataType {
  username: string;
  email: string;
}

const handleSigningCall = async (
  route: "signin" | "signup",
  body: {
    name?: string;
    email: string;
  }
): Promise<{
  error: string | null;
}> => {
  const defaultErrorMessage = "Es ist ein Fehler bei der Anmeldung aufgetreten";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow" as const,
    body: JSON.stringify(body),
  };

  const url = createApiUrl(`/${route}`);
  try {
    const response = await fetch(url, requestOptions);
    const textResponse = await response.text();
    if (!textResponse) return { error: null };
    const jsonResponse = (await JSON.parse(textResponse)) as {
      error?: string;
      message?: string;
      statusCode?: number;
    };
    if (jsonResponse.statusCode !== 204)
      return {
        error: jsonResponse.message || defaultErrorMessage,
      };
    return { error: null };
  } catch (e) {
    const error = new Error(e as string);
    return {
      error: error.message || defaultErrorMessage,
    };
  }
};

const signUp = async ({
  username,
  email,
}: SignUpDataType): Promise<{
  error: string | null;
}> => handleSigningCall("signup", { name: username, email });

const signIn = async ({
  email,
}: Omit<SignUpDataType, "username">): Promise<{
  error: string | null;
}> => handleSigningCall("signin", { email });

interface AuthContextType {
  signOut: typeof supabase.auth.signOut;
  authenticatedUser: AuthenticatedUsersType | null;
  isLoadingAuth: boolean;
  accessToken: string | null;
}

const defaultValue = {
  signIn,
  signUp,
  signOut: supabase.auth.signOut.bind(supabase.auth),
  authenticatedUser: null,
  isLoadingAuth: true,
  accessToken: null,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthHookReturnType extends Omit<AuthContextType, "signIn"> {
  magicLinkWasSent: boolean;
  isAuthenticating: boolean;
  error: string | null;
  signUp: (data: SignUpDataType) => Promise<void>;
  signIn: (data: { email: string }) => Promise<void>;
}

export const useAuth = (): AuthHookReturnType => {
  const auth = useContext(AuthContext);
  const [magicLinkWasSent, setMagicLinkWasSent] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signInHandler = useCallback(
    async (data: { email: string }): Promise<void> => {
      setIsAuthenticating(true);
      setMagicLinkWasSent(false);
      const { error } = await signIn(data);

      if (error) setError(error);
      if (!error) setMagicLinkWasSent(true);
      setIsAuthenticating(false);
    },
    [setMagicLinkWasSent, setIsAuthenticating]
  );

  const signUpHandler = useCallback(
    async (data: { username: string; email: string }): Promise<void> => {
      setIsAuthenticating(true);
      setMagicLinkWasSent(false);
      const { error } = await signUp(data);

      if (error) setError(error);
      if (!error) setMagicLinkWasSent(true);
      setIsAuthenticating(false);
    },
    [setMagicLinkWasSent, setIsAuthenticating]
  );
  return {
    ...auth,
    error,
    magicLinkWasSent,
    isAuthenticating,
    signIn: signInHandler,
    signUp: signUpHandler,
  };
};
