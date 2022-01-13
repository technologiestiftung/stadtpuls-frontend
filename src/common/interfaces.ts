import { ReactNode } from "react";
interface Heading {
  fontFamily: string;
  lineHeight: string;
  fontWeight?: string;
  fontSize?: number | number[];
  color?: string;
}

export interface Theme {
  space: number[];
  breakpoints: string[];
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  fontSizes: number[];
  fontWeights: {
    body: number;
    heading: number;
    bold: number;
  };
  lineHeights: {
    body: number;
    heading: number;
  };
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    mediumgrey: string;
    lightgrey: string;
    muted: string;
  };
  text: {
    heading: Heading;
    h1: Heading;
    h2: Heading;
    h3: Heading;
    h4: Heading;
    h5: Heading;
    h6: Heading;
  };
  layout: {
    container: {
      maxWidth: string;
    };
  };
  styles: {
    root: {
      fontFamily: string;
      lineHeight: string;
      fontWeight: string;
      minHeight: string;
      backgroundSize: string;
    };
    p: {
      color: string;
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
    };
    pre: {
      fontFamily: string;
      overflowX: string;
      code: {
        color: string;
      };
    };
    code: {
      fontFamily: string;
      fontSize: string;
    };
    table: {
      width: string;
      borderCollapse: string;
      borderSpacing: number;
    };
    th: {
      textAlign: string;
      borderBottomStyle: string;
    };
    td: {
      textAlign: string;
      borderBottomStyle: string;
    };
    img: {
      maxWidth: string;
    };
    a: {
      color: string;
      textDecoration: string;
      "&:hover": {
        color: string;
      };
      "&:focus": {
        bg: string;
      };
      "&:active": {
        bg: string;
      };
    };
  };
  cards: {
    primary: {
      padding: number;
      borderRadius: number;
      backgroundColor: string;
      boxShadow: string;
    };
  };
  buttons: {
    primary: {
      color: string;
      bg: string;
      "&:hover": {
        bg: string;
      };
    };
    secondary: {
      color: string;
      bg: string;
    };
    text: {
      color: string;
      bg: string;
      fontWeight: string;
      p: number;
      "&:hover": {
        cursor: string;
      };
    };
  };
  links: {
    footer: {
      color: string;
      textDecoration: string;
      "&:hover": {
        color: string;
      };
      "&:focus": {
        bg: string;
      };
      "&:active": {
        bg: string;
      };
    };
  };
  forms: {
    input: {
      border: string;
      borderRadius: string;
      padding: number;
      bg: string;
    };
  };
}

export interface DateValueType {
  date: string;
  value: number;
}

export interface LineGraphType {
  width: number;
  height: number;
  data: Array<DateValueType>;
  yAxisUnit?: string;
  xAxisUnit?: string;
  startDateTimeString?: string;
  endDateTimeString?: string;
}

export interface MarkerType {
  latitude: number;
  longitude: number;
  id: number;
  isActive: boolean;
  isPulsating?: boolean;
  children?: ReactNode;
}
