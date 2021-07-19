import { forwardRef } from "react";
import colors from "../../style/colors";

// eslint-disable-next-line react/display-name
export const CityLABLogoSymbol = forwardRef<HTMLAnchorElement>(
  (_props, ref) => (
    <a
      href='https://www.citylab-berlin.org'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Website des CityLAB Berlin'
      ref={ref}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='36'
        viewBox='0 0 32 36'
      >
        <g fill='none'>
          <polygon
            fill={colors.blue}
            points='19.943 25.588 14.118 22.185 14.229 6.974 26.121 0 31.765 3.309 31.742 18.616'
          />
          <polygon
            fill={colors.green}
            points='14.118 4.834 12.236 5.954 12.187 12.763 5.51 16.738 5.422 29.118 0 25.903 .11 10.563 11.925 3.529'
          />
          <polygon
            fill={colors.purple}
            points='12.548 14.118 12.486 22.689 19.669 26.937 24.706 23.924 24.699 29.111 12.889 36.176 7.059 32.728 7.17 17.312'
          />
        </g>
      </svg>
    </a>
  )
);
