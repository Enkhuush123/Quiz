"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <SignUp
          routing="path"
          signInUrl="/sign-in"
          afterSignUp={() => router.push("/")}
        />
      </div>
    </div>
  );
}
