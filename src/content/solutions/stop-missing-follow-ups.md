---
title: "Don't let the next job go cold."
description: "Remi catches unanswered leads, quiet quotes, and past customers worth another call, then drafts the right message for your approval."
heroDescription: "Remi catches unanswered leads, quiet quotes, and past customers worth another call, then drafts the right message for your approval."
industryLabel: "Stop Missing Follow-Ups"
pageType: "capability"
order: "13"
heroMessage: "Three follow-ups need attention. The Lee quote has been quiet five days, and I drafted the first nudge."
heroMessageVariant: "incoming"
heroImageUrl: "/images/solutions/hvac-cover@2x.webp"
heroImageAlt: "Service professional reviewing customer work from a phone beside an HVAC system"
useCasesTitle: "The next message is ready before the job goes cold."
workflowLabel: "Example workflow"
workflowDescription: "Works with the tools you already use."
useCaseCatalog:
  title: "What Remi keeps warm."
  description: "Remi brings back the real conversation, timing, and job history so each follow-up has a reason."
  categories:
    - title: "New work"
      items:
        - title: "Answer the new inquiry"
          description: "Remi finds the unanswered request and prepares a response specific to the customer's job."
        - title: "Ask only what is missing"
          description: "Remi asks for the one or two details needed to understand the work and move it forward."
        - title: "Offer a real visit time"
          description: "Remi checks your calendar and proposes an opening you can actually keep."
    - title: "Warm work"
      items:
        - title: "Nudge the quiet quote"
          description: "Remi uses the customer's real question, quote, and timing instead of sending a generic check-in."
        - title: "Know when another text will not help"
          description: "After two unanswered nudges, Remi recommends a call instead of adding more noise."
        - title: "Reconnect from real job history"
          description: "Remi finds a completed job and a natural reason to reach back out to that customer."
stats:
  - metric: "25%"
    label: "of customers cite initial response speed as a factor when choosing a provider"
    sourceLabel: "Jobber, 2026"
    sourceUrl: "https://www.getjobber.com/home-service-trends-report/"
  - metric: "77%"
    label: "of estimates are closed during the same visit by top-performing contractors"
    sourceLabel: "ServiceTitan, 2026"
    sourceUrl: "https://www.servicetitan.com/toolbox/state-of-the-trades/trends/top-performer-profile"
  - metric: "68%"
    label: "of homeowners would hire the same company again after excellent service"
    sourceLabel: "Housecall Pro, 2025"
    sourceUrl: "https://www.housecallpro.com/resources/home-service-customer-service-report-trends-statistics/"
useCases:
  - title: "Answer the lead before they call the next contractor"
    description: "Remi gathers the request, checks real availability, and prepares a specific first reply while the job is still available."
    workflow:
      - tool: gmail
        action: "Remi reads the customer's request and attached photos."
      - tool: googledrive
        action: "Remi gathers any measurements or property details already captured."
      - tool: googlecalendar
        action: "Remi checks the calendar for one or two real visit times."
      - tool: messages
        action: "Remi brings you the request and proposed next step for review."
      - tool: gmail
        action: "After approval, Remi replies with the specific job and visit options."
    thread:
      time: "08:07"
      messages:
        - variant: incoming
          text: "Jordan asked about a leaking skylight 42 minutes ago and is still waiting. I drafted a reply. 👀"
        - variant: outgoing
          text: "What can we offer?"
        - variant: incoming
          text: "Tomorrow at 9:30 or Thursday at 2:00. Both are open, and their photos are attached. 📍"
        - variant: outgoing
          text: "Show me."
        - variant: incoming
          text: "Ready for review. It names the skylight leak and offers those two times. ✍️"
          quickActions: [reminders]
  - title: "Follow up on a quiet quote with something useful"
    description: "Remi confirms the silence, finds the customer's real concern, and prepares a short nudge with a concrete next step."
    workflow:
      - tool: gmail
        action: "Remi confirms the customer has not replied to the quote."
      - tool: googledrive
        action: "Remi pulls in the current quote and the customer's selected option."
      - tool: googlecalendar
        action: "Remi checks the calendar before mentioning a start window."
      - tool: messages
        action: "Remi brings you the quiet quote and grounded nudge for review."
      - tool: gmail
        action: "After approval, Remi sends the first follow-up in the existing thread."
    thread:
      time: "12:44"
      messages:
        - variant: incoming
          text: "The Lee heat-pump quote has been quiet five days. Their last concern was the start date. 🔎"
        - variant: outgoing
          text: "Do we have an opening?"
        - variant: incoming
          text: "October 6 is open, and the quoted equipment is still available. 📅"
        - variant: outgoing
          text: "Use that."
        - variant: incoming
          text: "Ready for review. It answers the timing question without inventing urgency. ✅"
          documentPreview: "Estimate PDF"
  - title: "Bring back a past customer for the next job"
    description: "Remi uses completed job history and a real reason to reconnect, then prepares one personal note—not a marketing blast."
    workflow:
      - tool: googledrive
        action: "Remi finds the completed job record and photos from the work."
      - tool: gmail
        action: "Remi checks what the customer previously said about future work."
      - tool: googlecalendar
        action: "Remi confirms there is room in the schedule before offering it."
      - tool: messages
        action: "Remi brings you the customer, past job, and reason to reach out."
      - tool: gmail
        action: "After approval, Remi sends one personal note in the existing relationship."
    thread:
      time: "16:18"
      messages:
        - variant: incoming
          text: "The Novaks' kitchen was completed two years ago, and they mentioned the hall bath. You have room opening next month. 🛠️"
        - variant: outgoing
          text: "Any issues on the last job?"
        - variant: incoming
          text: "None. Final payment landed, and they said they loved the kitchen. The old thread is attached. ✅"
        - variant: outgoing
          text: "Draft a note."
        - variant: incoming
          text: "Ready for review. It references the kitchen and offers a time to look at the bath. ✍️"
integrations:
  title: "Follow up from the history you already have."
  description: "These are examples, not requirements. Remi works across the customer conversations, schedules, quotes, and job records your business already uses."
  tools:
    - tool: gmail
      title: "Continue the real conversation"
      description: "Remi reads the connected thread, finds the unanswered question, and prepares the next reply around what the customer actually said."
    - tool: googlecalendar
      title: "Offer time you can actually keep"
      description: "Remi checks real visit times, start windows, and callbacks before putting a date in front of the customer."
    - tool: googledrive
      title: "Keep the quote and job history attached"
      description: "Remi brings forward the current quote, photos, scope, and completed work so the follow-up stays specific."
    - tool: acculynx
      title: "Bring the roofing record with you"
      description: "Remi can use connected customer, lead, and job details to ground the next step without making you rebuild the context."
    - tool: repairshopr
      title: "Pick up from the service history"
      description: "Remi can connect the customer record, prior work, and open conversation before preparing a personal follow-up."
ogTitle: "Stop Missing Follow-Ups with Remi"
ogDescription: "Answer new leads, follow up on quiet quotes, and reconnect with past customers before the next job goes cold."
---
