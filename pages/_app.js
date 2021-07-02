import ShopifyProvider from '../context/ShopifyContext'
import Head from 'next/head'

import Layout from '../components/Layout'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ShopifyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShopifyProvider>
    </>
  )
}

export default MyApp
