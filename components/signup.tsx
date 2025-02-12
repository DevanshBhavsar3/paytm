"use client";

import axios, { AxiosError } from "axios";
import { Button } from "./button";
import { Card } from "./card";
import { Heading } from "./heading";
import { TextInput } from "./textinput";
import { MouseEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>();

  async function handleSignup(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      await axios.post("/api/auth/signup", {
        firstname: firstNameRef.current?.value,
        lastname: lastNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      router.push("/dashboard");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <Card>
      <form className="flex flex-col">
        <Heading text="Signup" size="lg" />
        <TextInput type="text" label="First name" reference={firstNameRef} />
        <TextInput type="text" label="Last name" reference={lastNameRef} />
        <TextInput type="email" label="Email" reference={emailRef} />
        <TextInput type="text" label="Password" reference={passwordRef} />
        {error && <span className="text-red-500">{error}</span>}
        <Button text="Signup" type="submit" onClick={(e) => handleSignup(e)} />
      </form>
    </Card>
  );
}
