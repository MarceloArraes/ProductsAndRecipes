
// import { useRouter } from "next/router";
import { useState } from "react";
// import {trpc} from '../api/trpc/[trpc]'
import { api } from "~/trpc/react";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export const SigninComponent = async () => {
    const session = await getServerAuthSession();


    return(
        <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-base text-white">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="text-base rounded-full bg-white/10 px-7 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    )
}