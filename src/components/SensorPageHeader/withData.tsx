import { useAuth } from "@auth/Auth";
import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { PublicSensorType } from "@lib/hooks/usePublicSensors";
import { useSensorCategories } from "@lib/hooks/useSensorCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { SensorPageHeader } from ".";

interface SensorPageHeaderWithDataPropType {
  initialSensor: PublicSensorType;
}

type MergedSensorType = Pick<
  PublicSensorType,
  | "name"
  | "icon_id"
  | "description"
  | "category_id"
  | "connection_type"
  | "external_id"
  | "latitude"
  | "longitude"
>;

const mergeInitialSensorWithUserSensor = (
  initialSensor: MergedSensorType,
  userSensor?: MergedSensorType
): MergedSensorType => {
  const userIntegration =
    userSensor?.connection_type || initialSensor.connection_type;
  return {
    name: userSensor?.name || initialSensor.name,
    icon_id: userSensor?.icon_id || initialSensor.icon_id || Math.random() * 10,
    description: userSensor?.description || initialSensor.description,
    category_id: userSensor?.category_id || initialSensor.category_id,
    connection_type: userIntegration === "other" ? "http" : userIntegration,
    external_id: userSensor?.external_id || initialSensor.external_id,
    latitude: userSensor?.latitude || initialSensor.latitude,
    longitude: userSensor?.longitude || initialSensor.longitude,
  };
};

export const SensorPageHeaderWithData: FC<SensorPageHeaderWithDataPropType> = ({
  initialSensor,
}) => {
  const router = useRouter();
  const fallbackIconId = useRef(Math.random() * 10);
  const { user, sensors, error, updateSensor, deleteSensor } = useUserData();
  const { categories } = useSensorCategories();
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [
    deletionConfirmationIsOpened,
    setDeletionConfirmationIsOpened,
  ] = useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);

  const isLoggedIn = authenticatedUser && !isLoadingAuth;
  const userSensor = sensors?.find(
    ({ id }) => `${id}` === `${initialSensor.id}`
  );

  const mergedSensor = mergeInitialSensorWithUserSensor(
    initialSensor,
    userSensor
  );
  const userCategory = categories?.find(
    ({ id }) => `${id}` === String(userSensor?.category_id)
  );
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
                  Es ist beim editieren ein Fehler aufgetreten:{" "}
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
              message='Dein Sensor ist erfolgreich editiert worden!'
            />
          )}
        </div>
      )}
      {isLoggedIn && editModalIsOpen && (
        <EditAddSensorModal
          title={`Sensor ${
            initialSensor.name ? `„${initialSensor.name}“ ` : ""
          }editieren`}
          onCancel={() => setEditModalIsOpen(false)}
          defaultValues={{
            name: mergedSensor.name,
            symbolId: mergedSensor.icon_id,
            description: mergedSensor.description,
            categoryId: mergedSensor.category_id,
            integration:
              mergedSensor.connection_type === "other"
                ? undefined
                : mergedSensor.connection_type,
            ttnDeviceId: mergedSensor.external_id,
            latitude: mergedSensor.latitude,
            longitude: mergedSensor.longitude,
          }}
          onSubmit={data => {
            updateSensor({
              id: initialSensor.id,
              external_id:
                data.ttnDeviceId || mergedSensor.external_id || undefined,
              name: data.name,
              description: data.description,
              connection_type: data.integration,
              longitude: data.longitude,
              latitude: data.latitude,
              category_id: data.categoryId,
              icon_id: data.symbolId,
              user_id: authenticatedUser?.id,
            })
              .then(() => setShowEditSuccessAlert(true))
              .finally(() => setEditModalIsOpen(false));
          }}
          onDelete={() => setDeletionConfirmationIsOpened(true)}
        />
      )}
      <SensorPageHeader
        id={initialSensor.id}
        name={mergedSensor.name || ""}
        description={mergedSensor.description || ""}
        category={userCategory || { id: 1, name: "C02", description: "" }}
        symbol={mergedSensor.icon_id || fallbackIconId.current}
        geocoordinates={{
          latitude: mergedSensor.latitude || 52.4961458,
          longitude: mergedSensor.longitude || 13.4335723,
        }}
        author={{
          username: initialSensor.user.name || "anonymous",
          displayName: initialSensor.user.display_name || "Anonymous",
        }}
        withEditButton={!!user && user.name === initialSensor.user?.name}
        onEditButtonClick={() => {
          setEditModalIsOpen(true);
          setShowEditSuccessAlert(false);
        }}
      />
      {deletionConfirmationIsOpened && (
        <SmallModalOverlay
          title={`Sensor löschen`}
          footerContent={
            <>
              <Button
                variant='dangerous'
                onClick={() => {
                  deleteSensor(initialSensor.id)
                    .then(() =>
                      router.push(
                        user?.name ? `/accounts/${user.name}` : `/sensors`
                      )
                    )
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
            <p>Du bist dabeit der Sensor „{mergedSensor.name}“ zu löschen.</p>
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
