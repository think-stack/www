
function formSubmission () {
  // get submit button
  const submitButton = document.querySelector('form .button')
  // set url for form submission
  let url = 'https:/www.thinkstack.co/contact'
  const form = document.querySelector('#form')

  submitButton.addEventListener('click', function (e) {
    // stop default form submission
    e.preventDefault()

    let form = e.target
    let data = new FormData(form) 

    console.log(data)

    function buildUrl() {
      // get form fields
      const name = document.querySelector('input[name="name"]')
      const email = document.querySelector('input[name="email"]')
      const subject = document.querySelector('input[name="subject"]')
      const message = document.querySelector('textarea[name="message"]')

      // set values
      let nameEntry = name.value.replace(/ /, '+')
      let emailEntry = email.value.replace(/@/, '%')
      let subjectEntry = subject.value.replace(/ /gi, '+')
      let messageEntry = message.value.replace(/ /gi, '+')

      // encode url for form submission
      return url = `https://www.thinkstack.co/contact?name=${nameEntry}&email=${emailEntry}&subject=${subjectEntry}&message=${messageEntry}&bot-field=`
    }

    function ajax() {
      const request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

      request.send()

//      request.send()
//      console.log(url)
    }

    buildUrl()
  })
}

export default formSubmission
