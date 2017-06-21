console.log('you can use ES6 here : )')

// display modal on first visit

let visited = localStorage.getItem('visited')
let modal = document.getElementById('modal')

/*window.onload = function () {*/
  //if (visited != 'true') {
    //console.log(modal)
    //localStorage.setItem('visited', true)
    //console.log(localStorage.getItem('visited'))
  //} else {
    //modal.classList.remove('open')
    //modal.classList.add('closed')
    //console.log(modal)
  //}
/*}*/

// close modal

const modalButton = document.getElementById('button')
const overlay = document.getElementById('modal-overlay')

modalButton.addEventListener('click', closeModal, false)
overlay.addEventListener('click', closeModal, false)

function closeModal () {
  modal.classList.remove('open')
  modal.classList.add('closed')
  overlay.classList.remove('open')
  overlay.classList.add('closed')
}
