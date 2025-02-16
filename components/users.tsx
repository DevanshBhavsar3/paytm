"use client";

import { User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Heading } from "./heading";
import { SendMoneyModal } from "./sendMoneyModal";
import { TextInput } from "./textinput";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentReciever, setCurrentReciever] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(`/api/user/bulk?filter=${searchValue}`);

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
    <div>
      <Heading text="All Users" size="md" />
      <TextInput
        label="Search"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="flex flex-col mt-3 border rounded-lg overflow-hidden">
        {!users.length && <span className="px-4 py-2">No users found!</span>}
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`flex justify-between items-center px-4 py-2 border-b w-full ${
              !(index % 2) && "bg-slate-100"
            }`}
          >
            <div className="flex justify-center items-center gap-2">
              <p className="bg-blue-400 text-white rounded-full w-8 h-8 flex justify-center items-center">
                {user.firstname[0]}
                {user.lastname[0]}
              </p>
              <span className="flex justify-center items-center gap-1">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
              </span>
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
          <span className="bg-green-500 text-white px-4 py-2 rounded-lg w-fit fixed bottom-5 right-5">
            Transaction successfull.
          </span>
        )}
      </div>
    </div>
  );
}
