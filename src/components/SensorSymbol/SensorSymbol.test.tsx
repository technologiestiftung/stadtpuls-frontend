import { render, screen } from "@testing-library/react";
import { SensorSymbol } from ".";

describe("SensorSymbol component", () => {
  it("should render", () => {
    render(
      <>
        {Array.from(Array(32)).map((_, i) => (
          <SensorSymbol key={i} symbol={i + 1} />
        ))}
      </>
    );
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(32);
  });

  it("should not render if id is lower than 1", () => {
    render(<SensorSymbol symbol={0} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
  it("should not render if id is higher than 32", () => {
    render(<SensorSymbol symbol={33} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
});
