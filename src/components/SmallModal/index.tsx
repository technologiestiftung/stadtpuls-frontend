import { FC, ReactNode } from "react";

interface SmallModalPropType {
  title: string;
  variant?: "dangerous" | "primary";
  footerContent?: ReactNode;
}

export const SmallModal: FC<SmallModalPropType> = ({
  title,
  children,
  footerContent,
  variant,
}) => {
  return (
    <div className='max-w-md px-4 md:px-0'>
      <div
        className='bg-white shadow p-8 flex flex-col gap-8 place-content-between'
        style={{ minHeight: 360 }}
      >
        <div>
          <h1
            className={`text-3xl font-semibold m-0 mb-4 ${
              variant == "dangerous" ? "text-error-500" : "text-blue"
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
