import { NextResponse } from "next/server";
import { createPost, getAllPosts, type CreatePostInput } from "@/lib/blog";

export async function GET() {
  const result = await getAllPosts();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const data = (await request.json()) as CreatePostInput;
  const result = await createPost(data);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
