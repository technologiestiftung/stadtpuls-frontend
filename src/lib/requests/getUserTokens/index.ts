import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { createApiUrl } from "@lib/requests/createApiUrl";

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

  const url = createApiUrl("/authtokens");

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
