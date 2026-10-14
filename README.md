# Mayorkins Studio

**Design boldly. Build intelligently.**

A custom, responsive, single-page digital studio website built with vanilla HTML, CSS, and JavaScript. No framework, package install, external script, analytics tag, or build step is required. Local WOFF2 fonts and WebP project visuals keep the preview self-contained.

## Run locally

From this folder, serve the static files (avoid opening `index.html` directly because the inquiry fallback downloads a file and the browser's `file:` rules can vary):

```bash
python3 -m http.server 8081
```

Open `http://localhost:8081`.

## Included sections and interactions

- Responsive navigation, keyboard-operable mobile menu, skip link, visible focus states
- Accessible light/dark theme toggle; follows the device preference on first visit and remembers an explicit choice in local storage
- Oversized hero with original, browser-like interface mockups and reduced-motion-aware entrance animation
- “View our past works” gallery: Élan Estates plus the nine owner-selected website links, with neutral category labels
- Eight-card review carousel with clickable navigation, keyboard arrows, and swipe support; displays owner-supplied review copy without unprovided reviewer names or ratings
- Expandable service rows, progressive process indicators, FAQ accordion
- Inquiry form with inline validation, disabled/loading/success/error states, and repeat-submit protection
- Smooth in-page navigation, reading-progress indicator, scroll reveals, and reduced-motion support
- Local Space Grotesk and Inter variable fonts; responsive WebP photography and project-preview images
- Page title, description, Open Graph/Twitter metadata, favicon, and generated copyright year

## Portfolio integrity

No results, client logos, ratings, reviewer identities, or performance claims have been invented. The eight review texts were supplied by the owner and are shown without named attribution because none was provided.

- The past-works gallery contains the Élan Estates concept plus the nine website links supplied by the owner. No additional projects from the external portfolio index have been inferred.
- **Élan Estates** is a working, self-initiated real-estate concept prototype included at `projects/elan-estates/`; it is not presented as a client engagement.
- The other cards link directly to the supplied live websites and portfolio page. They use the owner's categories and neutral labels; no client attribution or outcomes are claimed.
- The review carousel contains the eight review texts supplied by the owner, grouped by the supplied topic labels. No reviewer names, ratings, platform badges, or additional review claims have been added.
- Mayowa Emmanuel and Akande Daniel are presented as co-owners, with their supplied roles. Akande is also identified as co-founder; Mayowa’s supplied portrait is used in the About section, while no portrait is assigned to Akande.
- The supplied Instagram, Facebook, and LinkedIn profiles, studio email, and both Mayowa and Akande WhatsApp contacts are configured. No physical address or separate phone-call link has been added.

## Studio settings to confirm before launch

Edit `assets/js/site-config.js`:

```js
window.MAYORKINS_CONFIG = {
  siteOrigin: "https://your-verified-domain.example/",
  email: "your-verified-studio-inbox@example.com",
  whatsapp: "", // Mayowa WhatsApp, digits only
  akandeWhatsapp: "", // Akande WhatsApp, digits only
  instagram: "https://instagram.com/your-verified-profile",
  facebook: "https://facebook.com/your-verified-profile",
  linkedin: "https://www.linkedin.com/in/mayowa-profile",
  akandeLinkedin: "https://www.linkedin.com/in/akande-profile",
  x: "https://x.com/your-verified-profile",
  formEndpoint: "https://your-domain.example/api/project-inquiry",
  availabilityLabel: "Project timing · ask us",
  budgetRanges: ["... editable options ..."]
};
```

The social profile URLs, studio email, Mayowa WhatsApp, and Akande WhatsApp are owner-supplied and configured in `site-config.js`. Keep `siteOrigin` blank until the final domain is verified; the UI renders only configured links. Update budget ranges to match the studio's current pricing context; the defaults are editable indicative ranges in NGN, not quotes or fixed pricing.

### Inquiry form: current behavior and production setup

This folder is static and contains **no email delivery service or backend**. With `formEndpoint` blank, the form validates the fields and downloads a plainly labelled `.txt` brief to the visitor's device. It explicitly tells them the brief was **not sent**. No form data is stored, transmitted, or emailed by the current build.

To receive enquiries:

1. Deploy a server-side/serverless endpoint on a service you control (for example a function on your hosting provider). Do not put API keys in this folder.
2. Have it accept a `POST` JSON object containing `name`, `email`, `company`, `projectType`, `budget`, `preferredContact`, `brief`, `source`, `pageUrl`, and `submittedAt`.
3. Validate and normalize every field server-side; enforce request-size limits and rate limiting; add spam protection; send mail through your chosen provider. Keep credentials such as `MAIL_API_KEY` and the verified destination `CONTACT_TO` in the provider's **server-side environment settings**.
4. Return a successful 2xx response only when the endpoint has accepted the enquiry. Configure appropriate CORS if the function is on another origin.
5. Put the public endpoint URL in `formEndpoint` in `assets/js/site-config.js`. That URL is public; secrets are not.
6. Update the on-page privacy text and your privacy notice to reflect the endpoint's actual storage, retention, and processing behavior.

If a configured endpoint cannot confirm receipt, the form reports the error and offers the visitor a local brief download rather than showing a false success message.

### Social sharing and domain

Set `siteOrigin` to the final HTTPS site root (include a trailing slash and any GitHub Pages subpath if applicable). The script then sets canonical and absolute social-image URLs. The HTML already contains Open Graph and X/Twitter metadata with the local `assets/img/og-cover.webp` fallback.

## Deploy to GitHub Pages

1. Upload the contents of this folder to the root of a repository.
2. Choose **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
3. Use a custom domain if desired, then set the exact HTTPS root in `site-config.js` and add the domain's DNS records.

The included `projects/elan-estates/` prototype is linked with a relative path, so it remains available under the same repository on GitHub Pages.

## Structure

```text
mayorkins-studio/
├── index.html
├── README.md
├── .nojekyll
├── assets/
│   ├── css/styles.css
│   ├── fonts/                  # local Space Grotesk + Inter WOFF2 variable fonts
│   ├── img/                    # supplied studio logo/mark, social cover, optimized imagery
│   │   └── work/               # local preview images for the past-works gallery
│   └── js/
│       ├── app.js              # theme, navigation, reveals, and form handling
│       └── site-config.js      # safe-to-publish contact/site settings; no secrets
└── projects/elan-estates/      # working, self-initiated multi-page concept prototype
```

## Notes

- Élan Estates imagery is generated for a visual concept. The gallery's WebP preview images accompany the supplied project links; each project card leads to its linked site.
- No third-party JavaScript, cookies, or tracking scripts are included. The theme choice is stored only in this browser’s `localStorage` under `mayorkins-theme`; it is not sent to a server.
- Core content, section anchors, and native service/FAQ disclosures remain available without JavaScript. The mobile navigation falls back to visible links; the inquiry submit stays disabled so personal details are never sent in a URL. With JavaScript, the form validates and prepares a clearly labelled local draft until a real endpoint is configured.
