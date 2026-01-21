import { CatalogDetail } from "@/components/catalog-detail"

export default function CatalogDetailPage({ params }: { params: { id: string } }) {
  return <CatalogDetail catalogId={params.id} />
}
