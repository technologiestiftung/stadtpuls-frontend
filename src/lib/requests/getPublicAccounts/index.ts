import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import path from "path";
import { promises as fs } from "fs";

export interface GetAccountsOptionsType {
  rangeStart?: number;
  rangeEnd?: number;
}

type AccountsResponseType = {
  accounts: ParsedAccountType[];
  count: number;
};

export const getPublicAccounts = async (): Promise<AccountsResponseType> => {
  const basePath = path.join(process.cwd(), "public/data");
  const response = await fs.readFile(`${basePath}/accounts.json`, "utf8");
  try {
    const rawAccounts = JSON.parse(response) as ParsedAccountType[];
    const accounts = rawAccounts.map(mapPublicAccount);
    return { count: accounts.length, accounts };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the accounts call`
    );
  }
};
