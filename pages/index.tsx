import { LandingHero } from "@components/LandingHero";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingProjectsSlider } from "@components/LandingProjectsSlider";
import { fakeProjects } from "@components/LandingProjectsSlider/LandingProjectsSlider.stories";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <>
      <LandingHero />
      <LandingProjectsSlider projects={fakeProjects} />
      <LandingHowItWorks />
      <LandingProjectAbout />
      <LandingLabAbout />
    </>
  );
};

export default LandingPage;
