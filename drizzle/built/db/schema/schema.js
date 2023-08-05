"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountPermOrgs = exports.accountPermRepos = exports.emails = exports.repos = exports.profiles = exports.profileType = exports.organizations = exports.accounts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.accounts = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }),
    hashedPw: (0, pg_core_1.text)("hashed_pw"),
    salt: (0, pg_core_1.text)("salt"),
    profileId: (0, pg_core_1.integer)("profile_id").references(() => exports.profiles.id),
});
exports.organizations = (0, pg_core_1.pgTable)("organizations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }),
    hashedPw: (0, pg_core_1.text)("hashed_pw"),
    salt: (0, pg_core_1.text)("salt"),
    profileId: (0, pg_core_1.integer)("profile_id").references(() => exports.profiles.id),
});
exports.profileType = (0, pg_core_1.pgEnum)("type", ["account", "organization"]);
exports.profiles = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    type: (0, exports.profileType)("type"),
});
exports.repos = (0, pg_core_1.pgTable)("repos", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }),
});
exports.emails = (0, pg_core_1.pgTable)("emails", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.varchar)("email", { length: 50 }),
});
exports.accountPermRepos = (0, pg_core_1.pgTable)("accountPermRepos", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    profileId: (0, pg_core_1.integer)("profile_id").references(() => exports.profiles.id),
    repoId: (0, pg_core_1.integer)("repo_id").references(() => exports.repos.id),
});
exports.accountPermOrgs = (0, pg_core_1.pgTable)("accountPermOrgs", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    accountId: (0, pg_core_1.integer)("account_id").references(() => exports.accounts.id),
    orgId: (0, pg_core_1.integer)("org_id").references(() => exports.organizations.id),
});
