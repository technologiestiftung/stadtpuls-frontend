import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPublicAccounts } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";
import { extendedUserProfiles as exampleAccounts } from "@mocks/supabaseData/accounts";
import { errors } from "../getPublicSensors";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

const getIndexesFromRange = (
  rangeStart: number,
  rangeEnd: number
): { fromIndex: number; toIndex: number } => {
  return {
    fromIndex: rangeStart - 1,
    toIndex: rangeEnd - 1,
  };
};

describe("utility function getPublicAccounts", () => {
  it("returns all public accounts", async (): Promise<void> => {
    const server = setupServer(
      rest.get(
        createSupabaseUrl(`/extended_user_profiles`),
        (_req, res, ctx) => {
          return res(
            ctx.set(
              "Content-Range",
              `0-${exampleAccounts.length - 1}/${exampleAccounts.length}`
            ),
            ctx.status(200, "Mocked status"),
            ctx.json(exampleAccounts)
          );
        }
      )
    );
    server.listen();
    const { accounts: fetchedAccounts } = await getPublicAccounts();
    expect(fetchedAccounts.length).toEqual(exampleAccounts.length);
    server.resetHandlers();
    server.close();
  });

  it("returns accounts alphabetically (case-insensitively!)", async (): Promise<void> => {
    const server = setupServer(
      rest.get(
        createSupabaseUrl(`/extended_user_profiles`),
        (_req, res, ctx) => {
          return res(
            ctx.set(
              "Content-Range",
              `0-${exampleAccounts.length - 1}/${exampleAccounts.length}`
            ),
            ctx.status(200, "Mocked status"),
            ctx.json(exampleAccounts)
          );
        }
      )
    );
    server.listen();
    const { accounts: fetchedAccounts } = await getPublicAccounts();
    expect(fetchedAccounts[0].username).toEqual("dennis");
    expect(fetchedAccounts[fetchedAccounts.length - 1].username).toEqual(
      "XXDennis"
    );
    server.resetHandlers();
    server.close();
  });

  it("returns a limited amount of accounts if range is provided", async (): Promise<void> => {
    const rangeStart = 0;
    const rangeEnd = 3;
    let filteredAccounts: definitions["extended_user_profiles"][] = [];

    const server = setupServer(
      rest.get(
        createSupabaseUrl(`/extended_user_profiles`),
        (req, res, ctx) => {
          const { fromIndex, toIndex } = getIndexesFromRange(
            rangeStart,
            rangeEnd
          );

          const limit = req.url.searchParams.get("limit");
          const offset = req.url.searchParams.get("offset");

          filteredAccounts = exampleAccounts.filter((_, index) => {
            return index >= fromIndex && index <= toIndex;
          });

          const returnedAccounts =
            limit && offset ? filteredAccounts : exampleAccounts;
          return res(
            ctx.set(
              "Content-Range",
              `0-${returnedAccounts.length - 1}/${returnedAccounts.length}`
            ),
            ctx.status(200, "Mocked status"),
            ctx.json(returnedAccounts)
          );
        }
      )
    );
    server.listen();

    const { accounts: fetchedAccounts } = await getPublicAccounts({
      rangeStart,
      rangeEnd,
    });
    expect(fetchedAccounts.length).toEqual(filteredAccounts.length);

    const expectedAccountIds = filteredAccounts.map(sensor => sensor.id);

    const allReturnedIdsAreIncludedInExpectedIds = fetchedAccounts.every(
      account => expectedAccountIds.includes(account.id)
    );
    expect(allReturnedIdsAreIncludedInExpectedIds).toBe(true);

    server.resetHandlers();
    server.close();
  });

  it("errors when rangeEnd is greater than rangeStart", async (): Promise<void> => {
    const rangeStart = 3;
    const rangeEnd = 2;

    // No mock server needed because we're throwing early

    try {
      await getPublicAccounts({ rangeStart, rangeEnd });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(
        errors.rangeEndGreaterThanRangeStart
      );
    }
  });

  it("errors when rangeEnd is provided without rangeStart", async (): Promise<void> => {
    const rangeEnd = 3;

    // No mock server needed because we're throwing early

    try {
      await getPublicAccounts({ rangeEnd });
    } catch (error: unknown) {
      expect((error as Error).message).toEqual(errors.onlyOneRangeValue);
    }
  });
});
