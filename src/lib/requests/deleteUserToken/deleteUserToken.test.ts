import { deleteUserToken } from ".";
import * as auth from "@auth/Auth";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createTokenApiUrl } from "../createTokenApiUrl";

describe("deleteUserToken utility", () => {
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
  it("deletes a user token when nice_id and valid accessToken provided", async () => {
    const server = setupServer(
      rest.delete(createTokenApiUrl(), (_req, res, ctx) => {
        return res(ctx.status(204, "Mocked status"));
      })
    );
    server.listen();

    await deleteUserToken({
      nice_id: 29,
      accessToken: "1234567",
    });

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
      rest.delete(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(401, "Mocked status"),
          ctx.text("Not authenticated")
        );
      })
    );
    server.listen();

    try {
      await deleteUserToken({
        nice_id: 6,
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
      rest.delete(createTokenApiUrl(), (_req, res, ctx) => {
        return res(
          ctx.status(400, "Mocked status"),
          ctx.text("nice_id missing")
        );
      })
    );
    server.listen();

    try {
      await deleteUserToken({
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
