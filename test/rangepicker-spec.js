'use strict';
describe('Rangepicker', function() {

  var rangePicker, dateFromField, dateToField, timeFromField, timeToField;
  var leftCalendar, rightCalendar, dateRangePicker, timeFromInput, timeToInput;
  var presetsSection, presets;

  function date(date) {
    return {value: date, isSelected: false};
  }

  function selectedDate(date) {
    return {value: date, isSelected: true};
  }

  function calendarMatches(calendar, expected) {
    expected.forEach(function(expectedWeek, i) {
      expectedWeek.forEach(function(expectedDay, j) {
        var actualDay = calendar[i * 7 + j];
        if (expectedDay.value === null) {
          expect(actualDay.querySelector('button') === null || actualDay.querySelector('button').value === '').toBe(true);
        }
        else {
          expect(actualDay.querySelector('button').value).toBe(expectedDay.value);
        }

        if (expectedDay.isSelected) {
          expect(actualDay.querySelector('div').classList.contains('is-selected')).toBe(true);
        }
        else {
          expect(actualDay.querySelector('div').classList.contains('is-selected')).toBe(false);
        }
      });
    });
  }

  describe('when dates passed in are in same month', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-rangepicker from="10/11/2014 01:00:00 PM" to="10/25/2014 03:00:00 PM"></px-rangepicker>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        rangePicker = document.querySelector('px-rangepicker');

        var rangeFields = document.querySelector('#rangeFields');
        dateFromField = rangeFields.querySelector('#fromDate');
        dateToField = rangeFields.querySelector('#toDate');
        timeFromField = rangeFields.querySelector('#fromTime');
        timeToField = rangeFields.querySelector('#toTime');

        var rangepickerModal = document.querySelector('#rangePickerModal');
        dateRangePicker = rangepickerModal.querySelector('#dateRangePicker');
        var timeRangePicker = rangepickerModal.querySelector('#timeRangePicker');
        leftCalendar = dateRangePicker.querySelector('#leftCalendar');
        rightCalendar = dateRangePicker.querySelector('#rightCalendar');
        timeFromInput = timeRangePicker.querySelector('#fromTime');
        timeToInput = timeRangePicker.querySelector('#toTime');

        presetsSection = rangepickerModal.querySelector('px-rangepicker-presets');
      });

      describe('rangefields are initialized to passed in date/time', function() {

        it('from date', function() {
          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
        });

        it('to date', function() {
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
        });

        it('from time', function() {
          expect(timeFromField.moment.format('hh:mm:ss A')).toBe('01:00:00 PM');
        });

        it('to time', function() {
          expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
        });

      });

      describe('when the modal is opened - initialization', function() {

        beforeEach(function() {
          dateFromField._handleClick();
        });

        it('opens the left calendar with both selected dates', function() {
          expect(leftCalendar.month).toBe('October');
          expect(leftCalendar.year).toBe('2014');

          var leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(leftCalendarCells, [ // october 2014
            [date(null), date(null), date(null), date('1'), date('2'), date('3'), date('4')],
            [date('5'), date('6'), date('7'), date('8'), date('9'), date('10'), selectedDate('11')],
            [date('12'), date('13'), date('14'), date('15'), date('16'), date('17'), date('18')],
            [date('19'), date('20'), date('21'), date('22'), date('23'), date('24'), selectedDate('25')],
            [date('26'), date('27'), date('28'), date('29'), date('30'), date('31'), date(null)],
            [date(null), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });

        it('opens the right calendar with the next month', function() {
          expect(rightCalendar.month).toBe('November');
          expect(rightCalendar.year).toBe('2014');

          var rightCalendarCells = rightCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(rightCalendarCells, [ // november 2014
            [date(null), date(null), date(null), date(null), date(null), date(null), date('1')],
            [date('2'), date('3'), date('4'), date('5'), date('6'), date('7'), date('8')],
            [date('9'), date('10'), date('11'), date('12'), date('13'), date('14'), date('15')],
            [date('16'), date('17'), date('18'), date('19'), date('20'), date('21'), date('22')],
            [date('23'), date('24'), date('25'), date('26'), date('27'), date('28'), date('29')],
            [date('30'), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });

        it('initializes the to time & from time input fields', function() {
          expect(timeFromInput.time.format('hh:mm:ss A')).toBe('01:00:00 PM');
          expect(timeToInput.time.format('hh:mm:ss A')).toBe('03:00:00 PM');
        });

        it('displays no presets since none were passed in', function() {
          expect(presetsSection).toBe(null);
        });
      });

      describe('when select date in calendar', function() {

        var leftCalendarCells;

        px.beforeEachAsync(function() {
          leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          var oct8 = leftCalendarCells[10];
          oct8._selectDate();
        });

        it('does not change the range field yet', function() {
          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
        });

        it('when a 2nd date is selected (range), it does change the dates fields', function() {
          var oct12 = leftCalendarCells[14];
          oct12._selectDate();

          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/08/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/12/2014');
        });

        it('when a 2nd date is selected (range), it leaves the times the same', function() {
          var oct12 = leftCalendarCells[14];
          oct12._selectDate();

          expect(timeFromField.moment.format('hh:mm:ss A')).toBe('01:00:00 PM');
          expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
        });

        it('when backwards date is selected, it changes the range field correctly', function() {
          var oct5 = leftCalendarCells[7];
          oct5._selectDate();

          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/05/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/08/2014');
        });

      });

      describe('when jump back', function() {

        px.beforeEachAsync(function() {
          dateRangePicker._jumpBack();
        });

        it('does not change the range field yet', function() {
          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
        });

        it('opens the left calendar back one month', function() {
          expect(leftCalendar.month).toBe('September');
          expect(leftCalendar.year).toBe('2014');

          var leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(leftCalendarCells, [ // september 2014
            [date(null), date('1'), date('2'), date('3'), date('4'), date('5'), date('6')],
            [date('7'), date('8'), date('9'), date('10'), date('11'), date('12'), date('13')],
            [date('14'), date('15'), date('16'), date('17'), date('18'), date('19'), date('20')],
            [date('21'), date('22'), date('23'), date('24'), date('25'), date('26'), date('27')],
            [date('28'), date('29'), date('30'), date(null), date(null), date(null), date(null)],
            [date(null), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });

        it('opens the right calendar back one month too', function() {
          expect(rightCalendar.month).toBe('October');
          expect(rightCalendar.year).toBe('2014');

          var rightCalendarCells = rightCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(rightCalendarCells, [ // october 2014
            [date(null), date(null), date(null), date('1'), date('2'), date('3'), date('4')],
            [date('5'), date('6'), date('7'), date('8'), date('9'), date('10'), selectedDate('11')],
            [date('12'), date('13'), date('14'), date('15'), date('16'), date('17'), date('18')],
            [date('19'), date('20'), date('21'), date('22'), date('23'), date('24'), selectedDate('25')],
            [date('26'), date('27'), date('28'), date('29'), date('30'), date('31'), date(null)],
            [date(null), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });

      });

      describe('when jump forward', function() {

        px.beforeEachAsync(function() {
          dateRangePicker._jumpForward();
          dateRangePicker._jumpForward();
          dateRangePicker._jumpForward();
          dateRangePicker._jumpForward();
        });

        it('does not change the range field yet', function() {
          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
        });

        it('opens the left calendar to February 2015', function() {
          expect(leftCalendar.month).toBe('February');
          expect(leftCalendar.year).toBe('2015');
        });

        it('opens the right calendar to March 2015', function() {
          expect(rightCalendar.month).toBe('March');
          expect(rightCalendar.year).toBe('2015');
        });

      });

      describe('when select date, then jump back and select second date', function() {

        px.beforeEachAsync(function() {
          var leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          var oct3 = leftCalendarCells[5];
          oct3._selectDate();

          dateRangePicker._jumpBack();
          dateRangePicker._jumpBack();
          dateRangePicker._jumpBack();
        });

        px.beforeEachAsync(function() {
          var leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          var july9 = leftCalendarCells[10];
          july9._selectDate();
        });

        it('sets the range', function() {
          expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('07/09/2014');
          expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/03/2014');
        });

      });

      describe('when change time in modal', function() {

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

        function changeTime(inputToChange) {
          inputToChange._changeHours(getFakeEvent(0));
          inputToChange._changeHours(getFakeEvent(1));
          inputToChange._changeHours(getFakeEvent(2));
          inputToChange._changeMinutes(getFakeEvent(5));
          inputToChange._changeMinutes(getFakeEvent(7));
          inputToChange._changeSeconds(getFakeEvent(3));
          inputToChange._changeSeconds(getFakeEvent(9));
          inputToChange._selectPM();
        }

        it('to changes to field', function() {
          changeTime(timeToInput);
          expect(timeFromField.moment.format('hh:mm:ss A')).toBe('01:00:00 PM');
          expect(timeToField.moment.format('hh:mm:ss A')).toBe('12:57:39 PM');
        });

        it('from changes from field', function() {
          changeTime(timeFromInput);
          expect(timeFromField.moment.format('hh:mm:ss A')).toBe('12:57:39 PM');
          expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
        });

      });

      describe('when select 1 date, then change time', function() {

        it('DOESNT BREAK', function() {
          expect(true).toBe(false);
        });

      });

      describe('when typing in range fields', function() {

        describe('date field', function() {

          it('updates date if type in date', function() {
            dateFromField.dateTimeWorkingCopy = '05/04/2013';
            dateFromField._validateInput();

            expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('05/04/2013');
            expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
          });

          it('does not affect time', function() {
            dateFromField.dateTimeWorkingCopy = '05/04/2013';
            dateFromField._validateInput();

            expect(timeFromField.moment.format('hh:mm:ss A')).toBe('01:00:00 PM');
            expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
          });

          it('does not make a change if validation fails', function() {
            dateFromField.dateTimeWorkingCopy = '05/04/x2013';
            dateFromField._validateInput();

            expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
            expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
          });

        });

        describe('time field', function() {

          it('updates time if type in time', function() {
            timeFromField.dateTimeWorkingCopy = '02:22:35 PM';
            timeFromField._validateInput();

            expect(timeFromField.moment.format('hh:mm:ss A')).toBe('02:22:35 PM');
            expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
          });

          it('does not affect date', function() {
            timeFromField.dateTimeWorkingCopy = '02:22:35 PM';
            timeFromField._validateInput();

            expect(dateFromField.moment.format('MM/DD/YYYY')).toBe('10/11/2014');
            expect(dateToField.moment.format('MM/DD/YYYY')).toBe('10/25/2014');
          });

          it('does not make a change if validation fails', function() {
            timeFromField.dateTimeWorkingCopy = '02:22:3ab5 PM';
            timeFromField._validateInput();

            expect(timeFromField.moment.format('hh:mm:ss A')).toBe('01:00:00 PM');
            expect(timeToField.moment.format('hh:mm:ss A')).toBe('03:00:00 PM');
          });

        });

      });

      describe('when a date/time is picked', function() {

        var leftCalendarCells;

        px.beforeEachAsync(function() {
          leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          var oct8 = leftCalendarCells[10];
          oct8._selectDate();
          var oct12 = leftCalendarCells[14];
          oct12._selectDate();

          timeFromField.dateTimeWorkingCopy = '02:22:35 PM';
          timeFromField._validateInput();
        });

        it('does not send changes to outside world immediately', function() {
          expect(rangePicker.from).toBe('10/11/2014 01:00:00 PM');
          expect(rangePicker.to).toBe('10/25/2014 03:00:00 PM');
        });

        it('updates outside world when submit is clicked', function() {
          rangeFields._submit();
          expect(rangePicker.from).toBe('10/08/2014 02:22:35 PM');
          expect(rangePicker.to).toBe('10/12/2014 03:00:00 PM');
        });

      });
    });
  });

  describe('when dates passed in are a year apart', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-rangepicker from="06/16/2014 01:00:00 PM" to="06/16/2015 01:00:00 PM"></px-rangepicker>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        rangePicker = document.querySelector('px-rangepicker');

        var rangepickerModal = document.querySelector('#rangePickerModal');
        var dateRangePicker = rangepickerModal.querySelector('#dateRangePicker');
        leftCalendar = dateRangePicker.querySelector('#leftCalendar');
        rightCalendar = dateRangePicker.querySelector('#rightCalendar');
      });

      describe('when the modal is opened', function() {

        beforeEach(function() {
          dateFromField._handleClick();
        });

        it('opens the left calendar with the from date', function() {
          var leftCalendarCells = leftCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(leftCalendarCells, [
            [date('1'), date('2'), date('3'), date('4'), date('5'), date('6'), date('7')],
            [date('8'), date('9'), date('10'), date('11'), date('12'), date('13'), date('14')],
            [date('15'), selectedDate('16'), date('17'), date('18'), date('19'), date('20'), date('21')],
            [date('22'), date('23'), date('24'), date('25'), date('26'), date('27'), date('28')],
            [date('29'), date('30'), date(null), date(null), date(null), date(null), date(null)],
            [date(null), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });

        it('opens the right calendar with the next month (cant see to date)', function() {
          var rightCalendarCells = rightCalendar.querySelectorAll('px-calendar-cell');
          calendarMatches(rightCalendarCells, [
            [date(null), date(null), date('1'), date('2'), date('3'), date('4'), date('5')],
            [date('6'), date('7'), date('8'), date('9'), date('10'), date('11'), date('12')],
            [date('13'), date('14'), date('15'), date('16'), date('17'), date('18'), date('19')],
            [date('20'), date('21'), date('22'), date('23'), date('24'), date('25'), date('26')],
            [date('27'), date('28'), date('29'), date('30'), date('31'), date(null), date(null)],
            [date(null), date(null), date(null), date(null), date(null), date(null), date(null)]
          ]);
        });
      });
    });
  });

  describe('when pass in presets', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-rangepicker from="10/11/2014 01:00:00 PM" to="10/25/2014 03:00:00 PM"></px-rangepicker>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        rangePicker = document.querySelector('px-rangepicker');
        rangePicker.presetRanges = [
          {
            "displayText": "Last 5 Minutes",
            "startDateTime": "08/21/2015 12:57:33 PM",
            "endDateTime": "08/21/2015 1:02:33 PM"
          },
          {
            "displayText": "Last 12 Hours",
            "startDateTime": "08/21/2015 1:02:33 AM",
            "endDateTime": "08/21/2015 1:02:33 PM"
          },
          {
            "displayText": "Yesterday",
            "startDateTime": "08/20/2015 12:00:00 AM",
            "endDateTime": "08/20/2015 12:00:00 PM"
          },
          {
            "displayText": "Last Month",
            "startDateTime": "07/21/2015 12:00:00 AM",
            "endDateTime": "08/21/2015 12:00:00 AM"
          },
          {
            "displayText": "Last Year",
            "startDateTime": "08/21/2014 12:00:00 AM",
            "endDateTime": "08/21/2015 12:00:00 AM"
          }
        ];
      });

      it('displays the passed in presets', function() {
        presetsSection = rangepickerModal.querySelector('px-rangepicker-presets');
        presets = presetsSection.querySelectorAll('button');
        expect(presets.length).toBe(5);
      });
    });
  });
});
