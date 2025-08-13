"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

import { Instagram, Facebook, Twitter, Linkedin, ChevronDown, Menu } from "lucide-react"

import MobileMenu from "./mobile-menu"
import { useEffect, useState } from "react"

export function Navbar({ setIsMenuOpen,services }: { setIsMenuOpen: (open: boolean) => void,services:any }) {


  return (

    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
       <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 md:p-8 min-h-[64px] w-full">
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <h3>ZEMİN USTASI</h3>
          <Sheet onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:flex hidden">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-lg font-semibold hidden lg:block">Menü</span>
              </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-none bg-gray-900">
            <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
            <MobileMenu         services={services} 
 onClose={() => setIsMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      
      <nav className="grid place-items-end h-full w-full">
  <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
  <span className="hidden lg:block text-nowrap">Bizi takip edin</span>
        <SocialLinks />
        {/* <LanguageSelector /> */}
        <Sheet onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-none bg-gray-900">
            <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
            <MobileMenu services={services} onClose={() => setIsMenuOpen(false)} />
          </SheetContent>
        </Sheet>  </div>
</nav>


    </header>
    </div>
   
  )
}

function SocialLinks() {
  return (
    <div className="hidden lg:flex gap-2 sm:gap-3 md:gap-4">
      <Link href="#" aria-label="Instagram" className="flex-shrink-0">
        <Instagram className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-70 transition-opacity" />
      </Link>
      <Link href="#" aria-label="Facebook" className="flex-shrink-0">
        <Facebook className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-70 transition-opacity" />
      </Link>
      <Link href="#" aria-label="Twitter" className="flex-shrink-0">
        <Twitter className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-70 transition-opacity" />
      </Link>
      <Link href="#" aria-label="LinkedIn" className="flex-shrink-0">
        <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-70 transition-opacity" />
      </Link>
    </div>
  )
}

function LanguageSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 mr-5 px-2 sm:px-3 py-1 rounded-full bg-transparent border-white text-white hover:bg-white/10 text-xs sm:text-sm min-w-[50px] sm:min-w-[60px] flex-shrink-0"
        >
          <span className="font-medium">TR</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-gray-800 text-white border-gray-700 min-w-[60px]"
      >
        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer text-xs sm:text-sm justify-center">
          EN
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer text-xs sm:text-sm justify-center">
          DE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}