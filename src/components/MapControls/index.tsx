import { FC } from "react";
import {
  GeolocateControl,
  NavigationControl,
  NavigationControlProps,
} from "react-map-gl";
import styles from "./MapControls.module.css";

export const MapControls: FC<NavigationControlProps> = ({
  className = "",
  style = {},
  ...rest
}) => (
  <div className={[className, styles.root].join(" ")} style={style}>
    <GeolocateControl
      className={[styles.button, styles.geolocateControl].join(" ")}
    />
    <NavigationControl
      className={[styles.button, styles.navigationControl].join(" ")}
      showCompass={false}
      {...rest}
    />
  </div>
);
