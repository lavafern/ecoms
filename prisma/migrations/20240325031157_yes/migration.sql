/*
  Warnings:

  - You are about to drop the column `region` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "region";

-- CreateTable
CREATE TABLE "UserAddress" (
    "uid" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "profile_uid" TEXT NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Store" (
    "uid" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "StoreAddress" (
    "uid" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "store_uid" TEXT NOT NULL,

    CONSTRAINT "StoreAddress_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Product" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "store_uid" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_profile_uid_key" ON "UserAddress"("profile_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Store_user_uid_key" ON "Store"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "StoreAddress_store_uid_key" ON "StoreAddress"("store_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_store_uid_key" ON "Product"("store_uid");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_profile_uid_fkey" FOREIGN KEY ("profile_uid") REFERENCES "profiles"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress" ADD CONSTRAINT "StoreAddress_store_uid_fkey" FOREIGN KEY ("store_uid") REFERENCES "Store"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_uid_fkey" FOREIGN KEY ("store_uid") REFERENCES "Store"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
