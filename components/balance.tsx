"use client";

import axios from "axios";
import { Heading } from "./heading";
import { useEffect, useState } from "react";

export function Balance() {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  async function getData() {
    const response = await axios.get(
      "http://localhost:3000/api/account/balance"
    );
    const balance = response.data.balance;
    setBalance(balance);
  }

  getData();

  return (
    <div>
      {" "}
      <Heading text={`Your balance Rs.${balance}`} size="md" />
    </div>
  );
}
