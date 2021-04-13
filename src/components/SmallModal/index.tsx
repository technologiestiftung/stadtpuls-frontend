import { HTMLProps, FC, ReactNode } from "react";

interface SmallModalPropType extends HTMLProps<HTMLFormElement> {
  title: string;
  titleClassName?: string;
  footerContent?: ReactNode;
}

export const SmallModal: FC<SmallModalPropType> = ({
  title,
  children,
  footerContent,
  titleClassName,
}) => {
  return (
    <div
      className='max-w-md bg-white p-8 shadow-lg flex flex-col gap-8 place-content-between'
      style={{ minHeight: 360 }}
    >
      <div>
        <h1
          className={`text-primary text-3xl font-semibold m-0 mb-4 ${
            titleClassName ? titleClassName : ""
          }`}
        >
          {title}
        </h1>
        {children}
      </div>
      {footerContent && (
        <div className='flex gap-4 place-content-between'>{footerContent}</div>
      )}
    </div>
  );
};
