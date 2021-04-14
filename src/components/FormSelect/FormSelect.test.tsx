import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormSelect, SelectOptionType } from ".";

const exampleOptions: SelectOptionType[] = [
  {
    name: "First option",
    value: "First option",
  },
  {
    name: "Second option",
    value: "Second option",
  },
  {
    name: "Third option",
    value: "Third option",
  },
];

describe("FormSelect component", () => {
  it("should render a select", () => {
    render(<FormSelect name='name' options={exampleOptions} />);
    const select = document.querySelector("select");
    expect(select).toBeInTheDocument();
  });
  it("should provide select options", () => {
    render(<FormSelect name='name' options={exampleOptions} />);
    const options = screen.getAllByRole("option");
    options.forEach(option => expect(option).toBeInTheDocument());
  });
  it("should update select value when an option is selected", () => {
    render(
      <FormSelect name='name' label='Some label' options={exampleOptions} />
    );
    userEvent.selectOptions(screen.getByLabelText("Some label"), [
      "Third option",
    ]);

    const optionToBeSelected: Partial<HTMLOptionElement> = screen.getByRole(
      "option",
      {
        name: "Third option",
      }
    );
    expect(optionToBeSelected.selected).toBe(true);
  });
  it("should not render a label when not provided", () => {
    render(<FormSelect name='name' options={exampleOptions} />);
    const label = document.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });
  it("should render a label when provided", () => {
    render(<FormSelect name='name' label='Name' options={exampleOptions} />);
    const label = screen.getByText(/Name/g);
    expect(label).toBeInTheDocument();
  });
});
