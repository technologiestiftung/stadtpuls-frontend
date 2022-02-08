import path from "path";
import { Client } from "pg";
import { TEST_USER } from "../seed/data";
import { config } from "dotenv";

// Add a .env to dev-tools/db and insert LOCAL_DB_CONNECTION_STRING from the local Supabase setup
config({ path: path.resolve(__dirname, "../.env") });

const connectionString = `${process.env.LOCAL_DB_CONNECTION_STRING || ""}`;

const client = new Client({ connectionString });

async function main(): Promise<void> {
  await client.connect();
  await client.query("DELETE FROM auth.users WHERE email = $1::text", [
    TEST_USER.email,
  ]);
  await client.end();
}

main().catch(console.error);
