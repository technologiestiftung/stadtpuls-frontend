import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingProjectsSlider } from "@components/LandingProjectsSlider";
import { LandingStatsSection } from "@components/LandingStatsSection";
import { getCuratedProjects } from "@lib/hooks/useCuratedProjects";
import { PublicProject } from "@lib/hooks/usePublicProjects";
import {
  getLandingStats,
  LandingStatsReturnType,
} from "@lib/requests/getLandingStats";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [stats, curatedProjects] = await Promise.all([
      getLandingStats(),
      getCuratedProjects(),
    ]);
    return { props: { stats, curatedProjects } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

const LandingPage: FC<{
  stats: LandingStatsReturnType;
  curatedProjects?: PublicProject[];
}> = ({ stats, curatedProjects = [] }) => {
  const initialSlideIndex = Math.round(curatedProjects.length / 2) - 1;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    initialSlideIndex
  );

  return (
    <>
      <div className='absolute z-10 top-0 left-0 right-0 mix-blend-multiply pointer-events-none'>
        {curatedProjects.length > 0 && (
          <LandingHeroBackgroundMap
            project={curatedProjects[activeSlideIndex]}
          />
        )}
      </div>
      <LandingHero />
      <LandingStatsSection stats={stats} />
      <LandingProjectsSlider
        projects={curatedProjects}
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
