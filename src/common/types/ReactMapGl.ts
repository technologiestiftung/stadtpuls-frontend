import { FlyToInterpolator } from "react-map-gl";

export interface ViewportType {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  maxZoom: number;
  width: number;
  height: number;
  transitionDuration?: number;
  transitionEasing?: (t: number) => number;
  transitionInterpolator?: FlyToInterpolator;
}
