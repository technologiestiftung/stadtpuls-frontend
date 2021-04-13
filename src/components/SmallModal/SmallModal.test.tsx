import { render, screen } from "@testing-library/react";
import { SmallModal } from ".";

describe("SmallModal component", () => {
  it("should render the provided title", () => {
    render(<SmallModal title='Hello' />);
    const title = screen.getByText(/Hello/g);
    expect(title).toBeInTheDocument();
  });
  it("should render the provided title in text-secondary", () => {
    render(<SmallModal titleClassName='text-secondary' title='Hello' />);
    const title = screen.getByRole("heading");
    expect(title.getAttribute("class")?.includes("text-secondary")).toBe(true);
  });
  it("should render the provided chilren", () => {
    render(<SmallModal title='Title'>Content</SmallModal>);
    const content = screen.getByText(/Content/g);
    expect(content).toBeInTheDocument();
  });
  it("should render the provided footerContent", () => {
    render(<SmallModal title='Title' footerContent='Footer' />);
    const footerContent = screen.getByText(/Footer/g);
    expect(footerContent).toBeInTheDocument();
  });
});
