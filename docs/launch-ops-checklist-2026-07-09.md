# SEO/AEO Launch Ops Checklist

Date: 2026-07-09. Owner: Hunter. Pairs with `docs/remi-seo-approach.md`.
The build side (prerender, sitemap, RSS, robots, llms.txt, schema) is done
in-repo. Everything below needs an operator: accounts, verifications, and
outreach that only a human can do.

## 1. Ship it (blocks everything else)

- [ ] Push remisite main to deploy. Everything downstream needs the pages
      live at remi.new.
- [ ] Spot-check live: `view-source:https://remi.new/blog/what-is-an-ai-back-office`
      shows the full article HTML; `https://remi.new/sitemap.xml`,
      `/rss.xml`, `/robots.txt`, `/llms.txt` all resolve.

## 2. Indexing plumbing (do the same day, ~30 min)

- [ ] Google Search Console: verify remi.new (DNS TXT record is cleanest).
      Submit https://remi.new/sitemap.xml. Request indexing on the 5
      cornerstone posts individually (URL Inspection > Request Indexing).
- [ ] Bing Webmaster Tools: verify the site (can import from GSC in one
      click once GSC is verified). Submit the sitemap. This is
      NON-NEGOTIABLE: ChatGPT search runs on Bing, so no Bing index means
      no ChatGPT citations, ever.
- [ ] IndexNow: in Bing Webmaster, note the IndexNow key option. We can
      automate pings at deploy time later; for now Bing's sitemap poll is
      enough once submitted.
- [ ] Crawler/CDN audit: confirm the host is not blocking AI bots. From a
      terminal:
      `curl -A "PerplexityBot" -so /dev/null -w "%{http_code}" https://remi.new/blog`
      and repeat with `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`,
      `GPTBot`, `Googlebot`, `Bingbot`. Every one should return 200. If
      Vercel bot protection or a WAF rule returns 403, whitelist these
      agents. (~27% of B2B sites silently block LLM crawlers at the CDN.)

## 3. Review-platform profiles (this week, ~2 hours total)

Third-party corroboration is half the AEO game (85% of AI-answer brand
mentions come from third-party pages).

- [ ] G2: create the Remi product profile (needs a company account;
      category: AI Agents / Business Process Automation). Real screenshots,
      owner-first description, pricing listed plainly.
- [ ] Capterra (Gartner Digital Markets): same. One submission also feeds
      GetApp and Software Advice.
- [ ] Product Hunt: claim the product page now even if the launch post
      waits; the profile URL itself is a corroborating page.
- [ ] Crunchbase: confirm the Remi entry is current (funding, description,
      remi.new URL). LLMs lean on it for entity resolution.
- [ ] At receipt-verified win moments with early customers, ask for a G2 or
      Capterra review (same trigger discipline as the referral playbook).

## 4. Listicle outreach (start after the posts index, week of 07-14)

The queries to win: "Lindy alternatives", "Viktor alternatives", "best AI
assistant for small business". We show up by being added to pages that
already rank.

- [ ] Build the target list: Google each query above, note the top 5-8
      listicle pages per query (Vellum's alternatives pages are known to
      rank; also look for Zapier, ClickUp, and independent blog roundups).
- [ ] Send a short factual pitch per page: who Remi is for (owner-run
      service businesses), pricing ($99/$199 flat), the one differentiator
      (watches your inbox and books, speaks first, receipts on every
      action), link to the comparison post. No incentives offered, ever.
- [ ] Track in a simple sheet: page, contact, date pitched, result.

## 5. Reddit (ongoing, founder account, 15 min/day)

Perplexity cites Reddit in ~47% of answers; it is the single most-cited
domain across engines.

- [ ] Use your real account, real name in bio, Remi affiliation disclosed.
- [ ] Subs: r/smallbusiness, r/sweatystartup, r/Contractors, r/freelance,
      r/Entrepreneur. Search for live threads on unpaid invoices, deadbeat
      clients, estimate follow-up.
- [ ] The play: genuinely answer the question, paste a usable template
      inline (pull from the blog posts), mention Remi only when someone
      asks or it is directly on point. One good answer in a thread that
      ranks beats ten blog posts on Perplexity.
- [ ] Never astroturf, no sockpuppets, no vote games. One tainted thread
      poisons the whole channel.

## 6. Author entity (E-E-A-T, ~1 hour, this week)

- [ ] Give me your canonical LinkedIn and X profile URLs; I will wire them
      into Person JSON-LD (`sameAs`) on every post byline.
- [ ] A short /about or founder page on remisite with your photo, bio, and
      the honest founder story (I can draft it; needs your voice pass).
- [ ] Syndicate each cornerstone post's core idea to your LinkedIn/X over
      the next two weeks (adapted, not pasted). Builds the author entity
      the blog's authority leans on.

## 7. Weekly citation audit (starts week of 07-20, automatable)

- [ ] Run the 20 title queries as questions across ChatGPT, Perplexity,
      Google AI Overviews, and Claude; record cited / mentioned / absent.
      I can run this as a scheduled agent job and produce the tracking
      sheet; say the word.
- [ ] Expectation: Perplexity citations possible in 1-2 weeks, ChatGPT in
      4-8 (Bing lag), Google AIO variable. Zero citations before August is
      normal, not failure.

## 8. Known follow-ups (mine, not yours)

- Voice-pass and publish the remaining 15 drafts (in waves, next 2-3 days).
- Solutions pages excluded from prerender/sitemap for now (Vue-component
  content, thin). Decide keep-and-prerender vs prune per the copy overhaul.
- Copy-overhaul leftovers: owner-voiced FAQ, Book a Demo removal in legacy
  hero/footer, announcement bar target.
- Case-studies data check: the four case studies claim specific dollar
  outcomes for anonymized businesses. Confirm these trace to real dogfood
  accounts; the SEO plan forbids invented case studies. If they are real,
  add "based on a real Remi workspace" language; if not, they should come
  down before paid traffic hits the site.
