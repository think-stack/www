import uuid from 'uuid/v4'
import debounce from './debounce'

// TODO: disable add to cart button when quantity is 0
// TODO: clean up js
// TODO: update cart quantity when items are added
// TODO: button to edit quantity/remove item
// TODO: remove console.logs

export default function Collide () {

  const stripe = Stripe(STRIPE_PUBLISHABLE_KEY)

  const incBtns = [...document.querySelectorAll('.increment')]
  const decBtns = [...document.querySelectorAll('.decrement')]
  const addToCartBtns = [...document.querySelectorAll('.add-to-cart')]
  const cartBtn = document.getElementById('cart')
  const checkoutPanel = document.getElementById('checkout')
  const checkoutItems = document.querySelector('#checkout #item-wrapper')
  const cartTotal = document.getElementById('cart-quantity')
  const checkoutBtn = document.getElementById("checkout-btn")

  const cart = []
  const stripeCart = []


  const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})


  // stripe setup and lambda
  // const handler = StripeCheckout.configure({
  //   key: STRIPE_PUBLISHABLE_KEY,
  //   image: '/img/ts-monogram.jpg',
  //   locale: "auto",
  //   token: async (token) => {
  //     let response
  //     let data

  //     try {
  //       response = await fetch(STRIPE_LAMBDA_ENDPOINT, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           token,
  //           amount: amount(),
  //           idempotency_key: uuid()
  //         }),
  //         headers: new Headers({
  //           "Content-Type": "application/json"
  //         })
  //       })

  //       data = await response.json();
  //       const { name, email, address_line1, city, state, zip } = data

  //       //
  //       if (data.statusCode === 200) {
  //         console.log(checkoutItems)

  //         console.log(cart)

  //         checkoutItems.innerHTML = ''
  //         sendEmail(name, email, address_line1, city, state, zip, cart)
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //       return
  //     }
  //   }
  // })

  function stripeCheckout() {

    const metaDataObj = arrayToObject(stripeCart)
    console.log(metaDataObj)
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [...stripeCart],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'https://thinkstack.co/collide-thank-you',
      cancelUrl: 'https://thinkstack.co/collide',
      billingAddressCollection: 'required',
      // metadata: stripeCart,
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        // var displayError = document.getElementById('error-message');
        // displayError.textContent = result.error.message;
        console.log(result.error.message)
      }
    });
  }

  // stripe.redirectToCheckout({
  //   items: [
  //     // Replace with the ID of your SKU
  //     {sku: 'sku_FcJgPH0sKhQvln', quantity: 1}
  //   ],
  //   successUrl: 'http://localhost:1111/collide',
  //   cancelUrl: 'http://localhost:1111/collide',
  //   billingAddressCollection: 'required',
  //   // submitType: '',
  //   }).then((result) => {
  //   // If `redirectToCheckout` fails due to a browser or network
  //   // error, display the localized error message to your customer
  //   // using `result.error.message`.
  // });

  // lambda email function
  async function sendEmail (name, email, address_line1, city, state, zip, items) {
    let response

    console.log(items)

    try {
      response = await fetch(SPARKPOST_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          message: 'testing',
          email,
          name,
          address_line1,
          city,
          state,
          zip,
          items,
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })

      console.log(`response object: ${response}`)

    } catch (error) {
      console.log(error)
    }
  }


  // get cart amount total
  // Stripe handles pricing in cents, so this is actually $10.00.
  function amount() {
    return cart.reduce((acc, curr) => acc + curr.totalPrice, 0)
  }

  // document.getElementById("checkout-btn").addEventListener("click", function(e) {
  //   e.preventDefault()

  //   handler.open({
  //     amount: amount(),
  //     name: "Collide",
  //     description: "Buy Stuff",
  //     shippingAddress: true,
  //     billingAddress: true,
  //   })
  // })

  function itemHTML () {
    const html = cart.map(item => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price}</td>
          <td>$${item.price * item.quantity}</td>
        </tr>
      `
    }).join(' ')

    checkoutItems.innerHTML = ''

    checkoutItems.innerHTML = html
  }

  function updateCartTotal () {
    cartTotal.innerText = ''
    // cartTotal.innerText = cart.reduce((acc, item) => acc + item.quantity)
    cartTotal.innerText = cart.reduce((acc, curr) => acc + Number(curr.quantity), 0)


    if (cart.length > 0) {
      cartTotal.classList.add('is-active')
    } else {
      cartTotal.classList.remove('is-active')
    }
  }

  const events = {
    increment() {
      const parentEl = this.parentElement.parentElement
      this.previousElementSibling.value ++
      parentEl.dataset.quantity = this.previousElementSibling.value
    },
    decrement() {
      const value = this.nextElementSibling.value
      const parentEl = this.parentElement.parentElement
      if (value > 0) {
        this.nextElementSibling.value --
      }
      parentEl.dataset.quantity = this.nextElementSibling.value
    },
    addToCart() {
      const { dataset: {sku, name, price, quantity, imgSrc} } = this.parentElement
      const convertedPrice = price * 100
      const totalPrice = convertedPrice * quantity

      const item = {
        sku,
        name,
        quantity,
        price,
        totalPrice,
        imgSrc,
      }
      const stripeItem = {
        sku,
        quantity: Number(quantity),
      }
      cart.push(item)
      stripeCart.push(stripeItem)
      itemHTML()
      updateCartTotal()
      console.log(stripeCart)
      checkoutPanel.classList.add('in-view')
      setTimeout(() => {
        checkoutPanel.classList.remove('in-view')
      }, 2500)
    },
    isScrolled() {
      if (window.scrollY < 250) {
        cartBtn.classList.remove('is-scrolled')
      } else {
        cartBtn.classList.add('is-scrolled')
      }
    }
  }

  // init events
  window.addEventListener('scroll', debounce(events.isScrolled, 5))
  incBtns.forEach(btn => btn.addEventListener('click', events.increment))
  decBtns.forEach(btn => btn.addEventListener('click', events.decrement))
  addToCartBtns.forEach(btn => btn.addEventListener('click', events.addToCart))
  // addToCartBtns.forEach(btn => btn.addEventListener('click', stripeRedirect))
  cartBtn.addEventListener('click', () => checkoutPanel.classList.contains('in-view') ? checkoutPanel.classList.remove('in-view') : checkoutPanel.classList.add('in-view'))
  checkoutBtn.addEventListener('click', stripeCheckout)
}
