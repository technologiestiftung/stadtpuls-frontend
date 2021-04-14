import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const TsbLogoSymbol = forwardRef<HTMLAnchorElement>((_props, ref) => (
  <a
    href='https://technologiestiftung-berlin.de/'
    target='_blank'
    rel='noopener noreferrer'
    ref={ref}
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='2em'
      height='2em'
      viewBox='0 0 183 183'
    >
      <defs>
        <path id='prefix__a' d='M0 0h51.933v46.828H0z' />
        <path id='prefix__c' d='M0 0h165.703v116.326H0z' />
        <path id='prefix__e' d='M0 0h165.703v80.279H0z' />
        <path id='prefix__g' d='M0 0h144.501v97.358H0z' />
        <path id='prefix__i' d='M0 0h102.883v61.312H0z' />
      </defs>
      <g fill='none' fillRule='evenodd' transform='translate(0 23.971)'>
        <g transform='translate(0 88.353)'>
          <mask id='prefix__b' fill='#fff'>
            <use xlinkHref='#prefix__a' />
          </mask>
          <path
            fill='#E40134'
            fillRule='nonzero'
            mask='url(#prefix__b)'
            d='M15.438 46.828L-.004.444.731 0l51.202 8.585-.405.421z'
          />
        </g>
        <path
          fill='#71CBF4'
          fillRule='nonzero'
          d='M35.748 13.899l146.925 64.954-16.965 37.468L.003 88.799z'
        />
        <mask id='prefix__d' fill='#fff'>
          <use xlinkHref='#prefix__c' />
        </mask>
        <path
          fill='#63B9E9'
          fillRule='nonzero'
          mask='url(#prefix__d)'
          d='M-.002 88.796L144.501 0l21.202 116.326z'
        />
        <g transform='translate(0 36.047)'>
          <mask id='prefix__f' fill='#fff'>
            <use xlinkHref='#prefix__e' />
          </mask>
          <path
            fill='#3192D0'
            fillRule='nonzero'
            mask='url(#prefix__f)'
            d='M-.002 52.749L85.844 0l70.942 31.359 8.917 48.92z'
          />
        </g>
        <mask id='prefix__h' fill='#fff'>
          <use xlinkHref='#prefix__g' />
        </mask>
        <path
          fill='#3A5BA7'
          fillRule='nonzero'
          mask='url(#prefix__h)'
          d='M-.002 88.796L144.501 0l-92.97 97.358z'
        />
        <g transform='translate(0 36.047)'>
          <mask id='prefix__j' fill='#fff'>
            <use xlinkHref='#prefix__i' />
          </mask>
          <path
            fill='#213A8F'
            fillRule='nonzero'
            mask='url(#prefix__j)'
            d='M-.002 52.749L85.844 0l17.039 7.531-51.352 53.781z'
          />
        </g>
      </g>
    </svg>
  </a>
));
