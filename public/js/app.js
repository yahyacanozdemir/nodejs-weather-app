var weatherForm = document.querySelector('form')
var search = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')

//querySelector ile html sayfası içerisinde bulunan istediğimiz elemanı çekebiliriz

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //sayfayı refresh etmekten kurtarıyor yani default özelleiğini engelliyor

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    console.log(location)
})