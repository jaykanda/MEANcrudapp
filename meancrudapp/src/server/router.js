const express = require('express');
const router = express.Router();
const employeeModel = require('./model/employee.model');
const { default: mongoose } = require('mongoose');

router.get('/', (req,res) => {
    employeeModel.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(`Error in get method from server due to ${err}`);
    });
})

router.post('/', (req,res,next) => {
    console.log("Employee data ==> ", req.body);
    employeeModel.create(req.body)
    .then(data => {
        console.log(`BODY ===> ${data}`);
        res.status(201).json(data)})
    .catch(err => next(err))
})

router.put('/:id', (req,res,next) => {
    // const ObjectId = require('mongodb').ObjectId;
    const updateRecord = {
        fullName : req.body.fullname,
        position : req.body.position,
        location : req.body.location,
        salary : req.body.salary
    }
    console.log('Query params ==>', req.params.id);
    console.log('updateRecord ==>', updateRecord);
    const paramId =  req.params.id;
    const monId = new mongoose.Types.ObjectId(paramId);

    employeeModel.findOneAndUpdate({_id: monId}, {$set : updateRecord}).then(data => {
        console.log(`BODY ===> ${data}`);
        res.status(200).json(data)})
    .catch(err => next(err));
})

router.delete('/:id', (req,res,next) => {
    const ObjectId = require('mongodb').ObjectId;
    const paramId =  req.params.id.trim()
    employeeModel.delete({ _id: new ObjectId(paramId)}).then(data => {
        console.log(`BODY ===> ${data}`);
        res.status(201).json(data)})
    .catch(err => next(err));  
})

module.exports = router;
