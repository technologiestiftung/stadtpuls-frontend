import { usePublicAccounts } from ".";
import { renderHook } from "@testing-library/react-hooks";
import { parsedAccounts } from "@mocks/supabaseData/accounts";

describe("hook usePublicAccounts", () => {
  it("returns the correct fields", () => {
    const { result } = renderHook(() => usePublicAccounts());

    expect(Array.isArray(result.current.accounts)).toBe(true);
  });
  it("returns the public accounts", () => {
    const { result } = renderHook(() =>
      usePublicAccounts({
        rangeStart: undefined,
        rangeEnd: undefined,
        initialData: {
          accounts: parsedAccounts,
          count: parsedAccounts.length,
        },
      })
    );

    expect(result.current.accounts).toMatchObject(parsedAccounts);
  });
});
