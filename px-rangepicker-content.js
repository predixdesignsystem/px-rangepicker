/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
We needed to split the rangepicker into two different components
because of the way we hoist the panel
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-datetime-common/px-datetime-range-behavior.js';
import 'px-datetime-range-panel/px-datetime-range-panel.js';
import 'px-datetime-common/px-datetime-button-behavior.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import './css/px-rangepicker-content-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-rangepicker-content-styles"></style>

    <iron-dropdown id="dropdown" opened="{{opened}}" vertical-align="auto" horizontal-align="auto" scroll-action="{{scrollAction}}" dynamic-align="" vertical-offset="50" position-target="[[positionTarget]]">
      <px-datetime-range-panel id="panel" time-is-valid="{{timeIsValid}}" slot="dropdown-content" class\$="{{_handleIsValid(isValid)}}" from-moment="{{fromMoment}}" to-moment="{{toMoment}}" time-format="{{timeFormat}}" hide-time="{{hideTime}}" hide-presets="{{hidePresets}}" show-buttons="{{showButtons}}" block-future-dates="{{blockFutureDates}}" block-past-dates="{{blockPastDates}}" preset-ranges="{{presetRanges}}" time-zone="[[timeZone]]" day-week-start-index="[[dayWeekStartIndex]]" resources="[[resources]]" language="[[language]]" formats="[[formats]]" min-date="[[minDate]]" max-date="[[maxDate]]">
      </px-datetime-range-panel>
    </iron-dropdown>
`,

  is: 'px-rangepicker-content',

  behaviors: [
    PxDatetimeBehavior.TempRange,
    PxDatetimeBehavior.Buttons
  ],

  properties: {
    /**
     * Whether the panel is opened
     */
    opened: {
      type: Boolean,
      notify: true
    },
    /**
     * Moment format used to format the date
     */
    dateFormat: {
      type: String
    },
    /**
     * Moment format used to format the time
     */
    timeFormat: {
      type: String
    },
    /**
     * Whether to allow time selection as well in this date picker
     */
    hideTime: {
      type: Boolean
    },
    /**
     * Whether to show the preset date/time ranges
     */
    hidePresets: {
      type: Boolean
    },
    /**
     * Controls whether the calendar/clock icon should be hidden
     */
    hideIcon: {
      type: Boolean
    },
    /**
     * Whether to allow the range field to wrap at smaller screen resolutions / parent container sizes.
     */
    allowWrap: {
      type: Boolean
    },
    /**
     * This will remove the `to` inbetween the fields and
     * add titles above the fields. This allows for a
     * more flexable design.
     */
    showFieldTitles: {
      type: Boolean
    },
    /**
     * Controls if the page can be scrolled when the
     * panel is open.
     * Sets the `scrollAction` property on `iron-dropdown`
     *
     * lock - blocks scrolling from happening
     * refit - computes the new position of the panel
     * cancel - causes the overlay to close
     */
     scrollAction: {
      type: String,
      reflectToAttribute: true
    },
    /**
     * Whether the currently selected date is valid
     */
    isValid: {
      type: Boolean,
      observer: '_updatedStyleOnValid'
    },
    /**
     * Whether the currently selected date is valid
     */
    timeIsValid: {
      type: Boolean
    },
    /**
     * Boolean stating if the range field is required.
     * Will result in an error if left blank.
     */
    required: {
      type: Boolean
    },
    /**
     * Hides the validation messages if set to true
     */
    hideValidationMessages: {
      type: Boolean
    },
    /**
     * Timezone display format
     * - 'dropdown': shows the timezone as a dropdown with which the user can select a different timezone. Contains only a subset of all timezones.
     * - 'extendedDropdown': shows the timezone as a dropdown with which user can select a different timezone. Contains all existing timezones (588 total).
     * - 'text': shows the timezone as text, non-editable.
     * - 'abbreviatedText': shows the timezone as abbreviated text, non-editable (e.g. UTC, PST, EST).
     */
    showTimeZone: {
      type: String
    },
    /**
     * The preset date/time ranges to be displayed.
     *
     * @default Last 7 Days + This Month + Last Month
     */
    presetRanges: {
      type: Object
    },
    positionTarget: HTMLElement
  },

  /**
   * Opens the calendar if closed, closes it if opened
   * called in `px-rangepicker.html`
   */
  _toggleBoxOpen: function() {
    this.$.dropdown.toggle();
  },

  /**
   * Sets the `allowApply` prop on `px-datetime-range-panel`
   * called in `px-rangepicker.html`
   */
  _handleValidation: function (isValid) {
    this.$.panel.allowApply = isValid;
  },

  /**
   * helper function to added the invalid class on the range panel
   * if the rangepicker is invalid
   */
  _handleIsValid: function(isValid) {
    return isValid ? "" : "invalid";
  },

  /**
   * needed for polymer 1 only.
   * The implementation of the css-custom-properties is different form polymer 1 to polymer 2.
   * In polymer 1 css-custom-properties are not always dynamic. In this specific case when
   * the `invalid` class is applied to `px-datetime-range-panel`, I want the css variables in
   * `px-calendar-picker` to update.
   * I am forcing an `updateStyles` so that the styles cross the tree will be reapplied.
   * This allows for the new css-variables to be applied to the sub-component. It is
   * generally a last resort to for `updateStyles`.
   */
  _updatedStyleOnValid: function() {
    this.updateStyles();
  }
});
