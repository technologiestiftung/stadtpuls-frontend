import { getUserTokens } from ".";
import * as auth from "@auth/Auth";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createTokenApiUrl } from "../createTokenApiUrl";
import { tokens } from "@mocks/supabaseData/tokens";

describe("getUserTokens utility", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: "1234567",
      authenticatedUser: {
        id: 1234,
      },
    });
  });
  it("gets a user's tokens when valid accessToken provided", async () => {
    const server = setupServer(
      rest.get(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json({
            data: tokens,
          })
        );
      })
    );
    server.listen();

    const tokenResponse = await getUserTokens("1234567");

    console.log(tokenResponse);

    expect(tokenResponse).toMatchObject(tokens);

    server.resetHandlers();
    server.close();
  });
  it("fails without accessToken", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: undefined,
      authenticatedUser: undefined,
    });
    const server = setupServer(
      rest.get(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(401, "Mocked status"),
          ctx.text("Not authenticated")
        );
      })
    );
    server.listen();

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await getUserTokens(undefined);
    } catch (error: unknown) {
      expect((error as Error).message).toEqual("Not authenticated");
    }

    server.resetHandlers();
    server.close();
  });
  it("fails when wrong status code returned", async () => {
    const server = setupServer(
      rest.get(createTokenApiUrl(), (_req, res, ctx) => {
        return res(ctx.status(201, "Mocked status"), ctx.json(tokens));
      })
    );
    server.listen();

    try {
      await getUserTokens("1234567");
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(
        "Wrong status code 201 for successful tokens response"
      );
    }

    server.resetHandlers();
    server.close();
  });
});
