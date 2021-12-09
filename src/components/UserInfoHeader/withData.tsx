import { useAuth } from "@auth/Auth";
import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { EditAccountModal } from "@components/EditAccountModal";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { NUMBER_OF_SENSOR_SYMBOLS } from "@components/SensorSymbol";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Tabs } from "@components/Tabs";
import { useUserData } from "@lib/hooks/useUserData";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  routeAccount: AccountWithSensorsType;
  activeTab: "sensors" | "tokens";
}

export const getRandomSensorId = (): number =>
  Math.round(Math.random() * (NUMBER_OF_SENSOR_SYMBOLS - 1) + 1);

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
      href: `/accounts/${finalAccount.username.trim()}`,
    },
  ];
  if (isOwnerAndLoggedIn || activeTab === "tokens") {
    tabs.push({
      id: "tokens",
      name: "Tokens",
      href: `/accounts/${finalAccount.username.trim()}/tokens`,
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
          title='Neuen Sensor hinzufügen'
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
      <div className={`border-b border-gray-200 pt-4`}>
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
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
            <div className='z-10 translate-y-0.5'>
              <Tabs
                tabPanelId='tab-content'
                activeTabIndex={activeTabIndex}
                tabs={tabs}
              />
            </div>
            {isOwnerAndLoggedIn && activeTab === "sensors" && (
              <span className='justify-self-end order-first sm:order-none w-full sm:w-auto'>
                <Button
                  variant='primary'
                  onClick={() => {
                    setNewSensorModalIsOpen(true);
                    setRandomSymbolId(getRandomSensorId());
                  }}
                  className='w-full sm:w-auto'
                >
                  <span className='sm:hidden'>+</span>
                  <span className='hidden sm:inline'>Neuer</span> Sensor
                </Button>
              </span>
            )}
          </div>
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
