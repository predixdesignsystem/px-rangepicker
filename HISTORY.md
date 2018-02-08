V3.3.2
==================
* visually represent the range-field invalid state in the ranpe-panel

V3.3.1
==================
* reflected the range-field validation state to the `isValid` prop

V3.3.0
==================
* added `scrollAction` property to control page scrolling when panel is open

V3.2.2
==================
* fixed panel position bug

V3.2.1
==================
* cleaned up api and exposed the `required` property

V3.2.0
==================
* added ability to display title above the fields through the `showFieldTitles` property

v3.1.3
==================
* Updated to newest px-datetime-common behavior versions

v3.1.2
==================
* added `sudo:required` to travis

v3.1.1
==================
* prevent `_processClosed()` from running when `opened` is instantiated

v3.1.0
==================
* exposed `hideIcon` property

v3.0.1
==================
* add links in docs

v3.0.0
==================
* Polymer 1.X/2.X hybrid support
* range property has been deleted, please use `fromMoment` and `toMoment` for controlling the range. the px-datetime-range-submitted event still exists when a new range is applied.
* `fromMoment` and `toMoment` can be null to have an empty field

v2.1.2
==================
* add device flags

v2.1.1
==================
* updated css variable documentation

v2.1.0
==================
* added `hideValidationMessages` property

v2.0.4
==================
* add min and max date support

v2.0.3
==================
* expose allow-wrap for mobile (#44)

v2.0.2
==================
* Fix comment for analyzer

v2.0.1
==================
* runtime theming for demo

v2.0.0
==================
* component redesign
* combined -predix and -sketch sass files
* update dependencies for design refresh
* make showButtons false by default

v1.4.0
==================
* added localization through resources, language, formats and Px.moment.changeLocale()

v1.3.10
==================
* converted time zone property to typeahead

v1.3.9
==================
* add Event Fired information to demo and update documentation

v1.3.8
==================
* added styling section to API documentation

v1.3.7
==================
* fixed typo in component description

v1.3.6
==================
* Moved theming style includes and updated ghp.sh
* updated api for new colors

v1.3.5
==================
* added index-dark-theme.html
* Update to px-demo
* removed demosass
* Updated to cool grays

v1.3.4
==================
* Update colors design to pick up new colors

v1.3.3
==================
* changing ghp.sh to account for Alpha releases

v1.3.2
==================
* changed overflow on demo so panel overlaps

v1.3.1
==================
* Update missed design dependencies

v1.3.0
==================
* Updated dependencies

v1.2.15
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v1.2.14
==================
* updating slider dependency

v1.2.13
==================
* changing all devDeps to ^

v1.2.12
==================
* Update px-theme to 2.0.1 and update test fixtures

v1.2.11
==================
* Update px-theme to 2.0.1 and update test fixtures

v1.2.10
==================
* update dependencies for dropdown

v1.2.9
==================
* increased demo container height to accomodate component

v1.2.8
==================
* removing px-theme style call

v1.2.7
==================
* changing Gruntfile.js to gulpfile.js

v1.2.6
==================
* added style variable for theming

v1.2.5
==================
* bower updating px-demo-snippet

v1.2.4
==================
* fixed codepen

v1.2.3
==================
* Update dependencies

v1.2.2
==================
* Push latest gulp file and demo snippet component.

v1.2.1
==================
* Grunt to gulp migration & style module use.

v1.1.10
==================
* added correct event listener to demo event counter

v1.1.9
==================
* Fixed demo event counter

v1.1.8
==================
* added overflow to demoContainer and removed flex__wrap from mega-demo

v1.1.7
==================
* updated mega demo styles and bower px-demo-snippet to ^

v1.1.6
==================
* added image to readme, removed watch, added view on github

v1.1.5
==================
* Added vulcanize

v1.1.4
==================
* Updated component description in demo

v1.1.3
==================
* Fixed footer

v1.1.2
==================
* Fixed bower links and added demo footer

v1.1.1
==================
* Updated to new demo page

v1.1.0
==================
* Added blockPastDates

v1.0.2
==================
* Use local copy of moment.js

v1.0.0
==================
* major rework of the component to use multiple sub components

v0.4.0
==================
* Upgrade to Polymer 1.5.0

v0.3.4
==================
* added oss_notice to bower ignore

v0.3.3
==================
* added pull request test for travis and updated OSS Notice

v0.3.2
==================
* added auto github pages functionality

v0.3.1
==================
* moved moment import into its own html import

v0.3.0
==================
* Upgrade to Polymer 1.4.0

v0.2.1
==================
* Fixed a bug in px-time-rangepicker where the to px-date-time-input was not receiving isUTC

v0.2.0
==================
* add is-utc attribute

v0.1.6
==================
* Updated License

v0.1.5
==================
* Fixed bug where if the user clicks a first date, then chooses a preset, the calendar doesn't visually update to the preset.

v0.1.4
==================
* Fixed spacing issue in Firefox which expanded the div beyond the expected size, and wrapped the presets div down.
