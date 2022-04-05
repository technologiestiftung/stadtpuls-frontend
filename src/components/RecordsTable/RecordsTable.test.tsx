import { render, screen } from "@testing-library/react";
import { RecordsTable } from ".";

const testData = Array.from(Array(30)).map((_, i) => ({
  id: i + 1,
  date: `2022-01-${i + 1}T00:00:00:00Z`,
  value: 20,
}));

describe("RecordsTable", () => {
  test("should render data as rows with checkboxes", () => {
    const arrayLength = 5;
    render(<RecordsTable data={testData.slice(0, arrayLength)} />);

    const table = screen.getByRole("table");
    const rowGroups = screen.getAllByRole("rowgroup");
    const rows = screen.getAllByRole("row");
    const checkboxes = screen.getAllByRole("checkbox");

    expect(table).toBeInTheDocument();
    expect(rowGroups).toHaveLength(2);
    expect(rows).toHaveLength(arrayLength + 1);
    expect(checkboxes).toHaveLength(arrayLength + 1);
  });
  // test("should select checkboxes", () => {
  //   const arrayLength = 5;
  //   render(<RecordsTable data={testData.slice(0, arrayLength)} />);

  //   const checkboxes = screen.getAllByRole("checkbox");
  //   const checkAllCheckbox = screen.getByRole("checkbox", {
  //     name: "Toggle All Rows Selected",
  //   });

  //   const deleteButtonHidden = screen.getByRole("button", {
  //     name: "0 Werte löschen",
  //   });
  //   expect(deleteButtonHidden).toBeDisabled();
  //   expect(deleteButtonHidden).toHaveClass("opacity-0");

  //   userEvent.click(checkboxes[1]);
  //   expect(checkboxes[1]).toBeChecked();
  //   const deleteButtonWith1 = screen.getByRole("button", {
  //     name: "1 Wert löschen",
  //   });
  //   expect(deleteButtonWith1).toBeInTheDocument();
  //   expect(deleteButtonWith1).not.toBeDisabled();
  //   expect(deleteButtonWith1).toHaveClass("opacity-100");
  //   expect(deleteButtonHidden).toHaveClass("opacity-100");

  //   userEvent.click(checkboxes[2]);
  //   expect(checkboxes[2]).toBeChecked();
  //   const deleteButtonWith2 = screen.getByRole("button", {
  //     name: "2 Werte löschen",
  //   });
  //   expect(deleteButtonWith2).toBeInTheDocument();
  //   expect(deleteButtonWith2).not.toBeDisabled();
  //   expect(deleteButtonWith2).toHaveClass("opacity-100");

  //   userEvent.click(checkboxes[1]);
  //   userEvent.click(checkboxes[2]);

  //   userEvent.click(checkAllCheckbox);
  //   const deleteButtonWithAll = screen.getByRole("button", {
  //     name: `${arrayLength} Werte löschen`,
  //   });
  //   expect(deleteButtonWithAll).toBeInTheDocument();
  //   expect(deleteButtonWithAll).not.toBeDisabled();
  //   expect(deleteButtonWithAll).toHaveClass("opacity-100");
  // });
});
