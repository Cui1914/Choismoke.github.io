import { NextResponse } from "next/server";
import { getSearchResults } from "@/lib/forum/service";

export async function GET() {
  const data = await getSearchResults();
  return NextResponse.json(data);
}
