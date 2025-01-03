import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          PitchIn
        </Link>

        <div className="flex items-center gap-5 text-black">
          <ClerkLoading>
            <div className="inline-block mr-10 h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Link href="/startup/create">Create</Link>
              <Link href={`/user/${userId}`}>Profile</Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2 text-sm">
                <Button variant="outline" asChild>
                  <Link href="/sign-in">Login/Register</Link>
                </Button>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
