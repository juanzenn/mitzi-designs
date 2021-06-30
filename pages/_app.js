import ShopifyProvider from '../context/ShopifyContext'

import Layout from '../components/Layout'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ShopifyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShopifyProvider>
    </>
  )
}

export default MyApp
