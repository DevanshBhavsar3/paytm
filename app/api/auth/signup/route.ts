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

  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 }
    );
  }

  const firstname = parsedBody.data.firstname;
  const lastname = parsedBody.data.lastname;
  const email = parsedBody.data.email;
  const password = parsedBody.data.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    await prisma.account.create({
      data: {
        balance: Math.floor(Math.random() * 10000),
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Signed up." });
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 400 }
      );
    }
  }
}
