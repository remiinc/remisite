---
title: "Put every customer decision in writing before the work moves forward."
heroTitleLines:
  - "Put every customer decision in writing"
  - "before the work moves forward."
description: "Remi turns selections, scope changes, and customer decisions into source-backed records before the crew proceeds or the invoice goes out."
heroDescription: "Remi turns selections, scope changes, and customer decisions into source-backed records before the crew proceeds or the invoice goes out."
industryLabel: "Capture Every Approval"
pageType: "capability"
order: "16"
heroMessage: "The Parkers chose the walnut vanity, but the $650 price and two-day impact still need a clear yes. I drafted the confirmation."
heroMessageVariant: "incoming"
heroImageUrl: "/images/solutions/home-remodeling-cover@2x.webp"
heroImageAlt: "Home-remodeling team reviewing project details and customer selections"
useCasesTitle: "Every change has one clear answer and a source."
workflowLabel: "Example workflow"
workflowDescription: "Works with the tools you already use."
useCaseCatalog:
  title: "What Remi turns into a clear approval."
  description: "Remi keeps the decision, exact terms, and source together so the crew knows what can move and the office knows what was agreed."
  categories:
    - title: "Get the yes"
      items:
        - title: "Ask for the exact selection"
          description: "Remi brings the approved options and real deadline into one focused request."
        - title: "Put scope, price, and timing in one request"
          description: "Remi prepares the full change instead of asking the customer to approve a vague description."
        - title: "Flag work that still lacks approval"
          description: "Remi compares the requested work with the signed scope and stops an incomplete yes from becoming a costly assumption."
    - title: "Keep the proof"
      items:
        - title: "Capture the exact line they agreed to"
          description: "Remi records the customer's answer without stretching it beyond the terms they actually accepted."
        - title: "Attach the source to the job"
          description: "Remi keeps the original text, email, or signed document beside the work it changes."
        - title: "Surface conflicting directions before work moves"
          description: "Remi shows you when two answers disagree and prepares the one decision still needed."
stats:
  - metric: "48%"
    label: "of construction rework is attributed to poor project data and miscommunication"
    sourceLabel: "Autodesk and FMI"
    sourceUrl: "https://www.autodesk.com/blogs/construction/construction-disconnected-fmi-report/"
  - metric: "32%"
    label: "of project revenue is lost on average to change orders that go unbilled and unpaid"
    sourceLabel: "Dodge Data and Analytics, via Procore"
    sourceUrl: "https://mkt-cdn.procore.com/downloads/reports/top-business-issues-SCs.pdf"
  - metric: "64%"
    label: "document change orders on more than half of their projects"
    sourceLabel: "Autodesk construction KPI report"
    sourceUrl: "https://www.autodesk.com/content/dam/autodesk/draftr/4794/KPIs-of-Construction-Report.pdf"
