import { screen, render } from "@testing-library/react";
import { FormFieldRules } from ".";

describe("FormFieldRules", () => {
  it("should render nothing if unTouched", () => {
    render(
      <FormFieldRules
        isTouched={false}
        rules={[{ id: "uniqueness", msg: "Unique", isFulfilled: false }]}
      />
    );

    const uniqueMessage = screen.queryByText("Unique");
    expect(uniqueMessage).not.toBeInTheDocument();
  });
  it("should render nothing if no rules given", () => {
    render(<FormFieldRules isTouched={false} rules={[]} />);
    expect(document.body.innerHTML.trim()).toBe("<div></div>");
  });
  it("should render each element if touched", () => {
    render(
      <FormFieldRules
        isTouched={true}
        rules={[
          { id: "uniqueness", msg: "Unique", isFulfilled: false },
          { id: "length", msg: "No longer than 20 chars", isFulfilled: false },
        ]}
      />
    );

    const uniqueMessage = screen.getByText("Unique");
    const lengthMessage = screen.getByText("No longer than 20 chars");
    expect(uniqueMessage).toBeInTheDocument();
    expect(lengthMessage).toBeInTheDocument();
  });
  it("should render the relevant icons", () => {
    render(
      <FormFieldRules
        isTouched={true}
        rules={[
          { id: "uniqueness", msg: "Unique", isFulfilled: true },
          { id: "length", msg: "No longer than 20 chars", isFulfilled: false },
          { id: "chars", msg: "Only 123", isFulfilled: false, isLoading: true },
        ]}
      />
    );

    const iconsFulfilled = screen.getByTestId(`icon-uniqueness`);
    const iconsLoading = screen.getByTestId(`icon-chars`);
    const iconsUnfulfilled = screen.getByTestId(`icon-length`);

    expect(iconsFulfilled).toBeInTheDocument();
    expect(iconsLoading).toBeInTheDocument();
    expect(iconsUnfulfilled).toBeInTheDocument();
  });
});
