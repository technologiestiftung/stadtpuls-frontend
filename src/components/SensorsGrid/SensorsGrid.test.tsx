import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { SensorsGrid } from ".";
import { getPublicSensors } from "@lib/hooks/usePublicSensors";
describe("SensorsGrid component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const data = await getPublicSensors();
    if (data)
      render(
        <ThemeProvider theme={theme}>
          <SensorsGrid sensors={data.sensors} />
        </ThemeProvider>
      );

    const h1 = screen.getByText(data.sensors[0].name as string);
    expect(h1).toBeInTheDocument();
  });
});
