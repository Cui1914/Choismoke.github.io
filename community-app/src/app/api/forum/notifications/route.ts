import { NextResponse } from "next/server";
import { getNotifications } from "@/lib/forum/service";

export async function GET() {
  const data = await getNotifications();
  return NextResponse.json(data);
}
