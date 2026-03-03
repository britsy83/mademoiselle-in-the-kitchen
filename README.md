# Mademoiselle in the Kitchen (Static Rebuild)

## Local preview
Open `index.html` directly in your browser.

## Deploy on GitHub Pages
1. Push this branch.
2. Open the repo settings on GitHub.
3. In **Pages**, set source to `Deploy from a branch`.
4. Select `main` (or merge this branch first), folder `/ (root)`.

## What changed vs Wix
- Rebuilt as a static single-page site: Hero -> Menu -> How it works -> Gallery -> Contact -> Footer.
- Removed all Wix runtime scripts and Wix CDN dependencies from HTML/CSS/JS.
- Downloaded visible image assets from the live Wix pages into `assets/images`.
- Updated layout to a mobile-first, premium-style design with sticky nav and section anchors.
- Added accessibility and SEO basics: semantic structure, skip link, focus styles, meta description, OG tags, image alt text.
- Added performance improvements: local assets, explicit image dimensions, lazy loading for non-hero images.

## Notes
- WebP conversion is preferred, but native tools in this environment do not support writing WebP. Current images are stored as downloaded PNG/JPG/JPEG.
