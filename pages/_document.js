import Document, { Html, Head, Main, NextScript } from 'next/document'

class Site extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <div id="skip-link-portal-target"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Site
