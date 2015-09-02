//'use strict';
//describe('Times', function() {
//
//  var timeInput;
//
//  var getFakeEvent = function(number, isNumberPad) {
//    var keyCode = number + 48;
//    if (isNumberPad) {
//      keyCode = number + 96;
//    }
//
//    return {
//      preventDefault: function() {
//      },
//      keyCode: keyCode
//    };
//  };
//
//  function shouldBeHours(expectedHours) {
//    expect(parseInt(timeInput.time.format('hh'))).toBe(expectedHours); // check the time string is as expected (in 12 hour clock)
//    expect(timeInput.time.format('hh')).toBe(timeInput.hours); // and the input field is as expected
//  }
//
//  function shouldBeMinutes(expectedMinutes) {
//    expect(timeInput.time.minutes()).toBe(expectedMinutes); // check the time string is as expected
//    expect(timeInput.time.format('mm')).toBe(timeInput.minutes); // and the input field is as expected
//  }
//
//  function shouldBeSeconds(expectedSeconds) {
//    expect(timeInput.time.seconds()).toBe(expectedSeconds); // check the time string is as expected
//    expect(timeInput.time.format('ss')).toBe(timeInput.seconds); // and the input field is as expected
//  }
//
//  function shouldBePM() {
//    expect(timeInput.time.format('A')).toBe('PM'); // check the AM/PM string is as expected
//    expect(timeInput.isAM).toBe(false); // and the input toggle is as expected
//  }
//
//  function shouldBeAM() {
//    expect(timeInput.time.format('A')).toBe('AM'); // check the AM/PM string is as expected
//    expect(timeInput.isAM).toBe(true); // and the input toggle is as expected
//  }
//
//  px.beforeEachWithFixture(function() {
//    $fixture.append('<px-time-input></px-time-input>');
//  });
//
//  describe('', function() {
//
//    px.beforeEachAsync(function() {
//      timeInput = document.querySelector('px-time-input');
//      var time = moment("07:06:05 PM", "hh:mm:ss A");
//      timeInput.time = time;
//    });
//
//    it('from time is initialized to the time passed in', function() {
//      expect(timeInput.hours).toBe('07');
//      expect(timeInput.minutes).toBe('06');
//      expect(timeInput.seconds).toBe('05');
//      expect(timeInput.isAM).toBe(false);
//    });
//
//    describe('when hours are changed', function() {
//
//      beforeEach(function() {
//        timeInput.time =  moment("12:00:00 AM", "hh:mm:ss A");
//      });
//
//      function testHours(input, expectedHours, isNumberPad) {
//        timeInput._changeHours(getFakeEvent(input, isNumberPad));
//        shouldBeHours(expectedHours);
//      }
//
//      it('single digits', function() {
//        testHours(8, 8);
//        testHours(9, 9);
//        testHours(1, 1);
//        testHours(4, 4);
//      });
//
//      it('two-digit hours are supported up to 12', function() {
//        testHours(1, 1);
//        testHours(2, 12);
//      });
//
//      it('always keeps the second digit if possible', function() {
//        testHours(1, 1);
//        testHours(1, 11);
//        testHours(0, 10);
//      });
//
//      it('also supports the number pad', function() {
//        testHours(1, 1, 'numberpad');
//        testHours(2, 12, 'numberpad');
//        testHours(5, 5, 'numberpad');
//      });
//
//      it('ignores other keys', function() {
//        testHours(2, 2);
//        testHours(19, 2); // the letter c
//        testHours(140, 2); // comma
//        testHours(138, 2); // semi-colon
//      });
//
//    });
//
//    describe('when minutes are changed', function() {
//
//      function testMinutes(input, expectedMinutes, isNumberPad) {
//        timeInput._changeMinutes(getFakeEvent(input, isNumberPad));
//        shouldBeMinutes(expectedMinutes);
//      }
//
//      beforeEach(function() {
//        timeInput.time =  moment("12:00:00 AM", "hh:mm:ss A");
//      });
//
//      it('single digits', function() {
//        testMinutes(7, 7);
//        testMinutes(6, 6);
//        testMinutes(1, 1);
//      });
//
//      it('two-digit minutes are supported up to 59', function() {
//        testMinutes(5, 5);
//        testMinutes(9, 59);
//      });
//
//      it('always keeps the second digit if possible', function() {
//        testMinutes(5, 5);
//        testMinutes(1, 51);
//        testMinutes(5, 15);
//      });
//
//      it('also supports the number pad', function() {
//        testMinutes(4, 4, 'numberpad');
//        testMinutes(9, 49, 'numberpad');
//        testMinutes(7, 7, 'numberpad');
//      });
//
//    });
//
//    describe('when seconds are changed', function() {
//
//      function testSeconds(input, expectedSeconds, isNumberPad) {
//        timeInput._changeSeconds(getFakeEvent(input, isNumberPad));
//        shouldBeSeconds(expectedSeconds);
//      }
//
//      beforeEach(function() {
//        timeInput.time = moment("12:00:00 AM", "hh:mm:ss A");
//      });
//
//      it('single digits', function() {
//        testSeconds(8, 8);
//        testSeconds(9, 9);
//      });
//
//      it('two-digit seconds are supported up to 59', function() {
//        testSeconds(3, 3);
//        testSeconds(8, 38);
//      });
//
//      it('always keeps the second digit if possible', function() {
//        testSeconds(2, 2);
//        testSeconds(4, 24);
//        testSeconds(9, 49);
//      });
//
//      it('also supports the number pad', function() {
//        testSeconds(3, 3, 'numberpad');
//        testSeconds(7, 37, 'numberpad');
//        testSeconds(2, 2, 'numberpad');
//      });
//
//    });
//
//    describe('when am/pm is toggled', function() {
//
//      it('am goes to pm', function() {
//        timeInput.time = moment("04:00:00 AM", "hh:mm:ss A");
//
//        timeInput._selectPM();
//
//        shouldBeHours(4);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBePM();
//      });
//
//      it('pm goes to am', function() {
//        timeInput.time = moment("04:00:00 PM", "hh:mm:ss A");
//
//        timeInput._selectAM();
//
//        shouldBeHours(4);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBeAM();
//      });
//
//      it('pm stays at pm', function() {
//        timeInput.time = moment("04:00:00 PM", "hh:mm:ss A");
//
//        timeInput._selectPM();
//
//        shouldBeHours(4);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBePM();
//      });
//
//    });
//
//    describe('12:00 AM and PM', function() {
//
//      it('12:00 AM toggled to PM -> 12:00 PM', function() {
//        timeInput.time = moment("12:00:00 AM", "hh:mm:ss A");
//
//        timeInput._selectPM();
//
//        shouldBeHours(12);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBePM();
//      });
//
//      it('12:00 PM toggled to AM -> 12:00 AM', function() {
//        timeInput.time = moment("12:00:00 PM", "hh:mm:ss A");
//
//        timeInput._selectAM();
//
//        shouldBeHours(12);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBeAM();
//      });
//
//      it('11:00 PM to 12 hours -> 12:00 PM (doesnt affect am/pm)', function() {
//        timeInput.time = moment("11:00:00 PM", "hh:mm:ss A");
//
//        timeInput._changeHours(getFakeEvent(11));
//
//        shouldBeHours(11);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBePM();
//      });
//
//      it('12:00 PM to 1 hours -> 1:00 PM (doesnt affect am/pm)', function() {
//        timeInput.time = moment("12:00:00 PM", "hh:mm:ss A");
//
//        timeInput._changeHours(getFakeEvent(1));
//
//        shouldBeHours(1);
//        shouldBeMinutes(0);
//        shouldBeSeconds(0);
//        shouldBePM();
//      });
//
//    });
//
//  });
//
//});
