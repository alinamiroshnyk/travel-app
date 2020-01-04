const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const app = express();

import {getDarkSky} from './darksky_api';
import {getGEO} from './geo_api';
import {getPixaBay} from './pixabay_api';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
console.log(__dirname)

app.get('/test', (req, res) => {
    res.json(mockAPIResponse);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../../dist", "index.html"));
})

app.post("/search", function (req, res) {
    const {departureDate, destination} = req.body;
    console.log(departureDate)
    getGEO(destination).then((geoResult) => {
        
        console.log(geoResult)
    if (geoResult.success) {
        const {lat, lng} = geoResult.data;
        const date = new Date(departureDate).getTime();
        getDarkSky(date, lat, lng).then((darkSkyResult) => {
          if (darkSkyResult.success) {
            getPixaBay(destination).then((pixaBayResult) => {
              if (pixaBayResult.success) {
                res.json({
                  success: true,
                  data: {
                    geo: {
                      ...geoResult.data,
                      departureDate: departureDate
                    },
                    sky: darkSkyResult.data,
                    pix: pixaBayResult.data,
                  },
                });
              } else {
                res.json({
                  success: false,
                  data: {
                    geo: geoResult.data,
                    sky: darkSkyResult.message,
                    pix: null,
                  },
                });
              }
            });
          } else {
            res.json({
              success: false,
              data: {
                geo: geoResult.data,
                sky: null,
                pix: null,
              },
            });
          }
        });
      } else {
        res.json({
          success: false,
          data: {
            geo: null,
            sky: null,
            pix: null,
          },
        });
      }
    });
  });

// PORT
app.listen(8080, function () {
    console.log('App is listening on port 8080!')
})
