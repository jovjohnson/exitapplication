'use strict';

var mongoose = require('mongoose');

var Beer;

var beerSchema = new mongoose.Schema({
	name: { type: String},
	sampled: {type: Boolean},
	rating: {type: Number},
	comments: {type: String}
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;