# Px-Rangepicker

Px-Rangepicker enables setting a range of time using a calendar-based UI.

## Overview

Use the Px-Rangepicker to add a web component to your application enabling users to choose a start date-time and an end date-time. A graphical calendar UI with two calendars is presented, as well as a time range selector below the calendars. A column of preset date-time ranges is available on the right hand side of the selection modal enabling the choice between the presets: "Last Day", "Last Week" and "Last Year".

## Usage

### Prerequisites

1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

### Getting Started

First, install the component via bower on the command line.

```
bower install https://github.com/PredixDev/px-rangepicker.git --save
```

Second, import the component to your application with the following tag in your head.

```html
<link rel="import" href="/bower_components/px-rangepicker/px-rangepicker.html"/>
```

Finally, use the component in your application:

```html
<px-rangepicker></px-rangepicker>
```

<br />
<hr />

## Attributes

#### range

*Type:* **Object** - (*Optional*) - *Default:* The previous week

The `range` attribute is 2-way data-bindable object with two properties: "from" and "to". The value of these must be set to valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time strings.

```html
<px-rangepicker
	...
	range='{
      "from": "2015-08-18T00:14:42.387Z",
      "to": "2015-09-02T05:06:00.387Z"
    }'>
</px-rangepicker>
```

#### allow-future-dates

*Type:* **Boolean** - (*Optional*) - *Default:* false

By default future dates are disabled in the date picker. Set the `allow-future-dates` attribute to "true" to enable future dates in the date range picker. *Note: No validation of dates is performed so users are able to enter manually any date without restriction. This attribute merely disables choosing future dates via the calendar UI.*

```html
<px-rangepicker
	...
	allow-future-dates="true">
</px-rangepicker>
```

#### preset-ranges

*Type:* **Array** - (*Optional*) - *Default:* Last Day, Last Week, Last Year

The preset date/time ranges to be displayed defined as an array of one or more objects with three properties each: `displayText`, `startDateTime`, `endDateTime`.

The `displayText` attribute assigns a label to the preset link which will appear in the modal.

The `startDateTime` and `endDateTime` attributes set the beginning and end of the range, defined as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time strings.

```html
<px-rangepicker
	...
	preset-ranges='[
      {
        "displayText": "Custom Time 1",
        "startDateTime": "2014-05-01T01:00:00Z",
        "endDateTime": "2015-08-12T01:00:00Z"
      },
      {
        "displayText": "Custom Time 2",
        "startDateTime": "2015-05-12T12:32:05Z",
        "endDateTime": "2015-05-12T12:47:07Z"
      }
    ]'>
</px-rangepicker>
```

#### display-options

*Type:* **Object** - (*Optional*) - *Default:* { "displayType": "normal", "submitButtonText": "Submit", "submitButtonIcon": "" }

Display configuration that enables customization of the `displayType`, `submitButtonText`, and `submitButtonIcon`.

```html
<px-rangepicker
	...
	display-options="{
        "displayType": "normal",
        "submitButtonText": "Submit",
        "submitButtonIcon": ""
    }">
</px-rangepicker>
```

<br />
<hr />

##Events
### `range-changed`

Event fired on change to `range` value. Listeners will receive an event object whose `e.detail.value` attribute has the changing property's new value. *Note: The value will be automatically updated if you are using 2-way data-binding, making event listeners unnecessary.*

Add a listener using the `on-range-changed` annotated event listener syntax as follows:

```html
<px-rangepicker on-range-changed="rangeChangedHandler"></px-rangepicker>
```
```javascript
var rangeChangedHandler = function(e) {
	// do something on range-changed
};
```

Attach an event listener using `addEventListener` like this:

```html
<px-rangepicker id="my-range-picker"></px-rangepicker>
```
```javascript
	var el = document.querySelector("#my-range-picker");
	el.addEventListener("range-changed", function(e) {
		// do something on range-changed
	});
```

## Using Events

Events follow the [Polymer data-binding standards](https://www.polymer-project.org/1.0/docs/devguide/data-binding.html).

You can can attach listeners by using one of the methods below:

1. Polymer Event listener
2. "on-x" annotated event listener
3. addEventListener vanilla Javascript method
<br />
<hr />

## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

From the component's directory, to start a local server run:

```
$ grunt depserve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### LiveReload

By default grunt watch is configured to enable LiveReload and will be watching for modifications in your root directory as well as `/css`.

Your browser will also need to have the LiveReload extension installed and enabled. For instructions on how to do this please refer to: [livereload.com/extensions/](http://livereload.com/extensions/).

Disable LiveReload by removing the `livereload` key from the configuration object or explicitly setting it to false.


### DevMode
Devmode runs `grunt depserve` and `grunt watch` concurrently so that when you make a change to your source files and save them, your preview will be updated in any browsers you have opened and turned on LiveReload.
From the component's directory run:

```
$ grunt devmode
```

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/COMPONENT/issues) to submit any bugs you might find.
