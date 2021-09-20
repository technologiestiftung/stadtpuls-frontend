import { render, screen } from "@testing-library/react";

import { DataTable } from ".";
import moment from "moment";

const fakeData = [
  {
    id: 1,
    deviceId: 2,
    date: moment.parseZone("2021-04-08T13:23:04.753Z"),
    value: 20,
  },
];

describe("DataTable component", () => {
  it("should render the data", () => {
    render(<DataTable data={fakeData} />);
    const date = screen.getByText("08.04.2021");
    const time = screen.getByText("13:23:04");
    const value = screen.getByText("20");
    const tableRows = document.querySelectorAll("tbody > tr");
    expect(tableRows).toHaveLength(fakeData.length);
    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
  it("should render the data sorted", () => {
    render(<DataTable data={fakeData} />);
    const date = screen.getByText("08.04.2021");
    const time = screen.getByText("13:23:04");
    const value = screen.getByText("20");
    const tableRows = document.querySelectorAll("tbody > tr");
    expect(tableRows).toHaveLength(fakeData.length);
    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
