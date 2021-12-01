import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingSensorsSlider } from "@components/LandingSensorsSlider";
import { LandingStoriesIntro } from "@components/LandingStoriesIntro";
import { getCuratedSensors } from "@lib/hooks/useCuratedSensors";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { GetStaticProps } from "next";
import { FC, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const curatedSensors = await getCuratedSensors();
    return { props: { curatedSensors }, revalidate: 60 };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

const LandingPage: FC<{
  curatedSensors?: ParsedSensorType[];
}> = ({ curatedSensors = [] }) => {
  const initialSlideIndex = Math.round(curatedSensors.length / 2) - 1;
  const [activeSlideIndex, setActiveSlideIndex] =
    useState<number>(initialSlideIndex);

  return (
    <>
      <LandingHero />
      <LandingStoriesIntro />
      {curatedSensors.length > 0 && (
        <section>
          <LandingHeroBackgroundMap
            sensors={curatedSensors}
            activeMarkerIndex={activeSlideIndex}
          />
        </section>
      )}
      <LandingSensorsSlider
        sensors={curatedSensors}
        initialSlideIndex={initialSlideIndex}
        onSlideChange={setActiveSlideIndex}
      />
      <LandingProjectAbout />
      <LandingHowItWorks />
      <LandingLabAbout />
    </>
  );
};

export default LandingPage;
