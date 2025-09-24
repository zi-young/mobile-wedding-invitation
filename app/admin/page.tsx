'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // anon key로 만든 클라이언트

interface RSVP {
  id: number;
  attendance: boolean;
  side: string;
  name: string;
  guests: number;
  message: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [rows, setRows] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('rsvp')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRows((data as RSVP[]) ?? []);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-8">불러오는 중...</p>;
  if (err) return <p className="p-8 text-red-600">오류: {err}</p>;
  if (rows.length === 0) return <p className="p-8">아직 RSVP 데이터가 없습니다.</p>;

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
            {rows.map((rsvp) => (
              <tr key={rsvp.id} className="text-center">
                <td className="px-4 py-2 border">{rsvp.name}</td>
                <td className="px-4 py-2 border">{rsvp.attendance ? '참석' : '불참'}</td>
                <td className="px-4 py-2 border">{rsvp.side === 'groom' ? '신랑측' : '신부측'}</td>
                <td className="px-4 py-2 border">{rsvp.guests}</td>
                <td className="px-4 py-2 border">{rsvp.message || '-'}</td>
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
