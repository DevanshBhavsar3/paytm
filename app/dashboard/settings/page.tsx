import { Settings } from "@/components/settings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }

  return <Settings />;
}
