import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  console.log("====>>>>", url);
  const code = url.searchParams.get("code");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${baseUrl}/clients`);
};
