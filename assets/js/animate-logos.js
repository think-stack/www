function animation () {

  function randomNum (arr) {
    return Math.floor(Math.random() * arr.length)
  }

  // NodeList
  const allLogos = document.querySelectorAll('#logos .column img')

  // create array from NodeList
  const logoArray = []
  for (let i = 0; i < allLogos.length; i++) {
    logoArray.push(allLogos[i])
  }

  logoArray.forEach((logo) => logo.addEventListener('transitionend', changeClass))

  // create an array for each column
  const logoArr1 = logoArray.slice(0, 4)
  const logoArr2 = logoArray.slice(4, 7)
  const logoArr3 = logoArray.slice(7, 10)

  // start animation
  function animateLogos (arr, currEl) {
    let index = randomNum(arr)
    let currentIndex = currEl

    // randomize logos
    if (currentIndex === 'undefined') {
      arr[index].classList.add('is-entering')
    } else if (index === currentIndex) {
      index = randomNum(arr)
      arr[index].classList.add('is-entering')
    } else {
      arr[index].classList.add('is-entering')
    }
  }

  // get array that logo belongs too
  function getParent (element) {
    if (logoArr1.includes(element)) {
      return logoArr1
    } else if (logoArr2.includes(element)) {
      return logoArr2
    } else if (logoArr3.includes(element)) {
      return logoArr3
    }
  }

  function changeClass (e) {
    // determines which array current logo belongs to
    let parentEl = getParent(e.target)

    // get that index
    let currentIndex = parentEl.indexOf(e.target)

    if (this.classList.contains('is-entering')) {
      this.classList.add('is-active')
      this.classList.remove('is-entering')
    } else if (this.classList.contains('is-active')) {
      this.classList.add('is-exiting')
      this.classList.remove('is-active')
    } else if (this.classList.contains('is-exiting')) {
      this.classList.remove('is-exiting')
    } else {
      animateLogos(parentEl, currentIndex)
    }
  }

  // set delay on initial function call
  setTimeout(function () {
    animateLogos(logoArr2)
  }, 1000)

  setTimeout(function () {
    animateLogos(logoArr1)
  }, 1050)

  setTimeout(function () {
    animateLogos(logoArr3)
  }, 1100)
}

export default animation
