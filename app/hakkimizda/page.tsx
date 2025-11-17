import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Award, Clock, Target, Eye, Lightbulb, Compass, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: "Hakkımızda | BMÇ Zemin | Zemin Ustası",
  description:
    "BMÇ Zemin'in değerlerini, uzman ekibini ve taş halı, epoksi ile mikro beton odaklı dekoratif zemin çözümlerine yaklaşımını yakından tanıyın.",
  keywords: ["bmç zemin", "zemin ustası", "hakkımızda", "taş halı uzmanı", "epoksi profesyoneli"],
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      {/* Kahraman Bölümü */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/about-team.png" alt="Ekip Üyeleri" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">BMÇ Zemin Hakkında</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Yenilikçi zemin çözümleri, kaliteli ustalık ve müşterilerimize karşı sarsılmaz bir bağlılıkla mükemmelliği inşa ediyoruz.
          </p>
        </div>
      </section>

      {/* Misyon & Vizyon Bölümü */}
      <section className="py-20 bg-gray-900 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
              Amacımız
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">Misyon & Vizyon</h2>
            <p className="text-gray-300 text-lg">
              Temel prensiplerimiz doğrultusunda, zemin kaplama sektörünü dönüştürmeye ve müşterilerimiz için kalıcı değer yaratmaya çalışıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-amber-500 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Misyonumuz</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Yenilikçilik, dürüstlük ve kaliteli ustalıkla müşteri beklentilerini aşan olağanüstü zemin çözümleri sunmak. Şunlara bağlıyız:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Kullananların yaşam kalitesini artıran güvenli, sürdürülebilir ve estetik zeminler yaratmak.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Ekibimiz arasında sürekli gelişim, mükemmellik ve profesyonellik kültürü oluşturmak.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Şeffaf iletişim ve etik uygulamalarla müşterilerimizle ve ortaklarımızla kalıcı ilişkiler kurmak.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-10 rounded-2xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-amber-500 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Vizyonumuz</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Zemin kaplama sektöründe en güvenilir ve yenilikçi şirket olmak, şunlarla tanınmak:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Zemin kalitesi, güvenliği ve müşteri memnuniyetinde yeni standartlar belirlemek.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Çevresel etkiyi en aza indiren ve dayanıklılığı maksimize eden sürdürülebilir uygulamalara öncülük etmek.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Sorumluluk sahibi iş uygulamaları ve anlamlı etkileşimler aracılığıyla çalıştığımız topluluklarda olumlu değişim yaratmak.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gray-800 p-8 rounded-2xl max-w-3xl mx-auto">
              <div className="bg-amber-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Yaklaşımımız</h3>
              <p className="text-gray-300 text-lg mb-6">
                Başarılı bir zemin uygulamasının; işbirliği, yenilikçilik ve detaylara gösterilen özen üzerine inşa edildiğine inanıyoruz. Geleneksel ustalığı en son teknolojilerle birleştirerek, zamana meydan okuyan projeler ortaya koyuyoruz.
              </p>
              <Link href="/iletisim">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Bizimle Ortak Olun
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hikayemiz Bölümü */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
                Hikayemiz
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white">Mükemmellik Mirası İnşa Ediyoruz</h2>
              <p className="text-gray-300 mb-6 text-lg">
                2000 yılında kurulan BMÇ Zemin, yenilik ve kaliteli ustalıkla zemin kaplama sektörünü dönüştürme vizyonuyla küçük bir aile şirketi olarak başladı.
              </p>
              <p className="text-gray-300 mb-6">
                Son yirmi yılda, konut, ticari ve endüstriyel sektörlerde 500'den fazla projeyi tamamlayarak lider bir zemin kaplama firmasına dönüştük. Başarımız, mükemmelliğe, dürüstlüğe ve müşteri memnuniyetine olan sarsılmaz bağlılığımız üzerine kurulmuştur.
              </p>
              <p className="text-gray-300 mb-6">
                Bugün BMÇ Zemin, müşterilerimiz için olağanüstü sonuçlar sunmak adına yeni teknolojileri ve sürdürülebilir uygulamaları benimseyerek zemin kaplama alanında sınırları zorlamaya devam ediyor.
              </p>
              <Link href="/iletisim">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Bizimle İletişime Geçin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/about-story.png" alt="Şirket geçmişi" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz Bölümü */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
              Değerlerimiz
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">Bizi Yönlendiren Şey</h2>
            <p className="text-gray-300 text-lg">
              Temel değerlerimiz, müşterilerle nasıl etkileşim kurduğumuzdan her projeye nasıl yaklaştığımıza kadar yaptığımız her şeye rehberlik eder.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Mükemmellik</h3>
              <p className="text-gray-300">
                Planlamadan uygulamaya kadar işimizin her yönünde mükemmellik için çabalıyoruz.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Dürüstlük</h3>
              <p className="text-gray-300">
                İşimizi her zaman dürüstlük, şeffaflık ve etik uygulamalarla yürütüyoruz.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Yenilikçilik</h3>
              <p className="text-gray-300">
                Müşterilerimiz için yenilikçi çözümler sunmak amacıyla yeni teknolojileri ve yöntemleri benimsiyoruz.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Güvenilirlik</h3>
              <p className="text-gray-300">
                Sürekli olarak sözlerimizi yerine getiriyor, teslim tarihlerine uyuyor ve beklentileri aşıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ekip Bölümü */}
      {/* <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium mb-4">
              Ekibimiz
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">Liderlik Ekibimizle Tanışın</h2>
            <p className="text-gray-300 text-lg">
              Deneyimli liderlik ekibimiz, her projeye onlarca yıllık sektör uzmanlığını getiriyor.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-amber-500 mb-4">{member.position}</p>
                  <p className="text-gray-300 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {member.social.map((social, idx) => (
                      <Link
                        key={idx}
                        href={social.url}
                        className="text-gray-400 hover:text-amber-500 transition-colors"
                      >
                        <social.icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* İstatistikler Bölümü */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-black font-medium">Tamamlanan Projeler</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <p className="text-black font-medium">Yıllık Deneyim</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <p className="text-black font-medium">Uzman Ekip Üyesi</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-black font-medium">Müşteri Memnuniyeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Bizimle Çalışmaya Hazır mısınız?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Proje ihtiyaçlarınızı görüşmek ve BMÇ Zemin'in vizyonunuzu nasıl hayata geçirebileceğini keşfetmek için bugün bizimle iletişime geçin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/iletisim">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                İletişime Geçin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projeler">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-amber-500 hover:bg-amber-500/10 font-semibold px-8"
              >
                Projelerimizi Görüntüle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Örnek veri (Değiştirmeniz Gerekebilir)
import { Linkedin, Twitter, Facebook } from "lucide-react";

const teamMembers = [
  {
    name: "Murat Çelik",
    position: "CEO & Kurucu",
    bio: "Zemin kaplama sektöründe 30 yılı aşkın deneyimiyle Murat Bey, BMÇ Zemin'i yenilik ve kalite vizyonuyla kurdu.",
    image: "/images/team-1.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Twitter, url: "#" },
      { icon: Facebook, url: "#" },
    ],
  },
  {
    name: "Ayşe Yılmaz",
    position: "Operasyon Direktörü",
    bio: "Ayşe Hanım, projelerin zamanında, bütçe dahilinde ve en yüksek kalite standartlarında teslim edilmesini sağlar.",
    image: "/images/team-2.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Twitter, url: "#" },
    ],
  },
  {
    name: "Caner Aydın",
    position: "Proje Yöneticisi",
    bio: "Caner Bey, her projeye yaratıcı bir vizyon ve teknik uzmanlık katıyor, sürdürülebilir zemin çözümlerinde uzmanlaşmıştır.",
    image: "/images/team-3.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Facebook, url: "#" },
    ],
  },
];