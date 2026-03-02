'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('common');

    const switchLocale = () => {
        const nextLocale = locale === 'en' ? 'he' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={switchLocale}
            className={styles.switcher}
            aria-label={`Switch to ${locale === 'en' ? 'Hebrew' : 'English'}`}
            id="language-switcher"
        >
            <span className={styles.flag}>
                {locale === 'en' ? '🇮🇱' : '🇬🇧'}
            </span>
            <span className={styles.label}>{t('switchLang')}</span>
        </button>
    );
}
