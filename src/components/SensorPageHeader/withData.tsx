import { useAuth } from "@auth/Auth";
import { Alert } from "@components/Alert";
import { EditAddSensorModal } from "@components/EditAddSensorModal";
import { PublicSensorType } from "@lib/hooks/usePublicSensors";
import { useSensorCategories } from "@lib/hooks/useSensorCategories";
import { useUserData } from "@lib/hooks/useUserData";
import { FC, useRef, useState } from "react";
import { SensorPageHeader } from ".";

interface SensorPageHeaderWithDataPropType {
  initialSensor: PublicSensorType;
}

export const SensorPageHeaderWithData: FC<SensorPageHeaderWithDataPropType> = ({
  initialSensor,
}) => {
  const fallbackIconId = useRef(Math.random() * 10);
  const { user, sensors, error, updateSensor } = useUserData();
  const { categories } = useSensorCategories();
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);

  const isLoggedIn = authenticatedUser && !isLoadingAuth;
  const userSensor = sensors?.find(
    ({ id }) => `${id}` === `${initialSensor.id}`
  );
  const userCategory = categories?.find(
    ({ id }) => `${id}` === String(userSensor?.category_id)
  );
  const userIntegration =
    userSensor?.connection_type || initialSensor.connection_type;

  return (
    <>
      {(error || showEditSuccessAlert) && (
        <div
          className={[
            "absolute top-20 w-full container max-w-8xl px-4 z-50",
            "left-1/2 transform -translate-x-1/2",
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
            name: userSensor?.name || initialSensor.name,
            symbolId:
              userSensor?.icon_id ||
              initialSensor.icon_id ||
              fallbackIconId.current,
            description: userSensor?.description || initialSensor.description,
            categoryId: userSensor?.category_id || initialSensor.category_id,
            integration:
              userIntegration === "other" ? undefined : userIntegration,
            ttnDeviceId: userSensor?.external_id || initialSensor.external_id,
            latitude: userSensor?.latitude || initialSensor.latitude,
            longitude: userSensor?.longitude || initialSensor.longitude,
          }}
          onSubmit={data => {
            updateSensor({
              id: initialSensor.id,
              external_id:
                data.ttnDeviceId || initialSensor.external_id || undefined,
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
        />
      )}
      <SensorPageHeader
        id={initialSensor.id}
        name={userSensor?.name || initialSensor.name || ""}
        description={userSensor?.description || initialSensor.description}
        category={userCategory || initialSensor.category}
        symbol={
          userSensor?.icon_id || initialSensor.icon_id || fallbackIconId.current
        }
        geocoordinates={{
          latitude:
            userSensor?.latitude || initialSensor.latitude || 52.4961458,
          longitude:
            userSensor?.longitude || initialSensor.longitude || 13.4335723,
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
    </>
  );
};
