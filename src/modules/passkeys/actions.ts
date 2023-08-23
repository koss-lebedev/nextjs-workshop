"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/common/routes";
import { deleteCredential } from "./service";

const deleteCredentialAction = async (formData: FormData) => {
  await deleteCredential(formData.get("id") as string);
  revalidatePath(ROUTES.Passkeys);
};

export { deleteCredentialAction };
