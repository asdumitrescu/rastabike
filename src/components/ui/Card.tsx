import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    hover?: boolean;
    className?: string;
    onClick?: () => void;
    id?: string;
}

export default function Card({
    children,
    variant = 'default',
    hover = true,
    className = '',
    onClick,
    id,
}: CardProps) {
    const classes = [
        styles.card,
        styles[`card--${variant}`],
        hover ? styles['card--hover'] : '',
        onClick ? styles['card--clickable'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} onClick={onClick} id={id}>
            {children}
        </div>
    );
}

interface CardImageProps {
    src: string;
    alt: string;
    badge?: string;
}

export function CardImage({ src, alt, badge }: CardImageProps) {
    return (
        <div className={styles.imageWrapper}>
            <img src={src} alt={alt} className={styles.image} />
            {badge && <span className={styles.badge}>{badge}</span>}
        </div>
    );
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`${styles.body} ${className}`}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
    return <h3 className={styles.title}>{children}</h3>;
}

export function CardText({ children }: { children: React.ReactNode }) {
    return <p className={styles.text}>{children}</p>;
}
