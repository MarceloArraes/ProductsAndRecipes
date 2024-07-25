// import { useRouter } from "next/router";
// import {trpc} from '../api/trpc/[trpc]'
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export const SigninComponent = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="m-10 flex flex-col items-start justify-start gap-4">
      <div className="flex flex-row">
        <Image
          src={session?.user?.image ?? ""}
          alt="user image"
          width={55}
          height={55}
          className="-translate-y-3 rounded-full"
        />
        <p className="ml-3 text-center text-base text-white">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
      </div>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-7 py-3 text-base font-semibold text-white no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
};
