const express = require('express');
const router = express.Router();
const employeeModel = require('./model/employee.model');

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
    employeeModel.create(req.body)
    .then(data => {
        console.log(`BODY ===> ${data}`);
        res.status(201).json(data)})
    .catch(err => next(err))
})

router.put('/:id', (req,res,next) => {
    const ObjectId = require('mongodb').ObjectId;
    const updateRecord = {
        fullname : req.body.fullname,
        position : req.body.position,
        location : req.body.location,
        salary : req.body.salary
    }
    console.log('Query params ==>', req.params.id);
    console.log('updateRecord ==>', updateRecord);
    const paramId =  req.params.id.trim();
    employeeModel.findOneAndUpdate({ _id: new ObjectId(paramId)}, updateRecord).then(data => {
        console.log(`BODY ===> ${data}`);
        res.status(201).json(data)})
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
