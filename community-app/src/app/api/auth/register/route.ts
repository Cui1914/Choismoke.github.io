import { NextRequest, NextResponse } from "next/server";
import { registerWithEmail } from "@/lib/forum/auth-service";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const result = await registerWithEmail(payload);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
