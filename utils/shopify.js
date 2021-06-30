import Client from "shopify-buy"

export const client = Client.buildClient({
  storefrontAccessToken: "46bc5c3689ab8463036b2613554d5d38",
  domain: "mitzi-design.myshopify.com",
})



// Checkout functions
const createCheckout = async () => {
  client.checkout.create()
  .then(checkout => {
    localStorage.setItem("checkoutId", checkout.id)

    client.checkout.fetch(checkout.id)
    .then( checkout => {
      localStorage.setItem("checkout", JSON.stringify(checkout))
    })
  }) 
}

const addToCart = async (checkoutId, lineItemsToAdd) => {
  client.checkout.addLineItems(checkoutId, lineItemsToAdd)
  .then( checkout => {
    // Actualizamos nuestro localStorage
    localStorage.setItem("checkout", JSON.stringify(checkout))
    alert("added!")
  })
}


