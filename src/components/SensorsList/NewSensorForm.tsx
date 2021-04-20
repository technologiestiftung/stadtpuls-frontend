import { FC, useState } from "react";
import { SubmissionDataType } from "./SensorsListTypes";
import { SensorsListEditRow } from "./SensorsListEditRow";

interface NewSensorFormPropType {
  onSubmit: (data: SubmissionDataType) => void;
  onCancel: () => void;
}

const defaultDraft = {
  id: Infinity,
  externalId: "new-device-0",
  name: "My new device",
};

export const NewSensorForm: FC<NewSensorFormPropType> = ({
  onSubmit,
  onCancel,
}) => {
  const [currentDraft, setCurrentDraft] = useState<SubmissionDataType>(
    defaultDraft
  );
  return (
    <SensorsListEditRow
      currentDraft={currentDraft}
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
