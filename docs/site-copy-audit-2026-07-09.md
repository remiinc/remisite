# Site Copy Audit: Story, Conversion, ICP

Date: 2026-07-09
Status: audit for Hunter's editorial pass. This document diagnoses and advises; it does not draft copy. Wordsmithing is Hunter's.
Scope: everything user-facing in this repo as of the current working tree, measured against the canonical positioning in the remi repo (`docs/product/positioning.md`, `PRODUCT.md`, `docs/product/hero-persona.md`, ratified G12/G13, 2026-07-07) plus a fresh competitive story map (fetched live 2026-07-09).

## 1. The headline finding

The site is not one story. It is three positioning generations layered on top of each other, plus drift:

1. **Template-era residue** (enterprise/community product): the FAQ ("member-facing experiences", SSO, enterprise deployments), the qualify form's 1001+ company-size ladder, the meta title, the solutions routes (startups / small-businesses / mid-market).
2. **The June "client-facing teams" register**: both blog posts, the footer use-case links (Support ticket triage, Proposal prep, Client status updates), the metrics ticker labels, and `docs/copy-guidelines.md` itself.
3. **The 2026-07-04 owner-first overhaul**, partially applied: the hero H1, the pinned headline, the how section, the why-Remi table, the iPhone scenarios.
4. **Post-plan drift**: "Your company's new agentic COO" appears in no governing doc and violates several of them.

Root cause: the repo's own standards are stale. `docs/copy-guidelines.md` still defines the audience as agencies and client-facing teams, and `docs/copy-overhaul-plan-2026-07-04.md` predates the G12 Main Street ratification and the D18-D21 launch posture, so it plans a waitlist funnel and $49 placeholder pricing that have both since been overruled (waitlist dead, ladder is Pro $99 + Scale $199, card-required 7-day trial, audit-frame front door). Even perfect execution against the in-repo standard would produce off-canon copy. Fixing the standard is the first work item, or every editing pass fights the same current.

## 2. The standard this audit measures against

From the ratified canon (short form; the source docs win on detail):

- **Reader**: the Main Street owner. Hero persona: owner-operator remodeler/GC, $300k-$1.5M, no office manager, runs the business from an iPhone, anti-software rather than anti-technology, distrusts "AI" as a sales word the way he distrusts extended warranties.
- **The sentence test**: would it survive being read aloud in a contractors' Facebook group.
- **Pain order**: 1) money sitting uncollected, 2) quotes that die from silence, 3) nothing written down (memory as dispute armor), 4) fear of handing over the keys (trust explained like a new hire), 5) admin hours as supporting claim only. Time saved is last, never the headline.
- **Forbidden**: "AI agent" as identity; "assistant"; "runs your small business" in public copy (say "runs the business side"); "an employee you text"; save-time headlines; credit math above the fold; system vocabulary (trust ladder, approval gating, provenance); invented stats, customers, or testimonials; em dashes. AI disclosure appears once, low on page.
- **Funnel**: self-serve with founder touch. Card-required 7-day trial. The front door is the audit frame: a 60-second free-inspection-style diagnostic ("see what's slipping through your inbox") with a bounded lookback and an explicit deletion promise. No waitlist. Public prices: Pro $99, Scale $199.
- **Proof**: the sourced stats bank exists ($17.5k average unpaid invoices; 47% of invoices 30+ days overdue; 2/3 of contractors paid late; ~$39k/yr late-payment cost; 78% hire the first responder; 5-minute response = 21x). All public claims pass the Claims Guardrail before publication.

## 3. Story map: the homepage as it reads today

Section by section, with the job each section is doing versus the job the story needs.

### 3.0 Meta / tab title / share cards

Current: `Remi — AI Operations Assistant for Teams`. JSON-LD: "AI-powered operations assistant that learns how your business runs... CRM updates..."

Verdict: **three forbidden-list hits in the tab title alone** (em dash, "Assistant", team-first). This is the first line every share card, search result, and browser tab shows. It is the old positioning verbatim, and it frames everything below it before the hero loads.

### 3.1 Announcement bar

