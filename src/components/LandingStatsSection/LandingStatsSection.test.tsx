import { render, screen } from "@testing-library/react";
import { LandingStatsSection } from ".";

describe("LandingStatsSection component", () => {
  it("should render the stats", () => {
    const testStats = {
      usersCount: 123,
      sensorsCount: 432,
      recordsCount: 100234,
    };
    render(<LandingStatsSection stats={testStats} />);
    const usersCount = screen.getByText(`${testStats.usersCount}`);
    const sensorsCount = screen.getByText(`${testStats.sensorsCount}`);
    const recordsCount = screen.getByText(`${testStats.recordsCount}`);
    expect(usersCount).toBeInTheDocument();
    expect(sensorsCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
  });
});
