export default function Collide () {

  const body = document.getElementById('collide')
  const incBtns = [...document.querySelectorAll('.increment')]
  const decBtns = [...document.querySelectorAll('.decrement')]

  const cart = {
    items: [],
  }

  const events = {
    clicked() {
      console.log(this)
    },
    increment() {
      this.previousElementSibling.value ++
    },
    decrement() {
      const value = this.nextElementSibling.value
      if (value > 0) {
        this.nextElementSibling.value --
      }
    }
  }

  incBtns.forEach(btn => btn.addEventListener('click', events.increment))
  decBtns.forEach(btn => btn.addEventListener('click', events.decrement))

}
