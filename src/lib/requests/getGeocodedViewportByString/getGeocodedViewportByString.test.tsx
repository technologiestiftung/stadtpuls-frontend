import { fakeGeocondingData } from "@mocks/mapboxData";
import { getGeocodedViewportByString } from ".";

describe("getGeocodedViewportByString", () => {
  it("should get the vewport by string", async (): Promise<void> => {
    const viewport = await getGeocodedViewportByString("Berlin");

    expect(fakeGeocondingData.features[0].center[0]).toBe(viewport?.longitude);
    expect(fakeGeocondingData.features[0].center[1]).toBe(viewport?.latitude);
  });
});
