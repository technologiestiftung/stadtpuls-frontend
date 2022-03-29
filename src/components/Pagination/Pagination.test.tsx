import { screen, render } from "@testing-library/react";
import { Pagination } from ".";

describe("Pagination component", () => {
  it("renders the appropriate amount of items", () => {
    const counts = {
      previousButton: 1,
      nextButton: 1,
      pageRangeDisplayed: 5,
      marginPagesDisplayed: 1,
      pages: 10,
      startPage: 1,
    };
    render(
      <Pagination
        currentPage={counts.startPage}
        pageCount={counts.pages}
        marginPagesDisplayed={counts.marginPagesDisplayed}
        numberOfDisplayedPages={counts.pageRangeDisplayed}
      />
    );

    const expectedNumberOfListItems =
      counts.previousButton +
      counts.pageRangeDisplayed +
      counts.marginPagesDisplayed +
      counts.nextButton;

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(expectedNumberOfListItems);
  });
});
