import { fakeDateValueRecords } from "@mocks/supabaseData/deviceRecords";
import { render, screen } from "@testing-library/react";
import { SensorCard } from ".";

jest.mock("use-is-in-viewport", () => jest.fn().mockReturnValue([true, null]));

describe("SensorCard", () => {
  it("renders correctly", () => {
    render(
      <SensorCard
        id='test'
        name='Test Sensor'
        description='I am your sensors favourite sensor'
        category={{ name: "Temperatur", id: 2, description: "Temperatur" }}
        symbol={4}
        authorName='Vogelino'
        records={fakeDateValueRecords}
        geocoordinates={{
          latitude: 12.124533,
          longitude: 43.215353,
        }}
      />
    );

    const chart = document.querySelector(".visx-area-closed");
    const title = screen.getByRole("heading", { name: "Test Sensor" });
    const desc = screen.getByText("I am your sensors favourite sensor");
    const category = screen.getByText("Temperatur");
    const author = screen.getByText("Vogelino");
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
        id='test'
        name='Test Sensor'
        description={tooLongDescription}
        category={{ name: "Temperatur", id: 2, description: "Temperatur" }}
        symbol={4}
        authorName='Vogelino'
        records={fakeDateValueRecords}
        geocoordinates={{
          latitude: 12.124533,
          longitude: 43.215353,
        }}
      />
    );

    const desc = screen.getByText(`${tooLongDescription.slice(0, 150)}...`);
    expect(desc).toBeInTheDocument();
  });
});
