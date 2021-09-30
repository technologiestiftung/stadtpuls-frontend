import { regenerateUserToken } from ".";
import * as auth from "@auth/Auth";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createApiUrl } from "../createApiUrl";
import { tokens } from "@mocks/supabaseData/tokens";

describe("regenerateUserToken utility", () => {
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
  it("regenerates a user token when nice_id and valid accessToken provided", async () => {
    const newlyCreatedToken = tokens[0];
    const actualTokenResponse = {
      method: "PUT",
      url: "https://token-api.com",
      data: {
        nice_id: newlyCreatedToken.nice_id,
        token: newlyCreatedToken.id,
      },
    };
    const server = setupServer(
      rest.put(createApiUrl("/authtokens"), (_req, res, ctx) => {
        return res(
          ctx.status(204, "Mocked status"),
          ctx.json(actualTokenResponse)
        );
      })
    );
    server.listen();

    const tokenResponse = await regenerateUserToken({
      nice_id: newlyCreatedToken.nice_id,
      accessToken: "1234567",
    });

    expect(tokenResponse).toMatchObject(actualTokenResponse);

    server.resetHandlers();
    server.close();
  });
  it("fails without accessToken", async () => {
    const server = setupServer(
      rest.put(createApiUrl("/authtokens"), (_req, res, ctx) => {
        return res(
          ctx.status(401, "Mocked status"),
          ctx.text("Not authenticated")
        );
      })
    );
    server.listen();

    try {
      await regenerateUserToken({
        nice_id: 5,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accessToken: undefined,
      });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual("Not authenticated");
    }

    server.resetHandlers();
    server.close();
  });
  it("fails without nice_id", async () => {
    const server = setupServer(
      rest.put(createApiUrl("/authtokens"), (_req, res, ctx) => {
        return res(
          ctx.status(400, "Mocked status"),
          ctx.text("nice_id missing")
        );
      })
    );
    server.listen();

    try {
      await regenerateUserToken({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nice_id: undefined,
        accessToken: "1234567",
      });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual("nice_id missing");
    }

    server.resetHandlers();
    server.close();
  });
});
