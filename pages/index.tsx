import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingSensorsSlider } from "@components/LandingSensorsSlider";
import { LandingStoriesIntro } from "@components/LandingStoriesIntro";
import { useCuratedSensors } from "@lib/hooks/useCuratedSensors";
import { FC, useEffect, useState } from "react";

const LandingPage: FC = () => {
  const { data: curatedSensors } = useCuratedSensors();
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    if (!curatedSensors) return;
    setActiveSlideIndex(Math.max(Math.round(curatedSensors.length / 2) - 1, 0));
  }, [curatedSensors]);

  return (
    <>
      <LandingHero />
      <LandingStoriesIntro />
      {curatedSensors && curatedSensors.length > 0 && (
        <>
          <section>
            <LandingHeroBackgroundMap
              sensors={curatedSensors}
              activeMarkerIndex={activeSlideIndex}
              onMarkerClick={setActiveSlideIndex}
            />
          </section>
          <LandingSensorsSlider
            sensors={curatedSensors}
            slideIndex={activeSlideIndex}
            onSlideChange={setActiveSlideIndex}
          />
        </>
      )}
      <LandingProjectAbout />
      <LandingHowItWorks />
      <LandingLabAbout />
    </>
  );
};

export default LandingPage;
