console.log('you can use ES6 here : )')

var serviceUl = document.querySelector('#services ul')
var services = document.querySelectorAll('#services ul li')

serviceUl.addEventListener('click', activeListItem, false)

function activeListItem (e) {
  if (e.target !== e.currentTarget) {
    for (var i = 0; i < services.length; i++) {
      services[i].classList.remove('active')
    }
    e.target.classList.add('active')
  }
  e.stopPropagation()
}
$(document).ready(function () {

  $('#services li:nth-child(1)').click(function () {
    $('#service-desc p:nth-child(1)').removeClass('hide')
    $('#service-desc p:nth-child(2)').addClass('hide')
    $('#service-desc p:nth-child(3)').addClass('hide')
    $('#service-desc p:nth-child(4)').addClass('hide')
  })

  $('#services li:nth-child(2)').click(function () {
    $('#service-desc p:nth-child(2)').removeClass('hide')
    $('#service-desc p:nth-child(1)').addClass('hide')
    $('#service-desc p:nth-child(3)').addClass('hide')
    $('#service-desc p:nth-child(4)').addClass('hide')
  })

  $('#services li:nth-child(3)').click(function () {
    $('#service-desc p:nth-child(3)').removeClass('hide')
    $('#service-desc p:nth-child(2)').addClass('hide')
    $('#service-desc p:nth-child(1)').addClass('hide')
    $('#service-desc p:nth-child(4)').addClass('hide')
  })

  $('#services li:nth-child(4)').click(function () {
    $('#service-desc p:nth-child(4)').removeClass('hide')
    $('#service-desc p:nth-child(2)').addClass('hide')
    $('#service-desc p:nth-child(3)').addClass('hide')
    $('#service-desc p:nth-child(1)').addClass('hide')
  })
});
