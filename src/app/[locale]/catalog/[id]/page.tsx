import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card, { CardImage, CardBody, CardTitle, CardText } from '@/components/ui/Card';
import { products, getProductById } from '@/data/products';
import type { Locale } from '@/i18n/routing';
import styles from './page.module.css';

type Props = {
    params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
    return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: Props) {
    const { id, locale } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const related = products
        .filter((p) => p.type === product.type && p.id !== product.id)
        .slice(0, 3);

    return (
        <>
            <Navbar />
            <main className={styles.productPage}>
                <div className="container">
                    <Link href="/catalog" className={styles.backLink}>
                        ← <BackLabel locale={locale as Locale} />
                    </Link>

                    <div className={styles.productLayout}>
                        {/* Image */}
                        <div className={styles.imageSection}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={product.image}
                                    alt={product.name[locale as Locale]}
                                    className={styles.mainImage}
                                />
                                {product.featured && (
                                    <span className={styles.featuredBadge}>⭐ Featured</span>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className={styles.detailsSection}>
                            <h1 className={styles.productName}>
                                {product.name[locale as Locale]}
                            </h1>
                            <p className={styles.priceRange}>{product.priceRange}</p>
                            <div className="rasta-bar" style={{ width: '60px', marginBlock: '16px' }} />

                            <p className={styles.description}>
                                {product.description[locale as Locale]}
                            </p>

                            {/* Specs Table */}
                            <div className={styles.specsSection}>
                                <h2 className={styles.specsTitle}>
                                    <SpecsLabel locale={locale as Locale} />
                                </h2>
                                <div className={styles.specsGrid}>
                                    <SpecItem locale={locale as Locale} specKey="battery" value={product.specs.battery} icon="🔋" />
                                    <SpecItem locale={locale as Locale} specKey="range" value={product.specs.range} icon="📏" />
                                    <SpecItem locale={locale as Locale} specKey="motor" value={product.specs.motor} icon="⚡" />
                                    <SpecItem locale={locale as Locale} specKey="weight" value={product.specs.weight} icon="⚖️" />
                                    <SpecItem locale={locale as Locale} specKey="topSpeed" value={product.specs.topSpeed} icon="🏎️" />
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className={styles.ctas}>
                                <Button
                                    variant="rasta"
                                    size="lg"
                                    href={`https://wa.me/9720586012340?text=Hi! I'm interested in the ${product.name.en}`}
                                >
                                    💬 <WhatsAppLabel locale={locale as Locale} />
                                </Button>
                                <Button variant="outline" size="lg" href="tel:0586012340">
                                    📞 <CallLabel locale={locale as Locale} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <section className={styles.related}>
                            <h2 className={styles.relatedTitle}>
                                <RelatedLabel locale={locale as Locale} />
                            </h2>
                            <div className={styles.relatedGrid}>
                                {related.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/catalog/${p.id}`}
                                        className={styles.relatedLink}
                                    >
                                        <Card hover>
                                            <CardImage src={p.image} alt={p.name[locale as Locale]} />
                                            <CardBody>
                                                <CardTitle>{p.name[locale as Locale]}</CardTitle>
                                                <CardText>{p.priceRange}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

// Helper components to use translations in a server component context
function BackLabel({ locale }: { locale: Locale }) {
    const t = useTranslations('product');
    return <>{t('backToCatalog')}</>;
}

function SpecsLabel({ locale }: { locale: Locale }) {
    const t = useTranslations('product');
    return <>{t('specs')}</>;
}

function WhatsAppLabel({ locale }: { locale: Locale }) {
    const t = useTranslations('product');
    return <>{t('inquireWhatsApp')}</>;
}

function CallLabel({ locale }: { locale: Locale }) {
    const t = useTranslations('product');
    return <>{t('callUs')}</>;
}

function RelatedLabel({ locale }: { locale: Locale }) {
    const t = useTranslations('product');
    return <>{t('relatedBikes')}</>;
}

function SpecItem({
    locale,
    specKey,
    value,
    icon,
}: {
    locale: Locale;
    specKey: string;
    value: string;
    icon: string;
}) {
    const t = useTranslations('product');
    return (
        <div className={styles.specItem}>
            <span className={styles.specIcon}>{icon}</span>
            <span className={styles.specLabel}>{t(specKey as any)}</span>
            <span className={styles.specValue}>{value}</span>
        </div>
    );
}
