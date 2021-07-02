import AllProducts from '../components/AllProducts'
import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import { ShopifyContext } from '../context/ShopifyContext'
import CollectionNavbar from '../components/CollectionNavbar'

export default function index() {
  const { fetchAllProducts, products, fetchCollections, collections } =
    useContext(ShopifyContext)

  useEffect(() => {
    fetchAllProducts()
    fetchCollections()
  }, [])

  const [selectedCollection, setSelectedCollection] = useState(0)

  const handleCollectionSelection = event => {
    setSelectedCollection(event.target.dataset.index)
  }

  if (!products) return <div></div>
  if (!collections) return <div></div>

  return (
    <>
      <Head>
        <title>Mitzi Designs </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='w-screen pb-24'>
        <div className='w-screen' style={{ height: '70vh' }}>
          <section className='w-full h-full bg-primary-600'></section>
        </div>

        {/*  Navbar for collection navigation */}

        <CollectionNavbar
          collections={collections}
          handleCollectionSelection={handleCollectionSelection}
        />

        {/* Products display */}

        <AllProducts
          products={
            selectedCollection == 0
              ? products
              : collections[selectedCollection].products
          }
        />
      </section>
    </>
  )
}
