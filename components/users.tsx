"use client";

import { useEffect, useState } from "react";
import { TextInput } from "./textinput";
import axios from "axios";
import { Button } from "./button";
import { SendMoneyModal } from "./sendMoneyModal";
import { User } from "@/types";
import { Heading } from "./heading";
import { UserSkeleton } from "./user-skeleton";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentReciever, setCurrentReciever] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(
        `http://localhost:3000/api/user/bulk?filter=${searchValue}`
      );

      setUsers(response.data);
    }

    const timer = setTimeout(() => {
      getUsers();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  function handleTransactionSent() {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  return (
    <div className="flex flex-col gap-3">
      <Heading text="All Users" size="md" />
      <TextInput
        label="Search"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {!users.length && <UserSkeleton />}

      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded-lg"
        >
          <div className="flex justify-center items-center gap-1">
            <p className="bg-slate-400 text-white rounded-full w-8 h-8 flex justify-center items-center">
              {user.firstname[0]}
              {user.lastname[0]}
            </p>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            type="button"
            text="Send Money"
            onClick={(e) => setCurrentReciever(user)}
          />
        </div>
      ))}
      {currentReciever && (
        <SendMoneyModal
          receiver={currentReciever}
          setReceiver={setCurrentReciever}
          onSend={handleTransactionSent}
        />
      )}

      {success && (
        <span className="bg-green-500 text-white px-4 py-2 rounded-lg w-fit absolute bottom-5 right-5">
          Transaction successfull.
        </span>
      )}
    </div>
  );
}
