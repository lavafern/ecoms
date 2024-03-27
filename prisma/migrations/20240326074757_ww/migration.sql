/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_store_uid_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_user_uid_fkey";

-- DropForeignKey
ALTER TABLE "StoreAddress" DROP CONSTRAINT "StoreAddress_store_uid_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_profile_uid_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Store";

-- DropTable
DROP TABLE "StoreAddress";

-- DropTable
DROP TABLE "UserAddress";

-- CreateTable
CREATE TABLE "user_address" (
    "uid" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "profile_uid" TEXT NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "store" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "store_address" (
    "uid" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "store_uid" TEXT NOT NULL,

    CONSTRAINT "store_address_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "product" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "store_uid" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_profile_uid_key" ON "user_address"("profile_uid");

-- CreateIndex
CREATE UNIQUE INDEX "store_user_uid_key" ON "store"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "store_address_store_uid_key" ON "store_address"("store_uid");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_profile_uid_fkey" FOREIGN KEY ("profile_uid") REFERENCES "profiles"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_address" ADD CONSTRAINT "store_address_store_uid_fkey" FOREIGN KEY ("store_uid") REFERENCES "store"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_store_uid_fkey" FOREIGN KEY ("store_uid") REFERENCES "store"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
