'use client';

import { useState, useEffect } from 'react';
import {
    getBehaviorFlow,
    getClickHeatmapData,
    getScrollDepthStats,
    getSessionStats,
} from '@/lib/analytics/aggregator';
import styles from './page.module.css';

export default function AdminBehaviorPage() {
    const [flow, setFlow] = useState<ReturnType<typeof getBehaviorFlow>>([]);
    const [clicks, setClicks] = useState<ReturnType<typeof getClickHeatmapData>>([]);
    const [scrolls, setScrolls] = useState<ReturnType<typeof getScrollDepthStats>>([]);
    const [sessions, setSessions] = useState({ totalSessions: 0, avgDuration: 0, bounceRate: 0, avgPagesPerSession: 0 });

    useEffect(() => {
        setFlow(getBehaviorFlow());
        setClicks(getClickHeatmapData());
        setScrolls(getScrollDepthStats());
        setSessions(getSessionStats());
    }, []);

    return (
        <div className={styles.behaviorPage}>
            <h1>Customer Behavior</h1>

            {/* Journey Flows */}
            <div className={styles.section}>
                <h2>Common Navigation Paths</h2>
                <div className={styles.card}>
                    {flow.length > 0 ? (
                        <div className={styles.flowList}>
                            {flow.map((f, i) => (
                                <div key={i} className={styles.flowItem}>
                                    <span className={styles.flowCount}>{f.count}×</span>
                                    <div className={styles.flowPath}>
                                        {f.path.map((step, j) => (
                                            <span key={j}>
                                                <span className={styles.flowStep}>{step}</span>
                                                {j < f.path.length - 1 && (
                                                    <span className={styles.flowArrow}>→</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <p>🧭 No navigation data yet</p>
                            <p className={styles.emptyHint}>
                                Browse the site to generate user journey data
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Depth */}
            <div className={styles.section}>
                <h2>Scroll Depth by Page</h2>
                <div className={styles.card}>
                    {scrolls.length > 0 ? (
                        <div className={styles.scrollList}>
                            {scrolls.map((s) => (
                                <div key={s.page} className={styles.scrollItem}>
                                    <span className={styles.scrollPage}>{s.page}</span>
                                    <div className={styles.scrollBar}>
                                        <div
                                            className={styles.scrollFill}
                                            style={{ width: `${s.avgDepth}%` }}
                                        />
                                    </div>
                                    <span className={styles.scrollValue}>{s.avgDepth}%</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <p>📜 No scroll data yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Click Heatmap Table */}
            <div className={styles.section}>
                <h2>Most Clicked Elements</h2>
                <div className={styles.card}>
                    {clicks.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Element</th>
                                    <th>Page</th>
                                    <th>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clicks.slice(0, 20).map((c, i) => (
                                    <tr key={i}>
                                        <td className={styles.elementId}>{c.elementId}</td>
                                        <td>{c.page}</td>
                                        <td className={styles.clickCount}>{c.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.empty}>
                            <p>🖱️ No click data yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Session summary */}
            <div className={styles.section}>
                <h2>Session Summary</h2>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryIcon}>📊</span>
                        <p className={styles.summaryValue}>{sessions.totalSessions}</p>
                        <p className={styles.summaryLabel}>Total Sessions</p>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryIcon}>⏱️</span>
                        <p className={styles.summaryValue}>{sessions.avgDuration}s</p>
                        <p className={styles.summaryLabel}>Avg Duration</p>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryIcon}>📉</span>
                        <p className={styles.summaryValue}>{sessions.bounceRate}%</p>
                        <p className={styles.summaryLabel}>Bounce Rate</p>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryIcon}>📄</span>
                        <p className={styles.summaryValue}>{sessions.avgPagesPerSession}</p>
                        <p className={styles.summaryLabel}>Pages/Session</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
