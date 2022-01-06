import { mapPublicSensor } from "@lib/hooks/usePublicSensors";
import { sensors } from "@mocks/supabaseData/sensors";
import { render, screen } from "@testing-library/react";
import { DESCRIPTION_MAX_LENGTH, SensorsListRow } from ".";

jest.mock("use-is-in-viewport", () => jest.fn().mockReturnValue([true, null]));

describe("SensorsListRow", () => {
  it("renders correctly", () => {
    const testDescription = "I am a sensor";
    const testAuthorName = "Jane Doe";
    render(
      <SensorsListRow
        {...mapPublicSensor(sensors[0])}
        description={testDescription}
        authorName={testAuthorName}
      />
    );

    const chart = document.querySelector(".visx-linepath");
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
    const tooLongDescription = Array.from(Array(500))
      .map(() => "A")
      .join("");
    render(
      <SensorsListRow
        {...mapPublicSensor(sensors[0])}
        description={tooLongDescription}
      />
    );

    const desc = screen.getByText(
      `${tooLongDescription.slice(0, DESCRIPTION_MAX_LENGTH)}...`
    );
    expect(desc).toBeInTheDocument();
  });
  it("should not transform hashtags and arobases into twitter links", () => {
    const description = "I am a sensor #hashtag and @author";
    render(
      <SensorsListRow
        {...mapPublicSensor(sensors[0])}
        description={description}
      />
    );

    const desc = screen.getByText(description);
    const links = desc.querySelectorAll("a");
    expect(desc).toBeInTheDocument();
    expect(links.length).toBe(0);
  });
});
