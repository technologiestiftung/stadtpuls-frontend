import { render, screen } from "@testing-library/react";
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
  it("should render the data", () => {
    render(<DataTable data={fakeData} />);
    const date = screen.getByText("08.04.2021");
    const time = screen.getByText("15:23:04");
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
    const time = screen.getByText("15:23:04");
    const value = screen.getByText("20");
    const tableRows = document.querySelectorAll("tbody > tr");
    expect(tableRows).toHaveLength(fakeData.length);
    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
