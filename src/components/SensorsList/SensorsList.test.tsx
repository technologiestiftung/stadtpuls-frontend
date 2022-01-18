import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { screen, render } from "@testing-library/react";
import { SensorsList } from ".";
describe("SensorsList component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const { sensors } = await getPublicSensors();
    if (sensors) render(<SensorsList sensors={sensors} />);

    const h1 = screen.getByText(sensors[0].name);
    expect(h1).toBeInTheDocument();
  });
});
