import { FC } from "react";

export interface CopyTextFieldPropType {
  name: string;
  label: string;
  children: string;
}

export const CopyTextField: FC<CopyTextFieldPropType> = ({
  name,
  label,
  children,
}) => (
  <div className='flex-col'>
    <label htmlFor={name} className='text-sm text-gray-500 mb-1 block'>
      {label}
    </label>
    <input name={name} id={name} type='text' readOnly value={children} />
  </div>
);
