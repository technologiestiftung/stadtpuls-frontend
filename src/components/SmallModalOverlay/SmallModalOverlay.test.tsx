import { render, screen } from "@testing-library/react";
import { SmallModalOverlay } from ".";

describe("SmallModalOverlay component", () => {
  it("should render the provided title", () => {
    render(<SmallModalOverlay title='Hello' />);
    const title = screen.getByText(/Hello/g);
    expect(title).toBeInTheDocument();
  });
  it("should render the provided chilren", () => {
    render(<SmallModalOverlay title='Title'>Content</SmallModalOverlay>);
    const content = screen.getByText(/Content/g);
    expect(content).toBeInTheDocument();
  });
  it("should render the provided footerContent", () => {
    render(<SmallModalOverlay title='Title' footerContent='Footer' />);
    const footerContent = screen.getByText(/Footer/g);
    expect(footerContent).toBeInTheDocument();
  });
  it("should render the secondary colored title when dangerous variant", () => {
    render(<SmallModalOverlay variant='dangerous' title='Hello' />);
    const title = screen.getByText(/Hello/g);
    expect(title.getAttribute("class")?.includes("text-error")).toBe(true);
  });
});
