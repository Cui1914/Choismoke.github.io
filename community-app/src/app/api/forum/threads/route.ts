import { NextRequest, NextResponse } from "next/server";
import { createThread } from "@/lib/forum/service";
import { requireAuthenticatedUser } from "@/lib/forum/api-guard";

export async function POST(request: NextRequest) {
  const guard = await requireAuthenticatedUser(request, "thread-create");
  if (!guard.ok) {
    return guard.response;
  }

  const payload = await request.json();
  const result = await createThread(payload, { actorName: guard.user.username });
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
