const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const skycons = require('skycons');

const axios = require('axios');
/* Middleware*/
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));
//Creating Routes
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, 'dist', 'index.html'))

})



app.post('/forecast', async (req, res) => {


    await fetch(req.body.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(forecast => forecast.json())


        .then((forecast) => {

            const weatherObj = {
                current_temp: forecast.data[0].temp,
                maxTemp_daily: forecast.data[0].max_temp,
                lowTemp_daily: forecast.data[0].low_temp,
            }

            res.send(weatherObj);

        }).catch((error) => {
            console.log(error);
        })


})



app.listen(8000, function() {

    console.log('Example app listening on http://localhost:8000/');

});



module.exports = app