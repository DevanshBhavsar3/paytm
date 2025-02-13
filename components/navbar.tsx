"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center">
      <Link
        href={"/"}
        className="font-semibold text-xl flex justify-center items-center gap-1"
      >
        <RiMoneyRupeeCircleLine size={24} className="text-blue-500" />
        ePay
      </Link>
      <div className="flex gap-3">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          text="Settings"
          onClick={() => router.push("/settings")}
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          text="Logout"
          onClick={() => signOut()}
        />
      </div>
    </nav>
  );
}
