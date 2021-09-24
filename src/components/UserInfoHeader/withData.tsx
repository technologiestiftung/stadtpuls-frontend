import { useAuth } from "@auth/Auth";
import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { EditAccountModal } from "@components/EditAccountModal";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Tabs } from "@components/Tabs";
import {
  dbUserToPublicAccount,
  PublicAccountType,
} from "@lib/hooks/usePublicAccounts";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  initialAccount: PublicAccountType;
  activeTab: "sensors" | "tokens";
}

export const UserInfoWithData: FC<UserInfoWithDataPropType> = ({
  initialAccount,
  activeTab,
}) => {
  const router = useRouter();
  const {
    user,
    sensors,
    error,
    createSensor,
    updateUser,
    deleteUser,
  } = useUserData({
    user: {
      id: initialAccount.id,
      name: initialAccount.username,
      display_name: initialAccount.displayName,
      created_at: initialAccount.createdAt,
      description: initialAccount.description,
      url: initialAccount.link,
    },
  });
  const { authenticatedUser } = useAuth();
  const isOwnerAndLoggedIn =
    !!authenticatedUser && !!user && user.name === initialAccount.username;
  const finalAccount = {
    ...initialAccount,
    ...(user && sensors ? dbUserToPublicAccount(user) : {}),
  };
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newSensorModalIsOpen, setNewSensorModalIsOpen] = useState(false);
  const [
    deletionConfirmationIsOpened,
    setDeletionConfirmationIsOpened,
  ] = useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);

  const activeTabIndex = activeTab === "tokens" ? 1 : 0;
  const tabs = [
    {
      id: "sensors",
      name: "Sensoren",
      href: `/accounts/${initialAccount.username}`,
    },
  ];
  if (isOwnerAndLoggedIn || activeTab === "tokens") {
    tabs.push({
      id: "tokens",
      name: "Tokens",
      href: `/accounts/${initialAccount.username}/tokens`,
    });
  }
  return (
    <>
      {newSensorModalIsOpen && (
        <EditAddSensorModal
          title='Neuer Sensor'
          onCancel={() => setNewSensorModalIsOpen(false)}
          submitButtonText='Hinzufügen'
          onSubmit={data => {
            if (!authenticatedUser?.id) return;
            createSensor({
              name: data.name,
              icon_id: data.symbolId,
              description: data.description,
              connection_type: data.integration,
              created_at: new Date().toISOString(),
              category_id: data.categoryId,
              latitude: data.latitude,
              longitude: data.longitude,
              user_id: authenticatedUser.id,
            })
              .then(newSensorId => router.push(`/sensors/${newSensorId}`))
              .finally(() => setNewSensorModalIsOpen(false));
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
              id: authenticatedUser.id,
              display_name: data.displayName,
              description: data.description,
              url: data.link,
            })
              .then(() => setShowEditSuccessAlert(true))
              .finally(() => setEditModalIsOpen(false));
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
                      Beim Editieren ist ein Fehler aufgetreten:{" "}
                      <code className='ml-4 px-2 py-1 font-mono bg-error bg-opacity-20'>
                        {error.message}
                      </code>
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
            <Tabs activeTabIndex={activeTabIndex} tabs={tabs} />
          </div>
          {user && authenticatedUser && (
            <span className='absolute bottom-0 sm:bottom-2 right-4'>
              <Button
                variant='primary'
                onClick={() => setNewSensorModalIsOpen(true)}
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
                    .finally(() => setEditModalIsOpen(false));
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
