import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Footer.module.css';

export default function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');

    return (
        <footer className={styles.footer} id="main-footer">
            <div className={styles.rastaBar} />
            <div className={styles.inner}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span className={styles.logoIcon}>🚲</span>
                            <span className={styles.logoText}>
                                <span className={styles.logoRasta}>Rasta</span>
                                <span className={styles.logoBike}>Bike</span>
                            </span>
                        </div>
                        <p className={styles.tagline}>{t('tagline')}</p>
                        <div className={styles.social}>
                            <a
                                href="https://wa.me/9720586012340"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="WhatsApp"
                                id="footer-whatsapp"
                            >
                                💬
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Facebook"
                                id="footer-facebook"
                            >
                                📘
                            </a>
                            <a
                                href="tel:0586012340"
                                className={styles.socialLink}
                                aria-label="Phone"
                                id="footer-phone"
                            >
                                📞
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>{t('quickLinks')}</h4>
                        <ul className={styles.links}>
                            <li><Link href="/" className={styles.link}>{tNav('home')}</Link></li>
                            <li><Link href="/catalog" className={styles.link}>{tNav('catalog')}</Link></li>
                            <li><Link href="/about" className={styles.link}>{tNav('about')}</Link></li>
                            <li><Link href="/contact" className={styles.link}>{tNav('contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>{t('contactUs')}</h4>
                        <ul className={styles.links}>
                            <li className={styles.contactItem}>
                                <span>📞</span>
                                <a href="tel:0586012340" className={styles.link}>058-601-2340</a>
                            </li>
                            <li className={styles.contactItem}>
                                <span>💬</span>
                                <a
                                    href="https://wa.me/9720586012340"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    WhatsApp
                                </a>
                            </li>
                            <li className={styles.contactItem}>
                                <span>📍</span>
                                <span className={styles.link}>Israel</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} RastaBike. {t('rights')}
                    </p>
                    <div className={styles.legal}>
                        <a href="#" className={styles.legalLink}>{t('privacy')}</a>
                        <a href="#" className={styles.legalLink}>{t('terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
