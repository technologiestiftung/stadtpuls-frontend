import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../style/theme";

import SensorsOverviewPage from "../../pages/sensors";
import { curatedSensors } from "@mocks/supabaseData/sensors";

describe("home page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <SensorsOverviewPage
          sensorsData={{
            count: curatedSensors.length,
            sensors: curatedSensors,
          }}
        />
      </ThemeProvider>
    );
  });
});
