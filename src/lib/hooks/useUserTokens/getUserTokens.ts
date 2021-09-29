import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { AccessTokenType, TokenType } from ".";

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

  const rawTokens = await fetch(url, requestOptions);
  const response = await (rawTokens.json() as Promise<{
    data: TokenType[];
  }>);

  return response.data;
};
