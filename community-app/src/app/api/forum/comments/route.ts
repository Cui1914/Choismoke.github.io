import { NextRequest, NextResponse } from "next/server";
import { createComment } from "@/lib/forum/service";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const result = await createComment(payload);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
