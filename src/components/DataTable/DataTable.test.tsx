import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";

import theme from "../../style/theme";
import store from "../../state/store";
import { RecordType } from "../../common/interfaces";

import { DataTable } from ".";

const fakeData: RecordType[] = [
  {
    id: 1,
    deviceId: 2,
    recordedAt: "2021-04-08T13:23:04.753Z",
    value: 20,
  },
];

describe("DataTable component", () => {
  it("should render the title", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <DataTable data={[]} title='This is my title' />
        </ThemeProvider>
      </StoreProvider>
    );
    const title = screen.getByText(/This is my title/g);
    expect(title).toBeInTheDocument();
  });
  it("should render the data", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <DataTable data={fakeData} title='This is my title' />
        </ThemeProvider>
      </StoreProvider>
    );
    const date = screen.getByText("4/8/2021");
    const time = screen.getByText("13:23:04");
    const value = screen.getByText("20");
    const tableRows = document.querySelectorAll("tbody > tr");
    expect(tableRows).toHaveLength(fakeData.length);
    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
