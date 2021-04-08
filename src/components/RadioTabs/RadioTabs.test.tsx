import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { RadioTabs } from ".";

describe("RadioTabs component", () => {
  it("should render the title, description and no of devices", (): void => {
    render(
      <ThemeProvider theme={theme}>
        <RadioTabs
          name='radio'
          changeHandler={jest.fn()}
          options={[
            {
              id: 1,
              title: "one",
              isActive: true,
            },
          ]}
        />
      </ThemeProvider>
    );

    const one = screen.getByText(/one/gi);
    expect(one).toBeInTheDocument();
  });
});
