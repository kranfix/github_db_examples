import { pgTable, serial, text, varchar,integer, pgEnum} from "drizzle-orm/pg-core";
 
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name',{length:50}),
  hashedPw: text('hashed_pw'),
  salt: text('salt'),
  profileId: integer('profile_id').references(() => profiles.id),
});

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name',{length:50}),
  hashedPw: text('hashed_pw'),
  salt: text('salt'),
  profileId: integer('profile_id').references(() => profiles.id),
});

export const profileType = pgEnum('type', ['user', 'organization']);
export const profiles = pgTable('users', {
  id: serial('id').primaryKey(),
  type: profileType('type'),
});

export const repos = pgTable('repos', {
  id: serial('id').primaryKey(),
  name: varchar('name',{length:50}),
});

export const mails = pgTable('mails', {
  id: serial('id').primaryKey(),
  mail: varchar('mail',{length:50}),
});

export const userPermRepos = pgTable('userPermRepos', {
  id: serial('id').primaryKey(),
  profileId: integer('profile_id').references(() => profiles.id),
  repoId: integer('repo_id').references(() => repos.id),
});

export const userPermOrgs = pgTable('userPermOrgs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  orgId: integer('org_id').references(() => organizations.id),
});