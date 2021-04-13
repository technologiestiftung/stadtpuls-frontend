import {
  useState,
  useEffect,
  createContext,
  FC,
  useContext,
  useCallback,
} from "react";
import { supabase } from "../supabase";

interface SupabaseUserType {
  id: string;
  app_metadata: {
    provider?: string;
    [key: string]: unknown;
  };
  user_metadata: {
    [key: string]: unknown;
  };
  aud: string;
  confirmation_sent_at?: string;
  email?: string;
  created_at: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
}

interface AuthContextType {
  signIn: typeof supabase.auth.signIn;
  signOut: typeof supabase.auth.signOut;
  authenticatedUser: SupabaseUserType | null;
  isLoadingAuth: boolean;
}

const defaultValue = {
  signIn: supabase.auth.signIn.bind(supabase.auth),
  signOut: supabase.auth.signOut.bind(supabase.auth),
  authenticatedUser: null,
  isLoadingAuth: true,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: FC = ({ children }) => {
  const [authenticatedUser, setUser] = useState<
    AuthContextType["authenticatedUser"]
  >();
  const [isLoadingAuth, setLoading] = useState<
    AuthContextType["isLoadingAuth"]
  >(true);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface AuthHookReturnType extends Omit<AuthContextType, "signIn"> {
  magicLinkWasSent: boolean;
  isAuthenticating: boolean;
  error: string | null;
  authenticate: (data: { email: string }) => void;
}

export const useAuth = (): AuthHookReturnType => {
  const { signIn, ...auth } = useContext(AuthContext);
  const [magicLinkWasSent, setMagicLinkWasSent] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(
    async (data: { email: string }): Promise<void> => {
      setIsAuthenticating(true);
      const { error } = await signIn(data);

      if (error) setError(error.message);
      if (!error) setMagicLinkWasSent(true);
      setIsAuthenticating(false);
    },
    [signIn, setMagicLinkWasSent, setIsAuthenticating]
  );
  return { ...auth, error, magicLinkWasSent, isAuthenticating, authenticate };
};
