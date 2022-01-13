import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { screen, render } from "@testing-library/react";
import { SensorsMap } from ".";
describe("SensorsMap component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const sensors = await getPublicSensors();
    if (sensors)
      render(
        <SensorsMap
          sensors={sensors}
          paginationProps={{ currentPage: 1, pageCount: 12 }}
        />
      );

    const h1 = screen.getByText(sensors[0].name);
    expect(h1).toBeInTheDocument();
  });
});
