import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 클라이언트용 (브라우저에서 사용, 익명 키)
export const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// 서버용 (서비스 롤 키, SSR/서버 전용)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
