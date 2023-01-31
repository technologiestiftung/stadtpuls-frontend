const isProduction =
  process.env["NODE_ENV"] === "production" &&
  process.env["VERCEL_ENV"] !== "preview";

export const SENSORS_IDS = [22, 23, 24, 25, 27, 28, 29];

export const getCuratedSensorImageById = (id: number): string => {
  if (isProduction) return `/images/sensors/${id}.jpeg`;
  const indexOfId = SENSORS_IDS.indexOf(id);
  return `/images/sensors/${SENSORS_IDS[indexOfId]}.jpeg`;
};
