import MarkdownIt from 'markdown-it'

export const markdownToHtml = async (markdown: string) => {
  const markdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
  return await markdownIt.render(markdown)
}
