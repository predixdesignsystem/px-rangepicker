'use strict';
describe('The calendar', function() {

  var calendar;

  function convertToPlainCalendar(calendar) {
    var plainCalendar = [];
    calendar.forEach(function(week) {
      var plainWeek = [];
      week.forEach(function(day) {
        if (day !== null) {
          plainWeek.push(day.format('D'));
        }
        else {
          plainWeek.push(day);
        }
      });
      plainCalendar.push(plainWeek);
    });
    return plainCalendar;
  }

  describe('Laying out calendar', function() {

    describe('February 2015', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      describe('28 days, starting on Sunday', function() {

        px.beforeEachAsync(function() {
          calendar = document.querySelector('px-calendar');
          var feb2015 = moment("02/2015", 'MM/YYYY');
          calendar.displayMonthYear = feb2015;
        });

        it('the calendar has the correct Month/Year', function() {
          expect(calendar.month).toBe('February');
          expect(calendar.year).toBe('2015');
        });

        it('the calendar has the correct dates', function() {
          var plainCalendar = convertToPlainCalendar(calendar.calendar);
          expect(plainCalendar).toEqual([
            ['1', '2', '3', '4', '5', '6', '7'],
            ['8', '9', '10', '11', '12', '13', '14'],
            ['15', '16', '17', '18', '19', '20', '21'],
            ['22', '23', '24', '25', '26', '27', '28'],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
          ]);
        });

      });

    });

    describe('March 2013', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      describe('31 days, starting on Friday', function() {

        px.beforeEachAsync(function() {
          calendar = document.querySelector('px-calendar');
          var mar13 = moment("03/2013", 'MM/YYYY');
          calendar.displayMonthYear = mar13;
          calendar.firstRangeDate = moment("03/15/2013", 'MM/DD/YYYY');
          calendar.secondRangeDate = moment("03/26/2013", 'MM/DD/YYYY');
        });

        it('the calendar has the correct Month/Year', function() {
          expect(calendar.month).toBe('March');
          expect(calendar.year).toBe('2013');
        });

        it('the calendar has the correct dates', function() {
          var plainCalendar = convertToPlainCalendar(calendar.calendar);
          expect(plainCalendar).toEqual([
            [null, null, null, null, null, '1', '2'],
            ['3', '4', '5', '6', '7', '8', '9'],
            ['10', '11', '12', '13', '14', '15', '16'],
            ['17', '18', '19', '20', '21', '22', '23'],
            ['24', '25', '26', '27', '28', '29', '30'],
            ['31', null, null, null, null, null, null]
          ]);
        });
      });
    });

  });

  describe('Styling of dates', function() {

    describe('Start and end in month, first < second', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
        var mar13 = moment("03/2013", 'MM/YYYY');
        calendar.displayMonthYear = mar13;
        calendar.firstRangeDate = moment("03/15/2013", 'MM/DD/YYYY');
        calendar.secondRangeDate = moment("03/26/2013", 'MM/DD/YYYY');
      });

      var calendarCells;

      beforeEach(function() {
        calendarCells = calendar.querySelectorAll('px-calendar-cell');
      });

      it('if start of range: is-selected & is-start', function() {
        var mar152013 = calendarCells[19];
        expect(mar152013.querySelector('div').classList.contains('is-selected')).toBe(true);
        expect(mar152013.querySelector('div').classList.contains('is-start')).toBe(true);
      });

      it('if end of range: is-selected & is-end', function() {
        var mar262013 = calendarCells[30];
        expect(mar262013.querySelector('div').classList.contains('is-selected')).toBe(true);
        expect(mar262013.querySelector('div').classList.contains('is-end')).toBe(true);
      });

      it('if between: is-between', function() {
        var mar182013 = calendarCells[22];
        expect(mar182013.querySelector('div').classList.contains('is-between')).toBe(true);
      });

      it('if end of week: is-end', function() {
        var mar232013 = calendarCells[27];
        expect(mar232013.querySelector('div').classList.contains('is-end')).toBe(true);
      });

      it('if start of week: is-start', function() {
        var mar172013 = calendarCells[21];
        expect(mar172013.querySelector('div').classList.contains('is-start')).toBe(true);
      });

      it('if start of month: is-start', function() {
        var mar12013 = calendarCells[5];
        expect(mar12013.querySelector('div').classList.contains('is-start')).toBe(true);
      });

      it('if end of month: is-end', function() {
        var mar312013 = calendarCells[35];
        expect(mar312013.querySelector('div').classList.contains('is-end')).toBe(true);
      });

      it('when date is clicked: is-selected-only', function() {
        var mar312013 = calendarCells[35];
        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
        mar312013._selectDate();
        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(true);
      });

      it('when 2nd date is clicked: is-selected-only removed', function() {
        var mar312013 = calendarCells[35];
        var mar52013 = calendarCells[9];
        mar312013._selectDate();
        mar52013._selectDate();
        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
      });
    });


    describe('Start and end in month, first > second', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
        var mar13 = moment("03/2013", 'MM/YYYY');
        calendar.displayMonthYear = mar13;
        calendar.firstRangeDate = moment("03/15/2013", 'MM/DD/YYYY');
        calendar.secondRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
      });

      var calendarCells;

      beforeEach(function() {
        calendarCells = calendar.querySelectorAll('px-calendar-cell');
      });

      it('if start of range: is-selected & is-start', function() {
        var mar122013 = calendarCells[16];
        expect(mar122013.querySelector('div').classList.contains('is-selected')).toBe(true);
        expect(mar122013.querySelector('div').classList.contains('is-start')).toBe(true);
      });

      it('if end of range: is-selected & is-end', function() {
        var mar152013 = calendarCells[19];
        expect(mar152013.querySelector('div').classList.contains('is-selected')).toBe(true);
        expect(mar152013.querySelector('div').classList.contains('is-end')).toBe(true);
      });
    });

    describe('Start and end NOT in month', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
        var mar13 = moment("03/2013", 'MM/YYYY');
        calendar.displayMonthYear = mar13;
        calendar.firstRangeDate = moment("04/12/2013", 'MM/DD/YYYY');
        calendar.secondRangeDate = moment("02/01/2013", 'MM/DD/YYYY');
      });

      var calendarCells;

      beforeEach(function() {
        calendarCells = calendar.querySelectorAll('px-calendar-cell');
      });

      it('month is is-between', function() {
        var mar22013 = calendarCells[6];
        var mar222013 = calendarCells[26];
        expect(mar22013.querySelector('div').classList.contains('is-between')).toBe(true);
        expect(mar222013.querySelector('div').classList.contains('is-between')).toBe(true);
      });
    });

    describe('Start and End are SAME', function() {

      px.beforeEachWithFixture(function() {
        $fixture.append('<px-calendar></px-calendar>');
      });

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
        var mar13 = moment("03/2013", 'MM/YYYY');
        calendar.displayMonthYear = mar13;
        calendar.firstRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
        calendar.secondRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
      });

      var calendarCells;

      beforeEach(function() {
        calendarCells = calendar.querySelectorAll('px-calendar-cell');
      });

      it('is selected, end, start', function() {
        var mar122013 = calendarCells[16];
        expect(mar122013.querySelector('div').classList.contains('is-start')).toBe(true);
        expect(mar122013.querySelector('div').classList.contains('is-end')).toBe(true);
        expect(mar122013.querySelector('div').classList.contains('is-selected')).toBe(true);
      });
    });

  });

});
