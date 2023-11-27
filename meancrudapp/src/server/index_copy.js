const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  field1: [Number],
  field2: [Number],
  expression: String,
});

const Model = mongoose.model('Model', schema);

// Create a new document
const document = new Model({
  field1: [1, 2, 3],
  field2: 5,
  expression: this.field1 * this.field2,
});

// Evaluate the expression
const result = document.evaluateExpression();

// Print the result
console.log(result); // [5, 7, 9]