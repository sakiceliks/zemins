import type React from "react"
import ClientLayout from "./client-layout"
import './globals.css'
import Script from "next/script"
import { Montserrat, Poppins } from "next/font/google"

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
  title: "BuildMaster İnşaat - Kaliteli İnşaat Hizmetleri",
  description: "BuildMaster İnşaat olarak konut, ticari ve endüstriyel projeler için kapsamlı inşaat hizmetleri sunuyoruz.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>

        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BuildMaster İnşaat",
              "url": "https://buildmaster.com",
              "logo": "https://buildmaster.com/logo.png",
              "description": "Yenilikçi inşaat çözümleri için güvenilir ortağınız",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 BuildMaster Cad., İnşaat Mahallesi",
                "addressLocality": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "(0212) 456-7890",
                "contactType": "customer service",
                "email": "info@buildmaster.com"
            },
              "sameAs": [
                "https://facebook.com/buildmaster",
                "https://instagram.com/buildmaster",
                "https://linkedin.com/company/buildmaster"
              ]
            })
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
