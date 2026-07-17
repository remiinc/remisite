const handoffStyles = `<style id="prerender-handoff-style">
      #app[data-prerendered]::before {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        background: #fffef9;
        content: "";
      }
    </style>
    <noscript><style>#app[data-prerendered]::before { display: none; }</style></noscript>`

export const injectPrerenderBody = (html, staticBody) => {
  const maskedHtml = html.replace('</head>', `    ${handoffStyles}\n  </head>`)

  return maskedHtml.replace(
    /(<div id="app"(?=[\s>])[^>]*)(>)(<\/div>)/,
    (_match, rootStart, rootEnd, closingTag) =>
      `${rootStart} data-prerendered${rootEnd}${staticBody}${closingTag}`,
  )
}
