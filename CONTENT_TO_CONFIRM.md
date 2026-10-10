# Content to confirm before publishing

Everything on the site is backed by a source (internship report, MP Maroc code, the earlier portfolio draft) or deliberately left generic. The items below are the only places where a fact is provisional, hidden, or needs Yassine's go-ahead. Each one points at the file to edit.

## 1. Contact and links — `src/content/site.ts`

| Item | Current state | What to do |
|---|---|---|
| Public email | Empty → the contact section only shows the LinkedIn button | Set `email` to the address to publish. The mailto CTA and the large email line appear automatically. |
| LinkedIn | `https://www.linkedin.com/in/madaniyassine/` (from the previous draft; LinkedIn blocks anonymous verification) | Open the URL, confirm it is yours, set `verified: true`. |
| GitHub | Hidden. The repository remote points at `github.com/melko-madani`, which looks like a work account, so it is not published automatically. | Add `{ label: 'GitHub', href: '…', verified: true }` with the account you want recruiters to see. |
| CV | None found → "Download CV" hidden | Drop a PDF in `public/cv/` and set `cvPath`. |
| Phone number | Present in the previous draft, intentionally **not** published | Decide whether a public phone number is wanted (not recommended). |
| Availability badge | Disabled | Set `availability.enabled: true` and adjust the label only if you want it displayed. |
| Site URL | Placeholder `https://yassinemadani.example` | Replace with the final domain (used for canonical, Open Graph and hreflang URLs), then run `npm run build`. |

## 2. Experience — `src/content/en/experience.ts`

| Entry | Confirmed | To confirm |
|---|---|---|
| Current role — "AI & Digital Solutions", Melko Énergie | Employer (internship report + work email); the description reuses the brief's wording | Official job title, start date, the exact responsibilities that may be published. The period is shown as "Current" until a date is given. |
| End-of-studies internship — AI Engineer, Melko Énergie, 2026 | Role, employer, project and academic year 2025/2026 (report) | Exact months of the internship. |
| Business Analyst | Only that the role existed (brief) | Organisation name, dates, publishable scope. Shown as "Earlier · Enterprise software context" until confirmed. |
| Employer names | Displayed (`showEmployerNames: true`) | Set to `false` to anonymise both Melko Énergie entries to "Energy and tax consultancy, France". |

## 3. Education — `src/content/en/experience.ts`

- Master's degree: wording taken from the brief and the report cover ("Master ISI", Université Hassan II, Faculté des Sciences Aïn Chock). Confirm the official title to display and the graduation year (shown as 2026).
- Licence professionnelle and DUT (EST Safi): no years available, so none are shown. Add `period` if you want them.
- SCILAB / leadership initiatives (brief, section I): nothing documented, so nothing is shown. Provide responsibilities and dates if this should appear.

## 4. Projects — `src/content/en/projects.ts`

**BTPExtract**
- Metrics come from the internship report. The abstract reports ≈ 89 % / 85.7 % (main suppliers / scanned invoices); the results chapter reports 98.6 % field accuracy on the final 39-invoice, 3-supplier corpus. The site shows the latter with its scope and the report's own caveats, and mentions the earlier 85–90 % range as estimates. Confirm which figure you want to lead with.
- "Monthly batch of ≈ 75 invoices: hours → minutes" is presented as reported by the team, not as a measurement. Remove it if you prefer.
- Production status: the tool was delivered to the company; whether it is still in daily use is not confirmed, so the status reads "End-of-studies internship project".
- Company name: shown, see `showEmployerNames` above.

**MP Maroc**
- Status set to "Personal project · in development" (code last touched October 2026). Confirm whether it is deployed at a public URL (none is linked) and whether anyone else contributed.
- Feature list was read from the current code (saved searches, alerts, member accounts, AI bid assistant). Remove anything you do not want to advertise yet.

**Real-time data pipeline**
- Taken from the previous portfolio draft. Confirm it was an academic project, your exact role, and the year if you want one shown.

**Talent Orchestrator**
- Only the brief's description exists. Confirm the hackathon name/date, your role, what was actually built (concept vs demonstrator), and whether a demo or repository can be linked.

**Visuals**
- All four project visuals are hand-built recreations with fictitious data. To replace one with a real screenshot, add the image to `public/images/projects/` and swap the branch in `src/components/visuals/ProjectVisual.tsx` for an `<img>` with alt text. Anonymise any real supplier, client or financial data first.

## 5. Story cards — `src/content/en/stories.ts`, `src/content/fr/stories.ts`

The five cards in the hero ("Who I am", "Safi to Casablanca", "The analyst detour", "Local first", "Measure, then ship") only restate facts already on the site, in a more personal voice. Please proofread the tone and tell me if you want different themes — the brief's leadership initiatives (SCILAB) could become a sixth card once documented.

## 6. Language

Both English (`/`) and French (`/fr`) versions are live and prerendered, with a working language switch. The French copy is a faithful translation of the English content with the same facts and caveats; please proofread it once (`src/content/fr/`), in particular the job titles (`Solutions IA & digitales`, `Ingénieur IA`) and the degree names, which follow the brief's wording.

There is no automatic language detection or redirect: visitors land on the language of the URL they open, and `x-default` points search engines to English. Say if you prefer French as the default.
