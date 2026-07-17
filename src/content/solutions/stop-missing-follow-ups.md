---
title: "Every waiting customer gets the next message."
description: "Remi notices unanswered leads, quiet quotes, promised callbacks, missing customer details, and overdue invoices, then prepares the follow-up with the full context attached."
industryLabel: "Stop Missing Follow-Ups"
pageType: "capability"
order: "13"
heroMessage: "Remi, find every customer waiting on us and draft the next response."
heroImageUrl: "/images/solutions/hvac-cover@2x.webp"
heroImageAlt: "Service professional reviewing customer work from a phone beside an HVAC system"
useCasesTitle: "The follow-up happens before the opportunity goes cold."
useCaseCatalog:
  title: "More follow-ups Remi keeps moving."
  description: "Remi connects the last conversation, promised next step, current job status, and real deadline so every follow-up feels timely and specific."
  categories:
    - title: "New leads and inquiries"
      items:
        - title: "Answer the request still waiting"
          description: "Remi finds the unanswered inquiry and prepares a response using the customer's details and your availability."
        - title: "Bring back the missed call"
          description: "Remi connects the caller, voicemail, and customer record and drafts the callback text for review."
        - title: "Ask for the missing job detail"
          description: "Remi spots the photo, address, measurement, or timing detail needed to move forward and prepares the question."
        - title: "Confirm the site visit"
          description: "Remi checks the appointment and prepares a confirmation with arrival window and access details."
    - title: "Quotes and decisions"
      items:
        - title: "Follow up on the quiet quote"
          description: "Remi surfaces the customer's last concern and drafts a useful response around the current estimate."
        - title: "Bring back the promised revision"
          description: "Remi notices the quote change still unfinished and gathers the details needed to complete it."
        - title: "Ask for the open selection"
          description: "Remi connects the pending customer choice to its schedule deadline and prepares a focused nudge."
        - title: "Confirm the verbal yes"
          description: "Remi finds the source conversation and prepares the written confirmation, deposit, and scheduling next step."
    - title: "Active jobs and handoffs"
      items:
        - title: "Send the pre-arrival update"
          description: "Remi checks the route and job notes and prepares the customer message before the crew arrives."
        - title: "Bring back the supplier answer"
          description: "Remi matches the supplier's response to the affected customer and prepares the next update."
        - title: "Follow up on missing access"
          description: "Remi notices the job still lacks entry instructions and prepares a clear request before dispatch."
        - title: "Close the loop after service"
          description: "Remi turns completion notes into the customer update, warranty detail, or next appointment you promised."
    - title: "Invoices and relationships"
      items:
        - title: "Nudge the overdue invoice"
          description: "Remi verifies the balance and completed work and drafts a tactful reminder for approval."
        - title: "Confirm the payment promise"
          description: "Remi finds the customer's promised payment date and prepares the right follow-up when it passes."
        - title: "Bring back the renewal"
          description: "Remi connects the expiring service agreement with the customer's history and prepares the renewal message."
        - title: "Ask for the review"
          description: "Remi recognizes a completed job and positive customer response and prepares a timely review request."
