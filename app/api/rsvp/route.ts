// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabaseServer.from("rsvp").insert([
      {
        attendance: data.attendance === "true",
        side: data.side,
        name: data.name,
        guests: Number(data.guestCount),
        message: data.companionName || null, // 추가인원 이름은 message 컬럼에 저장
      },
    ]);

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
    }

    return NextResponse.json({ message: "RSVP 저장 완료" });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
