"use client"

import { useState, useEffect } from "react"
import { Phone, Calculator, Images, MapPin, Clock, Mail, Send, Menu, X } from "lucide-react"
import ServiceCarousel from "@/components/service-carousel"
import { getBolgelerBySlug } from "@/lib/supabase"
import { Bolgeler } from "@/lib/supabase"
import { use } from "react"
import ContactButton from "@/components/ContactButton"

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function DynamicPage({ params }: PageProps) {
    const { slug } = use(params);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [siteData, setSiteData] = useState<Bolgeler | null>(null);
    const [loading, setLoading] = useState(true);
  
    // Fetch data based on slug
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getBolgelerBySlug(slug);
          setSiteData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [slug]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log("Form submitted");
    };
  
    if (loading) {
      return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading...</div>;
    }
  
    if (!siteData) {
      return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Data not found</div>;
    }
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
              <i className="fas fa-hammer mr-2"></i>
              {siteData.company_name}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {siteData.navigation.map((item) => (
                <a key={item.label} href={item.href} className="hover:text-amber-500 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href={`tel:${siteData.company_phone}`}
              className="hidden md:flex bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg transition-colors items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ara
            </a>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 mt-4">
                {siteData.navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:text-amber-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={`tel:${siteData.company_phone}`}
                  className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ara
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent animate-fade-in">
            {siteData.hero_title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">{siteData.hero_subtitle}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {siteData.hero_buttons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center ${
                  button.primary
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                }`}
              >
                {button.icon === "fas fa-calculator" && <Calculator className="w-5 h-5 mr-2" />}
                {button.icon === "fas fa-images" && <Images className="w-5 h-5 mr-2" />}
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {siteData.stats.map((stat, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold text-amber-500 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Carousel */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
            Hizmet Bölgelerimiz
          </h2>
          <ServiceCarousel districts={siteData.serviceAreas} />
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
            Hizmetlerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-gray-900/70 border border-gray-700 rounded-lg p-6 hover:scale-105 transition-transform"
              >
                <div className="text-4xl text-amber-500 mb-4">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-2 text-gray-300">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <i className="fas fa-check text-amber-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="avantajlar" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
            Avantajlar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteData.advantages.map((advantage, index) => (
              <div key={index} className="backdrop-blur-md bg-gray-900/70 border border-gray-700 rounded-lg p-6">
                <div className="text-4xl text-amber-500 mb-4">
                  <i className={advantage.icon}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">{advantage.title}</h3>
                <p className="text-gray-300">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
            İletişim
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Adres</h3>
                  <p className="text-gray-300">{siteData.company_address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p className="text-gray-300">{siteData.company_phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Çalışma Saatleri</h3>
                  <p className="text-gray-300">Hafta içi: {siteData.company_workingHours_weekdays}</p>
                  <p className="text-gray-300">Cumartesi: {siteData.company_workingHours_saturday}</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-gray-900/70 border border-gray-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Ücretsiz Keşif Talebi</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Proje Alanı (m²)"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  placeholder="Proje Detayları"
                  rows={4}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Keşif Talebini Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-gray-900 bg-clip-text text-transparent">
                {siteData.company_name}
              </h3>
                             <p className="text-gray-300 mb-4">
                 Profesyonel taş halı kaplama hizmetleri ile zemin çözümlerinizde yanınızdayız.
               </p>
               <div className="flex space-x-4">
                 {siteData.socialMedia.map((social, index) => (
                   <a
                     key={index}
                     href={social.href}
                     className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                   >
                     <i className={social.icon}></i>
                   </a>
                 ))}
               </div>
             </div>
                         <div>
               <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
               <ul className="space-y-2 text-gray-300">
                 {siteData.footerLinks.map((link, index) => (
                   <li key={index}>
                     <a href={link.href} className="hover:text-amber-500 transition-colors">
                       {link.label}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
            <div>
              <h3 className="text-xl font-bold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                  {siteData.company_address}
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-amber-500" />
                  {siteData.company_phone}
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-amber-500" />
                  {siteData.company_email}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteData.company_fullName}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>



             {/* WhatsApp Button */}
       <ContactButton
         type="whatsapp"
         phoneNumber={siteData.company_whatsappPhone?.replace(/\D/g, '') || '905312812958'}
         message="Merhaba, size nasıl yardımcı olabilirim?"
         variant="default"
         className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:scale-110 transition-all animate-bounce z-50 p-0"
         trackingLabel="bolgeler_whatsapp"
         showIcon={false}
       >
         <i className="fab fa-whatsapp"></i>
       </ContactButton>

       {/* Font Awesome CDN */}
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
     </div>
   )
 }
