# Static website acceptance checklist

- [x] Static Next.js export configuration with responsive pages and existing design.
- [x] Client-side validation for quote and contact forms.
- [x] Forms open pre-filled email drafts without claiming to send or save submissions.
- [x] Selected quote attachments are described in the draft and must be attached by the visitor.
- [x] Confirmed product catalogue remains empty until owner-approved records are provided.
- [ ] Run `npm ci`, `npm run typecheck`, and `npm run build` in `ap-auto`.
- [ ] Review all routes, navigation links, and responsive layouts in a browser.
- [ ] Test invalid and valid contact/enquiry forms and verify the generated email draft in an email-capable browser environment.
- [ ] Confirm the public email address, address, and remaining owner details in `OWNER_CONFIRMATIONS.md`.
- [ ] Configure the intended static host and verify deployed links, sitemap, and canonical URLs.
