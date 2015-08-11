'use strict';
describe('Rangepicker', function() {

  var $rangePicker, rangePicker, fromTimeInput, toTimeInput, timeRange;

  var getFakeEvent = function(number, isNumberPad) {
    var keyCode = number + 48;
    if (isNumberPad) {
      keyCode = number + 96;
    }

    return {
      preventDefault: function() {
      },
      keyCode: keyCode
    };
  };

  px.beforeEachWithFixture(function() {
    $fixture.append('<px-rangepicker></px-rangepicker>');
  });

  describe('', function() {

    px.beforeEachAsync(function() {
      $rangePicker = $('px-rangepicker');
      rangePicker = document.querySelector('px-rangepicker');

      fromTimeInput = rangePicker.querySelector('#fromTimeInput');
      toTimeInput = rangePicker.querySelector('#toTimeInput');

      timeRange = rangePicker.querySelector('#timeRange');
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
        toTimeInput.changeHours(getFakeEvent(input, isNumberPad));
        expect(moment(toTimeInput.time, 'hh:mm:ss A').hours()).toBe(expectedHours); // check the time string is as expected
        expect(moment(toTimeInput.time, 'hh:mm:ss A').format('hh')).toBe(toTimeInput.hours); // and the input field is as expected
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
        toTimeInput.changeMinutes(getFakeEvent(input, isNumberPad));
        expect(moment(toTimeInput.time, 'hh:mm:ss A').minutes()).toBe(expectedMinutes); // check the time string is as expected
        expect(moment(toTimeInput.time, 'hh:mm:ss A').format('mm')).toBe(toTimeInput.minutes); // and the input field is as expected
      }

      beforeEach(function() {
        toTimeInput.minutes = "00";
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
        toTimeInput.changeSeconds(getFakeEvent(input, isNumberPad));
        expect(moment(toTimeInput.time, 'hh:mm:ss A').seconds()).toBe(expectedSeconds); // check the time string is as expected
        expect(moment(toTimeInput.time, 'hh:mm:ss A').format('ss')).toBe(toTimeInput.seconds); // and the input field is as expected
      }

      beforeEach(function() {
        toTimeInput.seconds = "00";
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

    it('when time input time is changed the range field (collapsed view) is updated accordingly', function() {

      fromTimeInput.changeHours(getFakeEvent(1));
      fromTimeInput.changeMinutes(getFakeEvent(2));
      fromTimeInput.changeMinutes(getFakeEvent(3));
      fromTimeInput.changeSeconds(getFakeEvent(5));
      fromTimeInput.changeSeconds(getFakeEvent(4));

      toTimeInput.changeHours(getFakeEvent(1));
      toTimeInput.changeHours(getFakeEvent(2));
      toTimeInput.changeMinutes(getFakeEvent(5));
      toTimeInput.changeMinutes(getFakeEvent(7));
      toTimeInput.changeSeconds(getFakeEvent(3));
      toTimeInput.changeSeconds(getFakeEvent(9));

      expect(rangePicker.fromTime, 'hh:mm:ss A').toBe('01:23:54 AM');
      expect(rangePicker.toTime, 'hh:mm:ss A').toBe('12:57:39 AM');
    });

  });

});
