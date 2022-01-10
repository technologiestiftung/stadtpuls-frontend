import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { useUserData } from "@lib/hooks/useUserData";
import { IntegrationType } from "@lib/integrationsUtil";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SensorPageHeader } from ".";

interface SensorPageHeaderWithDataPropType {
  initialSensor: ParsedSensorType;
}

export const SensorPageHeaderWithData: FC<SensorPageHeaderWithDataPropType> = ({
  initialSensor,
}) => {
  const router = useRouter();
  const { isLoggedIn, user, sensors, error, updateSensor, deleteSensor } =
    useUserData();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deletionConfirmationIsOpened, setDeletionConfirmationIsOpened] =
    useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);

  const userSensor = sensors?.find(
    ({ id }) => `${id}` === `${initialSensor.id}`
  );
  const mergedSensor = isLoggedIn && userSensor ? userSensor : initialSensor;

  return (
    <>
      {(error || showEditSuccessAlert) && (
        <div
          className={[
            "absolute top-20 w-full container max-w-8xl px-4 z-50",
            "left-1/2 transform -translate-x-1/2 backdrop-filter backdrop-blur-md",
          ].join(" ")}
        >
          {error && (
            <Alert
              type='error'
              title='Fehler!'
              message={
                <>
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
              message='Dein Sensor ist erfolgreich editiert worden!'
            />
          )}
        </div>
      )}
      {isLoggedIn && user && editModalIsOpen && (
        <EditAddSensorModal
          author={{
            authorId: user.id,
            authorName: user.displayName,
            authorUsername: user.username,
          }}
          title={`Sensor „${initialSensor.name}“ editieren`}
          onCancel={() => setEditModalIsOpen(false)}
          defaultValues={mergedSensor}
          onSubmit={data => {
            updateSensor({
              ...mergedSensor,
              ...data,
              id: initialSensor.id,
              ttnDeviceId: data.ttnDeviceId as IntegrationType,
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
      <SensorPageHeader
        {...mergedSensor}
        withEditButton={!!user && user.username === mergedSensor.authorUsername}
        onEditButtonClick={() => {
          setEditModalIsOpen(true);
          setShowEditSuccessAlert(false);
        }}
      />
      {deletionConfirmationIsOpened && user && (
        <SmallModalOverlay
          title={`Sensor löschen`}
          footerContent={
            <>
              <Button
                variant='dangerous'
                onClick={() => {
                  deleteSensor(initialSensor.id)
                    .then(() => router.push(`/${user.username}/sensors`))
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
            <p>Du bist dabei, den Sensor „{mergedSensor.name}“ zu löschen.</p>
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
