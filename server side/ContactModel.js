const mongoose = require("mongoose");

const schemaModel = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String, 
});

const Contact = mongoose.model('Contact', schemaModel);

module.exports = Contact;
