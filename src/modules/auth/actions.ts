"use server";

import "server-only";
import { cookies } from "next/headers";
import { LoginSchema } from "./schemas";
import { authenticate } from "./service";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";

// https://twitter.com/dan_abramov/status/1654336219919048704
const authenticateAction = async ({ email, password }: LoginSchema) => {
  try {
    const accessToken = await authenticate(email, password);
    // @ts-ignore
    cookies().set("accessToken", accessToken);
    return {};
  } catch {
    return {
      error: "Invalid credentials",
    };
  }
};

const signOutAction = async () => {
  cookies().delete("accessToken");
  redirect(ROUTES.Login);
};

export { authenticateAction, signOutAction };
