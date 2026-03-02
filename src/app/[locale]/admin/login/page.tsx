'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './page.module.css';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const locale = useLocale();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side auth (env vars would be checked server-side in production)
        if (username === 'admin' && password === 'rastabike2024') {
            sessionStorage.setItem('admin_auth', 'true');
            router.push(`/${locale}/admin`);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <span className={styles.logoIcon}>🚲</span>
                    <h1 className={styles.loginTitle}>
                        <span className={styles.logoRasta}>Rasta</span>
                        <span>Bike</span>
                    </h1>
                    <p className={styles.loginSubtitle}>Admin Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} id="admin-login-form">
                    <div className={styles.formGroup}>
                        <label htmlFor="admin-username">Username</label>
                        <input
                            id="admin-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.submitBtn}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
