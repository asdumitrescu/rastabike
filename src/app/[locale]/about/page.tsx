import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function AboutPage() {
    const t = useTranslations('about');

    return (
        <>
            <Navbar />
            <main className={styles.about}>
                {/* Header */}
                <section className={styles.header}>
                    <div className="container">
                        <h1>{t('title')}</h1>
                        <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px' }} />
                    </div>
                </section>

                {/* Story */}
                <section className={`section ${styles.story}`}>
                    <div className="container container--narrow">
                        <div className={styles.storyLayout}>
                            <div className={styles.storyImage}>
                                <img
                                    src="/images/hero-brand.jpeg"
                                    alt="RastaBike"
                                    className={styles.brandImage}
                                />
                            </div>
                            <div className={styles.storyContent}>
                                <h2 className={styles.storyTitle}>{t('subtitle')}</h2>
                                <p className={styles.storyText}>{t('mission')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Section */}
                <section className={`section section--accent ${styles.whySection}`} id="about-why">
                    <div className="container">
                        <h2 className={styles.sectionTitle}>{t('whyTitle')}</h2>
                        <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px', marginBottom: '48px' }} />
                        <div className={styles.whyGrid}>
                            {[
                                { n: 1, icon: '🌿', color: 'var(--rasta-green)' },
                                { n: 2, icon: '⭐', color: 'var(--rasta-gold)' },
                                { n: 3, icon: '🏖️', color: 'var(--beach-ocean)' },
                                { n: 4, icon: '🛠️', color: 'var(--rasta-red)' },
                            ].map(({ n, icon, color }) => (
                                <div key={n} className={styles.whyCard}>
                                    <div className={styles.whyIconWrapper} style={{ background: `${color}15` }}>
                                        <span className={styles.whyIcon}>{icon}</span>
                                    </div>
                                    <h3 className={styles.whyCardTitle}>{t(`why${n}Title` as any)}</h3>
                                    <p className={styles.whyCardDesc}>{t(`why${n}Desc` as any)}</p>
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
