# SIF corporate website

Next.js corporate website for Sapaio Integrated Facilities Management Private Limited.

## Local development

```bash
npm install
npm run dev
```

Use `npm run typecheck`, `npm run lint`, and `npm run build` before release.

## Content controls

- Contact, brand and domain settings: `src/config/site.ts`
- Supplied image paths: `src/config/assets.ts`
- Public service status: `src/config/services.ts`
- Industry content and photography: `src/config/industries.ts`

The approved logo is configured from `public/Logo SIF.png` through `src/config/assets.ts`.

Services with `requires_confirmation` status are excluded from navigation, static page generation and the sitemap.

## Search indexing

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain before building. The application publishes:

- `/sitemap.xml` with every public service and sector page plus relevant image references.
- `/robots.txt` with the production host and sitemap location.
- Organisation structured data in the root layout.

After deployment, verify the domain in Google Search Console and submit `https://your-domain.example/sitemap.xml`. Search engines decide indexing and ranking; sitemap submission does not guarantee a particular position.

## Enquiry delivery

The form validates input and calls `/api/enquiry`, but the endpoint deliberately returns an honest “not configured” response and does not store or transmit visitor data. Connect an approved mail or CRM provider in `src/app/api/enquiry/route.ts` before production use, then test loading, error and successful delivery states.
