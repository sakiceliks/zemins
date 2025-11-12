import Link from "next/link"
import { HardHat, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import logo from '../public/logo.png'
import KadikoyTelefontamiriBacklink from "./TelSeo";

export function Footer({ services, siteSettings }: { services?: any[]; siteSettings?: any }) {
  const servicesList = services || []

  return (
    <footer className="bg-gray-900 p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {/* Company Info */}
          <div className="text-left lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
         <Image src={logo} width={300} height={300} alt="logo"/>
            </Link>
            <p className="text-gray-300 mb-8 text-base leading-relaxed">
              {siteSettings?.company_description ||
                "Yenilikçi inşaat çözümleri için güvenilir ortağınız. 2000'den beri mükemmellik inşa ediyor ve kalite sunuyoruz."}
            </p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "https://instagram.com/bmczemin", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-amber-500 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-6 text-white relative">
              Hizmetlerimiz
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {servicesList.map((service, index) => (
                <li key={service.id || index}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="text-gray-300 hover:text-amber-500 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-6 text-white relative">
              Hızlı Bağlantılar
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/projeler", label: "Projeler" },
                { href: "/blog", label: "Blog" },
                { href: "/iletisim", label: "İletişim" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-amber-500 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-6 text-white relative">
              İletişim Bilgileri
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: siteSettings?.address || "123 BMÇ Zemin Cad., İnşaat Mahallesi, İstanbul 34000",
                },
                {
                  icon: Phone,
                  content: siteSettings?.phone || "(0212) 456-7890",
                },
                {
                  icon: Mail,
                  content: siteSettings?.email || "info@bmczemin.com",
                },
              ].map(({ icon: Icon, content }, index) => (
                <li key={index} className="flex items-start justify-center sm:justify-start group">
                  <div className="p-2 bg-amber-500/10 rounded-lg mr-3 mt-0.5 group-hover:bg-amber-500/20 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-gray-300 text-left leading-relaxed group-hover:text-white transition-colors duration-300">
                    {content}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/contact#quote-form">
                <Button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 border-0">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} BMÇ Zemin. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
