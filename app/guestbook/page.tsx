import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { SubmitButton } from "../components/SubmitButton";
import prisma from "../lib/db";
import { createMessage, deleteMessage } from "../actionts";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getData() {
  const data = await prisma.guestbookEntry.findMany({
    select: {
      message: true,
      id: true,
      User: {
        select: {
          firstName: true,
        },
      },
    },
  });

  return data;
}

const GuestbookRoute = async () => {
  const data = await getData();
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Guestbook Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createMessage}>
            <Input name="message" placeholder="your message" required />
            <SubmitButton />
          </form>

          <div className="mt-8">
            {data.map((item) => (
              <div className="w-full flex justify-between items-center">
                <div className="flex ">
                  <p className="mr-1">{item.User.firstName}:</p>
                  <p>{item.message}</p>
                </div>
                <form action={deleteMessage}>
                  <input type="hidden" name="messageId" value={item.id} />
                  <Button size="icon" variant="outline">
                    <XIcon className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestbookRoute;
