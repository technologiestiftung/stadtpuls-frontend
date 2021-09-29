import { useAuth } from "@auth/Auth";
import { definitions } from "@common/types/supabase";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import {
  CreateTokenResponseSignature,
  createUserToken,
} from "../../requests/createUserToken";
import { deleteUserToken } from "../../requests/deleteUserToken";
import { getUserTokens } from "../../requests/getUserTokens";
import {
  RegenerateTokenResponseSignature,
  regenerateUserToken,
} from "../../requests/regenerateUserToken";

export type TokenType = Omit<definitions["auth_tokens"], "id">;
export type AccessTokenType = string;

const getTokensSWRFetcher = async (
  accessToken: AccessTokenType | null
): Promise<TokenType[] | null> => {
  if (!accessToken) return null;

  return getUserTokens(accessToken);
};

interface UserTokensHookReturnType {
  tokens: TokenType[] | null;
  error: Error | null;
  createToken: (
    description: TokenType["description"]
  ) => Promise<CreateTokenResponseSignature>;
  deleteToken: (nice_id: TokenType["nice_id"]) => Promise<void>;
  regenerateToken: (
    nice_id: TokenType["nice_id"]
  ) => Promise<RegenerateTokenResponseSignature>;
}

export const useUserTokens = (): UserTokensHookReturnType => {
  const { accessToken, authenticatedUser } = useAuth();

  const tokensParams = ["use-user-tokens", accessToken];
  const { data: tokens, error } = useSWR<TokenType[] | null, Error>(
    tokensParams,
    () => getTokensSWRFetcher(accessToken)
  );

  const createToken = useCallback(
    async (description: string) => {
      if (!accessToken || !authenticatedUser?.id)
        throw new Error("Invalid accessToken while creating a token");
      const token = await createUserToken({
        description,
        accessToken,
      });
      await mutate(["use-user-tokens", accessToken]);
      return token;
    },
    [accessToken, authenticatedUser?.id]
  );

  const deleteToken = useCallback(
    async (nice_id: definitions["auth_tokens"]["nice_id"]) => {
      if (!accessToken || !authenticatedUser?.id)
        throw new Error("Invalid accessToken while deleting a token");
      await deleteUserToken({
        nice_id,
        accessToken,
      });
      await mutate(["use-user-tokens", accessToken]);
    },
    [accessToken, authenticatedUser?.id]
  );

  const regenerateToken = useCallback(
    async (nice_id: definitions["auth_tokens"]["nice_id"]) => {
      if (!accessToken || !authenticatedUser?.id)
        throw new Error("Invalid accessToken while regenerating a token");
      const token = await regenerateUserToken({
        nice_id,
        accessToken,
      });
      await mutate(["use-user-tokens", accessToken]);
      return token;
    },
    [accessToken, authenticatedUser?.id]
  );

  return {
    tokens: tokens || null,
    error: error || null,
    createToken: createToken,
    deleteToken: deleteToken,
    regenerateToken: regenerateToken,
  };
};
