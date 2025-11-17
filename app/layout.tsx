import type React from "react"
import type { Metadata } from "next"
import Head from "next/head"
import Script from "next/script"
import { Montserrat, Poppins } from "next/font/google"
import ClientLayout from "./client-layout"
import { CSSOptimizer } from "@/components/css-optimizer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import UmamiAnalytics from "@/components/UmamiAnalytics"
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager"
import { buildSeoMetadata, siteUrl } from "@/lib/seo"

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

const rootSeo = buildSeoMetadata({
  title: "Sultanbeyli Epoksi Zemin | Taş Halı, Epoksi ve Dekoratif Zemin Çözümleri | Zemin Ustası",
  description:
    "Zeminustasi.com.tr, BMÇ Zemin güvencesiyle Taş Halı, Epoksi, Mikro Beton, Flake ve Kauçuk zemin gibi profesyonel ve dekoratif zemin kaplama çözümleri sunar. Anahtar teslim projelerimizle estetik ve dayanıklılığı bir araya getiriyoruz.",
  keywords: [
    "taş halı",
    "stone carpet",
    "epoksi zemin",
    "mikro beton",
    "flake zemin",
    "kauçuk zemin",
    "dekoratif zemin",
    "beton silim",
    "spor zemin",
    "zemin kaplama",
    "zemin ustası",
    "bmc zemin",
  ],
  path: "/",
})

export const metadata: Metadata = {
  ...rootSeo,
  metadataBase: new URL(siteUrl),
  authors: [{ name: "BMÇ Zemin" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <Head>
         <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
        {/* Google Tag Manager */}
        <GoogleTagManager />

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
              "url": "https://www.zeminustasi.com.tr",
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
      </Head>
      <body className={`${poppins.className} antialiased`}>
        <GoogleTagManagerNoscript />
        <GoogleAnalytics />
        <UmamiAnalytics />
        <ClientLayout>{children}</ClientLayout>
        <PerformanceMonitor />
      </body>
    </html>
  )
}
