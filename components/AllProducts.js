import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { ShopifyContext } from '../context/ShopifyContext'

const Product = ({ product }) => {
  return (
    <article className='w-full flex flex-col items-center p-2 bg-white-accent shadow-md rounded-sm gap-4'>
      <Link href={`/product/${product.id}`}>
        {product.variants[0].image == null ? (
          <div
            className='bg-primary-500'
            style={{ width: '100%', height: '100%' }}></div>
        ) : (
          <Image
            src={product.variants[0].image.src}
            alt={product.variants[0].image.altText}
            width='250px'
            height='250px'
            className='cursor-pointer'
          />
        )}
      </Link>

      <section className='w-full text-left space-y-0'>
        <h3 className='text-xl text-gray-600 leading-none tracking-tight'>
          {product.title}
        </h3>
        <p className='font-bold text-sm text-gray-800 tracking-tight'>
          ${product.variants[0].price}
        </p>
      </section>
    </article>
  )
}

export default function AllProducts(props) {
  return (
    <section className='container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center px-4'>
      {props.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  )
}
