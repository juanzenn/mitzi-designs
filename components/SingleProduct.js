import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Atomic/Button'

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
        <Button onClick={handleClick}>Añadir al carrito</Button>
      </section>
    )
  } else {
    return (
      <section className='flex gap-2 items-center'>
        <p className='text-sm text-red-500'>Este producto no está disponible</p>
        <Button
          className='bg-gray-100 text-gray-400 py-2 px-4 border-2 border-gray-100 rounded-md shadow-sm cursor-not-allowed'
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
        className='w-full lg:w-1/2 px-4 py-2 border border-gray-300 cursor-pointer shadow-md'
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

      <main className='py-4'>
        <section className='my-6 px-4'>
          <Link href='/'>
            <a className='font-bold text-black hover:text-gray-900 transition-all duration-300'>
              {'<'} Go back
            </a>
          </Link>
        </section>

        <article className='container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center gap-6 '>
          <section className='w-full grid justify-items-center p-4 gap-4'>
            <div>
              <figure
                className='w-96 h-96 bg-center bg-cover bg-no-repeat'
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
                  width='100px'
                  height='100px'
                  className='cursor-pointer hover:shadow-sm hover:opacity-60 transition-all duration-300'
                />
              ))}
            </div>
          </section>
          <section className='w-full space-y-4'>
            {/* Product title and product price */}
            <section className='space-y-1'>
              <h2 className='font-semibold text-2xl lg:text-3xl text-gray-600'>
                {product.title}
              </h2>
              <p className='text-gray-800 font-bold text-2xl'>
                ${product.variants[productVariant].price}
              </p>
            </section>
            {/* Product information */}
            <section>
              <p className='text-gray-500'>{product.description}</p>
            </section>
            {/* Variant selector */}
            <SelectVariant
              variants={product.variants}
              handleChange={handleVariantChange}
            />
            {/* Quantity selector */}
            <section className='flex flex-col gap-1'>
              <label
                htmlFor='quantity'
                className='font-semibold text-sm text-gray-400'>
                Cantidad:
              </label>
              <input
                type='number'
                name='quantity'
                id='quantity'
                className='w-1/5 px-4 py-2 border border-gray-300 shadow-md'
                min='1'
                value={quantity}
                onChange={handleQuantityChange}
              />
            </section>
            {/* Add to cart button */}
            <BuyingSection
              itemId={product.variants[productVariant].id}
              quantity={quantity}
              selectedVariant={productVariant}
              variants={product.variants}
            />
          </section>
        </article>

        <section></section>
      </main>
    </>
  )
}
