import prisma from "@/app/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.uid) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 400 });
  }

  const account = await prisma.account.findUnique({
    where: {
      userId: token.uid as string,
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Can't find account." }, { status: 400 });
  }

  return NextResponse.json({ balance: account.balance });
}
