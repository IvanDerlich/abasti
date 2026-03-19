import { CatalogDetail } from "@/components/catalog-detail"

export default async function CatalogDetailPage({ params }: { params: { id: string } }) {
  // If params is a Promise, await it
  const resolvedParams = await params;
  return <CatalogDetail catalogId={resolvedParams.id} />
}
