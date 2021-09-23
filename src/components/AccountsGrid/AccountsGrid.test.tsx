import { screen, render } from "@testing-library/react";
import { AccountsGrid } from ".";
import { getPublicAccounts } from "@lib/hooks/usePublicAccounts";
describe("AccountsGrid component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const data = await getPublicAccounts();
    if (data) render(<AccountsGrid accounts={data.accounts} />);

    const h1 = screen.getByText(data.accounts[0].displayName);
    expect(h1).toBeInTheDocument();
  });
});
