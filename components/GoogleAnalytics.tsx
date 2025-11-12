'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// ⚠️ ÖNEMLİ: Google Analytics 4 Measurement ID'nizi buraya ekleyin
const GA_TRACKING_ID = 'G-XXXXXXXXXX';

// Page view tracking function
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Event tracking function
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Analytics tracker component that uses useSearchParams
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    if (typeof window.gtag !== 'undefined') {
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

// Main component
export default function GoogleAnalytics() {
  return (
    <>
      {/* Load the main gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      {/* Initialize dataLayer and gtag config */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
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
        page_path?: string
        value?: number
        [key: string]: any
      }
    ) => void;
    dataLayer: any[];
  }
}

