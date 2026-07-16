---
title: "Keep estimates, customer approvals, repair updates, and unpaid orders moving."
description: "Remi helps auto repair shops follow up on estimates, preserve customer approvals, and prepare pickup and payment updates with the repair context attached."
industryLabel: "Auto Repair"
order: "9"
heroMessage: "Remi, draft pickup updates for today's completed repairs with the balance due."
heroImageUrl: "/images/solutions/auto-repair-cover@2x.webp"
heroImageAlt: "Auto mechanic inspecting the underside of a vehicle"
thumbnailImageUrl: "/images/solutions/auto-repair-thumb@2x.webp"
thumbnailImageAlt: "Auto mechanic inspecting the underside of a vehicle"
stats:
  - metric: "$17.5k"
    label: "in unpaid invoices owed to the average small business"
    sourceLabel: "Intuit QuickBooks, 2025"
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/"
  - metric: "47%"
    label: "of small businesses report invoices more than 30 days overdue"
    sourceLabel: "Intuit QuickBooks, 2025"
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/"
  - metric: "21x"
    label: "more likely to qualify a lead when replying within five minutes instead of thirty"
    sourceLabel: "MIT and InsideSales lead-response research"
    sourceUrl: "https://www.leadresponsemanagement.org/lrm_study"
useCases:
  - title: "Follow up on estimates waiting for a yes"
    description: "Remi watches estimate conversations, surfaces the last customer response, and prepares the next message for your approval before the repair goes elsewhere."
    thread:
      time: "09:04"
      messages:
        - variant: incoming
          text: "The Torres brake estimate has been quiet for four days. They asked if the car is safe for another week. 🚗"
        - variant: outgoing
          text: "What did the tech say?"
        - variant: incoming
          text: "The tech note says to limit driving and schedule the repair this week. The estimate is $860. 🔧"
        - variant: outgoing
          text: "Draft the follow-up."
        - variant: incoming
          text: "Ready for review with the safety note, estimate, and this week's openings. ✍️"
          documentPreview: "Repair estimate PDF"
  - title: "Keep the approval trail with the repair"
    description: "Remi ties the customer's authorization, added work, and price discussion back to the source so the decision does not live only in someone's memory."
    thread:
      time: "11:37"
      messages:
        - variant: incoming
          text: "The valve-cover repair grew after teardown. The customer approved the added gasket and labor by text. 🧾"
        - variant: outgoing
          text: "What amount did they approve?"
        - variant: incoming
          text: "$420 added. Approval came at 11:18 before work resumed. 📌"
        - variant: outgoing
          text: "Keep it with the repair order."
        - variant: incoming
          text: "Prepared with the approval text and updated total for your review. ✅"
          documentPreview: "Repair order PDF"
          quickActions: [notes]
  - title: "Prepare pickup and payment updates"
    description: "When the repair status changes, Remi brings together the customer thread, open balance, and promised timing and drafts the update for you to review."
    thread:
      time: "15:52"
      messages:
        - variant: incoming
          text: "The Singh vehicle is ready. The final balance is $1,740 and pickup was promised after 4. 🔑"
        - variant: outgoing
          text: "Any final notes?"
        - variant: incoming
          text: "The road test passed and the old parts are set aside, as requested. ✅"
        - variant: outgoing
          text: "Draft the pickup text."
        - variant: incoming
          text: "Ready for review with the balance, pickup hours, and road-test result included. ✍️"
          quickActions: [reminders]
ogTitle: "Remi for Auto Repair Shops"
ogDescription: "Keep repair estimates, customer approvals, updates, and unpaid orders moving with Remi."
---
