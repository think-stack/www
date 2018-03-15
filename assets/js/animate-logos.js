function log () {
  console.log('this is the index page')
  function randomNum () {
    return Math.floor(Math.random() * 11)
  }

  // generate new random number every 2 seconds

  // setInterval(function () {
  //   console.log(Math.floor(Math.random() * 10))
  // }, 1000)

  function animateLogos () {
    // NodeList
    const allLogos = document.querySelectorAll('#logos .column img')

    // create array from NodeList
    const logoArray = []
    for (let i = 0; i < allLogos.length; i++) {
      logoArray.push(allLogos[i])
    }

    // create an array for each column
    const logoArr1 = logoArray.slice(0, 3)
    const logoArr2 = logoArray.slice(3, 6)
    const logoArr3 = logoArray.slice(6, 9)

    // get first array item and change classes
    function changeClass (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains('is-entering')) {
          arr[i].classList.add('is-active')
          arr[i].classList.remove('is-entering')
        } else if (arr[i].classList.contains('is-active')) {
          arr[i].classList.add('is-exiting')
          arr[i].classList.remove('is-active')
        } else if (arr[i].classList.contains('is-exiting')) {
          if (i === (arr.length - 1)) {
            arr[i].classList.remove('is-exiting')
            arr[0].classList.add('is-entering')
          } else {
            arr[i].classList.remove('is-exiting')
            arr[i + 1].classList.add('is-entering')
          }
        }
      }
      setTimeout(function () {
        changeClass(arr)
      }, 800)
    }

    changeClass(logoArr1)
      setTimeout(function () {
      changeClass(logoArr2)
        setTimeout(function () {
          changeClass(logoArr3)
        }, 100)
    }, 100)
  }
  animateLogos()
}

export default log
