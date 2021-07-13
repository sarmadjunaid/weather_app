const express = require('express');
const hbs = require('hbs');
const path = require('path');

const weatherDate = require('../utils/weatherData');

const app = express();

// setting port
const port = process.env.PORT || 3000;

// setting paths of public, views and partials folders
const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting handlebars as view engine, views with the path and registering partials 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req,res)=>{
    res.render('index', {
        title: "Weather App"
    })
})

//localhost:3000/weather?address=Lahore, etc
app.get('/weather', (req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "You must enter address insearch text box"
        })
    }
    weatherDate(address, (error, {temperature, description, cityName} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "Page not found"
    })
})

// connecting to server with port
app.listen(port, () => console.log(`Server running on port: ${port}`));