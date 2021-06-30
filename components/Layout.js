import FloatingCart from './Cart/FloatingCart'
import { useContext, useEffect } from 'react'

import { ShopifyContext } from '../context/ShopifyContext'

const Layout = ({ children }) => {
  const { createCheckout, fetchCheckout } = useContext(ShopifyContext)

  useEffect(() => {
    if (!localStorage.getItem('checkout')) {
      createCheckout()
    } else {
      fetchCheckout(localStorage.getItem('checkout'))
    }
  }, [])

  return (
    <>
      <FloatingCart />
      <main>{children}</main>
    </>
  )
}

export default Layout
