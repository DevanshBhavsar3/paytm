import { Heading } from "@/components/heading";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { Users } from "@/components/users";
import { Balance } from "@/components/balance";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <Heading text="Paytm" size="lg" />
      <Balance />
      <Users />
    </div>
  );
}
