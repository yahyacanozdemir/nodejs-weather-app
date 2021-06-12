const express = require("express")
const path = require("path");
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
    /*
     Gelebilecek Soru

     Nodemoon hbs dosyaları üzerinde bir değişiklik olduğunda kendini tekrar 
     başlatmıyor. Hbs teki değişiklikleri de anlamasını istiyorsak 
     nodemoon app.js -e js,hbs
     komutu girilmelidir. Böylece nodemoon her değişikliği anlayacaktır.
    */

/*
Gelebilecek Soru 

app.get('/products', (req, res) => {
    
    // aşağıdaki komut bize linkten sonra verilen parametleri döndürür
    //örneğin 3000/products/?search=games&rating=5 adresine gidersek
    //console da {search : 'games', rating:'5'} çıktısı gözükür
    //özel bi parametreye erişmek için reg.query.search vb diyebiliriz

    console.log(req.query) 
    res.send(
        {
            products: [],
           
        })
})
*/

// routing fonksiyonlarında sadece bir kez responsa veri gönderebiliriz. Yani 2 tane res.send olamaz!

// request paketini web server altına kurmak için web server dizinindeyken npm i request


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') // public klasörünün dizinini verdik
const viewsPath = path.join(__dirname, '../public/templates/views') // public/views klasörünün dizinini verdik
const partialsPath = path.join(__dirname, '../public/templates/partials') //partials footer ve navbar gibi her sayfada değişmeyen kısımları göstermeye yarayan bir hbs özelliği

app.set('views', viewsPath)
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


//routing fonksiyonu
app.get('', (req, res) => {
    res.render('index',
        //parametreleri yani dinamik verileri gönderme
        {
            title: 'Weather App',
            name: 'Yahya Can Özdemir',
        })
})

//routing fonksiyonu
app.get('/about', (req, res) => {
    res.render('about',
        //parametreleri yani dinamik verileri gönderme
        {
            title: 'About Page',
            name: 'Yahya Can Özdemir',
        })
})

//routing fonksiyonu
app.get('/help', (req, res) => {
    res.render('help',
        //parametreleri yani dinamik verileri gönderme
        {
            title: 'Help Page',
            helpText: 'This is some help text message',
            name: 'Yahya Can Özdemir',
        })
})


//Help altında Bulunmayan bir sayfaya erişme sırasında hata oluşmaması için yönlendirmede en sona bir fonksiyon yazılır
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorTitle: "HATA!",
        errorSubTitle: "Help altında böyle bir sayfa bulunamadı.",
        errorText: "Lütfen gitmeye çalıştığınız yeri kontrol edin.",
        name: "Yahya Can Özdemir",

    })
})

//routing fonksiyonu
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Lütfen Bir Adres Girin !',
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })

        })
    })


})

//Tüm sitede bulunmayan bir sayfaya erişme sırasında hata oluşmaması için yönlendirmede en sona bir fonksiyon yazılır
app.get("*", (req, res) => {
    res.render("404", {
        errorTitle: "HATA!",
        errorSubTitle: "Uygulamada böyle bir sayfa bulunamadı.",
        errorText: "Lütfen gitmeye çalıştığınız yeri kontrol edin.",
        name: "Yahya Can Özdemir",

    })
})


app.listen(port, () => {
    console.log("Server is up and listening on port " + port);
})