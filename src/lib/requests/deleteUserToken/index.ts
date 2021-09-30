import { definitions } from "@common/types/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";

type TokenType = Omit<definitions["auth_tokens"], "id">;
type AccessTokenType = string;

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

  const response = await fetch(createTokenApiUrl(), requestOptions);
  if (!response.ok) {
    throw new Error(await response.text());
  }
};
