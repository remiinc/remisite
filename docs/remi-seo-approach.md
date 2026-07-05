# REMI SEO Approach

Date: 2026-07-05
Status: approved direction (Hunter + Claude session)
Owner: Hunter
Scope: blog, SEO, and AEO for remisite. One plan file, everything in here.

## The Posture

Lassie's rifle, not Viktor's shotgun.

Lassie (lassie.ai/blog) publishes ~11 posts, every one shaped as *specific
software + specific hated task* ("How to Post EOBs in Dentrix Faster"). Tiny
volume, near-100% buyer intent, no generalist competition. They intercept a
workflow at the moment of pain.

Viktor (viktor.com/blog) publishes 100+ posts at near-daily peak velocity:
category definitions ("What Is an AI Employee?"), comparison/alternatives
pages, role-specific use cases. That is a funded land-grab for the horizontal
category shelf.

Remi does not fight the category war. The category shelf is the contested
middle, and whoever defines "AI employee" in the answer engines is whoever
spends the most. Remi's equivalent of "Dentrix EOB posting" is **the money
content**: the questions an owner asks the night somebody hasn't paid them.
Those queries are high intent, evergreen, wound-matched to the landing page,
and asked to ChatGPT constantly, which makes SEO and AEO the same play.

Every post ends the Lassie way: here is the manual method in full (genuinely
useful, no bait), and here is Remi doing it for you.

## Standing Rules (apply to every post)

- Claim discipline per `docs/copy-guidelines.md`: prepares, drafts, proposes,
  flags, watches freely; sent/paid/done only with approval or receipt
  framing. No invented savings, no fake customers, no fabricated metrics.
- Stats only from the sourced stats bank (Day One positioning doc) or newly
  sourced primary data, always with the source named: $17.5k average unpaid
  invoices (QuickBooks 2025), 47% of invoices 30+ days past due, 2/3 of
  contractors paid late (Built 2025), ~$39k/yr late-payment cost, 78% hire
  whoever responds first.
- Owner-first voice. The reader is the person who does the work AND chases
  the money. No "your team" unless the post is genuinely about staff.
- No em dashes. Specifics over adjectives.
- AI is disclosed, never led with. Posts sell getting paid, not AI.

## Workstream 0: Technical Foundation (blocks everything)

remisite is a plain Vite/Vue SPA (`vite build`, no SSG). Client-rendered blog
posts are invisible to crawlers and answer engines; without prerendering the
whole strategy is dead on arrival. This ships before content volume does.

1. **Prerender the blog** (and ideally all marketing routes): vite-ssg or
   equivalent static generation. Acceptance: `view-source` on a post URL
   shows the full article HTML with no JS execution.
2. **sitemap.xml + RSS feed**, generated at build from `src/content/blog/`.
3. **Schema**: Article (headline, author, datePublished, dateModified) on
   every post; FAQPage schema on posts with Q&A sections; Organization
   schema sitewide (exists in index.html, verify it survives prerender).
