# QA Checklist V1

## Public experience

- [ ] Home loads over HTTPS
- [ ] Hero loads
- [ ] Featured gallery loads
- [ ] Full catalog loads
- [ ] Artwork states render correctly
- [ ] WhatsApp CTA opens correctly
- [ ] Audio control works
- [ ] Mobile layout works

## Discoverability

- [ ] Canonical URL is correct
- [ ] Title is correct
- [ ] Description is correct
- [ ] Open Graph image resolves
- [ ] Facebook/Meta preview resolves
- [ ] LinkedIn preview resolves
- [ ] Twitter/X preview resolves
- [ ] Favicon resolves

## Technical

- [ ] Existing image paths return images, not HTML
- [ ] Missing asset paths return an appropriate missing-resource response
- [ ] No unnecessary SPA rewrite exists
- [ ] Security headers are present
- [ ] No console errors on initial load
- [ ] Google Sheets catalog remains reachable

## Productization

- [ ] Renée-specific data isolated
- [ ] Core components identified
- [ ] Configuration contract implemented
- [ ] Second artist can be instantiated without duplicating the engine
