import { BBox } from "@turf/turf";
import { isWithinBounds, markersArrayToFeatures, fitFeatureToBounds } from ".";

describe("isWithinBounds", () => {
  test("should return true when within bounds", () => {
    const isInBounds = isWithinBounds([-180, -90, 180, 90], {
      latitude: 12,
      longitude: 14,
    });
    expect(isInBounds).toBe(true);
  });
  test("should return false when outside of bounds", () => {
    const bounds = [-180, -90, 180, 90] as BBox;
    const position = {
      latitude: 12,
      longitude: 14,
    };

    const withinBounds = isWithinBounds(bounds, position);
    expect(withinBounds).toBe(true);

    const outOfBoundsEast = isWithinBounds(bounds, {
      ...position,
      longitude: bounds[2] + 1,
    });
    expect(outOfBoundsEast).toBe(false);

    const outOfBoundsWest = isWithinBounds(bounds, {
      ...position,
      longitude: bounds[0] - 1,
    });
    expect(outOfBoundsWest).toBe(false);

    const outOfBoundsSouth = isWithinBounds(bounds, {
      ...position,
      latitude: bounds[1] - 1,
    });
    expect(outOfBoundsSouth).toBe(false);

    const outOfBoundsNorth = isWithinBounds(bounds, {
      ...position,
      latitude: bounds[3] + 1,
    });
    expect(outOfBoundsNorth).toBe(false);
  });
});

describe("fitFeatureToBounds", () => {
  test("should return a lat/lng/zoom that fits to bound", () => {
    const { latitude, longitude, zoom } = fitFeatureToBounds(
      [
        { latitude: 20, longitude: 20 },
        { latitude: -20, longitude: -20 },
      ],
      {
        bearing: 0,
        pitch: 0,
        maxZoom: 20,
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: 1000,
        height: 500,
      },
      0
    );

    expect(latitude).toBe(-9.66888623164909e-13);
    expect(longitude).toBe(9.923330606166172e-13);
    expect(zoom).toBe(3.105798186928069);
  });
});

describe("coordsArrayToFeatures", () => {
  test("should transform the array of coords into features", () => {
    expect(
      markersArrayToFeatures([
        { id: 1, latitude: 20, longitude: 20, isActive: true },
        { id: 2, latitude: -20, longitude: -20, isActive: false },
      ])
    ).toMatchObject([
      {
        type: "Feature",
        id: 1,
        properties: {
          cluster: false,
        },
        geometry: {
          type: "Point",
          coordinates: [20, 20],
        },
      },
      {
        type: "Feature",
        id: 2,
        properties: {
          cluster: false,
        },
        geometry: {
          type: "Point",
          coordinates: [-20, -20],
        },
      },
    ]);
  });
});
