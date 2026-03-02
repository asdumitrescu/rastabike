/* Analytics Aggregator - Data processing and export utilities */

import {
    getRawPageViews,
    getRawClicks,
    getRawScrolls,
    getRawProductViews,
    getRawSessions,
    type PageViewEvent,
    type ClickEvent,
    type ProductViewEvent,
    type SessionData,
} from './tracker';

export interface DateRange {
    start: number;
    end: number;
}

export interface PageViewStats {
    totalViews: number;
    uniqueVisitors: number;
    topPages: { page: string; views: number }[];
    viewsByDay: { date: string; views: number }[];
}

export interface ProductStats {
    productId: string;
    views: number;
    totalClicks: number;
    avgTimeOnProduct: number;
    interestScore: number;
}

export interface SessionStats {
    totalSessions: number;
    avgDuration: number;
    bounceRate: number;
    avgPagesPerSession: number;
}

export interface BehaviorFlow {
    path: string[];
    count: number;
}

// Helper: filter by date range
function withinRange(timestamp: number, range?: DateRange): boolean {
    if (!range) return true;
    return timestamp >= range.start && timestamp <= range.end;
}

// Helper: date string from timestamp
function toDateStr(ts: number): string {
    return new Date(ts).toISOString().split('T')[0];
}

// ============ Page View Stats ============

