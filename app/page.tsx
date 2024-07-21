import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <section className="w-full flex flex-col items-center lg:w-[60%] mx-auto h-screen justify-center ">
      <h1 className="scroll-m-20 text-3xl md:text-4xl font-semibold text-center  tracking-normal lg:text-5xl xl:text-6xl">
        With the right tools, Authentication is easy!
      </h1>
      <p className="leading-7 text-muted-foreground mt-4  text-center lg:w-[70%] lg:text-lg">
        Your one-stop destination for all things web development, from the
        latest updates to in-depth tutorials and resources.
      </p>

      {user ? (
        <LogoutLink className="mt-10">
          <Button>Log out</Button>
        </LogoutLink>
      ) : (
        <div className="flex items-center gap-x-4 mt-10">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>

          <RegisterLink>
            <Button variant="secondary">Register</Button>
          </RegisterLink>
        </div>
      )}
    </section>
  );
}
