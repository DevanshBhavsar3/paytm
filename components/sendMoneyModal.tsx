"use client";

import { User } from "@/types";
import { TextInput } from "./textinput";
import { MouseEvent, useRef, useState } from "react";
import { Button } from "./button";
import axios, { AxiosError } from "axios";

export function SendMoneyModal({ receiver }: { receiver: User }) {
  const [isSent, setIsSent] = useState<boolean>(false);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  async function handleTransfer(e: MouseEvent) {
    e.preventDefault();

    try {
      await axios.post("/api/account/transfer", {
        to: receiver.id,
        amount: Number(amountRef.current?.value),
      });

      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  if (isSent) {
    return <div>Sent successfully.</div>;
  }

  return (
    <div>
      <form className="flex">
        <TextInput
          type="number"
          placeholder="Enter amount"
          reference={amountRef}
          defaultValue={0}
        />
        <Button
          type="submit"
          text="Send"
          size="md"
          variant="primary"
          onClick={(e) => handleTransfer(e)}
        />
      </form>
      {error && <span>{error}</span>}
    </div>
  );
}
