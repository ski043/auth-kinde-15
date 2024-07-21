"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/db";

export async function createMessage(formData: FormData) {
  const data = await prisma.guestbookEntry.create({
    data: {
      message: formData.get("message") as string,
      userId: "sdf",
    },
  });

  revalidatePath("/guestbook");
}

export async function deleteMessage(formData: FormData) {
  const data = await prisma.guestbookEntry.delete({
    where: {
      id: formData.get("messageId") as string,
    },
  });
}
