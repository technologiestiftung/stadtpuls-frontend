import { render, screen } from "@testing-library/react";
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
    render(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );
    const input = screen.getByRole("textbox", { name: "label" });
    expect(input).toBeInTheDocument();
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
  it("should indicate the copied state when clicked", () => {
    useCopyToClipboard.mockReturnValue({
      copyToClipboard: jest.fn(),
      hasCopied: false,
    });

    const { rerender } = render(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );

    const copiedIndicator = screen.getByLabelText("In Zwischenablage kopiert!");

    expect(copiedIndicator).toHaveAttribute("aria-hidden", "true");
    expect(copiedIndicator.getAttribute("class")?.includes("opacity-0")).toBe(
      true
    );

    useCopyToClipboard.mockReturnValue({
      copyToClipboard: jest.fn(),
      hasCopied: true,
    });

    rerender(
      <CopyTextField name='name' label='label'>
        content
      </CopyTextField>
    );

    expect(copiedIndicator).toHaveAttribute("aria-hidden", "false");
    expect(copiedIndicator.getAttribute("class")?.includes("opacity-100")).toBe(
      true
    );
  });
});
