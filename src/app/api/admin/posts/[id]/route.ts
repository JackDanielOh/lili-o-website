import { NextResponse } from "next/server";
import { updatePost, type CreatePostInput } from "@/lib/blog";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = (await request.json()) as Partial<CreatePostInput>;
  const result = await updatePost({ ...data, id });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
