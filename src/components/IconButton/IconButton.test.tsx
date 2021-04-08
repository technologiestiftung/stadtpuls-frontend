import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { IconButton } from ".";

describe("IconButton component", () => {
  it("should render the data privacy link", () => {
    const handleDownload = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <IconButton
          value='Download'
          iconSource='/images/download.svg'
          clickHandler={handleDownload}
        />
      </ThemeProvider>
    );
    const moreInfoLink = screen.getByText(/Download/g);
    const image = document.querySelector("img[src='/images/download.svg']");
    fireEvent.click(moreInfoLink);
    expect(moreInfoLink).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(handleDownload).toHaveBeenCalledTimes(1);
  });
});
