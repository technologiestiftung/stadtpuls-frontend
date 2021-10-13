import { render } from "@testing-library/react";
import Signin from "../../pages/signin";

describe("signin page", () => {
  it("should render without failing", () => {
    render(<Signin />);
  });
});
