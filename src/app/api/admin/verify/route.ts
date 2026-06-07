import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/blog";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password: string };
  const result = await verifyAdminPassword(password);
  return NextResponse.json(result);
}
