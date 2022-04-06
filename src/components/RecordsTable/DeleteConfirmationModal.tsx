import { Button } from "@components/Button";
import { Dialog } from "@components/Dialog";
import { FC, useCallback, useEffect, useRef } from "react";

interface DeleteConfirmationModalPropsType {
  selectedCount: number;
  setOpened: (opened: boolean) => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalPropsType> = ({
  selectedCount,
  setOpened,
  onConfirm,
}) => {
  const recordsName = selectedCount === 1 ? "Messwert" : "Messwerte";
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent): void => {
      if (evt.key === "Escape") setOpened(false);
    },
    [setOpened]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog
      title={`${selectedCount} ${recordsName} Löschen`}
      variant='dangerous'
      setIsOpen={setOpened}
      isOpen={true}
      initialFocus={cancelButtonRef}
      footerContent={
        <div className='flex justify-between w-full'>
          <Button onClick={onConfirm} variant='dangerous'>
            Unwiderruflich löschen
          </Button>
          <Button onClick={() => setOpened(false)} ref={cancelButtonRef}>
            Abbrechen
          </Button>
        </div>
      }
      description={
        <>
          Du bist dabei{" "}
          <b>
            {selectedCount} {recordsName}
          </b>{" "}
          zu löschen.
        </>
      }
    >
      <p>
        Diese Aktion ist <b>unwiderruflich</b>. Bist du dir sicher?
      </p>
    </Dialog>
  );
};
