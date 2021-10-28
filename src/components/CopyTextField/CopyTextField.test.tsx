import { fireEvent, render, screen } from "@testing-library/react";
import { CopyTextField } from ".";
import * as copyToClipboardHook from "@lib/hooks/useCopyToClipboard";

const useCopyToClipboard = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
copyToClipboardHook.useCopyToClipboard = useCopyToClipboard.mockReturnValue({
  copyToClipboard: jest.fn(),
  hasCopied: false,
});

describe("CopyTextField component", () => {
  it("should render", () => {
    const copyToClipboard = jest.fn();
    useCopyToClipboard.mockReturnValue({
      copyToClipboard: copyToClipboard,
      hasCopied: false,
    });
    render(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );
    const input = screen.getByRole("textbox", { name: "label" });
    expect(input).toBeInTheDocument();

    fireEvent.click(input);

    expect(copyToClipboard).toHaveBeenCalledWith("content");
  });
  it("should not show a copied indicator by default", () => {
    render(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );
    const copiedIndicator = screen.queryByLabelText(
      "In Zwischenablage kopiert!"
    );
    expect(copiedIndicator).not.toBeVisible();
  });
  it("should copy contentToCopy prop if provided", () => {
    const copyToClipboard = jest.fn();
    useCopyToClipboard.mockReturnValue({
      copyToClipboard: copyToClipboard,
      hasCopied: false,
    });

    render(
      <CopyTextField name='name' label='label' contentToCopy='A'>
        B
      </CopyTextField>
    );

    const input = screen.getByRole("textbox", { name: "label" });
    expect(input).toBeInTheDocument();

    fireEvent.click(input);

    expect(copyToClipboard).toHaveBeenCalledWith("A");
  });
});
