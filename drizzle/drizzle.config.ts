import { Config } from "drizzle-kit";

export default {
  schema: "./src/db",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://marcos:example@127.0.0.1:5432/github",
  },
} satisfies Config;
