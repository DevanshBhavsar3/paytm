import SignUp from "@/components/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/");
  }

  return <SignUp />;
}
