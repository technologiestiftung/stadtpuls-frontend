import { definitions } from "@common/types/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";

type TokenType = Omit<definitions["auth_tokens"], "id">;
type AccessTokenType = string;

type GetUserTokensSignature = (
  accessToken: AccessTokenType
) => Promise<TokenType[]>;

export const getUserTokens: GetUserTokensSignature = async accessToken => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  const url = createTokenApiUrl();

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(await response.text());
  }
  if (response.status !== 200) {
    throw new Error(
      `Wrong status code ${response.status} for successful tokens response`
    );
  }

  const parsedResponse = await (response.json() as Promise<{
    data: TokenType[];
  }>);

  return parsedResponse.data;
};
