import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";
import React, { FC, useState } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { useUserData } from "@lib/hooks/useUserData";
import { TextLink } from "@components/TextLink";
import { Alert } from "@components/Alert";
import { TokenForm } from "@components/TokenForm";
import { TokenItem } from "@components/TokenItem";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { TokenCreationModal } from "@components/TokenCreationModal";
import { TokenDeletionModal } from "@components/TokenDeletionModal";
import { useUserTokens } from "@lib/hooks/useUserTokens";
import { useRouter } from "next/router";
import { useAccountData } from "@lib/hooks/useAccountData";

type TokenType = Omit<definitions["auth_tokens"], "id">;

interface AccountTokensPagePropType {
  routeAccount: AccountWithSensorsType;
}

const AccountTokensPage: FC<AccountTokensPagePropType> = () => {
  const { query } = useRouter();
  const { account: routeAccount } = useAccountData({
    username: typeof query?.username === "string" ? query.username : undefined,
  });
  const { isLoggedIn, user: loggedInAccount } = useUserData();
  const account =
    loggedInAccount?.username === routeAccount?.username
      ? loggedInAccount
      : routeAccount;
  const isOwnerAndLoggedIn =
    isLoggedIn && loggedInAccount?.username === routeAccount?.username;

  const [deleteIsInitiated, setDeleteIsInitiated] = useState(false);
  const [touchedToken, setTouchedToken] = useState<TokenType | undefined>(
    undefined
  );

  const { tokens, createToken, deleteToken, regenerateToken, error } =
    useUserTokens();

  const [newToken, setNewToken] = useState<string | undefined>(undefined);
  const [newTokenDescription, setNewTokenDescription] = useState<
    string | undefined
  >(undefined);
  const isLoading = !tokens || !account;

  return (
    <>
      <UserInfoWithData
        routeAccount={account || undefined}
        isLoading={isLoading}
        activeTab='tokens'
      />
      {!isOwnerAndLoggedIn && !isLoading && (
        <div
          className='container max-w-8xl mx-auto px-4 py-8'
          id='tab-content'
          role='tabpanel'
        >
          <Alert
            type='warning'
            title='Du bist nicht eingeloggt!'
            message={
              <span className='flex gap-4'>
                Du kannst hier nur deine Tokens sehen wenn du eingeloggt bist
                <TextLink href='/signin'>Einloggen</TextLink>
              </span>
            }
          />
        </div>
      )}
      {isOwnerAndLoggedIn && (
        <div className='container max-w-8xl mx-auto px-4 py-16'>
          {error && (
            <div className='mb-8'>
              <Alert
                title='Fehler:'
                message={
                  <>
                    Ein unerwarteter Fehler ist aufgetreten.
                    <code className='ml-4 px-2 py-1 font-mono bg-error bg-opacity-20'>
                      {error}
                    </code>
                  </>
                }
                type='error'
              />
            </div>
          )}
          <TokenForm
            onSubmit={async tokenDescription => {
              const tokenResponse = await createToken(tokenDescription);
              setNewToken(tokenResponse.data.token);
              setNewTokenDescription(tokenDescription);
            }}
          />
          {tokens && tokens.length === 0 && (
            <div className='text-gray-500 text-center mt-12'>
              Noch keine Tokens vorhanden.
            </div>
          )}
          {tokens &&
            tokens.length > 0 &&
            tokens.map(token => {
              return (
                <TokenItem
                  key={`token-${token.nice_id}`}
                  description={token.description}
                  onRegenerate={async () => {
                    const tokenResponse = await regenerateToken(token.nice_id);
                    setNewToken(tokenResponse.data.token);
                    setNewTokenDescription(token.description);
                  }}
                  onInitiateDelete={() => {
                    setTouchedToken(token);
                    setDeleteIsInitiated(true);
                  }}
                />
              );
            })}
        </div>
      )}
      {newToken && newTokenDescription && (
        <TokenCreationModal
          tokenDescription={newTokenDescription}
          token={newToken}
          onClose={() => {
            setNewToken(undefined);
            setNewTokenDescription(undefined);
          }}
        />
      )}
      {deleteIsInitiated && touchedToken && (
        <TokenDeletionModal
          tokenDescription={touchedToken.description}
          onDelete={() => {
            void deleteToken(touchedToken.nice_id);
            setTouchedToken(undefined);
            setDeleteIsInitiated(false);
          }}
          onCancel={() => {
            setTouchedToken(undefined);
            setDeleteIsInitiated(false);
          }}
        />
      )}
    </>
  );
};

export default AccountTokensPage;
