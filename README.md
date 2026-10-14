# KOMU website redesign: source code

Redesign of the Kingsley Ozumba Mbadiwe University (KOMU), Ideato website. A static site in plain HTML, CSS and JavaScript, with no framework and nothing to install for the site itself.

Live preview: https://komu-redesign.vercel.app

## Pages

| Page | File | Contents |
|---|---|---|
| Main page | `index.html` | Hero slider (campus film + featured slides), key figures, Start here (applicant / student / graduate / staff links, incl. transcripts), principal officers, latest 8 news stories, upcoming event and public lecture series, about (vision, mission, charter, core values, history) |
| Academics | `academics.html` | Faculty and course explorer (UTME subjects, O’Level requirements, cut-offs), research and innovation |
| Admissions | `admissions.html` | Eligibility checker, programme routes (Undergraduate, JUPEB, IJMB, ICEP), how to apply, key dates |
| News & events | `news.html` | All stories with category filters and search, archive grouped by year |
| Gallery | `gallery.html` | Photos and the campus film, with filters and a full-screen viewer |
| Contact | `contact.html` | Address, phone, email, map, message form, quick answers |

## Folder structure

```
build-komu.py            builds the pages (Python 3, standard library only)
komu-redesign/
  src/layout.html        shared header, menu, event notice, footer and pop-up panels
  src/index.html …       the body of each page (one file per page)
  styles.css             all styles, including dark mode
  site.js                all behaviour, plus programme, officer, lecture and gallery data
  news-data.js           every news story (newest first)
  images/, assets/       photos, the hero video and its poster
  *.html                 GENERATED pages: do not edit these directly
  .vercelignore          keeps src/ out of the published site
```

## Making changes

1. Edit `komu-redesign/src/*.html`, `styles.css`, `site.js` or `news-data.js`.
2. From the folder that contains `build-komu.py`, run:

   ```
   python build-komu.py
   ```

   This combines the shared layout with each page body, marks the current page in the menu and stamps `?v=` version tags on the CSS and JS so browsers always load the latest files.

Other build options:

- `python build-komu.py zip` writes `KOMU-Website-Redesign.zip`, a copy that opens by double-clicking `index.html`, even offline (fonts are embedded).
- `python build-komu.py source` writes this source package.

## Common edits

- **Publish a news story:** add an entry at the top of the list in `news-data.js` (`id`, `cat`, `date`, `title`, `by`, `img`, `sum`, `body`). The main page shows the latest 8 and links to the News page when there are more. `cat` must be one of Admissions, Leadership, Academics, Partnerships or Campus. `body` is a list of `["p", text]`, `["li", text]` or `["h", text]` blocks.
- **Programmes and cut-offs:** `FAC` (faculties), `PD` (UTME subjects, O’Level requirements, career directions) and `CUT` (cut-offs above 150) in `site.js`.
- **Admission routes, fees and links:** `PROG` in `site.js`.
- **Principal officers and biographies:** `OFF` and `VC_BIO` in `site.js`. Photos live in `images/principal-officers/`.
- **Public lectures and the upcoming event:** `LECT` and `EVENT_AT` in `site.js`. The event text is in `src/index.html` and the notice bar in `src/layout.html`.
- **Start here links:** `PER` in `site.js`. **Quick answers:** `FAQ` in `site.js`. **Gallery:** `GAL` in `site.js`.
- **Menu, footer and notice bar:** `src/layout.html` (the Academics and Admissions menus are filled from `FAC` and `PROG`).

## Hosting

Any static host works. Upload the contents of `komu-redesign/` (everything except `src/`). Pages link to each other with relative URLs, so the site also works from a sub-folder.

The preview is on Vercel. To deploy there, from inside `komu-redesign/`:

```
npx vercel deploy --prod
```

## Before going live

- **Search engines:** every page has `<meta name="robots" content="noindex, nofollow">` (in `src/layout.html`) so the preview is not indexed. Remove it for the production site.
- **Contact form:** it opens the visitor's email app addressed to admin@komu.edu.ng. To send messages from the page itself, connect it to a form or mail service.
- **Portals:** the student portal, staff portal, e-learning, e-library, application forms, admission lists and transcript forms link to the existing systems on komu.edu.ng and its subdomains.
- **Content to confirm with the University:**
  - lecture poster spellings ("Nwajuba", "Oguejofor", "Our Ilgwis")
  - the 15th lecture, dated October 2025 on the poster but 21 October 2026 on the event
  - JUPEB entry requirements, which come from the 2025/2026 instructions
  - whether IJMB registration has reopened after the 20 August 2026 deadline
- **News archive:** stories were imported from komu.edu.ng in October 2026. Most older stories have no photo because their images are missing on the current site. The 2024/2025 first merit list story does not republish candidates' names or JAMB registration numbers.

## Design system

- **Colours:** navy and gold, taken from the University crest, with automatic dark mode (`prefers-color-scheme`).
- **Typefaces:** Literata (headings) and Public Sans (text), both from Google Fonts under the SIL Open Font License.
- **Icons:** inline SVG, drawn for this site.
- **Motion:** respects the visitor's reduced-motion setting.
- **Accessibility:** keyboard navigation and visible focus states throughout.
