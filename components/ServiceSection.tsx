import { Button } from "@/components/ui/button"
import { MessageCircle, Wrench } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Zemin Betonları",
      subtitle: "Faaliyet Alanlarımız",
    },
    {
      id: "02",
      title: "Beton Parlatma",
      subtitle: "Faaliyet Alanlarımız",
    },
    {
      id: "03",
      title: "Epoksi Zemin Kaplama",
      subtitle: "Faaliyet Alanlarımız",
    },
    {
      id: "04",
      title: "Dekoratif Zemin Sistemleri",
      subtitle: "Faaliyet Alanlarımız",
    },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Image */}
     

      {/* Pagination Dots */}


      {/* Floating Action Buttons */}
     



      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Faaliyet
                <br />
                Alanlarımız
              </h1>

              <div className="space-y-4 text-gray-100 text-lg leading-relaxed max-w-lg">
                <p>
                  Beton Zemin Çözümleri, beton uygulamalarını ve betona zemine uygulanabilecek diğer alternatif
                  uygulamaları kapsayan geniş bir konudur.
                </p>
                <p>
                  Şirketimiz zeminin kullanımına ve ihtiyaçlarına bağlı olarak betona çok çeşitli uygulama ve ürünler
                  sunar.
                </p>
                <p>
                  Hangi uygulamaya ihtiyacınız olduğuna emin değilseniz, zemininize özel kullanımının ve uygulamasının
                  ne olması gerektiğini konusunda çözüm üretmek ve sizleri doğru yönlendirmek için hazırız.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
            >
              Detaylı bilgi
            </Button>
          </div>

          {/* Right Content - Service Cards */}
          <div className="grid grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative p-8 rounded-3xl text-white min-h-[200px] flex flex-col justify-between transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : "bg-gradient-to-br from-orange-500 to-red-500"
                }`}
              >
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-10 bg-cover bg-center rounded-3xl"
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=200&width=200')`,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-6xl font-bold opacity-90 mb-4">{service.id}</div>

                  <div className="space-y-2">
                    <div className="text-sm opacity-90 font-medium">{service.subtitle}</div>
                    <h3 className="text-xl font-bold leading-tight">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
