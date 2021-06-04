import { render } from "@testing-library/react";
import { UserAvatar } from ".";

describe("UserAvatar component", () => {
  it("should render without crashing", () => {
    render(<UserAvatar username='Vogelino' />);
  });
});
