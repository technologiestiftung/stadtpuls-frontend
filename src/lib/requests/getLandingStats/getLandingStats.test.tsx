import { parsedSensors } from "@mocks/supabaseData/sensors";
import { userprofiles } from "@mocks/supabaseData/userprofiles";
import { getLandingStats } from ".";

describe("getLandingStats", () => {
  it("should get the landing stats", async (): Promise<void> => {
    const stats = await getLandingStats();

    expect(stats).toMatchObject({
      usersCount: userprofiles.length,
      sensorsCount: parsedSensors.length,
      recordsCount: 10030,
    });
  });
});
