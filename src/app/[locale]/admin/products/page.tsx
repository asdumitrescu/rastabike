'use client';

import { useState, useEffect } from 'react';
import { getProductStats, exportData, type ProductStats } from '@/lib/analytics/aggregator';
import { products as allProducts } from '@/data/products';
import styles from './page.module.css';

export default function AdminProductsPage() {
    const [stats, setStats] = useState<ProductStats[]>([]);
    const [sortBy, setSortBy] = useState<'interestScore' | 'views' | 'totalClicks' | 'avgTimeOnProduct'>('interestScore');

    useEffect(() => {
        setStats(getProductStats());
    }, []);

    const sorted = [...stats].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

    // Merge with product names
    const enriched = sorted.map((s) => {
        const product = allProducts.find((p) => p.id === s.productId);
        return { ...s, name: product?.name.en || s.productId };
    });

    // If no analytics data, show all products with zero stats
    const displayData = enriched.length > 0 ? enriched : allProducts.map((p) => ({
        productId: p.id,
        name: p.name.en,
        views: 0,
        totalClicks: 0,
        avgTimeOnProduct: 0,
        interestScore: 0,
    }));

    const handleExport = (format: 'json' | 'csv') => {
        const data = exportData(format);
        const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rastabike-analytics.${format}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.productsPage}>
            <div className={styles.header}>
                <h1>Product Analytics</h1>
                <div className={styles.actions}>
                    <button onClick={() => handleExport('json')} className={styles.exportBtn} id="export-json">
                        📥 Export JSON
                    </button>
                    <button onClick={() => handleExport('csv')} className={styles.exportBtn} id="export-csv">
                        📥 Export CSV
                    </button>
                </div>
            </div>

            {/* Sort controls */}
            <div className={styles.sortBar}>
                <span>Sort by:</span>
                {[
                    { key: 'interestScore', label: 'Interest Score' },
                    { key: 'views', label: 'Views' },
                    { key: 'totalClicks', label: 'Clicks' },
                    { key: 'avgTimeOnProduct', label: 'Avg Time' },
                ].map((s) => (
                    <button
                        key={s.key}
                        className={`${styles.sortBtn} ${sortBy === s.key ? styles.sortBtnActive : ''}`}
                        onClick={() => setSortBy(s.key as any)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Products Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Views</th>
                            <th>Clicks</th>
                            <th>Avg Time</th>
                            <th>Interest Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((item, i) => (
                            <tr key={item.productId}>
                                <td className={styles.rank}>{i + 1}</td>
                                <td className={styles.productName}>{item.name}</td>
                                <td>{item.views}</td>
                                <td>{item.totalClicks}</td>
                                <td>{item.avgTimeOnProduct}s</td>
                                <td>
                                    <div className={styles.scoreWrapper}>
                                        <div
                                            className={styles.scoreBar}
                                            style={{
                                                width: `${Math.min((item.interestScore / (displayData[0]?.interestScore || 1)) * 100, 100)}%`,
                                            }}
                                        />
                                        <span>{item.interestScore}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
