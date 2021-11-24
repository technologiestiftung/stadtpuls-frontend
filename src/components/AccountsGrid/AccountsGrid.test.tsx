import { screen, render } from "@testing-library/react";
import { AccountsGrid } from ".";
import { getPublicAccounts } from "@lib/requests/getPublicAccounts";
describe("AccountsGrid component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const accounts = await getPublicAccounts();
    if (accounts.length > 0) render(<AccountsGrid accounts={accounts} />);

    const h1 = screen.getByText(accounts[0].displayName);
    expect(h1).toBeInTheDocument();
  });
});
