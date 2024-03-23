/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_uid_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_uid_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_uid_fkey";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "user_role";

-- CreateTable
CREATE TABLE "profiles" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "uid" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,
    "role_uid" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "roles" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_uid_key" ON "profiles"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_uid_key" ON "user_roles"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "roles"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
