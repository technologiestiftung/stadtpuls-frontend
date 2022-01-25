export interface SessionType {
  currentSession: {
    provider_token: unknown;
    access_token: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    token_type: string;
    user: {
      id: string;
      aud: string;
      role: string;
      email: string;
      email_confirmed_at: string;
      phone: string;
      confirmation_sent_at: string;
      confirmed_at: string;
      recovery_sent_at: string;
      last_sign_in_at: string;
      app_metadata: unknown;
      user_metadata: unknown;
      identities: unknown;
      created_at: string;
      updated_at: string;
    };
  };
  expiresAt: number;
}

export interface AuthRelevantSessionData {
  currentSession: {
    access_token: SessionType["currentSession"]["access_token"];
    user: SessionType["currentSession"]["user"];
  };
}

/**
 * Function to programmatically authenticate using an email/password combination.
 * @example getSession({ email: "user@email.com", password: "super-secret-password" })
 */
export const getSession = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthRelevantSessionData> => {
  try {
    const authResponse = await fetch(
      `${Cypress.env("supabase_url")}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: new Headers({
          apikey: `${Cypress.env("supabase_public_key")}`,
        }),
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const authBody = (await authResponse.json()) as Partial<
      SessionType["currentSession"]
    >;

    const session = {
      currentSession: {
        access_token: authBody.access_token,
        user: authBody.user,
      },
    };
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
