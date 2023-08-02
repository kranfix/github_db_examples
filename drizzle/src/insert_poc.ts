import { drizzle } from "drizzle-orm/postgres-js";
//import postgres from "postgres";
import { accounts } from "./db/schema/schema";
import postgres = require("postgres");

async function query_pg() {
  const client = postgres("postgres://marcos:example@127.0.0.1:5432/github");
  const db = drizzle(client);

  const allAccounts = await db.select().from(accounts);
  console.log(allAccounts);
}

query_pg();
