import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingSensorsSlider } from "@components/LandingSensorsSlider";
import { LandingStatsSection } from "@components/LandingStatsSection";
import { getCuratedSensors } from "@lib/hooks/useCuratedSensors";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import {
  getLandingStats,
  LandingStatsReturnType,
} from "@lib/requests/getLandingStats";
import { GetStaticProps } from "next";
import { FC, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [stats, curatedSensors] = await Promise.all([
      getLandingStats(),
      getCuratedSensors(),
    ]);
    return { props: { stats, curatedSensors }, revalidate: 60 };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

const LandingPage: FC<{
  stats: LandingStatsReturnType;
  curatedSensors?: ParsedSensorType[];
}> = ({ stats, curatedSensors = [] }) => {
  const initialSlideIndex = Math.round(curatedSensors.length / 2) - 1;
  const [activeSlideIndex, setActiveSlideIndex] =
    useState<number>(initialSlideIndex);

  return (
    <>
      <div className='absolute z-0 top-0 left-0 right-0 pointer-events-none'>
        {curatedSensors.length > 0 && (
          <LandingHeroBackgroundMap sensor={curatedSensors[activeSlideIndex]} />
        )}
      </div>
      <LandingHero />
      <LandingStatsSection stats={stats} />
      <LandingSensorsSlider
        sensors={curatedSensors}
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
