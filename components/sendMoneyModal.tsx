"use client";

import { User } from "@/types";
import { TextInput } from "./textinput";
import { MouseEvent, useRef, useState } from "react";
import { Button } from "./button";
import axios, { AxiosError } from "axios";
import { Heading } from "./heading";
import { RxCrossCircled } from "react-icons/rx";

interface SendMoneyModalProps {
  receiver: User;
  setReceiver: (receiver: User | null) => void;
  onSend: () => void;
}

export function SendMoneyModal({
  receiver,
  setReceiver,
  onSend,
}: SendMoneyModalProps) {
  const amountRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  async function handleTransfer(e: MouseEvent) {
    e.preventDefault();

    try {
      await axios.post("/api/account/transfer", {
        to: receiver.id,
        amount: Number(amountRef.current?.value),
      });

      setReceiver(null);
      onSend();
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center">
      <form className="flex flex-col gap-5 bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <Heading text="Send Money" size="md" />
          <p
            className="cursor-pointer hover:bg-slate-200 p-1 rounded-full transition-all"
            onClick={() => setReceiver(null)}
          >
            <RxCrossCircled size={18} />
          </p>
        </div>
        <div className="flex justify-start items-center gap-3">
          <p className="bg-slate-400 text-white rounded-full w-10 h-10 flex justify-center items-center text-lg">
            {receiver.firstname[0]}
            {receiver.lastname[0]}
          </p>
          <span className="flex gap-1 text-lg font-medium">
            <p>{receiver.firstname}</p>
            <p>{receiver.lastname}</p>
          </span>
        </div>
        <TextInput
          type="number"
          label="Amount ₹"
          placeholder="Enter amount"
          reference={amountRef}
          defaultValue={0}
        />
        {error && <span className="text-red-500">{error}</span>}
        <Button
          type="submit"
          text="Send"
          size="md"
          variant="primary"
          onClick={(e) => handleTransfer(e)}
        />
      </form>
    </div>
  );
}
