# Remisite Copy Overhaul Plan

Date: 2026-07-04
Status: proposed, awaiting Hunter review
Scope: every user-facing string on the site except the case-study markdown
files, which stay as templates for real cohort stories (Hunter, 2026-07-04).

## The anchor

**"Your business should run. It shouldn't run you."**

The one line that survives from the placeholder site, by decision. Everything
else on the page exists to earn that sentence.

## Principles (from the 2026-07-03 positioning decisions)

1. **The reader is the owner**, not the team. A 1-15 person service business
   where the owner is personally in the money loop. Every "your team" becomes
   "you" or "your business" unless the sentence is genuinely about staff.
2. **Teammate-first frame.** You hire Remi; you don't install her. The
   system-of-record claim (receipts, provenance, exportability) is the trust
   proof, not the lead. Price-vs-stack is the anchor, not the lead.
3. **The center of gravity: Remi is always watching the connected sources
   and speaks up first.** Every section either sets up or pays off that idea.
4. **The constants get named**: invoices, getting paid, customers, team,
   inventory/bills. This is the domain fluency section the site lacks.
5. **Meets you where you work.** iMessage, Slack, web are doors, not the
   product. Never mobile-first framing, never Slack-native framing.
6. **Claim discipline holds** (docs/copy-guidelines.md): prepares, drafts,
   proposes, flags, watches freely; sent/paid/done only with approval or
   receipt framing. Public copy says "runs your back office, with your
   approval on anything that leaves the building," never "runs your business
   for you" unqualified.
7. **Funnel is self-serve early access**, not sales-led. Primary CTA is
   early access / waitlist everywhere. "Book a Demo" is demoted or removed.
8. **No em dashes anywhere.** Periods, commas, colons. (Also fix the blog
   category separator.)
9. **No fabricated proof.** No fake-live metrics, no invented stats, no
   status indicators that aren't wired. Case-study files remain in the repo
   as templates; whether the homepage section renders before real cohort
   data exists is Hunter's call at launch.

## Page architecture (homepage, top to bottom)

| # | Section | Verdict |
|---|---------|---------|
| 1 | Meta/SEO | Rewrite |
| 2 | Announcement bar | Rewrite (early access) |
| 3 | Hero | Rewrite around the anchor line |
| 4 | Pinned headline ("work that follows you home") | Keep, retune task list |
| 5 | How it works (3 segments) | Rewrite as the onboarding arc |
| 6 | NEW: She speaks first | New section, the center |
| 7 | Why Remi table | Keep, add one money row |
| 8 | NEW: The constants | New section |
| 9 | Surfaces (iMessage/Slack/Web) | Keep, light retune |
| 10 | Features bento | Keep structure, retitle tiles |
| 11 | Product overview (communities/courses) | DELETE, template residue |
| 12 | Slider ("everything app") | DELETE or fold into bento |
| 13 | Remi vs tools | Keep, fix claim-discipline verbs |
| 14 | NEW: On the record (trust) | New section |
| 15 | Integrations marquee | Rewrite honestly |
| 16 | Metrics ticker | Reframe (no fake-live) |
| 17 | Case studies section | Files stay; publish state = Hunter's call |
| 18 | News/blog | Keep |
| 19 | FAQ | Full rewrite (8 new Qs) |
| 20 | Email CTA | Rewrite to early access |
| 21 | Footer | Retune links + tagline stays |

Solutions pages and nav: prune to beachhead + adjacent ring. Remove
Mid-Market. Remove Healthcare. Keep: Agencies & Studios, Consulting,
Recruiting, Home Services, Construction, Real Estate/Property Management,
Retail & Wholesale. "Startups" folds into Agencies & Studios framing or is
cut.

## Section-by-section copy

### 1. Meta/SEO

- Title: `Remi | The teammate who runs your back office`
- Description: `Remi is a teammate you hire over text. She watches your
  inbox, invoices, and customers, and speaks up before you ask. Your
  business should run. It shouldn't run you.`
- OG/Twitter mirror the same. Drop "AI-powered"; "AI" appears once at most
  ("AI teammate" acceptable in OG copy if needed for search intent).
- LD+JSON description matches meta description.

### 2. Announcement bar

