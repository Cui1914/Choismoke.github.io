import { NextResponse } from "next/server";
import { logoutCurrentSession } from "@/lib/forum/auth-service";

export async function POST() {
  const result = await logoutCurrentSession();
  return NextResponse.json(result);
}
