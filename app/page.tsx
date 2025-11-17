import dynamic from 'next/dynamic'
import { buildSeoMetadata } from "@/lib/seo"

// Dynamically import client components with no SSR
const ClientComponents = dynamic(() => import('@/components/ClientComponents'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900" />
})

export const metadata = buildSeoMetadata({
  title: "Zemin Ustası | Taş Halı, Epoksi ve Dekoratif Zemin Kaplama Uzmanı",
  description:
    "BMÇ Zemin güvencesiyle taş halı, epoksi, mikro beton ve dekoratif zemin kaplama çözümlerini keşfedin. Ücretsiz keşif ve anahtar teslim projeler için hemen iletişime geçin.",
  keywords: [
    "zemin ustası",
    "epoksi zemin",
    "taş halı",
    "mikro beton",
    "beton silim",
    "zemin kaplama",
    "dekoratif zemin",
  ],
  path: "/",
})

function Home() {
  return (
    <ClientComponents />
  )
}

export default Home
