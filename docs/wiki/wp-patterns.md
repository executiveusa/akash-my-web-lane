# WordPress Patterns — SYNTHIA Knowledge Base

## Plugin Detection Fingerprints

| Plugin | HTML Fingerprint | Impact | Action |
|---|---|---|---|
| Elementor | `elementor` in HTML | -15 Lighthouse | Replace with Astro components |
| Divi | `et_pb` in HTML | -12 Lighthouse | Extract content from shortcodes |
| WooCommerce | `woocommerce` in HTML | -8 Lighthouse | Migrate products to static or headless |
| Revslider | `revslider` or `revolutionslider` | -10 Lighthouse | Replace with CSS/GSAP animation |
| WPForms | `wpforms` in HTML | -5 Lighthouse | Replace with native HTML form + API |
| Gravity Forms | `gform` in HTML | -5 Lighthouse | Replace with Astro form component |
| Yoast SEO | `yoast` in HTML | 0 (neutral) | Preserve meta data, rebuild in Astro |
| Avada | `avada` in HTML | -10 Lighthouse | Full rebuild |

## Common WordPress Anti-Patterns → Solutions

### 1. Page Builder Bloat (Most Common)
- **Problem**: Elementor/Divi load 2-5MB of CSS/JS for visual editing capability
- **Solution**: Extract raw content, rebuild with semantic Astro components
- **Lighthouse gain**: +30-45 points

### 2. Plugin Stacking
- **Problem**: 20+ plugins each adding DB queries and JS
- **Solution**: Consolidate functionality into Astro + single API
- **Lighthouse gain**: +15-25 points

### 3. Unoptimized Images
- **Problem**: Full-resolution JPEG/PNG uploads served without resizing
- **Solution**: Astro `<Image>` component auto-generates WebP + srcset
- **Lighthouse gain**: +10-20 points

### 4. Render-Blocking Scripts
- **Problem**: WP loads jQuery + plugins in `<head>` blocking render
- **Solution**: Astro ships zero JS by default; GSAP loaded only where needed
- **Lighthouse gain**: +15-20 points

### 5. Missing Caching / CDN
- **Problem**: WP Hosting on shared servers with no edge caching
- **Solution**: Cloudflare Pages edge deployment — content served from 300+ PoPs globally
- **TTFB gain**: -200ms to -600ms typical

## Content Extraction Checklist

When Firecrawl crawls the site:
- [ ] Homepage hero text + CTA
- [ ] Services/products list
- [ ] About/team content  
- [ ] Testimonials/reviews
- [ ] Contact information (phone, email, address)
- [ ] Business hours
- [ ] Social media links
- [ ] Primary color from brand elements

## Niche-Specific WordPress Patterns

### Healthcare
- Usually: Twenty-Twenty theme + Elementor + WP Appointment Booking
- Critical: Must preserve: doctor names, credentials, specialty
- CTA: "Book Appointment" is king

### Legal
- Usually: Legal theme + Contact Form 7 + Simple Table of Contents
- Critical: Practice areas, attorney bios, case results
- CTA: "Free Consultation" converts highest

### Restaurant
- Usually: Restaurant theme + WooCommerce (for online ordering) + OpenTable embed
- Critical: Menu items, hours, reservation link
- CTA: "Reserve a Table" or "Order Online"

### Contractor
- Usually: Construction theme + WPForms + Google Maps embed
- Critical: Service area, license numbers, portfolio images
- CTA: "Get Free Quote" or "Call Now"
