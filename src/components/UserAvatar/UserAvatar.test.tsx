import { render } from "@testing-library/react";
import { UserAvatar } from ".";

describe("UserAvatar component", () => {
  it("should render a container of the default size (+1 for border size)", () => {
    render(<UserAvatar username='Vogelino' />);

    const container = document.querySelector("span");

    expect(container?.style.width).toBe("25px");
    expect(container?.style.height).toBe("25px");
  });
  it("should render a container of the provided size (+1 for border size)", () => {
    render(<UserAvatar username='Vogelino' size={30} />);

    const container = document.querySelector("span");

    expect(container?.style.width).toBe("31px");
    expect(container?.style.height).toBe("31px");
  });
});
