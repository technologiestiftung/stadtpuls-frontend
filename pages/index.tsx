import { LandingHero } from "@components/LandingHero";
import { LandingHeroBackgroundMap } from "@components/LandingHeroBackgroundMap";
import { LandingHowItWorks } from "@components/LandingHowItWorks";
import { LandingLabAbout } from "@components/LandingLabAbout";
import { LandingProjectAbout } from "@components/LandingProjectAbout";
import { LandingSensorsSlider } from "@components/LandingSensorsSlider";
import { LandingStoriesIntro } from "@components/LandingStoriesIntro";
import { getCuratedSensors } from "@lib/hooks/useCuratedSensors";
import {
  ParsedSensorType,
  parseSensorRecords,
} from "@lib/hooks/usePublicSensors";
import { getSensorsRecords } from "@lib/requests/getSensorsRecords";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { GetStaticProps } from "next";
import { FC, useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const curatedSensors = await getCuratedSensors();
    const recordsMap = await getSensorsRecords(
      curatedSensors.map(({ id }) => id)
    );
    return { props: { curatedSensors, recordsMap, error: null } };
  } catch (error) {
    console.error(JSON.stringify(error));
    return { notFound: true };
  }
};

type RecordType = Omit<definitions["records"], "measurements"> & {
  measurements: number[];
};

const LandingPage: FC<{
  curatedSensors: ParsedSensorType[];
  recordsMap: Record<string, RecordType[]>;
}> = ({ curatedSensors: rawCuratedSensors, recordsMap }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const curatedSensors = rawCuratedSensors.map(sensor => ({
    ...sensor,
    parsedRecords: parseSensorRecords(recordsMap[sensor.id] || []),
  }));

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
