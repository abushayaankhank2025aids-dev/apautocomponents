# A.P. Auto Components – static website

The website is a statically exported Next.js site with no database, cloud storage, or server-side form submission.

## Run locally

1. Install Node.js 20 or newer.
2. In a terminal, change to this directory (`ap-auto`).
3. Install dependencies and start the development server:

   ```bash
   npm ci
   npm run dev
   ```

4. Open `http://localhost:3000`.

To create the static website, run `npm run build`. The generated files are written to `out/`. Preview that folder with any static file server or publish it to a static host.

## Netlify Drop

The repository-root `netlify.toml` configures Netlify to use `ap-auto` as its base directory, run `npm run build:netlify`, and publish `out/`. The Netlify build explicitly uses the website root path, even if `NEXT_PUBLIC_BASE_PATH` is set in the environment. Netlify's `URL` is used for canonical links and the sitemap during a managed build. For a manual Netlify Drop deployment, set `NEXT_PUBLIC_SITE_URL` to the final site URL before building, then run the following from this directory:

```bash
npm ci
npm run build:netlify
```

Upload the generated `ap-auto/out/` directory to Netlify Drop. This directory contains the static pages and their Next.js JavaScript, CSS, fonts, SVG markup and local images. No deployment is performed by these commands. If the Netlify site URL is not known at build time, the site will still work, but its canonical links and sitemap use the existing `http://localhost:3000` fallback; set the URL and rebuild before publishing for correct SEO URLs.

The GitHub Pages workflow remains separate: it sets `NEXT_PUBLIC_BASE_PATH` for the repository site and runs `npm run build`. Do not use the Netlify build command for GitHub Pages project-site deployments.

## Enquiry and contact forms

The forms validate the entered fields in the browser and open a pre-filled message in the visitor's default email application. The visitor must review the draft and send it themselves. The website does not submit or store form details.

The recipient is the existing confirmed public address in `src/config/site-config.ts`. Update it there if the owner changes the business email. Drawings and documents are not uploaded by the website; visitors must attach them manually to the email draft. The quote form validates selected files and includes the selected filename in the draft.

## Products and services

Confirmed service content is maintained in `src/config/content.ts`. The product catalogue intentionally remains empty until the owner provides confirmed product details. Add approved product records to `src/config/products.ts`; product pages are then included in the static build.

## Company photographs

Optimized stock WebP images are stored in `public/images/illustrative/`. They are explicitly captioned as illustrative and are not represented as photographs of A.P. Auto Components, its facility, its equipment, or its customers. Each image caption links to its Wikimedia Commons source and applicable Creative Commons license. Image paths use `src/lib/public-asset.ts` so they work with the GitHub Pages project-site base path.

The owner-confirmed Padi address remains the single address in `src/config/site-config.ts`; stock images and their captions do not change company address details. The header displays the company name as text and does not use a fabricated logo.

## Free static hosting

GitHub Pages can host the generated static export for free on public repositories. A manually triggered workflow is provided at `.github/workflows/deploy-pages.yml`. To use it:

1. Push the project to a GitHub repository and choose **Settings → Pages → Build and deployment → GitHub Actions**.
2. Ensure the default branch is named `main`, or update the workflow branch filter.
3. Run **Actions → Deploy static website → Run workflow** when you want to publish.

The workflow derives the correct site URL and base path for either a project site or an `owner.github.io` site. The workflow does not run until manually triggered.

For a local static build, set `NEXT_PUBLIC_SITE_URL` to the final site URL before building if you want production sitemap and canonical metadata. The GitHub Pages workflow sets it automatically.

## Content verification

See `docs/OWNER_CONFIRMATIONS.md` for factual items still awaiting owner approval. Do not add unconfirmed company, product, machine, or certification claims.
