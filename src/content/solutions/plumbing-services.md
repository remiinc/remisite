---
title: "Keep service calls, quotes, and invoices moving while you are already on the next job."
description: "Remi helps plumbing businesses respond to waiting customers, turn field notes into quote drafts, and connect completed work to the payment still due."
industryLabel: "Plumbing Services"
order: "4"
heroMessage: "Remi, turn today's field notes into quote follow-ups for me to review."
heroImageUrl: "/images/solutions/plumbing-cover@2x.webp"
heroImageAlt: "Plumbing professional standing with a tool belt inside a home"
thumbnailImageUrl: "/images/solutions/plumbing-thumb@2x.webp"
thumbnailImageAlt: "Plumbing professional standing with a tool belt inside a home"
useCasesTitle: "The next call moves while you finish this one."
useCaseCatalog:
  title: "More ways Remi keeps the next call moving."
  description: "Remi connects customer requests, field notes, supplier details, and payment follow-through while the team stays focused on the work."
  categories:
    - title: "Requests and dispatch"
      items:
        - title: "Bring the active leak to the top"
          description: "Remi reads the waiting requests, surfaces the customer reporting active damage, and prepares the immediate next response."
        - title: "Fit an emergency call into the route"
          description: "Remi compares technician locations, current jobs, and drive times, then proposes the least disruptive opening."
        - title: "Confirm access before dispatch"
          description: "Remi gathers shutoff, parking, tenant, and entry details and prepares the missing questions for your approval."
        - title: "Reschedule without losing the customer"
          description: "Remi identifies the affected appointment, checks the next openings, and drafts a clear update for review."
    - title: "Quotes and materials"
      items:
        - title: "Turn field notes into a quote outline"
          description: "Remi organizes the diagnosis, labor, fixture details, and promised options into a quote draft for review."
        - title: "Verify the requested fixture"
          description: "Remi compares the customer's model, site notes, and compatibility details and flags the question still needing an answer."
        - title: "Chase the supplier price"
          description: "Remi spots the quote waiting on a material cost and prepares a focused supplier follow-up with the part details attached."
        - title: "Follow up on a quiet quote"
          description: "Remi surfaces the customer's last concern, checks the current quote, and drafts a useful response for approval."
    - title: "Field records and customer updates"
      items:
        - title: "Brief the technician on service history"
          description: "Remi gathers prior repairs, recurring symptoms, property notes, and customer messages into one field-ready summary."
        - title: "Keep job photos with the work"
          description: "Remi matches the field photos to the correct work order and prepares the record update for review."
        - title: "Capture added work before continuing"
          description: "Remi connects the field discovery, customer conversation, price, and schedule impact into an approval-ready change."
        - title: "Prepare the completion update"
          description: "Remi turns the technician's notes and proof of work into a concise customer message for your approval."
    - title: "Invoices and follow-through"
      items:
        - title: "Reconcile the deposit"
          description: "Remi checks the quote, payment record, and remaining balance and flags anything that does not match."
        - title: "Prepare the overdue reminder"
          description: "Remi ties the open invoice to the signed work order and completed repair, then drafts the follow-up for review."
        - title: "Gather proof for a disputed invoice"
          description: "Remi collects the approval, field notes, photos, and invoice detail into one review-ready timeline."
        - title: "Bring back a warranty callback"
          description: "Remi connects the new concern with the original repair and warranty record, then prepares the next response."
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
  - title: "Respond to the customer still waiting"
    description: "Remi notices unanswered service requests in connected inboxes and messages and prepares a reply with the job details already attached for your review."
    workflow:
      - tool: hubspot
        action: "Remi spots the unanswered leaking-valve request in HubSpot."
      - tool: googlecalendar
        action: "Remi checks Google Calendar for the nearest service opening."
      - tool: airtable
        action: "Remi checks the dispatch route in Airtable and finds the 1:00 slot."
      - tool: messages
        action: "Remi texts you with the opening, drive time, and customer details."
      - tool: messages
        action: "After you approve it, Remi sends the appointment offer in Messages."
    thread:
      time: "08:11"
      messages:
        - variant: incoming
          text: "Nora sent a photo of a leaking shutoff valve at 7:52. She is still waiting. 👀"
        - variant: outgoing
          text: "What is our nearest opening?"
        - variant: incoming
          text: "1:00 after the Lane job. Her address is 9 minutes away. 📍"
        - variant: outgoing
          text: "Draft the reply."
        - variant: incoming
          text: "Ready for review. I offered 1:00 and asked whether the main water is accessible. ✍️"
          quickActions: [reminders]
  - title: "Turn field notes into the next quote"
    description: "Remi brings together the customer's request, your notes, and the promised next step, then drafts the quote follow-up before the day moves on."
    workflow:
      - tool: googledrive
        action: "Remi reads the field notes, model number, and site photos in Google Drive."
      - tool: quickbooks
        action: "Remi checks QuickBooks for the labor and equipment pricing."
      - tool: googledocs
        action: "Remi drafts the quote and exclusions in Google Docs."
      - tool: messages
        action: "Remi texts you when the quote is ready for price confirmation."
      - tool: gmail
        action: "After you approve it, Remi sends the quote through Gmail."
    thread:
      time: "12:38"
      messages:
        - variant: incoming
          text: "Your Kim job notes say to replace the water heater and reroute six feet of gas line. 📝"
        - variant: outgoing
          text: "Did I promise a quote?"
        - variant: incoming
          text: "Yes, by this afternoon. The site photos and model number are attached. 📎"
        - variant: outgoing
          text: "Draft it."
        - variant: incoming
          text: "Ready for review with the scope, exclusions, and a place to confirm the price. ✍️"
          documentPreview: "Quote PDF"
  - title: "Connect completed work to payment"
    description: "When a repair is finished but the balance remains open, Remi gathers the invoice and completion context and prepares a reminder for your approval."
    workflow:
      - tool: quickbooks
        action: "Remi checks QuickBooks to verify the $1,180 open balance."
      - tool: googledrive
        action: "Remi finds the signed work order and leak-test note in Google Drive."
      - tool: square
        action: "Remi checks Square to confirm that no payment has posted."
      - tool: messages
        action: "Remi texts you with the balance and completion record already together."
      - tool: gmail
        action: "After you approve it, Remi sends the invoice reminder through Gmail."
    thread:
      time: "17:03"
      messages:
        - variant: incoming
          text: "The Rivera repair is complete. $1,180 is open and the signed work order is in the job folder. 💸"
        - variant: outgoing
          text: "Do we have the completion note?"
        - variant: incoming
          text: "Yes. The leak test passed at 3:40 and the customer replied thank you. ✅"
        - variant: outgoing
          text: "Prepare the reminder."
        - variant: incoming
          text: "Ready for review with the invoice, work order, and completion note attached. 📎"
          documentPreview: "Invoice PDF"
