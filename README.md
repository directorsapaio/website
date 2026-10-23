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

The real SIF logo has not been supplied yet. Add it under `public`, then set `logoPath` in `src/config/site.ts`. Do not replace the current text lockup with an unapproved mark.

Services with `requires_confirmation` status are excluded from navigation, static page generation and the sitemap.

## Enquiry delivery

The form validates input and calls `/api/enquiry`, but the endpoint deliberately returns an honest “not configured” response and does not store or transmit visitor data. Connect an approved mail or CRM provider in `src/app/api/enquiry/route.ts` before production use, then test loading, error and successful delivery states.
