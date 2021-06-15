import { getLandingStats } from ".";

describe("getLandingStats", () => {
  it("should get the vewport by string", async (): Promise<void> => {
    const stats = await getLandingStats();

    expect(stats).toMatchObject({
      usersCount: 27,
      devicesCount: 29,
      recordsCount: 10030,
    });
  });
});
