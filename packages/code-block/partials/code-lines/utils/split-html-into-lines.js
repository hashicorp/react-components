function splitHtmlIntoLines(codeHtml) {
  // Note that newlines should appear at the top level only,
  // we have a rehype plugin to surface newlines in nextjs-scripts,
  // as part of our highlightString() utility
  const lineParts = codeHtml.split('\n')
  return lineParts.map((lineHtml, stableIdx) => {
    return (
      <span
        // This array is stable, so we can use index as key
        // eslint-disable-next-line react/no-array-index-key
        key={stableIdx}
        dangerouslySetInnerHTML={{
          __html: lineHtml == '' ? '&nbsp;' : lineHtml,
        }}
      />
    )
  })
}

export default splitHtmlIntoLines
