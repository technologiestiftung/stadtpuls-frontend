import { GetServerSideProps } from "next";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async context => {
  const username = context.query.username;
  const id = context.query.id;
  if (!username || Array.isArray(username)) return { notFound: true };
  if (!id || Array.isArray(id)) return { notFound: true };

  return {
    redirect: {
      destination: `/${username}/sensors/${id}`,
      permanent: true,
    },
    props: {},
  };
};

const Nothing: FC = () => null;

export default Nothing;
