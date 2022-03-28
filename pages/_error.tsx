import Link from "next/link";
import { ReactNode } from "react";

interface ErrorPageProps {
  message?: string;
  statusCode: number;
}

const ErrorPage = ({ message, statusCode }: ErrorPageProps): ReactNode => (
  <div className='container mx-auto max-w-8xl py-32 px-4'>
    <h2 className='text-2xl font-bold'>
      <span className='text-6xl text-purple'>{statusCode}</span>
      <br />
      {statusCode === 404 && "Die angeforderte Seite existiert leider nicht."}
      {statusCode !== 404 &&
        "Es ist ein Fehler beim Laden der Seite aufgetreten:"}
      {message && (
        <pre>
          <code>{message}</code>
        </pre>
      )}
    </h2>
    <p className='mt-8'>
      Zurück zur&nbsp;
      <Link href='/'>
        <a className='border-b border-green text-blue hover:text-green hover:border-blue transition-colors'>
          Startseite
        </a>
      </Link>
    </p>
  </div>
);

interface GetInitialPropsType {
  res?: { statusCode: number };
  err?: { message?: string; statusCode: number };
}

ErrorPage.getInitialProps = ({
  res,
  err,
}: GetInitialPropsType): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, message: err ? err.message : undefined };
};

export default ErrorPage;
