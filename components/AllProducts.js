import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import Button from './Atomic/Button'

import { ShopifyContext } from '../context/ShopifyContext'

const Product = ({ product }) => {
  const { addItem } = useContext(ShopifyContext)

  const handleClick = id => {
    addItem(id, 1)
  }

  return (
    <article className='w-full flex flex-col items-center p-2 bg-white-accent shadow-md rounded-sm gap-4'>
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.variants[0].image.src}
          alt={product.variants[0].image.altText}
          width='250px'
          height='250px'
          className='cursor-pointer'
        />
      </Link>

      <section className='w-full text-left space-y-0'>
        <h3 className='text-xl text-gray-500 leading-none tracking-tight'>
          {product.title}
        </h3>
        <p className='font-bold text-sm text-gray-700 tracking-tight'>
          ${product.variants[0].price}
        </p>
      </section>

      {/* <section className='w-full flex gap-2 justify-end'>
        <Button outlined={true}>
          <Link href={`/product/${product.id}`}>
            <a>Detalles</a>
          </Link>
        </Button>
        <Button onClick={() => handleClick(product.variants[0].id)}>
          Añadir
        </Button>
      </section> */}
    </article>
  )
}

export default function AllProducts(props) {
  return (
    <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center px-4'>
      {props.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  )
}
