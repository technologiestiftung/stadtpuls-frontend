import { mapPublicSensor } from "@lib/hooks/usePublicSensors";
import { sensors } from "@mocks/supabaseData/sensors";
import { render, screen } from "@testing-library/react";
import { SensorCard } from ".";

jest.mock("use-is-in-viewport", () => jest.fn().mockReturnValue([true, null]));

describe("SensorCard", () => {
  it("renders correctly", () => {
    const testDescription = "I am a sensor";
    const testAuthorName = "Jane Doe";
    render(
      <SensorCard
        {...mapPublicSensor(sensors[0])}
        description={testDescription}
        authorName={testAuthorName}
      />
    );

    const chart = document.querySelector(".visx-area-closed");
    const title = screen.getByRole("heading", { name: sensors[0].name });
    const desc = screen.getByText(testDescription);
    const category = screen.getByText(sensors[0].category.name);
    const author = screen.getByText(testAuthorName);
    expect(chart).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });
  it("should trim too long descriptions", () => {
    const tooLongDescription = Array.from(Array(300))
      .map(() => "A")
      .join("");
    render(
      <SensorCard
        {...mapPublicSensor(sensors[0])}
        description={tooLongDescription}
      />
    );

    const desc = screen.getByText(`${tooLongDescription.slice(0, 150)}...`);
    expect(desc).toBeInTheDocument();
  });
});
