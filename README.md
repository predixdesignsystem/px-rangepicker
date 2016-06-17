# Px-Rangepicker [![Build Status](https://travis-ci.org/PredixDev/px-rangepicker.svg?branch=master)](https://travis-ci.org/PredixDev/px-rangepicker)

Px-Rangepicker enables setting a range of time using a calendar-based UI.

## Overview

Use the Px-Rangepicker to add a web component to your application enabling users to choose a start date-time and an end date-time. A graphical calendar UI with two calendars is presented, as well as a time range selector below the calendars. A column of preset date-time ranges is available on the right hand side of the selection modal enabling the choice between configurable presets.

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

### API and examples

Read the full API and view the demo [here](https://predixdev.github.io/px-rangepicker).

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
