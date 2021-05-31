import { FC } from "react";

export interface TokenDisplayType {
  token?: string;
  errorMessage?: string;
}

interface ContentsWrapperType {
  hasError?: boolean;
}

const ContentsWrapper: React.FC<ContentsWrapperType> = ({
  hasError,
  children,
}) => (
  <p
    aria-labelledby='token-display-label'
    className={[
      "mt-2 p-3 break-words",
      `border ${hasError ? "border-red-500" : "border-gray-200"}`,
      `${hasError ? "text-red-500" : "text-gray-700"}`,
    ].join(" ")}
  >
    {children}
  </p>
);

export const TokenDisplay: FC<TokenDisplayType> = ({ token, errorMessage }) => {
  return (
    <div>
      <p id='token-display-label'>Token</p>
      {!token && !errorMessage && (
        <ContentsWrapper>Token wird generiert ...</ContentsWrapper>
      )}
      {token && !errorMessage && <ContentsWrapper>{token}</ContentsWrapper>}
      {!token && errorMessage && (
        <ContentsWrapper hasError>{errorMessage}</ContentsWrapper>
      )}
    </div>
  );
};
