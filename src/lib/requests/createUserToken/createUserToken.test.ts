import { createUserToken } from ".";
import * as auth from "@auth/Auth";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createTokenApiUrl } from "../createTokenApiUrl";
import { tokens } from "@mocks/supabaseData/tokens";

describe("createUserToken utility", () => {
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
  it("creates a user token when description and valid accessToken provided", async () => {
    const newlyCreatedToken = tokens[0];
    const actualTokenResponse = {
      method: "POST",
      url: "https://token-api.com",
      data: {
        nice_id: newlyCreatedToken.nice_id,
        token: newlyCreatedToken.id,
      },
    };
    const server = setupServer(
      rest.post(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(201, "Mocked status"),
          ctx.json(actualTokenResponse)
        );
      })
    );
    server.listen();

    const tokenResponse = await createUserToken({
      description: "test-token",
      accessToken: "1234567",
    });

    expect(tokenResponse).toMatchObject(actualTokenResponse);

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
      rest.post(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(401, "Mocked status"),
          ctx.text("Not authenticated")
        );
      })
    );
    server.listen();

    try {
      await createUserToken({
        description: "test-token",
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
  it("fails when wrong status code returned", async () => {
    const server = setupServer(
      rest.post(createTokenApiUrl(), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json({}));
      })
    );
    server.listen();

    try {
      await createUserToken({
        description: "test-token",
        accessToken: "1234567",
      });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(
        "Wrong status code 200 for successful token creation response"
      );
    }

    server.resetHandlers();
    server.close();
  });
});
