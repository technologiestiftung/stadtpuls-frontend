import { render } from "@testing-library/react";
import HomePage from "../../pages";

const fakeLandingStats = {
  usersCount: 123,
  devicesCount: 1934,
  recordsCount: 1298423,
};

describe("Home page", () => {
  it("should render without failing", () => {
    render(<HomePage stats={fakeLandingStats} />);
  });
});