stats:
  - metric: "55%+"
    label: "of customers expect a response from a home-service business within the hour"
    sourceLabel: "Jobber, 2026"
    sourceUrl: "https://www.getjobber.com/home-service-trends-report/"
  - metric: "25%"
    label: "of customers cite response speed as an important factor when choosing a provider"
    sourceLabel: "Jobber, 2026"
    sourceUrl: "https://www.getjobber.com/home-service-trends-report/"
  - metric: "47%"
    label: "of small businesses report invoices more than 30 days overdue"
    sourceLabel: "Intuit QuickBooks, 2025"
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/"
useCases:
  - title: "Answer the lead while the job is still available"
    description: "Remi notices the unanswered request, gathers the customer's problem and location, checks your availability, and prepares a specific response for approval."
    workflow:
      - tool: hubspot
        action: "Remi finds the new lead without a completed response in HubSpot."
      - tool: gmail
        action: "Remi reads the customer's request and attached photos in Gmail."
      - tool: googlecalendar
        action: "Remi checks Google Calendar for the nearest site-visit opening."
      - tool: messages
        action: "Remi texts you with the request, location, and proposed appointment."
      - tool: gmail
        action: "After you approve it, Remi sends the site-visit offer through Gmail."
    thread:
      time: "08:07"
      messages:
        - variant: incoming
          text: "Jordan asked about a leaking skylight 42 minutes ago and is still waiting. 👀"
        - variant: outgoing
          text: "What can we offer?"
        - variant: incoming
          text: "Tomorrow at 9:30. The address is 12 minutes from your first job and photos are attached. 📍"
        - variant: outgoing
          text: "Draft the reply."
        - variant: incoming
          text: "Ready for review with the appointment window and photo confirmation. ✍️"
          quickActions: [reminders]
  - title: "Follow up on the quote with a reason to reply"
    description: "Instead of sending a generic check-in, Remi brings forward the customer's last question, current quote, and real scheduling context."
    workflow:
      - tool: servicem8
        action: "Remi finds the sent estimate that has been quiet for five days in ServiceM8."
      - tool: gmail
        action: "Remi reads the customer's last question about project timing in Gmail."
      - tool: googlecalendar
        action: "Remi checks Google Calendar for the next available start date."
      - tool: googledrive
        action: "Remi attaches the current scope and option sheet from Google Drive."
      - tool: messages
        action: "Remi texts you with the customer's concern and a concrete answer."
      - tool: gmail
        action: "After you approve it, Remi sends the quote follow-up through Gmail."
    thread:
      time: "12:44"
      messages:
        - variant: incoming
          text: "The Lee kitchen quote has been quiet for five days. Their last concern was the start date. 🔎"
        - variant: outgoing
          text: "What is our next opening?"
        - variant: incoming
          text: "October 6. The quote is current and their preferred cabinet option is still available. 📅"
        - variant: outgoing
          text: "Use that in the follow-up."
        - variant: incoming
          text: "Ready for review. It answers the timing question and includes the selected option. ✅"
          documentPreview: "Estimate PDF"
  - title: "Chase the invoice without losing the relationship"
    description: "Remi connects the overdue balance with the completed work and recent customer conversation, then prepares the right reminder for the moment."
    workflow:
      - tool: quickbooks
        action: "Remi finds the 14-day-overdue invoice and verifies the open balance in QuickBooks."
      - tool: googledrive
        action: "Remi gathers the signed work order and completion record from Google Drive."
      - tool: gmail
        action: "Remi reads the customer's promise to pay after Friday's inspection."
      - tool: messages
        action: "Remi texts you with the balance, promise, and supporting record together."
      - tool: gmail
        action: "After you approve it, Remi sends the payment reminder through Gmail."
    thread:
      time: "16:18"
      messages:
        - variant: incoming
          text: "The Cole invoice is 14 days late. They said payment would follow Friday's passed inspection. 💸"
        - variant: outgoing
          text: "Did the inspection pass?"
        - variant: incoming
          text: "Yes. The approval and $2,460 balance are attached. 📎"
        - variant: outgoing
          text: "Prepare the reminder."
        - variant: incoming
          text: "Ready for review. It references their promise and keeps the tone straightforward. ✍️"
integrations:
  title: "Follow up with the full story, not another check-in."
  description: "Remi connects the customer, last conversation, promised next step, schedule, quote, and balance so every follow-up moves something specific forward."
  tools:
    - tool: hubspot
      title: "Find the lead without a next step"
      description: "Remi checks contacts, deals, notes, tasks, forms, and last activity and proposes the follow-up or CRM update that should happen next."
    - tool: gmail
      title: "Continue the conversation with context"
      description: "Remi reads connected customer and supplier threads, finds the unresolved question, and drafts the response around what was actually said."
    - tool: googlecalendar
      title: "Use a real opening in the follow-up"
      description: "Remi checks appointments, start dates, availability, and promised callbacks so the next message can offer a concrete path forward."
    - tool: servicem8
      title: "Catch the job or estimate going quiet"
      description: "Remi checks clients, quotes, jobs, tasks, notes, and payments in ServiceM8 and surfaces the record that still needs movement."
    - tool: quickbooks
      title: "Follow the invoice until payment lands"
      description: "Remi verifies invoice status, balance, due date, and payment history before preparing the right reminder for your approval."
ogTitle: "Stop Missing Follow-Ups with Remi"
ogDescription: "Catch unanswered leads, quiet quotes, promised callbacks, customer updates, and overdue invoices before they slip."
---
