import { renderHook } from "@testing-library/react-hooks";
import * as auth from "@auth/Auth";
import { useUserTokens } from ".";

describe("useUserTokens hook", () => {
  beforeAll(() => {
    // Ingored because of readonly reassignment for mocking purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: "12345",
      authenticatedUser: {
        id: 1234,
      },
    });
  });
  it("returns the correct fields", () => {
    const { result } = renderHook(() => useUserTokens());
    expect(typeof result.current.tokens).toBe("object");
    expect(typeof result.current.error).toBe("object");
    expect(typeof result.current.createToken).toBe("function");
    expect(typeof result.current.deleteToken).toBe("function");
    expect(typeof result.current.regenerateToken).toBe("function");
  });
});
