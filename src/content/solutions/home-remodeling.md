---
title: "Keep walkthroughs, homeowner changes, and progress draws from getting buried."
description: "Remi helps remodeling businesses follow up after walkthroughs, document homeowner changes, and prepare each progress-draw chase with the right proof."
industryLabel: "Home Remodeling"
order: "2"
heroMessage: "Remi, pull together the walkthrough notes and draft the homeowner follow-up."
heroImageUrl: "/images/solutions/home-remodeling-cover@2x.webp"
heroImageAlt: "Remodeling professional sanding a newly finished ceiling"
thumbnailImageUrl: "/images/solutions/home-remodeling-thumb@2x.webp"
thumbnailImageAlt: "Remodeling professional sanding a newly finished ceiling"
useCasesTitle: "Homeowner decisions stay connected to the work."
useCaseCatalog:
  title: "More ways Remi keeps a remodel moving."
  description: "Remi keeps homeowner decisions, trade handoffs, schedule changes, and payments connected from the first walkthrough to warranty work."
  categories:
    - title: "Leads and walkthroughs"
      items:
        - title: "Reply to the right project-fit inquiry"
          description: "Remi reads the homeowner's request, checks the project details, and prepares the questions needed to qualify the opportunity."
        - title: "Prepare the discovery call"
          description: "Remi gathers the property notes, inspiration links, budget clues, and requested timeline into a concise call brief."
        - title: "Summarize the site visit"
          description: "Remi turns measurements, photos, homeowner priorities, and open questions into a structured estimating handoff."
        - title: "Follow up on a quiet proposal"
          description: "Remi spots the proposal without a reply, surfaces the homeowner's last concern, and drafts a useful follow-up for review."
    - title: "Selections and homeowner decisions"
      items:
        - title: "Surface an allowance overage"
          description: "Remi compares the selected item with its allowance and prepares a clear price difference for your review."
        - title: "Bring back a material deadline"
          description: "Remi connects the open selection with the vendor lead time and prepares a reminder before the schedule is affected."
        - title: "Check a choice against the scope"
          description: "Remi compares the homeowner's requested finish with the signed scope and flags what needs clarification or a change."
        - title: "Confirm a vendor substitution"
          description: "Remi gathers the unavailable product, proposed alternative, price difference, and timing into an approval-ready summary."
    - title: "Job coordination"
      items:
        - title: "Prepare the weekly homeowner update"
          description: "Remi combines completed work, next week's schedule, open choices, and current photos into a draft update."
        - title: "Catch a trade handoff gap"
          description: "Remi spots when one trade is finishing without the next crew confirmed and brings the scheduling decision back to you."
        - title: "Keep access instructions current"
          description: "Remi finds the homeowner's latest access note and prepares the job record update for your approval."
        - title: "Explain a schedule impact"
          description: "Remi connects the delayed decision or delivery with the affected work and drafts a clear homeowner update for review."
    - title: "Payments and closeout"
      items:
        - title: "Verify the deposit before ordering"
          description: "Remi checks the signed proposal, deposit status, and order deadline, then surfaces what is still missing."
        - title: "Prepare an invoice explanation"
          description: "Remi ties the invoice amount to completed work and approved changes, then drafts a plain-language note for review."
        - title: "Organize the final punch plan"
          description: "Remi groups homeowner notes, trade assignments, and target dates into a clear path to final signoff."
        - title: "Bring warranty requests into the record"
          description: "Remi connects the homeowner's message with the original work, photos, and warranty terms, then prepares the next step."
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
  - title: "Follow up while the walkthrough is still fresh"
    description: "Remi watches estimate threads and the homeowner's last reply. When the conversation goes quiet, she prepares a specific follow-up with the open decision ready for your approval."
    workflow:
      - tool: gmail
        action: "Remi reads the quiet homeowner thread and last reply in Gmail."
      - tool: googledrive
        action: "Remi opens the walkthrough notes and cabinet photos in Google Drive."
      - tool: googlecalendar
        action: "Remi checks Google Calendar for the cabinet-order deadline."
      - tool: messages
        action: "Remi texts you with the exact layout choice that is still open."
      - tool: gmail
        action: "After you approve it, Remi sends the focused follow-up through Gmail."
    thread:
      time: "09:18"
      messages:
        - variant: incoming
          text: "The Carter walkthrough was three days ago. The cabinet thread is quiet and one layout choice is still open. 👀"
        - variant: outgoing
          text: "Which choice?"
        - variant: incoming
          text: "Island clearance versus the appliance panel. Your notes and both walkthrough photos are attached. 📎"
        - variant: outgoing
          text: "Draft the follow-up."
        - variant: incoming
          text: "Ready for review. It asks them to choose before the cabinet order is finalized. ✍️"
          quickActions: [reminders]
  - title: "Confirm homeowner changes before work continues"
    description: "Remi turns fixture upgrades, layout changes, and extra work discussed by text or email into a written draft with the price and scope tied back to the source."
    workflow:
      - tool: messages
        action: "Remi reads the homeowner's heated-floor approval in Messages."
      - tool: googledrive
        action: "Remi compares the request with the signed scope in Google Drive."
      - tool: quickbooks
        action: "Remi verifies the $2,850 added price in QuickBooks."
      - tool: googledocs
        action: "Remi drafts the change order in Google Docs with the source approval attached."
      - tool: messages
        action: "Remi texts you when the document is ready for review."
    thread:
      time: "13:07"
      messages:
        - variant: incoming
          text: "The Parkers asked by text to add heated floors after signing the original scope. 🧠"
        - variant: outgoing
          text: "Did we price it?"
        - variant: incoming
          text: "$2,850 in your site notes. They replied yes, add it. 🧾"
        - variant: outgoing
          text: "Draft the change order."
        - variant: incoming
          text: "Ready for review with the added scope, price, and approval text attached. ✍️"
          documentPreview: "Change order PDF"
  - title: "Bring the proof to every progress draw"
    description: "Remi connects the balance with completion notes, approvals, and photos, then prepares a payment follow-up you can review before it goes to the homeowner."
    workflow:
      - tool: quickbooks
        action: "Remi checks QuickBooks for the $12,600 draw and its due date."
      - tool: googledrive
        action: "Remi gathers the daily log and fixture approval from Google Drive."
      - tool: dropbox
        action: "Remi pulls the matching milestone photos from Dropbox."
      - tool: messages
        action: "Remi texts you with the complete draw packet and open balance."
      - tool: gmail
        action: "After you approve it, Remi sends the payment follow-up through Gmail."
    thread:
      time: "15:32"
      messages:
        - variant: incoming
          text: "The second draw is due tomorrow. Demo and rough plumbing are both marked complete. 💰"
        - variant: outgoing
          text: "Do we have the proof together?"
        - variant: incoming
          text: "Yes. Daily log, completion photos, and the fixture approval are tied to the $12,600 draw. 📸"
        - variant: outgoing
          text: "Prepare the follow-up."
        - variant: incoming
          text: "Ready for review with the invoice, milestones, and supporting photos attached. ✅"
          documentPreview: "Progress draw PDF"
