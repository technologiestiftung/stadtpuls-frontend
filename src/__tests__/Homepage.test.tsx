import { render } from "@testing-library/react";
import HomePage from "../../pages";

describe("Home page", () => {
  it("should render without failing", () => {
    render(<HomePage />);
  });
});
