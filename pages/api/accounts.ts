import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";

type PublicAccountsResponseType =
  | {
      error: string;
    }
  | {
      accounts: ParsedAccountType[];
      count: number;
    };

const getPublicAccounts = async (): Promise<PublicAccountsResponseType> => {
  const basePath = path.join(process.cwd(), "json");
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

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PublicAccountsResponseType>
) {
  try {
    const result = await getPublicAccounts();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
