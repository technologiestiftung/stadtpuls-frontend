import { tokens } from "@mocks/supabaseData/tokens";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getUserTokens } from ".";
import { createApiUrl } from "../createApiUrl";

const exampleUserId = tokens[0].user_id;

describe("utility function getUserTokens", () => {
  it("returns only the tokens belonging to the provided user ID", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/auth_tokens`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(tokens.filter(token => token.user_id === exampleUserId))
        );
      })
    );
    server.listen();
    const userTokens = await getUserTokens(exampleUserId);

    expect(userTokens.every(token => token.user_id === exampleUserId)).toBe(
      true
    );

    server.resetHandlers();
    server.close();
  });
  it("throws an error for an unknown user ID", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/auth_tokens`), (_req, res, ctx) => {
        return res(
          ctx.status(404, "Mocked status"),
          ctx.json({ message: "No tokens found" })
        );
      })
    );
    server.listen();

    try {
      await getUserTokens("this-id-does-not-exist");
    } catch (error) {
      expect(error).toEqual({
        message: "No tokens found",
      });
    }

    server.resetHandlers();
    server.close();
  });
  it("throws an error if no user ID is provided", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/auth_tokens`), (_req, res, ctx) => {
        return res(
          ctx.status(400, "Mocked status"),
          ctx.json({ message: "Please provide a valid user ID" })
        );
      })
    );
    server.listen();

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await getUserTokens();
    } catch (error) {
      expect(error).toEqual({
        message: "Please provide a valid user ID",
      });
    }

    server.resetHandlers();
    server.close();
  });
});
