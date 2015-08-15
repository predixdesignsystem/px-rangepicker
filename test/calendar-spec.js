'use strict';
describe('The calendar', function() {

  var calendar;

  function date(date) {
    return {value: date, styles: 'btn btn--bare', isDisabled: false};
  }

  function selectedDate(date) {
    return {value: date, styles: 'btn btn--bare is-selected', isDisabled: false};
  }

  describe('February 2015', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-calendar display-month-year="02/2015"></px-calendar>');
    });

    describe('28 days, starting on Sunday', function() {

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
      });

      it('the calendar has the correct dates', function() {
        expect(calendar.calendar).toEqual([
          [date(1), date(2), date(3), date(4), date(5), date(6), date(7)],
          [date(8), date(9), date(10), date(11), date(12), date(13), date(14)],
          [date(15), date(16), date(17), date(18), date(19), date(20), date(21)],
          [date(22), date(23), date(24), date(25), date(26), date(27), date(28)]
        ]);
      });

    });

  });

  describe('March 2013', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-calendar display-month-year="03/2013"></px-calendar>');
    });

    describe('31 days, starting on Friday', function() {

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
      });

      it('the calendar has the correct dates', function() {
        expect(calendar.calendar).toEqual([
          [date(''), date(''), date(''), date(''), date(''), date(1), date(2)],
          [date(3), date(4), date(5), date(6), date(7), date(8), date(9)],
          [date(10), date(11), date(12), date(13), date(14), date(15), date(16)],
          [date(17), date(18), date(19), date(20), date(21), date(22), date(23)],
          [date(24), date(25), date(26), date(27), date(28), date(29), date(30)],
          [date(31), date(''), date(''), date(''), date(''), date(''), date('')]
        ]);
      });

    });

  });

  describe('Last clicked date is NOT in this month', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-calendar display-month-year="03/2013" last-clicked-date="04/10/2013"></px-calendar>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
      });

      it('there is no selected date', function() {
        expect(calendar.calendar).toEqual([
          [date(''), date(''), date(''), date(''), date(''), date(1), date(2)],
          [date(3), date(4), date(5), date(6), date(7), date(8), date(9)],
          [date(10), date(11), date(12), date(13), date(14), date(15), date(16)],
          [date(17), date(18), date(19), date(20), date(21), date(22), date(23)],
          [date(24), date(25), date(26), date(27), date(28), date(29), date(30)],
          [date(31), date(''), date(''), date(''), date(''), date(''), date('')]
        ]);
      });

    });

  });

  describe('Last clicked date IS in this month', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-calendar display-month-year="03/2013" last-clicked-date="03/10/2013"></px-calendar>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
      });

      it('March 10 is selected', function() {
        expect(calendar.calendar).toEqual([
          [date(''), date(''), date(''), date(''), date(''), date(1), date(2)],
          [date(3), date(4), date(5), date(6), date(7), date(8), date(9)],
          [selectedDate(10), date(11), date(12), date(13), date(14), date(15), date(16)],
          [date(17), date(18), date(19), date(20), date(21), date(22), date(23)],
          [date(24), date(25), date(26), date(27), date(28), date(29), date(30)],
          [date(31), date(''), date(''), date(''), date(''), date(''), date('')]
        ]);
      });

    });

  });

  describe('When date is clicked', function() {

    px.beforeEachWithFixture(function() {
      $fixture.append('<px-calendar display-month-year="03/2013" last-clicked-date="04/10/2013"></px-calendar>');
    });

    describe('', function() {

      px.beforeEachAsync(function() {
        calendar = document.querySelector('px-calendar');
      });

      it('that date is now selected', function() {

        calendar._selectDate({target:{value:28}}); // click on the 28th

        expect(calendar.calendar).toEqual([
          [date(''), date(''), date(''), date(''), date(''), date(1), date(2)],
          [date(3), date(4), date(5), date(6), date(7), date(8), date(9)],
          [date(10), date(11), date(12), date(13), date(14), date(15), date(16)],
          [date(17), date(18), date(19), date(20), date(21), date(22), date(23)],
          [date(24), date(25), date(26), date(27), selectedDate(28), date(29), date(30)],
          [date(31), date(''), date(''), date(''), date(''), date(''), date('')]
        ]);
      });

      it('the lastClickedDate is update', function() {

        calendar._selectDate({target:{value:28}}); // click on the 28th

        expect(calendar.lastClickedDate).toBe('03/28/2013');

      });

    });

  });

});

