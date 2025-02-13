"use client";

import { MouseEvent, useRef, useState } from "react";
import { Button } from "./button";
import { TextInput } from "./textinput";
import axios, { AxiosError } from "axios";

export function Settings() {
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
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <div>
      <form>
        <TextInput type="text" label="First name" reference={firstnameRef} />
        <TextInput type="text" label="Last name" reference={lastnameRef} />
        <TextInput type="password" label="Password" reference={passwordRef} />
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
