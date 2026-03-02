'use client';

import { useState, useEffect } from 'react';
import {
    getPageViewStats,
    getSessionStats,
    getLast7Days,
    getLast30Days,
    type DateRange,
} from '@/lib/analytics/aggregator';
import styles from './page.module.css';

export default function AdminDashboardPage() {
    const [range, setRange] = useState<'7d' | '30d' | 'all'>('30d');
    const [pageStats, setPageStats] = useState({ totalViews: 0, uniqueVisitors: 0, topPages: [] as any[], viewsByDay: [] as any[] });
    const [sessionStats, setSessionStats] = useState({ totalSessions: 0, avgDuration: 0, bounceRate: 0, avgPagesPerSession: 0 });

    useEffect(() => {
        const dateRange: DateRange | undefined =
            range === '7d' ? getLast7Days() : range === '30d' ? getLast30Days() : undefined;

        setPageStats(getPageViewStats(dateRange));
        setSessionStats(getSessionStats(dateRange));
    }, [range]);

    const kpis = [
        { label: 'Total Page Views', value: pageStats.totalViews, icon: '👁️', color: 'var(--rasta-green)' },
        { label: 'Unique Visitors', value: pageStats.uniqueVisitors, icon: '👤', color: 'var(--beach-ocean)' },
        { label: 'Total Sessions', value: sessionStats.totalSessions, icon: '📊', color: 'var(--rasta-gold)' },
        { label: 'Bounce Rate', value: `${sessionStats.bounceRate}%`, icon: '📉', color: 'var(--rasta-red)' },
        { label: 'Avg Duration', value: `${sessionStats.avgDuration}s`, icon: '⏱️', color: 'var(--beach-sunset)' },
        { label: 'Pages/Session', value: sessionStats.avgPagesPerSession, icon: '📄', color: 'var(--beach-palm)' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard Overview</h1>
                <div className={styles.rangeSelector}>
                    {(['7d', '30d', 'all'] as const).map((r) => (
                        <button
                            key={r}
                            className={`${styles.rangeBtn} ${range === r ? styles.rangeBtnActive : ''}`}
                            onClick={() => setRange(r)}
                        >
                            {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'All Time'}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                {kpis.map((kpi) => (
                    <div key={kpi.label} className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: `${kpi.color}15` }}>
                            {kpi.icon}
                        </div>
                        <div>
                            <p className={styles.kpiValue}>{kpi.value}</p>
                            <p className={styles.kpiLabel}>{kpi.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={styles.chartsRow}>
                {/* Views by Day - Bar Chart */}
                <div className={styles.chartCard}>
                    <h3>Page Views Over Time</h3>
                    <div className={styles.barChart}>
                        {pageStats.viewsByDay.length > 0 ? (
                            pageStats.viewsByDay.slice(-14).map((day) => {
                                const max = Math.max(...pageStats.viewsByDay.map((d) => d.views));
                                const height = max > 0 ? (day.views / max) * 100 : 0;
                                return (
                                    <div key={day.date} className={styles.barWrapper}>
                                        <div
                                            className={styles.bar}
                                            style={{ height: `${Math.max(height, 4)}%` }}
                                            title={`${day.date}: ${day.views} views`}
                                        />
                                        <span className={styles.barLabel}>
                                            {day.date.slice(5)}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.emptyChart}>
                                <p>📊 No data yet</p>
                                <p className={styles.emptyHint}>Visit the site to generate analytics data</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Pages */}
                <div className={styles.chartCard}>
                    <h3>Top Pages</h3>
                    <div className={styles.topPages}>
                        {pageStats.topPages.length > 0 ? (
                            pageStats.topPages.slice(0, 8).map((page, i) => {
                                const max = pageStats.topPages[0]?.views || 1;
                                const width = (page.views / max) * 100;
                                return (
                                    <div key={page.page} className={styles.topPageItem}>
                                        <span className={styles.topPageRank}>#{i + 1}</span>
                                        <span className={styles.topPageName}>{page.page}</span>
                                        <div className={styles.topPageBar}>
                                            <div
                                                className={styles.topPageFill}
                                                style={{ width: `${width}%` }}
                                            />
                                        </div>
                                        <span className={styles.topPageCount}>{page.views}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.emptyChart}>
                                <p>📄 No page data yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
