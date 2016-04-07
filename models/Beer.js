'use strict';

var mongoose = require('mongoose');

var Beer;

var beerSchema = new mongoose.Schema({
	name: String,
	sampled: {type: Boolean, default: false},
	rating: Number,
	comments: String
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;