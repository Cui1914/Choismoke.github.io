import { NextResponse } from "next/server";
import { getForumProfile } from "@/lib/forum/service";

export async function GET() {
  const data = await getForumProfile();
  return NextResponse.json(data);
}
