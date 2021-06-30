import Image from 'next/image'
import { useState, useContext } from 'react'
import { ShopifyContext } from '../../context/ShopifyContext'
import Button from '../Atomic/Button'

const CartItem = ({ item, variantId }) => {
  const { updateQuantity, removeItem } = useContext(ShopifyContext)

  const [quantity, setQuantity] = useState(item.quantity)

  const handleUpdate = () => {
    updateQuantity(variantId, parseInt(quantity))
  }

  const handleRemove = () => {
    removeItem(variantId)
  }

  return (
    <article key={item.variant.id} className='px-4 flex gap-4 my-10'>
      <section>
        <Image
          width='120px'
          height='120px'
          src={item.variant.image.src}
          alt={item.variant.image.altText}
          className='rounded-md'
        />
      </section>
      <section>
        <p className='text-lg tracking-tight text-gray-500'>
          {item.title} - {item.variant.title}
        </p>
        <p className='text-gray-600 font-bold tracking-tight'>
          ${item.variant.price}
        </p>
        <div className='space-y-3'>
          <input
            className='w-1/3 p-2 border border-primary-600 cursor-pointer shadow-md rounded-md'
            type='number'
            min='1'
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
          />
          <section className='flex gap-2'>
            <Button onClick={handleUpdate}>Actualizar</Button>
            <Button outlined={true} onClick={handleRemove}>
              Eliminar
            </Button>
          </section>
        </div>
      </section>
    </article>
  )
}

export default CartItem
