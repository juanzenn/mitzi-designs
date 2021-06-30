import AllProducts from '../components/AllProducts'
import Head from 'next/head'
import { useEffect, useContext } from 'react'
import { ShopifyContext } from '../context/ShopifyContext'

export default function index(props) {
  const { fetchAllProducts, products } = useContext(ShopifyContext)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const Loading = () => {
    return <div>Loading...</div>
  }

  const Products = () => {
    if (products.length == 0) {
      return <Loading />
    } else {
      return <AllProducts products={products} />
    }
  }

  return (
    <>
      <Head>
        <title>Mitzi Designs </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='w-screen space-y-16 pb-24'>
        <div className='w-screen h-96'>
          <section className='w-full h-full bg-primary-600'></section>
        </div>

        <section className='container mx-auto'>
          <Products />
        </section>
      </section>
    </>
  )
}
