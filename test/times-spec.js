'use strict';
describe('Times', function() {

  var rangePicker, fromTimeInput, toTimeInput, timeRange;

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

  function shouldBeHours(expectedHours) {
    expect(parseInt(moment(toTimeInput.time, 'hh:mm:ss A').format('hh'))).toBe(expectedHours); // check the time string is as expected (in 12 hour clock)
    expect(moment(toTimeInput.time, 'hh:mm:ss A').format('hh')).toBe(toTimeInput.hours); // and the input field is as expected
  }

  function shouldBeMinutes(expectedMinutes) {
    expect(moment(toTimeInput.time, 'hh:mm:ss A').minutes()).toBe(expectedMinutes); // check the time string is as expected
    expect(moment(toTimeInput.time, 'hh:mm:ss A').format('mm')).toBe(toTimeInput.minutes); // and the input field is as expected
  }

  function shouldBeSeconds(expectedSeconds) {
    expect(moment(toTimeInput.time, 'hh:mm:ss A').seconds()).toBe(expectedSeconds); // check the time string is as expected
    expect(moment(toTimeInput.time, 'hh:mm:ss A').format('ss')).toBe(toTimeInput.seconds); // and the input field is as expected
  }

  function shouldBePM() {
    expect(moment(toTimeInput.time, 'hh:mm:ss A').format('A')).toBe('PM'); // check the AM/PM string is as expected
    expect(toTimeInput.isAM).toBe(false); // and the input toggle is as expected
  }

  function shouldBeAM() {
    expect(moment(toTimeInput.time, 'hh:mm:ss A').format('A')).toBe('AM'); // check the AM/PM string is as expected
    expect(toTimeInput.isAM).toBe(true); // and the input toggle is as expected
  }

  px.beforeEachWithFixture(function() {
    $fixture.append('<px-rangepicker></px-rangepicker>');
  });

  describe('', function() {

    px.beforeEachAsync(function() {
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

      beforeEach(function() {
        toTimeInput.time = '12:00:00 AM';
      });

      function testHours(input, expectedHours, isNumberPad) {
        toTimeInput.changeHours(getFakeEvent(input, isNumberPad));
        shouldBeHours(expectedHours);
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
        shouldBeMinutes(expectedMinutes);
      }

      beforeEach(function() {
        toTimeInput.time = '12:00:00 AM';
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
        shouldBeSeconds(expectedSeconds);
      }

      beforeEach(function() {
        toTimeInput.time = '12:00:00 AM';
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

    describe('when am/pm is toggled', function() {

      it('am goes to pm', function() {
        toTimeInput.time = '4:00:00 AM';

        toTimeInput.selectPM();

        shouldBeHours(4);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBePM();
      });

      it('pm goes to am', function() {
        toTimeInput.time = '4:00:00 PM';

        toTimeInput.selectAM();

        shouldBeHours(4);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBeAM();
      });

      it('pm stays at pm', function() {
        toTimeInput.time = '4:00:00 PM';

        toTimeInput.selectPM();

        shouldBeHours(4);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBePM();
      });

    });

    describe('12:00 AM and PM', function() {

      it('12:00 AM toggled to PM -> 12:00 PM', function() {
        toTimeInput.time = '12:00:00 AM';

        toTimeInput.selectPM();

        shouldBeHours(12);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBePM();
      });

      it('12:00 PM toggled to AM -> 12:00 AM', function() {
        toTimeInput.time = '12:00:00 PM';

        toTimeInput.selectAM();

        shouldBeHours(12);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBeAM();
      });

      it('11:00 PM to 12 hours -> 12:00 PM (doesnt affect am/pm)', function() {
        toTimeInput.time = '11:00:00 PM';

        toTimeInput.changeHours(getFakeEvent(11));

        shouldBeHours(11);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBePM();
      });

      it('12:00 PM to 1 hours -> 1:00 PM (doesnt affect am/pm)', function() {
        toTimeInput.time = '12:00:00 PM';

        toTimeInput.changeHours(getFakeEvent(1));

        shouldBeHours(1);
        shouldBeMinutes(0);
        shouldBeSeconds(0);
        shouldBePM();
      });

    });

    it('when time input time is changed the range field (collapsed view) is updated accordingly', function() {

      fromTimeInput.changeHours(getFakeEvent(0));
      fromTimeInput.changeHours(getFakeEvent(1));
      fromTimeInput.changeMinutes(getFakeEvent(2));
      fromTimeInput.changeMinutes(getFakeEvent(3));
      fromTimeInput.changeSeconds(getFakeEvent(5));
      fromTimeInput.changeSeconds(getFakeEvent(4));
      fromTimeInput.selectAM();

      toTimeInput.changeHours(getFakeEvent(0));
      toTimeInput.changeHours(getFakeEvent(1));
      toTimeInput.changeHours(getFakeEvent(2));
      toTimeInput.changeMinutes(getFakeEvent(5));
      toTimeInput.changeMinutes(getFakeEvent(7));
      toTimeInput.changeSeconds(getFakeEvent(3));
      toTimeInput.changeSeconds(getFakeEvent(9));
      toTimeInput.selectPM();

      expect(rangePicker.fromTime, 'hh:mm:ss A').toBe('01:23:54 AM');
      expect(rangePicker.toTime, 'hh:mm:ss A').toBe('12:57:39 PM');
    });

  });

});
