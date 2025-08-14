// app/[pageId]/page.tsx
// 이 파일은 이제 서버 컴포넌트입니다. (상단에 "use client"가 없습니다.)
// 클라이언트 훅(useState, useEffect, useParams 등)은 사용할 수 없습니다.

// generateStaticParams 함수를 추가합니다.
// 이 함수는 'output: "export"' 설정 시 필수적입니다.
// Next.js에게 빌드 시 어떤 동적 경로를 미리 생성할지 알려줍니다.
export async function generateStaticParams() {
  // 예를 들어, '1'과 '2' 두 가지 pageId 값에 대해 페이지를 미리 생성하도록 설정합니다.
  // '1' 페이지는 AccountSection이 보이고, '2' 페이지는 AccountSection이 보이지 않습니다.
  const paths = [
    { pageId: '1' },
    { pageId: '2' }, // AccountSection이 없는 버전
    // 필요한 경우 다른 pageId 값도 추가할 수 있습니다.
    // { pageId: 'another-path' },
  ];

  return paths;
}

// 이 파일은 클라이언트 훅을 직접 사용하지 않으므로,
// 실제 UI 로직을 담고 있는 클라이언트 컴포넌트 `WeddingInvitationContent`를 임포트합니다.
// 이 `WeddingInvitationContent.tsx` 파일은 `app/[pageId]` 폴더 안에 있다고 가정합니다.
import WeddingInvitationContent from './WeddingInvitationContent';

// 이 WeddingInvitation 컴포넌트 자체는 서버에서 렌더링됩니다.
// 동적 라우팅의 파라미터(`pageId`)는 `params` prop으로 전달받습니다.
export default function WeddingInvitation({ params }: { params: { pageId: string | string[] } }) {
  // `params`에서 `pageId`를 안전하게 가져옵니다.
  // `pageId`는 단일 문자열이거나 (예: /1) 문자열 배열일 수 있습니다 (예: /[...slug] 같은 복수 경로).
  const routePageId = params?.pageId;

  // 실제 조건 비교에 사용할 `pageId` 값을 추출합니다.
  // `routePageId`가 배열이면 첫 번째 요소를 사용하고, 그렇지 않으면 `routePageId` 자체를 사용합니다.
  const currentPageIdentifier = Array.isArray(routePageId) ? routePageId[0] : routePageId;

  // 실제 UI 렌더링과 클라이언트 사이드 로직은 `WeddingInvitationContent` 컴포넌트에 위임합니다.
  // `currentPageIdentifier` 값을 props로 전달하여 자식 컴포넌트에서 활용할 수 있도록 합니다.
  return (
    <WeddingInvitationContent currentPageIdentifier={currentPageIdentifier} />
  );
}
