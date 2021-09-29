import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { AccessTokenType, TokenType } from ".";

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

  const tokenResponse = await fetch(createTokenApiUrl(), requestOptions);
  const parsedTokenResponse = (await tokenResponse.json()) as CreateTokenResponseSignature;
  return parsedTokenResponse;
};
