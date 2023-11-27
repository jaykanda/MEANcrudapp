const express = require('express');
const theaterOnboarding = express.Router();
const theaterModel = require('./model/theaters.model');
const movieModel = require('./model/movies.model');
const cityModel = require('./model/cities.model');
const { default: mongoose } = require('mongoose');

/**
 * @swagger
 * tags:
 *   name: Theater Onboarding
 *   description: API to onboard the theaters
 * /api/theaterboarding:
 *   post:
 *     summary: Load theaters based on the movies selected
 *     tags: [Theater Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/theaters.model'
 *     responses:
 *       200:
 *         description: New Theater Info Added
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/theaters.model'
 *       500:
 *         description: Some server error
 *
 */

let moviename;
let cityname;

let cityObj = {};
let theaterObj = {};

theaterOnboarding.post('/', (req, res, next) => {

    moviename = req.body.movie_name;
    cityname = req.body.city;
    theaterModel.create(req.body)
        .then(data => {
            theaterModel.findOne({ movie_name: req.body.movie_name }).then(data => {
                theaterObj = Object.assign({}, { theater_id: data._id });
                cityModel.findOne({ city_name: cityname }).then(data => {
                    cityObj = Object.assign({}, { city_id: data._id });
                    let movieobjcombined = Object.assign({}, { movie_name: moviename }, theaterObj);
                    let allobjcombined = Object.assign({}, movieobjcombined, cityObj);
                    console.log("allobjcombined ===> ", allobjcombined);
                    movieModel.create(allobjcombined).then(data => {
                        console.log("New Movie is inserted in to movie collection ==> ", data);
                        res.status(200).json(data);
                    })
                        .catch(err => next(err));
                    res.status(200).json(data)
                })
                    .catch(err => next(err));
                res.status(200).json(data)
            })
                .catch(err => next(err));
            res.status(200).json(data)
        })
        .catch(err => next(err));

})

module.exports = theaterOnboarding;
