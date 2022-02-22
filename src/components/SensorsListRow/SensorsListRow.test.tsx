import { mapPublicSensor } from "@lib/hooks/usePublicSensors";
import { sensors } from "@mocks/supabaseData/sensors";
import { fireEvent, render, screen } from "@testing-library/react";
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
  it("should call mouse handlers when set", () => {
    const enterHandler = jest.fn();
    const leaveHandler = jest.fn();
    const props = mapPublicSensor(sensors[0]);
    const comp = render(<SensorsListRow {...props} />);

    const liParent = document.querySelector("li");
    if (!liParent) throw new Error("No li parent found");

    fireEvent.mouseEnter(liParent);
    expect(enterHandler).not.toHaveBeenCalled();

    fireEvent.mouseLeave(liParent);
    expect(leaveHandler).not.toHaveBeenCalled();

    comp.rerender(
      <SensorsListRow
        {...props}
        onMouseEnter={enterHandler}
        onMouseLeave={leaveHandler}
      />
    );

    fireEvent.mouseEnter(liParent);
    expect(enterHandler).toHaveBeenCalled();

    fireEvent.mouseLeave(liParent);
    expect(leaveHandler).toHaveBeenCalled();
  });
  it("should call handlers when set", () => {
    const highlightedHandler = jest.fn();
    const props = mapPublicSensor(sensors[0]);
    const comp = render(
      <SensorsListRow {...props} onHighlighted={highlightedHandler} />
    );

    expect(highlightedHandler).not.toHaveBeenCalled();

    comp.rerender(
      <SensorsListRow
        {...props}
        onHighlighted={highlightedHandler}
        isHighlighted={true}
      />
    );
    expect(highlightedHandler).toHaveBeenCalledWith(
      props.id,
      expect.anything()
    );
  });
});
