import { SmallModal } from "@components/SmallModal";
import Image from "next/image";
import { FC } from "react";

export interface MagicLinkModalPropType {
  email: string;
  isLoading: boolean;
}

const LoadingMagicLinkModal: FC<MagicLinkModalPropType> = () => (
  <p>Ein Link wird gesendet...</p>
);

const LoadedMagicLinkModal: FC<MagicLinkModalPropType> = ({ email }) => (
  <>
    <p>
      Ein Link wurde gesendet an:
      <br />
      <strong>{email || "contact@example.com"}</strong>
    </p>
    <p>Bitte schaue auch in deinen Spam-Ordner.</p>
  </>
);

export const MagicLinkModal: FC<MagicLinkModalPropType> = props => {
  return (
    <SmallModal
      title='Überprüfe deine E-Mails'
      className='w-full max-w-md'
      footerContent={
        <div className='flex h-16 justify-end flex-col gap-3'>
          {props.isLoading ? (
            <LoadingMagicLinkModal {...props} />
          ) : (
            <LoadedMagicLinkModal {...props} />
          )}
        </div>
      }
    >
      {props.isLoading ? (
        <Image
          width='384'
          height='128'
          src='/images/magick-link-loading.svg'
          alt='closed envelope'
        />
      ) : (
        <Image
          width='384'
          height='128'
          src='/images/magick-link-sent.svg'
          alt='opened envelope'
        />
      )}
    </SmallModal>
  );
};
