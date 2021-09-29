import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { AccessTokenType, TokenType } from ".";

interface RegenerateTokenPayload {
  nice_id: TokenType["nice_id"];
}

export interface RegenerateTokenResponseSignature {
  method: string;
  url: string;
  data: {
    token: string;
    nice_id: number;
  };
}

type RegenerateUserTokenSignature = (
  params: RegenerateTokenPayload & {
    accessToken: AccessTokenType;
  }
) => Promise<RegenerateTokenResponseSignature>;

export const regenerateUserToken: RegenerateUserTokenSignature = async ({
  accessToken,
  ...payload
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow" as const,
    body: JSON.stringify(payload),
  };

  const tokenResponse = await fetch(createTokenApiUrl(), requestOptions);
  const parsedTokenResponse = (await tokenResponse.json()) as RegenerateTokenResponseSignature;
  return parsedTokenResponse;
};
