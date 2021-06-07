import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingProjectsSlider } from "@components/LandingProjectsSlider";
import { LandingStatsSection } from "@components/LandingStatsSection";
import {
  getLandingStats,
  LandingStatsReturnType,
} from "@lib/requests/getLandingStats";
import { fakeCuratedProjects } from "@mocks/data";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const stats = await getLandingStats();
    return { props: { stats } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

const LandingPage: FC<{
  stats: LandingStatsReturnType;
}> = ({ stats }) => {
  const initialSlideIndex = Math.round(fakeCuratedProjects.length / 2) - 1;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    initialSlideIndex
  );
  return (
    <>
      <div className='absolute z-0 top-0 left-0 right-0'>
        <LandingHeroBackgroundMap
          project={fakeCuratedProjects[activeSlideIndex]}
        />
      </div>
      <LandingHero />
      <LandingStatsSection stats={stats} />
      <LandingProjectsSlider
        projects={fakeCuratedProjects}
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
