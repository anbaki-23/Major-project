const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
   
    email:String,
    password:String,
   
   
})

const loginModel = mongoose.model('Login', loginSchema);

module.exports = loginModel;