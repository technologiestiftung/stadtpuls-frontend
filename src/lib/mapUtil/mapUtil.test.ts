import { isWithinBounds, fitFeatureToBounds } from ".";

describe("isWithinBounds", () => {
  test("should return true when within bounds", () => {
    const isInBounds = isWithinBounds(
      {
        north: 90,
        south: -90,
        east: 180,
        west: -180,
      },
      {
        latitude: 12,
        longitude: 14,
      }
    );
    expect(isInBounds).toBe(true);
  });
  test("should return false when outside of bounds", () => {
    const bounds = {
      north: 20,
      south: -20,
      east: 20,
      west: -20,
    };
    const position = {
      latitude: 12,
      longitude: 14,
    };

    const withinBounds = isWithinBounds(bounds, position);
    expect(withinBounds).toBe(true);

    const outOfBoundsEast = isWithinBounds(bounds, {
      ...position,
      longitude: bounds.east + 1,
    });
    expect(outOfBoundsEast).toBe(false);

    const outOfBoundsWest = isWithinBounds(bounds, {
      ...position,
      longitude: bounds.west - 1,
    });
    expect(outOfBoundsWest).toBe(false);

    const outOfBoundsSouth = isWithinBounds(bounds, {
      ...position,
      latitude: bounds.south - 1,
    });
    expect(outOfBoundsSouth).toBe(false);

    const outOfBoundsNorth = isWithinBounds(bounds, {
      ...position,
      latitude: bounds.north + 1,
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
