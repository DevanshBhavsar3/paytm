import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const requiredBody = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional(),
  });

  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 }
    );
  }

  const firstname = parsedBody.data.firstname;
  const lastname = parsedBody.data.lastname;
  const password = parsedBody.data.password;

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        email: token.email as string,
      },
      data: {
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(password && { password: await bcrypt.hash(password, 7) }),
      },
    });

    return NextResponse.json({ message: "Credentials updated." });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update." }, { status: 400 });
  }
}
