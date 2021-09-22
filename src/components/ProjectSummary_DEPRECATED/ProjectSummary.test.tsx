import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { ProjectSummary } from ".";

describe("ProjectSummary component", () => {
  it("should render the title, description and no of devices", (): void => {
    render(
      <ThemeProvider theme={theme}>
        <ProjectSummary
          title='Title'
          noOfDevices={5}
          description='Description'
        />
      </ThemeProvider>
    );

    const title = screen.getByText(/Title/gi);
    const description = screen.getByText(/Description/gi);
    const text = screen.getByText(/Anzahl der Sensoren: 5/gi);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
