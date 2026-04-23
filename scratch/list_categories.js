
const fs = require('fs');
const path = require('path');

function getEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    const env = {};
    lines.forEach(line => {
        if (line && !line.startsWith('#')) {
            const [key, ...value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.join('=').trim();
            }
        }
    });
    return env;
}

async function listCategories() {
    const env = getEnv();
    const WC_CONSUMER_KEY = env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = env.WC_CONSUMER_SECRET;
    const WORDPRESS_URL = env.NEXT_PUBLIC_WORDPRESS_URL;

    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WORDPRESS_URL) {
        console.error('Faltan las variables de entorno de WooCommerce');
        return;
    }

    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    const url = `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?per_page=100`;

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) throw new Error(await res.text());
        const categories = await res.json();
        
        console.log('ID | Name | Slug');
        console.log('---|---|---');
        categories.forEach(cat => {
            console.log(`${cat.id} | ${cat.name} | ${cat.slug}`);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

listCategories();
