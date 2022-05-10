import { Button } from "@components/Button";
import { render, screen } from "@testing-library/react";
import { Dialog } from ".";

describe("Dialog component", () => {
  afterEach(() => {
    const modals = document.querySelectorAll("#headlessui-portal-root");
    modals.forEach(modal => modal.parentNode?.removeChild(modal));
  });
  it("should add a no-scroll class to the html tag on mount", () => {
    render(<Dialog title='Hello' footerContent={<Button>DO IT</Button>} />);
    const html = document.querySelector("html.no-scroll");
    expect(html).toBeInTheDocument();
  });
  it("should render the provided title", () => {
    render(<Dialog title='Hello' footerContent={<Button>DO IT</Button>} />);
    const title = screen.getByText(/Hello/g);
    expect(title).toBeInTheDocument();
  });
  it("should render the provided chilren", () => {
    render(
      <Dialog title='Title' footerContent={<Button>DO IT</Button>}>
        Content
      </Dialog>
    );
    const content = screen.getByText(/Content/g);
    expect(content).toBeInTheDocument();
  });
  it("should render the provided footerContent", () => {
    render(<Dialog title='Title' footerContent={<Button>DO IT</Button>} />);
    const footerContent = screen.getByText(/DO IT/g);
    expect(footerContent).toBeInTheDocument();
  });
  it("should render the secondary colored title when dangerous variant", () => {
    render(
      <Dialog
        variant='dangerous'
        title='Hello'
        footerContent={<Button>DO IT</Button>}
      />
    );
    const title = screen.getByText(/Hello/g);
    expect(title.getAttribute("class")?.includes("text-error")).toBe(true);
  });
});
