'use client';

import { useEffect, useState } from 'react';

interface CSSOptimizerProps {
  criticalCSSPath?: string;
  nonCriticalCSSPaths?: string[];
}

export function CSSOptimizer({ 
  criticalCSSPath = '/critical.css',
  nonCriticalCSSPaths = ['/non-critical.css']
}: CSSOptimizerProps) {
  const [criticalCSS, setCriticalCSS] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load critical CSS immediately
    fetch(criticalCSSPath)
      .then(response => response.text())
      .then(css => {
        setCriticalCSS(css);
        setIsLoaded(true);
        
        // Inline critical CSS
        const style = document.createElement('style');
        style.textContent = css;
        style.setAttribute('data-critical', 'true');
        document.head.appendChild(style);
      })
      .catch(error => {
        console.warn('Failed to load critical CSS:', error);
        setIsLoaded(true);
      });

    // Load non-critical CSS asynchronously (only if file exists)
    nonCriticalCSSPaths.forEach(cssPath => {
      // Check if file exists before trying to load
      fetch(cssPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.media = 'print';
            link.onload = () => {
              link.media = 'all';
            };
            link.onerror = () => {
              console.warn(`Failed to load non-critical CSS: ${cssPath}`);
            };
            document.head.appendChild(link);
          }
        })
        .catch(() => {
          // Silently ignore if file doesn't exist
        });
    });
  }, [criticalCSSPath, nonCriticalCSSPaths]);

  // Preload critical CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = criticalCSSPath;
    link.as = 'style';
    link.onload = () => {
      link.onload = null;
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }, [criticalCSSPath]);

  return null;
}

// Alternative: Inline critical CSS directly in HTML
export function InlineCriticalCSS({ css }: { css: string }) {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: css }}
      data-critical="true"
    />
  );
}

// Preload CSS files
export function PreloadCSS({ paths }: { paths: string[] }) {
  return (
    <>
      {paths.map((path, index) => (
        <link
          key={index}
          rel="preload"
          href={path}
          as="style"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.onload = null;
            target.rel = 'stylesheet';
          }}
        />
      ))}
    </>
  );
}
