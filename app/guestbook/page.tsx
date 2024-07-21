import { createMessage } from "../actions";
import { SubmitButtons } from "../component/SubmitButtons";
import prisma from "../lib/db";

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
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const GuestbookPage = async () => {
  const data = await getData();
  return (
    <div className="w-[60%] mx-auto flex items-center h-screen justify-center flex-col">
      <form
        className="flex justify-center w-full gap-x-5"
        action={createMessage}
      >
        <input
          className="border-2 border-black rounded-lg py-2 px-5"
          type="text"
          name="message"
          placeholder="Enter your message"
        />
        <SubmitButtons />
      </form>
      <div className="mt-5">
        {data.map((entry) => (
          <div key={entry.id} className="flex ">
            <p>{entry.User.firstName}: </p>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestbookPage;
