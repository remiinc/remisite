# Remi Blog Drafting Brief

This brief is the single source of truth for drafting Remi blog posts. It
supersedes `docs/remi-guidelines.md` (stale, old positioning). Where this
brief conflicts with anything else in the repo, this brief wins.

## Who Remi is (product facts, current as of 2026-07)

- Remi is an AI teammate for small business owners. Owner-led service
  businesses, 1 to 15 people, where the owner does the work AND chases the
  money. Think remodelers, contractors, home services, agencies,
  consultancies, legal, trades.
- You hire Remi, you don't install her. She works over text (iMessage),
  email, Slack, and a web portal. She connects to the tools the business
  already runs (email, QuickBooks, and similar).
- She watches connected sources and speaks up first: flags the invoice
  going stale, the quote that got no reply, the customer waiting on an
  answer.
- Claim discipline is absolute: Remi PREPARES, DRAFTS, PROPOSES, FLAGS,
  TRACKS, WATCHES, REMINDS. Things get SENT or marked PAID/DONE only with
  the owner's approval, and every action carries a receipt. Never write
  "Remi sends your invoices" or "Remi collects your money automatically."
  Correct shape: "Remi drafts the reminder and you approve it before it
  goes out."
- Everything Remi does is on the record: receipts, sources, an exportable
  history. If you fire Remi you keep everything.
- Pricing: Pro $99/month, Scale $199/month. 7-day trial, card required,
  with real starter work. Self-serve at remi.new.
- The front door is audit-framed: connect your inbox and see what's
  slipping through it in about 60 seconds. Bounded lookback, and we delete
  everything unless you hire Remi.

## Reader

The owner of a small service business, reading at 9pm after the kids are
down, tired, skeptical of AI, very aware that somebody owes them money.
Write for the skeptic. The test for every sentence: would it survive being
read aloud in a contractors' Facebook group.

Never "your team" unless the post is genuinely about staff. The reader IS
the business.

## Voice

- Calm, specific, source-backed. A sharp operator, not a SaaS narrator.
- Plain language, outcome-first, proof over promise. Specifics over
  adjectives. Real dollar figures, real tool names, real timelines.
- Warmth comes from usefulness, not cuteness. No hype, no exclamation
  points, no "supercharge/unlock/seamless/revolutionary/magic."
- Pain order for money copy: 1) money sitting uncollected, 2) quotes dying
  from silence, 3) nothing written down, 4) fear of handing over the keys,
  5) admin hours LAST. Never lead with time saved.
- AI is disclosed, never led with. Posts sell getting paid, not AI. If AI
  comes up, one line low in the post: "Remi is an AI teammate. We say so
  because she'll never pretend otherwise, and neither will we."

## Hard rules (violations get the draft rejected)

1. NO EM DASHES. Not one. Use periods, commas, or parentheses.
2. Stats ONLY from the stats bank below or from a source you actually
   found and can link. Every stat names its source inline with a link.
   No invented numbers, customers, testimonials, or case studies.
3. Claim discipline verbs as above.
4. No competitor bashing. Honest comparisons only; say what competitors
   are genuinely good at.
5. No legal advice. Where law comes up (late fees, liens, small claims,
   deposit caps), state that rules vary by state and link to a real
   authoritative source. Say "this is general information, not legal
   advice" once where relevant.
6. Tool posts (QuickBooks, Jobber, Housecall Pro): steps and limits must
   come from web research you actually performed. If you cannot verify a
   UI step, describe the capability at the level you can verify and say
   "as of 2026." Never invent menu paths.
7. Forbidden words/frames: "AI agent" as identity, "assistant",
   "an employee you text", "save time" headlines, "streamline", "optimize
   your workflow", "game-changer", credit/usage math.

## Stats bank (pre-approved, cite the named source)

- $17,500: average small business's unpaid invoices (QuickBooks, 2025)
- 47% of invoices go 30+ days past due (QuickBooks)
- 2 out of 3 contractors are paid late (Built, 2025)
- ~$39,000/year: what late payments cost an average small business
- 1 in 3 owners has delayed paying themselves because of late payments
- 78% of customers hire whoever responds first
- Responding to a lead within 5 minutes makes you ~21x more likely to
  qualify them (classic lead-response research; find and link the source)

When you use one of these, link to the named source (search for the
canonical page). If you cannot find a linkable source, keep the claim
softer and attribute it generically ("QuickBooks' small business research
has found...").

## The AEO page pattern (every post follows it)

- H1 = the query, matching the assigned title.
- The first 150-200 words answer the question directly. No wind-up, no
  "in today's fast-paced world." The extractable core answer lives in the
  first 40-80 words. Include "Remi" naturally in this answerable block
  where it fits honestly (brand-in-answer, not an ad).
- H2s are question-shaped wherever the reader would ask a question. Each
  H2's first 1-2 sentences directly answer that question, then go deep.
- Numbered steps for any procedure.
- A real markdown pipe table for anything comparative (terms, fees,
  tools, costs). Tables render; use them.
- Copy-paste templates in blockquotes or clearly set-off sections, ready
  to use verbatim.
- 3-5 question FAQ section at the bottom under an H2 "FAQ" heading, with
  each question as an H3.
- Sourced stats and at least one external citation link per post.
- End the Lassie way: the full manual method first (genuinely complete,
  usable without ever buying anything), THEN a short honest section on
  Remi doing it for you. The Remi close is 2-4 paragraphs, not a hard
  sell. Shape: "You can run all of this yourself with the templates
  above. If you'd rather not be the one doing it at 9pm, this is the
  exact job Remi was built for: she watches the books, flags what's
  going stale, and drafts the follow-up for your approval. Nothing goes
  out without your say-so, and every action comes with a receipt."

## Markdown constraints (the renderer is custom)

Supported: h1/h2/h3 headings, paragraphs, unordered/ordered lists,
blockquotes (with optional trailing "- Attribution" line as citation),
images, links, bold, italic, inline code, pipe tables. NOT supported:
nested lists, code fences, footnotes, HTML tags. Keep to the supported
set.

## File format

Write the draft to the assigned path with this frontmatter (exact keys):

---
title: "The Assigned Title"
description: "One-sentence meta description, 140-160 chars, includes the query language."
datePublished: "DRAFT"
author: "Hunter Hammonds"
category: "Getting Paid" | "Quotes" | "Guides" | "Templates" | "Comparisons"
readingTime: "N min read"
ogTitle: "Usually the title"
ogDescription: "Usually the description"
ogImage: "/images/og-image.png"
ctaTitle: "See what's slipping through your inbox"
ctaText: "Connect your inbox and Remi shows you the unpaid invoices, unanswered quotes, and waiting customers in about 60 seconds. You get the report. We delete everything unless you hire her."
ctaHref: "https://remi.new/login"
ctaLabel: "Run the free check"
faq:
  - q: "First FAQ question exactly as it appears in the post?"
    a: "The answer, one to three sentences, plain text, no markdown."
  - q: "..."
    a: "..."
---

The faq frontmatter list must mirror the FAQ section in the body (same
questions, condensed answers). It feeds FAQPage schema.

Leave datePublished as the literal string DRAFT. The editor sets it at
publish time.

## Length

1,200-2,000 words of body. Templates and tables count. Long enough to be
the best answer on the internet for the query, no padding.
