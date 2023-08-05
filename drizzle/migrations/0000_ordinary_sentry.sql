DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('account', 'organization');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accountPermOrgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer,
	"org_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accountPermRepos" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"repo_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "type"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"hashed_pw" text,
	"salt" text,
	"profile_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountPermOrgs" ADD CONSTRAINT "accountPermOrgs_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountPermOrgs" ADD CONSTRAINT "accountPermOrgs_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountPermRepos" ADD CONSTRAINT "accountPermRepos_profile_id_accounts_id_fk" FOREIGN KEY ("profile_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountPermRepos" ADD CONSTRAINT "accountPermRepos_repo_id_repos_id_fk" FOREIGN KEY ("repo_id") REFERENCES "repos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_profile_id_accounts_id_fk" FOREIGN KEY ("profile_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
