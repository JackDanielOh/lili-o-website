import { NextResponse } from "next/server";
import { submitApplication, type ApplicationPayload } from "@/lib/submit-application";

export async function POST(request: Request) {
  const data = (await request.json()) as ApplicationPayload;
  const result = await submitApplication(data);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
