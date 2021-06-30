import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'

const ShopifyContext = React.createContext()

const client = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKKEN,
  domain: process.env.NEXT_PUBLIC_STOREFRONT_DOMAIN,
})

const ShopifyProvider = props => {
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [checkoutId, setCheckoutId] = useState('')
  const [checkout, setCheckout] = useState('')
  const [cartState, setCartState] = useState(false)

  const createCheckout = async () => {
    try {
      const checkout = await client.checkout.create()
      localStorage.setItem('checkout', checkout.id)
      setCheckoutId(checkout.id)
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
      console.log('Error at creating checkout')
    }
  }

  const fetchCheckout = async id => {
    try {
      const checkout = await client.checkout.fetch(
        localStorage.getItem('checkout')
      )
      setCheckoutId(id)
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
      console.log('Error at fetching checkout')
    }
  }

  const fetchAllProducts = async () => {
    try {
      const products = await client.product.fetchAll()
      setProducts(products)
    } catch (error) {
      console.log(`Error at fetch products`)
      console.error(error)
    }
  }

  const addItem = async (id, quantity) => {
    try {
      const lineItem = [
        {
          variantId: id,
          quantity: quantity,
        },
      ]

      const checkout = await client.checkout.addLineItems(checkoutId, lineItem)

      setCartState(true)
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
      console.log('Error at adding item')
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const lineItemsToUpdate = [
        {
          id: itemId,
          quantity: quantity,
        },
      ]

      const checkout = await client.checkout.updateLineItems(
        checkoutId,
        lineItemsToUpdate
      )
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
      console.log('Error at updating quantity')
    }
  }

  const removeItem = async itemId => {
    try {
      const lineItemsToRemove = [itemId]

      const checkout = await client.checkout.removeLineItems(
        checkoutId,
        lineItemsToRemove
      )
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
      console.log('Error at removing item')
    }
  }

  const fetchProduct = async id => {
    try {
      const product = await client.product.fetch(id)
      setProduct(product)
    } catch (error) {
      console.error(error)
      console.log(`Error at fetching product`)
    }
  }

  return (
    <ShopifyContext.Provider
      value={{
        product,
        products,
        checkout,
        cartState,
        checkoutId,
        fetchAllProducts,
        fetchProduct,
        createCheckout,
        fetchCheckout,
        addItem,
        removeItem,
        setCartState,
        updateQuantity,
      }}>
      {props.children}
    </ShopifyContext.Provider>
  )
}

const ShopifyConsumer = ShopifyContext.Consumer

export { ShopifyContext, ShopifyConsumer }

export default ShopifyProvider
