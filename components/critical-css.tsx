'use client';

import { useEffect } from 'react';

interface CriticalCSSProps {
  criticalCSS: string;
  nonCriticalCSS: string[];
}

export function CriticalCSS({ criticalCSS, nonCriticalCSS }: CriticalCSSProps) {
  useEffect(() => {
    // Inline critical CSS immediately
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    // Load non-critical CSS asynchronously
    nonCriticalCSS.forEach(cssUrl => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssUrl;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    });
  }, [criticalCSS, nonCriticalCSS]);

  return null;
}

// Preload critical CSS
export function PreloadCriticalCSS() {
  return (
    <>
      <link
        rel="preload"
        href="/critical.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/critical.css" />
      </noscript>
    </>
  );
}

// Defer non-critical CSS
export function DeferNonCriticalCSS() {
  return (
    <>
      <link
        rel="preload"
        href="/non-critical.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/non-critical.css" />
      </noscript>
    </>
  );
}
