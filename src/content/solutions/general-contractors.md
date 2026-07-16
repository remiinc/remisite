---
title: "Keep every job moving, every change written down, and every draw ready to collect."
description: "Remi helps general contractors keep progress draws, change orders, customer decisions, and follow-ups from getting buried between the jobsite and the office."
industryLabel: "General Contractors"
order: "1"
heroMessage: "Remi, draft the progress draw follow-up with the approved change order attached."
heroImageUrl: "/images/solutions/construction-cover@2x.webp"
heroImageAlt: "Construction crew reviewing plans at a timber-framed jobsite"
thumbnailImageUrl: "/images/solutions/construction-thumb@2x.webp"
thumbnailImageAlt: "Construction crew working at a timber-framed jobsite"
useCasesTitle: "The job moves when every decision has a next step."
useCaseCatalog:
  title: "More ways Remi keeps every job moving."
  description: "From the first bid request to final closeout, Remi keeps decisions, documents, and money attached to the right job."
  categories:
    - title: "Preconstruction and pipeline"
      items:
        - title: "Prepare a focused bid response"
          description: "Remi finds the unanswered invitation, checks the scope and deadline, and drafts a specific response for your review."
        - title: "Bring site-walk notes forward"
          description: "Remi gathers the photos, measurements, and open assumptions from the site walk into a clear estimating brief."
        - title: "Chase missing subcontractor pricing"
          description: "Remi spots the trade quote still missing before bid day and prepares a reminder with the package and due date attached."
        - title: "Turn a verbal lead into a next step"
          description: "Remi connects the caller's notes, property details, and calendar availability, then prepares the follow-up for approval."
    - title: "Project coordination"
      items:
        - title: "Build the morning decision list"
          description: "Remi reviews today's schedule, open tasks, and overnight messages, then surfaces the decisions that could hold up a crew."
        - title: "Surface the RFI blocking the work"
          description: "Remi finds the unanswered question, links the relevant plan detail, and prepares a focused follow-up to the responsible party."
        - title: "Prepare the owner meeting brief"
          description: "Remi brings together daily logs, schedule changes, pending approvals, and payment items into one concise agenda."
        - title: "Catch a delivery conflict early"
          description: "Remi compares the supplier update with the crew schedule and prepares a revised handoff before the planned start is affected."
    - title: "Changes and approvals"
      items:
        - title: "Put field-directed work in writing"
          description: "Remi turns the field note, source message, price, and schedule impact into a change draft for your approval."
        - title: "Check approval against the latest plan"
          description: "Remi compares the owner's approval with the current drawing revision and flags any mismatch before work continues."
        - title: "Gather support for a change request"
          description: "Remi collects the photos, labor notes, material costs, and original scope into a review-ready change packet."
        - title: "Bring back the selection deadline"
          description: "Remi notices the open owner selection, checks the procurement date, and prepares a focused reminder for review."
    - title: "Billing and closeout"
      items:
        - title: "Review a subcontractor invoice"
          description: "Remi compares the invoice with the purchase order and completion notes, then flags the variance that needs your decision."
        - title: "Assemble progress-draw backup"
          description: "Remi gathers approved changes, current invoices, and completion photos into a draw packet ready for your review."
        - title: "Bring the punch list back"
          description: "Remi groups open punch items by owner and promised date, then drafts the follow-ups needed to finish the job."
        - title: "Prepare the closeout handoff"
          description: "Remi organizes warranties, inspection records, final photos, and outstanding documents into one closeout checklist."
stats:
  - metric: "70%"
    label: "of contractors regularly face delayed payments"
    sourceLabel: "Built, 2025"
    sourceUrl: "https://getbuilt.com/blog/70-percent-of-contractors-say-payment-delays-threaten-industry/"
  - metric: "$17.5k"
    label: "in unpaid invoices owed to the average small business"
    sourceLabel: "Intuit QuickBooks, 2025"
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/"
  - metric: "21x"
    label: "more likely to qualify a lead when replying within five minutes instead of thirty"
    sourceLabel: "MIT and InsideSales lead-response research"
    sourceUrl: "https://www.leadresponsemanagement.org/lrm_study"
