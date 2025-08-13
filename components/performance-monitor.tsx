'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for performance API to be available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime;
            setMetrics(prev => prev ? { ...prev, lcp } : { lcp, fcp: 0, fid: 0, cls: 0, ttfb: 0 });
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Get other metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
        
        setMetrics(prev => prev ? { ...prev, ttfb, fcp } : { lcp: 0, fcp, fid: 0, cls: 0, ttfb });
      }

      return () => observer.disconnect();
    }
  }, []);

  // Show performance info in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceScore = (metric: keyof PerformanceMetrics): string => {
    const value = metrics[metric];
    if (!value) return 'N/A';
    
    switch (metric) {
      case 'fcp':
        return value < 1800 ? '🟢 Good' : value < 3000 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'lcp':
        return value < 2500 ? '🟢 Good' : value < 4000 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'fid':
        return value < 100 ? '🟢 Good' : value < 300 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'cls':
        return value < 0.1 ? '🟢 Good' : value < 0.25 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'ttfb':
        return value < 800 ? '🟢 Good' : value < 1800 ? '🟡 Needs Improvement' : '🔴 Poor';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm z-50">
      <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
        🚀 Performance Metrics
      </h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">FCP:</span>
          <span className="font-mono">{metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}</span>
          <span>{getPerformanceScore('fcp')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">LCP:</span>
          <span className="font-mono">{metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}</span>
          <span>{getPerformanceScore('lcp')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">TTFB:</span>
          <span className="font-mono">{metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}</span>
          <span>{getPerformanceScore('ttfb')}</span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reportPerformance = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          const loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
          
          setMetrics({
            fcp: 0, // Will be updated by PerformanceObserver
            lcp: 0, // Will be updated by PerformanceObserver
            fid: 0, // Will be updated by PerformanceObserver
            cls: 0, // Will be updated by PerformanceObserver
            ttfb
          });
        }
      };

      // Report after page load
      if (document.readyState === 'complete') {
        reportPerformance();
      } else {
        window.addEventListener('load', reportPerformance);
        return () => window.removeEventListener('load', reportPerformance);
      }
    }
  }, []);

  return metrics;
}
