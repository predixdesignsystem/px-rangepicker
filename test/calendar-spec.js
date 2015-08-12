'use strict';
describe('The calendar', function() {

  var calendar;

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
          [1,2,3,4,5,6,7],
          [8,9,10,11,12,13,14],
          [15,16,17,18,19,20,21],
          [22,23,24,25,26,27,28]
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
          ['','','','','',1,2],
          [3,4,5,6,7,8,9],
          [10,11,12,13,14,15,16],
          [17,18,19,20,21,22,23],
          [24,25,26,27,28,29,30],
          [31]
        ]);
      });

    });

  });

});
