'use strict';
describe('Dates', function() {

  var rangePicker, dateRangeField, dateFromField, dateToField, leftCalendar, rightCalendar;

  function date(date) {
    return {value: date, styles: 'btn btn--bare', isDisabled: false};
  }

  function selectedDate(date) {
    return {value: date, styles: 'btn btn--bare is-selected', isDisabled: false};
  }

  describe('when the to month = the from month', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-rangepicker from-date="10/11/2014" to-date="10/25/2014"></px-rangepicker>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        rangePicker = document.querySelector('px-rangepicker');
        dateRangeField = document.querySelector('#dateRange');
        dateFromField = dateRangeField.querySelector('#from');
        dateToField = dateRangeField.querySelector('#to');

        leftCalendar = rangePicker.querySelector('#leftCalendar');
        rightCalendar = rangePicker.querySelector('#rightCalendar');
      });

      describe('when from field is clicked (10/11/2014)', function() {

        beforeEach(function() {
          dateRangeField._selectFrom();
        });

        it('opens the right calendar with the from-date month (10/14) & selected date (11th)', function() {
          expect(rightCalendar.calendar).toEqual([
            [date(''), date(''), date(''), date(1), date(2), date(3), date(4)],
            [date(5), date(6), date(7), date(8), date(9), date(10), selectedDate(11)],
            [date(12), date(13), date(14), date(15), date(16), date(17), date(18)],
            [date(19), date(20), date(21), date(22), date(23), date(24), date(25)],
            [date(26), date(27), date(28), date(29), date(30), date(31), date('')]
          ]);
        });

        it('opens the left calendar with the previous month from from-date (09/14) and NO selected date', function() {
          expect(leftCalendar.calendar).toEqual([
            [date(''), date(1), date(2), date(3), date(4), date(5), date(6)],
            [date(7), date(8), date(9), date(10), date(11), date(12), date(13)],
            [date(14), date(15), date(16), date(17), date(18), date(19), date(20)],
            [date(21), date(22), date(23), date(24), date(25), date(26), date(27)],
            [date(28), date(29), date(30), date(''), date(''), date(''), date('')]
          ]);
        });

      });

      describe('when to field is clicked', function() {

        beforeEach(function() {
          dateRangeField._selectTo();
        });

        it('opens the right calendar with the to-date month (10/14) & selected date (25th)', function() {
          expect(rightCalendar.calendar).toEqual([
            [date(''), date(''), date(''), date(1), date(2), date(3), date(4)],
            [date(5), date(6), date(7), date(8), date(9), date(10), date(11)],
            [date(12), date(13), date(14), date(15), date(16), date(17), date(18)],
            [date(19), date(20), date(21), date(22), date(23), date(24), selectedDate(25)],
            [date(26), date(27), date(28), date(29), date(30), date(31), date('')]
          ]);
        });

        it('opens the left calendar with the previous month from to-date (09/14) and NO selected date', function() {
          expect(leftCalendar.calendar).toEqual([
            [date(''), date(1), date(2), date(3), date(4), date(5), date(6)],
            [date(7), date(8), date(9), date(10), date(11), date(12), date(13)],
            [date(14), date(15), date(16), date(17), date(18), date(19), date(20)],
            [date(21), date(22), date(23), date(24), date(25), date(26), date(27)],
            [date(28), date(29), date(30), date(''), date(''), date(''), date('')]
          ]);
        });

      });

    });

  });

  describe('for a given from and to month', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-rangepicker from-date="10/25/2014" to-date="12/11/2014"></px-rangepicker>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        rangePicker = document.querySelector('px-rangepicker');
        dateRangeField = document.querySelector('#dateRange');
        dateFromField = dateRangeField.querySelector('#from');
        dateToField = dateRangeField.querySelector('#to');

        leftCalendar = rangePicker.querySelector('#leftCalendar');
        rightCalendar = rangePicker.querySelector('#rightCalendar');
      });

      describe('when from field is clicked', function() {

        beforeEach(function() {
          dateRangeField._selectFrom();
        });

        it('opens the left calendar with the from-date month (10/14) & selected date (25th)', function() {
          expect(leftCalendar.calendar).toEqual([
            [date(''), date(''), date(''), date(1), date(2), date(3), date(4)],
            [date(5), date(6), date(7), date(8), date(9), date(10), date(11)],
            [date(12), date(13), date(14), date(15), date(16), date(17), date(18)],
            [date(19), date(20), date(21), date(22), date(23), date(24), selectedDate(25)],
            [date(26), date(27), date(28), date(29), date(30), date(31), date('')]
          ]);
        });

        it('opens the right calendar with the next month from from-date (11/14) and NO selected date', function() {
          expect(rightCalendar.calendar).toEqual([
            [date(''), date(''), date(''), date(''), date(''), date(''), date(1)],
            [date(2), date(3), date(4), date(5), date(6), date(7), date(8)],
            [date(9), date(10), date(11), date(12), date(13), date(14), date(15)],
            [date(16), date(17), date(18), date(19), date(20), date(21), date(22)],
            [date(23), date(24), date(25), date(26), date(27), date(28), date(29)],
            [date(30), date(''), date(''), date(''), date(''), date(''), date('')]
          ]);
        });

      });

      describe('when to field is clicked', function() {

        beforeEach(function() {
          dateRangeField._selectTo();
        });


        it('opens the right calendar with the to-date month (12/14) & selected date (11th)', function() {
          expect(rightCalendar.calendar).toEqual([
            [date(''), date(1), date(2), date(3), date(4), date(5), date(6)],
            [date(7), date(8), date(9), date(10), selectedDate(11), date(12), date(13)],
            [date(14), date(15), date(16), date(17), date(18), date(19), date(20)],
            [date(21), date(22), date(23), date(24), date(25), date(26), date(27)],
            [date(28), date(29), date(30), date(31), date(''), date(''), date('')]
          ]);
        });

        it('opens the left calendar with the previous month (11/14) from to-date and NO selected date', function() {
          expect(leftCalendar.calendar).toEqual([
            [date(''), date(''), date(''), date(''), date(''), date(''), date(1)],
            [date(2), date(3), date(4), date(5), date(6), date(7), date(8)],
            [date(9), date(10), date(11), date(12), date(13), date(14), date(15)],
            [date(16), date(17), date(18), date(19), date(20), date(21), date(22)],
            [date(23), date(24), date(25), date(26), date(27), date(28), date(29)],
            [date(30), date(''), date(''), date(''), date(''), date(''), date('')]
          ]);
        });

      });

      // when apply vs. cancel vs. nothing
      //
      //it('the lastClickedDate is update', function() {
      //
      //  calendar._selectDate({target:{value:28}}); // click on the 28th
      //
      //  expect(calendar.lastClickedDate).toBe('03/28/2013');
      //
      //});

      // when > or <

    });

  });

});
