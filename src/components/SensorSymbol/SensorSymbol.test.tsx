import { render, screen } from "@testing-library/react";
import { NUMBER_OF_SENSOR_SYMBOLS, SensorSymbol } from ".";

describe("SensorSymbol component", () => {
  it("should render", () => {
    render(
      <>
        {Array.from(Array(NUMBER_OF_SENSOR_SYMBOLS)).map((_, i) => (
          <SensorSymbol key={i} symbol={i + 1} />
        ))}
      </>
    );
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(NUMBER_OF_SENSOR_SYMBOLS);
  });

  it("should not render if id is lower than 1", () => {
    render(<SensorSymbol symbol={0} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
  it("should not render if id is higher than NUMBER_OF_SENSOR_SYMBOLS", () => {
    render(<SensorSymbol symbol={NUMBER_OF_SENSOR_SYMBOLS + 1} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
});
