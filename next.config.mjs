/** @type {import('next').NextConfig} */

// 프로덕션 환경인지 확인
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {

  // ESLint 빌드 시 경고/오류 무시
  eslint: { ignoreDuringBuilds: true },

  // TypeScript 빌드 시 오류 무시
  typescript: { ignoreBuildErrors: true },

  // Next.js Image 최적화 비활성화
  images: { unoptimized: true },

  // GitHub Pages용 basePath 설정 (로컬은 빈 문자열)
  basePath: isProd ? '/mobile-wedding-invitation' : '',
}

export default nextConfig
