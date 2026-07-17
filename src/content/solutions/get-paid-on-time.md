---
title: "Keep every invoice moving until the money lands."
heroTitleLines:
  - "Keep every invoice moving"
  - "until the money lands."
description: "Remi tracks the payment schedule, prepares invoices from approved numbers, and drafts the next reminder when a balance runs late."
heroDescription: "Remi tracks the payment schedule, prepares invoices from approved numbers, and drafts the next reminder when a balance runs late."
industryLabel: "Get Paid on Time"
pageType: "capability"
order: "15"
heroMessage: "The Henderson demo is complete. The $4,100 progress invoice is ready, matched to the payment schedule."
heroMessageVariant: "incoming"
heroImageUrl: "/images/solutions/roofing-cover@2x.webp"
heroImageAlt: "Contractor reviewing completed exterior work at a residential property"
useCasesTitle: "The next billing step shows up when it is due."
workflowLabel: "Example workflow"
workflowDescription: "Works with the tools you already use."
useCaseCatalog:
  title: "What Remi keeps moving toward paid."
  description: "Remi keeps the agreed numbers, billing milestone, open balance, and customer conversation together from the first invoice to the final payment."
  categories:
    - title: "Bill what was agreed"
      items:
        - title: "Draft the deposit that unlocks the work"
          description: "Remi reads the agreed payment schedule and prepares the deposit tied to scheduling or ordering materials."
        - title: "Trigger the next progress payment"
          description: "When the recorded milestone lands, Remi surfaces the exact payment already attached to it."
        - title: "Net prior payments before the final"
          description: "Remi checks deposits and earlier draws so the final invoice asks for the right remaining balance."
    - title: "Collect what is due"
      items:
        - title: "Choose the right reminder rung"
          description: "Remi checks how late the invoice is and what was already said before drafting one appropriate follow-up."
        - title: "Stop when the customer raises a question"
          description: "Remi pauses the chase and brings forward the agreement or proof needed to answer the issue first."
        - title: "Know when the next message should be a call"
          description: "After the reminder ladder is exhausted, Remi brings you the options instead of inventing another nudge."
stats:
  - metric: "56%"
    label: "of small businesses report being owed money from unpaid invoices"
    sourceLabel: "Intuit QuickBooks, 2025"
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/"
  - metric: "48%"
    label: "of home-service businesses report being paid the same day work is completed"
    sourceLabel: "Jobber, 2026"
    sourceUrl: "https://www.getjobber.com/home-service-trends-report/"
  - metric: "55%"
    label: "of U.S. B2B invoices pass their due date and become overdue"
    sourceLabel: "Stripe, 2025"
    sourceUrl: "https://stripe.com/resources/more/what-is-an-invoice-due-date"
useCases:
  - title: "Bill the next payment when the milestone lands"
    description: "Remi reads the agreed payment schedule, confirms the recorded milestone, and drafts the next deposit, progress, or final invoice without inventing a number."
    workflow:
      - tool: ascora
        action: "Remi confirms the recorded job milestone has actually been completed."
      - tool: googledrive
        action: "Remi reads the agreed payment schedule and any accepted changes."
      - tool: quickbooks
        action: "Remi checks prior invoices, deposits, and payments to avoid billing twice."
      - tool: messages
        action: "Remi brings you the milestone, amount, and invoice draft for review."
      - tool: gmail
        action: "After approval, the invoice is posted and sent through your existing billing path."
    thread:
      time: "15:47"
      messages:
        - variant: incoming
          text: "Demo is marked complete on the Henderson bath. The payment schedule says the second draw is $4,100. 🧾"
        - variant: outgoing
          text: "Has that draw already been billed?"
        - variant: incoming
          text: "No. The deposit is paid, and no previous invoice covers this milestone. The quote is attached. 📎"
        - variant: outgoing
          text: "Draft it."
        - variant: incoming
          text: "Ready for review: progress invoice 2 of 3 for $4,100. Nothing has been posted or sent yet. ✅"
          documentPreview: "Progress invoice PDF"
  - title: "Follow one overdue invoice with the right tone"
    description: "Remi verifies the amount, due date, prior reminders, customer conversation, and payment status before drafting one appropriate follow-up."
    workflow:
      - tool: quickbooks
        action: "Remi verifies the open invoice, exact balance, due date, and days late."
      - tool: gmail
        action: "Remi reads the customer thread for prior reminders, promises, or questions."
      - tool: stripe
        action: "Remi confirms that no payment has landed before preparing another message."
      - tool: messages
        action: "Remi brings you one reminder at the appropriate tone rung for review."
      - tool: gmail
        action: "After approval, Remi sends that reminder with the existing payment path attached."
    thread:
      time: "09:18"
      messages:
        - variant: incoming
          text: "The Dalton invoice is 11 days late. They said payment would follow Monday's walkthrough, and nothing has posted. 💸"
        - variant: outgoing
          text: "Did they raise any issue?"
        - variant: incoming
          text: "No. They approved the completed work Monday afternoon. This is the first reminder. ✅"
        - variant: outgoing
          text: "Draft it."
        - variant: incoming
          text: "Ready for review. It names the $1,920 balance, their payment promise, and the existing payment link. ✍️"
          quickActions: [reminders]
  - title: "Resolve the question before you chase again"
    description: "When the customer questions the balance, Remi pauses the payment chase and connects the invoice, agreement, payment history, and source proof into one clear answer."
    workflow:
      - tool: paypal
        action: "Remi finds the partial payment and the customer's note attached to it."
      - tool: quickbooks
        action: "Remi compares the payment with the open invoice and remaining balance."
      - tool: googledrive
        action: "Remi gathers the signed change and original quote behind the difference."
      - tool: gmail
        action: "Remi reads the customer's exact question before drafting a response."
      - tool: messages
        action: "Remi brings you the mismatch, supporting approval, and explanation for review."
      - tool: gmail
        action: "After approval, Remi sends the explanation before any further payment reminder."
    thread:
      time: "13:32"
      messages:
        - variant: incoming
          text: "Mason paid $4,000 against a $4,640 invoice and questioned the added material charge. The payment chase is paused. 🔎"
        - variant: outgoing
          text: "Do we have their approval?"
        - variant: incoming
          text: "Yes. The signed $640 change and original quote are attached. 📎"
        - variant: outgoing
          text: "Prepare the explanation."
        - variant: incoming
          text: "Ready for review with a simple reconciliation and the signed approval linked. No reminder will go out first. ✅"
integrations:
  title: "Connect the job milestone to the balance still due."
  description: "These are examples, not requirements. Remi works across the job records, books, files, payment tools, and customer conversations your business already uses."
  tools:
    - tool: ascora
      title: "Bring the completed milestone into billing"
      description: "Remi can use connected job, appointment, and completion context to identify when an agreed payment step is ready."
    - tool: quickbooks
      title: "Keep every amount grounded"
      description: "Remi checks the invoice, deposit, prior draws, credits, due date, and recorded payments before preparing a billing action."
    - tool: googledrive
      title: "Bring the agreement and proof forward"
      description: "Remi gathers quotes, accepted changes, completion records, and supporting photos so every amount stays traceable."
    - tool: stripe
      title: "Confirm payment before another reminder"
      description: "Remi checks whether the balance actually landed before drafting another follow-up or marking an invoice paid."
    - tool: gmail
      title: "Respect the conversation around the invoice"
      description: "Remi reads connected billing threads for promises, prior reminders, questions, and disputes before preparing the next message."
ogTitle: "Get Paid on Time with Remi"
ogDescription: "Prepare the right invoice when payment comes due, follow overdue balances, and resolve questions before chasing again."
---
