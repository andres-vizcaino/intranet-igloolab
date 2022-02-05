export const formatStringWithChar = (str: string) => {
  if (str) {
    return str
      .replaceAll('&#39;', `'`)
      .replaceAll('&quot;', `"`)
      .replaceAll('&amp;', '&')
      .replaceAll('&gt;', '>')
      .replaceAll('&lt;', '<')
  }
}