export function getPageViewStats(range?: DateRange): PageViewStats {
    const views = getRawPageViews().filter((v) => withinRange(v.timestamp, range));

    const uniqueSessions = new Set(views.map((v) => v.sessionId));

    // Top pages
    const pageCounts = new Map<string, number>();
    views.forEach((v) => {
        pageCounts.set(v.page, (pageCounts.get(v.page) || 0) + 1);
    });
    const topPages = Array.from(pageCounts.entries())
        .map(([page, count]) => ({ page, views: count }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    // Views by day
    const dayCounts = new Map<string, number>();
    views.forEach((v) => {
        const day = toDateStr(v.timestamp);
        dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
    });
    const viewsByDay = Array.from(dayCounts.entries())
        .map(([date, count]) => ({ date, views: count }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return {
        totalViews: views.length,
        uniqueVisitors: uniqueSessions.size,
        topPages,
        viewsByDay,
    };
}

// ============ Product Stats ============

export function getProductStats(): ProductStats[] {
    const productViews = getRawProductViews();
    const clicks = getRawClicks();

    // Group by product
    const productMap = new Map<string, { views: number; totalTime: number; clicks: number }>();

    productViews.forEach((pv) => {
        const existing = productMap.get(pv.productId) || { views: 0, totalTime: 0, clicks: 0 };
        existing.views += 1;
        existing.totalTime += pv.duration || 0;
        productMap.set(pv.productId, existing);
    });

    // Count product-related clicks
    clicks
        .filter((c) => c.category === 'product')
        .forEach((c) => {
            const productId = c.label;
            const existing = productMap.get(productId) || { views: 0, totalTime: 0, clicks: 0 };
            existing.clicks += 1;
            productMap.set(productId, existing);
        });

    return Array.from(productMap.entries())
        .map(([productId, data]) => {
            const avgTime = data.views > 0 ? data.totalTime / data.views : 0;
            // Interest score: weighted combination of views, clicks, and time spent
            const interestScore = Math.round(
                data.views * 1 + data.clicks * 2 + (avgTime / 1000) * 0.5
            );
            return {
                productId,
                views: data.views,
                totalClicks: data.clicks,
                avgTimeOnProduct: Math.round(avgTime / 1000), // seconds
                interestScore,
            };
        })
        .sort((a, b) => b.interestScore - a.interestScore);
}

// ============ Session Stats ============

export function getSessionStats(range?: DateRange): SessionStats {
    const sessions = getRawSessions().filter((s) => withinRange(s.startTime, range));

    if (sessions.length === 0) {
        return { totalSessions: 0, avgDuration: 0, bounceRate: 0, avgPagesPerSession: 0 };
    }

    const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    const avgDuration = Math.round(totalDuration / sessions.length / 1000); // seconds

    const bounces = sessions.filter((s) => s.pageCount <= 1).length;
    const bounceRate = Math.round((bounces / sessions.length) * 100);

    const totalPages = sessions.reduce((sum, s) => sum + s.pageCount, 0);
    const avgPagesPerSession = Math.round((totalPages / sessions.length) * 10) / 10;

    return {
        totalSessions: sessions.length,
        avgDuration,
        bounceRate,
        avgPagesPerSession,
    };
}

// ============ Behavior Flow ============

export function getBehaviorFlow(): BehaviorFlow[] {
    const sessions = getRawSessions();

    const pathCounts = new Map<string, number>();
    sessions.forEach((s) => {
        if (s.pages.length < 2) return;
        const pathKey = s.pages.slice(0, 4).join(' → ');
        pathCounts.set(pathKey, (pathCounts.get(pathKey) || 0) + 1);
    });

    return Array.from(pathCounts.entries())
        .map(([path, count]) => ({ path: path.split(' → '), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
}

// ============ Click Heatmap Data ============

export function getClickHeatmapData(): { elementId: string; page: string; count: number }[] {
    const clicks = getRawClicks();

    const clickMap = new Map<string, { page: string; count: number }>();
    clicks.forEach((c) => {
        const key = `${c.page}::${c.elementId}`;
        const existing = clickMap.get(key) || { page: c.page, count: 0 };
        existing.count += 1;
        clickMap.set(key, existing);
    });

    return Array.from(clickMap.entries())
        .map(([key, data]) => ({
            elementId: key.split('::')[1],
            page: data.page,
            count: data.count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 50);
}

// ============ Scroll Depth Stats ============

export function getScrollDepthStats(): { page: string; avgDepth: number }[] {
    const scrolls = getRawScrolls();

    const pageScrolls = new Map<string, number[]>();
    scrolls.forEach((s) => {
        const existing = pageScrolls.get(s.page) || [];
        existing.push(s.depth);
        pageScrolls.set(s.page, existing);
    });

    return Array.from(pageScrolls.entries())
        .map(([page, depths]) => ({
            page,
            avgDepth: Math.round(depths.reduce((a, b) => Math.max(a, b), 0)),
        }))
        .sort((a, b) => b.avgDepth - a.avgDepth);
}

// ============ Export ============

export function exportData(format: 'json' | 'csv'): string {
    const data = {
        pageViews: getRawPageViews(),
        clicks: getRawClicks(),
        scrolls: getRawScrolls(),
        productViews: getRawProductViews(),
        sessions: getRawSessions(),
        exportedAt: new Date().toISOString(),
    };

    if (format === 'json') {
        return JSON.stringify(data, null, 2);
    }

    // CSV: flatten all events into rows
    const rows: string[] = ['type,timestamp,page,detail1,detail2,sessionId'];

    data.pageViews.forEach((pv) => {
        rows.push(`pageview,${pv.timestamp},${pv.page},${pv.locale},${pv.referrer},${pv.sessionId}`);
    });

    data.clicks.forEach((c) => {
        rows.push(`click,${c.timestamp},${c.page},${c.elementId},${c.category},${c.sessionId}`);
    });

    data.productViews.forEach((pv) => {
        rows.push(`product_view,${pv.startTime},,${pv.productId},${pv.duration || 0},${pv.sessionId}`);
    });

    data.sessions.forEach((s) => {
        rows.push(`session,${s.startTime},,${s.pageCount},${s.duration || 0},${s.id}`);
    });

    return rows.join('\n');
}

// ============ Date Range Helpers ============

export function getLast7Days(): DateRange {
    return {
        start: Date.now() - 7 * 24 * 60 * 60 * 1000,
        end: Date.now(),
    };
}

export function getLast30Days(): DateRange {
    return {
        start: Date.now() - 30 * 24 * 60 * 60 * 1000,
        end: Date.now(),
    };
}
