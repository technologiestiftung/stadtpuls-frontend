import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormListBox, SelectOptionType } from ".";

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

describe("FormListBox component", () => {
  it("should render a button", () => {
    render(<FormListBox name='name' options={exampleOptions} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should initially display a custom placeholder value when provided", () => {
    render(
      <FormListBox
        name='name'
        placeholder='custom placeholder'
        options={exampleOptions}
      />
    );
    const button = screen.getByRole("button", { name: "custom placeholder" });
    expect(button).toBeInTheDocument();
  });

  it("should open a list of options when clicked", () => {
    render(<FormListBox name='name' options={exampleOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const options = screen.getAllByRole("option");
    options.forEach(option => expect(option).toBeInTheDocument());
  });

  it("should update select value when an option is selected", () => {
    render(<FormListBox name='name' options={exampleOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const options = screen.getAllByRole("option");

    userEvent.click(options[1]);
    const button2 = screen.getByRole("button", {
      name: exampleOptions[1].name?.toString(),
    });

    expect(button2).toBeInTheDocument();
  });

  it("should not render a label when not provided", () => {
    render(<FormListBox name='name' options={exampleOptions} />);
    const label = document.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });
  it("should render a label when provided", () => {
    render(<FormListBox name='name' label='Name' options={exampleOptions} />);
    const label = screen.getByText(/Name/g);
    expect(label).toBeInTheDocument();
  });
  it("should render errors when provided", () => {
    render(
      <FormListBox
        name='name'
        options={exampleOptions}
        errors={["ERROR-A", "ERROR-B"]}
      />
    );
    const errorA = screen.getByText(/ERROR-A/g);
    expect(errorA).toBeInTheDocument();
    const errorB = screen.getByText(/ERROR-B/g);
    expect(errorB).toBeInTheDocument();
  });
});
