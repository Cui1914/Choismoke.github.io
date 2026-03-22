import { NextResponse } from "next/server";
import { getMessages } from "@/lib/forum/service";

export async function GET() {
  const data = await getMessages();
  return NextResponse.json(data);
}
