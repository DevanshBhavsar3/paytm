import { Balance } from "@/components/balance";
import { Users } from "@/components/users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="h-screen flex flex-col gap-10 px-2">
      <Balance />
      <Users />
    </div>
  );
}
