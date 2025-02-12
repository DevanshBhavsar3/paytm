import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const requiredBody = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const pasrsedBody = requiredBody.safeParse(body);

  if (!pasrsedBody.success) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 }
    );
  }

  const firstname = pasrsedBody.data.firstname;
  const lastname = pasrsedBody.data.lastname;
  const email = pasrsedBody.data.email;
  const password = pasrsedBody.data.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 7);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Signed up." });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 }
    );
  }
}
