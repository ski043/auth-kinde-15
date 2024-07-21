"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createMessage(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }
  const data = await prisma.guestbookEntry.create({
    data: {
      message: formData.get("message") as string,
      userId: user.id,
    },
  });

  revalidatePath("/guestbook");
}

export async function deleteMessage(formData: FormData) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }
  const data = await prisma.guestbookEntry.delete({
    where: {
      id: formData.get("messageId") as string,
    },
  });
}
