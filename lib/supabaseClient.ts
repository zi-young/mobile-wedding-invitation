import { createClient } from "@supabase/supabase-js";

// 환경변수에서 Supabase URL과 Key 불러오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseKey);
