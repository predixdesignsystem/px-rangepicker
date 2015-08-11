'use strict';
describe('Rangepicker', function () {

  var $rangePicker, rangePicker, timeInput, rangeField;

  var getFakeEvent = function(number, isNumberPad) {
    var keyCode = number + 48;
    if(isNumberPad) {
      keyCode = number + 96;
    }

    return {
      preventDefault: function() {},
      keyCode: keyCode
    };
  };

  px.beforeEachWithFixture(function () {
    $fixture.append('<px-rangepicker></px-rangepicker>');
  });

  describe('', function () {

    px.beforeEachAsync(function(){
      $rangePicker = $('px-rangepicker');
      rangePicker = document.querySelector('px-rangepicker');

      timeInput = rangePicker.querySelector('px-time-input');
      rangeField = rangePicker.querySelector('px-range-field');
    });

    it('from time is initialized from the current time', function() {
      var startRangeMin = moment().subtract(2, 'seconds');
      var startRangeMax = moment().add(2, 'seconds');
      expect(moment(rangePicker.fromTime, 'hh:mm:ss A').isBetween(startRangeMin, startRangeMax)).toBeTruthy();
    });

    it('to time is initialized ahead 7 hours', function() {
      var endRangeMin = moment().add(7, 'hours').subtract(2, 'seconds');
      var endRangeMax = moment().add(7, 'hours').add(2, 'seconds');
      expect(moment(rangePicker.toTime, 'hh:mm:ss A').isBetween(endRangeMin, endRangeMax)).toBeTruthy();
    });

    describe('when hours are changed', function() {

      function testHours(input, expectedHours, isNumberPad) {
        timeInput.changeHours(getFakeEvent(input, isNumberPad));
        expect(moment(timeInput.time, 'hh:mm:ss A').hours()).toBe(expectedHours);
      }

      it('single digits', function() {
        testHours(8, 8);
        testHours(9, 9);
        testHours(1, 1);
        testHours(4, 4);
      });

      it('two-digit hours are supported up to 12', function() {
        testHours(1, 1);
        testHours(2, 12);
      });

      it('always keeps the second digit if possible', function() {
        testHours(1, 1);
        testHours(1, 11);
        testHours(0, 10);
      });

      it('also supports the number pad', function() {
        testHours(1, 1, 'numberpad');
        testHours(2, 12, 'numberpad');
        testHours(5, 5, 'numberpad');
      });

      it('ignores other keys', function() {
        testHours(2, 2);
        testHours(19, 2); // the letter c
        testHours(140, 2); // comma
        testHours(138, 2); // semi-colon
      });

    });

    describe('when minutes are changed', function() {

      function testMinutes(input, expectedMinutes, isNumberPad) {
        timeInput.changeMinutes(getFakeEvent(input, isNumberPad));
        expect(moment(timeInput.time, 'hh:mm:ss A').minutes()).toBe(expectedMinutes);
      }

      beforeEach(function() {
        timeInput.minutes = "00";
      });

      it('single digits', function() {
        testMinutes(7, 7);
        testMinutes(6, 6);
        testMinutes(1, 1);
      });

      it('two-digit minutes are supported up to 59', function() {
        testMinutes(5, 5);
        testMinutes(9, 59);
      });

      it('always keeps the second digit if possible', function() {
        testMinutes(5, 5);
        testMinutes(1, 51);
        testMinutes(5, 15);
      });

      it('also supports the number pad', function() {
        testMinutes(4, 4, 'numberpad');
        testMinutes(9, 49, 'numberpad');
        testMinutes(7, 7, 'numberpad');
      });

    });

    describe('when seconds are changed', function() {

      function testSeconds(input, expectedSeconds, isNumberPad) {
        timeInput.changeSeconds(getFakeEvent(input, isNumberPad));
        expect(moment(timeInput.time, 'hh:mm:ss A').seconds()).toBe(expectedSeconds);
      }

      beforeEach(function() {
        timeInput.seconds = "00";
      });

      it('single digits', function() {
        testSeconds(8, 8);
        testSeconds(9, 9);
      });

      it('two-digit seconds are supported up to 59', function() {
        testSeconds(3, 3);
        testSeconds(8, 38);
      });

      it('always keeps the second digit if possible', function() {
        testSeconds(2, 2);
        testSeconds(4, 24);
        testSeconds(9, 49);
      });

      it('also supports the number pad', function() {
        testSeconds(3, 3, 'numberpad');
        testSeconds(7, 37, 'numberpad');
        testSeconds(2, 2, 'numberpad');
      });

    });


  });


});
