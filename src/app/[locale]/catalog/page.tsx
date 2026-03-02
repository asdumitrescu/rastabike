'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card, { CardImage, CardBody, CardTitle, CardText } from '@/components/ui/Card';
import { products, Product } from '@/data/products';
import type { Locale } from '@/i18n/routing';
import styles from './page.module.css';

type FilterType = 'all' | Product['type'];

export default function CatalogPage() {
    const t = useTranslations('catalog');
    const locale = useLocale() as Locale;
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: t('filterAll') },
        { key: 'mountain', label: t('filterMountain') },
        { key: 'city', label: t('filterCity') },
        { key: 'fat-tire', label: t('filterFatTire') },
        { key: 'folding', label: t('filterFolding') },
    ];

    const filtered =
        activeFilter === 'all'
            ? products
            : products.filter((p) => p.type === activeFilter);

    return (
        <>
            <Navbar />
            <main className={styles.catalog}>
                <section className={styles.header}>
                    <div className="container">
                        <h1>{t('title')}</h1>
                        <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px' }} />
                        <p className={styles.subtitle}>{t('subtitle')}</p>
                    </div>
                </section>

                <section className={styles.content}>
                    <div className="container">
                        {/* Filter Bar */}
                        <div className={styles.filters} id="catalog-filters">
                            {filters.map((f) => (
                                <button
                                    key={f.key}
                                    className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ''}`}
                                    onClick={() => setActiveFilter(f.key)}
                                    id={`filter-${f.key}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <div className={styles.grid}>
                            {filtered.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/catalog/${product.id}`}
                                    className={styles.productLink}
                                >
                                    <Card hover id={`catalog-product-${product.id}`}>
                                        <CardImage
                                            src={product.image}
                                            alt={product.name[locale]}
                                            badge={product.featured ? t('featured') : undefined}
                                        />
                                        <CardBody>
                                            <CardTitle>{product.name[locale]}</CardTitle>
                                            <p className={styles.price}>{product.priceRange}</p>
                                            <div className={styles.specRow}>
                                                <span className={styles.spec}>⚡ {product.specs.motor}</span>
                                                <span className={styles.spec}>🔋 {product.specs.range}</span>
                                            </div>
                                            <span className={styles.viewBtn}>{t('viewDetails')} →</span>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className={styles.empty}>
                                <p>{t('noResults')}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
