# REMI SEO Approach

Date: 2026-07-05 (v2, updated same day against current AEO/SEO research; see Research Basis at the bottom)
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
category definitions, comparison/alternatives pages, role-specific use
cases. That is a funded land-grab for the horizontal category shelf.

Remi does not fight the category war. Remi's equivalent of "Dentrix EOB
posting" is **the money content**: the questions an owner asks the night
somebody hasn't paid them. Those queries are high intent, evergreen,
wound-matched to the landing page, and asked to ChatGPT constantly, which
makes SEO and AEO the same play.

One strategic update from the research: **owned content is only half the
game.** Roughly 85% of brand mentions in AI answers come from third-party
pages, not the brand's own site, and neutral third-party listicles are the
single most-cited format (~22% of all citations; in professional services,
third-party comparisons captured ~81% of citations vs ~19% for
brand-authored ones). So this plan has two engines: the blog (owned answers)
and corroboration (getting named by others). Both are required; neither
substitutes for the other.

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
   Marked-up content shows ~2.5x higher odds of appearing in AI answers.
4. **Canonicals, OG tags, clean stable URLs** (`/blog/slug`, no dates in
   URLs so refreshes don't break links).
5. **AI crawler access policy (robots.txt + CDN check).** Explicitly allow
   the *search and user-fetch* agents: `OAI-SearchBot`, `ChatGPT-User`,
   `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`,
   plus `Googlebot` and `Bingbot`. Separately decide the *training* bots
   (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`): allowing them helps
   long-term model-memory presence, blocking them is a legitimate IP
   stance; Hunter's call, default allow for a marketing site. CRITICAL:
   verify the CDN/WAF layer is not silently blocking these bots. Roughly a
   quarter of B2B SaaS sites accidentally block major LLM crawlers at the
   CDN even with a permissive robots.txt. Acceptance: fetch key pages as
   each user-agent and confirm 200 + full HTML.
6. **Indexing plumbing**: Google Search Console + **Bing Webmaster Tools**.
   Bing is non-negotiable: ChatGPT's live web search is Bing-powered, so
   Bing indexation is a prerequisite for ChatGPT citations. Submit sitemap
   to both; use IndexNow for fast Bing pickup.
7. **Author entity**: real byline (Hunter, founder) with a person page,
   detailed bio, LinkedIn/X sameAs links, and real outcomes referenced.
   E-E-A-T for a money topic depends on a real human on the page.
8. **llms.txt: optional, five minutes, no expectations.** Research verdict:
   no measurable citation effect on any major answer surface; Google is on
   record not supporting it; observed bot traffic to it is negligible. Ship
   one because it is nearly free and coding agents/docs tools do read it,
   but it is not a foundation item and gets zero ongoing effort.

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
pages exists so the queries have an owned answer. Expectation set by the
research: self-authored comparisons earn a minority of citations; the
third-party corroboration workstream below is what actually wins the
"best/alternatives" queries. Our pages exist to convert the click, not to
win the citation.

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

- H1 matches the query. The first 150-200 words answer it directly, no
  wind-up, with the extractable core in the first 40-80. That block is what
  ChatGPT, Perplexity, and AI Overviews lift.
- Question-shaped H2s, each followed by its own 1-2 sentence direct answer,
  then depth. Engines evaluate sections by their opening sentences.
- **The Princeton GEO trio on every post:** at least one named expert or
  practitioner quote (real ones only; Hunter counts, cohort customers count
  with permission), sourced statistics, and citations to external sources.
  Measured visibility lift in the GEO study: quotes ~+41%, stats ~+30%,
  cited sources ~+30%.
- Real HTML tables for anything comparative (terms, fees, tools, plans).
- Numbered steps for any how-to (procedure extraction).
- A short FAQ section at the bottom (3-5 questions) with FAQPage schema.
- Named specifics over generalities: real tool names, real dollar figures
  with sources, dated claims.
- Every stat linked to its source. Every template copyable.
- Visible datePublished and dateModified; refresh cornerstone posts
  quarterly. Perplexity weights freshness heavily.

## Platform Mechanics (what the engines actually do, mid-2026)

- **ChatGPT:** live search runs on Bing; expect a 4-8 week lag between
  publication and citability. Implication: cornerstone posts must be live
  and Bing-indexed well before we want them cited, i.e. now-ish for launch.
- **Perplexity:** fastest indexation (1-2 weeks), heavy freshness and
  community weighting; cites Reddit in nearly half of answers.
- **Google AI Overviews / AI Mode:** citation is decoupling from rank
  (top-10 overlap fell from ~76% to ~17-38% by early 2026), so snippable
  structure and schema matter more than position. AI Mode is ~93%
  zero-click; the click is not the KPI there, the citation is.
- **Reddit is ~40% of all AI citations across engines.** It is the single
  most-cited domain. This moves Reddit from "distribution nice-to-have" to
  a first-class channel (below).

## Third-Party Corroboration (the second engine)

LLMs trust consensus: a brand mentioned across independent pages beats a
brand that only talks about itself. Co-occurrence with competitors on
neutral lists is how models learn Remi belongs in the answer set for
"best AI for small business back office." Workstream:

1. **Review platforms:** live G2, Capterra, and Product Hunt profiles at
   launch; early-cohort customers asked for reviews at receipt-verified win
   moments (consistent with the referral playbook).
2. **Listicle outreach:** the "best AI assistant / Viktor alternatives /
   Lindy alternatives" pages already ranking (e.g. Vellum's) get a short,
   factual pitch to include Remi. Neutral third-party lists are the
   most-cited format in AI answers; being absent from them is being absent
   from the answer.
3. **Reddit, done honestly:** genuine participation in r/smallbusiness,
   r/sweatystartup, r/Contractor, r/freelance threads about deadbeat
   clients and unpaid invoices. Real answers, templates shared inline,
   Remi mentioned only where it genuinely fits, founder account with real
   identity. No astroturfing, no sockpuppets, ever. One good answer in a
   thread that ranks is worth more than ten blog posts for Perplexity.
4. **Podcasts/newsletters in the owner-operator niche** (later, aligned
   with the fall trade probe): each appearance is a third-party page that
   corroborates the entity.
5. **Founder syndication:** announcement/product posts adapted to Hunter's
   LinkedIn + X; builds the author entity the blog's E-E-A-T leans on.

## Distribution note

No paid link building, no guest-post farms, ever. Corroboration must be
real or it poisons the well.

## Cadence and Ops

- **Pre-launch (now to 2026-07-17):** Workstream 0, the crawler/CDN audit,
  and the 5 cornerstone posts (titles 1, 2, 9, 17, 20) published and
  submitted to Bing + GSC immediately. The ChatGPT citation lag (4-8 weeks)
  means content shipped today becomes citable in August; there is no way to
  shortcut this, so the clock starts now. Review-platform profiles created.
  Nothing here competes with launch execution.
- **Post-launch:** factory-shaped workload. Agents draft against this plan
  (cluster, title, target query, page pattern, standing rules in every
  ticket); Hunter does the voice pass and publishes. Target 3-4 posts/week
  until the 20 are live, then steady state 1-2/week plus quarterly
  refreshes and listicle outreach.
- Blog stays markdown-in-repo (`src/content/blog/`). No CMS until pain.

## Measurement

- **Weekly citation audit (the primary KPI):** run the 20 core queries
  (titles 1-20 as questions) across ChatGPT, Perplexity, Google AI
  Overviews, and Claude; record cited/mentioned/absent per query. Track
  citation share over time, not traffic. Start manual (an agent can run
  this); adopt a tool (Profound, ZipTie, Semrush AI toolkit, Ahrefs Brand
  Radar) when manual gets old.
- Watch for **ghost citations** (our content cited without the Remi name):
  fix by putting the brand in the answerable block, not just the byline.
- GSC + Bing Webmaster: impressions and clicks per cluster, monthly. Expect
  depressed CTRs on AIO-covered queries (organic CTR drops ~35-60% when an
  AI Overview is present); judge clusters on citations + high-intent
  conversions, not raw clicks.
- Attribution: "How did you hear about us" free-text field already in the
  qualify flow; watch for blog/search/AI mentions.
- **Expectation setting:** measurable AEO progress typically takes 3-6
  months of consistent publishing. The kill criterion respects that:
  a cluster that produces zero impressions growth and zero citations after
  90 days and 8+ posts gets paused, not padded.

## Explicitly Out

- The horizontal category war ("What is agentic AI" volume play).
- Fabricated stats, fake case studies, invented customer savings.
- Paid links, programmatic thin pages, AI-slop volume without the voice
  pass.
- Astroturfed Reddit/forum activity of any kind.
- Original-data reports before real cohort data exists.
- llms.txt as a strategy (ship it, forget it).
- Any post that leads with AI instead of the money.

## Research Basis (2026-07-05)

Key findings this v2 incorporates, so future edits know why:

- **Third-party > first-party for citations:** ~85% of brand mentions in AI
  answers come from third-party pages (AirOps 2026); listicles are the
  most-cited format (~21.9% of citations; Omniscient Digital analysis of
  23k+ citations); third-party comparisons beat brand-authored ~81/19 in
  professional services. Drove the new Corroboration workstream.
- **Reddit ~40% of AI citations across engines; ~47% for Perplexity.**
  Drove Reddit's promotion to first-class channel.
- **ChatGPT search = Bing index; 4-8 week citation lag. Perplexity 1-2
  weeks, freshness-weighted.** Drove the publish-before-launch sequencing.
- **AI Overview citation decoupling from rank** (top-10 overlap ~76% to
  ~17-38%) and ~93% zero-click in AI Mode. Drove citation-share-not-traffic
  as primary KPI.
- **Princeton GEO study:** expert quotes ~+41%, statistics ~+30%, source
  citations ~+30% visibility lift. Drove the page-pattern trio.
- **llms.txt: ~10% adoption but no measurable citation effect; Google
  publicly not supporting; negligible observed bot reads.** Demoted to
  ship-and-forget.
- **~27% of B2B sites accidentally block LLM crawlers at the CDN/WAF layer**
  (ZipTie). Drove the crawler-access audit item.
- **Schema-marked content ~2.5x more likely to appear in AI answers;
  answer-in-first-150-200-words extraction behavior.** Reinforced existing
  page pattern.

Primary sources: AirOps LLM citation research, Omniscient Digital citation
analysis, Princeton GEO paper, SE Ranking llms.txt adoption study, ZipTie
crawler research, Semrush/Ahrefs 2026 AI search data, Google Search Central
statements on llms.txt.