useCases:
  - title: "Get the exact selection before work depends on it"
    description: "Remi finds the open choice, approved options, and real deadline, then prepares one focused request. When the customer answers, Remi keeps that source with the job."
    workflow:
      - tool: googledrive
        action: "Remi gathers the current scope, approved options, and supporting photos already on file."
      - tool: googlecalendar
        action: "Remi confirms the ordering cutoff and the work that depends on the decision."
      - tool: gmail
        action: "Remi checks the existing customer thread to confirm that no final answer has landed."
      - tool: messages
        action: "Remi brings you the exact choices, consequence, and decision request for review."
      - tool: gmail
        action: "After approval, Remi sends the request through the customer's existing thread."
    thread:
      time: "08:22"
      messages:
        - variant: incoming
          text: "The Parker vanity finish is still open. The order locks at noon, and installation depends on it. ⏱️"
        - variant: outgoing
          text: "What are their approved options?"
        - variant: incoming
          text: "Walnut or white oak. Both samples and the current allowance are attached. 📎"
        - variant: outgoing
          text: "Prepare the decision request."
        - variant: incoming
          text: "Ready for review with both options and the noon deadline. Nothing has been ordered. ✅"
          quickActions: [reminders]
  - title: "Put scope, price, and timing in one change request"
    description: "When the customer asks for added work, Remi gathers the original scope, owner-supplied price, and schedule impact into one request before calling it approved."
    workflow:
      - tool: messages
        action: "Remi finds the customer's request for the added built-in shelving."
      - tool: googledrive
        action: "Remi compares the request with the signed scope and supporting field photos."
      - tool: quickbooks
        action: "Remi brings forward the recorded $1,850 price and deposit impact without inventing a number."
      - tool: googledocs
        action: "Remi drafts one change request with the added scope, price, and two-day schedule impact."
      - tool: messages
        action: "Remi brings you the complete request for review before anything is sent or scheduled."
    thread:
      time: "10:34"
      messages:
        - variant: incoming
          text: "The Hendersons asked to add two painted built-ins, but they have not approved the price or schedule impact. 👀"
        - variant: outgoing
          text: "Do we have the full change ready?"
        - variant: incoming
          text: "Yes. It is $1,850 with a two-day impact. The original scope and field photos are attached. 📎"
        - variant: outgoing
          text: "Draft the request."
        - variant: incoming
          text: "Ready for review with the exact scope, price, and timing. It is not marked approved yet. ✍️"
          documentPreview: "Change request PDF"
  - title: "Stop when two directions do not agree"
    description: "When customers give different answers, Remi compares both sources with the current scope, marks the decision unresolved, and prepares one clear confirmation."
    workflow:
      - tool: messages
        action: "Remi finds one homeowner's text choosing charcoal tile."
      - tool: gmail
        action: "Remi finds the other homeowner's email choosing limestone tile."
      - tool: googledrive
        action: "Remi checks the signed selection sheet and confirms that it still lists both as options."
      - tool: messages
        action: "Remi brings you the conflict, both sources, and the ordering deadline without choosing for them."
      - tool: gmail
        action: "After review, Remi prepares one confirmation request in the existing customer thread."
    thread:
      time: "14:11"
      messages:
        - variant: incoming
          text: "The Lee tile order has conflicting answers: Dana chose charcoal by text, and Chris chose limestone by email. Nothing should be ordered yet. 🔎"
        - variant: outgoing
          text: "Does the signed selection settle it?"
        - variant: incoming
          text: "No. It still lists both as options, so no final approval has landed. 📌"
        - variant: outgoing
          text: "Draft one confirmation."
        - variant: incoming
          text: "Ready for review with both choices and Friday's order cutoff. The order stays paused until they answer. ✅"
          quickActions: [notes]
integrations:
  title: "Keep the approval beside the work it changes."
  description: "These are examples, not requirements. Remi works across the customer conversations, current scope, prices, deadlines, and job records your business already uses."
  tools:
    - tool: gmail
      title: "Find the answer in the customer conversation"
      description: "Remi reads connected threads for selections, conditions, questions, and explicit approvals and keeps the source with the next step."
    - tool: googledrive
      title: "Compare the answer with the current scope"
      description: "Remi gathers agreements, plans, photos, selections, and accepted changes so the approval stays tied to the right version."
    - tool: quickbooks
      title: "Keep the approved price grounded"
      description: "Remi checks recorded estimates, deposits, and invoice context so a change request uses the numbers your business supplied."
    - tool: googlecalendar
      title: "Connect the decision to the real deadline"
      description: "Remi checks ordering cutoffs, appointments, and scheduled work so the customer understands what their answer affects."
    - tool: googledocs
      title: "Turn exact terms into a usable record"
      description: "Remi prepares selection confirmations and change requests with the scope, price, timing, and source ready for review."
ogTitle: "Capture Every Approval with Remi"
ogDescription: "Turn selections, scope changes, and customer decisions into clear, source-backed approvals before work moves forward."
---
