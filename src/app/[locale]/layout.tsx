import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import type { Metadata } from 'next';
import '../globals.css';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    return {
        title: messages.metadata.title,
        description: messages.metadata.description,
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === 'he' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <AnalyticsProvider>
                        {children}
                    </AnalyticsProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
