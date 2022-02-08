import { TEST_USER } from "./data";
import { createUser } from "./users";

// eslint-disable-next-line @typescript-eslint/require-await
async function main(): Promise<void> {
  // 1. Sign up a user via the custom Stadtpuls API
  createUser(TEST_USER);

  // 2. Add sensors and records belonging to that user (SQL instead of Supabase SDK)
}

main().catch(console.error);
