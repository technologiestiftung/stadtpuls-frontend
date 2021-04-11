import { TextLink } from "@components/TextLink";
import Link from "next/link";
import { HTMLProps, FC } from "react";

interface SignInUpFormWrapperPropType extends HTMLProps<HTMLFormElement> {
  type: "in" | "up";
}

interface TextsObjectType {
  title: string;
  switchQuestion: string;
  switchLinkText: string;
  switchLinkRoute: string;
  submitButton: string;
}

const getTextsByType = (type: "in" | "up"): TextsObjectType =>
  type === "in"
    ? {
        title: "Login",
        switchQuestion: "Hast du noch keinen Account?",
        switchLinkText: "Registriere dich",
        switchLinkRoute: "signup",
        submitButton: "Weiter",
      }
    : {
        title: "Registrierung",
        switchQuestion: "Hast du schon einen Account?",
        switchLinkText: "Logge dich ein",
        switchLinkRoute: "signin",
        submitButton: "Weiter",
      };

export const SignInUpFormWrapper: FC<SignInUpFormWrapperPropType> = ({
  type,
  children,
  ...formProps
}) => {
  const texts = getTextsByType(type);

  return (
    <form
      className='max-w-md bg-white p-8 shadow-lg flex flex-col gap-8 place-content-between'
      style={{ minHeight: 360 }}
      noValidate
      {...formProps}
    >
      <fieldset>
        <h1 className='text-primary text-3xl font-semibold m-0 mb-4'>
          {texts.title}
        </h1>
        {children}
      </fieldset>
      <fieldset className='flex gap-4 place-content-between'>
        <section className='text-gray-500'>
          {`${texts.switchQuestion} `}
          <Link href={`/${texts.switchLinkRoute}`}>
            <TextLink
              href={`/${texts.switchLinkRoute}`}
              className='inline-block'
            >
              {texts.switchLinkText}
            </TextLink>
          </Link>
        </section>
        <section
          className='flex flex-col'
          style={{ justifyContent: "flex-end" }}
        >
          <input type='submit' value={texts.submitButton} />
        </section>
      </fieldset>
    </form>
  );
};
