"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Copy, Download, RotateCcw, Upload, Wand2 } from "lucide-react"
import { visualizeEpoxyFloor } from "@/app/ai/flows/visualize-epoxy-floow"
import { processEpoxyImage } from "@/utils/epoxy-image-processor"

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
  const [compareValue, setCompareValue] = useState<number>(50)
  const [viewMode, setViewMode] = useState<"compare" | "split">("compare")
  const { toast } = useToast()

  // objectURL cleanup
  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview)
    }
  }, [photoPreview])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev)
        return URL.createObjectURL(file)
      })

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResultImage(null)
      setStyleDescription("")
      setCompareValue(50)
    }
  }

  const handleReset = () => {
    setPhotoFile(null)
    setPhotoPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev)
      return null
    })
    setPhotoDataUri("")
    setEpoxyStyle("")
    setColorScheme("")
    setResultImage(null)
    setStyleDescription("")
    setCompareValue(50)
    setViewMode("compare")
  }

  const canCompare = useMemo(() => Boolean(photoPreview && resultImage), [photoPreview, resultImage])

  const handleDownload = () => {
    if (!resultImage) return
    try {
      const a = document.createElement("a")
      a.href = resultImage
      a.download = `epoxy-gorsellestirme-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      a.remove()
      toast({ title: "İndiriliyor", description: "Görsel cihazınıza indiriliyor." })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "İndirme Başarısız",
        description: "Görsel indirilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    }
  }

  const handleCopyDescription = async () => {
    if (!styleDescription) return
    try {
      await navigator.clipboard.writeText(styleDescription)
      toast({ title: "Kopyalandı", description: "Açıklama panoya kopyalandı." })
    } catch (error) {
      console.error("Clipboard error:", error)
      toast({
        title: "Kopyalama Başarısız",
        description: "Panoya kopyalanamadı. Tarayıcı izinlerini kontrol edin.",
        variant: "destructive",
      })
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
      // Önce AI'dan açıklama al
      const result = await visualizeEpoxyFloor({
        photoDataUri,
        epoxyStyle,
        ...(colorScheme && { colorScheme }),
      })

      if (!result.styleDescription) {
        throw new Error('Açıklama oluşturulamadı.')
      }

      // Client-side'da görseli işle
      const processedImage = await processEpoxyImage(
        photoDataUri,
        epoxyStyle,
        colorScheme || undefined
      )

      setResultImage(processedImage)
      setStyleDescription(result.styleDescription)
    } catch (error) {
      console.error("Görselleştirme başarısız:", error)
      
      // Extract error message
      let errorMessage = "Epoxy zemin görselleştirilemedi. Lütfen başka bir fotoğraf veya stil deneyin."
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage
      }
      
      toast({
        title: "Görselleştirme Başarısız",
        description: errorMessage,
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

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setViewMode((m) => (m === "compare" ? "split" : "compare"))}
                    disabled={!canCompare}
                    className="bg-transparent border-gray-600 text-white hover:bg-white/10 disabled:opacity-40"
                  >
                    {viewMode === "compare" ? "Yan Yana" : "Karşılaştır"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="bg-transparent border-gray-600 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Sıfırla
                  </Button>
                </div>
              </div>

              <div className="relative w-full bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 rounded-lg flex flex-col items-center justify-center p-4 border border-gray-700">
                {!photoPreview ? (
                  <div className="text-center text-gray-400 py-12">
                    <Upload className="mx-auto h-12 w-12 mb-2 text-[#ffbf00]" />
                    <p className="font-medium">Mekan fotoğrafınız burada görünecek</p>
                    <p className="text-sm text-gray-500 mt-1">Önce fotoğraf yükleyin, sonra stil seçip görselleştirin.</p>
                  </div>
                ) : canCompare && viewMode === "compare" ? (
                  <div className="w-full">
                    <div className="relative w-full min-h-[340px] md:min-h-[420px] bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg border border-gray-700">
                      <Image
                        src={photoPreview || "/placeholder.svg"}
                        alt="Orijinal Mekan"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: `inset(0 ${100 - compareValue}% 0 0)`,
                        }}
                      >
                        <Image
                          src={resultImage || "/placeholder.svg"}
                          alt={styleDescription || "Görselleştirilmiş Epoxy Zemin"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* Divider */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-[#ffbf00] shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
                        style={{ left: `${compareValue}%` }}
                      />

                      {/* Labels */}
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-2 text-xs rounded-md border border-gray-600">
                        Orijinal
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-2 text-xs rounded-md border border-gray-600">
                        Epoxy
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                        <span>Orijinal</span>
                        <span>Karşılaştır</span>
                        <span>Epoxy</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={compareValue}
                        onChange={(e) => setCompareValue(Number(e.target.value))}
                        className="w-full accent-[#ffbf00]"
                        aria-label="Önce/Sonra karşılaştırma"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full w-full">
                    <div className="relative h-full min-h-[300px] bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg border border-gray-700">
                      <Image
                        src={photoPreview || "/placeholder.svg"}
                        alt="Orijinal Mekan"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-2 text-sm rounded-md font-medium border border-gray-600">
                        Orijinal Mekan
                      </div>
                    </div>

                    <div className="relative h-full min-h-[300px] bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg border border-gray-700">
                      {resultImage ? (
                        <Image
                          src={resultImage || "/placeholder.svg"}
                          alt={styleDescription || "Görselleştirilmiş Epoxy Zemin"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <p className="text-sm">Sonuç burada görünecek</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="absolute inset-0 bg-[#1a1a1a]/95 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                    <Wand2 className="h-12 w-12 animate-pulse text-[#ffbf00] mb-2" />
                    <p className="mt-4 text-lg font-medium text-white">Epoxy zemin görselleştiriliyor...</p>
                    <div className="mt-2 w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ffbf00] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}

                <div className="mt-4 w-full flex flex-wrap gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyDescription}
                    disabled={!styleDescription}
                    className="bg-transparent border-gray-600 text-white hover:bg-white/10 disabled:opacity-40"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Açıklamayı Kopyala
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDownload}
                    disabled={!resultImage}
                    className="bg-transparent border-gray-600 text-white hover:bg-white/10 disabled:opacity-40"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Görseli İndir
                  </Button>
                </div>
              </div>
            </div>

            {styleDescription && (
              <div className="mt-6 p-4 bg-gradient-to-br px-5 py-6 from-gray-900 to-gray-800 rounded-lg border border-gray-700">
                <p className="text-center text-sm md:text-base font-medium text-white leading-relaxed">
                  {styleDescription.length > 200 
                    ? styleDescription.substring(0, 197) + '...' 
                    : styleDescription}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
