import { GetServerSideProps } from "next";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async context => {
  const username = context.query.username;
  if (!username || Array.isArray(username)) return { notFound: true };

  return {
    redirect: {
      destination: `/${username}/sensors`,
      permanent: false,
    },
    props: {},
  };
};

const Nothing: FC = () => null;

export default Nothing;
