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

module.exports = router;
