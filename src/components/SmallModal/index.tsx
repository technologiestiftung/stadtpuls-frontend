import { FC, ReactNode } from "react";

interface SmallModalPropType {
  title: string;
  className?: string;
  variant?: "dangerous" | "primary";
  footerContent?: ReactNode;
}

export const SmallModal: FC<SmallModalPropType> = ({
  title,
  children,
  footerContent,
  variant,
  className = "max-w-md",
}) => {
  return (
    <div
      className={`${className} md:px-0 max-h-[calc(100vh-32px)] overflow-y-auto`}
    >
      <div
        className='bg-white border border-gray-200 shadow p-4 sm:p-8 flex flex-col gap-8 place-content-between'
        style={{ minHeight: 360 }}
      >
        <div>
          <h1
            className={`text-3xl font-bold font-headline m-0 mb-4 ${
              variant == "dangerous" ? "text-error-500" : "text-purple"
            }`}
          >
            {title}
          </h1>
          {children}
        </div>
        {footerContent && (
          <div className='flex gap-4 place-content-between'>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};
