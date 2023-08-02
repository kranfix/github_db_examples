-- CreateEnum
CREATE TYPE "EntityKind" AS ENUM ('USER', 'ORG');

-- CreateEnum
CREATE TYPE "PermKind" AS ENUM ('OWNER', 'ADMIN', 'WRITER', 'READER');

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "type" "EntityKind" NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "entityId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "hashedPw" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "Org" (
    "entityId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "OrgMembership" (
    "userId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "OrgMembership_pkey" PRIMARY KEY ("userId","orgId")
);

-- CreateTable
CREATE TABLE "Repo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepoMembership" (
    "memberId" INTEGER NOT NULL,
    "repoId" INTEGER NOT NULL,
    "permission" "PermKind" NOT NULL,

    CONSTRAINT "RepoMembership_pkey" PRIMARY KEY ("memberId","repoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_entityId_key" ON "User"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Org_entityId_key" ON "Org"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgMembership" ADD CONSTRAINT "OrgMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("entityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgMembership" ADD CONSTRAINT "OrgMembership_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("entityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("entityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoMembership" ADD CONSTRAINT "RepoMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoMembership" ADD CONSTRAINT "RepoMembership_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
