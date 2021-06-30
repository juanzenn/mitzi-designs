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
    <article key={item.variant.id} className='px-4 flex gap-2 my-10'>
      <section>
        <Image
          width='100px'
          height='100px'
          src={item.variant.image.src}
          alt={item.variant.image.altText}
        />
      </section>
      <section>
        <p className='font-bold text-xl text-gray-600'>
          {item.title} - {item.variant.title}
        </p>
        <p className='text-gray-400'>${item.variant.price}</p>
        <div className='space-y-3'>
          <input
            className='w-1/3 px-4 py-2 border border-gray-300 cursor-pointer shadow-md'
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
