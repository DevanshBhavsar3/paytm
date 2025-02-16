"use client";

import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Button } from "./button";
import { Card } from "./card";
import { Heading } from "./heading";
import { TextInput } from "./textinput";

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
    <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
      <form className="flex flex-col justify-center items-left w-full gap-3 max-w-md">
        <div className="flex justify-left items-center gap-2">
          <RiMoneyRupeeCircleLine size={32} className="text-blue-500" />
          <Heading text="Welcome to ePay" size="lg" />
        </div>
        <Card>
          <Heading text="Signup" size="md" />
          <TextInput type="text" label="First name" reference={firstNameRef} />
          <TextInput type="text" label="Last name" reference={lastNameRef} />
          <TextInput type="email" label="Email" reference={emailRef} />
          <TextInput type="password" label="Password" reference={passwordRef} />
          {error && <span className="text-red-500">{error}</span>}
          <Button
            size="md"
            variant="primary"
            text="Signup"
            type="submit"
            onClick={(e) => handleSignup(e)}
          />
        </Card>
      </form>
    </div>
  );
}
