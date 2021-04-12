import { FC } from "react";
import { SignupForm } from "@components/SignupForm";

const SigninPage: FC = () => {
  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "10vmax" }}
    >
      <SignupForm />
    </div>
  );
};

export default SigninPage;
