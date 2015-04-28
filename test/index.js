var datetime = require('../');
var assert = require('assert');
var time = '2015-01-01 00:00:00.000';
var past = '2014-11-2 00:00:00.000';
var future = '2015-03-01 00:00:00.000';
var dayOffset = 60;
var hourOffset = 25;
var hourPast = '2014-12-30 23:00:00.000';
var hourFuture = '2015-01-02 01:00:00.000';

describe('Tests node-datetime', function () {
	
	it('Can create datetime object with no argument passed', function () {
		var d = datetime.create();
		assert(d);
	});

	it('Can return timestamp in milliseconds', function () {
		var then = new Date(time).getTime();
		var d = datetime.create(time);
		assert.equal(then, d.now());
	});

	it('Can format Y-m-d H:M:S.N', function () {
		var d = datetime.create(time);
		var f = d.format('Y-m-d H:M:S.N');
		assert.equal(f, time);
	});

	it('Can return y/m/d', function () {
		var d = d = datetime.create(time);
		var f = d.format('y/m/d');
		assert.equal(f, '15/01/01');
	});
	
	it('Can return name of week', function () {
		var d = datetime.create(time);
		var f = d.format('w W');
		assert.equal('Thu Thursday', f);
	});

	it('Can offset ' + dayOffset + ' days in the past', function () {
		var d = datetime.create(time);
		d.offsetInDays(-1 * dayOffset);
		assert(past, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + dayOffset + ' days in the future', function () {
		var d = datetime.create(time);
		d.offsetInDays(dayOffset);
		assert(future, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + hourOffset + ' hours in the past', function () {
		var d = datetime.create(time);
		d.offsetInHours(-1 * hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourPast);
	});

	it('Can offset ' + hourOffset + ' hours in the future', function () {
		var d = datetime.create(time);
		d.offsetInHours(hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourFuture);
	});

	it('Can get instances of DateTime object between 2015-04-12 and 2015-05-12', function () {
		var start = datetime.create('2015-04-12');
		var end = datetime.create('2015-05-12');
		var format = 'Y-m-d H:M:S.N';
		var list = start.getDatesInRange(end);
		for (var i = 0, len = list.length; i < len; i++) {
			var day = list[i];
			var check = datetime.create(start.now());
			check.offsetInDays(i);
			assert.equal(day.format(format), check.format(format));
		}
	});

	it('Can get instances of DateTime object between 2015-05-12 and 2015-04-12', function () {
		var start = datetime.create('2015-04-12');
		var end = datetime.create('2015-05-12');
		var format = 'Y-m-d H:M:S.N';
		var list = start.getDatesInRange(end);
		for (var i = list.length - 1; i >= 0; i--) {
			var day = list[i];
			var check = datetime.create(start.now());
			check.offsetInDays(i);
			assert.equal(day.format(format), check.format(format));
		}
	});

});
