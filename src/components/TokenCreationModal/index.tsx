import { Button } from "@components/Button";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { FC } from "react";
import { Alert } from "@components/Alert";
import KeyIcon from "../../../public/images/icons/16px/key.svg";
import classNames from "classnames";

const TokenDescription: FC<{ description: string }> = ({ description }) => {
  return (
    <div className={classNames("flex py-2", "text-gray-800")}>
      <KeyIcon className='flex-shrink-0 self-center' aria-hidden />
      <p className='ml-2 text-lg'>{description}</p>
    </div>
  );
};

const ModalFooter: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <div aria-hidden />
      <div className='flex justify-end'>
        <Button variant='primary' onClick={onClose}>
          Schließen
        </Button>
      </div>
    </>
  );
};

export interface TokenCreationModalPropType {
  tokenDescription: string;
  token: string;
  onClose: () => void;
}

export const TokenCreationModal: FC<TokenCreationModalPropType> = ({
  tokenDescription,
  token,
  onClose,
}) => {
  return (
    <SmallModalOverlay
      className='w-[640px] max-w-full'
      title='Token erfolgreich generiert!'
      footerContent={<ModalFooter onClose={onClose} />}
    >
      <Alert
        type='warning'
        title='Wichtig!'
        message='Kopiere dein neues Token jetzt. Du wirst es später nicht wieder einsehen können.'
      />
      <div className='mt-8'>
        <TokenDescription description={tokenDescription} />
        <p
          className={classNames(
            "border bg-gray-50",
            "p-4",
            "font-mono break-words"
          )}
        >
          {token}
        </p>
      </div>
    </SmallModalOverlay>
  );
};
