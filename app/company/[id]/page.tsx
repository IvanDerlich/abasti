import { CompanyProfile } from "@/components/company-profile"

export default function CompanyPage({ params }: { params: { id: string } }) {
  return <CompanyProfile companyId={params.id} />
}
