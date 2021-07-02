import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
// Create Shop context for exporting all the states to every component in a easy way
const ShopifyContext = React.createContext()

// Initialize the Shopify SDK client
const client = Client.buildClient({
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKKEN,
  domain: process.env.NEXT_PUBLIC_STOREFRONT_DOMAIN,
})

const ShopifyProvider = props => {
  // Store the eCommerce states in one place
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [checkoutId, setCheckoutId] = useState('')
  const [checkout, setCheckout] = useState('')
  const [cartState, setCartState] = useState(false)
  const [collections, setCollections] = useState('')

  // This component encapsulate all the logic for communicating with the store
  // exporting state to easy access across the app
  // Create the checkout ID to store in localstorage
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
  // Fetch the checkout with the id in localstorage
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
  // Fetch all products of the store
  const fetchAllProducts = async () => {
    try {
      const products = await client.product.fetchAll()
      setProducts(products)
    } catch (error) {
      console.log(`Error at fetch products`)
      console.error(error)
    }
  }
  // Add an item to the cart object
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
  // Update the quantity of an object in the cart object
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
  // Remove an item from the cart object
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
  // Fetch a single product from its ID
  const fetchProduct = async id => {
    try {
      const product = await client.product.fetch(id)
      setProduct(product)
    } catch (error) {
      console.error(error)
      console.log(`Error at fetching product`)
    }
  }
  // Fetch all the collections (and products associate with it)
  const fetchCollections = async () => {
    try {
      const collections = await client.collection.fetchAllWithProducts()
      setCollections(collections)
    } catch (error) {
      console.error(error)
      console.log('Error at fetching collections')
    }
  }

  return (
    <ShopifyContext.Provider
      value={{
        product,
        products,
        checkout,
        collections,
        cartState,
        checkoutId,
        fetchAllProducts,
        fetchProduct,
        fetchCollections,
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