- Default: `Remi opens for early access July 2026. Join the list.`
- Links to the qualify/waitlist flow, not the blog, until launch week.

### 3. Hero

- H1: `Your business should run. It shouldn't run you.`
- Subhead: `Remi is a teammate you hire over text. She watches your inbox,
  your invoices, and your customers, and she speaks up before you have to
  ask.`
- Primary CTA: `Get Early Access`
- Secondary CTA: `See how she works` (anchor scroll to How It Works)
- Floating chips, rebalanced toward the constants (keep the visual):
  - `Who still owes us?`
  - `Chase the Patterson invoice`
  - `What did we quote them last spring?`
  - `How's the Maple St job doing?`
  - `Prep me for the 9am walkthrough`
  - `Draft the wholesale invoices`
  - `receipt-photo.jpg`
  - `voice-note.m4a`
  - `What's slipping this week?`
  - `Draft the client follow-up`
  - `Prep for my 2pm`
  - `Summarize what changed today`
  - Keep 4-6 of the existing ops chips; cut CRM/board-minutes/pipeline-export
    enterprise flavor.

### 4. Pinned headline

- Keep: `Remi takes care of the work that follows you home.`
- Task list becomes: `Invoice chasing` / `Estimate follow-ups` /
  `Customer context` / `The morning brief` / `Supplier bills`
- Image alts: replace "sales teams / accounting teams / fashion designers"
  set with beachhead-plus-ring set (agency owner, consultant, contractor,
  home services, bakery/wholesale).

### 5. How it works (the onboarding arc, three segments)

Segment 1, heading: `She starts with your inbox.`
Body: `Connect Gmail and Remi gets to work in the background: unpaid
invoices, threads you dropped, leads going quiet. The first time she flags
one, you'll wonder what else she's seen.`

Segment 2, heading: `She learns how your business actually runs.`
Body: `Connect more of your tools and Remi builds a living picture: your
customers, your jobs, your prices, your promises. Then she checks in.
Here's what I know. Here's where I can help most. Here's what I'm starting
on.`

Segment 3, heading: `Then she speaks up first.`
Body: `A morning text with what's due, who owes you, and what's going
quiet. When something needs doing, she proposes it and waits for your
go-ahead. A thumbs-up is enough. Everything she does goes on the record.`

(Removes the current em dash in segment 1's body. "She scans every tool"
copy is superseded.)

### 6. NEW: She speaks first (the center section)

- H2: `You don't prompt Remi. She's already looking.`
- Body: `Your business doesn't happen in an app. It happens in email and
  messages, in bills that arrive and invoices that age. Remi watches the
  sources you connect and raises her hand when something matters: an
  invoice hits 30 days, a lead goes cold, a supplier bill lands. Never a
  silent send. Always your call.`
- Visual: the morning brief as an iMessage/Slack message mock (real product
  formatting, no invented customer data).

### 7. Why Remi table

Keep everything. Add one row:

- Label: `Getting paid`
- Usual: `You notice the unpaid invoice when cash gets tight.`
- Remi: `Remi watches due dates and asks one question: want me to nudge
  them?`

CTA under table becomes `Get Early Access`.

### 8. NEW: The constants

- H2: `Fluent in the things every business runs on.`
- Five tiles:
  - **Invoices**: `Drafted, tracked, and chased when they age. You approve
    every nudge before it goes out.`
  - **Getting paid**: `Who owes what, what's overdue, what came in. One
    question away, any hour.`
  - **Customers**: `Every promise, preference, and conversation, kept
    together and kept current.`
  - **Your team**: `Who's waiting on what, and which handoff is quietly
    stuck.`
  - **Bills and supplies**: `A supplier invoice in your inbox becomes a due
    date on your radar.`

### 9. Surfaces

Keep the section and structure. Retitle:

- H2 line 1: `Wherever the day starts to pile up,` (keep)
- H2 line 2: `Remi keeps it moving.` (keep)
- iMessage copy: keep current.
- Slack copy: keep current.
- Web copy, small fix: `Open the full view when you want everything in one
  place: customers, jobs, money, files, and the record of what Remi's done.`
- Add a one-line kicker under the three: `Remi meets you where you work.
  Same teammate, same memory, every surface.`

