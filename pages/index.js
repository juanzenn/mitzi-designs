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

      <section className='w-screen h-screen flex flex-col'>
        <section className='container mx-auto px-4 py-16 mb-10'>
          <h1 className='font-bold text-6xl lg:text-7xl text-center'>
            Mitzi Designs
          </h1>
        </section>

        <section className='container mx-auto'>
          <Products />
        </section>
      </section>
    </>
  )
}
