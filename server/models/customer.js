var mongoose = require('mongoose');

var Customer = mongoose.model('Customer', {
  vorname: {
    type: String,
    required: true
  }, 
  nachname: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: false
  }, 
  worthiness: {
    type: Number,
    default: 1000
  }
});

module.exports = {Customer};