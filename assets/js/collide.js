import uuid from 'uuid/v4'
import debounce from './debounce'

// TODO: disable add to cart button when quantity is 0
// TODO: clean up js
// TODO: update cart quantity when items are added
// TODO: button to edit quantity/remove item
// TODO: remove console.logs

export default function Collide () {

  const incBtns = [...document.querySelectorAll('.increment')]
  const decBtns = [...document.querySelectorAll('.decrement')]
  const addToCartBtns = [...document.querySelectorAll('.add-to-cart')]
  const cartBtn = document.getElementById('cart')
  const checkoutPanel = document.getElementById('checkout')
  const checkoutItems = document.querySelector('#checkout #item-wrapper')
  const cartTotal = document.getElementById('cart-quantity')

  const cart = []

  // stripe setup and lambda
  const handler = StripeCheckout.configure({
    key: STRIPE_PUBLISHABLE_KEY,
    image: '/img/ts-monogram.jpg',
    locale: "auto",
    token: async (token) => {
      let response
      let data

      try {
        response = await fetch(STRIPE_LAMBDA_ENDPOINT, {
          method: "POST",
          body: JSON.stringify({
            token,
            amount: amount(),
            idempotency_key: uuid()
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })

        data = await response.json();
        const { name, email, address_line1, city, state, zip } = data

        //
        if (data.statusCode === 200) {
          console.log(checkoutItems)

          console.log(cart)

          checkoutItems.innerHTML = ''
          sendEmail(name, email, address_line1, city, state, zip, cart)
        }
      } catch (error) {
        console.error(error.message);
        return
      }
    }
  })

  // lambda email function
  async function sendEmail (name, email, address_line1, city, state, zip, items) {
    let response

    console.log(items)

    try {
      console.log(`the catch block`)
      response = await fetch(SPARKPOST_LAMBDA_ENDPOINT, {
        // method: 'POST',
        // body: JSON.stringify({
        //   message: 'testing',
        //   email,
        //   name,
        //   address_line1,
        //   city,
        //   state,
        //   zip,
        //   items,
        // }),
        cors: "no-cors",
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

  document.getElementById("checkout-btn").addEventListener("click", function(e) {
    e.preventDefault()

    handler.open({
      amount: amount(),
      name: "Collide",
      description: "Buy Stuff",
      shippingAddress: true,
      billingAddress: true,
    })
  })

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
      const { dataset: {id, name, price, quantity, imgSrc} } = this.parentElement
      const convertedPrice = price * 100
      const totalPrice = convertedPrice * quantity

      const item = {
        id,
        name,
        quantity,
        price,
        totalPrice,
        imgSrc,
      }
      cart.push(item)
      itemHTML()
      updateCartTotal()
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
  cartBtn.addEventListener('click', () => checkoutPanel.classList.contains('in-view') ? checkoutPanel.classList.remove('in-view') : checkoutPanel.classList.add('in-view'))
}
