import { useState, useEffect, createContext, FC, useContext } from "react";
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
  signUp: typeof supabase.auth.signUp;
  signIn: typeof supabase.auth.signIn;
  signOut: typeof supabase.auth.signOut;
  authenticatedUser: SupabaseUserType | null;
  isLoadingAuth: boolean;
}

const defaultValue = {
  signUp: supabase.auth.signUp.bind(supabase.auth),
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
    signUp: supabase.auth.signUp.bind(supabase.auth),
    signIn: supabase.auth.signIn.bind(supabase.auth),
    signOut: supabase.auth.signOut.bind(supabase.auth),
    authenticatedUser: authenticatedUser ?? null,
    isLoadingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  return auth;
};
