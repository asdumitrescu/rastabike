'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function ContactPage() {
    const t = useTranslations('contact');
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Client-side only for now
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormState({ name: '', email: '', message: '' });
    };

    const contactCards = [
        {
            icon: '📞',
            title: t('phone'),
            value: '058-601-2340',
            href: 'tel:0586012340',
            color: 'var(--rasta-green)',
        },
        {
            icon: '💬',
            title: t('whatsapp'),
            value: 'WhatsApp',
            href: 'https://wa.me/9720586012340',
            color: 'var(--rasta-gold)',
        },
        {
            icon: '📘',
            title: t('facebook'),
            value: 'RastaBike',
            href: 'https://facebook.com',
            color: 'var(--beach-ocean)',
        },
        {
            icon: '📍',
            title: t('location'),
            value: t('locationValue'),
            href: null,
            color: 'var(--rasta-red)',
        },
    ];

    return (
        <>
            <Navbar />
            <main className={styles.contact}>
                <section className={styles.header}>
                    <div className="container">
                        <h1>{t('title')}</h1>
                        <div className="rasta-bar" style={{ width: '80px', marginInline: 'auto', marginTop: '12px' }} />
                        <p className={styles.subtitle}>{t('subtitle')}</p>
                    </div>
                </section>

                <section className={`section ${styles.content}`}>
                    <div className="container">
                        {/* Contact Cards */}
                        <div className={styles.cardsGrid}>
                            {contactCards.map((card) => {
                                const inner = (
                                    <div className={styles.contactCard} key={card.title}>
                                        <div
                                            className={styles.cardIcon}
                                            style={{ background: `${card.color}15` }}
                                        >
                                            {card.icon}
                                        </div>
                                        <h3 className={styles.cardTitle}>{card.title}</h3>
                                        <p className={styles.cardValue}>{card.value}</p>
                                    </div>
                                );

                                if (card.href) {
                                    return (
                                        <a
                                            key={card.title}
                                            href={card.href}
                                            target={card.href.startsWith('http') ? '_blank' : undefined}
                                            rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className={styles.cardLink}
                                        >
                                            {inner}
                                        </a>
                                    );
                                }
                                return inner;
                            })}
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-name" className={styles.label}>
                                        {t('formName')}
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        className={styles.input}
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-email" className={styles.label}>
                                        {t('formEmail')}
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        className={styles.input}
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-message" className={styles.label}>
                                        {t('formMessage')}
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        className={styles.textarea}
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" variant="rasta" size="lg" fullWidth>
                                    {t('formSend')}
                                </Button>
                                {submitted && (
                                    <p className={styles.successMsg}>{t('formSuccess')}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
