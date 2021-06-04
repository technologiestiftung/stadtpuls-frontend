import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingProjectsSlider } from "@components/LandingProjectsSlider";
import { fakeProjects } from "@components/LandingProjectsSlider/LandingProjectsSlider.stories";
import { FC, useState } from "react";

const LandingPage: FC = () => {
  const initialSlideIndex = Math.round(fakeProjects.length / 2) - 1;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    initialSlideIndex
  );
  return (
    <>
      <LandingHeroBackgroundMap project={fakeProjects[activeSlideIndex]} />
      <div className='relative z-10' style={{ marginTop: "-200vh" }}>
        <LandingHero />
        <LandingProjectsSlider
          projects={fakeProjects}
          initialSlideIndex={initialSlideIndex}
          onSlideChange={setActiveSlideIndex}
        />
        <LandingHowItWorks />
        <LandingProjectAbout />
        <LandingLabAbout />
      </div>
    </>
  );
};

export default LandingPage;
