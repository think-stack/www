console.log('you can use ES6 here')

var child = document.querySelectorAll('svg')


document.addEventListener('touchstart', addClass, false)
document.addEventListener('touchstart', removeClass, false)

//better way to add and remove classes from siblings?
//get parent node and then for loop through child nodes checking for class?

function addClass (e) {
  let target = e.target 
  let parentNode = target.parentElement
  let siblingNode = parentNode.nextElementSibling

  if (siblingNode.classList.contains('tech-col') && !siblingNode.classList.contains('slide')) {
    siblingNode.classList.add('slide')
  } else {
    return false
  }
  console.log(target)
}

function removeClass (e) {
  let target = e.target
  let parentNode = target.parentElement

  if (parentNode.classList.contains('slide')) {
    parentNode.classList.remove('slide')
  }
  console.log(parentNode)
}


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
