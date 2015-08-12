'use strict';
describe('Dates', function() {

  var rangePicker;

  px.beforeEachWithFixture(function() {
    $fixture.append('<px-rangepicker></px-rangepicker>');
  });

  describe('', function() {

    px.beforeEachAsync(function() {
      rangePicker = document.querySelector('px-rangepicker');
    });

    it('from date is initialized from the current date', function() {
      expect(rangePicker.fromDate).toBe(moment().format('MM/DD/YYYY'));
    });

    it('to date is initialized to 3 years from the current date', function() {
      expect(rangePicker.toDate).toBe(moment().add(3, 'years').format('MM/DD/YYYY'));
    });

  });

});
