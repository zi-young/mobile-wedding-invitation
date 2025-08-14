/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages로 정적 사이트를 배포하기 위해 'export'를 추가합니다.
  // 이 설정을 통해 'next build' 시 정적 HTML, CSS, JS 파일이 'out' 폴더에 생성됩니다.
  output: 'export', 

  // ESLint 빌드 시 경고/오류 무시 설정입니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript 빌드 시 오류 무시 설정입니다.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Next.js Image 컴포넌트의 이미지 최적화 기능을 비활성화합니다.
  // GitHub Pages는 자체적인 이미지 최적화를 지원하지 않으므로 이 옵션이 필요합니다.
  images: {
    unoptimized: true,
  },

  // GitHub Pages의 URL 구조에 맞게 'basePath'를 설정합니다.
  // 사용자님의 저장소 이름이 'mobile-wedding-invitation'이므로, 
  // URL은 'https://zi-young.github.io/mobile-wedding-invitation/' 형태가 될 것입니다.
  // 이 경로를 모든 정적 자산(CSS, JS, 이미지 등)의 시작 경로로 사용하도록 지정합니다.
  basePath: '/mobile-wedding-invitation',
};

export default nextConfig;
