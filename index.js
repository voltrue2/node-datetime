'use strict';

var DateTime = require('./src/datetime');
var TimedNumber = require('./src/timednumber');

exports.create = function (now, defaultFormat) {
	return new DateTime(now, defaultFormat);
};

exports.createTimedNumber = function (conf) {
	return new TimedNumber(conf);
};
