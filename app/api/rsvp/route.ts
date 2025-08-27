import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 전용 Supabase 클라이언트
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버에서만 사용
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabase.from("rsvp").insert([
      {
        attendance: data.attendance === "true",
        side: data.side,
        name: data.name,
        guests: Number(data.guestCount),
        message: data.companionName || null,
      },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
    }

    return NextResponse.json({ message: "RSVP 저장 완료" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
