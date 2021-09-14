import { render, screen } from "@testing-library/react";
import { CategoryIcon } from ".";

describe("CategoryIcon component", () => {
  it("should render", () => {
    render(
      <>
        {Array.from(Array(6)).map((_, i) => (
          <CategoryIcon key={i} categoryId={i + 1} />
        ))}
      </>
    );
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(6);
  });

  it("should not render if id is lower than 1", () => {
    render(<CategoryIcon categoryId={0} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
  it("should not render if id is higher than 6", () => {
    render(<CategoryIcon categoryId={7} />);
    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });
  it("should add class passed as prop", () => {
    render(<CategoryIcon categoryId={2} className='haha' />);
    const els = document.getElementsByClassName("haha");
    expect(els).toHaveLength(1);
  });
});
