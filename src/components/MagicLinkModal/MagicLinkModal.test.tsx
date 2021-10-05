import { render } from "@testing-library/react";
import { MagicLinkModal } from ".";

describe("MagicLinkModal", () => {
  it("it should render without crashing", () => {
    render(<MagicLinkModal isLoading email='test@example.com' />);
  });
});
