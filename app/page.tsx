import { Suspense } from "react"
import ClientComponents from "@/components/ClientComponents"
import { buildSeoMetadata } from "@/lib/seo"

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
    <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
      <ClientComponents />
    </Suspense>
  )
}

export default Home
