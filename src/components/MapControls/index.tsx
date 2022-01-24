import { FC } from "react";
import { NavigationControl, NavigationControlProps } from "react-map-gl";
import styles from "./MapControls.module.css";

export const MapControls: FC<NavigationControlProps> = ({
  className = "",
  ...rest
}) => (
  <NavigationControl className={[className, styles.root].join(" ")} {...rest} />
);
