import Image from "next/image";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import ContactButton from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "İletişim | Zemin Ustası",
  description:
    "Taş Halı, Epoksi, Mikro Beton gibi profesyonel zemin çözümleri için Zeminustasi.com.tr ile iletişime geçin. Ücretsiz keşif ve teklif için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      {/* Kahraman Bölümü */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/contact-hero.png" alt="İletişim" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">İletişim</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Zemin projeleriniz için ücretsiz keşif veya teklif talep etmek için ekibimizle iletişime geçin.
          </p>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
            {/* Sol Taraf - İletişim Bilgileri */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4 sm:mb-6">
                İletişime Geçin
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Sizden Haber Almak İstiyoruz
              </h2>
              <p className="text-gray-300 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
                Hizmetlerimiz hakkında sorunuz varsa, teklif almak istiyorsanız veya projenizi başlatmaya hazırsanız, size yardımcı olmak için buradayız.
              </p>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Adres */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-amber-500 p-3 sm:p-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Adresimiz</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Fatih, Sayfiye Sk. No:24 D:3, 34920 Sultanbeyli/İstanbul
                    </p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-amber-500 p-3 sm:p-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Telefon Numarası</h3>
                    <ContactButton
                      type="phone"
                      phoneNumber="905312812958"
                      variant="link"
                      className="text-amber-500 hover:text-amber-400 p-0 h-auto font-medium text-sm sm:text-base"
                      trackingLabel="contact_page_phone"
                    >
                      (0531) 281 29 58
                    </ContactButton>
                  </div>
                </div>

                {/* E-posta */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-amber-500 p-3 sm:p-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">E-posta Adresi</h3>
                    <a 
                      href="mailto:info@zeminustasi.com.tr"
                      className="text-amber-500 hover:text-amber-400 transition-colors text-sm sm:text-base"
                    >
                      info@zeminustasi.com.tr
                    </a>
                  </div>
                </div>

                {/* Çalışma Saatleri */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-amber-500 p-3 sm:p-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Çalışma Saatleri</h3>
                    <div className="space-y-1">
                      <p className="text-gray-300 text-sm sm:text-base">Pazartesi - Cuma: 08:00 - 17:00</p>
                      <p className="text-gray-300 text-sm sm:text-base">Cumartesi: 09:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Form */}
            <div className="order-1 lg:order-2">
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Ücretsiz Teklif Talep Edin</h3>
                <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                  Zemin projeniz için detaylı, ücretsiz bir teklif almak üzere bu formu doldurun. Ekibimiz gereksinimlerinizi analiz ederek kapsamlı bir tahmin sunacaktır.
                </p>
                
                <form className="bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-700">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Bize Mesaj Gönderin</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Adınız <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition-all"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        E-posta Adresi <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition-all"
                        placeholder="ahmet@ornek.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon Numarası <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition-all"
                      placeholder="(0531) 281 29 58"
                    />
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition-all"
                      placeholder="Proje Sorgusu"
                    />
                  </div>
                  
                  <div className="mb-6 sm:mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Mesajınız <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 resize-none transition-all"
                      placeholder="Projeniz hakkında bize bilgi verin..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Mesaj Gönder
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harita Bölümü */}
      <section className="py-10 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-700 h-[400px] rounded-2xl overflow-hidden relative">
              {/* Harita bileşeni burada yer alacak */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-lg font-medium">İnteraktif Harita Burada Görüntülenecek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSS Bölümü */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
              SSS
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-300 text-lg">Hizmetlerimiz ve süreçlerimiz hakkında yaygın soruların cevaplarını bulun.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Örnek veriler
const faqs = [
  {
    question: "Hangi tür zemin kaplamalarını uyguluyorsunuz?",
    answer:
      "Geniş bir yelpazede profesyonel zemin çözümleri sunuyoruz. Bunlar arasında Taş Halı (Stone Carpet), Mikro Beton, Epoksi, Flake, Kauçuk ve Spor Zemin Sistemleri bulunmaktadır. Konut, ticari ve endüstriyel alanlar için uygun çözümlerimiz mevcuttur.",
  },
  {
    question: "Projem için nasıl teklif alabilirim?",
    answer:
      "Web sitemizdeki iletişim formunu doldurarak, bizi telefonla arayarak veya e-posta göndererek teklif talep edebilirsiniz. Projenizin detaylarını görüşmek ve kapsamlı bir fiyatlandırma sunmak için ücretsiz keşif hizmeti sağlıyoruz.",
  },
  {
    question: "Zemin uygulaması ne kadar sürer?",
    answer:
      "Uygulama süresi, projenin kapsamına, zemin türüne ve yüzeyin durumuna bağlı olarak değişir. Küçük projeler birkaç gün içinde tamamlanabilirken, daha büyük projeler için daha uzun bir süre gerekebilir. Bu bilgiyi ilk danışmanlığımız sırasında size sunacağız.",
  },
  {
    question: "Uygulama sonrası bakım ve temizlik nasıl yapılır?",
    answer:
      "Her zemin türü için özel bakım ve temizlik talimatları sağlıyoruz. Uygulama sonrasında zemininizin uzun ömürlü olması için gereken tüm bilgileri size aktarıyor ve destek oluyoruz.",
  },
  {
    question: "Zemin Ustası'nı diğer firmalardan ayıran nedir?",
    answer:
      "BMÇ Zemin olarak kaliteye, şeffaf iletişime, yenilikçi çözümlere ve zamanında teslimata olan bağlılığımızla öne çıkıyoruz. Geleneksel ustalığı modern teknolojiyle birleştirerek müşteri beklentilerini aşan, estetik ve dayanıklı sonuçlar sunuyoruz.",
  },
];