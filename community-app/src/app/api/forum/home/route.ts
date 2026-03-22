import { NextResponse } from "next/server";
import { getForumHome } from "@/lib/forum/service";

export async function GET() {
  const data = await getForumHome();
  return NextResponse.json(data);
}
