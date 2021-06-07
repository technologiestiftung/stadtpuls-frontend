import { render, screen } from "@testing-library/react";
import { LandingStatsSection } from ".";

describe("LandingStatsSection component", () => {
  it("should render the stats", () => {
    const testStats = {
      usersCount: 123,
      devicesCount: 432,
      recordsCount: 100234,
    };
    render(<LandingStatsSection stats={testStats} />);
    const usersCount = screen.getByText(`${testStats.usersCount}`);
    const devicesCount = screen.getByText(`${testStats.devicesCount}`);
    const recordsCount = screen.getByText(`${testStats.recordsCount}`);
    expect(usersCount).toBeInTheDocument();
    expect(devicesCount).toBeInTheDocument();
    expect(recordsCount).toBeInTheDocument();
  });
});
