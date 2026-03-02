'use client';

import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'rasta';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    type?: 'submit' | 'button' | 'reset';
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    fullWidth = false,
    disabled = false,
    icon,
    className = '',
    id,
}: ButtonProps) {
    const classes = [
        styles.btn,
        styles[`btn--${variant}`],
        styles[`btn--${size}`],
        fullWidth ? styles['btn--full'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <a href={href} className={classes} id={id}>
                {icon && <span className={styles.icon}>{icon}</span>}
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            id={id}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
}
