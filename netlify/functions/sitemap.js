const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const siteId = process.env.REACT_APP_SITE_ID;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async (event, context) => {
    console.log('Sitemap generation started');
    console.log('Supabase URL present:', !!process.env.REACT_APP_SUPABASE_URL);
    console.log('Supabase Key present:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
    console.log('Site ID:', siteId);

    try {
        // 1. Fetch all active cars from Supabase
        console.log('Fetching cars from Supabase...');
        const { data: cars, error } = await supabase
            .from('cars')
            .select('id, brand, model, year, updated_at, created_at')
            .eq('site_id', siteId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log(`Fetched ${cars?.length || 0} cars`);

        // 2. Define static routes
        const staticRoutes = [
            '',
            '/ponuka',
            '/dovoz',
            '/leasing',
            '/vykup',
            '/pzp',
            '/kontakt',
            '/ochrana-osobnych-udajov',
        ];

        const baseUrl = 'https://www.mtautos.sk';
        const currentDate = new Date().toISOString();

        // 3. Generate XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Add static routes
        staticRoutes.forEach(route => {
            xml += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });

        // Add dynamic car routes
        cars.forEach(car => {
            // Create slug: brand-model-year-id
            const slug = `${car.brand}-${car.model}-${car.year}-${car.id}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            const lastMod = car.updated_at || car.created_at || currentDate;

            xml += `
  <url>
    <loc>${baseUrl}/vozidlo/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
        });

        xml += '</urlset>';

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/xml',
            },
            body: xml,
        };
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate sitemap' }),
        };
    }
};
