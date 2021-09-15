import { render, screen } from "@testing-library/react";
import { SensorPageHeader } from ".";

const testProps = {
  id: "1",
  name: "When Array is given multiple arguments",
  description:
    "@wdanxna when Array is given multiple arguments, it iterates over the arguments object and explicitly applies each value to the new array. When you call Array.apply with an array or an object with a length property Array is going to use the length to explicitly set each value of the new array. This is why Array(5) gives an array of 5 elisions, while Array.apply(null, Array(5)) gives an array of 5 undefineds. For more information, see this answer.",
  category: {
    id: 2,
    name: "Temperatur",
    description: "Temperature sensor",
  },
  symbol: 1,
  geocoordinates: { latitude: 52.4961458, longitude: 13.4335723 },
  author: {
    username: "yupank1",
    displayName: "Atahualpa Yupanqui De la Vega Van Hilde",
  },
};

describe("SensorPageHeader component", () => {
  it("should render", () => {
    render(<SensorPageHeader {...testProps} />);
    const title = screen.getByRole("heading", {
      name: `Sensor Symbol ${testProps.symbol} ${testProps.name}`,
    });
    const backLink = screen.getByRole("link", { name: "Zurück zu Sensoren" });
    const category = screen.getByText(testProps.category.name);
    const author = screen.getByRole("link", {
      name: testProps.author.displayName,
    });
    const description = screen.getByText(testProps.description);
    const apiRoute = screen.getByRole("textbox", { name: "API Schnittstelle" });

    expect(title).toBeDefined();
    expect(backLink).toBeDefined();
    expect(category).toBeDefined();
    expect(author).toBeDefined();
    expect(description).toBeDefined();
    expect(apiRoute).toBeDefined();
  });
});
