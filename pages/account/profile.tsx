import { FC, useState } from "react";
import { UserInfoCard } from "@components/UserInfoCard";
import { UserInfoEdit } from "@components/UserInfoEdit";

const UserPage: FC = () => {
  const [username, setUsername] = useState("jondoe");
  const [email, setEmail] = useState("jondoe@aol.com");
  const registerDate = "12. April 2021";
  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "10vmax" }}
    >
      <div
        className='bg-white p-8 shadow-lg flex gap-8 flex flex-col md:flex-row'
        style={{ minHeight: "480px" }}
      >
        <UserInfoCard
          username={username}
          email={email}
          registerDate={registerDate}
        />
        <UserInfoEdit
          username={username}
          email={email}
          onSubmit={({ username, email }) => {
            setUsername(username);
            setEmail(email);
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
