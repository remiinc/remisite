---
title: "Keep seasonal leads moving, put extras in writing, and collect before the next crew rolls out."
description: "Remi helps landscaping businesses respond to seasonal inquiries, document on-site upgrades, and keep deposits, materials, and balances visible."
industryLabel: "Landscaping Services"
order: "6"
heroMessage: "Remi, draft a change order for the extra plantings the customer approved."
heroImageUrl: "/images/solutions/landscaping-cover@2x.webp"
heroImageAlt: "Landscapers cleaning the garden. Person pushing an empty wheelbarrow."
thumbnailImageUrl: "/images/solutions/landscaping-thumb@2x.webp"
thumbnailImageAlt: "Landscapers cleaning the garden. Person pushing an empty wheelbarrow."
useCasesTitle: "Leads, crews, and balances move on the same schedule."
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
  - title: "Respond before the seasonal lead moves on"
    description: "Remi watches new inquiries and unanswered estimate threads, then prepares the next reply with the customer's request ready for your approval."
    workflow:
      - tool: hubspot
        action: "Remi finds the oldest unanswered spring-cleanup lead in HubSpot."
      - tool: googlecalendar
        action: "Remi checks Google Calendar for Thursday's crew route and openings."
      - tool: airtable
        action: "Remi opens the property details and photo request in Airtable."
      - tool: messages
        action: "Remi texts you with the closest lead and the available window."
      - tool: gmail
        action: "After you approve it, Remi sends the seasonal-service reply through Gmail."
    thread:
      time: "07:56"
      messages:
        - variant: incoming
          text: "Three spring cleanup requests arrived yesterday. One has been waiting 19 hours. 🌿"
        - variant: outgoing
          text: "Which is closest to Thursday's route?"
        - variant: incoming
          text: "The Nolan property, 6 minutes from the second stop. They sent photos and asked about mulch. 📍"
        - variant: outgoing
          text: "Draft the response."
        - variant: incoming
          text: "Ready for review. It offers Thursday and asks for the bed measurements. ✍️"
          quickActions: [reminders]
  - title: "Put driveway upgrades in writing"
    description: "When a customer asks for more plantings or added work on site, Remi turns the conversation, price, and decision into a written draft before materials are ordered."
    workflow:
      - tool: messages
        action: "Remi reads the customer's driveway-bed approval in Messages."
      - tool: googledrive
        action: "Remi compares the request with the original proposal in Google Drive."
      - tool: quickbooks
        action: "Remi verifies the $980 materials and labor price in QuickBooks."
      - tool: googledocs
        action: "Remi drafts the added planting scope in Google Docs."
      - tool: messages
        action: "Remi texts you when the change order is ready for review."
    thread:
      time: "13:22"
      messages:
        - variant: incoming
          text: "The Lees asked to extend the driveway bed and add twelve grasses. There is no change order yet. 🌱"
        - variant: outgoing
          text: "What did we quote?"
        - variant: incoming
          text: "$980 for materials and labor. They approved it by text yesterday. 🧾"
        - variant: outgoing
          text: "Put it in writing."
        - variant: incoming
          text: "Ready for review with the added planting scope, price, and approval text attached. ✍️"
          documentPreview: "Change order PDF"
  - title: "Keep deposits, materials, and balances together"
    description: "Remi connects payment status with job notes and customer approvals so you can see what is waiting before the crew or material order moves."
    workflow:
      - tool: quickbooks
        action: "Remi finds the $2,400 deposit still open in QuickBooks."
      - tool: paypal
        action: "Remi checks PayPal to confirm that no payment has arrived."
      - tool: gmail
        action: "Remi reads the nursery's 3:00 material-hold deadline in Gmail."
      - tool: messages
        action: "Remi texts you before the plant reservation expires."
      - tool: gmail
        action: "After you approve it, Remi sends the deposit reminder through Gmail."
    thread:
      time: "14:41"
      messages:
        - variant: incoming
          text: "The Avery install starts Monday. The plant order is due today, but the deposit is still open. 🌱"
        - variant: outgoing
          text: "How much is waiting?"
        - variant: incoming
          text: "$2,400. The proposal is signed and the nursery holds the stock until 3:00. ⏱️"
        - variant: outgoing
          text: "Prepare the reminder."
        - variant: incoming
          text: "Ready for review with the deposit invoice and material deadline included. 📎"
          documentPreview: "Deposit invoice PDF"
          quickActions: [reminders]
integrations:
  title: "Run the route, not the software."
  description: "Remi keeps seasonal leads, recurring work, crew dates, upgrades, material deadlines, and balances connected behind the scenes."
  tools:
    - tool: ascora
      title: "Keep recurring and quoted work in motion"
      description: "Remi checks jobs, quotations, suppliers, inventory, attachments, and customer records in Ascora. She surfaces the next seasonal or project dependency and prepares the record change for your approval."
    - tool: gmail
      title: "Catch the seasonal lead while timing matters"
      description: "Remi reads connected inquiries, property details, upgrade approvals, and supplier replies in Gmail. She drafts the specific response and waits for your approval before sending."
    - tool: googlecalendar
      title: "Protect the crew route and material window"
      description: "Remi checks recurring visits, crew routes, install dates, weather moves, and nursery holds. She proposes the schedule adjustment or customer notice for your approval."
    - tool: googlesheets
      title: "Keep the property list from becoming another inbox"
      description: "Remi checks connected property tables, route plans, seasonal services, and crew notes in Google Sheets. She prepares the row update or daily brief for you to review."
    - tool: quickbooks
      title: "See the deposit before materials are committed"
      description: "Remi checks deposits, upgrade pricing, invoices, due dates, and balances in QuickBooks. She flags what is still open and drafts the payment reminder for your approval."
ogTitle: "Remi for Landscaping Services"
ogDescription: "Keep seasonal leads, written upgrades, deposits, and landscaping balances moving with Remi."
---
