import {
  useState,
  useEffect,
  createContext,
  FC,
  useContext,
  useCallback,
} from "react";
import { supabase } from "../supabase";
import { AuthenticatedUsersType } from "@common/types/supabase_DEPRECATED";

export const AuthProvider: FC = ({ children }) => {
  const [authenticatedUser, setUser] = useState<
    AuthContextType["authenticatedUser"]
  >();
  const [isLoadingAuth, setLoading] = useState<
    AuthContextType["isLoadingAuth"]
  >(true);
  const [accessToken, setAccessToken] = useState<
    AuthContextType["accessToken"]
  >(null);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setAccessToken(session?.access_token ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setAccessToken(session?.access_token ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signIn: supabase.auth.signIn.bind(supabase.auth),
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

const signUp = async ({
  username,
  email,
}: SignUpDataType): Promise<{
  error: Error | null;
}> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow" as const,
    body: JSON.stringify({ name: username, email }),
  };

  const baseUrl = process.env.NEXT_PUBLIC_TOKEN_API_URL || "";
  const url = `${baseUrl}/api/v3/signup`;
  try {
    const response = await fetch(url, requestOptions);
    const jsonResponse = (await response.json()) as {
      error?: string;
      message?: string;
      statusCode?: number;
    };
    if (jsonResponse.statusCode !== 200)
      return { error: new Error(jsonResponse.message) };
    return { error: null };
  } catch (e) {
    return { error: e as Error };
  }
};
interface AuthContextType {
  signIn: typeof supabase.auth.signIn;
  signOut: typeof supabase.auth.signOut;
  authenticatedUser: AuthenticatedUsersType | null;
  isLoadingAuth: boolean;
  accessToken: string | null;
}

const defaultValue = {
  signIn: supabase.auth.signIn.bind(supabase.auth),
  signUp: supabase.auth.signIn.bind(supabase.auth),
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
  const authContext = useContext(AuthContext);
  const { signIn, ...auth } = authContext;
  const [magicLinkWasSent, setMagicLinkWasSent] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signInHandler = useCallback(
    async (data: { email: string }): Promise<void> => {
      setIsAuthenticating(true);
      const { error } = await signIn(data);

      if (error) setError(error.message);
      if (!error) setMagicLinkWasSent(true);
      setIsAuthenticating(false);
    },
    [signIn, setMagicLinkWasSent, setIsAuthenticating]
  );

  const signUpHandler = useCallback(
    async (data: { username: string; email: string }): Promise<void> => {
      setIsAuthenticating(true);
      const { error } = await signUp(data);

      if (error) setError(error.message);
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
