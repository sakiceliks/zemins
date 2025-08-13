"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { uploadImage } from "@/lib/supabase"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  label?: string
  folder?: string
  className?: string
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  label = "Görsel", 
  folder = "images",
  className = "" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu 5MB'dan küçük olmalıdır")
      return
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      setError("Sadece resim dosyaları yüklenebilir")
      return
    }

    setUploading(true)
    setError("")

    try {
      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err: any) {
      setError(err.message || "Resim yüklenirken hata oluştu")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    if (onRemove) onRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Yüklenen görsel" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Resim Seç
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF (max. 5MB)
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
