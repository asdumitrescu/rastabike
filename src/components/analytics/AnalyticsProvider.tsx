'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
    trackPageView,
    trackScrollDepth,
    trackClick,
    endSession,
} from '@/lib/analytics/tracker';

export default function AnalyticsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const locale = useLocale();
    const lastPathRef = useRef('');

    // Track page views
    useEffect(() => {
        if (pathname !== lastPathRef.current) {
            trackPageView(pathname, locale);
            lastPathRef.current = pathname;
        }
    }, [pathname, locale]);

    // Track scroll depth
    useEffect(() => {
        let maxDepth = 0;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const depth = Math.round((scrollTop / docHeight) * 100);
            if (depth > maxDepth) {
                maxDepth = depth;
                trackScrollDepth(pathname, depth);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Track clicks on elements with data-track attribute
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackElement = target.closest('[data-track]') || target.closest('[id]');

            if (trackElement) {
                const id = trackElement.getAttribute('id') || trackElement.getAttribute('data-track') || 'unknown';
                const category = trackElement.getAttribute('data-track-category') || 'interaction';
                const label = trackElement.getAttribute('data-track-label') || trackElement.textContent?.slice(0, 50) || '';
                trackClick(id, category, label);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // End session on page unload
    useEffect(() => {
        const handleUnload = () => endSession();
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    return <>{children}</>;
}
