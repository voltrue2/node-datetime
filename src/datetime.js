'use strict';

var FORMATS = {
	y: getYear,
	Y: getFullYear,
	m: getMonth,
	d: getDay,
	H: getMilitaryHours,
	h: getHours,
	M: getMinutes,
	S: getSeconds,
	N: getMillisec,
	w: getWeekday,
	W: getFullWeekday
};

var WEEKS = {
	ABB: [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	],
	FULL: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]
};

var ONEDAY = 86400000;

function DateTime(now) {
	this._now = (now) ? new Date(now) : new Date();
}

/*
* supported formats
* year: y (last 2 digit), Y (full year)
* month: m (01..12)
* day of month: d
* hours: H (00..23), I (01..12)
* minutes: M (00..59)
* seconds: S (00..60)
* milliseconds: N (000..999)
* weekday: W (full e.g. Sunday), w (e.g. Sun)
* 
*/
DateTime.prototype.format = function (format) {
	var list = format.split('');
	var str = '';
	for (var i = 0, len = list.length; i < len; i++) {
		str += this._convert(list[i]);
	}
	return str;
};

DateTime.prototype.now = function () {
	return this._now.getTime();
};

DateTime.prototype.offsetInDays = function (offset) {
	// dir: -1 = past, 1 = future
	var dir = (offset < 0) ? -1 : 1;
	// if offset is below 0, this will force it to be a positive
	var days = offset * dir;
	var offsetted = new Date(this._now);
	offsetted.setDate(offsetted.getDate() + (dir * days));
	this._now = offsetted;

};

DateTime.prototype.offsetInHours = function (offset) {
	var next = new Date(this._now);
	next.setHours(next.getHours() + offset);
	this._now = next;
};

DateTime.prototype.getDatesInRange = function (dateObj) {

	if (dateObj instanceof DateTime) {
		dateObj = dateObj._now;
	}

	var list = [];
	var dir = (dateObj.getTime() >= this._now.getTime()) ? 1 : -1;
	var diff = dateObj.getTime() - this._now.getTime() * dir;
	var current = new DateTime(this._now);
	
	while (diff > 0) {
		list.push(current);
		var next = new DateTime(current.now());
		next.offsetInDays(1 * dir);	
		current = next;
		diff -= ONEDAY;
	}

	return list;
};

DateTime.prototype._convert = function (formatFragment) {
	var converter = FORMATS[formatFragment];

	if (converter) {
		return converter(this._now);
	}
	
	// no converter 
	return formatFragment;
};

function getYear(d) {
	var year = d.getFullYear().toString();
	return year.substring(year.length - 2);
}

function getFullYear(d) {
	return d.getFullYear();
}

function getMonth(d) {
	return pad(d.getMonth() + 1);
}

function getDay(d) {
	return pad(d.getDate());
}

function getMilitaryHours(d) {
	return pad(d.getHours());
}

function getHours(d) {
	var h = d.getHours();
	var hours = (h >= 12) ? h - 12 : h; 
	return pad(hours);
}

function getMinutes(d) {
	return pad(d.getMinutes());
}

function getSeconds(d) {
	return pad(d.getSeconds());
}

function getMillisec(d) {
	return mpad(d.getMilliseconds());
}

function getWeekday(d) {
	return WEEKS.ABB[d.getDay()];
}

function getFullWeekday(d) {
	return WEEKS.FULL[d.getDay()];
}

function pad(n) {
	return (n < 10) ? '0' + n : n;
}

function mpad(n) {
	var padded = pad(n);
	return (typeof padded === 'string' || padded < 100) ? '0' + padded : padded; 
}

module.exports = DateTime;
