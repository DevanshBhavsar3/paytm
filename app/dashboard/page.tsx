import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Users } from "@/components/users";
import { Balance } from "@/components/balance";
import { Navbar } from "@/components/navbar";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="p-2 h-screen flex flex-col gap-5">
      <Navbar />
      <Balance />
      <Users />
    </div>
  );
}
