import { FC } from "react";
import colors from "../../style/colors";
import {
  blackDotPatternUrl,
  mainImageUrl,
  bottomSquareImageUrl,
  bottomLeftSquareImageUrl,
  topLeftSquareImageUrl,
  topRightSquareImageUrl,
} from "./landingHeroimageUrls";
import styles from "./LandingHeroImage.module.css";

const animFactor = 0.5;

export const LandingHeroImage: FC = () => {
  return (
    <div
      className={[
        "absolute bottom-0 right-0 z-10 overflow-hidden",
        styles.wrapper,
      ].join(" ")}
    >
      <svg
        width='870px'
        height='870px'
        viewBox='0 0 870 870'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <pattern
            id='top-right-square-image-pattern'
            patternUnits='objectBoundingBox'
            x='0'
            y='0'
            width='100%'
            height='100%'
          >
            <use xlinkHref='#top-right-square-image-pattern-image' />
          </pattern>
          <image
            id='top-right-square-image-pattern-image'
            width='116'
            height='116'
            xlinkHref={topRightSquareImageUrl}
          />
          <pattern
            id='black-dot-pattern'
            width='6'
            height='6'
            x='3'
            y='3'
            patternUnits='userSpaceOnUse'
          >
            <use
              xlinkHref='#black-dot-pattern-image'
              transform='scale(0.5,0.5)'
            />
          </pattern>
          <image
            id='black-dot-pattern-image'
            width='12'
            height='12'
            xlinkHref={blackDotPatternUrl}
          />
          <pattern
            id='main-image-pattern'
            patternUnits='objectBoundingBox'
            x='-3.35172414%'
            width='103.351724%'
            height='100%'
          >
            <use
              xlinkHref='#main-image-pattern-image'
              transform='scale(0.64,0.64)'
            />
          </pattern>
          <image
            id='main-image-pattern-image'
            width='967'
            height='725'
            xlinkHref={mainImageUrl}
          />
          <pattern
            id='bottom-square-image-pattern'
            patternUnits='objectBoundingBox'
            x='0'
            y='0'
            width='100%'
            height='100%'
          >
            <use xlinkHref='#bottom-square-image-pattern-image' />
          </pattern>
          <image
            id='bottom-square-image-pattern-image'
            width='116'
            height='116'
            xlinkHref={bottomSquareImageUrl}
          />
          <pattern
            id='bottom-left-square-image-pattern'
            patternUnits='objectBoundingBox'
            x='0'
            y='0'
            width='100%'
            height='100%'
          >
            <use xlinkHref='#bottom-left-square-image-pattern-image' />
          </pattern>
          <image
            id='bottom-left-square-image-pattern-image'
            width='116'
            height='116'
            xlinkHref={bottomLeftSquareImageUrl}
          />
          <pattern
            id='top-left-square-image-pattern'
            patternUnits='objectBoundingBox'
            x='0'
            y='0'
            width='100%'
            height='100%'
          >
            <use xlinkHref='#top-left-square-image-pattern-image' />
          </pattern>
          <image
            id='top-left-square-image-pattern-image'
            width='116'
            height='116'
            xlinkHref={topLeftSquareImageUrl}
          />
        </defs>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g transform='translate(-578.000000, -24.000000)'>
            <g transform='translate(578.000000, 24.000000)'>
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(50 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='290'
                y='580'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(100 * animFactor)}ms` }}
                fill={colors.green}
                x='464'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(150 * animFactor)}ms` }}
                fill='url(#top-right-square-image-pattern)'
                x='754'
                y='58'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{
                  animationDelay: `${Math.round(200 * animFactor)}ms`,
                  mixBlendMode: "screen",
                }}
                fill={colors.purple}
                x='754'
                y='58'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(250 * animFactor)}ms` }}
                fill={colors.green}
                x='116'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(300 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='174'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(350 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='116'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(400 * animFactor)}ms` }}
                fill={colors.green}
                x='290'
                y='696'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(450 * animFactor)}ms` }}
                fill={colors.green}
                x='0'
                y='638'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(550 * animFactor)}ms` }}
                fill={colors.green}
                x='638'
                y='696'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(600 * animFactor)}ms` }}
                fill={colors.green}
                x='812'
                y='696'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(700 * animFactor)}ms` }}
                fill={colors.blue}
                x='232'
                y='638'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(750 * animFactor)}ms` }}
                fill={colors.blue}
                x='0'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(800 * animFactor)}ms` }}
                fill={colors.green}
                x='348'
                y='580'
                width='58'
                height='58'
              />
              <path
                role='img'
                d='M290,464 L232,464 L232,406 L290,406 L290,348 L348,348 L348,116 L696,116 L696,58 L754,58 L754,232 L812,232 L812,348 L754,348 L754,522 L348,522 L348,406 L290,406 L290,464 Z'
                fill='url(#main-image-pattern)'
              />
              <path
                d='M290,464 L232,464 L232,406 L290,406 L290,348 L348,348 L348,116 L696,116 L696,58 L754,58 L754,232 L812,232 L812,348 L754,348 L754,522 L348,522 L348,406 L290,406 L290,464 Z'
                fill={colors.blue}
                opacity='0.501464844'
                style={{ mixBlendMode: "lighten" }}
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(850 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='290'
                y='406'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(900 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='696'
                y='348'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(950 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='812'
                y='174'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1000 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='754'
                y='522'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1050 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='522'
                y='522'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1100 * animFactor)}ms` }}
                fill='url(#bottom-square-image-pattern)'
                x='406'
                y='580'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{
                  animationDelay: `${Math.round(1150 * animFactor)}ms`,
                  mixBlendMode: "screen",
                }}
                fill={colors.green}
                x='406'
                y='580'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1200 * animFactor)}ms` }}
                fill={colors.purple}
                x='522'
                y='580'
                width='58'
                height='58'
              />
              <rect
                style={{ animationDelay: `${Math.round(1250 * animFactor)}ms` }}
                fill={colors.purple}
                x='348'
                y='58'
                width='58'
                height='58'
                className={`animate-slide-in ${styles.hiddenSmall}`}
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1300 * animFactor)}ms` }}
                fill='url(#bottom-left-square-image-pattern)'
                x='174'
                y='522'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{
                  animationDelay: `${Math.round(1350 * animFactor)}ms`,
                  mixBlendMode: "screen",
                }}
                fill={colors.purple}
                x='174'
                y='522'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1400 * animFactor)}ms` }}
                fill='url(#top-left-square-image-pattern)'
                x='290'
                y='174'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{
                  animationDelay: `${Math.round(1450 * animFactor)}ms`,
                  mixBlendMode: "screen",
                }}
                fill={colors.green}
                x='290'
                y='174'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1500 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='58'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1550 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='290'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1600 * animFactor)}ms` }}
                fill={colors.purple}
                x='290'
                y='638'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1650 * animFactor)}ms` }}
                fill={colors.purple}
                x='58'
                y='580'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1750 * animFactor)}ms` }}
                fill={colors.purple}
                x='754'
                y='638'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1800 * animFactor)}ms` }}
                fill={colors.purple}
                x='812'
                y='348'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(1850 * animFactor)}ms` }}
                fill={colors.purple}
                x='174'
                y='290'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2000 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='522'
                y='464'
                width='116'
                height='116'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2050 * animFactor)}ms` }}
                fill={colors.green}
                x='696'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2100 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='812'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2200 * animFactor)}ms` }}
                fill={colors.gray["100"]}
                x='812'
                y='232'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2250 * animFactor)}ms` }}
                fill={colors.blue}
                x='696'
                y='406'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2300 * animFactor)}ms` }}
                fill={colors.blue}
                x='580'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2350 * animFactor)}ms` }}
                fill={colors.blue}
                x='232'
                y='116'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2400 * animFactor)}ms` }}
                fill={colors.blue}
                x='754'
                y='406'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2450 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='406'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2500 * animFactor)}ms` }}
                fill={colors.blue}
                x='696'
                y='580'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2550 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='348'
                y='522'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2600 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='348'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2650 * animFactor)}ms` }}
                fill={colors.purple}
                x='522'
                y='464'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2750 * animFactor)}ms` }}
                fill='url(#black-dot-pattern)'
                x='812'
                y='638'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2800 * animFactor)}ms` }}
                fill={colors.blue}
                x='812'
                y='232'
                width='58'
                height='58'
              />
              <rect
                className='animate-slide-in'
                style={{ animationDelay: `${Math.round(2850 * animFactor)}ms` }}
                fill={colors.blue}
                x='812'
                y='0'
                width='58'
                height='58'
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
