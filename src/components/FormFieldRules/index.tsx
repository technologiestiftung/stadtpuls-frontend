import { FC, ReactNode } from "react";
import CheckmarkIcon from "../../../public/images/icons/16px/checkmark.svg";
import CrossIcon from "../../../public/images/icons/16px/crossShort.svg";
import LoadingIcon from "../../../public/images/icons/16px/spinner.svg";

interface RuleType {
  id: string;
  msg: ReactNode;
  isFulfilled: boolean;
  isLoading?: boolean;
}

export interface FormFieldRulesPropType {
  isTouched: boolean;
  withSubmittedErrors?: boolean;
  rules: RuleType[];
}

const getIconByFulfilledStatus = (
  id: string,
  isFulfilled: boolean
): ReactNode =>
  isFulfilled ? (
    <CheckmarkIcon data-testid={`icon-${id}`} className='text-green' />
  ) : (
    <CrossIcon data-testid={`icon-${id}`} />
  );

export const FormFieldRules: FC<FormFieldRulesPropType> = ({
  isTouched,
  withSubmittedErrors = false,
  rules,
}) =>
  isTouched && rules.length > 0 ? (
    <ul className='flex flex-col'>
      {rules.map(({ id, msg, isFulfilled, isLoading = false }) => (
        <li
          key={id}
          className={[
            "flex gap-1 items-center leading-tight text-sm",
            !isFulfilled &&
              (withSubmittedErrors ? "text-error" : "text-gray-500"),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isLoading ? (
            <LoadingIcon data-testid={`icon-${id}`} className='animate-spin' />
          ) : (
            getIconByFulfilledStatus(id, isFulfilled)
          )}{" "}
          <span className='pt-1'>{msg}</span>
        </li>
      ))}
    </ul>
  ) : null;
