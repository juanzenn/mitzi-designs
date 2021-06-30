import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Atomic/Button'
import { ArrowBack } from 'akar-icons'

import { ShopifyContext } from '../context/ShopifyContext'

import { useState, useContext, useEffect } from 'react'

const BuyingSection = ({ variants, selectedVariant, itemId, quantity }) => {
  const { addItem } = useContext(ShopifyContext)

  const handleClick = () => {
    addItem(itemId, parseInt(quantity))
  }

  if (variants[selectedVariant].available) {
    return (
      <section className='w-full'>
        <Button onClick={handleClick} className='w-full'>
          Añadir al carrito
        </Button>
      </section>
    )
  } else {
    return (
      <section className='flex gap-2 items-center'>
        <p className='text-sm text-red-500'>Este producto no está disponible</p>
        <Button
          className='bg-gray-100 text-gray-400 border-2 border-gray-100 rounded-md shadow-sm cursor-not-allowed'
          disabled>
          Añadir
        </Button>
      </section>
    )
  }
}

const SelectVariant = ({ variants, handleChange }) => {
  if (variants.lenght == 1) {
    return null
  } else {
    return (
      <select
        className='w-full p-2 border-2 border-primary-600 cursor-pointer shadow-md rounded-md text-gray-700 bg-white-accent'
        name='variants'
        id='variants'
        onChange={handleChange}>
        {variants.map((variant, index) => (
          <option key={variant.id} value={index}>
            {variant.title}
          </option>
        ))}
      </select>
    )
  }
}

export default function SingleProduct({ productId }) {
  const { fetchProduct, product } = useContext(ShopifyContext)

  useEffect(() => {
    fetchProduct(productId)

    return () => {}
  }, [fetchProduct])

  const [productVariant, setProductVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleVariantChange = event => {
    setProductVariant(event.target.value)
  }

  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handleImageChange = (event, url) => {
    setSelectedImage(url)
  }

  if (!product.title) return 'Loading...'

  const backgroundUrl =
    selectedImage == '' ? product.images[0].src : selectedImage

  return (
    <>
      <Head>
        <title>Store Name - {product.title}</title>
      </Head>

      <main className='bg-white-accent min-h-screen'>
        <section className='pt-4 px-4'>
          <Link href='/'>
            <a className='font-bold text-gray-900 hover:text-primary-500 transition-all duration-300'>
              <ArrowBack size={30} />
            </a>
          </Link>
        </section>

        <article className='container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center gap-6 '>
          <section className='w-full h-full grid justify-items-center p-4 gap-4'>
            <div>
              <figure
                className='w-72 h-72 bg-center bg-cover bg-no-repeat shadow-lg rounded-sm'
                style={{
                  backgroundImage: 'url(' + backgroundUrl + ')',
                }}></figure>
            </div>
            <div className='grid grid-cols-4 gap-2 '>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  onClick={event =>
                    handleImageChange(event, product.images[index].src)
                  }
                  src={image.src}
                  alt={image.altText}
                  width='70px'
                  height='70px'
                  className='cursor-pointer hover:shadow-sm hover:opacity-60 transition-all duration-300 rounded-lg'
                />
              ))}
            </div>
          </section>

          <section
            className='w-screen bg-white space-y-4 p-4 rounded-t-3xl lg:rounded-b-3xl flex flex-col justify-around'
            style={{
              boxShadow: '0 -5px 15px rgba(0,0,0,.10)',
              minHeight: '47vh',
            }}>
            {/* Product title and product price */}
            <div className='space-y-6'>
              <section>
                <h2 className='text-4xl lg:text-5xl text-gray-400 tracking-tight'>
                  {product.title}
                </h2>
                <p className='text-gray-800 font-bold text-xl'>
                  ${product.variants[productVariant].price}
                </p>
              </section>
              {/* Product information */}
              <section>
                <p className='text-gray-500'>{product.description}</p>
              </section>
              {/* Variant selector */}
              <div>
                <label
                  htmlFor='quantity'
                  className='font-semibold text-base text-primary-500 pt-4 leading-none'>
                  Cantidad:
                </label>
                <section className='flex gap-4'>
                  {/* Quantity selector */}
                  <article className=''>
                    <input
                      type='number'
                      name='quantity'
                      id='quantity'
                      className='w-full p-2 border-2 border-primary-600 cursor-pointer shadow-md rounded-md text-gray-700 bg-white-accent'
                      placeholder='1'
                      min='1'
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </article>
                  <SelectVariant
                    variants={product.variants}
                    handleChange={handleVariantChange}
                  />
                </section>
              </div>
            </div>

            {/* Add to cart button */}
            <BuyingSection
              itemId={product.variants[productVariant].id}
              quantity={quantity}
              selectedVariant={productVariant}
              variants={product.variants}
            />
          </section>
        </article>
      </main>
    </>
  )
}
