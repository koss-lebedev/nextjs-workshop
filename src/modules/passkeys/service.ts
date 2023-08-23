import { prisma } from "@/common/db-client";
import { User, Credential } from "@prisma/client";

const findCredentialsByUserId = async (userId: User["id"]) => {
  return await prisma.credential.findMany({
    where: {
      userId,
    },
  });
};

const findCredentialByCredId = async (credID: Credential["credID"]) => {
  return await prisma.credential.findFirst({
    where: {
      credID,
    },
    include: {
      user: true,
    },
  });
};

const createCredential = async (data: Omit<Credential, "id">) => {
  return await prisma.credential.create({
    data,
  });
};

const deleteCredential = async (id: Credential["id"]) => {
  return await prisma.credential.delete({
    where: {
      id,
    },
  });
};

export {
  createCredential,
  deleteCredential,
  findCredentialsByUserId,
  findCredentialByCredId,
};
