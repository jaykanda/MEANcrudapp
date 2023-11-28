const express = require('express');
const theaterOnboarding = express.Router();
const theaterModel = require('./model/theaters.model');
const movieModel = require('./model/movies.model');
const cityModel = require('./model/cities.model');
const { default: mongoose } = require('mongoose');

let moviename;
let cityname;
let cityObj = {};
let theaterObj = {};

/**
 * @swagger
 * tags:
 *   name: View Theater List
 *   description: API to get the list of theaters onboarded
 * /api/theaterboarding:
 *   get:
 *     summary: Load theaters based on the movies selected
 *     tags: [View Theater List]
 *     responses:
 *       200:
 *         description: Theater list loaded
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/theaters.model'
 *       500:
 *         description: Some server error
 *
 */

theaterOnboarding.get('/', (req,res) => {
    theaterModel.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(`Error in get method from server due to ${err}`);
    });
})


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

/**
 * @swagger
 * tags:
 *   name: Theater Onboarding
 *   description: API to update the theaters info
 * /api/theaterboarding:
 *   put:
 *     summary: API to update the theaters info
 *     tags: [Theater Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/theaters.model'
 *     responses:
 *       200:
 *         description: Updated Theater Info Added
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/theaters.model'
 *       500:
 *         description: Some server error
 *
 */

theaterOnboarding.put('/:id', (req,res,next) => {
    // const ObjectId = require('mongodb').ObjectId;
    const updateRecord = {
        theater_name : req.body.theater_name,
        movie_name : req.body.movie_name,
        city : req.body.city,
        seats : req.body.seats,
        showTime : req.body.showTime,
        ticketprice : req.body.ticketprice
    }
    console.log('Query params ==>', req.params.id);
    const paramId =  req.params.id;
    const monId = new mongoose.Types.ObjectId(paramId);

    theaterModel.findOneAndUpdate({_id: monId}, {$set : updateRecord}).then(data => {
        console.log(`BODY ===> ${data}`);
        console.log('updated theatre record ==>', updateRecord);
        res.status(200).json(data)})
    .catch(err => next(err));
})

/**
 * @swagger
 * tags:
 *   name: Theater Onboarding
 *   description: API to delete the theaters info
 * /api/theaterboarding:
 *   delete:
 *     summary: API to delete the theaters info
 *     tags: [Theater Onboarding]
 *     responses:
 *       200:
 *         description: Theater Info Deleted
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/theaters.model'
 *       500:
 *         description: Some server error
 *
 */

theaterOnboarding.delete('/:id', (req,res,next) => {
    const paramId =  req.params.id;
    const monId = new mongoose.Types.ObjectId(paramId);
    theaterModel.findByIdAndRemove({ _id: monId}).then(data => {
        console.log(`Theater deleted ===> ${data}`);
        movieModel.findOneAndRemove({ theater_id: monId}).then(data => {
            console.log(`Respective movie also deleted ===> ${data}`);
            res.status(200).json(data)})
        .catch(err => next(err));  
        res.status(200).json(data)})        
    .catch(err => next(err));  
})

module.exports = theaterOnboarding;
