const client = algoliasearch('NDZKXKRSA7', 'e4dde62d4e2f8323b8f46d3825bbd8fc')
const helper = algoliasearchHelper(client, 'test_thinkstack')

helper.on('result', function (content) {
  renderHits(content)
})

function renderHits (content) {
  // assign search results to variable
  let results = content.hits
  console.log(results)

  let team = []
  let blog = []
  let page = []

  // define container
  let searchPanel = document.getElementById('search-panel')
  let resultsContainer = document.createElement('section')
  resultsContainer.id = 'results-container'
  searchPanel.appendChild(resultsContainer)

  // sort data into team, blog, and page arrays
  // todo: add case studies
  if (results !== undefined) {
    results.forEach(function (result) {
      if (result.hasOwnProperty('name')) {
        team.push(result)
      } else if (result.hasOwnProperty('title')) {
        blog.push(result)
      } else if (result.hasOwnProperty('pageTitle')) {
        page.push(result)
      }
    })
  }

  if (page.length) {
    // create div for page search results
    let pageList = document.createElement('div')
    pageList.id = 'page'

    let header = document.createElement('h3')
    header.innerHTML = 'Pages'
    pageList.appendChild(header)

    let ul = document.createElement('ul')
    pageList.appendChild(ul)

    resultsContainer.appendChild(pageList)

    page.slice(0, 5).forEach(function (i) {
      let li = document.createElement('li')
      let anchor = document.createElement('a')
      anchor.innerHTML = i.pageTitle
      li.appendChild(anchor)
      ul.appendChild(li)
    })
  }
  if (blog.length) {
    // create div for blog search results
    let blogList = document.createElement('div')
    blogList.id = 'blog'

    let header = document.createElement('h3')
    header.innerHTML = 'Articles'
    blogList.appendChild(header)

    let ul = document.createElement('ul')
    blogList.appendChild(ul)

    resultsContainer.appendChild(blogList)

    // add search results to list
    blog.slice(0, 5).forEach(function (i) {
      let li = document.createElement('li')
      let anchor = document.createElement('a')
      anchor.innerHTML = i.title
      anchor.href = i.mediumUrl
      anchor.target = '_blank'
      li.appendChild(anchor)
      ul.appendChild(li)
    })
  }
  if (team.length) {
    // create div for team results
    let teamList = document.createElement('div')
    teamList.id = 'team'

    let header = document.createElement('h3')
    header.innerHTML = 'Team Members'
    teamList.appendChild(header)

    let ul = document.createElement('ul')
    teamList.appendChild(ul)

    resultsContainer.appendChild(teamList)

    // clear old search results
    // might not need to clear
    // ul.innerHTML = ''

    // add search results to list
    team.forEach(function (i) {
      let li = document.createElement('li')
      let anchor = document.createElement('a')
      anchor.innerHTML = i.name
      anchor.href = '/about'
      anchor.target = '_blank'
      li.appendChild(anchor)
      ul.appendChild(li)
    })
  }
}

function addActiveClass (element) {
  let target = document.getElementById(element)

  if (target.classList.contains('active')) {
    target.classList.remove('active')
  } else {
    target.classList.add('active')
  }
}

const searchIcon = document.getElementById('search-icon')

searchIcon.addEventListener('click', function () {
  addActiveClass('toggle-wrap')
  addActiveClass('search-panel')
  addActiveClass('search-input')
})

const searchPanel = document.getElementById('search-panel')

const searchInput = document.getElementById('search-input')

searchInput.addEventListener('keyup', function () {
  let ul = document.getElementById('search-panel')
  ul.innerHTML = ''
  if (this.value === '') {
    ul.innerHTML = ''
  } else {
    helper.setQuery(this.value).search()
  }
})


const body = document.getElementsByTagName('body')

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

if (body[0].id === 'how-we-work'){
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

if(body[0].id === 'how-we-work') {
  depSlide()
}

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
}

function removeClass (e) {
  let target = e.target
  let parentNode = target.parentElement

  if (parentNode.classList.contains('slide')) {
    parentNode.classList.remove('slide')
  }
}

// debounce

function debounce (func, wait = 10, immediate = true) {
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

//const techSection = document.querySelector('#about .tech')

const slideEls = document.querySelectorAll('.slide')

function slideUp (e) {
  slideEls.forEach(el => {
    const scroll =  window.scrollY + window.innerHeight
    const elHeight = el.clientHeight
    const elOffsetTop = el.offsetTop
    const parentOffsetTop = el.offsetParent.offsetTop
    const addClassAt = (elHeight / 2) + elOffsetTop + parentOffsetTop


    if(scroll > addClassAt) {
      el.classList.add('active')
    }
  })
}


window.addEventListener('scroll', debounce(slideUp))

const colorShiftSection= document.querySelectorAll('.color-shift')

function bgColorChange (e) {
  const body = document.getElementById('about')
  colorShiftSection.forEach(el => {
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
