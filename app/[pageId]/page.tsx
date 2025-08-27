import { notFound } from "next/navigation";
import WeddingInvitationContent from "../WeddingInvitationContent"

export default function Page({ params }: { params: { pageId: string } }) {

  const { pageId } = params;
  // /admin 접근은 여기서 404 처리
  if (pageId === "admin") {
    return notFound(); // /admin은 이 페이지에서 렌더링 안됨
  }

  return <WeddingInvitationContent currentPageIdentifier={params.pageId} />
}
