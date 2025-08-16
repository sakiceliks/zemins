import type React from "react"
import ClientLayout from "./client-layout"
import Script from "next/script"
import { Montserrat, Poppins } from "next/font/google"
import { CSSOptimizer } from "@/components/css-optimizer"
import { PerformanceMonitor } from "@/components/performance-monitor"

// Initialize the fonts with display swap for better performance
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: "Zemin Ustası | Taş Halı, Epoksi ve Dekoratif Zemin Çözümleri",
  description: "Zeminustasi.com.tr, BMÇ Zemin güvencesiyle Taş Halı, Epoksi, Mikro Beton, Flake ve Kauçuk zemin gibi profesyonel ve dekoratif zemin kaplama çözümleri sunar. Anahtar teslim projelerimizle estetik ve dayanıklılığı bir araya getiriyoruz.",
  keywords: ["taş halı", "stone carpet", "epoksi zemin", "mikro beton", "flake zemin", "kauçuk zemin", "dekoratif zemin", "beton silim", "spor zemin", "zemin kaplama", "zemin ustası", "bmc zemin"],
  authors: [{ name: "BMÇ Zemin" }],
  openGraph: {
    title: "Zemin Ustası | Taş Halı, Epoksi ve Dekoratif Zemin Çözümleri",
    description: "Zeminustasi.com.tr, BMÇ Zemin güvencesiyle profesyonel ve dekoratif zemin kaplama çözümleri sunar.",
    url: "https://www.zeminustasi.com.tr",
    type: "website",
    locale: "tr_TR",
    siteName: "Zemin Ustası",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Critical CSS optimization */}
        <CSSOptimizer />
        
        {/* Defer Font Awesome CSS loading */}
       
        <noscript>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
        </noscript>

        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zemin Ustası",
              "url": "https://zeminustasi.com.tr",
              "logo": "https://zeminustasi.com.tr/logo.png",
              "description": "Yenilikçi inşaat çözümleri için güvenilir ortağınız",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Fatih, Sayfiye Sk. No:24 D:3, 34920 Sultanbeyli",
                "addressLocality": "İstanbul",
                "postalCode": "34920",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "(0531) 281-2958",
                "contactType": "customer service",
                "email": "info@zeminustasi.com.tr"
            },
              "sameAs": [
                "https://facebook.com/bmczemin",
                "https://instagram.com/bmczemin",
                "https://linkedin.com/company/bmczemin"
              ]
            })
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <PerformanceMonitor />
      </body>
    </html>
  )
}
