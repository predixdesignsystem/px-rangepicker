
//  describe('Styling of dates', function() {
//
//    describe('Start and end in month, first < second', function() {
//
//      px.beforeEachWithFixture(function() {
//        $fixture.append('<px-calendar></px-calendar>');
//      });
//
//      px.beforeEachAsync(function() {
//        calendar = document.querySelector('px-calendar');
//        var mar13 = moment("03/2013", 'MM/YYYY');
//        calendar.displayMonthYear = mar13;
//        calendar.firstRangeDate = moment("03/15/2013", 'MM/DD/YYYY');
//        calendar.secondRangeDate = moment("03/26/2013", 'MM/DD/YYYY');
//      });
//
//      var calendarCells;
//
//      beforeEach(function() {
//        calendarCells = calendar.querySelectorAll('px-calendar-cell');
//      });
//
//      it('if start of range: is-selected & is-start', function() {
//        var mar152013 = calendarCells[19];
//        expect(mar152013.querySelector('div').classList.contains('is-selected')).toBe(true);
//        expect(mar152013.querySelector('div').classList.contains('is-start')).toBe(true);
//      });
//
//      it('if end of range: is-selected & is-end', function() {
//        var mar262013 = calendarCells[30];
//        expect(mar262013.querySelector('div').classList.contains('is-selected')).toBe(true);
//        expect(mar262013.querySelector('div').classList.contains('is-end')).toBe(true);
//      });
//
//      it('if between: is-between', function() {
//        var mar182013 = calendarCells[22];
//        expect(mar182013.querySelector('div').classList.contains('is-between')).toBe(true);
//      });
//
//      it('if end of week: is-end', function() {
//        var mar232013 = calendarCells[27];
//        expect(mar232013.querySelector('div').classList.contains('is-end')).toBe(true);
//      });
//
//      it('if start of week: is-start', function() {
//        var mar172013 = calendarCells[21];
//        expect(mar172013.querySelector('div').classList.contains('is-start')).toBe(true);
//      });
//
//      it('if start of month: is-start', function() {
//        var mar12013 = calendarCells[5];
//        expect(mar12013.querySelector('div').classList.contains('is-start')).toBe(true);
//      });
//
//      it('if end of month: is-end', function() {
//        var mar312013 = calendarCells[35];
//        expect(mar312013.querySelector('div').classList.contains('is-end')).toBe(true);
//      });
//
//      it('when date is clicked: is-selected-only', function() {
//        var mar312013 = calendarCells[35];
//        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
//        mar312013._selectDate();
//        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(true);
//      });
//
//      it('when 2nd date is clicked: is-selected-only removed', function() {
//        var mar312013 = calendarCells[35];
//        var mar52013 = calendarCells[9];
//        mar312013._selectDate();
//        mar52013._selectDate();
//        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
//        expect(mar312013.querySelector('div').classList.contains('is-selected-only')).toBe(false);
//      });
//    });
//
//
//    describe('Start and end in month, first > second', function() {
//
//      px.beforeEachWithFixture(function() {
//        $fixture.append('<px-calendar></px-calendar>');
//      });
//
//      px.beforeEachAsync(function() {
//        calendar = document.querySelector('px-calendar');
//        var mar13 = moment("03/2013", 'MM/YYYY');
//        calendar.displayMonthYear = mar13;
//        calendar.firstRangeDate = moment("03/15/2013", 'MM/DD/YYYY');
//        calendar.secondRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
//      });
//
//      var calendarCells;
//
//      beforeEach(function() {
//        calendarCells = calendar.querySelectorAll('px-calendar-cell');
//      });
//
//      it('if start of range: is-selected & is-start', function() {
//        var mar122013 = calendarCells[16];
//        expect(mar122013.querySelector('div').classList.contains('is-selected')).toBe(true);
//        expect(mar122013.querySelector('div').classList.contains('is-start')).toBe(true);
//      });
//
//      it('if end of range: is-selected & is-end', function() {
//        var mar152013 = calendarCells[19];
//        expect(mar152013.querySelector('div').classList.contains('is-selected')).toBe(true);
//        expect(mar152013.querySelector('div').classList.contains('is-end')).toBe(true);
//      });
//    });
//
//    describe('Start and end NOT in month', function() {
//
//      px.beforeEachWithFixture(function() {
//        $fixture.append('<px-calendar></px-calendar>');
//      });
//
//      px.beforeEachAsync(function() {
//        calendar = document.querySelector('px-calendar');
//        var mar13 = moment("03/2013", 'MM/YYYY');
//        calendar.displayMonthYear = mar13;
//        calendar.firstRangeDate = moment("04/12/2013", 'MM/DD/YYYY');
//        calendar.secondRangeDate = moment("02/01/2013", 'MM/DD/YYYY');
//      });
//
//      var calendarCells;
//
//      beforeEach(function() {
//        calendarCells = calendar.querySelectorAll('px-calendar-cell');
//      });
//
//      it('month is is-between', function() {
//        var mar22013 = calendarCells[6];
//        var mar222013 = calendarCells[26];
//        expect(mar22013.querySelector('div').classList.contains('is-between')).toBe(true);
//        expect(mar222013.querySelector('div').classList.contains('is-between')).toBe(true);
//      });
//    });
//
//    describe('Start and End are SAME', function() {
//
//      px.beforeEachWithFixture(function() {
//        $fixture.append('<px-calendar></px-calendar>');
//      });
//
//      px.beforeEachAsync(function() {
//        calendar = document.querySelector('px-calendar');
//        var mar13 = moment("03/2013", 'MM/YYYY');
//        calendar.displayMonthYear = mar13;
//        calendar.firstRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
//        calendar.secondRangeDate = moment("03/12/2013", 'MM/DD/YYYY');
//      });
//
//      var calendarCells;
//
//      beforeEach(function() {
//        calendarCells = calendar.querySelectorAll('px-calendar-cell');
//      });
//
//      it('is selected, end, start', function() {
//        var mar122013 = calendarCells[16];
//        expect(mar122013.querySelector('div').classList.contains('is-start')).toBe(true);
//        expect(mar122013.querySelector('div').classList.contains('is-end')).toBe(true);
//        expect(mar122013.querySelector('div').classList.contains('is-selected')).toBe(true);
//      });
//    });
//
//  });
//
//});
