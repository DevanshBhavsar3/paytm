"use client";

import card from "@/public/card.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Heading } from "./heading";

export function Balance() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      getData();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  async function getData() {
    const response = await axios.get("/api/account/balance");
    const balance = response.data.balance;
    setBalance(balance);
  }

  getData();

  return (
    <div
      className={`bg-slate-100 h-1/3 mx-1/2 bg-repeat bg-[auto_72px] bg-blend-soft-light flex justify-center items-center border border-black/10 rounded-lg`}
      style={{ backgroundImage: `url(${card.src})` }}
    >
      <Heading text={`Balance: ₹${balance}`} size="lg" />
    </div>
  );
}
