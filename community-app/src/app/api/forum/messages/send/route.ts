import { NextRequest, NextResponse } from "next/server";
import { sendForumMessage } from "@/lib/forum/service";
import { requireAuthenticatedUser } from "@/lib/forum/api-guard";

export async function POST(request: NextRequest) {
  const guard = await requireAuthenticatedUser(request, "message-send");
  if (!guard.ok) {
    return guard.response;
  }

  const payload = await request.json();
  const result = await sendForumMessage(payload, { actorName: guard.user.username });
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
