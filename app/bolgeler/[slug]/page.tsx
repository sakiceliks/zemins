import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBolgelerBySlug } from "@/lib/supabase"
import { buildSeoMetadata } from "@/lib/seo"
import { RegionalLanding } from "@/components/bolgeler/RegionalLanding"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const data = await getBolgelerBySlug(params.slug)
    const keywords = [
      data.company_name,
      data.hero_title,
      ...(data.serviceAreas || []),
      data.company_address,
    ].filter(Boolean)

    return buildSeoMetadata({
      title: data.seo_title || `${data.company_name} | ${data.hero_title}`,
      description: data.seo_description || data.hero_subtitle,
      path: `/bolgeler/${params.slug}`,
      keywords,
      type: "article",
      section: "Bölge",
    })
        } catch (error) {
    return buildSeoMetadata({
      title: "Bölge Bulunamadı",
      description: "Aradığınız bölge içeriği bulunamadı.",
      path: "/bolgeler",
      robots: {
        index: false,
        follow: false,
      },
    })
  }
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    const siteData = await getBolgelerBySlug(params.slug)
    return <RegionalLanding siteData={siteData} />
  } catch (error) {
    notFound()
  }
 }
