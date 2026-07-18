export const faqGroups = {
  home: {
    title: 'Have questions? Text Remi.',
    defaultOpenIndex: 0,
    cta: { label: 'Text Remi', href: '/start' },
    links: [
      { label: 'Pricing questions', href: '/pricing#faq' },
      { label: 'How Remi protects your data', href: '/security#faq' },
    ],
    items: [
      {
        question: 'What does Remi actually handle?',
        answers: [
          'Remi keeps the business side moving from the first quote to the final payment—follow-ups, approvals, paperwork, invoices, and the loose ends between them.',
        ],
      },
      {
        question: 'Do I have to keep telling Remi what to do?',
        answers: [
          'No. Remi watches the sources you connect, notices work that needs attention, and texts you first. You can also text Remi whenever you need something handled.',
        ],
      },
      {
        question: 'Do I have to change the tools I already use?',
        answers: [
          'No. Your inbox, calendar, files, accounting system, and job tools stay where the work lives. Remi connects the context and brings the next decision to you.',
        ],
      },
      {
        question: 'Can I really run this from my phone?',
        answers: [
          'Yes. You text Remi from your phone, and Remi brings questions, drafts, approvals, and receipts back to the conversation. Your connected tools remain the source of truth.',
        ],
      },
      {
        question: 'What can Remi do without my approval?',
        answers: [
          'Remi can read connected sources, organize context, and prepare work. Customer-facing sends and important record changes wait for your approval. If something looks wrong, the source stays attached so you can correct it before it leaves.',
        ],
      },
      {
        question: 'Is my business data safe?',
        answers: [
          'Remi works only inside the access you grant. Your business data is not sold, used for advertising, or used to train generalized AI models. You can change or revoke connected access.',
        ],
      },
      {
        question: 'How do I get started?',
        answers: [
          'Text Remi. Remi asks a few questions about your business, then helps you choose which tools and sources to connect. You can start small and add more over time.',
        ],
      },
    ],
  },
  pricing: {
    title: 'Questions we hear a lot.',
    items: [
      {
        question: 'What do the Pro and Scale plans cost?',
        answers: [
          'Pro is $119 month to month, or $99 per month when billed annually. Scale is $239 month to month, or $199 per month when billed annually.',
        ],
      },
      {
        question: 'Which plan is right for my business?',
        answers: [
          'Pro is built for individuals and small owner-run teams with a daily list of follow-ups, estimates, invoices, and customer requests. Scale adds more capacity for teams with more active jobs, accounts, and work in motion.',
        ],
      },
      {
        question: 'Can I pay monthly or annually?',
        answers: [
          'Yes. Annual billing saves 20%. Checkout shows the billing schedule, total, and renewal price before you confirm.',
        ],
      },
      {
        question: 'Is there a trial?',
        answers: [
          'Remi includes a seven-day trial. A card is required, and checkout shows the plan, first charge date, and renewal price before you confirm.',
        ],
      },
      {
        question: 'Can I cancel?',
        answers: [
          'Yes. Cancel before the next renewal to stop future charges. Your billing screen shows the active billing period and renewal timing.',
        ],
      },
      {
        question: 'What happens if a busy month needs more capacity?',
        answers: [
          'Scale includes more monthly capacity for heavier follow-through. Capacity add-ons persist until used, so a temporary spike does not force you into a permanent plan change.',
        ],
      },
      {
        question: 'What can Remi do without my approval?',
        answers: [
          'Remi can watch connected sources, organize context, flag loose ends, and prepare drafts. Customer-facing sends and important source-of-truth changes wait for your approval.',
        ],
      },
      {
        question: 'Is my business data used to train AI models?',
        answers: [
          'No. Your business data is not sold, shared for advertising, or used to train AI models. Remi works only inside the access you grant.',
        ],
      },
    ],
  },
  security: {
    title: 'Questions we hear a lot.',
    items: [
      {
        question: 'What can Remi access?',
        answers: [
          'Only the sources you connect and the permission scopes you grant. Remi uses the identity and boundaries attached to your workspace, and connections can be limited, changed, or revoked.',
        ],
      },
      {
        question: 'What can Remi do without asking me?',
        answers: [
          'Remi can read connected sources, organize context, surface loose ends, and prepare work inside the access you granted. An important external action needs authority from a direct request, your review, or a standing approval.',
        ],
      },
      {
        question: 'How is my data protected?',
        answers: [
          'Data is protected in transit, sensitive credentials and stored secrets are encrypted at rest, and authentication and tenant boundaries separate workspaces. Production systems are monitored for availability, errors, abuse signals, and unusual behavior.',
        ],
      },
      {
        question: 'Is my business data used to train AI models?',
        answers: [
          'Customer content is not used to train generalized AI models unless your organization separately agrees in writing. We require AI providers to honor available no-training commitments for customer content routed through Remi.',
        ],
      },
      {
        question: 'Can I revoke access or request deletion?',
        answers: [
          'Yes. Connected access can be changed or revoked. You can request deletion at ops@remi.new; limited records may remain temporarily in backups, logs, billing records, security systems, or audit trails as described in our privacy policy.',
        ],
      },
    ],
  },
  solutions: {
    title: 'Questions we hear a lot.',
    items: [
      {
        question: 'Do I have to replace the software I already use?',
        answers: [
          'No. Remi works across the inbox, calendar, files, accounting system, and job tools you connect. Those systems remain the source of truth while Remi brings the next decision to you.',
        ],
      },
      {
        question: 'What can Remi take off my plate?',
        answers: [
          'Remi can watch for unanswered requests, quiet estimates, overdue invoices, missing approvals, schedule changes, and work that needs a written record. Remi gathers the source context and prepares the next step for review.',
        ],
      },
      {
        question: 'Will Remi contact customers or change records without me?',
        answers: [
          'No important customer-facing send or source-of-truth change happens quietly. Remi prepares the work, shows you the source, and waits for your approval.',
        ],
      },
      {
        question: 'How does Remi learn my business?',
        answers: [
          'From the sources you connect and the work already inside them. Remi builds context around customers, jobs, prices, promises, and deadlines while keeping each fact tied to its source.',
        ],
      },
      {
        question: 'How long does setup take?',
        answers: [
          'Most businesses start with a small set of core sources, such as email, calendar, files, and accounting. The exact setup depends on the tools and access you choose to connect.',
        ],
      },
      {
        question: 'What does Remi cost?',
        answers: [
          'Pro is $119 month to month, or $99 per month when billed annually. Scale is $239 month to month, or $199 per month when billed annually.',
        ],
      },
      {
        question: 'Is my business data safe?',
        answers: [
          'Remi works only inside the access you grant. Your business data is not sold, shared for advertising, or used to train AI models, and important work keeps a visible source trail.',
        ],
      },
      {
        question: 'What happens when Remi gets something wrong?',
        answers: [
          'Remi is useful, not infallible. Drafts stay reviewable, customer-facing work waits for approval, and the source remains attached so you can correct the work before it leaves.',
        ],
      },
    ],
  },
}

export const faqTypes = Object.freeze(Object.keys(faqGroups))

faqTypes.forEach((type) => {
  const group = faqGroups[type]
  const questions = group.items.map((item) => item.question)

  if (!group.title || group.items.length === 0) {
    throw new Error(`FAQ group "${type}" must have a title and at least one question`)
  }

  if (new Set(questions).size !== questions.length) {
    throw new Error(`FAQ group "${type}" contains duplicate questions`)
  }

  if (group.items.some((item) => !item.question || !item.answers.length || item.answers.some((answer) => !answer))) {
    throw new Error(`FAQ group "${type}" contains incomplete content`)
  }
})

export const isFaqType = (value) => faqTypes.includes(value)

export const getFaqGroup = (type) => faqGroups[type] || null
