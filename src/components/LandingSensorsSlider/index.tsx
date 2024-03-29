import { FC, useEffect, useState } from "react";
import Swiper from "swiper";
import SwiperClass from "swiper/types/swiper-class";
import styles from "./LandingSensorsSlider.module.css";

import "swiper/swiper-bundle.css";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { SensorCard } from "@components/SensorCard";
import { getCuratedSensorImageById } from "@lib/getCuratedSensorImageById";

interface LandingSensorsSliderPropType {
  sensors: ParsedSensorType[];
  slideIndex?: number;
  onSlideChange?: (slideIndex: number) => void;
}

export const LandingSensorsSlider: FC<LandingSensorsSliderPropType> = ({
  sensors,
  slideIndex = 0,
  onSlideChange = () => undefined,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  useEffect(() => {
    const parentElement = document.getElementById("sensors-slider");
    if (!parentElement) return;
    const swiper = new Swiper("#sensors-slider", {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 24,
      loop: false,
      initialSlide: slideIndex,
      height: 340,
      slideActiveClass: styles.sliderSlideActive || "active",
      on: {
        slideChange: swiper => {
          onSlideChange(swiper.activeIndex);
        },
      },
      breakpoints: {
        960: {
          spaceBetween: 64,
        },
      },
    });

    setSwiperInstance(swiper);

    return () => swiper.destroy();
  }, []);

  useEffect(() => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(slideIndex);
  }, [slideIndex]);

  return (
    <section
      className={[
        "overflow-hidden px-8 md:px-24 lg:px-32 xl:px-40",
        "-translate-y-4 z-20 relative",
      ].join(" ")}
    >
      <div className={styles.sliderParent}>
        <div className='swiper-container' id='sensors-slider'>
          <div className='swiper-wrapper'>
            {sensors.map(sensor => (
              <div
                className={`swiper-slide ${styles.sliderSlide}`}
                key={sensor.id}
              >
                <SensorCard
                  key={sensor.id}
                  {...sensor}
                  parsedRecords={sensor.parsedRecords}
                  withMapLabels={false}
                  withMapBackground={false}
                  backgroundImage={getCuratedSensorImageById(sensor.id)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => swiperInstance && swiperInstance.slidePrev()}
            className={[
              swiperInstance?.activeIndex === 0 && "opacity-0",
              styles.sliderButton,
              styles.sliderPrevButton,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.sliderButtonIcon}>
              <ArrowBack />
            </span>
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className={[
              swiperInstance?.activeIndex === sensors.length - 1 && "opacity-0",
              styles.sliderButton,
              styles.sliderNextButton,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.sliderButtonIcon}>
              <ArrowForward />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
