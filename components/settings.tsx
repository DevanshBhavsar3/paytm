"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "./button";
import { Heading } from "./heading";
import { TextInput } from "./textinput";

export function Settings() {
  const router = useRouter();
  const firstnameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  async function handleUpdate(e: MouseEvent) {
    e.preventDefault();

    try {
      await axios.put("/api/user", {
        firstname: firstnameRef.current?.value,
        lastname: lastnameRef.current?.value,
        password: passwordRef.current?.value,
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
    <div className="flex h-[80vh] justify-center items-center relative">
      <Link
        href={"/dashboard"}
        className="fixed left-5 top-16 flex justify-center items-center gap-3"
      >
        <BsArrowLeft /> Dashboard
      </Link>
      <form className="bg-slate-100 p-5 rounded-lg flex flex-col gap-3">
        <Heading text="Update your account" size="lg" />
        <TextInput
          type="text"
          label="New First name"
          reference={firstnameRef}
        />
        <TextInput type="text" label="New Last name" reference={lastnameRef} />
        <TextInput
          type="password"
          label="New Password"
          reference={passwordRef}
        />
        {error && <span>{error}</span>}
        <Button
          text="Update"
          type="submit"
          size="md"
          variant="primary"
          onClick={(e) => handleUpdate(e)}
        />
      </form>
    </div>
  );
}
