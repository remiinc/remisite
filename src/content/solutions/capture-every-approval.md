---
title: "Every yes, change, and decision stays attached to the work."
description: "Remi finds approvals across connected messages, email, documents, and job records, then turns them into clear written decisions before work or billing moves forward."
industryLabel: "Capture Every Approval"
pageType: "capability"
order: "16"
heroMessage: "Remi, find today's approvals, put every change in writing, and flag what is still waiting."
heroImageUrl: "/images/solutions/home-remodeling-cover@2x.webp"
heroImageAlt: "Home-remodeling team reviewing project details and customer selections"
useCasesTitle: "Work moves faster when every approval is in writing."
useCaseCatalog:
  title: "More approvals Remi keeps attached."
  description: "Remi connects customer choices, field changes, prices, deadlines, and source conversations so every decision has a clear record and next step."
  categories:
    - title: "Customer choices"
      items:
        - title: "Bring back the selection deadline"
          description: "Remi connects the open choice to its ordering or schedule deadline and prepares a focused request."
        - title: "Confirm the chosen option"
          description: "Remi finds the customer's answer and prepares a written confirmation with the exact model, finish, or scope."
        - title: "Resolve conflicting feedback"
          description: "Remi compares comments across channels and surfaces the single decision the customer still needs to make."
        - title: "Attach the approval to the job"
          description: "Remi connects the source message to the relevant task, document, and customer record."
    - title: "Scope and change orders"
      items:
        - title: "Turn the verbal yes into writing"
          description: "Remi gathers the request, price, and schedule impact and prepares a clear confirmation before work continues."
        - title: "Catch added work without approval"
          description: "Remi compares field notes with the signed scope and flags the change still missing authorization."
        - title: "Build the change request"
          description: "Remi assembles the original scope, added work, pricing, photos, and schedule impact into one draft."
        - title: "Confirm approval before billing"
          description: "Remi finds the written authorization and attaches it to the invoice support for review."
    - title: "Partners and internal decisions"
      items:
        - title: "Put an owner on the decision"
          description: "Remi identifies the open question, responsible person, and deadline and prepares the handoff."
        - title: "Confirm the supplier substitution"
          description: "Remi connects the unavailable item, proposed replacement, price difference, and required customer approval."
        - title: "Capture the field direction"
          description: "Remi turns a crew or subcontractor message into a review-ready record before the plan changes."
        - title: "Reconcile two versions"
          description: "Remi compares the latest comments with the current scope or plan and flags the version that needs confirmation."
    - title: "Records and proof"
      items:
        - title: "Build the decision timeline"
          description: "Remi orders the request, options, answer, and resulting change into a clear source-backed history."
        - title: "Keep the source beside the answer"
          description: "Remi attaches the original email, text, or document comment to the recorded approval."
        - title: "Surface the unsigned document"
          description: "Remi spots the agreement or change still waiting for signature and prepares the right reminder."
        - title: "Prepare the approval packet"
          description: "Remi gathers the signed record, supporting photos, and current scope for billing or dispute review."
stats:
  - metric: "76%"
    label: "of Docusign agreements are completed in one day or less"
    sourceLabel: "Docusign eSignature research"
    sourceUrl: "https://www.docusign.com/resources/guides/5-reasons-to-adopt-docusign-esignature-en"
  - metric: "41%"
    label: "of Docusign signatures are completed in under 15 minutes"
    sourceLabel: "Docusign eSignature research"
    sourceUrl: "https://www.docusign.com/resources/guides/5-reasons-to-adopt-docusign-esignature-en"
  - metric: "75%"
    label: "faster agreement turnaround reported with electronic signature workflows"
    sourceLabel: "Docusign eSignature research"
    sourceUrl: "https://www.docusign.com/resources/guides/5-reasons-to-adopt-docusign-esignature-en"
