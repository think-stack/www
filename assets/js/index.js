console.log('you can use ES6 here : )')

// display modal on first visit

let visited = localStorage.getItem('visited')
let modal = document.getElementById('modal')
const overlay = document.getElementById('modal-overlay')

window.onload = function modalDisplay () {
  setTimeout (function () {
  if (visited != 'true') {
    localStorage.setItem('visited', true)
    console.log(localStorage.getItem('visited'))
    modal.classList.add('open')
    modal.classList.remove('closed')
    overlay.classList.add('open')
    overlay.classList.remove('closed')
  } else {
    console.log('visited')
  }
}, 1000)
}

// close modal

const modalButton = document.getElementById('button')

modalButton.addEventListener('click', closeModal, false)
overlay.addEventListener('click', closeModal, false)

function closeModal () {
  modal.classList.remove('open')
  modal.classList.add('closed')
  overlay.classList.remove('open')
  overlay.classList.add('closed')
}
