import Image from "next/image"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "İletişim | BuildMaster İnşaat",
  description:
    "Sorularınız, teklifleriniz veya inşaat proje ihtiyaçlarınızı görüşmek için BuildMaster İnşaat ile iletişime geçin.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/contact-hero.png" alt="İletişim" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">İletişim</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Proje ihtiyaçlarınızı görüşmek veya teklif talep etmek için ekibimizle iletişime geçin.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                İletişime Geçin
              </div>
              <h2 className="text-4xl font-bold mb-6">Sizden Haber Almak İstiyoruz</h2>
              <p className="text-gray-700 mb-10 text-lg">
                Hizmetlerimiz hakkında sorunuz varsa, teklif talep etmek istiyorsanız veya projenizi başlatmaya hazırsanız, size yardımcı olmak için buradayız.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adresimiz</h3>
                    <p className="text-gray-700">123 BuildMaster Cad., İnşaat Mahallesi, İstanbul 34000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telefon Numarası</h3>
                    <p className="text-gray-700">(0212) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">E-posta Adresi</h3>
                    <p className="text-gray-700">info@buildmaster.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Çalışma Saatleri</h3>
                    <p className="text-gray-700">Pazartesi - Cuma: 08:00 - 17:00</p>
                    <p className="text-gray-700">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ücretsiz Teklif Talep Edin</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  İnşaat projeniz için detaylı, yükümlülük gerektirmeyen bir teklif almak için bu formu doldurun. Ekibimiz gereksinimlerinizi analiz edecek ve kapsamlı bir tahmin sunacak.
                </p>
                <form className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Adınız
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="ahmet@ornek.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="(0212) 456-7890"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Proje Sorgusu"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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

      {/* Map Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-300 h-[400px] rounded-2xl overflow-hidden relative">
              {/* This would be replaced with an actual map component in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 text-lg font-medium">İnteraktif Harita Burada Görüntülenecek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl font-bold mb-6">Sık Sorulan Sorular</h2>
            <p className="text-gray-700 text-lg">Hizmetlerimiz ve sürecimiz hakkında yaygın soruların cevaplarını bulun.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Örnek veriler
const faqs = [
  {
    question: "Hangi tür projeleri ele alıyorsunuz?",
    answer:
      "Konut evleri, ticari binalar, endüstriyel tesisler, yenilemeler ve mimari tasarım hizmetleri dahil olmak üzere geniş bir inşaat projeleri yelpazesini ele alıyoruz. Ekibimiz için hiçbir proje çok büyük veya çok küçük değildir.",
  },
  {
    question: "Projem için nasıl teklif alabilirim?",
    answer:
      "İletişim formumuzu doldurarak, ofisimizi arayarak veya bize e-posta göndererek teklif talep edebilirsiniz. Proje ihtiyaçlarınızı görüşmek ve detaylı bir tahmin sunmak için bir danışmanlık randevusu ayarlayacağız.",
  },
  {
    question: "Tipik bir inşaat projesi ne kadar sürer?",
    answer:
      "Proje süreleri kapsam ve karmaşıklığa bağlı olarak değişir. Küçük bir yenileme birkaç hafta sürebilirken, büyük bir ticari bina birkaç ay sürebilir. İlk danışmanlığımız sırasında, projeniz için tahmini bir zaman çizelgesi sunacağız.",
  },
  {
    question: "İzinler ve onayları ele alıyor musunuz?",
    answer:
      "Evet, kapsamlı hizmetimizin bir parçası olarak gerekli tüm izinleri ve düzenleyici onayları ele alıyoruz. Ekibimiz, sorunsuz bir onay süreci sağlamak için yerel yapı kodları ve düzenlemeleri konusunda bilgilidir.",
  },
  {
    question: "BuildMaster'ı diğer inşaat şirketlerinden ayıran nedir?",
    answer:
      "BuildMaster, kaliteye bağlılığımız, şeffaf iletişimimiz, yenilikçi çözümlerimiz ve zamanında teslimatımızla öne çıkıyor. Geleneksel ustalığı modern teknolojilerle birleştirerek, müşteri beklentilerini aşan olağanüstü sonuçlar sunuyoruz.",
  },
]
