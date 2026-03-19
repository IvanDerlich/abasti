import { ProductDetail } from "@/components/product-detail"

export default async function ProductPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const fromVendorCatalog = resolvedSearchParams.fromVendorCatalog === 'true';
  return <ProductDetail productId={resolvedParams.id} fromVendorCatalog={fromVendorCatalog} />
}
