import { render, screen } from "@testing-library/react";
import { FormTextarea } from ".";

describe("FormTextarea component", () => {
  it("should render a textarea", () => {
    render(<FormTextarea name='name' />);
    const textarea = document.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });
  it("should not render a label when not provided", () => {
    render(<FormTextarea name='name' />);
    const label = document.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });
  it("should render a label when provided", () => {
    render(<FormTextarea name='name' label='Name' />);
    const label = screen.getByText(/Name/g);
    expect(label).toBeInTheDocument();
  });
  it("should render an optional mention when provided", () => {
    render(<FormTextarea name='name' label='Name' optional />);
    const optional = screen.getByText(/Optional/g);
    expect(optional).toBeInTheDocument();
  });
  it("should render errors when provided", () => {
    render(<FormTextarea name='name' errors={["hey", "how"]} />);
    const hey = screen.getByText(/hey/g);
    expect(hey).toBeInTheDocument();
    const how = screen.getByText(/how/g);
    expect(how).toBeInTheDocument();
  });
});
