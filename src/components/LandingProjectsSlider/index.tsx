import { FC, useEffect } from "react";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import styles from "./LandingProjectsSlider.module.css";

import "swiper/swiper-bundle.css";
import { ProjectPreview } from "@components/ProjectPreview";
import { PublicProject } from "@lib/hooks/usePublicProjects";

SwiperCore.use([Navigation, Pagination]);

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
  useEffect(() => {
    const swiper = new Swiper("#projects-slider", {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 64,
      loop: false,
      initialSlide: initialSlideIndex,
      height: 340,
      slideActiveClass: "lg:-translate-y-0",
      on: {
        slideChange: swiper => {
          onSlideChange(swiper.activeIndex);
        },
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
        },
      },
    });
    return () => swiper.destroy();
  }, [projects.length, initialSlideIndex, onSlideChange]);

  return (
    <section
      className='overflow-hidden px-4 sm:px-8 my-12 sm:my-24 md:my-40'
      style={{ marginTop: "calc(100vh - 170px)" }}
    >
      <div className={styles.sliderParent}>
        <div className='swiper-container' id='projects-slider'>
          <div className='swiper-wrapper'>
            {projects.map(project => (
              <div
                className='swiper-slide transition transform translate-y-16'
                key={project.id}
              >
                <ProjectPreview {...project} location={undefined} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};