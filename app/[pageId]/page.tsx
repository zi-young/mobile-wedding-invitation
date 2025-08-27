import WeddingInvitationContent from "../WeddingInvitationContent"

export default function Page({ params }: { params: { pageId: string } }) {

  return <WeddingInvitationContent currentPageIdentifier={params.pageId} />
}