useCases:
  - title: "Prepare progress-draw follow-ups"
    description: "Remi watches invoice status, draw schedules, email, and job notes. When a draw sits past due, she gathers the balance and supporting details and prepares a follow-up for your approval."
    workflow:
      - tool: gmail
        action: "Remi reads the owner's approval email and the overdue draw thread in Gmail."
      - tool: quickbooks
        action: "Remi checks QuickBooks to verify the $18,400 balance and due date."
      - tool: googledrive
        action: "Remi gathers the signed draw request and completion photos from Google Drive."
      - tool: messages
        action: "Remi texts you with the missing payment and the supporting proof already together."
      - tool: gmail
        action: "After you approve it, Remi sends the follow-up through Gmail."
    thread:
      time: "08:16"
      messages:
        - variant: incoming
          text: "The Miller draw is 8 days late. The signed request and Friday completion photos are attached. 💸"
        - variant: outgoing
          text: "What is still outstanding?"
        - variant: incoming
          text: "$18,400. The owner approved this phase by email on June 12. 📎"
          documentPreview: "Progress draw PDF"
        - variant: outgoing
          text: "Draft the follow-up."
        - variant: incoming
          text: "Ready for review. It asks for payment this week and includes the approval and photos. ✅"
          quickActions: [reminders]
  - title: "Put every change order in writing"
    description: "When added work starts in a text thread or jobsite note, Remi brings the request, price, and customer response into a clear draft before memory turns into a dispute."
    workflow:
      - tool: messages
        action: "Remi reads the customer's written approval in Messages."
      - tool: googledrive
        action: "Remi opens the original scope and jobsite notes in Google Drive."
      - tool: googledocs
        action: "Remi drafts the $3,200 change order in Google Docs with the source text attached."
      - tool: messages
        action: "Remi texts you when the change order is ready for review."
      - tool: gmail
        action: "After you approve it, Remi sends the change order through Gmail."
    thread:
      time: "11:24"
      messages:
        - variant: incoming
          text: "The kitchen beam change started in a text thread, but there is no signed change order yet. 👀"
        - variant: outgoing
          text: "What did they approve?"
        - variant: incoming
          text: "One added beam and two labor days for $3,200. Their text says to go ahead. 🧾"
        - variant: outgoing
          text: "Put it in writing."
        - variant: incoming
          text: "Drafted with the scope, price, and source text. Nothing goes out until you approve it. ✍️"
          documentPreview: "Change order PDF"
  - title: "Start with the decisions that need you"
    description: "Remi checks connected inboxes, calendars, invoices, and job notes, then surfaces the approvals, waiting customers, and money decisions that need your attention first."
    workflow:
      - tool: clickup
        action: "Remi scans the open job decisions and owners in ClickUp."
      - tool: googlecalendar
        action: "Remi checks Google Calendar to see which decision blocks the first crew."
      - tool: quickbooks
        action: "Remi verifies the supplier deposit and due time in QuickBooks."
      - tool: messages
        action: "Remi texts you a ranked brief with the tile choice at the top."
      - tool: gmail
        action: "After you approve it, Remi sends the homeowner's decision nudge through Gmail."
    thread:
      time: "06:48"
      messages:
        - variant: incoming
          text: "Three jobs need you: a tile approval, a permit answer, and a supplier deposit due today. 🔎"
        - variant: outgoing
          text: "What blocks a crew first?"
        - variant: incoming
          text: "The Dawson tile choice. Install starts at 10 and the homeowner has not confirmed the finish. ⏱️"
        - variant: outgoing
          text: "Draft the nudge."
        - variant: incoming
          text: "Ready for review. I named the two options and the 9:30 decision deadline. ✅"
          quickActions: [reminders]
integrations:
  title: "Run the job without living in every system."
  description: "Remi checks the job record, books, inbox, files, and schedule, then brings the next decision to you with the source attached."
  tools:
    - tool: jobnimbus
      title: "Catch the job before it stalls"
      description: "Remi checks tasks, work orders, material orders, invoices, and job activity. She surfaces the blocker and prepares the task or record change for your approval."
    - tool: quickbooks
      title: "Know which draw needs attention"
      description: "Remi checks open progress draws, balances, due dates, and recorded payments. She flags the draw that needs a nudge and drafts the follow-up for your approval."
    - tool: gmail
      title: "Turn scattered replies into one decision"
      description: "Remi reads connected owner, client, and subcontractor threads for approvals and open questions. She drafts the response with the relevant job context and waits for your approval before sending."
    - tool: googledrive
      title: "Bring the proof with the ask"
      description: "Remi finds signed changes, plans, completion photos, and draw documents in Google Drive. She assembles the supporting packet so the next request is ready for review."
    - tool: googlecalendar
      title: "See what blocks the crew next"
      description: "Remi checks inspections, deliveries, crew starts, and decision deadlines across connected calendars. She proposes the schedule change or customer nudge for your approval."
feature:
  title: "Keep the job moving without heading back to the office."
  imageUrl: "/images/solutions/construction-feature@2x.webp"
  imageAlt: "General contractor reviewing work on a framed residential jobsite"
  ctaLabel: "Book a demo"
  ctaUrl: "https://remi.new/login"
testimonialQuote: "I used to piece together the owner's text, the change order, and the draw from three different places. Remi puts the full story in front of me so I can make the call and keep the job moving."
testimonialName: "Mike"
testimonialPosition: "Owner"
testimonialCompanyType: "general contracting"
testimonialPlaceholder: true
ogTitle: "Remi for General Contractors"
ogDescription: "Keep progress draws, change orders, customer decisions, and follow-ups moving with Remi."
---
