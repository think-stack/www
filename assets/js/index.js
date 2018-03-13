const body = document.getElementsByTagName('body')

// check os

function returnOS () {
  let OS
  if (navigator.appVersion.indexOf('Win') !== -1) OS = 'Windows'
  if (navigator.appVersion.indexOf('Mac') !== -1) OS = 'MacOS'
  if (navigator.appVersion.indexOf('X11') !== -1) OS = 'UNIX'
  if (navigator.appVersion.indexOf('Linux') !==-1) OS = 'Linux'
  return OS
}

if (body[0].id === 'risk-calculator') {

  $('#design-toolkit').submit(function(e) {
    e.preventDefault();

    let OS = returnOS()
    console.log(OS)

    let form = $(this)
    let data = form.serialize()
    console.log(form)
    console.log(data)

    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: data,
      async: false,
      success: function () {
        if (OS === 'MacOS') {
          window.open('risk-calculator-mac.zip')
        } else {
          window.open('risk-calculator-win.zip')
        }
        document.getElementById('design-toolkit').reset()
      }
    })
  })

/*  let form = document.getElementById('design-toolkit')
  let nameInput = document.querySelector('#design-toolkit input[name="name"')
  let emailInput = document.querySelector('#design-toolkit input[name="email"')
  let button = document.getElementById('rc')
  console.log(form)
  console.log(emailInput)

  let OS;

  // check form fields have value
  // set button onclick attribute
  function checkValidity () {
    console.log(nameInput.value !== '')
    console.log(emailInput.validity.valid)
    if (nameInput.value !== '' && emailInput.validity.valid) {
//      OS = returnOS()
      button.onclick = 'something'
    } else {
      button.onlick = ''
    }
  }

  function click () {
    console.log('clicked')
  }

  form.addEventListener('click', function () {
    console.log('clicked')
  })
  nameInput.addEventListener('blur', checkValidity, false)
  emailInput.addEventListener('blur', checkValidity, false)
  form.addEventListener('submit', checkValidity, false)

  // wrap download in setTimeout to delay download
  if (OS === 'MacOS') {
    button.setAttribute('onclick', "window.open('risk-calculator-mac.zip')")
  } else if (OS === 'Windows') {
    button.setAttribute('onclick', "window.open('risk-calculator-win.zip')")
  } else {
    button.setAttribute('onclick', '')
  }
  */
}

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

}

nav()

const processSlide = function () {

  const slideL = document.querySelector('.process .slide-l')
  const slideR = document.querySelector('.process .slide-r')

  slideL.addEventListener('click', slideRight, false)
  slideR.addEventListener('click', slideLeft, false)

  function slideLeft () {
    const slides = document.querySelectorAll('.process .flex-slider figure')

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.transform === '') {
        slides[i].style.transform = 'translateX(-100%)'
        slideL.classList.remove('hide')
        slideR.classList.remove('hide')
      } else if (slides[i].style.transform === 'translateX(-100%)') {
        slides[i].style.transform = 'translateX(-200%)'
        slideR.classList.add('hide')
      }
    }
  }

  function slideRight () {
    const slides = document.querySelectorAll('.flex-slider figure')

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.transform === 'translateX(-200%)') {
        slides[i].style.transform = 'translateX(-100%)'
        slideL.classList.remove('hide')
        slideR.classList.remove('hide')
      } else if (slides[i].style.transform === 'translateX(-100%)') {
        slides[i].style.transform = ''
        slideL.classList.add('hide')
      }
    }
  }
}

if (body[0].id === 'how-we-work') {
  processSlide()
}

const depSlide = function () {

  const slideL = document.querySelector('.deployment .slide-l')
  const slideR = document.querySelector('.deployment .slide-r')

  slideL.addEventListener('click', slideRight, false)
  slideR.addEventListener('click', slideLeft, false)

  function slideLeft () {
    const slides = document.querySelectorAll('.deployment .flex-slider figure')

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.transform === '') {
        slides[i].style.transform = 'translateX(-100%)'
        slideL.classList.remove('hide')
        slideR.classList.remove('hide')
      } else if (slides[i].style.transform === 'translateX(-100%)') {
        slides[i].style.transform = 'translateX(-200%)'
        slideR.classList.add('hide')
      }
    }
  }

  function slideRight () {
    const slides = document.querySelectorAll('.deployment .flex-slider figure')

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.transform === 'translateX(-200%)') {
        slides[i].style.transform = 'translateX(-100%)'
        slideL.classList.remove('hide')
        slideR.classList.remove('hide')
      } else if (slides[i].style.transform === 'translateX(-100%)') {
        slides[i].style.transform = ''
        slideL.classList.add('hide')
      }
    }
  }
}

