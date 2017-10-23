console.log('you can use ES6 here')

var child = document.querySelectorAll('svg')

document.addEventListener('touchstart', addClass, false)
document.addEventListener('touchstart', removeClass, false)

// show nav menu when hamburger is clicked

const nav = function () {

  const hamburger = document.querySelector('#nav-toggle input')
  const navPanel = document.getElementById('nav-panel')
  const body = document.querySelector('body')

  hamburger.addEventListener('change', function () {
    if (hamburger.checked === true) {
      navPanel.style.opacity = 1
      navPanel.style.transition = 'opacity .5s ease-out'
      navPanel.style.visibility = 'visible'
      body.style.overflow = 'hidden'
    } else {
      navPanel.style.opacity = 0
      navPanel.style.transition = 'opacity .5s ease-in-out'
      body.style.removeProperty('overflow') 
      setTimeout(function () {
        navPanel.style.visibility = 'hidden'
      }, 450)
    }
  }, false)

  function test () {
    console.log(hamburger)
  }
}

nav()


const processSlide = function () {
  
  const prPrevButton = document.querySelector('.process .prev')
  const prNextButton = document.querySelector('.process .next')

  prPrevButton.addEventListener('click', slideLeft, false)
  prNextButton.addEventListener('click', slideRight, false)


  function slideLeft () {
    const slides = document.querySelectorAll('.process .flex-slider figure')

      for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.transform === '') {
          slides[i].style.transform = 'translateX(-100%)'
        } else if (slides[i].style.transform === 'translateX(-100%)') {
          slides[i].style.transform = 'translateX(-200%)'
        }
      }
  }

  function slideRight () {
    const slides = document.querySelectorAll('.flex-slider figure')

      for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.transform === 'translateX(-200%)') {
          slides[i].style.transform = 'translateX(-100%)'
        } else if (slides[i].style.transform === 'translateX(-100%)') {
          slides[i].style.transform = ''
        }
      }
  }
}

processSlide()

const depSlide = function () {
  
  const depPrevButton = document.querySelector('.deployment .prev')
  const depNextButton = document.querySelector('.deployment .next')

  depPrevButton.addEventListener('click', slideLeft, false)
  depNextButton.addEventListener('click', slideRight, false)


  function slideLeft () {
    const slides = document.querySelectorAll('.deployment .flex-slider figure')

      for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.transform === '') {
          slides[i].style.transform = 'translateX(-100%)'
        } else if (slides[i].style.transform === 'translateX(-100%)') {
          slides[i].style.transform = 'translateX(-200%)'
        }
      }
  }

  function slideRight () {
    const slides = document.querySelectorAll('.deployment .flex-slider figure')

      for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.transform === 'translateX(-200%)') {
          slides[i].style.transform = 'translateX(-100%)'
        } else if (slides[i].style.transform === 'translateX(-100%)') {
          slides[i].style.transform = ''
        }
      }
  }
}

depSlide()

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

/*
function bgColorChange (e) {
  const aboutBody = document.getElementById('about')
  //1/4 through div
  const addClassAt = (window.scrollY + window.innerHeight) - techSection.clientHeight  / 4
  //bottom of div
  const divBottom = techSection.offsetTop + techSection.clientHeight / 6
  const partialShow = addClassAt > techSection.offsetTop
  const isNotScrolledPast = window.scrollY < divBottom

    if (partialShow && isNotScrolledPast) {
      aboutBody.classList.add('bg-color')
    } else {
      aboutBody.classList.remove('bg-color')
    }
  
}

*/


//window.addEventListener('scroll', debounce(bgColorChange))

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

// process page slider

