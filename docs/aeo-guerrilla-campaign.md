# Remi AEO Guerrilla Campaign (2026-07-09)

Master campaign document for making LLMs know about and recommend Remi. Owner: Hunter (solo founder) plus AI agents. Pairs with `docs/aeo-research-2026-07-09.md` (evidence), `docs/corroboration-pack-2026-07-09.md` (outreach), and `docs/launch-ops-checklist-2026-07-09.md` (operator steps). Every tactic below traces to the research doc unless marked as a **judgment call**.

---

## Operating principles (from the research)

**Retrieval first, weights later.** Brands enter model weights slowly through frequency and co-occurrence in training corpora; brands enter live answers faster through retrieval, citations, and third-party narrative ([GPT-3 paper](https://arxiv.org/pdf/2005.14165.pdf); [Mozilla on Common Crawl](https://www.mozillafoundation.org/en/research/library/generative-ai-training-data/common-crawl/); [Seer on training-data lag](https://www.seerinteractive.com/insights/how-to-get-your-brand-in-chatgpts-training-data)). Pre-launch and the first 90 days optimize live-answer citations. Parametric presence is a lagging byproduct of sustained multi-source co-occurrence, not a launch KPI. Practitioner ranges of about 6–12+ months for parametric familiarity are directionally useful; claims of 30–90 day weight updates usually conflate RAG with parameters ([Five Blocks; medium confidence on exact timelines](https://www.fiveblocks.com/knowledge/ai-llm-reputation-management/how-often-do-ai-models-update-their-knowledge-about-companies/)).

**Niche phrase over umbrella term.** Incumbents already stamp “AI coworker,” “AI Teammates,” and “digital employee” ([OpenAI Frontier](https://openai.com/index/introducing-openai-frontier/); [Asana AI Teammates](https://asana.com/resources/ai-teammates-overview)). Umbrella ownership of “AI teammate” is unrealistic. The wedge is **AI back office for owner-run service businesses**, with repeated co-occurrence of contractor / home-services / QuickBooks / invoice follow-up / approval-workflow language on owned and earned pages ([Kopp on brand–context co-occurrence](https://www.kopp-online-marketing.com/guide-to-brand-context-optimization-for-generative-engine-optimization-geo); research §4).

**Run-level recommendation rate is the KPI.** Identical brand-list order almost never repeats across runs, so single-run rank and blended “AI SOV” mislead ([SparkToro/Gumshoe](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)). Conductor found recommendation intent is where free brand choice happens ([Conductor](https://www.conductor.com/academy/ai-recommendation-consistency-analysis/)). Żatuchin’s Jun 2026 study found full three-model agreement on the top brand only 41.6% ([arXiv](https://arxiv.org/html/2606.23057v1)). Track: on each fixed prompt, did Remi appear as a recommendation (yes/no) per engine, then rate across runs and engines. Not vanity mention volume.

**Everything real, nothing manufactured.** Google’s May 2026 spam-policy update explicitly covers attempting to manipulate generative AI responses in Search ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies); [PPC Land](https://ppc.land/google-spam-policies-now-officially-cover-ai-overviews-and-ai-mode-in-search/)). Reddit’s 2026 crackdown reports ~25k spammy posts/comments caught per day ([Ad Age](https://adage.com/social-media/reddit/aa-ai-automated-systems-catch-spammy-posts-and-comments/); [Bloomberg](https://www.bloomberg.com/news/articles/2026-07-06/reddit-is-cracking-down-on-ai-marketing-slop-with-its-own-ai)). The FTC Fake Reviews Rule bans fake and AI-generated testimonials ([FTC](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)). One public astroturf callout can dominate high-engagement third-party text that models then recycle. Asymmetry is high: one scandal outweighs months of careful seeding.

**Who does what.** Fable orchestrates (priorities, drafts, tracking design). Grok and agents execute (panel runs, draft refreshes, research pulls, sheet updates). Hunter does the human-only steps: deploy accounts, DNS/GSC/Bing verification, directory profiles, outreach sends, Reddit replies under his name, YouTube recording, customer calls, and review asks.

---

## Phase 0: Pre-launch (now)

Third-party evaluation is not possible until the product is real. Pre-launch work is owned surface, indexing, entity hygiene, measurement baseline, and citability upgrades that stand alone without a product demo. Sequence from the research: win retrieval first; leave G2 reviews, listicle pitches, and case-study claims until evaluation is fair ([research §What this changes for Remi](aeo-research-2026-07-09.md); corroboration pack sequencing).

### Deploy and index

1. Deploy remisite so blog HTML is live at remi.new (prerender already in-repo; spot-check `view-source` on a post shows full article HTML).
2. Google Search Console: verify remi.new, submit `https://remi.new/sitemap.xml`, request indexing on cornerstone posts.
3. Bing Webmaster Tools: verify (import from GSC once ready), submit the same sitemap. **Non-negotiable:** ChatGPT live search runs on Bing; no Bing index means no ChatGPT web citations ([launch-ops checklist](launch-ops-checklist-2026-07-09.md); research on Bing lag in SEO approach).
4. Crawler/CDN audit the same day. From a terminal, fetch key pages as `PerplexityBot`, `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `GPTBot`, `Googlebot`, `Bingbot` and confirm HTTP 200 with full HTML. Roughly a quarter of B2B sites silently block LLM crawlers at the CDN even with a permissive robots.txt ([launch-ops](launch-ops-checklist-2026-07-09.md)).

### Weekly 20-prompt citation panel (start now = t=0 baseline)

Zero-cost DIY for 15–25 fixed prompts weekly is the right pre-launch default ([Visiblie](https://www.visiblie.com/blog/how-to-track-brand-mentions-perplexity); research §5). Run **20 prompts** every week, logged-out / incognito, across four engines: ChatGPT, Perplexity, Claude, Google AI Overviews (or AI Mode when the UI presents it). Protocol detail lives under Measurement; start the clock in Phase 0 so launch week has a baseline, not a first guess.

**The exact 20 prompts** (blog target queries as questions, plus category and alternatives prompts). Use these strings verbatim every week:

1. How do I follow up on an unpaid invoice without losing the client?
2. What are good late payment reminder templates for a small business?
3. What should I do when a client won't pay?
4. How do I charge late fees without burning the relationship?
5. Net 30 vs due on receipt: which payment terms get you paid faster?
6. Why do clients pay late and what follow-up cadence works?
7. How do I ask for a deposit before starting work?
8. How soon and how often should I follow up on an estimate?
9. How do I always respond first to customer inquiries as a small business?
10. How do I send automatic invoice reminders in QuickBooks Online?
11. How do Jobber estimate and invoice follow-ups work?
12. How do Housecall Pro payment reminders work and what are the limits?
13. What is an AI back office for a small business?
14. AI employee vs virtual assistant: which should an owner-run business hire?
15. Remi vs Lindy vs Viktor: which AI teammate should I use?
16. Remi vs hiring a part-time office manager: what does $199 a month buy?
17. Best AI back office for a contractor
18. Best AI teammate for owner-run service businesses
19. Best Lindy alternatives for small business
20. Best Viktor alternatives for small business

Log each engine run as: recommended / mentioned-not-recommended / cited-without-name / absent. Primary rollup is **recommendation rate** on prompts 13–20 (category and product intent). Prompts 1–12 are content-citability and ghost-citation checks (our pages cited without the Remi name). Expectation: Perplexity citations possible in 1–2 weeks after index; ChatGPT often 4–8 weeks (Bing lag); zero product recommendations before real third-party footprint is normal ([launch-ops §7](launch-ops-checklist-2026-07-09.md)).

### Entity hygiene

Use **one canonical one-liner** identically on remi.new, G2/Capterra later, Crunchbase, LinkedIn company page, Product Hunt, and founder bios:

> Remi is an AI back office for owner-run service businesses (contractors, home services, agencies, 1 to 15 people). Remi connects to email and QuickBooks, watches for unpaid invoices and quotes that got no reply, and drafts the follow-ups. Nothing sends without the owner's approval, and every action carries a receipt.

Consistent entity strings aid disambiguation; one-off naming confuses co-occurrence ([Wikidata5m / 2026 visibility paper; medium](https://arxiv.org/html/2606.21595v1); research §1). Check Crunchbase and LinkedIn company entries now: correct URL (remi.new), description matches the one-liner, no stale private-beta-only framing that contradicts launch. **Judgment call:** do not force a Wikipedia article; COI and notability enforcement make a promo article on a thin unlaunched product more likely to produce deletion drama than authority ([Wikipedia COI](https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest)).

### GA4 AI-referrer regex

Add a channel or exploration filter for AI referrers so outcome traffic is visible before paid tools. Pattern should match at least: `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`, `you.com`, `phind.com` ([GA4 AI referral guidance](https://roardigital.co.uk/insights/how-to-track-ai-referral-traffic-in-google-analytics/)). **Judgment call on exact regex:** start with a single custom channel group using contains-match on those hostnames; refine if noise appears.

### Content citability upgrades (only where research justifies)

KDD 2024 GEO: quotation addition ~+41% position-adjusted word count, statistics ~+31%, fluency ~+28%, citing sources ~+28%; keyword stuffing ~−8% ([arXiv:2311.09735](https://arxiv.org/abs/2311.09735)). On live Perplexity, quotations still improved visibility ~22%. Do **not** invent numbers. Upgrade only:

- Add or fix **sourced statistics** with named sources (existing stats bank: QuickBooks, Built, etc.).
- Add **quotable claims** in the first 40–80 words of answer-first blocks (extractable core).
- Prefer real HTML tables and numbered steps where comparisons or procedures already exist.

**Explicitly skip as magic levers:**

- **llms.txt theater.** No measured link to crawl lift or citation frequency ([SE Ranking](https://seranking.com/blog/llms-txt/); [Otterly experiment](https://otterly.ai/blog/the-llms-txt-experiment/)). File may exist in-repo as free hygiene for coding agents; zero ongoing AEO effort.
- **Schema-as-magic.** Ahrefs DiD on pages that *newly added* JSON-LD found AI Overviews −4.6%, AI Mode +2.4%, ChatGPT +2.2% (latter two indistinguishable from zero). Treat schema as quality hygiene (Article, FAQPage, Organization already planned), not a free citation lever ([Ahrefs schema study](https://ahrefs.com/blog/schema-ai-citations/)).

---

## Phase 1: Launch week

Gate: self-serve open, site live, a stranger can evaluate remi.new. Firing third-party pitches before that burns one-shot targets ([corroboration pack](corroboration-pack-2026-07-09.md)).

### Directory wave (same day, ~2 hours, Hunter)

These rank for alternatives queries and feed AI answers; multi-platform review presence correlates with citation rates ([Seer Trustpilot study across ~800k AI responses](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search); [SE Ranking on review platforms in AI Overviews](https://seranking.com/blog/review-platforms-in-ai-overviews/)). Create profiles only; do not manufacture reviews.

| Directory | Action |
| --- | --- |
| G2 | Create product profile (AI Agents / BPA); screenshots, owner-first copy, plain pricing |
| Capterra / GetApp / Software Advice | One Gartner Digital Markets submission feeds the set |
| Product Hunt | Claim product page (launch post can wait; profile URL corroborates) |
| There's An AI For That (TAAFT) | Self-serve submit |
| SourceForge | Self-serve submit |
| Crunchbase | Confirm entry current (description, remi.new, stage) |

### Founder announcement (Hunter)

Adapt one honest launch note to LinkedIn and X: who it is for, what she watches, approval + receipts, pricing, link. Not paste-identical; same facts, platform-native length. Builds author entity the blog leans on ([launch-ops §6](launch-ops-checklist-2026-07-09.md)). **Judgment call:** one primary post per network on launch day; replies and threads over the week beat a multi-post dump.

### Honest founder Reddit (starts at launch)

Reddit citation share is volatile (ChatGPT Reddit share reported collapsing from ~60% toward ~5–12% in some windows; volatility is the reliable fact, not any fixed %) ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/); [SaaS Intelligence](https://saasintelligence.substack.com/p/reddits-ai-citation-share-just-grew)). Licensed feeds still make Reddit text valuable for training and retrieval ([Reuters Google–Reddit deal](https://www.reuters.com/technology/reddit-ai-content-licensing-deal-with-google-sources-say-2024-02-22/); [Reddit–OpenAI](https://www.redditinc.com/blog/reddit-and-oai-partner)). The 2026 crackdown is why the **honest lane is the only lane**: real account, real name in bio, Remi affiliation disclosed, answer-first, templates pasted inline from the blog, product named only when someone asks or it is directly on point ([Ad Age](https://adage.com/social-media/reddit/aa-ai-automated-systems-catch-spammy-posts-and-comments/); [Bloomberg](https://www.bloomberg.com/news/articles/2026-07-06/reddit-is-cracking-down-on-ai-marketing-slop-with-its-own-ai)).

Subs (judgment call, aligned with launch-ops): r/smallbusiness, r/sweatystartup, r/Contractors, r/freelance, r/Entrepreneur. Search live threads on unpaid invoices, deadbeat clients, estimate follow-up. Cadence: ~15 min/day. Never sock puppets, never vote games, never AI-generated stealth marketing.

### Listicle pitches (corroboration pack B1–B5)

Send from founder email after product is findable (launch + ~1 week is the pack’s gate for pitches; directories same day). Short, factual, no incentives. Full copy lives in `docs/corroboration-pack-2026-07-09.md`:

1. **Vellum / Nicolas Zeeb** (highest leverage: multiple ranking alternatives pages)
2. **TinyCommand / Ankit Solanki** (monthly pricing re-verify habit)
3. **Hook Agency / Tim Brown** (home-services ICP match)
4. **LowCode Agency / Jesus Vargas** (AI employee platforms list)
5. **HeroThemes / Shankar Chavan** (AI virtual assistants backup)

**Expectation set by research, not hopium:** Seer reported ChatGPT listicle citations down ~30% MoM into early 2026 ([Seer](https://www.seerinteractive.com/insights/the-listicle-window-is-closing-in-ai-search-30-decline-mom)). Listicles still associate with higher mention probability when included ([Peec](https://peec.ai/blog/the-listicle-rank-effect-what-nearly-200-000-ai-responses-across-8-ai-engines-reveal-about-brand-visibility)); ~35% of cited “best X” lists sat on low Domain Rating sites ([Ahrefs best-lists](https://ahrefs.com/blog/best-lists-research/)). Treat this wave as **co-occurrence seeding**, not a traffic plan. Track page / contact / date / result in the corroboration pack table. Secondary wave (Process Street, Housecall Pro resources, etc.) only after A+B land.

---

## Phase 2: First customers (weeks 2–6)

Gate: receipt-verified customer wins exist. No review asks or named case studies before that.

### Review asks (Hunter)

Ask only at **receipt-verified win moments** (first recovered invoice, first silent quote reopened, first week of clean follow-through the owner felt). Never incentivized. FTC Fake Reviews Rule and G2 Trust & Safety both punish fake, non-use, and non-compliant reviews ([FTC](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials); [G2 Trust & Safety](https://sell.g2.com/g2-trust-and-safety)). Brands with no review-profile presence sat near ~1% median citation rate vs ~53.5% with 1–13 reviews in Seer’s Trustpilot-oriented study ([Seer](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search)). Profile existence plus a few real reviews is the lever; star-count theater is not.

### Case-study upgrades

Replace anonymous or pre-launch placeholders only with **named or consented** customers and outcomes that trace to real workspaces. Launch-ops already flags invented dollar claims as forbidden ([launch-ops §8](launch-ops-checklist-2026-07-09.md)). Agents can draft structure; Hunter confirms numbers and consent.

### Own the number (single strongest citability asset)

GEO’s statistics effect (~+31%) plus PR re-reporting is the plausible chain for proprietary data lift ([GEO paper](https://arxiv.org/abs/2311.09735)). Agency claims of “30–40% from first-party research alone” mostly rebadge GEO without separate A/B isolation ([Ziptie reinterpretation; low confidence on proprietary multipliers](https://ziptie.dev/blog/how-original-research-wins-ai-citations/)). Latka-style original interview/data is a founder anecdote for magnitude, not a controlled recipe ([Latka](https://www.linkedin.com/posts/nathanlatka_i-got-31937-clicks-from-chatgpt-and-perplexity-activity-7335325101019594752-a48g)).

When cohort size supports it, publish **one original operator statistics artifact** from real aggregate data: response times, follow-up recovery amounts, quote-rescue rates, time-to-approval. Host on remi.new as a dated report page; reuse the number in every comparison and pitch. Never fabricate. This is the Phase 2/ongoing “own the number” play from the SEO approach’s Cluster 6, now elevated as an AEO priority once data exists.

### Podcast outreach (owner-operator niche)

Podcasts lack strong mid-2026 multi-engine effect-size studies comparable to YouTube, reviews, or listicles (research evidence gap). Still worth a thin pipeline as third-party narrative and transcript text, not as a proven citation engine. **Judgment call targets:** contractor / home-services / small-business operator shows where the host already talks money ops, not generic startup podcasts. Hunter books; agents can draft one-paragraph pitches using the canonical one-liner.

---

## The YouTube workstream (new, evidence-backed)

YouTube brand mentions were the **strongest correlational predictor** (~0.737) of AI visibility among ~75k brands in Ahrefs Brand Radar, ahead of branded web mentions; page count and raw backlinks were weak (~0.194 for page count) ([Ahrefs correlations; medium-high for ranking of correlates, low for pure causality](https://ahrefs.com/blog/ai-brand-visibility-correlations/)). Remi currently has zero YouTube presence. That gap is load-bearing relative to the correlation table, not a nice-to-have.

### Minimal founder-shot program

- **Cadence:** 1–2 videos per week.
- **Format:** talking-head + screen recording. No production values. Phone or laptop mic is fine.
- **Structure:** same query as the published blog title; answer-first in the first 30–60 seconds; then steps, templates, or comparison table on screen; Remi only where the post already places it (honest close, not a hard sell).
- **Transcript-rich:** upload full transcript / accurate captions. Models and retrieval surfaces use speech-derived text; **judgment call:** treat captions as mandatory, not optional polish.
- **Who:** Hunter records and uploads; agents pull outline from the matching blog post and write a 8–12 beat shot list the day before.

### First 8 video titles (highest-intent published posts)

1. How to Follow Up on an Unpaid Invoice Without Losing the Client
2. 7 Late Payment Reminder Templates That Get Small Businesses Paid
3. What Is an AI Back Office? A Plain-English Guide for Business Owners
4. Estimate Follow-Up: How Soon, How Often, and What to Say
5. How to Send Automatic Invoice Reminders in QuickBooks Online (2026)
6. Remi vs Lindy vs Viktor: An Honest 2026 Comparison
7. Remi vs Hiring a Part-Time Office Manager: What $199 a Month Actually Buys
8. What to Do When a Client Won't Pay: A Step-by-Step Playbook

Channel naming and description should reuse the canonical one-liner. Do not buy views or run engagement pods (unsafe lane).

---

## Measurement

### Weekly panel protocol

| Item | Spec |
| --- | --- |
| Prompts | Fixed list of 20 above; never rotate casually. If a prompt must change, version it and keep the old string for trend continuity. |
| Engines | ChatGPT, Perplexity, Claude, Google AIO/AI Mode |
| Environment | Incognito / logged out; no personalization cookies; same geography if possible |
| Cadence | Weekly, same weekday when practical (~20–45 min or agent-assisted) |
| Per cell | recommended / mentioned / cited-page-only / absent; paste first brand list if shown |
| KPI | **Recommendation rate** = (runs where Remi is recommended) / (total runs) on prompts 13–20, stratified by engine |
| Secondary | Content citation rate on prompts 1–12; ghost citations (our URL without brand name) |
| Anti-KPI | Single-run rank; blended multi-engine SOV without stratification |

Method over logo: large gaps exist between ChatGPT API scrapes and consumer UI; spot-check dashboards in logged-out UIs weekly if a tool is later adopted ([SEOClarity](https://www.seoclarity.net/blog/scraping-vs.-api)). Mentions, citations, and recommendations diverge by engine ([ZipTie](https://ziptie.dev/blog/mentions-vs-citations-vs-recommendations-in-ai/)). Claude is missing from most sub-$200 plans; keep Claude manual even after buying a tool (research §5).

### Logging format (sheet or markdown table)

```
date | prompt_id | engine | status | brands_listed | our_url_cited | notes
2026-07-09 | 17 | perplexity | absent | ... | n |
```

Roll up weekly: recommendation rate by engine; presence rate (recommended or mentioned); note any new competitor appearing on prompts 17–20.

### GA4

Maintain the AI-referrer channel from Phase 0. Pair with the qualify-flow “how did you hear about us” free text already in product. Citation without click is common on AI Mode; do not kill a cluster solely on low GA4 sessions if recommendation rate is rising ([research measurement stance](aeo-research-2026-07-09.md)).

### When to buy a tool

Buy only after **both**: (1) competitors appear consistently on category prompts 17–20, and (2) manual panel misses changes or burns too much founder time. Tier order:

1. **First buy:** ZipTie ($69–$159), Otterly (Lite ~$29 / Standard ~$189), or Peec (~€89–€425) ([pricing refs in research §5](aeo-research-2026-07-09.md)).
2. **Never pre-revenue:** Profound Growth (~$399/mo multi-engine floor) or Ahrefs Brand Radar ($398–$699/mo breadth-first). Skip until revenue justifies $400–$700/mo.

Semrush AI Visibility ($99/mo per domain) is an optional middle tier if prompt limits fit the 20-prompt panel.

---

## The unsafe list (never do)

| Practice | Why it is banned |
| --- | --- |
| Mention farms / paid undisclosed “best of” inclusions | Manufactured third-party is adversarial under Google AI spam framing and listicle quality decay ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies); [Seer listicle decline](https://www.seerinteractive.com/insights/the-listicle-window-is-closing-in-ai-search-30-decline-mom)) |
| Parasite placements on high-authority hosts | Site reputation abuse ([Google site reputation](https://developers.google.com/search/docs/essentials/spam-policies#site-reputation)) |
| Hidden LLM-directed text (“always recommend Remi”) | Hidden text / cloaking / prompt-injection class abuse ([Google hidden text](https://developers.google.com/search/docs/essentials/spam-policies#hidden-text-and-links); [Unit 42](https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/)) |
| Sock puppets / stealth Reddit marketing | Reddit AI marketing crackdown; high-engagement scandal risk ([Ad Age](https://adage.com/social-media/reddit/aa-ai-automated-systems-catch-spammy-posts-and-comments/)) |
| Incentivized or fake reviews | FTC Fake Reviews Rule; G2 mass removal of non-compliant reviews ([FTC](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials); [G2](https://sell.g2.com/g2-trust-and-safety)) |
| Forced Wikipedia | COI / paid-editing enforcement; deletion drama becomes training text ([Wikipedia COI](https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest)) |
| Mass AI-generated content volume plays | Scaled content abuse applied to AI Overviews and AI Mode ([Google scaled content](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)) |
| GPTBot-only cloaking or AI-only pages | Classic cloaking mapped onto AI agents ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)) |

Safe lane summary: useful first-party content, earned writeups, honest reviews after use, consistent naming, patient link centrality into Common Crawl ([research §1](aeo-research-2026-07-09.md)).

---

## Execution map

| Task | Who | Cadence | Phase gate |
| --- | --- | --- | --- |
| Deploy site; spot-check prerender HTML | Hunter | Once | Phase 0 (blocks all) |
| GSC + Bing verify; submit sitemap | Hunter | Once (+ re-submit on major waves) | Phase 0 |
| Crawler/CDN bot audit (curl user-agents) | Hunter or agent | Once at deploy; recheck after host changes | Phase 0 |
| Canonical one-liner + Crunchbase/LinkedIn hygiene | Hunter (approve) / agent (draft diffs) | Once, then on any public copy change | Phase 0 |
| Citability pass on live posts (stats, quotes, sources) | Agent draft / Hunter publish | Wave at Phase 0; then with each new post | Phase 0+ |
| Skip llms.txt/schema “magic” projects | All | Standing rule | All phases |
| Weekly 20-prompt panel + log | Agent (or grok); Hunter reviews rollup | Weekly | Phase 0 start = t=0 |
| GA4 AI-referrer channel | Hunter | Once | Phase 0 |
| Directory profiles (G2, Capterra, PH, TAAFT, SourceForge, CB) | Hunter | Launch day wave | Phase 1 (site live) |
| Founder LinkedIn/X announcement | Hunter | Launch week | Phase 1 |
| Reddit answer-first participation | Hunter | ~15 min/day | Phase 1+ (name product only when real) |
| Listicle pitches B1–B5 | Hunter sends; Fable/agent keep pack current | Launch +1 week wave; follow-ups as needed | Phase 1 product findable |
| Secondary listicle wave | Hunter | After A+B land | Phase 1–2 |
| Review asks at win moments | Hunter | Event-driven | Phase 2 (receipt-verified wins) |
| Case-study upgrades (consented) | Hunter facts / agent draft | As wins accumulate | Phase 2 |
| Own-the-number operator stats report | Hunter data / agent draft page | When cohort supports aggregate stats | Phase 2+ |
| Podcast pitches (thin pipeline) | Agent draft / Hunter book | 1–2 outreach/week when Phase 2 stable | Phase 2 **judgment call** |
| YouTube 1–2 videos/week (first 8 titles) | Hunter record; agent outlines | 1–2/week from Phase 1 or as soon as recording time exists | Phase 1+ (evidence-backed workstream) |
| Tool buy decision (ZipTie/Otterly/Peec) | Hunter | Once criteria met | After competitors on category prompts + manual fails |
| Profound Growth / Brand Radar | n/a | Do not buy pre-revenue | Blocked until revenue |
| Orchestration, priority calls, draft QA | Fable | Ongoing | All phases |
| Research pulls, sheet updates, panel automation | Grok / agents | As tasked | All phases |

---

## Bottom line

AEO is not a launch substitute. Ship a product strangers can evaluate; publish citation-ready niche content welded to owner-run service language; earn real reviews and listicle co-occurrence; put founder voice on YouTube and Reddit without manufacturing presence; measure recommendation rate by engine every week. Parametric fame, schema magic, and listicle spam are the wrong games for a pre-revenue solo founder in 2026.

Provenance: synthesized from `docs/aeo-research-2026-07-09.md`, `docs/corroboration-pack-2026-07-09.md`, and `docs/launch-ops-checklist-2026-07-09.md` for the Remi guerrilla AEO campaign, 2026-07-09.
