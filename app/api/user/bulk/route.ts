import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const filter = url.searchParams.get("filter") || "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstname: {
            contains: filter,
          },
        },
        {
          lastname: {
            contains: filter,
          },
        },
      ],
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  });

  return NextResponse.json(users);
}
