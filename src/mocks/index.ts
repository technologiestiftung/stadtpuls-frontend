/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-ignore
import { fakeAuthToken } from "./supabaseData/userData";

if (typeof window === "undefined") {
  const { server } = require("./server");
  server.listen();
} else {
  const { worker } = require("./browser");
  localStorage.setItem("supabase.auth.token", JSON.stringify(fakeAuthToken));
  worker.start();
}
