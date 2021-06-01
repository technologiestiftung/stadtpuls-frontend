import { LandingHero } from "@components/LandingHero";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <LandingHero />
      <LandingHowItWorks />
    </>
  );
};

export default LandingPage;