integrations:
  title: "Keep the call moving without chasing the record."
  description: "Remi connects the waiting customer, open slot, field notes, quote, and payment status so the next step arrives ready for review."
  tools:
    - tool: servicem8
      title: "Turn the callout into a complete job record"
      description: "Remi checks callout jobs, client details, job notes, materials, tasks, and recorded payments in ServiceM8. She surfaces what is missing and proposes the next job-note update for your approval."
    - tool: gmail
      title: "Keep customer and supplier answers together"
      description: "Remi reads connected customer requests, supplier confirmations, and quote questions in Gmail. She drafts the reply with the right job detail and waits for your approval before sending."
    - tool: googlecalendar
      title: "Match the urgent call to a real opening"
      description: "Remi checks service windows, technician availability, travel gaps, and promised arrival times. She proposes the best appointment and prepares the customer confirmation for review."
    - tool: quickbooks
      title: "Build the quote from verified numbers"
      description: "Remi checks customer records, estimate amounts, invoice balances, and due dates in QuickBooks. She brings the verified numbers into the quote or payment follow-up you approve."
    - tool: square
      title: "Know whether the payment actually landed"
      description: "Remi checks Square invoice, payment, and payment-link status before a reminder is drafted. She brings the correct link into the message you approve without changing the payment record."
feature:
  title: "Keep the next call moving before you leave this one."
  imageUrl: "/images/solutions/plumbing-feature@2x.webp"
  imageAlt: "Plumbing professional reviewing a service visit with a homeowner in a kitchen"
  ctaLabel: "Book a demo"
  ctaUrl: "https://remi.new/login"
testimonialQuote: "By the time I leave a job, the notes, quote details, and customer thread are already together. I review the next step instead of rebuilding the whole story."
testimonialName: "Chris"
testimonialPosition: "Owner"
testimonialCompanyType: "plumbing services"
testimonialPlaceholder: true
ogTitle: "Remi for Plumbing Services"
ogDescription: "Keep plumbing service calls, quotes, and invoices moving with Remi."
---
