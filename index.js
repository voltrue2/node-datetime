'use strict';

var DateTime = require('./src/datetime');

exports.create = function (now, defaultFormat) {
	return new DateTime(now, defaultFormat);
};
