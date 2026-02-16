import { ProductDetail } from "@/components/product-detail"

export default function ProductPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const fromVendorCatalog = searchParams.fromVendorCatalog === 'true'
  return <ProductDetail productId={params.id} fromVendorCatalog={fromVendorCatalog} />
}
