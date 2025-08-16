import { getServices } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Hizmetlerimiz | Zemin Ustası",
  description:
    "Konut, ticari, endüstriyel ve mimari tasarım çözümleri dahil olmak üzere BMÇ Zemin'ın kapsamlı inşaat hizmetlerini keşfedin.",
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/images/services-hero.png"
          alt="İnşaat hizmetleri"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Hizmetlerimiz</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
            Özel ihtiyaçlarınıza ve vizyonunuza uyarlanmış kapsamlı inşaat çözümleri.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-[#ffbf00] text-black rounded-full text-sm font-medium mb-3 md:mb-4">
              Sunduğumuz Hizmetler
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-white">
              Kapsamlı İnşaat Çözümleri
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Konseptten tamamlanmaya kadar, vizyonunuzu hassasiyet ve mükemmellikle hayata geçirmek için uçtan uca
              hizmetler sunuyoruz.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[#ffbf00]/20 transition-all duration-300 group border border-gray-700"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={service.image || "/images/services-hero.png"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-5 md:mb-6 text-sm sm:text-base">{service.description}</p>
                  <Link href={`/hizmetler/${service.slug}`}>
                    <Button className="bg-[#ffbf00] hover:bg-[#e6ac00] text-black w-full font-medium">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Process Section */}
      <section className="py-12 md:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-3 md:mb-4">
              Sürecimiz
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-white">Nasıl Çalışıyoruz</h2>
            <p className="text-base md:text-lg text-gray-300">
              Akıcı sürecimiz, ilk danışmanlıktan proje tamamlanmasına kadar sorunsuz bir deneyim sağlar.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line - hidden on mobile, visible on larger screens */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-600 hidden md:block"></div>

              {/* Process steps - mobile optimized */}
              <div className="space-y-8 md:space-y-12 relative">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative w-full">
                      <div className="bg-[#2a2a2a] p-6 md:p-8 rounded-2xl shadow-md border border-gray-700 relative z-10">
                        <div className="bg-amber-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                          <span className="text-black font-bold text-lg md:text-xl">{index + 1}</span>
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-white">{step.title}</h3>
                        <p className="text-gray-300 text-sm sm:text-base">{step.description}</p>
                      </div>
                      {/* Circle on the timeline - hidden on mobile */}
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-6 h-6 bg-amber-500 rounded-full border-4 border-[#1a1a1a] z-20 hidden md:block"></div>
                    </div>
                    <div className="md:w-1/2 hidden md:block">{/* This div is just for spacing in the timeline */}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1 border border-gray-600">
              <Image
                src="/images/quality.png"
                alt="Construction quality"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-3 md:mb-4">
                Why Choose Us
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-white">BMÇ Zemin Farkı</h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-5 md:mb-8">
                BMÇ Zemin'ı seçtiğinizde, mükemmellik, yenilik ve tam memnuniyetinize bağlı bir ortak seçiyorsunuz.
              </p>
              <div className="space-y-4 md:space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-amber-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-white">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-[#1a1a1a] text-white border-t border-gray-700">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
            Projenizi Başlatmaya Hazır mısınız?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
            Ücretsiz danışmanlık için bugün bizimle iletişime geçin ve BMÇ Zemin'ın vizyonunuzu nasıl hayata
            geçirebileceğini keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 md:px-8 w-full sm:w-auto transition-colors"
              >
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


const processSteps = [
  {
    title: "İlk Danışmanlık",
    description:
      "Vizyonunuzu, gereksinimlerinizi ve bütçe kısıtlamalarınızı anlamak için kapsamlı bir danışmanlıkla başlıyoruz.",
  },
  {
    title: "Tasarım & Planlama",
    description:
      "Tasarım ekibimiz, her aşamada geri bildiriminizi dahil ederek detaylı planlar ve görselleştirmeler oluşturur.",
  },
  {
    title: "İzinler & Onaylar",
    description: "Projenizin sorunsuz ilerlemesini sağlamak için gerekli tüm izinleri ve düzenleyici onayları ele alıyoruz.",
  },
  {
    title: "İnşaat",
    description:
      "Yetenekli ustalarımız, hassasiyet, kaliteli malzemeler ve detaylara dikkatle projenizi hayata geçirir.",
  },
  {
    title: "Kalite Güvencesi",
    description:
      "İnşaat süreci boyunca titiz kalite kontrolleri, her şeyin yüksek standartlarımızı karşılamasını sağlar.",
  },
  {
    title: "Proje Tamamlanması",
    description: "Tamamlanan projenizi zamanında teslim ediyoruz ve tamamlanmasından sonra bile kapsamlı destek sağlıyoruz.",
  },
]

const benefits = [
  {
    title: "Deneyimli Ekip",
    description: "Ekibimiz inşaat ve tasarımın tüm yönlerinde onlarca yıllık birleşik deneyim getiriyor.",
  },
  {
    title: "Kaliteli Ustalık",
    description: "Dayanıklılık ve estetik çekicilik sağlamak için sadece en iyi malzemeleri ve teknikleri kullanıyoruz.",
  },
  {
    title: "Şeffaf İletişim",
    description: "Düzenli güncellemeler ve açık iletişim, proje boyunca sizi bilgilendirir.",
  },
  {
    title: "Zamanında Teslimat",
    description: "Son tarihleri karşılamak ve projeleri vaat ettiğimiz gibi teslim etmekle gurur duyuyoruz.",
  },
  {
    title: "Rekabetçi Fiyatlandırma",
    description: "Gizli maliyetler veya beklenmedik sürprizler olmadan adil, şeffaf fiyatlandırma.",
  },
]
