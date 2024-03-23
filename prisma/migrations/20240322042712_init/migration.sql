-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Profile" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "user_role" (
    "uid" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,
    "role_uid" TEXT NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Role" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_uid_key" ON "Profile"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_user_uid_key" ON "user_role"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
