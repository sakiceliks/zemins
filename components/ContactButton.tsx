'use client'

import { Button } from '@/components/ui/button'
import { Phone, MessageCircle } from 'lucide-react'
import { trackUmamiContactClick } from './UmamiAnalytics'

interface ContactButtonProps {
  type: 'phone' | 'whatsapp'
  phoneNumber?: string
  message?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
  trackingLabel?: string // Event tracking için özel label
  onClick?: () => void // Optional onClick handler
}

export default function ContactButton({
  type,
  phoneNumber = '905312812958', // +90 (531) 281 29 58
  message = 'Merhaba, size nasıl yardımcı olabilirim?',
  variant = 'default',
  size = 'default',
  className = '',
  children,
  showIcon = true,
  trackingLabel,
  onClick
}: ContactButtonProps) {
  
  // Google Analytics Event Tracking Function
  const trackContactClick = (contactType: 'phone' | 'whatsapp', label?: string) => {
    if (typeof window !== 'undefined') {
      // GA4 Event Tracking
      if (window.gtag) {
        window.gtag('event', 'contact_click', {
          event_category: 'Contact',
          event_label: label || `${contactType}_${trackingLabel || phoneNumber}`,
          contact_type: contactType,
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title,
          value: 1
        })
      }
      
      // Data Layer için (GTM kullanılıyorsa)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_click',
          event_category: 'Contact',
          event_label: label || `${contactType}_${trackingLabel || phoneNumber}`,
          contact_type: contactType,
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title
        })
      }
      
      // Umami Analytics Event Tracking
      trackUmamiContactClick(contactType, phoneNumber, label || trackingLabel)
      
      // Console log (development için)
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact Button Click Tracked:', {
          contact_type: contactType,
          label: label || `${contactType}_${trackingLabel || phoneNumber}`,
          phone_number: phoneNumber
        })
      }
    }
  }

  const handlePhoneClick = () => {
    trackContactClick('phone', trackingLabel)
    window.open(`tel:+${phoneNumber}`, '_self')
  }

  const handleWhatsAppClick = () => {
    trackContactClick('whatsapp', trackingLabel)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    if (type === 'phone') {
      handlePhoneClick()
    } else {
      handleWhatsAppClick()
    }
  }

  const getButtonContent = () => {
    if (children) return children

    if (type === 'phone') {
      return (
        <>
          {showIcon && <Phone className="mr-2 h-4 w-4" />}
          Hemen Ara: {phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4')}
        </>
      )
    } else {
      return (
        <>
          {showIcon && <MessageCircle className="mr-2 h-4 w-4" />}
          WhatsApp İletişim
        </>
      )
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      {getButtonContent()}
    </Button>
  )
}

// WhatsApp için özel floating button component
export function WhatsAppFloatingButton({
  phoneNumber = '905312812958',
  message = 'Merhaba, size nasıl yardımcı olabilirim?',
  className = '',
  trackingLabel
}: {
  phoneNumber?: string
  message?: string
  className?: string
  trackingLabel?: string
}) {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      // GA4 Event Tracking
      if (window.gtag) {
        window.gtag('event', 'contact_click', {
          event_category: 'Contact',
          event_label: trackingLabel || `whatsapp_floating_${phoneNumber}`,
          contact_type: 'whatsapp',
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title,
          value: 1
        })
      }
      
      // Data Layer için (GTM kullanılıyorsa)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_click',
          event_category: 'Contact',
          event_label: trackingLabel || `whatsapp_floating_${phoneNumber}`,
          contact_type: 'whatsapp',
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title
        })
      }
      
      // Umami Analytics Event Tracking
      trackUmamiContactClick('whatsapp', phoneNumber, trackingLabel || `whatsapp_floating_${phoneNumber}`)
      
      // Console log (development için)
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact Button Click Tracked:', {
          contact_type: 'whatsapp',
          label: trackingLabel || `whatsapp_floating_${phoneNumber}`,
          phone_number: phoneNumber
        })
      }
    }
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 ${className || 'bottom-6 right-6'}`}
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}

// Telefon için özel floating button component
export function PhoneFloatingButton({
  phoneNumber = '905312812958',
  className = '',
  trackingLabel
}: {
  phoneNumber?: string
  className?: string
  trackingLabel?: string
}) {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined') {
      // GA4 Event Tracking
      if (window.gtag) {
        window.gtag('event', 'contact_click', {
          event_category: 'Contact',
          event_label: trackingLabel || `phone_floating_${phoneNumber}`,
          contact_type: 'phone',
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title,
          value: 1
        })
      }
      
      // Data Layer için (GTM kullanılıyorsa)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_click',
          event_category: 'Contact',
          event_label: trackingLabel || `phone_floating_${phoneNumber}`,
          contact_type: 'phone',
          phone_number: phoneNumber,
          page_location: window.location.href,
          page_title: document.title
        })
      }
      
      // Umami Analytics Event Tracking
      trackUmamiContactClick('phone', phoneNumber, trackingLabel || `phone_floating_${phoneNumber}`)
      
      // Console log (development için)
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact Button Click Tracked:', {
          contact_type: 'phone',
          label: trackingLabel || `phone_floating_${phoneNumber}`,
          phone_number: phoneNumber
        })
      }
    }
    
    window.open(`tel:+${phoneNumber}`, '_self')
  }

  return (
    <button
      onClick={handlePhoneClick}
      className={`fixed z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 ${className || 'bottom-6 right-20'}`}
      aria-label="Telefon ile iletişime geç"
    >
      <Phone className="h-6 w-6" />
    </button>
  )
}

// TypeScript declarations
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config',
      action: string,
      parameters?: {
        event_category?: string
        event_label?: string
        contact_type?: string
        phone_number?: string
        page_location?: string
        page_title?: string
        value?: number
        [key: string]: any
      }
    ) => void
    dataLayer?: any[]
  }
}

