-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "credID" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "transports" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
