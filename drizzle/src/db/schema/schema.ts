import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  hashedPw: text("hashed_pw"),
  salt: text("salt"),
  profileId: integer("profile_id").references(() => profiles.id),
});

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  hashedPw: text("hashed_pw"),
  salt: text("salt"),
  profileId: integer("profile_id").references(() => profiles.id),
});

export const profileType = pgEnum("type", ["account", "organization"]);
export const profiles = pgTable("accounts", {
  id: serial("id").primaryKey(),
  type: profileType("type"),
});

export const repos = pgTable("repos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
});

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 50 }),
});

export const accountPermRepos = pgTable("accountPermRepos", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  repoId: integer("repo_id").references(() => repos.id),
});

export const accountPermOrgs = pgTable("accountPermOrgs", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id").references(() => accounts.id),
  orgId: integer("org_id").references(() => organizations.id),
});
