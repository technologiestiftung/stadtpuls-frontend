import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { AccessTokenType, TokenType } from ".";

interface DeleteTokenPayload {
  nice_id: TokenType["nice_id"];
}

type DeleteUserTokenSignature = (
  params: DeleteTokenPayload & {
    accessToken: AccessTokenType;
  }
) => Promise<void>;

export const deleteUserToken: DeleteUserTokenSignature = async ({
  accessToken,
  ...payload
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow" as const,
    body: JSON.stringify(payload),
  };

  await fetch(createTokenApiUrl(), requestOptions);
};
