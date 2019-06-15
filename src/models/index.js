const mongoose = require('mongoose');
const User = require('./User');

mongoose.set('debug','true');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/authDB', {useNewUrlParser: true});

module.exports = { User };