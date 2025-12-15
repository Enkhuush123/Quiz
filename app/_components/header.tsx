"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const Header = () => {
  return (
    <div className="p-2 items-center justify-between shadow-sm flex ">
      <h1 className="font-semibold text-2xl">Quiz app</h1>
      <header className="flex justify-end p-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};
