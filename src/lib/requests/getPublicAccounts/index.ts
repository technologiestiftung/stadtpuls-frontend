import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { getBaseUrl } from "@lib/urlUtil";

export interface GetAccountsOptionsType {
  rangeStart?: number;
  rangeEnd?: number;
}

export const getPublicAccounts = async (): Promise<{
  accounts: ParsedAccountType[];
  count: number;
}> => {
  const response = await fetch(`${getBaseUrl()}/data/accounts.json`);
  try {
    const rawAccounts = (await response.json()) as ParsedAccountType[];
    const accounts = rawAccounts.map(mapPublicAccount);
    return { count: accounts.length, accounts };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the accounts call`
    );
  }
};
