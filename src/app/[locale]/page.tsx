import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card, { CardImage, CardBody, CardTitle, CardText } from '@/components/ui/Card';
import { getFeaturedProducts } from '@/data/products';
import type { Locale } from '@/i18n/routing';
import styles from './page.module.css';

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale() as Locale;
    const featured = getFeaturedProducts();

    return (
        <>
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className={styles.hero} id="hero-section">
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
                        <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
                        <div className={styles.heroCtas}>
                            <Button variant="rasta" size="lg" href={`/${locale}/catalog`}>
                                {t('hero.cta')}
                            </Button>
                            <Button variant="outline" size="lg" href={`/${locale}/contact`}>
                                {t('hero.ctaSecondary')}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Featured Bikes */}
                <section className={`section ${styles.featured}`} id="featured-section">
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2>{t('catalog.title')}</h2>
                            <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px' }} />
                            <p className={styles.sectionSubtitle}>{t('catalog.subtitle')}</p>
                        </div>
                        <div className={styles.featuredGrid}>
                            {featured.map((product, i) => (
                                <Link
                                    key={product.id}
                                    href={`/catalog/${product.id}`}
                                    className={styles.productLink}
                                >
                                    <Card hover id={`featured-product-${product.id}`}>
                                        <CardImage
                                            src={product.image}
                                            alt={product.name[locale]}
                                            badge={t('catalog.featured')}
                                        />
                                        <CardBody>
                                            <CardTitle>{product.name[locale]}</CardTitle>
                                            <CardText>{product.priceRange}</CardText>
                                            <div className={styles.specPills}>
                                                <span className={styles.pill}>{product.specs.motor}</span>
                                                <span className={styles.pill}>{product.specs.range}</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.viewAll}>
                            <Button variant="primary" size="lg" href={`/${locale}/catalog`}>
                                {t('catalog.filterAll')} →
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Why RastaBike */}
                <section className={`section section--accent ${styles.why}`} id="why-section">
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2>{t('about.whyTitle')}</h2>
                            <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px' }} />
                        </div>
                        <div className={styles.whyGrid}>
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className={styles.whyCard}>
                                    <div className={styles.whyIcon}>
                                        {n === 1 ? '🌿' : n === 2 ? '⭐' : n === 3 ? '🏖️' : '🛠️'}
                                    </div>
                                    <h3 className={styles.whyCardTitle}>
                                        {t(`about.why${n}Title`)}
                                    </h3>
                                    <p className={styles.whyCardText}>
                                        {t(`about.why${n}Desc`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
