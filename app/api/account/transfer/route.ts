import prisma from "@/app/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const userId = token!.uid as string;

  const body = await req.json();

  const requiredBody = z.object({
    to: z.string(),
    amount: z.number(),
  });

  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid transfer data." },
      { status: 400 }
    );
  }

  const { to, amount } = parsedBody.data;

  try {
    await prisma.$transaction(async (tx) => {
      const sender = await tx.account.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      if (sender.balance < 0) {
        throw new Error("Insufficient balance.");
      }

      await tx.account.update({
        where: {
          id: to,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
    });
    return NextResponse.json({ message: "Transfer successful." });
  } catch (e) {
    return NextResponse.json({ error: "Transfer failed." }, { status: 400 });
  }
}
