import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { resetServerContext } from 'react-beautiful-dnd'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage()

    const initialProps = await Document.getInitialProps(ctx)
    resetServerContext()
    return { ...initialProps, ...page }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-16" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-white text-black dark:bg-gray-800 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
