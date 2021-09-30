import { definitions } from "@common/types/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";

type TokenType = Omit<definitions["auth_tokens"], "id">;
type AccessTokenType = string;

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

  const response = await fetch(createTokenApiUrl(), requestOptions);
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const parsedTokenResponse = (await response.json()) as RegenerateTokenResponseSignature;
  return parsedTokenResponse;
};