integrations:
  title: "Keep the homeowner thread and job record in sync."
  description: "Remi follows selections, scope changes, dates, and money across the tools behind the remodel, then brings the next homeowner decision to you."
  tools:
    - tool: jobnimbus
      title: "Keep selections from becoming delays"
      description: "Remi checks job activity, tasks, work orders, and open decisions in JobNimbus. She surfaces the selection blocking the next trade and prepares the record update for your approval."
    - tool: gmail
      title: "Find the answer inside the homeowner thread"
      description: "Remi reads connected homeowner, designer, and vendor email for approvals and unresolved questions. She drafts the specific follow-up and waits for your approval before sending."
    - tool: googledrive
      title: "Keep the walkthrough evidence together"
      description: "Remi finds plans, scope documents, walkthrough photos, and signed changes in Google Drive. She assembles the right sources beside the draft so you can review the full story at once."
    - tool: quickbooks
      title: "Tie every change back to the money"
      description: "Remi checks deposits, change pricing, progress draws, and open balances in QuickBooks. She flags mismatches and prepares the payment or pricing follow-up for your approval."
    - tool: googlecalendar
      title: "Protect the install date"
      description: "Remi checks walkthroughs, install dates, vendor windows, and homeowner decision deadlines. She proposes the reminder or calendar change before the schedule slips."
testimonialQuote: "A homeowner can change a detail during a walkthrough and I do not have to trust that I will remember it that night. Remi brings the note, photo, and next message together for me."
testimonialName: "Sarah"
testimonialPosition: "Owner"
testimonialCompanyType: "home remodeling"
testimonialPlaceholder: true
ogTitle: "Remi for Home Remodeling Businesses"
ogDescription: "Keep walkthroughs, homeowner changes, and progress draws from getting buried with Remi."
---
