import { FC, useEffect, useState } from "react";
import Swiper from "swiper";
import SwiperClass from "swiper/types/swiper-class";
import styles from "./LandingProjectsSlider.module.css";

import "swiper/swiper-bundle.css";
import { ProjectPreview } from "@components/ProjectPreview";
import { PublicProject } from "@lib/hooks/usePublicProjects";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

interface LandingProjectsSliderPropType {
  projects: PublicProject[];
  initialSlideIndex?: number;
  onSlideChange?: (slideIndex: number) => void;
}

export const LandingProjectsSlider: FC<LandingProjectsSliderPropType> = ({
  projects,
  initialSlideIndex = 0,
  onSlideChange = () => undefined,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  useEffect(() => {
    const parentElement = document.getElementById("projects-slider");
    if (!parentElement) return;
    const swiper = new Swiper("#projects-slider", {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 24,
      loop: false,
      initialSlide: initialSlideIndex,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className='overflow-hidden px-8 md:px-24 lg:px-32 xl:px-40 my-12 sm:my-24 md:my-40'
      style={{ marginTop: "calc(93vh - 340px)" }}
    >
      <div className={styles.sliderParent}>
        <div className='swiper-container' id='projects-slider'>
          <div className='swiper-wrapper'>
            {projects.map(project => (
              <div
                className={`swiper-slide ${styles.sliderSlide}`}
                key={project.id}
              >
                <ProjectPreview {...project} withMapBackground={false} />
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
              swiperInstance?.activeIndex === projects.length - 1 &&
                "opacity-0",
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
