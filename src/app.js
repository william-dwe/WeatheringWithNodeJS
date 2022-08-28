const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine & view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'William Wibowo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'William Wibowo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        helpText: 'Find William Wibowo Sanity',
        name: 'William Wibowo'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address){
        return res.send({
            error: 'Please provide the address!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

// Missing router handling
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'William Wibowo',
        errorMessage: 'Help documents not found!',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'William Wibowo',
        errorMessage: '404 Page not found!',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})