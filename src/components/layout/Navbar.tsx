'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';

export default function Navbar() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/catalog', label: t('catalog') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className={styles.navbar} id="main-navbar">
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} id="navbar-logo">
                    <span className={styles.logoIcon}>🚲</span>
                    <span className={styles.logoText}>
                        <span className={styles.logoRasta}>Rasta</span>
                        <span className={styles.logoBike}>Bike</span>
                    </span>
                </Link>

                <div className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                            onClick={() => setMobileOpen(false)}
                            id={`nav-link-${link.href.replace('/', '') || 'home'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className={styles.mobileActions}>
                        <LanguageSwitcher />
                    </div>
                </div>

                <div className={styles.actions}>
                    <LanguageSwitcher />
                    <button
                        className={styles.hamburger}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        id="navbar-hamburger"
                    >
                        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerOpen : ''}`} />
                        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerOpen : ''}`} />
                        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerOpen : ''}`} />
                    </button>
                </div>
            </div>
            <div className={styles.rastaBar} />
        </nav>
    );
}
