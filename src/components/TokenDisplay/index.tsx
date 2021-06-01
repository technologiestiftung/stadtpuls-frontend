import { FC, HTMLProps } from "react";

export interface TokenDisplayType extends HTMLProps<HTMLDivElement> {
  hasError?: boolean;
}

interface ContentsWrapperType {
  hasErrorStyle?: boolean;
}

const ContentsWrapper: React.FC<ContentsWrapperType> = ({
  hasErrorStyle,
  children,
}) => (
  <div
    aria-labelledby='token-display-label'
    className={[
      "mt-2 p-3 break-words",
      `border ${hasErrorStyle ? "border-red-500" : "border-gray-200"}`,
      `${hasErrorStyle ? "text-red-500" : "text-gray-700"}`,
    ].join(" ")}
  >
    {children}
  </div>
);

export const TokenDisplay: FC<TokenDisplayType> = ({ hasError, children }) => {
  return (
    <div>
      <p id='token-display-label'>Token</p>
      {!hasError && !children && (
        <ContentsWrapper>
          * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        </ContentsWrapper>
      )}
      {children && !hasError && <ContentsWrapper>{children}</ContentsWrapper>}
      {hasError && children && (
        <ContentsWrapper hasErrorStyle>{children}</ContentsWrapper>
      )}
    </div>
  );
};
