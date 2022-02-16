import { render, screen, fireEvent } from "@testing-library/react";
import { SensorPageHeader } from ".";

const testProps = {
  id: 1,
  createdAt: new Date().toISOString(),
  name: "When Array is given multiple arguments",
  externalId: undefined,
  connectionType: "http" as const,
  description:
    "@wdanxna when Array is given multiple arguments, it iterates over the arguments object and explicitly applies each value to the new array. When you call Array.apply with an array or an object with a length property Array is going to use the length to explicitly set each value of the new array. This is why Array(5) gives an array of 5 elisions, while Array.apply(null, Array(5)) gives an array of 5 undefineds. For more information, see this answer.",
  categoryId: 1,
  categoryName: "Temperatur",
  symbolId: 1,
  latitude: 52.4961458,
  longitude: 13.4335723,
  authorId: "1",
  authorUsername: "yupank1",
  authorName: "Atahualpa Yupanqui De la Vega Van Hilde",
  withEditButton: true,
  parsedRecords: [],
};

describe("SensorPageHeader component", () => {
  it("should render", () => {
    const onEditButtonClick = jest.fn();
    render(
      <SensorPageHeader {...testProps} onEditButtonClick={onEditButtonClick} />
    );
    const title = screen.getByRole("heading", {
      name: `Sensor Symbol ${testProps.symbolId} ${testProps.name}`,
    });
    const backLink = screen.getByRole("link", { name: "Zurück zu Sensoren" });
    const category = screen.getByText(testProps.categoryName);
    const author = screen.getByRole("link", {
      name: `Avatar of ${testProps.authorUsername} ${testProps.authorName}`,
    });
    const description = screen.getByText(testProps.description);
    const apiRoute = screen.getByRole("textbox", { name: "API Schnittstelle" });
    const editButton = screen.getByRole("button", {
      name: "Sensor editieren",
    });

    expect(title).toBeDefined();
    expect(backLink).toBeDefined();
    expect(category).toBeDefined();
    expect(author).toBeDefined();
    expect(description).toBeDefined();
    expect(apiRoute).toBeDefined();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(onEditButtonClick).toHaveBeenCalled();
  });
});
