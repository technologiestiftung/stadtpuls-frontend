import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { useUserData } from "@lib/hooks/useUserData";
import { TextLink } from "@components/TextLink";
import { Alert } from "@components/Alert";
import { TokenForm } from "@components/TokenForm";
import { TokenItem } from "@components/TokenItem";
import { definitions } from "@common/types/supabase";
import { TokenCreationModal } from "@components/TokenCreationModal";
import { TokenDeletionModal } from "@components/TokenDeletionModal";

type TokenType = Omit<definitions["auth_tokens"], "id">;

const tokens: TokenType[] = [
  {
    description: "My first token",
    nice_id: 19,
    scope: "sudo",
    user_id: "my-user-id",
  },
  {
    description: "Another token",
    nice_id: 55,
    scope: "sudo",
    user_id: "my-user-id",
  },
  {
    description: "Token Token Token",
    nice_id: 329,
    scope: "sudo",
    user_id: "my-user-id",
  },
];

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const username = context.query.username;
    if (!username || Array.isArray(username)) return { notFound: true };

    const routeAccount = await getAccountDataByUsername(username);
    return { props: { routeAccount, error: null } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountTokensPagePropType {
  routeAccount: ParsedAccountType;
}

const AccountTokensPage: FC<AccountTokensPagePropType> = ({ routeAccount }) => {
  const { isLoggedIn, user: loggedInAccount } = useUserData();
  const account =
    loggedInAccount?.username === routeAccount?.username
      ? loggedInAccount
      : routeAccount;
  const isOwnerAndLoggedIn =
    isLoggedIn && loggedInAccount?.username === routeAccount.username;

  const [creationModalIsOpen, setCreationModalIsOpen] = useState(false);
  const [deletionModalIsOpen, setDeletionModalIsOpen] = useState(false);
  const [touchedToken, setTouchedToken] = useState<TokenType | undefined>(
    undefined
  );
  return (
    <>
      <UserInfoWithData routeAccount={account} activeTab='tokens' />
      {!isOwnerAndLoggedIn && (
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
                <TextLink href='/login'>Einloggen</TextLink>
              </span>
            }
          />
        </div>
      )}
      {isOwnerAndLoggedIn && (
        <div className='container max-w-8xl mx-auto px-4 py-16'>
          <TokenForm
            onSubmit={() => {
              console.log("Creating token");
              // TODO: create new token
              setCreationModalIsOpen(true);
            }}
          />
          {tokens.length === 0 && (
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
                  name={token.description}
                  onRegenerate={() => {
                    console.log("Regenerating old token:", touchedToken);
                    setTouchedToken(token);
                    // TODO: delete old token and create new token
                    setCreationModalIsOpen(true);
                  }}
                  onInitiateDelete={() => {
                    console.log("Token about to be deleted");
                    setTouchedToken(token);
                    setDeletionModalIsOpen(true);
                  }}
                />
              );
            })}
        </div>
      )}
      {creationModalIsOpen && (
        <TokenCreationModal
          tokenDescription='My newly generated token'
          token='1234567'
          onClose={() => setCreationModalIsOpen(false)}
        />
      )}
      {deletionModalIsOpen && touchedToken && (
        <TokenDeletionModal
          tokenDescription={touchedToken.description}
          onDelete={() => {
            console.log("Deleting token:", touchedToken);

            // TODO: delete token
            setTouchedToken(undefined);
            setDeletionModalIsOpen(false);
          }}
          onCancel={() => {
            setTouchedToken(undefined);
            setDeletionModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default AccountTokensPage;
