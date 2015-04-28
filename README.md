# node-datetime

©Nobuyori Takahashi < <voltrue2@yahoo.com> >

An extended Date object for javascript.

It handles offsets by days and hours and formatting.

## Installation

#### Installation via npm

`npm node-datetime`

## API

#### .create(time [*mix])

Returns an instance of DateTime object.

`time` can be a `YYYY-MM-DD HH:MM:SS` style string, javascript Date object, or timestamp such as `Date.now()`.

Example:

```javascript
var datetime = require('node-datetime');
var dt = datetime.create();
var fomratted = dt.format('m/d/Y H:M:S');
// e.g. 04/28/2015 21:13:09
```

## DateTime Object

### Methods

#### .format(format [string])

Returns a formatted date time string.

#### Formatting rules

|Format|Meaning|
|---|---|
|y|The last 2 digit of the year|
|Y|Year|
|m|Month with leading 0|
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
