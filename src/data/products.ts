export interface Product {
    id: string;
    name: { en: string; he: string };
    description: { en: string; he: string };
    type: 'mountain' | 'city' | 'fat-tire' | 'folding';
    image: string;
    priceRange: string;
    specs: {
        battery: string;
        range: string;
        motor: string;
        weight: string;
        topSpeed: string;
    };
    featured: boolean;
}

export const products: Product[] = [
    {
        id: 'rasta-cruiser-750',
        name: { en: 'Rasta Cruiser 750', he: 'ראסטה קרוזר 750' },
        description: {
            en: 'The ultimate beach cruiser with fat tires and powerful motor. Glide through sand and streets with pure Rasta style. Perfect for coastal adventures and daily commutes.',
            he: 'קרוזר החוף האולטימטיבי עם צמיגים רחבים ומנוע עוצמתי. גלשו דרך חול ורחובות בסטייל ראסטה טהור. מושלם להרפתקאות חוף ולנסיעות יומיומיות.',
        },
        type: 'fat-tire',
        image: '/images/products/rasta-cruiser-750.jpg',
        priceRange: '₪7,500 - ₪9,000',
        specs: {
            battery: '48V 17.5Ah',
            range: '60-80 km',
            motor: '750W Bafang',
            weight: '28 kg',
            topSpeed: '45 km/h',
        },
        featured: true,
    },
    {
        id: 'island-hopper-500',
        name: { en: 'Island Hopper 500', he: 'איילנד הופר 500' },
        description: {
            en: 'Lightweight city cruiser designed for island vibes. Smooth ride, quick charge, and head-turning Rasta colors. The perfect companion for your urban adventures.',
            he: 'קרוזר עירוני קליל בעיצוב אווירת אי. רכיבה חלקה, טעינה מהירה וצבעי ראסטה שמושכים תשומת לב. המלווה המושלם להרפתקאות העירוניות שלכם.',
        },
        type: 'city',
        image: '/images/products/island-hopper-500.jpg',
        priceRange: '₪5,500 - ₪7,000',
        specs: {
            battery: '36V 14Ah',
            range: '50-65 km',
            motor: '500W Hub',
            weight: '22 kg',
            topSpeed: '35 km/h',
        },
        featured: true,
    },
    {
        id: 'mountain-lion-1000',
        name: { en: 'Mountain Lion 1000', he: 'אריה ההרים 1000' },
        description: {
            en: 'Conquer any trail with this beast. Full suspension, powerful motor, and rugged tires built for the wildest terrain. For riders who crave adventure off the beaten path.',
            he: 'כבשו כל שביל עם החיה הזו. מתלים מלאים, מנוע חזק וצמיגים חסונים לכל שטח. לרוכבים שמשתוקקים להרפתקאות מחוץ לשביל.',
        },
        type: 'mountain',
        image: '/images/products/mountain-lion-1000.jpg',
        priceRange: '₪9,000 - ₪12,000',
        specs: {
            battery: '48V 20Ah',
            range: '50-70 km',
            motor: '1000W Mid-Drive',
            weight: '32 kg',
            topSpeed: '50 km/h',
        },
        featured: true,
    },
    {
        id: 'beach-breeze-350',
        name: { en: 'Beach Breeze 350', he: 'רוח ים 350' },
        description: {
            en: 'Light, breezy, and effortless. This entry-level e-bike is perfect for casual rides along the boardwalk. Simple controls and a comfortable upright position.',
            he: 'קל, רגוע ובלי מאמץ. אופניים חשמליים ברמת כניסה מושלמים לרכיבות קזואליות לאורך הטיילת. בקרות פשוטות ומצב ישיבה נוח.',
        },
        type: 'city',
        image: '/images/products/beach-breeze-350.jpg',
        priceRange: '₪3,500 - ₪4,500',
        specs: {
            battery: '36V 10Ah',
            range: '35-45 km',
            motor: '350W Hub',
            weight: '19 kg',
            topSpeed: '25 km/h',
        },
        featured: false,
    },
    {
        id: 'jungle-fold-500',
        name: { en: 'Jungle Fold 500', he: "ג'אנגל פולד 500" },
        description: {
            en: 'Fold it, carry it, ride it anywhere. The Jungle Fold combines portability with serious power. Perfect for commuters and travelers who need flexibility.',
            he: 'קפלו, שאו, רכבו בכל מקום. הג\'אנגל פולד משלב ניידות עם כוח רציני. מושלם לנוסעים ולמטיילים שצריכים גמישות.',
        },
        type: 'folding',
        image: '/images/products/jungle-fold-500.jpg',
        priceRange: '₪4,500 - ₪6,000',
        specs: {
            battery: '48V 13Ah',
            range: '40-55 km',
            motor: '500W Hub',
            weight: '21 kg',
            topSpeed: '35 km/h',
        },
        featured: false,
    },
    {
        id: 'dub-rider-750',
        name: { en: 'Dub Rider 750', he: 'דאב ריידר 750' },
        description: {
            en: 'The fat-tire legend. Massive 4-inch tires eat up any surface while the 750W motor delivers smooth, powerful acceleration. Built for those who ride to the rhythm.',
            he: 'אגדת הצמיגים הרחבים. צמיגי 4 אינץ\' מסיביים בולעים כל משטח בעוד מנוע 750 וואט מספק תאוצה חלקה ועוצמתית. נבנה לאלה שרוכבים לקצב.',
        },
        type: 'fat-tire',
        image: '/images/products/dub-rider-750.jpg',
        priceRange: '₪8,000 - ₪10,000',
        specs: {
            battery: '48V 17.5Ah',
            range: '55-75 km',
            motor: '750W Bafang',
            weight: '30 kg',
            topSpeed: '45 km/h',
        },
        featured: true,
    },
    {
        id: 'trail-blazer-500',
        name: { en: 'Trail Blazer 500', he: 'שובר שבילים 500' },
        description: {
            en: 'Tackle mountain trails with confidence. Front suspension, knobby tires, and a responsive motor make this the go-to for off-road adventures.',
            he: 'התמודדו עם שבילי הרים בביטחון. מתלים קדמיים, צמיגי שטח ומנוע רספונסיבי הופכים אותו לאופציה הראשונה להרפתקאות שטח.',
        },
        type: 'mountain',
        image: '/images/products/trail-blazer-500.jpg',
        priceRange: '₪6,000 - ₪8,000',
        specs: {
            battery: '48V 14Ah',
            range: '45-60 km',
            motor: '500W Mid-Drive',
            weight: '26 kg',
            topSpeed: '40 km/h',
        },
        featured: false,
    },
    {
        id: 'pocket-rasta-250',
        name: { en: 'Pocket Rasta 250', he: 'פוקט ראסטה 250' },
        description: {
            en: 'The most compact folding e-bike in our lineup. Ultra-light, ultra-portable, with enough juice to get you across town. Folds in 10 seconds flat.',
            he: 'האופניים המתקפלים הקומפקטיים ביותר באוסף שלנו. קלים במיוחד, ניידים במיוחד, עם מספיק כוח לחצות את העיר. מתקפלים ב-10 שניות.',
        },
        type: 'folding',
        image: '/images/products/pocket-rasta-250.jpg',
        priceRange: '₪3,000 - ₪4,000',
        specs: {
            battery: '36V 8Ah',
            range: '25-35 km',
            motor: '250W Hub',
            weight: '15 kg',
            topSpeed: '25 km/h',
        },
        featured: false,
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByType(type: Product['type']): Product[] {
    return products.filter((p) => p.type === type);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}
