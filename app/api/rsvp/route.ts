// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabaseServer.from("rsvp").insert([
      {
        attendance: data.attendance === "true",
        side: data.side,
        name: data.name,
        guest_count: Number(data.guestCount),
        companion_name: data.companionName || null,
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
