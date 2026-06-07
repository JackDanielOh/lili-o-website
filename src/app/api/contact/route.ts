import { NextResponse } from "next/server";
import { submitContact, type ContactPayload } from "@/lib/submit-contact";

export async function POST(request: Request) {
  const data = (await request.json()) as ContactPayload;
  const result = await submitContact(data);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