### 10. Features bento

Keep the layout. Retitle tiles to kill Slack-first and team-first framing:

- `Powerful Slack agent` becomes `Works where you work` (modal: `iMessage,
  Slack, and the web. Same Remi, same memory.`)
- `Sync knowledge from any tool` stays.
- `Shared memory system` becomes `A memory that compounds` (modal: `Remi
  organizes what she learns into a living picture of your business, with
  every fact tied to its source.`)
- `Collaborative documents` stays; modal line `Remi doesn't just answer.
  She delivers.` stays (it's good).

### 11-12. DELETE

- Product overview section (communities, courses, members, branded space):
  template residue from another product. Remove entirely.
- Slider section (`One platform to operate your service business` / `the
  everything app`): remove, or keep the visual with bento copy. "Everything
  app" language is banned going forward.

### 13. Remi vs tools

Keep the concept and competitor set. Fix execution verbs to claim
discipline:

- Meeting follow-ups / Remi: `Remi creates the tasks, drafts the
  follow-ups, proposes the CRM update, and keeps tracking what's still
  open. You approve what goes out.`
- Client status updates / Remi: keep (`drafts... routes` is fine), change
  `routes it to the right people` to `readies it for your review`.
- Recurring operations / Remi: keep.
- Finding business context / Remi: keep.
- Support ticket triage / Remi: `Remi reads the ticket, checks the history,
  drafts the reply, and keeps the deadline visible. You send it.`
- Proposal prep / Remi: keep (`a proposal your team can actually send` is
  the right side of the line).

### 14. NEW: On the record

- H2: `On the record. Every time.`
- Bullets:
  - `Nothing leaves the building without your yes. External sends always
    wait for approval. A thumbs-up counts.`
  - `Every action carries a receipt: what she did, when, and why, with the
    source attached.`
  - `Ask where a number came from and she shows you.`
  - `Your records are yours: exportable, correctable, accountant-ready.`
- One-line kicker: `This is what makes hiring an AI teammate reasonable.`

### 15. Integrations marquee

- H2: `Connected to where your business already happens.`
- Sub: `Native and deep:` Gmail, Google Calendar, Google Drive, Slack,
  iMessage.
- Second row: `Plus the tools your business runs on, through Remi's
  connected catalog.` (Show catalog logos here only if the connection is
  real today; QuickBooks/Stripe/Square logos wait until the curated money
  integrations ship.)
- Footer "Remi in X" pages: keep iMessage, Slack, Gmail. Remove Salesforce,
  HubSpot, Zoom, Stripe, Shopify until real, dedicated surface exists.

### 16. Metrics ticker

Remove the fake-live framing (`Kept visible by Remi today:`). Two options:

- Option A (launch-safe): reframe as capability strip, `What Remi keeps
  visible:` with the same items, no implied counts.
- Option B (post-launch): wire to true aggregate workspace counts once the
  cohort exists, with the receipts to back them.

Ship A now, upgrade to B when real.

### 17. Case studies

Per Hunter (2026-07-04): the four markdown files stay as templates for real
cohort stories. No copy edits in this pass. Publish-state note: whether the
homepage section renders these before real data replaces the placeholder
stats and quotes is Hunter's launch-week call; the template quality is
good and the swap will be fast once cohort receipts exist.

### 19. FAQ (full rewrite, owner-voiced)

1. `What can Remi do without me?` Watch connected sources, learn, prepare,
   draft, and flag on her own. Anything that leaves the building (an email,
   a nudge, an invoice) waits for your approval. That boundary never
   loosens.
2. `How does Remi learn my business?` From the sources you connect and the
   conversations you have. She builds a picture of your customers, jobs,
   prices, and promises, and every fact stays tied to where it came from.
3. `Do I have to use iMessage? Or Slack?` No. Remi meets you where you
   work: text her, Slack her, or use the web. Same teammate, same memory.
4. `Is my data safe?` Your workspace is isolated, connections are
   encrypted, and Remi only uses what you've connected. Every action she
   takes is logged with a receipt you can review.
5. `Which tools does Remi connect to?` Gmail, Google Calendar, Google
   Drive, Slack, and iMessage natively, plus a connected catalog for the
   tools your business already runs on.
6. `What does early access cost?` [GATED: exact copy waits on the
   pricing-capacity eval per the pricing non-regression rules. Placeholder
   posture: starts at $49/month billed annually; the trial does real work
   before your first charge.]
7. `What happens in the trial?` Connect your inbox and Remi starts working:
   finding what's slipping, learning your business, doing approved starter
   tasks. You see the value before the first charge, and the checkout says
   exactly when and what that charge is.
8. `Which AI models does Remi use?` Remi picks the right model for each
   job and records which model did what. You buy outcomes, not a model
   menu. [Data-use sentence added only once the provider terms language is
   verified.]

Delete all member/course/enterprise-SSO residue from current answers.

### 20. Email CTA section

- H2 line 1: `Ready to hand off the second job?`
- H2 line 2: `Remi's taking early access sign-ups now.`
- Form CTA: `Get Early Access`

### 21. Footer

- Tagline stays: `AI tools answer questions. Operations need
  follow-through.`
- Footer CTA: `Get Early Access` (replaces Book a Demo)
- Byline stays: `With love from Chicago, USA.`
- Use-case links: keep, retitle `Client status updates` to `Customer
  updates`.
- Status dot: remove until wired to a real status source.

## Funnel and forms

### CTA architecture (site-wide)

- Primary everywhere: `Get Early Access` -> qualify flow -> waitlist with
  position/skip-ahead mechanics.
- `Book a Demo` removed from header and footer. (If a demo path survives
  anywhere, it lives on a future Business-tier page, not the main funnel.)
- `Login` stays.

### Qualify flow (rebuild as the waitlist qualifier)

Heading: `Let's see what Remi can take off your plate.`
Sub: `A few quick questions. They also move you up the list.`

Fields:
- Email, first/last name (keep).
- `What kind of business do you run?` (replaces role dropdown): Agency or
  studio / Consulting / Recruiting / Home services or trades /
  Construction / Property management / Retail, food, or wholesale / Other.
  (This feeds the 70/30 cohort targeting and segment-tagged telemetry.)
- `How many people?` Just me / 2-10 / 11-25 / 26-50 / More than 50.
  (Replaces the 1001+ enterprise ladder.)
- `What's eating your evenings?` (optional, free text; replaces nothing,
  adds qualitative gold for onboarding.)
- `How did you hear about us?` (keep, optional.)
- Submit: `Join Early Access`

Post-submit copy: confirm position, name the skip-ahead: `Want in sooner?
Connect your inbox when your invite arrives, and you're at the front of
the batch.` (Exact skip-ahead mechanics per the launch plan; do not promise
the inbox-audit product on the site until that decision is ratified.)

### Book-a-demo modal

Retire with the CTA change. Role and 501+ size dropdowns go with it.

## Guidelines docs (same PR)

- `docs/remi-guidelines.md` Canonical Positioning section: rewrite to
  owner-first small business (the constants, always-watching, speaks-first,
  meets-you-where-you-work, owner-not-team). Client-service teams become
  one audience, not the definition.
- `docs/copy-guidelines.md`: update Audience Language to owner-first;
  add the anchor line to Homepage patterns; add the reconciled identity
  rule: "runs your back office, with your approval on anything that leaves
  the building" is approved; "runs your business for you" unqualified stays
  banned. Add the no-em-dash rule to Writing Rules.

## Dependencies and gates

- Pricing copy (FAQ #6, any pricing page): gated on the pricing-capacity
  eval per the pricing decision ledger's non-regression rules. No credit
  numbers on the site until it passes.
- Inbox-audit funnel copy: gated on ratifying that mechanism (grill log
  O6 in the remi repo).
- Integration logos for QuickBooks/Stripe/Square: gated on the curated
  money-stack integrations shipping (PRD R2.6).
- Real metrics (ticker option B) and real case studies: gated on cohort
  receipts.

## Out of scope for this pass

- Case-study markdown files (kept as templates, untouched).
- Blog posts (the private-beta post gets superseded by an early-access
  post at launch; separate writing task).
- Visual/motion design, imagery, and the video asset.
- Solutions page body copy (the pruned nav list above defines which pages
  survive; their body copy is a follow-up pass once the homepage lands).
