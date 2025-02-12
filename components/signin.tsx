"use client";

import { Button } from "./button";
import { Card } from "./card";
import { Heading } from "./heading";
import { TextInput } from "./textinput";
import { MouseEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <Card>
      <form className="flex flex-col">
        <Heading text="Signin" size="lg" />
        <TextInput type="email" label="Email" reference={emailRef} />
        <TextInput type="password" label="Password" reference={passwordRef} />
        {error && <span className="text-red-500">{error}</span>}
        <Button text="Signin" type="submit" onClick={(e) => handleSignin(e)} />
      </form>
    </Card>
  );
}
