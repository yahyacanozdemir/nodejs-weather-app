const request = require('request')

const forecast = (latitude, longitude, callback) => {


    // urlnin sonuna eklenen f ile sıcaklığı fahrenayt olarak alırız.

    const url = 'http://api.weatherstack.com/current?access_key=d769d873bba3609c98530c8c51487303&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Hava Durumu Açıklaması: ' + body.current.weather_descriptions[0] + ',\nHava Sıcaklığı : ' + body.current.temperature + ' derece' + ',\nHissedilen sıcaklık: ' + body.current.feelslike + ' derece')
        }
    })
}

module.exports = forecast