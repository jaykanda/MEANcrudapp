const express = require('express');
const bookingRouter = express.Router();
const bookingModel = require('./model/booking.model');
const { default: mongoose } = require('mongoose');

bookingRouter.get('/', (req, res) => {
    bookingModel.find()
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
 *   name: Ticket Booking
 *   description: API for booking tickers
 * /api/booking:
 *   post:
 *     summary: This post API will do the ticket booking with theater, seats, showtime info etc ({"seats":["1","2","3"],"showtime":["10AM"],"theater_id":"65622ad1d995b73ff3cc6dba","theatername":"PVR Chennai - Mylapore","moviename" :"Leo","payment":600,"bookingdate":"2023-11-27T05:37:00.930Z"})
 *     tags: [Ticket Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/cities.model'
 *     responses:
 *       200:
 *         description: Booking confirmed
 *         content:
 *           application/json:
 *             schema:
 *             $ref: './model/cities.model'
 *       500:
 *         description: Some server error
 *
 */

bookingRouter.post('/', (req, res, next) => {
    console.log("Booking data ==> ", req.body);
    bookingModel.create(req.body)
        .then(data => {
            console.log(`BODY ===> ${data}`);
            res.status(200).json(data)
        })
        .catch(err => next(err))
})

module.exports = bookingRouter;
