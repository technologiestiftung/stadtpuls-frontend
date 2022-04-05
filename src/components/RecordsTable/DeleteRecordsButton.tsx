import { Button } from "@components/Button";
import { FC } from "react";
import { numberFormatter } from "./recordsTableUtils";

interface DeleteRecordsButtonPropsType {
  onClick: () => void;
  selectedRowAmount: number;
}

export const DeleteRecordsButton: FC<DeleteRecordsButtonPropsType> = ({
  onClick,
  selectedRowAmount,
}) => (
  <Button
    variant='dangerous'
    onClick={onClick}
    disabled={selectedRowAmount === 0}
    className={[
      "transition-opacity border border-error mb-4",
      selectedRowAmount > 0 ? "opacity-100" : "opacity-0 pointer-events-none",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {numberFormatter.format(selectedRowAmount)}{" "}
    {selectedRowAmount === 1 ? "Wert" : "Werte"} löschen
  </Button>
);
