import { FC, useState } from "react";
import { SubmissionDataType } from "./SensorsListTypes";
import { SensorsListEditRow } from "./SensorsListEditRow";

interface NewSensorFormPropType {
  onSubmit: (data: Omit<SubmissionDataType, "id">) => void;
  onCancel: () => void;
}

const defaultDraft = {
  externalId: "new-device-0",
  name: "My new device",
};

export const NewSensorForm: FC<NewSensorFormPropType> = ({
  onSubmit,
  onCancel,
}) => {
  const [currentDraft, setCurrentDraft] = useState<
    Omit<SubmissionDataType, "id">
  >(defaultDraft);
  return (
    <SensorsListEditRow
      currentDraft={{ ...currentDraft, id: Infinity }}
      onSubmit={() => {
        onSubmit(currentDraft);
        setCurrentDraft(defaultDraft);
      }}
      onCancel={onCancel}
      onClickOutside={() => undefined}
      onDraftChange={setCurrentDraft}
    />
  );
};
