import { render } from "@testing-library/react";
import * as swr from "swr";
import Signup from "../../pages/signup";

describe("signup page", () => {
  it("should render without failing", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swr.default = jest.fn().mockReturnValue({ isUnique: true });
    render(<Signup />);
  });
});
