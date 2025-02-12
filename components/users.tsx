"use client";

import { useEffect, useState } from "react";
import { TextInput } from "./textinput";
import axios from "axios";
import { Button } from "./button";
import { SendMoneyModal } from "./sendMoneyModal";
import { User } from "@/types";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentTransactions, setCurrentTransactions] = useState<User>();
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <div>
      Users
      <TextInput
        label="Search"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {users.map((user) => (
        <div key={user.id}>
          {JSON.stringify(user)}
          <Button
            type="button"
            text="Send Money"
            onClick={(e) => setCurrentTransactions(user)}
          />
        </div>
      ))}
      {currentTransactions && <SendMoneyModal receiver={currentTransactions} />}
    </div>
  );
}
