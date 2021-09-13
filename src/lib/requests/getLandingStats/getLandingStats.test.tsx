import { getLandingStats } from ".";

describe("getLandingStats", () => {
  it("should get the landing stats", async (): Promise<void> => {
    const stats = await getLandingStats();

    expect(stats).toMatchObject({
      usersCount: 27,
      sensorsCount: 29,
      recordsCount: 10030,
    });
  });
});
