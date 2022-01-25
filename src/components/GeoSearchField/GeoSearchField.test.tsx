import { testFeatures } from "@lib/hooks/useGeocodedPlace/useGeocodedPlace.test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GeoSearchField } from ".";

describe("GeoSearchField", () => {
  test("should call handler with results on click", async () => {
    const searchTerm = "Nollen";
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(
          ctx.status(200, "Mocked status"),
          ctx.json({ features: testFeatures })
        )
      )
    );
    server.listen();

    const onPlaceClick = jest.fn();
    render(<GeoSearchField onPlaceClick={onPlaceClick} />);

    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: searchTerm } });

    await waitFor(() => {
      const highlightedItem = screen.getByText(
        testFeatures[1].place_name_de.replace(searchTerm, "")
      );

      expect(highlightedItem).toBeInTheDocument();

      fireEvent.click(highlightedItem);
    });

    expect(onPlaceClick).toHaveBeenCalledWith({
      bbox: undefined,
      id: testFeatures[1].id,
      latitude: testFeatures[1].geometry.coordinates[1],
      longitude: testFeatures[1].geometry.coordinates[0],
      name: testFeatures[1].place_name_de,
    });
  });
  test("should call handler with results on keyboard navigation", async () => {
    const searchTerm = "Nollen";
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(
          ctx.status(200, "Mocked status"),
          ctx.json({ features: testFeatures })
        )
      )
    );
    server.listen();

    const onPlaceClick = jest.fn();
    render(<GeoSearchField onPlaceClick={onPlaceClick} />);

    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: searchTerm } });
    fireEvent.keyDown(inputField, { key: "ArrowDown" });

    await waitFor(() => {
      const highlightedItem = screen.getByText(
        testFeatures[1].place_name_de.replace(searchTerm, "")
      );

      expect(highlightedItem).toBeInTheDocument();

      fireEvent.click(highlightedItem);
    });

    expect(onPlaceClick).toHaveBeenCalledWith({
      bbox: undefined,
      id: testFeatures[1].id,
      latitude: testFeatures[1].geometry.coordinates[1],
      longitude: testFeatures[1].geometry.coordinates[0],
      name: testFeatures[1].place_name_de,
    });
  });
});
