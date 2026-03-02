/* Analytics Tracker - Client-side event tracking system */

const STORAGE_PREFIX = 'rastabike_analytics_';
const DATA_EXPIRY_DAYS = 30;

export interface PageViewEvent {
    page: string;
    locale: string;
    timestamp: number;
    referrer: string;
    sessionId: string;
}

export interface ClickEvent {
    elementId: string;
    category: string;
    label: string;
    page: string;
    timestamp: number;
    sessionId: string;
}

export interface ScrollEvent {
    page: string;
    depth: number; // 25, 50, 75, 100
    timestamp: number;
    sessionId: string;
}

export interface ProductViewEvent {
    productId: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    sessionId: string;
}

export interface SessionData {
    id: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    pageCount: number;
    pages: string[];
    locale: string;
}

// Generate session ID
function generateSessionId(): string {
    return `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Get or create session
function getOrCreateSession(): SessionData {
    if (typeof window === 'undefined') {
        return { id: '', startTime: 0, pageCount: 0, pages: [], locale: 'en' };
    }

    const existing = sessionStorage.getItem(`${STORAGE_PREFIX}current_session`);
    if (existing) {
        return JSON.parse(existing);
    }

    const session: SessionData = {
        id: generateSessionId(),
        startTime: Date.now(),
        pageCount: 0,
        pages: [],
        locale: document.documentElement.lang || 'en',
    };

    sessionStorage.setItem(`${STORAGE_PREFIX}current_session`, JSON.stringify(session));
    return session;
}

function updateSession(updates: Partial<SessionData>): void {
    if (typeof window === 'undefined') return;
    const session = getOrCreateSession();
    const updated = { ...session, ...updates };
    sessionStorage.setItem(`${STORAGE_PREFIX}current_session`, JSON.stringify(updated));
}

// Store event data in localStorage
function storeEvent<T>(key: string, event: T): void {
    if (typeof window === 'undefined') return;

    try {
        const existing = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        const events: T[] = existing ? JSON.parse(existing) : [];
        events.push(event);

        // Clean old events (older than DATA_EXPIRY_DAYS)
        const cutoff = Date.now() - DATA_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        const filtered = events.filter((e: any) => {
            const ts = e.timestamp || e.startTime || 0;
            return ts > cutoff;
        });

        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(filtered));
    } catch {
        // localStorage might be full or unavailable
        console.warn('Analytics: Failed to store event');
    }
}

function getEvents<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// ============ Public API ============

export function trackPageView(page: string, locale: string): void {
    const session = getOrCreateSession();

    const event: PageViewEvent = {
        page,
        locale,
        timestamp: Date.now(),
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        sessionId: session.id,
    };

    storeEvent('pageviews', event);

    // Update session
    updateSession({
        pageCount: session.pageCount + 1,
        pages: [...session.pages, page],
    });
}

export function trackClick(elementId: string, category: string, label: string): void {
    const session = getOrCreateSession();
    const page = typeof window !== 'undefined' ? window.location.pathname : '';

    const event: ClickEvent = {
        elementId,
        category,
        label,
        page,
        timestamp: Date.now(),
        sessionId: session.id,
    };

    storeEvent('clicks', event);
}

export function trackScrollDepth(page: string, depth: number): void {
    const session = getOrCreateSession();

    // Only track milestone depths
    const milestone = Math.floor(depth / 25) * 25;
    if (milestone === 0) return;

    // Check if we already tracked this milestone for this page in this session
    const existing = getEvents<ScrollEvent>('scrolls');
    const alreadyTracked = existing.some(
        (e) => e.sessionId === session.id && e.page === page && e.depth === milestone
    );
    if (alreadyTracked) return;

    const event: ScrollEvent = {
        page,
        depth: milestone,
        timestamp: Date.now(),
        sessionId: session.id,
    };

    storeEvent('scrolls', event);
}

// Product view tracking
const productViewTimers: Map<string, number> = new Map();

export function trackProductViewStart(productId: string): void {
    productViewTimers.set(productId, Date.now());
}

export function trackProductViewEnd(productId: string): void {
    const startTime = productViewTimers.get(productId);
    if (!startTime) return;

    const session = getOrCreateSession();
    const endTime = Date.now();

    const event: ProductViewEvent = {
        productId,
        startTime,
        endTime,
        duration: endTime - startTime,
        sessionId: session.id,
    };

    storeEvent('product_views', event);
    productViewTimers.delete(productId);
}

export function endSession(): void {
    if (typeof window === 'undefined') return;

    const session = getOrCreateSession();
    const endTime = Date.now();

    const finalSession: SessionData = {
        ...session,
        endTime,
        duration: endTime - session.startTime,
    };

    storeEvent('sessions', finalSession);
    sessionStorage.removeItem(`${STORAGE_PREFIX}current_session`);
}

// Export raw data access for aggregator
export function getRawPageViews(): PageViewEvent[] {
    return getEvents<PageViewEvent>('pageviews');
}

export function getRawClicks(): ClickEvent[] {
    return getEvents<ClickEvent>('clicks');
}

export function getRawScrolls(): ScrollEvent[] {
    return getEvents<ScrollEvent>('scrolls');
}

export function getRawProductViews(): ProductViewEvent[] {
    return getEvents<ProductViewEvent>('product_views');
}

export function getRawSessions(): SessionData[] {
    return getEvents<SessionData>('sessions');
}

export function clearAllAnalytics(): void {
    if (typeof window === 'undefined') return;
    const keys = ['pageviews', 'clicks', 'scrolls', 'product_views', 'sessions'];
    keys.forEach((key) => localStorage.removeItem(`${STORAGE_PREFIX}${key}`));
}
