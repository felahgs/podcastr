import Document, {Html, Head, Main, NextScript } from 'next/document';

// A documentação do NEXT exige que o documento seja criado em forma de função
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />

          <link rel="shortcut icon" href="/favicon.png" type="img/png"/>
        </Head>
        <Main/>
        <NextScript />
      </Html>
    );
  }
}