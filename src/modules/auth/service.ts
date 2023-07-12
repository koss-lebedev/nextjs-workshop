import bcrypt from "bcrypt";
import { prisma } from "@/common/db-client";
import { issueJWT, verifyJWT } from "@/common/jwt";
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import { ROUTES } from "@/common/routes";
import { redirect } from "next/navigation";
import { cache } from "react";

const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const requireUser = cache(async () => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return redirect(ROUTES.Login);
  }

  try {
    const payload = (await verifyJWT(accessToken)) as JwtPayload;
    const user = await getUser(payload.sub!);
    if (!user) {
      return redirect(ROUTES.Login);
    }

    return user;
  } catch {
    return redirect(ROUTES.Login);
  }
});

const authenticate = async (email: string, password: string) => {
  const user = await getUser(email);
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    throw new Error("Unauthorized");
  }

  const accessToken = await issueJWT(user.email, 36000 /* 10h */);
  return accessToken;
};

export { authenticate, requireUser };
