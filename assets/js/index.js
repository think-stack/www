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

// debounce

function debounce (func, wait = 20, immediate = true) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if(!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const techSection = document.querySelector('#about .tech')

function bgColorChange (e) {
  //1/4 through div
  const addClassAt = (window.scrollY + window.innerHeight) - techSection.clientHeight  / 4
  //bottom of div
  const divBottom = techSection.offsetTop + techSection.clientHeight
  const partialShow = addClassAt > techSection.offsetTop
  const isNotScrolledPast = window.scrollY < divBottom

    if (partialShow && isNotScrolledPast) {
      techSection.classList.add('bg-color')
    } else {
      techSection.classList.remove('bg-color')
    }
  
}

window.addEventListener('scroll', debounce(bgColorChange))

function checkSlide (e) {
  //get all images
  const images = document.querySelectorAll('#about #team img')  

    images.forEach(function(image) {
      //scroll onto image
    const startSlide = (window.scrollY + window.innerHeight) - image.height / 2
    //bottom of image
    const imgBottom = image.offsetTop + image.clientHeight
    const partialShow = startSlide > image.offsetTop
    const isNotScrolledPast = window.scrollY < imgBottom

      if(startSlide && isNotScrolledPast) {
        image.classList.add('slide')
      } else {
        image.classList.remove('slide')
      }

  })
}

window.addEventListener('scroll', debounce(checkSlide))

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

const modalButton = document.querySelector('#modal #button')

modalButton.addEventListener('click', closeModal, false)
overlay.addEventListener('click', closeModal, false)

function closeModal () {
  modal.classList.remove('open')
  modal.classList.add('closed')
  overlay.classList.remove('open')
  overlay.classList.add('closed')
}

