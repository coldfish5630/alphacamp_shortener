const submitButton = document.querySelector('#shorten-btn')
const form = document.querySelector('#shorten-form')

submitButton.addEventListener('click', function onSubmitBtnClick (event) {
  form.classList.add('was-validated')
})
form.addEventListener('submit', function onFormSubmit (event) {
  const alert = document.querySelector('#alert-label')
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    alert.textContent = '網址不可為空白'
  }
})

const copyButton = document.querySelector('#copy-btn')

copyButton.addEventListener('click', function onCopyBtnClick (event) {
  console.log(event.target)
  const url = document.querySelector('#short-url').textContent
  console.log(url)
  navigator.clipboard
    .writeText(url)
    .then(() => alert('Success Copy!'))
    .catch(() => alert('something wrong!'))
})
