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
    <article className='w-full flex flex-col items-center p-6 gap-4'>
      <Image
        src={product.variants[0].image.src}
        alt={product.variants[0].image.altText}
        width='250px'
        height='250px'
      />
      <section className='w-full flex flex-col items-start'>
        <h3 className='font-semibold text-2xl'>{product.title}</h3>
        <p className='text-sm text-gray-500'>${product.variants[0].price}</p>
      </section>

      <section className='w-full flex gap-2 justify-end'>
        <Button outlined={true}>
          <Link href={`/product/${product.id}`}>
            <a>Detalles</a>
          </Link>
        </Button>
        <Button onClick={() => handleClick(product.variants[0].id)}>
          Añadir
        </Button>
      </section>
    </article>
  )
}

export default function AllProducts(props) {
  return (
    <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
      {props.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  )
}
