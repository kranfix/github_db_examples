import { drizzle } from "drizzle-orm/postgres-js";
import * as postgres from "postgres";
import { accounts } from "./db/schema/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

async function runServer() {
  const client = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
  const db = migrate(drizzle(client), { migrationsFolder: "drizzle" });
  //const allUsers = await db.select().from(accounts);
  //console.log(allUsers);
}
