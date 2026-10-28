"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, destroySession, authenticate } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAccountProfile() {
  const account = await prisma.account.findFirst({
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      desc: true,
      createdAt: true,
      // We don't send raw profile bytes in regular query to keep payload light
    },
  });

  return account;
}

export async function updateAccountProfile(formData: FormData) {
  const session = await requireAuth();

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const username = formData.get("username") as string;
  const desc = (formData.get("desc") as string) || null;
  const newPassword = (formData.get("password") as string) || "";
  const profileFile = formData.get("profile") as File | null;

  const dataToUpdate: any = {
    firstname,
    lastname,
    username,
    desc,
  };

  if (newPassword && newPassword.trim().length > 0) {
    dataToUpdate.password = await bcrypt.hash(newPassword, 10);
  }

  if (profileFile && profileFile.size > 0) {
    dataToUpdate.profile = Buffer.from(await profileFile.arrayBuffer()) as unknown as Uint8Array<ArrayBuffer>;
  }

  await prisma.account.update({
    where: { id: session.id },
    data: dataToUpdate,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/account");

  return { success: true };
}

export async function loginAction(formData: FormData) {
  const username = (formData.get("username") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password." };
  }

  const result = await authenticate(username, password);
  if (!result.success) {
    return { success: false, error: result.error || "Login failed" };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
