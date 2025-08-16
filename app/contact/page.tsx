import Image from "next/image";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

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
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
                İletişime Geçin
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white">Sizden Haber Almak İstiyoruz</h2>
              <p className="text-gray-300 mb-10 text-lg">
                Hizmetlerimiz hakkında sorunuz varsa, teklif almak istiyorsanız veya projenizi başlatmaya hazırsanız, size yardımcı olmak için buradayız.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Adresimiz</h3>
                    <p className="text-gray-300"> Fatih, Sayfiye Sk. No:24 D:3, 34920 Sultanbeyli/İstanbul</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Telefon Numarası</h3>
                    <p className="text-gray-300">(0531) 281 29 58</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">E-posta Adresi</h3>
                    <p className="text-gray-300">info@zeminustasi.com.tr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Çalışma Saatleri</h3>
                    <p className="text-gray-300">Pazartesi - Cuma: 08:00 - 17:00</p>
                    <p className="text-gray-300">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-white">Ücretsiz Teklif Talep Edin</h3>
                <p className="text-gray-300 mb-6">
                  Zemin projeniz için detaylı, ücretsiz bir teklif almak üzere bu formu doldurun. Ekibimiz gereksinimlerinizi analiz ederek kapsamlı bir tahmin sunacaktır.
                </p>
                <form className="bg-gray-800 p-10 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold mb-6 text-white">Bize Mesaj Gönderin</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Adınız
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                        placeholder="ahmet@ornek.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      placeholder="(532) 123 45 67"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      placeholder="Proje Sorgusu"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      placeholder="Projeniz hakkında bize bilgi verin..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3">
                    Mesaj Gönder
                    <ArrowRight className="ml-2 h-4 w-4" />
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