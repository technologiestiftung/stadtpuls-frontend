import { FC } from "react";
import { UserInfoCard } from "@components/UserInfoCard";
import { UserInfoEdit } from "@components/UserInfoEdit";
import { useUserData } from "@lib/hooks/useUserData";
import { useAuth } from "@auth/Auth";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { ServerError } from "@components/PageError/ServerError";
import moment from "moment";
import { useRouter } from "next/router";
moment.locale("de-DE");

const UserPage: FC = () => {
  const router = useRouter();
  const {
    authenticatedUser,
    isLoadingAuth,
    error: authError,
    signOut,
  } = useAuth();
  const {
    user,
    isLoading,
    error: userDataError,
    updateUser,
    updateEmail,
    deleteUser,
  } = useUserData();

  if (isLoadingAuth || isLoading) return null;
  if (!authenticatedUser || !user) return <PleaseLogin />;
  if (userDataError) return <ServerError error={userDataError.message} />;
  if (authError) return <ServerError error={authError} />;

  const { name, createdAt } = user;
  const { email } = authenticatedUser;

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ padding: "5vmax 0" }}
    >
      <div
        className='bg-white p-8 shadow gap-8 flex flex-col md:flex-row'
        style={{ minHeight: "480px" }}
      >
        <UserInfoCard
          username={name || ""}
          email={email || ""}
          registerDate={moment(createdAt).format("Do MMMM YYYY")}
          onUserDelete={() => {
            void router.push("/");
            void deleteUser();
            void signOut();
          }}
        />
        <UserInfoEdit
          username={name || ""}
          email={email || ""}
          onSubmit={({ email, username }) => {
            void updateEmail(email);
            void updateUser(username);
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
