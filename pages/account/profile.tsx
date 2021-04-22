import { FC } from "react";
import { UserInfoCard } from "@components/UserInfoCard";
import { UserInfoEdit } from "@components/UserInfoEdit";
import { useUserData } from "@lib/hooks/useUserData";
import { useAuth } from "@auth/Auth";
import { PleaseLogin } from "@components/PageError/PleaseLogin";
import { ServerError } from "@components/PageError/ServerError";
import moment from "moment";

const UserPage: FC = () => {
  const { authenticatedUser, isLoadingAuth, error: authError } = useAuth();
  const { user, isLoading, error: userDataError } = useUserData();

  if (isLoadingAuth || isLoading) return null;
  if (!authenticatedUser || !user) return <PleaseLogin />;
  if (userDataError) return <ServerError error={userDataError.message} />;
  if (authError) return <ServerError error={authError} />;

  const { name, createdAt } = user;
  const { email } = authenticatedUser;

  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "5vmax" }}
    >
      <div
        className='bg-white p-8 shadow-lg gap-8 flex flex-col md:flex-row'
        style={{ minHeight: "480px" }}
      >
        <UserInfoCard
          username={name || ""}
          email={email || ""}
          registerDate={moment(createdAt).format("Do MMMM YYYY")}
        />
        <UserInfoEdit
          username={name || ""}
          email={email || ""}
          onSubmit={({ username, email }) => {
            console.log(username, email);
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
