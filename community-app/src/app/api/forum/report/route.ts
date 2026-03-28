import { NextRequest, NextResponse } from "next/server";
import { submitForumReport } from "@/lib/forum/service";
import { requireAuthenticatedUser } from "@/lib/forum/api-guard";
import type { SubmitReportPayload } from "@/lib/forum/types";

export async function POST(request: NextRequest) {
  const guard = await requireAuthenticatedUser(request, "report-submit");
  if (!guard.ok) {
    return guard.response;
  }

  const payload = (await request.json()) as SubmitReportPayload;
  const result = await submitForumReport(payload, { reporter: guard.user.username });
  return NextResponse.json(result);
}