if (body[0].id === 'how-we-work') {
  depSlide()
}

// better way to add and remove classes from siblings?
// get parent node and then for loop through child nodes checking for class?

function addClass (e) {
  let target = e.target
  let parentNode = target.parentElement
  let siblingNode = parentNode.nextElementSibling

  if (siblingNode.classList.contains('tech-col') && !siblingNode.classList.contains('slide')) {
    siblingNode.classList.add('slide')
  } else {
    return false
  }
}

function removeClass (e) {
  let target = e.target
  let parentNode = target.parentElement

  if (parentNode.classList.contains('slide')) {
    parentNode.classList.remove('slide')
  }
}

// check form inputs for value and display/hide label

const inputFields = document.getElementsByClassName('js-input')
const textArea = document.querySelector('form textarea')

textArea.addEventListener('blur', function () {
  console.log('blurred')
  let label = this.nextElementSibling

  if (textArea.value !== '') {
    label.classList.add('transform')
  } else {
    label.classList.remove('transform')
  }
})

function addListener (arr, type, fn) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener(type, fn, false)
  }
}

function inputFieldCheck () {
  let label = this.nextElementSibling

  if (this.value !== '') {
    label.style.opacity = '0'
  } else {
    label.style.opacity = '1'
  }
}

addListener(inputFields, 'blur', inputFieldCheck)

// nameInput.addEventListener('blur', inputFieldCheck, false)
// inputArr.addEventListener('click', formInputCheck, false)

// debounce

function debounce (func, wait = 5, immediate = true) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// const techSection = document.querySelector('#about .tech')

const slideEls = document.querySelectorAll('.slide')

function slideUp (e) {
  slideEls.forEach(el => {
    const scroll = window.scrollY + window.innerHeight
    const elHeight = el.clientHeight
    const elOffsetTop = el.offsetTop
    const parentOffsetTop = el.offsetParent.offsetTop
    const addClassAt = (elHeight / 2) + elOffsetTop + parentOffsetTop

    if (scroll > addClassAt) {
      el.classList.add('active')
    }
  })
}

window.addEventListener('scroll', debounce(slideUp))

const colorShiftSection = document.querySelectorAll('.color-shift')

function bgColorChange (e) {
  const body = document.getElementById('about')
  colorShiftSection.forEach(el => {
  // const aboutBody = document.getElementById('about')
  // 1/4 through div
    console.log(el.offsetTop)
    const addClassAt = (window.scrollY + window.innerHeight) - el.clientHeight / 5
    // bottom of div
    const divBottom = el.offsetTop + el.clientHeight
    const partialShow = addClassAt > el.offsetTop
    const isNotScrolledPast = window.scrollY < (divBottom - 200)
  //const aboutBody = document.getElementById('about')
  //1/4 through div
  const addClassAt = (window.scrollY + window.innerHeight) - el.clientHeight / 5
  //bottom of div
  const divBottom = el.offsetTop + el.clientHeight
  const partialShow = addClassAt > el.offsetTop
  const isNotScrolledPast = window.scrollY < (divBottom - 200)

    if (partialShow && isNotScrolledPast) {
      body.classList.add('active')
    } else {
      body.classList.remove('active')
    }
  })
}

window.addEventListener('scroll', debounce(bgColorChange))

function checkSlide (e) {
  // get all images
  const images = document.querySelectorAll('#about #team img')

  images.forEach(function (image) {
    // scroll onto image
    const startSlide = (window.scrollY + window.innerHeight) - image.height / 2
    // bottom of image
    const imgBottom = image.offsetTop + image.clientHeight
    const partialShow = startSlide > image.offsetTop
    const isNotScrolledPast = window.scrollY < imgBottom

    if (startSlide && isNotScrolledPast) {
      image.classList.add('slide')
    } else {
      image.classList.remove('slide')
    }
  })
}

window.addEventListener('scroll', debounce(checkSlide))

// display modal on first visit
/*
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

if(body[0].id === 'index'){
  const modalButton = document.querySelector('#modal #button')

  modalButton.addEventListener('click', closeModal, false)
  overlay.addEventListener('click', closeModal, false)

  function closeModal () {
    modal.classList.remove('open')
    modal.classList.add('closed')
    overlay.classList.remove('open')
    overlay.classList.add('closed')
  }
}
*/
