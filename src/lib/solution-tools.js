const composioLogo = (slug) => `https://logos.composio.dev/api/${slug}`
const composioDocs = (slug) => `https://docs.composio.dev/toolkits/${slug}`

const composioToolkit = (name, slug) => ({
  name,
  slug,
  iconUrl: composioLogo(slug),
  docsUrl: composioDocs(slug),
})

export const solutionToolCatalog = {
  acculynx: composioToolkit('AccuLynx', 'acculynx'),
  airtable: composioToolkit('Airtable', 'airtable'),
  asana: composioToolkit('Asana', 'asana'),
  ascora: composioToolkit('Ascora', 'ascora'),
  clickup: composioToolkit('ClickUp', 'clickup'),
  dropbox: composioToolkit('Dropbox', 'dropbox'),
  gmail: composioToolkit('Gmail', 'gmail'),
  googlecalendar: composioToolkit('Google Calendar', 'googlecalendar'),
  googledocs: composioToolkit('Google Docs', 'googledocs'),
  googledrive: composioToolkit('Google Drive', 'googledrive'),
  googlesheets: composioToolkit('Google Sheets', 'googlesheets'),
  googleslides: composioToolkit('Google Slides', 'googleslides'),
  hubspot: composioToolkit('HubSpot', 'hubspot'),
  jobnimbus: composioToolkit('JobNimbus', 'jobnimbus'),
  messages: {
    name: 'Messages',
    iconUrl: '/images/app-logos/ios-messages-icon.svg',
    docsUrl: '',
  },
  paypal: composioToolkit('PayPal', 'paypal'),
  quickbooks: composioToolkit('QuickBooks', 'quickbooks'),
  repairshopr: composioToolkit('RepairShopr', 'repairshopr'),
  servicem8: composioToolkit('ServiceM8', 'servicem8'),
  slack: composioToolkit('Slack', 'slack'),
  square: composioToolkit('Square', 'square'),
  stripe: composioToolkit('Stripe', 'stripe'),
}

export const resolveSolutionTool = (key) => solutionToolCatalog[String(key || '')] || null
