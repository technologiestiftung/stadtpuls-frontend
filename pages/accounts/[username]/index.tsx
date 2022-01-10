import { GetServerSideProps } from "next";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async context => {
  const { username } = context.query;
  if (typeof username !== "string") return { notFound: true };
  return {
    redirect: {
      destination: `/${username}/sensors`,
      permanent: true,
    },
    props: {},
  };
};

const Nothing: FC = () => null;

export default Nothing;
