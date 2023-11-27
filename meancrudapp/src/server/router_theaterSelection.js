const express = require('express');
const theaterSelection = express.Router();
const movieModel = require('./model/movies.model');
const theaterModel = require('./model/theaters.model');
const { default: mongoose } = require('mongoose');

/**
 * @swagger
 * tags:
 *   name: Theaters
 *   description: API to load the theaters based on the movie selected
 * /api/theaters:
 *   post:
 *     summary: Load theaters based on the movies selected
 *     tags: [Theaters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/theaters.model'
 *     responses:
 *       200:
 *         description: Load theaters based on the movies selected
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/theaters.model'
 *       500:
 *         description: Some server error
 *
 */

theaterSelection.post('/', (req, res, next) => {
    let monId;
    movieModel.findOne({ movie_name: req.body.movieName }).then(data => {
        theaterId = data.theater_id.toHexString();
        monId = new mongoose.Types.ObjectId(theaterId);
        theaterModel.find({ "_id": monId }).then(data => {
            console.log("Theater info ==> ", data);
            res.status(201).json(data)
        }).catch(err => { console.log(err); next(err) });
    }).catch(err => next(err));    
})


module.exports = theaterSelection;
