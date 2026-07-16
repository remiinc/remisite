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
ogTitle: "Remi for Plumbing Services"
ogDescription: "Keep plumbing service calls, quotes, and invoices moving with Remi."
---