4. **Canonicals, OG tags, clean stable URLs** (`/blog/slug`, no dates in
   URLs so refreshes don't break links).
5. **llms.txt** at the root: site summary + links to the cornerstone posts
   and key pages in clean markdown.
6. **Indexing plumbing**: Google Search Console + Bing Webmaster Tools
   (Bing's index feeds ChatGPT browsing). Submit sitemap to both.
7. **Author entity**: real byline (Hunter, founder) with a person page and
   sameAs links (X, LinkedIn). E-E-A-T for a YMYL-adjacent money topic
   depends on a real human being on the page.

## Content Clusters

### Cluster 1: Getting Paid (the core, ~50% of effort)

The AR wound: unpaid invoices, late payers, awkward chasing, payment terms,
deposits, late fees. The reader is in the exact state the landing page
targets. Highest volume of any cluster, and the cluster answer engines get
asked about most.

### Cluster 2: Quotes That Die From Silence (~15%)

Estimate follow-up cadence, response speed, quote-to-job conversion. Happier
emotion than collections (money won, not recovered) and carries the 78%/21x
speed stats.

### Cluster 3: Tool-Adjacent Long Tail (the literal Dentrix move, ~15%)

Specific software + specific task for the tools our buyers already run:
QuickBooks Online, Jobber, Housecall Pro, Joist, Buildertrend, HoneyBook,
FreshBooks. "How to send automatic invoice reminders in QuickBooks Online."
Small volume, pure intent, seeds both clocks (agency tools now, trade tools
for the fall probe). Honest posts: what the tool does, what it won't do,
where Remi picks up.

### Cluster 4: Templates and Artifacts (~10%)

Copy-paste reminder emails, change-order confirmation texts, deposit-request
scripts, a weekly money-review checklist. Extractable artifacts are what
answer engines quote and what earns links. Each template demos Remi's actual
drafting voice.

### Cluster 5: Comparisons (thin by design, ~10%)

Five to ten pages, no more. "Remi vs hiring a part-time office manager" and
"AI employee vs virtual assistant" matter more than tool-vs-tool pages for
our buyer, but a small honest set of "vs Lindy / vs Viktor / alternatives"
pages exists so third parties don't define Remi for us. Viktor's "honest
comparison" framing is the model.

### Cluster 6: Original Data (post-cohort, the long game)

Once real customers produce aggregate data: "The Late Payment Report" as an
annual, sourced, citable artifact. Becoming the source of the stat, instead
of citing QuickBooks forever, is the single strongest AEO asset available.
Parked until cohort data exists; never fabricated.

## First 20 Titles

Getting Paid (core):

1. How to Follow Up on an Unpaid Invoice Without Losing the Client
2. 7 Late Payment Reminder Templates That Get Small Businesses Paid (Copy and Paste)
3. What to Do When a Client Won't Pay: A Step-by-Step Playbook
4. How to Charge Late Fees Without Burning the Relationship
5. Net 30 vs Due on Receipt: Which Payment Terms Get You Paid Faster?
6. Why Clients Pay Late, and the Follow-Up Cadence That Fixes It
7. How to Ask for a Deposit Before Starting Work (Scripts Included)
8. Late Payments Cost the Average Small Business About $39,000 a Year. Here's the Math.

Quotes:

9. Estimate Follow-Up: How Soon, How Often, and What to Say (Templates Included)
10. 78% of Customers Hire Whoever Responds First. Here's How to Always Be First.

Tool long tail:

11. How to Send Automatic Invoice Reminders in QuickBooks Online (2026)
12. Jobber Follow-Ups: Automating Estimate and Invoice Chasing (and Where It Stops)
13. Housecall Pro Payment Reminders: Setup, Limits, and Workarounds
14. How to Keep Change Orders in Writing (Text, Email, and What Holds Up in a Dispute)

Templates:

15. The Change Order Confirmation Text Every Contractor Should Send
16. The 15-Minute Friday Money Review for Owner-Run Businesses (Checklist)

Comparisons:

17. Remi vs Hiring a Part-Time Office Manager: What $199 a Month Actually Buys
18. Remi vs Lindy vs Viktor: An Honest 2026 Comparison
19. AI Employee vs Virtual Assistant: Which Should an Owner-Run Business Hire?

Definitional (the one category page we do own):

20. What Is an AI Back Office? A Plain-English Guide for Business Owners

Title conventions: year-stamp comparison and tool posts ("2026"), refresh
annually in place at the same URL. Question-shaped titles wherever the query
is question-shaped.

## AEO Page Pattern (every post follows it)

- H1 matches the query. First 40-80 words answer it directly, no wind-up.
  That block is what ChatGPT, Perplexity, and AI Overviews extract.
- Question-shaped H2s, each followed by its own direct answer, then depth.
- Real HTML tables for anything comparative (terms, fees, tools, plans).
- Numbered steps for any how-to (procedure extraction).
- A short FAQ section at the bottom (3-5 questions) with FAQPage schema.
- Named specifics over generalities: real tool names, real dollar figures
  with sources, dated claims.
- Every stat linked to its source. Every template downloadable/copyable.
- Visible datePublished and dateModified; refresh cornerstone posts
  quarterly.

## Distribution (where answer engines learn)

Answer engines retrieve from where discussion happens, not just from
publishers. Lightweight, genuine-participation-only:

- Reddit: r/smallbusiness, r/sweatystartup, r/Contractor, r/freelance
  threads about deadbeat clients and unpaid invoices. Helpful answers,
  template shared inline, link only when it genuinely helps.
- The two announcement/product posts syndicated to LinkedIn + X (Hunter's
  accounts; founder entity building).
- Industry newsletters and trade association content later, aligned with
  the fall trade probe.
- No paid link building, no guest-post farms, ever.

## Cadence and Ops

- **Pre-launch (now to 2026-07-17):** Workstream 0 plus 5 cornerstone posts
  only (titles 1, 2, 9, 17, 20). Nothing here competes with launch
  execution.
- **Post-launch:** factory-shaped workload. Agents draft against this plan
  (cluster, title, target query, page pattern, standing rules in every
  ticket); Hunter does the voice pass and publishes. Target 3-4 posts/week
  until the 20 are live, then steady state 1-2/week plus quarterly
  refreshes.
- Blog stays markdown-in-repo (`src/content/blog/`). No CMS until pain.

## Measurement

- GSC + Bing: impressions and clicks per cluster, monthly.
- AEO spot-check: monthly, ask ChatGPT/Perplexity/Gemini the 10 core
  questions (title 1-10 queries) and record whether Remi is cited; track
  citation share over time.
- Attribution: "How did you hear about us" free-text field already in the
  qualify flow; watch for blog/search/AI mentions.
- Kill criteria: a cluster that produces zero impressions growth and zero
  citations after 90 days and 8+ posts gets paused, not padded.

## Explicitly Out

- The horizontal category war ("What is agentic AI" volume play).
- Fabricated stats, fake case studies, invented customer savings.
- Paid links, programmatic thin pages, AI-slop volume without the voice
  pass.
- Original-data reports before real cohort data exists.
- Any post that leads with AI instead of the money.
