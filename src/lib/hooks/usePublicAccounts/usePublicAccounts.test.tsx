import { usePublicAccounts } from ".";
import { renderHook } from "@testing-library/react-hooks";
import { parsedAccounts } from "@mocks/supabaseData/accounts";

describe("hook usePublicAccounts", () => {
  it("returns the correct fields", () => {
    const { result } = renderHook(() => usePublicAccounts());

    expect(typeof result.current.accounts).toBe("object");
    expect(typeof result.current.error).toBe("object");
  });
  it("returns the public accounts", () => {
    const { result } = renderHook(() =>
      usePublicAccounts({
        rangeStart: undefined,
        rangeEnd: undefined,
        initialData: parsedAccounts,
      })
    );

    expect(result.current.accounts).toMatchObject(parsedAccounts);
  });
});
