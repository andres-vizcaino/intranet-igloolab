export const formatStringWithChar = (str: string) =>
  str
    .replaceAll('&#39;', `'`)
    .replaceAll('&quot;', `"`)
    .replaceAll('&amp;', '&')
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
