import { useAuth } from "@auth/Auth";
import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { EditAccountModal } from "@components/EditAccountModal";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Tabs } from "@components/Tabs";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  routeAccount: ParsedAccountType;
  activeTab: "sensors" | "tokens";
}

export const getRandomSensorId = (): number =>
  Math.round(Math.random() * (32 - 1) + 1);

export const UserInfoWithData: FC<UserInfoWithDataPropType> = ({
  routeAccount,
  activeTab,
}) => {
  const router = useRouter();
  const {
    isLoggedIn,
    user: loggedInAccount,
    error,
    createSensor,
    updateUser,
    deleteUser,
  } = useUserData();
  const [randomSymbolId, setRandomSymbolId] = useState(getRandomSensorId());
  const { authenticatedUser } = useAuth();
  const isOwnerAndLoggedIn =
    isLoggedIn && loggedInAccount?.username === routeAccount.username;
  const finalAccount =
    isOwnerAndLoggedIn && loggedInAccount ? loggedInAccount : routeAccount;
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newSensorModalIsOpen, setNewSensorModalIsOpen] = useState(false);
  const [deletionConfirmationIsOpened, setDeletionConfirmationIsOpened] =
    useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);

  const activeTabIndex = activeTab === "tokens" ? 1 : 0;
  const tabs = [
    {
      id: "sensors",
      name: "Sensoren",
      href: `/accounts/${finalAccount.username}`,
    },
  ];
  if (isOwnerAndLoggedIn || activeTab === "tokens") {
    tabs.push({
      id: "tokens",
      name: "Tokens",
      href: `/accounts/${finalAccount.username}/tokens`,
    });
  }
  return (
    <>
      {newSensorModalIsOpen && (
        <EditAddSensorModal
          defaultValues={{ symbolId: randomSymbolId }}
          author={{
            authorId: finalAccount.id,
            authorName: finalAccount.displayName,
            authorUsername: finalAccount.username,
          }}
          title='Neuer Sensor hinzufügen'
          onCancel={() => setNewSensorModalIsOpen(false)}
          submitButtonText='Hinzufügen'
          onSubmit={data => {
            if (!authenticatedUser?.id) return;
            createSensor({
              ...data,
              createdAt: new Date().toISOString(),
              authorId: authenticatedUser.id,
            })
              .then(newSensorId => router.push(`/sensors/${newSensorId}`))
              .finally(() => {
                setNewSensorModalIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              });
          }}
        />
      )}
      {authenticatedUser && isOwnerAndLoggedIn && editModalIsOpen && (
        <EditAccountModal
          defaultValues={{
            ...finalAccount,
            email: authenticatedUser.email || "",
          }}
          onCancel={() => setEditModalIsOpen(false)}
          onSubmit={data => {
            updateUser({
              ...data,
              id: authenticatedUser.id,
            })
              .then(() => setShowEditSuccessAlert(true))
              .finally(() => {
                setEditModalIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              });
          }}
          onDelete={() => setDeletionConfirmationIsOpened(true)}
        />
      )}
      <div className={`border-b border-gray-200 pt-20`}>
        <div className='container max-w-8xl mx-auto px-4 relative'>
          {(error || showEditSuccessAlert) && (
            <div className={["w-full z-50"].join(" ")}>
              {error && (
                <Alert
                  type='error'
                  title='Fehler!'
                  message={
                    <>
                      {console.log(error)}
                      Beim Editieren ist ein Fehler aufgetreten:{" "}
                      {error.message && (
                        <code className='ml-4 px-2 py-1 font-mono bg-error bg-opacity-20'>
                          {error.message}
                        </code>
                      )}
                    </>
                  }
                />
              )}
              {showEditSuccessAlert && (
                <Alert
                  type='success'
                  title='Erfolg!'
                  message='Dein Account ist erfolgreich editiert worden!'
                />
              )}
            </div>
          )}
          <UserInfoHeader
            {...finalAccount}
            withEditButton={isOwnerAndLoggedIn}
            onEditButtonClick={() => {
              setEditModalIsOpen(true);
              setShowEditSuccessAlert(false);
            }}
          />
          <div className='absolute left-4 bottom-[-1px] z-10'>
            <Tabs
              tabPanelId='tab-content'
              activeTabIndex={activeTabIndex}
              tabs={tabs}
            />
          </div>
          {isOwnerAndLoggedIn && activeTab === "sensors" && (
            <span className='absolute bottom-0 sm:bottom-2 right-4'>
              <Button
                variant='primary'
                onClick={() => {
                  setNewSensorModalIsOpen(true);
                  setRandomSymbolId(getRandomSensorId());
                }}
              >
                <span className='sm:hidden'>+</span>
                <span className='hidden sm:inline'>Neuer</span> Sensor
              </Button>
            </span>
          )}
        </div>
      </div>
      {deletionConfirmationIsOpened && (
        <SmallModalOverlay
          title={`Account löschen`}
          footerContent={
            <>
              <Button
                variant='dangerous'
                onClick={() => {
                  deleteUser()
                    .then(() => router.push("/"))
                    .finally(() => {
                      setEditModalIsOpen(false);
                      setDeletionConfirmationIsOpened(false);
                    });
                }}
              >
                Unwiderruflich löschen
              </Button>
              <Button
                variant='secondary'
                onClick={() => setDeletionConfirmationIsOpened(false)}
              >
                Abbrechen
              </Button>
            </>
          }
        >
          <div className='prose max-w-none'>
            <p>Du bist dabei, dein Account zu löschen.</p>
            <p>
              <strong>Diese Aktion is unwiderruflich.</strong>
            </p>
            <p>Bist du sicher?</p>
          </div>
        </SmallModalOverlay>
      )}
    </>
  );
};
