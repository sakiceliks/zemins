"use client"
import { Button } from "@/components/ui/button"
import { PhoneIcon as Whatsapp, Pencil, Paintbrush } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="absolute py-2 bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-4 p-3">
      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
        <Whatsapp className="h-3 w-3" />
        Whatsapp
      </Button>
      <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
        <Pencil className="h-3 w-3" />
        Teklif Al
      </Button>
      <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
        <Paintbrush className="h-3 w-3" />
        Kartela
      </Button>
    </div>
  )
}