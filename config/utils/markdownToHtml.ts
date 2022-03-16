import MarkdownIt from 'markdown-it'

export const markdownToHtml = (markdown: string) => {
  const markdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
  return markdownIt.render(markdown)
}
