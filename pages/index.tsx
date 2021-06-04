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
      <div className='absolute z-0 top-0 left-0 right-0'>
        <LandingHeroBackgroundMap project={fakeProjects[activeSlideIndex]} />
      </div>
      <LandingHero />
      <LandingProjectsSlider
        projects={fakeProjects}
        initialSlideIndex={initialSlideIndex}
        onSlideChange={setActiveSlideIndex}
      />
      <LandingHowItWorks />
      <LandingProjectAbout />
      <LandingLabAbout />
    </>
  );
};

export default LandingPage;
