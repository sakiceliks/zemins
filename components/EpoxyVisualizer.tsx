"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Upload, Wand2 } from "lucide-react"
import { visualizeEpoxyFloor } from "@/app/ai/flows/visualize-epoxy-floow"

const epoxyStyles = [
  "Metallic Epoksi",
  "Kuvars Kumlu Epoksi",
  "Flake (Pul) Epoksi",
  "3D Efektli Epoksi",
  "Düz Renk Epoksi",
  "Mermer Desenli Epoksi",
  "Terrazzo Görünümlü",
  "Endüstriyel Stil",
  "Parlak Yüzey",
]

const colorSchemes = [
  "Modern Gri Tonları",
  "Sıcak Kahve Tonları",
  "Mavi-Beyaz Kombin",
  "Siyah-Beyaz Kontrast",
  "Doğal Bejler",
  "Canlı Renkler",
  "Pastel Tonlar",
  "Metalik Gümüş",
  "Altın Dokunuşlar",
]

export default function EpoxyVisualizer() {
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoDataUri, setPhotoDataUri] = useState<string>("")
  const [epoxyStyle, setEpoxyStyle] = useState<string>("")
  const [colorScheme, setColorScheme] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [styleDescription, setStyleDescription] = useState<string>("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResultImage(null)
    }
  }

  const handleSubmit = async () => {
    if (!photoDataUri || !epoxyStyle) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen bir fotoğraf yükleyin ve en az bir stil seçin.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResultImage(null)

    try {
      const result = await visualizeEpoxyFloor({
        photoDataUri,
        epoxyStyle,
        ...(colorScheme && { colorScheme }),
      })

      setResultImage(result.visualizedImage)
      setStyleDescription(result.styleDescription)
    } catch (error) {
      console.error("Görselleştirme başarısız:", error)
      toast({
        title: "Görselleştirme Başarısız",
        description: "Epoxy zemin görselleştirilemedi. Lütfen başka bir fotoğraf veya stil deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="epoxy-visualizer" className="py-16 md:py-24 bg-gradient-to-br px-5 from-gray-900 to-gray-800 min-h-screen">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Epoxy Zemin Görselleştirici</h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            Mekanınıza epoxy zemin uygulandığında nasıl görüneceğini şimdi keşfedin.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto bg-gradient-to-br px-5 py-6 from-gray-800 to-gray-700 border-gray-700">
          <CardContent className="p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="photo-upload" className="font-medium text-lg text-[#ffbf00]">
                    1. Mekan Fotoğrafı Yükleyin
                  </label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 bg-gradient-to-br px-5 from-gray-900 to-gray-800 border-gray-600 text-white file:bg-[#ffbf00] file:text-black file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:bg-[#404040] focus:border-[#ffbf00] focus:ring-[#ffbf00]"
                  />
                </div>

                <div>
                  <label htmlFor="epoxy-style" className="font-medium text-lg text-[#ffbf00]">
                    2. Epoxy Stili Seçin
                  </label>
                  <Select onValueChange={setEpoxyStyle} value={epoxyStyle}>
                    <SelectTrigger
                      id="epoxy-style"
                      className="mt-2 bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 border-gray-600 text-white hover:bg-[#404040] focus:border-[#ffbf00] focus:ring-[#ffbf00]"
                    >
                      <SelectValue placeholder="Epoxy stili seçin" className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 border-gray-600">
                      {epoxyStyles.map((style) => (
                        <SelectItem
                          key={style}
                          value={style}
                          className="text-white hover:bg-[#ffbf00] hover:text-black focus:bg-[#ffbf00] focus:text-black"
                        >
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="color-scheme" className="font-medium text-lg text-[#ffbf00]">
                    3. Renk Şeması (Opsiyonel)
                  </label>
                  <Select onValueChange={setColorScheme} value={colorScheme}>
                    <SelectTrigger
                      id="color-scheme"
                      className="mt-2 bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 border-gray-600 text-white hover:bg-[#404040] focus:border-[#ffbf00] focus:ring-[#ffbf00]"
                    >
                      <SelectValue placeholder="Renk şeması seçin" className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 border-gray-600">
                      {colorSchemes.map((scheme) => (
                        <SelectItem
                          key={scheme}
                          value={scheme}
                          className="text-white hover:bg-[#ffbf00] hover:text-black focus:bg-[#ffbf00] focus:text-black"
                        >
                          {scheme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !photoFile || !epoxyStyle}
                  className="w-full bg-[#ffbf00] hover:bg-[#e6ac00] text-black font-semibold disabled:bg-gray-600 disabled:text-gray-400 transition-colors duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    "Görselleştiriliyor..."
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5 disabled:text-[#ffbf00] text-gray-900" />
<span className="disabled:text-[#ffbf00] text-gray-900">                      Epoxy Zemin Görselleştir
</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="relative w-full bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 rounded-lg flex items-center justify-center p-4 border border-gray-700">
                {!photoPreview && (
                  <div className="text-center text-gray-400">
                    <Upload className="mx-auto h-12 w-12 mb-2 text-[#ffbf00]" />
                    <p>Mekan fotoğrafınız burada görünecek</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full w-full">
                  {photoPreview && (
                    <div className="relative h-full min-h-[300px] bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg border border-gray-700">
                      <Image
                        src={photoPreview || "/placeholder.svg"}
                        alt="Orijinal Mekan"
                        fill
                        className="object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-2 text-sm rounded-md font-medium border border-gray-600">
                        Orijinal Mekan
                      </div>
                    </div>
                  )}

                  {resultImage && (
                    <div className="relative h-full min-h-[300px] bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg border border-gray-700">
                      <Image
                        src={resultImage || "/placeholder.svg"}
                        alt={styleDescription || "Görselleştirilmiş Epoxy Zemin"}
                        fill
                        className="object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#ffbf00] text-black px-3 py-2 text-sm rounded-md font-medium">
                        {styleDescription || "Epoxy Zemin"}
                      </div>
                    </div>
                  )}
                </div>

                {isLoading && (
                  <div className="absolute inset-0 bg-[#1a1a1a]/95 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                    <Wand2 className="h-12 w-12 animate-pulse text-[#ffbf00] mb-2" />
                    <p className="mt-4 text-lg font-medium text-white">Epoxy zemin görselleştiriliyor...</p>
                    <div className="mt-2 w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ffbf00] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {styleDescription && (
              <div className="mt-6 p-4 bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 rounded-lg border border-gray-700">
                <p className="text-center font-medium text-white">{styleDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
