import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabase.from("rsvp").insert([ 
      {
        attendance: data.attendance === "true", // 컬럼 이름 일치
        side: data.side,
        name: data.name,
        guests: Number(data.guestCount), // 'guest_count' -> 'guests'로 수정
        message: data.companionName || null, // 'companion_name' -> 'message'로 수정
        // Supabase에서 created_at은 기본값이 자동 설정되므로 코드로 보낼 필요 없음
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