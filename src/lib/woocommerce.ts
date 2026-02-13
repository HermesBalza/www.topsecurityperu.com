const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WORDPRESS_URL) {
    throw new Error('Faltan las variables de entorno de WooCommerce');
}

// Basic Authentication Helper
function getAuthHeader() {
    const credentials = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
    return `Basic ${credentials}`;
}

// Types (Simplified for display)
export interface Product {
    id: number;
    name: string;
    price: string;
    regular_price: string;
    sale_price: string;
    description: string;
    short_description: string;
    images: { id: number; src: string; alt: string }[];
    categories: { id: number; name: string }[];
    permalink: string;
    stock_status: string;
}

/**
 * Fetch products from WooCommerce
 * @param perPage Number of products to fetch
 */
export async function getProducts(perPage = 10): Promise<Product[]> {
    try {
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/products?per_page=${perPage}&status=publish`;

        // Server-side fetch needs full URL
        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 }, // Cache for 60 seconds (ISR)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('WooCommerce Error:', res.status, errorText);
            throw new Error(`Error fetching products: ${res.status}`);
        }

        const data = await res.json();
        return data as Product[];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];

    }
}

/**
 * Fetch a single product by ID
 * @param id Product ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/products/${id}`;
        console.log(`[WooCommerce] Fetching Product: ${url}`);

        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error('WooCommerce Product Error:', res.status, await res.text());
            return null;
        }

        const data = await res.json();
        return data as Product;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}
