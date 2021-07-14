import { FC, useState } from "react";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Button } from "@components/Button";
import { UserAvatar } from "@components/UserAvatar";

interface UserInfoCardPropTypes {
  username: string;
  email: string;
  registerDate: string;
  onUserDelete?: () => void;
}

export const UserInfoCard: FC<UserInfoCardPropTypes> = ({
  username,
  email,
  registerDate,
  onUserDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className='flex flex-col md:pr-8 lg:pr-16 justify-between h-full w-full sm:min-w-md md:min-w-xs lg:min-w-md'>
      <div>
        <div className='flex items-center'>
          <UserAvatar username={username} size={48} className='mr-4' />
          <h1 className='text-blue text-3xl font-semibold'>{username}</h1>
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
        {onUserDelete && (
          <button
            className='text-left mt-16 text-error hover:text-opacity-50 cursor-pointer'
            onClick={() => setShowDeleteModal(true)}
          >
            Account löschen
          </button>
        )}
      </div>
      {showDeleteModal && onUserDelete && (
        <SmallModalOverlay
          title='Bitte bestätige die Löschung deines Accounts'
          variant='dangerous'
          footerContent={
            <div className='flex justify-end w-full'>
              <Button
                className='mr-4'
                variant='dangerous'
                onClick={onUserDelete}
              >
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
        >
          Dein Account wird unwiderruflich gelöscht. Alle deine Projekte und
          Daten werden von der Plattform und aus der Datenbank entfernt.
        </SmallModalOverlay>
      )}
    </div>
  );
};
