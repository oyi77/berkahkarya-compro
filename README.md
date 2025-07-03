# Netlify Deployment Instructions for Berkah Karya Websites

This package contains all the website files for Berkah Karya Digital Marketing & Agency, including the main website and three portfolio sites for different services.

## Directory Structure

```
netlify_deploy/
├── main_website/           # Main company website
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── portfolio_sites/        # Portfolio websites for each sub-product
    ├── shopee_tiktok/      # Shopee & TikTok Optimization portfolio
    │   ├── index.html
    │   ├── styles.css
    │   └── shopee_tiktok.js
    ├── seo/                # SEO Optimization portfolio
    │   ├── index.html
    │   ├── styles.css
    │   └── seo.js
    └── flashrobs/          # FlashRobs Trading Bot portfolio
        ├── index.html
        ├── styles.css
        └── trading.js
```

## Netlify Deployment Instructions

### Option 1: Deploy as Separate Sites (Recommended)

For optimal performance and separation of concerns, deploy each website as a separate Netlify site:

1. **Main Website**:
   - Create a new site in Netlify
   - Deploy the `main_website` directory
   - Set custom domain (e.g., `berkahkarya.id`)

2. **Shopee & TikTok Portfolio**:
   - Create a new site in Netlify
   - Deploy the `portfolio_sites/shopee_tiktok` directory
   - Set custom domain (e.g., `ecommerce.berkahkarya.id`)

3. **SEO Portfolio**:
   - Create a new site in Netlify
   - Deploy the `portfolio_sites/seo` directory
   - Set custom domain (e.g., `seo.berkahkarya.id`)

4. **FlashRobs Portfolio**:
   - Create a new site in Netlify
   - Deploy the `portfolio_sites/flashrobs` directory
   - Set custom domain (e.g., `flashrobs.id`)

### Option 2: Deploy as a Monorepo with Netlify Redirects

If you prefer to manage all sites under a single Netlify project:

1. Create a `netlify.toml` file in the root directory with the following content:

```toml
# Base settings
[build]
  publish = "main_website"

# Shopee & TikTok Portfolio
[[redirects]]
  from = "/ecommerce/*"
  to = "/portfolio_sites/shopee_tiktok/:splat"
  status = 200

# SEO Portfolio
[[redirects]]
  from = "/seo/*"
  to = "/portfolio_sites/seo/:splat"
  status = 200

# FlashRobs Portfolio
[[redirects]]
  from = "/trading/*"
  to = "/portfolio_sites/flashrobs/:splat"
  status = 200
```

2. Deploy the entire directory to Netlify
3. Access the sites at:
   - Main: `yourdomain.com`
   - Shopee & TikTok: `yourdomain.com/ecommerce`
   - SEO: `yourdomain.com/seo`
   - FlashRobs: `yourdomain.com/trading`

## Cross-Site Navigation

To ensure proper navigation between sites, update the links in each site's HTML files:

1. In the main website, update service links to point to the appropriate portfolio sites
2. In each portfolio site, update the "Back to main site" links to point to the main website
3. Update any cross-references between portfolio sites

## Contact Integration

### WhatsApp Integration

The WhatsApp integration is already configured with the provided phone number (6285732740006). The links are set up to open WhatsApp with pre-filled messages specific to each service.

To modify the WhatsApp number:
1. Search for `https://wa.me/6285732740006` in all HTML files
2. Replace with your new number: `https://wa.me/YOUR_NEW_NUMBER`

### Email Integration

For email form functionality, you'll need to set up a form handling service:

1. Create an account with a form service like Formspree, Netlify Forms, or EmailJS
2. Update the form action in each site's contact form
3. Test the forms after deployment

## Performance Optimization

For optimal website performance on Netlify:

1. Enable asset optimization in Netlify settings
2. Configure caching headers for static assets
3. Enable Netlify's CDN features

## Support and Maintenance

For any questions or support needs regarding these websites, please contact the development team.

Happy deploying!
