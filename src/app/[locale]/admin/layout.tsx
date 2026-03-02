'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    useEffect(() => {
        const isAuth = sessionStorage.getItem('admin_auth') === 'true';
        if (!isAuth && !pathname.includes('/admin/login')) {
            router.push(`/${locale}/admin/login`);
        } else {
            setAuthed(isAuth || pathname.includes('/admin/login'));
        }
        setLoading(false);
    }, [pathname, locale, router]);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        router.push(`/${locale}/admin/login`);
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    // Login page renders without sidebar
    if (pathname.includes('/admin/login')) {
        return <>{children}</>;
    }

    if (!authed) return null;

    const navItems = [
        { href: '/admin', label: '📊 Overview', id: 'admin-nav-overview' },
        { href: '/admin/products', label: '🚲 Products', id: 'admin-nav-products' },
        { href: '/admin/behavior', label: '🧭 Behavior', id: 'admin-nav-behavior' },
    ];

    const isActive = (href: string) => {
        const fullPath = `/${locale}${href}`;
        if (href === '/admin') return pathname === fullPath;
        return pathname.startsWith(fullPath);
    };

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Link href="/" className={styles.logo}>
                        <span>🚲</span>
                        <span className={styles.logoText}>
                            <span className={styles.logoRasta}>Rasta</span>Bike
                        </span>
                    </Link>
                    <span className={styles.badge}>Admin</span>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${isActive(item.href) ? styles.navActive : ''}`}
                            id={item.id}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backLink}>
                        ← Back to Site
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutBtn} id="admin-logout">
                        🚪 Logout
                    </button>
                </div>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
