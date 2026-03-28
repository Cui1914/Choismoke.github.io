import { NextRequest, NextResponse } from "next/server";
import { createComment } from "@/lib/forum/service";
import { requireAuthenticatedUser } from "@/lib/forum/api-guard";

export async function POST(request: NextRequest) {
  const guard = await requireAuthenticatedUser(request, "comment-create");
  if (!guard.ok) {
    return guard.response;
  }

  const payload = await request.json();
  const result = await createComment(payload, { actorName: guard.user.username });
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
