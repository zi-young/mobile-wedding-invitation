import { supabaseServer } from "@/lib/supabaseClient";

interface RSVP {
  id: number;
  attendance: boolean;
  side: string;
  name: string;
  guests: number;
  message: string | null;
  created_at: string;
}

export default async function AdminPage() {
  const { data: rsvps, error } = await supabaseServer
    .from<"rsvp", RSVP>("rsvp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-600">데이터 조회 오류: {error.message}</p>;
  }

  if (!rsvps || rsvps.length === 0) {
    return <p className="p-8">아직 RSVP 데이터가 없습니다.</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-wedding-light">
      <h1 className="mb-6 text-2xl font-bold">RSVP 관리자 페이지</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">이름</th>
              <th className="px-4 py-2 border">가능 여부</th>
              <th className="px-4 py-2 border">신랑/신부</th>
              <th className="px-4 py-2 border">추가인원</th>
              <th className="px-4 py-2 border">메시지</th>
              <th className="px-4 py-2 border">등록일</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp) => (
              <tr key={rsvp.id} className="text-center">
                <td className="px-4 py-2 border">{rsvp.name}</td>
                <td className="px-4 py-2 border">
                  {rsvp.attendance ? "참석" : "불참"}
                </td>
                <td className="px-4 py-2 border">
                  {rsvp.side === "groom" ? "신랑측" : "신부측"}
                </td>
                <td className="px-4 py-2 border">{rsvp.guests}</td>
                <td className="px-4 py-2 border">{rsvp.message || "-"}</td>
                <td className="px-4 py-2 border">
                  {new Date(rsvp.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
