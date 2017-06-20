console.log('you can use ES6 here : )')

let visited = localStorage.getItem('visited')
let modal = document.getElementById('modal')

window.onload = function () {
  if (visited != 'true') {
    console.log(modal)
    localStorage.setItem('visited', true)
    console.log(localStorage.getItem('visited'))
  } else {
    modal.classList.remove('open')
    modal.classList.add('closed')
    console.log(modal)
  }
}
