"use client";

import { Button } from "./button";
import { Card } from "./card";
import { Heading } from "./heading";
import { TextInput } from "./textinput";
import { MouseEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export default function Signin() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>();

  async function handleSignin(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const response = await signIn("credentials", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
    });

    if (response?.error) {
      setError("Invalid credentials.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
      <form className="flex flex-col justify-center items-left w-full gap-3 max-w-md">
        <div className="flex justify-left items-center gap-2">
          <RiMoneyRupeeCircleLine size={24} className="text-blue-500" />
          <Heading text="Welcome back" size="md" />
        </div>
        <Card>
          <Heading text="Signin" size="md" />
          <TextInput type="email" label="Email" reference={emailRef} />
          <TextInput type="password" label="Password" reference={passwordRef} />
          {error && <span className="text-red-500">{error}</span>}
          <Button
            size="md"
            variant="primary"
            text="Signin"
            type="submit"
            onClick={(e) => handleSignin(e)}
          />
        </Card>
      </form>
    </div>
  );
}
