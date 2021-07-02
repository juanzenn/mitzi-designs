import { useContext, useState } from 'react'
import { ShopifyContext } from '../../context/ShopifyContext'
import { Motion, spring } from 'react-motion'
import { ShoppingBag, Cross } from 'akar-icons'
import CartItem from './CartItem'
import Button from '../Atomic/Button'

const CartItems = ({ checkout }) => {
  return checkout.lineItems.map(item => (
    <CartItem item={item} variantId={item.id} />
  ))
}

const FloatingCart = () => {
  const { checkout, cartState, setCartState } = useContext(ShopifyContext)

  const openCart = () => {
    setCartState(true)
  }

  const closeCart = () => {
    setCartState(false)
  }

  if (!checkout) return <div></div>

  return (
    <>
      <button
        className={
          cartState
            ? 'hidden'
            : 'fixed top-4 right-4 z-50 p-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-lg rounded-sm'
        }
        onClick={openCart}>
        <ShoppingBag />
      </button>
      <Motion style={{ x: spring(cartState ? 0.5 : 0) }}>
        {({ x }) => (
          <div
            style={{
              opacity: x,
            }}
            className={
              cartState ? `w-screen h-screen bg-black fixed z-40` : 'hidden'
            }></div>
        )}
      </Motion>

      <Motion style={{ x: spring(cartState ? 0 : 110) }}>
        {({ x }) => (
          <>
            <section
              style={{
                right: 0,
                transform: `translateX(${x}%)`,
              }}
              className={`fixed top-0 z-40 w-full lg:w-1/3 h-screen bg-white-accent py-16 lg:border-l lg:border-gray-400 lg:shadow-xl overflow-y-scroll`}>
              {/* Button */}
              <button className='fixed top-4 right-4 z-50' onClick={closeCart}>
                <Cross size={20} />
              </button>
              {/* Cart content */}
              <h3 className='font-bold text-4xl px-4'>Carrito</h3>
              {/* <CartItems /> */}
              {checkout.lineItems.length < 1 ? (
                <p className='px-4 my-4 text-xl font-bold text-gray-700'>
                  No hay objetos en el carrito...
                </p>
              ) : (
                <CartItems checkout={checkout} />
              )}
              <section className='px-4 my-6 flex gap-4 items-center '>
                <p className='text-gray-500 text-xl'>
                  <strong>Subtotal:</strong> ${checkout.subtotalPrice}
                </p>
                <Button
                  className='p-0'
                  onClick={() => localStorage.removeItem('checkout')}>
                  <a
                    href={checkout.webUrl}
                    className='bg-primary-500 text-white border-2 border-primary-500 hover:border-primary-600 hover:bg-primary-600 px-4 py-2 tracking-tight transition-all duration-300 shadow-lg rounded-md'>
                    Comprar
                  </a>
                </Button>
              </section>
            </section>
          </>
        )}
      </Motion>
    </>
  )
}

export default FloatingCart
