'use strict';

var DateTime = require('./src/datetime');

exports.create = function (now) {
	return new DateTime(now);
};
