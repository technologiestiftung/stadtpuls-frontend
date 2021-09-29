import { definitions } from "@common/types/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";

type TokenType = Omit<definitions["auth_tokens"], "id">;
type AccessTokenType = string;

interface CreateTokenPayload {
  scope?: TokenType["scope"];
  description: TokenType["description"];
}

export interface CreateTokenResponseSignature {
  method: string;
  url: string;
  data: {
    token: string;
    nice_id: number;
  };
}

type CreateUserTokenSignature = (
  params: CreateTokenPayload & {
    accessToken: AccessTokenType;
  }
) => Promise<CreateTokenResponseSignature>;

export const createUserToken: CreateUserTokenSignature = async ({
  accessToken,
  ...payload
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow" as const,
    body: JSON.stringify(payload),
  };

  const response = await fetch(createTokenApiUrl(), requestOptions);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  if (response.status !== 201) {
    throw new Error(
      `Wrong status code ${response.status} for successful token creation response`
    );
  }
  const parsedTokenResponse = (await response.json()) as CreateTokenResponseSignature;
  return parsedTokenResponse;
};
