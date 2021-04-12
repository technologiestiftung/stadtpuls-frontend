import { FC } from "react";
import { SigninForm } from "@components/SigninForm";

const SigninPage: FC = () => {
  return (
    <div
      className='w-full h-full relative grid place-content-center'
      style={{ paddingTop: "10vmax" }}
    >
      <SigninForm />
    </div>
  );
};

export default SigninPage;
