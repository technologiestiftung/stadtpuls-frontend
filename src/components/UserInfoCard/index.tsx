import { FC, useState } from "react";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Button } from "@components/Button";

interface UserInfoCardPropTypes {
  username: string;
  email: string;
  registerDate: string;
}

export const UserInfoCard: FC<UserInfoCardPropTypes> = ({
  username,
  email,
  registerDate,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div
      className='flex flex-col mr-16 justify-between h-full'
      style={{ minWidth: "320px" }}
    >
      <div>
        <div className='flex items-center px-4'>
          <div className='w-14 h-14 rounded-full mr-4 bg-blue-500' />
          <h1 className='text-blue-500 text-3xl font-semibold'>{username}</h1>
        </div>
        <div className='border-gray-300 border-t my-8' />
        <p className='text-gray-500'>
          E-Mail{" "}
          <span className='text-sm text-gray-400'>(nicht öffentlich)</span>
        </p>
        <p>{email}</p>
        <p className='mt-8 text-gray-500'>
          Registrierungsdatum{" "}
          <span className='text-sm text-gray-400'>(nicht öffentlich)</span>
        </p>
        <p>{registerDate}</p>
      </div>
      <div>
        <button
          className='text-left mt-16 text-red-500 hover:text-opacity-50 cursor-pointer'
          onClick={() => setShowDeleteModal(true)}
        >
          Account Löschen
        </button>
      </div>
      {showDeleteModal && (
        <SmallModalOverlay
          title='Bitte bestätige die Löschung deines Accounts'
          footerContent={
            <div className='flex justify-end w-full'>
              <Button className='mr-4' variant='dangerous'>
                Löschen
              </Button>
              <Button
                variant='primary'
                onClick={() => setShowDeleteModal(false)}
              >
                Abbrechen
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
};