Current: pulls the latest blog post, so it reads "Now available in Early Access" and links to a post titled "Remi is now in private beta" whose body says public release comes "later in 2026."

Verdict: conflicts with the hero's "Beta launching late 2026" and with the actual launch posture (self-serve opens 2026-07-17). **Three different availability stories are simultaneously on the page.** A skeptic reads inconsistency as a tell.

### 3.2 Hero

Current: H1 "Your business should run. It shouldn't run you." Sub: "Your company's new agentic COO" / "Beta launching late 2026". CTAs: "Text Remi" (iMessage icon) and "Sign up with Gmail", both `href="#"`.

- The H1 is the ratified anchor line. Keep. It earns its place: identity-first, no AI word, plain.
- "Your company's new agentic COO" fails the Facebook-group test twice. "Agentic" is AI-ideology vocabulary; the persona has never heard it and the tech-adjacent reader files it under hype. "COO" is an executive-org frame; Bond owns "Chief of Staff for founders" and that is precisely the lane Remi is not in. "Your company's" is team-register, not owner-register. This line is also the only place the page says what Remi is, and it spends that one shot on jargon.
- "Beta launching late 2026" is factually wrong against the launch plan and against the announcement bar above it.
- **Both hero CTAs are dead links.** For a skeptic-register site this is worse than absent: it is the classic vaporware smell. Note that "Text Remi" as a mechanism is the single most differentiated conversion device available (see Avoca's "Talk to our AI" in section 5); it must be real before it renders.
- The sub also never says who Remi is for. Nothing above the fold qualifies the reader. The hero persona doctrine says the first line of every ad self-qualifies owners; the site hero should meet the same bar.

### 3.3 Pinned headline ("Meet Remi")

Current: "Remi takes care of the work that follows you home." Rotating tasks: meeting follow-ups, chases late invoices, keeps the books up-to-date, follows up with leads, tracks your commitments.

Verdict: the line is good and emotionally accurate for the persona (the 9pm kitchen table is literally in the persona doc). Two issues:

- **The page leads with pain #5.** "Work that follows you home" is the admin-hours/mental-load pain, which the ratified pain order puts last as a supporting claim. Money appears only inside the rotating chips. The story opens on the weakest ratified wedge and buries the strongest (uncollected money) three sections down.
- Image alt texts: "Remi AI for fashion designers", "for sales teams", "for accounting teams", "for marketing research". Off-ICP residue, visible to screen readers and crawlers, and it leaks the old broad-horizontal identity.

### 3.4 iPhone scenarios

Current: four scenarios (Get paid; Respond first; Remember everything; Approve the next step) played as iMessage threads with drafts and approvals.

Verdict: **the best copy on the site, and the section most aligned with canon.** Money-first ("Henderson is 9 days late on the final invoice"), proof-attached ("I found the completion photo and your 'all wrapped up' message from 4:12pm"), approval-gated ("Prepared. I will wait for your approval before anything goes out"). It does for Remi what Lassie's hero ledger does: shows completed, receipt-backed work instead of describing features. The scenario titles map almost one-to-one onto the ratified pain order. Minor notes: emoji density in Remi's texts is above the "not emoji-heavy" line even granting the iMessage fiction; and this section sits below a weaker section that many visitors will not scroll past.

### 3.5 How it works

Current: "Connects to all your tools" / "Keeps things moving 24/7" / "You approve the next move."

Verdict: sound skeleton, right claims, decent register ("She looks for unpaid invoices, quotes that went quiet, missed requests"). What it lacks is the center claim: canon says the differentiator is **she speaks first**, and the 07-04 plan's onboarding arc (start with the inbox, she learns, then she speaks up first) told that as a story. The current three tiles describe a system; they do not set up "you don't prompt her" as the thing nobody else does. Also "Connect email, calendar, texts, invoices, and job notes" is good and concrete, but no tile ever names the morning brief, which is the recurring artifact an owner can picture.

### 3.6 Case studies

Current: renders four anonymized markdown case studies with dollar stats and owner quotes. Section headline: "Business owners just like you are automating their backoffice with Remi."

Verdict: **the most dangerous section on the page.**

- The stories are invented (anonymized composites with fabricated dollar figures and fabricated quotes). Canon forbids invented stats, customers, and testimonials, full stop. This audience runs on bullshit detection; they sell against fake reviews for a living. One sniff of a fake case study and the entire site's honesty posture collapses, including the parts that are true.
- The construction study contradicts itself: title says "$37,000+", stats card says "$37k", body says "$18,400", og title says "$18,400". Any diligent reader (or an AI answering "is Remi legit") can catch this in ten seconds.
- Title verb "recovered" versus body verb "surfaced" is a claim-discipline violation: "recovered" is an execution claim that requires receipt evidence; the body itself only supports "surfaced and drafted."
- The headline: "just like you" is the oldest marketing-speak tell in the book and precisely what the skeptic register exists to avoid; "automating their backoffice" is both off-register (nobody says backoffice on a jobsite) and an over-claim ("automating" needs the approval qualifier per the guidelines).
- The 07-04 decision was that these files stay as templates and the render decision is Hunter's launch call. The render decision is now live on the page. Until real cohort receipts exist, publishing them is a standing violation of the claims guardrail.

### 3.7 Why Remi table

Current: five rows (Follow-ups, Customer details, Paperwork, Daily visibility, Mental load) under "It's 'Run your business from your phone' simple."

Verdict: the table body is some of the strongest plain-register writing on the site ("without the morning scavenger hunt", "so fewer things have to live in your head"). Two issues: the header is an awkward nested-quote construction that reads like an inside joke and flirts with the forbidden "run your business" identity framing; and **there is no money row**. The number-one ratified pain is absent from the one section built to enumerate pains. (The 07-04 plan already flagged this exact gap.)

### 3.8 News

Fine structurally. Both posts are old-register (client-facing teams, "org intelligence", Slack-native framing) and the private-beta post is the source of the announcement-bar conflict. Superseding the beta post at launch is already planned; until then it is the page's loudest register break below the fold.

### 3.9 FAQ

Current: eight questions about enterprise workspaces, SSO, member-facing experiences, browsing, LLM providers, and localization.

Verdict: **written for a buyer who is not the reader.** The FAQ is where the AI-wary owner goes first, and not one of his questions is on it: What can she do without me? Will she text my customers without asking? What does it cost? What happens to my data if I quit? How long does setup take? What happens when she's wrong? The 07-04 plan's owner-voiced rewrite (8 questions) was never applied; it needs only two updates (pricing answer to the ratified $99/$199 + trial mechanics, and the audit-frame trial description) before it is the right spec. Note from the competitive set: Viktor answers "will it mess up" head-on ("Viktor is capable, not infallible") and it is the most trust-building single answer on any of the eight sites reviewed. Nobody else touches the question. The forbidden list bans nothing here; this is open ground Remi should own.

### 3.10 Closing CTA + metrics ticker

Current: "Ready to hand off the busywork? Let Remi keep the day moving." Email form into /qualify/contact. Below it, a ticker labeled "Kept visible by Remi today:" with counters (2,432 client promises kept visible...) that increment on random client-side timers.

Verdict:

- **The ticker is fabricated live proof.** It is exactly the "fake-live metrics" the 07-04 plan ordered removed and the canon forbids. It is also written in system vocabulary ("Approval blockers surfaced before delay", "Decisions tied back to source"): internal language shown to an audience that has never seen the product.
- The CTA headline leads with "busywork," which is pain #5 again. The email-capture form itself is reasonable mechanically, but it funnels into a qualify flow built for a different buyer (see 3.12).

### 3.11 Footer

- Tagline "AI tools answer questions. Operations need follow-through." survives; it is opinionated and plain, though "operations" leans agency.
- "Book a Demo" contradicts the ratified self-serve posture (demos exist as founder-touch, not as the site's ask).
- Link rot and ghosts: "Remi in iMessage" points to `#gmail`; Salesforce, HubSpot, Zoom, Stripe, Shopify pages do not exist and are off-ICP; use-case links are agency register.
- Nav: Features / About / Pricing / Security all point to anchors that do not exist on the page. A Pricing link with no pricing anywhere is a conversion dead end AND a trust miss, given prices are ratified public.

### 3.12 Qualify flow and solutions routes

- The qualify form's company-size ladder runs to 1001+, with a mid-market SaaS shape. The persona is "just me" to 15.
- /solutions/startups, /small-businesses, /mid-market are empty stubs (blank viewport, then the enterprise FAQ). Wrong segmentation axis entirely; the 07-04 plan's pruned list is itself now stale against Main Street.

### 3.13 What the story is missing entirely

Measured against canon, these are absent rather than wrong:

1. **The audit-frame front door** (G13). The ratified conversion mechanism, the free-inspection diagnostic with bounded lookback and deletion promise, appears nowhere on the site. This is the highest-leverage absence on the page: it is culturally native to a segment that sells its own customers with free estimates, and it converts the site's job from "believe us" to "let her show you."
2. **Pricing.** Ratified public, shown nowhere. In this segment price transparency IS a trust device (see Rosie, section 5).
3. **The real stats bank.** The site fabricates product stats while sourced industry stats (the $17.5k / 47% / 78% set) sit unused. The swap is direct: problem proof can be true today even before customer proof exists.
4. **The trust section.** Fear #4 (handing over the keys) is answered only implicitly by the iPhone scenarios. There is no on-the-record section: nothing leaves without your yes, every action carries a receipt, your records are exportable ("fire Remi and keep everything"). The 07-04 plan specified this section; it was never built.
5. **"She speaks first" as a named claim.** The center-of-gravity differentiator is implied everywhere and stated nowhere.
6. **The AI disclosure line.** Canon requires it once, low on page. Currently the page avoids "AI" in the hero (correct) but never does the honest disclosure either, and the footer tagline plus meta title use "AI" in the old register instead.
7. **Anyone behind the product.** No founder note, no name, no face, no Chicago. Skeptics buy from people. Bond leans on "Talk to a founder" and a YC badge; Town signs the page as founders. For an audience that hires the contractor, not the brochure, this gap matters more than in any other segment.

## 4. Trust-integrity defects, ranked

These are the items that can each singlehandedly lose the skeptic. In order of severity:

1. Fabricated case studies rendering with invented dollar figures and quotes (3.6), including a self-contradicting number.
2. Fake-live metrics ticker (3.10).
3. Dead hero CTAs, `href="#"` on both (3.2).
4. Three conflicting availability stories: announcement bar vs hero vs blog (3.1, 3.2).
5. Meta/OG title carrying the abandoned positioning plus a forbidden em dash (3.0).
6. Nav and footer links to nonexistent anchors and pages (3.11).
7. "Recovered" and "automating" claims without receipt framing (3.6).

Items 1 and 2 are also standing violations of the claims guardrail, independent of conversion effects.

## 5. Competitive story map

Eight sites reviewed live on 2026-07-09: the five named (Viktor, Lindy, Town, Bond, Lassie) plus the three closest segment competitors surfaced (Sameday, Avoca, Rosie). Full verbatim notes are in the research transcripts; this is the synthesis.

### 5.1 The category ladder as it exists on the ground

| Company | Category claim | Enemy/anchor | Price posture | Register |
|---|---|---|---|---|
| Rosie | "easiest AI answering service for small business" | voicemail + $2/min answering services | $49 in the subheadline, free trial | 6th-grade, cheap-and-cheerful, genuinely Main Street |
| Sameday | "AI CSRs" / AI staff by job title | missed calls, your best salesperson | demo-gated, no pricing | trades-fluent but sized for shops with CSR desks |
| Avoca | "The AI Front Office" | hold times, CSR labor cost | demo-gated | ops-exec, PE-rollup proof, SOC 2 blocks |
| Lassie (healthcare) | "AI that runs the doctor's office" | the admin burden itself | performance ("paid when it does work") | plain, identity-first, the closest analog to Remi's needed story |
| Lindy | "AI executive assistant" | the $8,000/mo human EA (joke plan card) | $49.99, 7-day trial | consumer-playful, first person |
| Town | "unusually helpful AI assistant" (Townies) | setup/teaching burden | $0 free tier, credit-metered above | whimsical, narrative, VC-flavored proof |
| Viktor | "AI employee. Not a tool. A hire." | ChatGPT/Copilot/Zapier/Claude Code | $100 free credits, no card | blunt, anti-hype, startup-operator |
| Bond | "AI Chief of Staff" | the $150k human CoS | $99/seat, paid first month as trial | founder-Twitter cadence, YC badge |

### 5.2 What this map confirms

- **The positioning doc's two-poles read is empirically right.** Horizontals (Viktor, Town, Lindy, Bond) sell time saved to desk workers and fight each other with register the Main Street owner will never trust (credits, "agentic," VC testimonials, founder in-jokes). Verticals in the trades (Sameday, Avoca) are phone-scoped and drifting upmarket to PE rollups. Rosie is genuinely Main Street but deliberately capped itself at "answering service."
- **The lane is empty, verified.** Nobody owns "the teammate who runs the business side" at Main Street register. Lassie owns the exact frame in healthcare, which is both proof the position works and a preview of the playbook.
- **Universal wedge check**: every trades competitor enters through the missed call. Nobody enters through money uncollected, dying quotes, or nothing-written-down. Remi's ratified pain order is not just differentiated, it is unclaimed.
- **Universal blind spot**: almost nobody answers "what happens when the AI gets it wrong with my customer." Viktor alone touches it, and only for an audience of startup operators. For the AI-wary owner this is THE question, and the whole approval-plus-receipts architecture is Remi's honest answer waiting to be said plainly.

### 5.3 Structural patterns worth stealing (patterns, not copy)

- **Lassie's hero architecture**: identity affirmation ("You're a doctor. Not a machine.") + a hero visual of completed, dollar-denominated work + an oversight arc ("flags exceptions", "the more it learns, the less input it needs"). This is the closest published blueprint for Remi's story spine. Remi's existing H1 already does the identity half.
- **Rosie's friction ladder**: price in the subheadline, trial, 3-step setup, review-before-live, transfer-to-human. The complete fear-removal pattern for this exact buyer psychology. Remi's audit-frame front door slots into this pattern naturally and out-punches it (a diagnostic with findings beats a generic trial).
- **Avoca's "Talk to our AI"**: converting skepticism into direct experience is the strongest single trust device observed. Remi's "Text Remi" button is potentially the superior version of this because texting is already the persona's native surface. It is currently a dead link; making it real is worth more than any headline change on the page.
- **Viktor's honesty posture**: "capable, not infallible" plus explicit confirmation-before-high-stakes-actions. Trust built by conceding the objection before the reader raises it. Remi's approval model makes this concession cheap and true.
- **Bond/Lindy's salary anchor**, adapted: their enemy (human EA/CoS) is wrong for Main Street, but the mechanism transfers. The hero persona's counterfactual is the office manager he cannot justify hiring. $99 against that comparison does the price defense and the category claim in one move. Flagged as a candidate frame to test, not a decision.
- **Sameday's outcome-number headline** plus named trades testimonials: the proof format that works in this culture once real receipts exist. Slots directly into the case-study templates when the cohort data arrives.
- **Town's cautionary tale**: a homepage that promises "no learning curve" and a pricing page that teaches credit math. The register break is exactly what Remi's ban on credit math above the fold protects against; the ban is validated in the wild.

## 6. The story spine the page should tell

Structural recommendation only; every line of actual copy is Hunter's. The current section inventory is nearly sufficient; this is mostly a re-weighting and three additions.

1. **Hero**: keep the anchor H1. The subhead's job: say who she is for and what she does, in owner words, with zero AI vocabulary, and self-qualify the reader the way the ad doctrine demands. One true availability statement. Two live CTAs, of which "Text Remi" (real) is the differentiated one.
2. **Proof of work immediately**: the iPhone scenarios are the strongest asset and currently sit under the weakest handoff. The money scenario ("Get paid") should be the first product moment the visitor reaches.
3. **"She speaks first" named as the claim**: one section that states the differentiator plainly and shows the morning brief.
4. **Money constants**: who owes you, which quotes went quiet, what was agreed. The why-Remi table gains a money row and inherits this weight; pain order finally matches canon.
5. **On the record**: the trust section. Approval before anything leaves, receipts on every action, export means you are never hostage. New-hire framing per canon. This is where the AI disclosure line lives.
6. **Price, plainly**: the ratified ladder, the trial mechanics, no credit math.
7. **Owner-voiced FAQ**: the 07-04 spec, updated for pricing and the audit frame, including the "what happens when she's wrong" answer nobody in the market gives.
8. **The audit front door as the recurring ask**: the free-inspection diagnostic frame carried by the CTAs throughout, replacing the current mix of Book a Demo / Get Started / Text Remi / email capture pointing at four different promises.
9. **Problem proof from the real stats bank** wherever the page needs numbers, until cohort receipts replace them.
10. **A human**: name, face, one honest paragraph. Skeptics hire people.

## 7. Punch list

P0, trust integrity (before any paid traffic or launch announce):

- [ ] Unpublish or visibly de-claim the case-studies section until real cohort receipts exist (render decision per 07-04 was Hunter's call; the call is now due). Fix the $37k/$18.4k contradiction in the template regardless.
- [ ] Remove the fake-live framing from the metrics ticker (07-04 plan option A already specifies the safe reframe).
- [ ] Wire or remove the two dead hero CTAs.
- [ ] One availability truth across announcement bar, hero, and blog.
- [ ] Rewrite the meta/OG/JSON-LD identity line (also removes the em dash and "Assistant").

P0, canon repair (same PR as any copy work):

- [ ] Update `docs/copy-guidelines.md` audience and register sections to the G12 Main Street canon; add the pain order, the sentence test, and the forbidden list; mark the em-dash ban explicitly.
- [ ] Mark `docs/copy-overhaul-plan-2026-07-04.md` superseded where it conflicts (waitlist funnel, $49 placeholder, agencies-first solutions list) and re-anchor its still-valid sections to the ratified funnel.

P1, story and conversion:

- [ ] Hero subhead: replace "agentic COO" line (register, ICP qualification, availability).
- [ ] Unify CTA architecture around the ratified funnel and the audit frame; retire Book a Demo from the main path.
- [ ] FAQ full rewrite per the 07-04 owner-voiced spec, updated for $99/$199 and trial mechanics, plus the "when she's wrong" answer.
- [ ] Add the money row to the why-Remi table; fix its header construction.
- [ ] Surface pricing (page or section) per the ratified ladder.
- [ ] Add the on-the-record trust section and the AI disclosure line.
- [ ] Name "she speaks first" as the center claim (how-section rework or the 07-04 plan's dedicated section).
- [ ] Replace invented numbers with stats-bank problem proof where numbers are needed.

P2, cleanup:

- [ ] Footer: prune ghost integration links (fix `#gmail`), retitle agency use-case links, retire the dead nav anchors or build the sections they promise.
- [ ] Qualify flow rebuild for the owner (business type, owner-scale size ladder); retire the 1001+ ladder.
- [ ] Solutions routes: remove the empty stubs; re-plan the set against Main Street rather than the stale pruned list.
- [ ] Alt-text sweep (fashion designers / sales teams / accounting teams set).
- [ ] Emoji density pass on the iPhone scenario texts.
- [ ] Blog: supersede the private-beta post at launch (already planned); check both posts for register.

## 8. What is genuinely working (keep list)

- The H1 anchor line, ratified and right.
- The pinned headline sentence and the rotating task chips.
- The iPhone scenarios: register, pain order, proof-and-approval mechanics. The template for how the rest of the page should sound.
- The why-Remi table body voice ("the morning scavenger hunt", "fewer things have to live in your head").
- The how-section claims and its "You approve the next move" framing.
- The footer tagline's opinionated posture (pending an owner-register check).
- The case-study markdown files as templates: the structure (challenge, solution, receipts, zero-sends-without-approval stat) is exactly the right proof format for the day real receipts exist.
