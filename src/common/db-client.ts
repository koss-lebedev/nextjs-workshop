import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

const getClient = () => {
  const client = new PrismaClient();
  client.$connect();
  return client;
};

if (process.env.NODE_ENV === "production") {
  prisma = getClient();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
  }
  prisma = global.__db__;
}

export { prisma };
