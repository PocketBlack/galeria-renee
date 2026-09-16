# Merge Gate V1.1

Before merging `hardening/v1-1` into `main`:

1. Review the Open Graph changes.
2. Confirm removal of `_redirects` is acceptable for the current static architecture.
3. Confirm `_headers` is present in the published directory.
4. Confirm the new configuration files are inert until the application wiring step.
5. Rebuild/deploy the branch or merge to trigger the normal Netlify production pipeline.
6. Run `QA-V1.md` against `https://renee.nexolab.lat`.
7. Re-run Meta/Facebook and other social preview inspectors after deployment.

Do not call V1.1 complete until the public deployment has passed these checks.