useCases:
  - title: "Put the field change in writing"
    description: "When the customer approves added work in a text, Remi brings the request, original scope, price, and schedule impact into a clear change draft."
    workflow:
      - tool: messages
        action: "Remi reads the customer's approval for the added built-in shelving in Messages."
      - tool: googledrive
        action: "Remi opens the signed scope and field photos in Google Drive."
      - tool: quickbooks
        action: "Remi verifies the $1,850 price and deposit impact in QuickBooks."
      - tool: googledocs
        action: "Remi drafts the change request with the source approval in Google Docs."
      - tool: messages
        action: "Remi texts you with the scope, price, and two-day impact together."
      - tool: gmail
        action: "After you approve it, Remi sends the written change through Gmail."
    thread:
      time: "10:34"
      messages:
        - variant: incoming
          text: "The homeowner texted yes to the added built-in shelving, but there is no written change yet. 👀"
        - variant: outgoing
          text: "What exactly did they approve?"
        - variant: incoming
          text: "$1,850 for two painted units with a two-day schedule impact. Their source text is attached. 📎"
        - variant: outgoing
          text: "Draft the change."
        - variant: incoming
          text: "Ready for review with the scope, price, schedule impact, and original approval. ✍️"
          documentPreview: "Change request PDF"
  - title: "Get the selection before it blocks the schedule"
    description: "Remi connects the unanswered choice to the order deadline and upcoming work, then prepares a decision request that makes the consequence clear."
    workflow:
      - tool: jobnimbus
        action: "Remi finds the open exterior-color selection in JobNimbus."
      - tool: googlecalendar
        action: "Remi checks the paint start and supplier order deadline in Google Calendar."
      - tool: googledrive
        action: "Remi gathers the three approved color options from Google Drive."
      - tool: gmail
        action: "Remi confirms the customer has not answered the latest selection thread."
      - tool: messages
        action: "Remi texts you with the choices and decision deadline."
      - tool: gmail
        action: "After you approve it, Remi sends the focused selection request through Gmail."
    thread:
      time: "08:22"
      messages:
        - variant: incoming
          text: "The Ruiz exterior color is still open. Paint starts Monday and the order locks at noon today. ⏱️"
        - variant: outgoing
          text: "What options did we approve?"
        - variant: incoming
          text: "Iron Ore, Urbane Bronze, or Black Fox. The sample photos are attached. 🎨"
        - variant: outgoing
          text: "Prepare the decision request."
        - variant: incoming
          text: "Ready for review with all three options and the noon deadline. ✅"
          quickActions: [reminders]
  - title: "Resolve conflicting approvals before acting"
    description: "When two stakeholders give different answers, Remi compares both sources with the working document and prepares one clear decision handoff."
    workflow:
      - tool: gmail
        action: "Remi reads the owner's approval for the revised layout in Gmail."
      - tool: slack
        action: "Remi finds the project manager's conflicting direction in Slack."
      - tool: googleslides
        action: "Remi compares both comments with the current presentation in Google Slides."
      - tool: asana
        action: "Remi checks Asana for the decision owner and production deadline."
      - tool: messages
        action: "Remi texts you with the conflict, sources, and proposed owner."
      - tool: slack
        action: "After you approve it, Remi posts the decision request in Slack."
    thread:
      time: "14:11"
      messages:
        - variant: incoming
          text: "Two approvals conflict: the owner chose layout B, but the project manager asked production to use A. 🔎"
        - variant: outgoing
          text: "Who owns the final call?"
        - variant: incoming
          text: "The owner. Both comments and the current presentation are attached. Dana needs the answer by 3. 📌"
        - variant: outgoing
          text: "Draft the decision handoff."
        - variant: incoming
          text: "Ready for review with both sources, one owner, and one required answer. ✅"
          quickActions: [notes]
integrations:
  title: "Keep the decision beside the work it changes."
  description: "Remi connects customer conversations, current documents, job records, prices, and deadlines so every approval is specific, source-backed, and ready to act on."
  tools:
    - tool: gmail
      title: "Find the approval inside the conversation"
      description: "Remi reads connected customer and partner threads for choices, conditions, questions, and explicit approvals and carries the source into the next draft."
    - tool: googledrive
      title: "Compare the decision with the current scope"
      description: "Remi finds agreements, plans, photos, selections, and change records and checks that the approval matches the latest version."
    - tool: googledocs
      title: "Turn the answer into a usable record"
      description: "Remi prepares change requests, decision recaps, scope confirmations, and approval packets with the relevant sources attached."
    - tool: jobnimbus
      title: "Keep the approval attached to the job"
      description: "Remi checks job activity, tasks, documents, estimates, and customer communications and proposes the record update that reflects the decision."
    - tool: slack
      title: "Reconcile decisions across the team"
      description: "Remi reads connected project conversations for conflicting direction, owners, and deadlines and prepares one clear decision handoff for approval."
ogTitle: "Capture Every Approval with Remi"
ogDescription: "Turn customer choices, field changes, and scattered feedback into clear written approvals attached to the work."
---
