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

const ModalFooter: FC<{
  onDelete: TokenDeletionModalPropType["onDelete"];
  onCancel: TokenDeletionModalPropType["onCancel"];
}> = ({ onDelete, onCancel }) => {
  return (
    <>
      <div aria-hidden />
      <div className='flex justify-end'>
        <Button variant='dangerous' onClick={onDelete} className='mr-4'>
          Löschen
        </Button>
        <Button variant='primary' onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </>
  );
};

export interface TokenDeletionModalPropType {
  tokenDescription: string;
  onDelete: () => void;
  onCancel: () => void;
}

export const TokenDeletionModal: FC<TokenDeletionModalPropType> = ({
  tokenDescription,
  onDelete,
  onCancel,
}) => {
  return (
    <SmallModalOverlay
      className='w-[640px] max-w-full'
      title='Token löschen'
      footerContent={<ModalFooter onDelete={onDelete} onCancel={onCancel} />}
    >
      <Alert
        type='warning'
        title='Achtung!'
        message='Dieses Token wird unwiderruflich gelöscht.'
        isRemovable={false}
      />
      <div className='mt-8'>
        <TokenDescription description={tokenDescription} />
      </div>
    </SmallModalOverlay>
  );
};
