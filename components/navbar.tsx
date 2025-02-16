"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Button } from "./button";

export function Navbar() {
  const router = useRouter();
  const session = useSession();

  type NavLink = {
    label?: string;
    onClick: () => void;
    variant: "primary" | "secondary" | "icon";
    icon?: React.ReactElement;
  };

  let navLink: NavLink[];
  if (session.data?.user) {
    navLink = [
      {
        icon: <IoMdSettings size={16} />,
        onClick: () => router.push("/dashboard/settings"),
        variant: "icon",
      },
      {
        label: "Dashboard",
        onClick: () => router.push("/dashboard"),
        variant: "secondary",
      },
      { label: "Logout", onClick: () => signOut(), variant: "secondary" },
    ];
  } else {
    navLink = [
      { label: "Signin", onClick: () => signIn(), variant: "secondary" },
      {
        label: "Signup",
        onClick: () => router.push("/auth/signup"),
        variant: "secondary",
      },
    ];
  }

  return (
    <nav className="flex justify-between items-center p-2 sticky top-0 left-0 bg-white">
      <Link
        href={"/"}
        className="font-semibold text-xl flex justify-center items-center gap-1"
      >
        <RiMoneyRupeeCircleLine size={24} className="text-blue-500" />
        ePay
      </Link>
      <div className="flex gap-3">
        {navLink.map((link, index) => (
          <Button
            key={index}
            type="button"
            size="sm"
            variant={link.variant}
            text={link.label}
            icon={link.icon}
            onClick={link.onClick}
          />
        ))}
      </div>
    </nav>
  );
}
