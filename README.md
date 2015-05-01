# node-datetime

©Nobuyori Takahashi < <voltrue2@yahoo.com> >

An extended Date object for javascript.

1. Handles offests by days and hours.

2. Built-in formatting function.

3. Time based value calculation.

## Installation

#### Installation via npm

`npm node-datetime`

## API

#### .create(time [*mix], defaultFormat [*string])

Returns an instance of DateTime object.

`time` can be a `YYYY-MM-DD HH:MM:SS` style string, javascript Date object, or timestamp such as `Date.now()`.

Example:

```javascript
var datetime = require('node-datetime');
var dt = datetime.create();
var fomratted = dt.format('m/d/Y H:M:S');
// e.g. 04/28/2015 21:13:09
```

#### .setOffsetInDays(offsetDays [number])

Sets a shared offset in days.

If this is set, all instances of DateTime object will have the given offset in days.

This can be individually overridden.

#### .setOffsetInHourss(offsetHours [number])

Sets a shared offset in hours.

If this is set, all instances of DateTime object will have the given offset in hours.

This can be individually overridden.

#### .setDefaultFormat(defaultFormat [string])

Sets a shared default format.

If this is set, all instances of DateTime object will have the given format as default.

This can be individually overridden.

## DateTime Object

### Methods

#### .format(format [*string])

Returns a formatted date time string.

If default format is set and the format string is not passed to `.format()`, default format will be used.

Example With Format:

```javascript
var datetime = require('node-datetime');
var dt = datetime.create('2015-04-30 09:52:00');
var formattedDate = dt.format('m/d/y H:M');
console.log(formattedDate);
// 04/30/15 09:52
```

Example With Default Format:

```javascript
var datetime = require('node-datetime');
var dt = datetime.create('2015-04-30 14:30:00', 'Y/m/d H:I');
var formattedDate = dt.format();
console.log(formattedDate);
// 2015/04/30 02:30
```

#### Formatting rules

|Format|Meaning|
|---|---|
|y|The last 2 digit of the year|
|Y|Year|
|m|Month with leading 0|
|n|Shortened name of a month|
|f|Full name of a month|
|d|Date with leading 0|
|H|Hours with leading 0 in 24 hours format|
|I|Hours with leading 0 in 12 hours format|
|M|Minutes with leading 0|
|S|Seconds with leading 0|
|N|Milliseconds with leading 0|

#### .offsetInDays(offset [number])

Offests the date.

**NOTE**: By giving more than 30 days or 365 days, it can exceed current year or month.

Example:

```javascripript
var datetime = require('node-datetime');
var dt = datetime.create();
// 1 day in the future
dt.offsetInDays(1);
```

```javascripript
var datetime = require('node-datetime');
var dt = datetime.create();
// 1 day in the past
dt.offsetInDays(-1);
```

#### .offsetInHours(offset [number])

Offests the hours.

**NOTE**: By giving more than 24 hours, it can exceed current date and so on.

Example:

```javascripript
var datetime = require('node-datetime');
var dt = datetime.create();
// 1 hour in the future
dt.offsetInHours(1);
```

```javascripript
var datetime = require('node-datetime');
var dt = datetime.create();
// 1 hour in the past
dt.offsetInHours(-1);
```

#### .now()

Returns a unix timestamp in milliseconds.

#### .getDaysInRange(date [mix])

Returns an array of DateTime objects within the given range.

**NOTE**: `date` can be either DateTime or Date.

Example:

```javascript
var datetime = require('node-datetime');
var dt = datetime.create('2015-01-01');
var dates = dt.getDaysInRange(datetime.create('2015-01-10'));
// dates = [ ... ];
// dates will contain instances of DateTime object from 2015-01-01 to 2015-01-10
````

#### .timedNumber(conf [object])

Returns an instance of TimedNumber that changes its value over time.

conf:

```javascript
{
    "max": 10, // maximum value
    "min": 0, // minimum value
    "interval": 60000, // value increments/decrements every "interval"
    "step": 1, // at every interval, the value increments/decrements by "step"
    "type": "inc", // either "inc" for incrementing type of "dec" for decrementing type
    "init": 10 // initial value to start with
}
```

Usage Example:

TimedNumber that recovers its value by 1 every 1 second.

```javascript
var datetime = require('node-datetime');
var config = {
        max: 10,
        min: 0,
        interval: 1000,
        step: 1,
        type: 'inc',
        init: 0
};
var td = datetime.createTimedNumber(config);
setTimeout(function () {
        var value = td.getValue();
        // value should be 1
}, 1000);
```

```javascript
var datetime = require('node-datetime');
var config = {
        max: 10,
        min: 0,
        interval: 1000,
        step: 1,
        type: 'inc',
        init: 10
};
var td = datetime.createTimedNumber(config);
td.dec(5);
setTimeout(function () {
        var value = td.getValue();
        // value should be 6
}, 1000);
```

### TimedNumber Class

#### .getValue()

Returns the current value.

#### .inc(incrementValue [number])

Increments the current value by incrementValue.

Returns `true` if successful.

#### .dec(decrementValue [number])

Decrements the current value by decrementValue.

Returns `true` if successful.

#### .reset()

Resets the state of `TimedNumber` object to its initial state.

#### .getMaxValue()

Returns maximum value.

#### .getMinValue()

Returns minimum value.

#### .getInterval()

Returns the interval for every update in milliseconds.

#### .getStep()

Returns the value of step for every update.

#### .toObject()

Returns a JSON format of `TimedData` object.
