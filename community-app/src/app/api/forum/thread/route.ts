import { NextResponse } from "next/server";
import { getThreadDetail } from "@/lib/forum/service";

export async function GET() {
  const data = await getThreadDetail();
  return NextResponse.json(data);
}
