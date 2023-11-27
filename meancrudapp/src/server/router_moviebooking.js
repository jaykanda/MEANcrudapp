const express = require('express');
const routermoviebooking = express.Router();
const theaterSelection = express.Router();
const cityModel = require('./model/cities.model');
const movieModel = require('./model/movies.model');
const theaterModel = require('./model/theaters.model');
const { default: mongoose } = require('mongoose');

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API to prepopulate the cities
 * /api/cities:
 *   get:
 *     summary: Get List of Cities while launching the app
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Citites loaded.
 *       500:
 *         description: Some server error
 *
 */

routermoviebooking.get('/', (req,res) => {
    cityModel.find()
    .then(data => {
        console.log("City data ===> ", data);
        res.send(data);
    })
    .catch(err => {
        console.log(`Error in get method from server due to ${err}`);
    });
})

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API to load movies based on the city selected
 * /api/cities:
 *   post:
 *     summary: Load movies based on the cities selected
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/cities.model'
 *     responses:
 *       200:
 *         description: Load movies based on the cities selected
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/cities.model'
 *       500:
 *         description: Some server error
 *
 */

routermoviebooking.post('/', (req,res,next) => {
    console.log("Posted movie by city data ==> ", req.body);
    let cityId;
    let monId;
    cityModel.findOne({ city_name : req.body.cityVal }).then(data => {
        cityId = data._id.toHexString();
        monId = new mongoose.Types.ObjectId(cityId);
        movieModel.find({ "city_id" : monId }).then(data => {
            console.log("Movies running in the city ==> ", data);
            res.status(201).json(data)}).catch(err => {console.log(err); next(err)});
    }).catch(err => next(err));
    
})

module.exports = routermoviebooking;
