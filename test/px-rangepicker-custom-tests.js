// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here
  var picker = document.getElementById('picker'),
      panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
      field = Polymer.dom(picker.root).querySelector('px-datetime-range-field'),
      dropdown = Polymer.dom(picker.root).querySelector('#dropdown'),
      heading = document.querySelector('h3');
  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('interaction', function() {

    test('panel hidden at startup', function() {
      assert.isFalse(dropdown.opened);
    });

    test('open shows the panel', function() {
      picker._open();
      assert.isTrue(dropdown.opened);
    });

    test('close hides the panel', function() {
      picker._close();
      assert.isFalse(dropdown.opened);
    });

    test('click on heading closes panel', function() {
      picker._open();
      heading.click();
      assert.isFalse(dropdown.opened);
    });
  });

  suite('submit with buttons', function() {

    var submitEventCount = 0,
        submitListener;
    suiteSetup(function() {
      picker.showButtons = true;

      submitListener = function(evt) {
        submitEventCount++;
      };

      picker.addEventListener('px-datetime-range-submitted', submitListener);
    });

    suiteTeardown(function() {
      picker.removeEventListener('px-datetime-range-submitted', submitListener);
    });

    test('clicking heading should not apply new value', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      picker._open();

      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      heading.click();

      //shouldn't have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.equal(prevRange.to, picker.range.to);
      assert.equal(prevCount, submitEventCount);
    });

    test('clicking apply should apply new value', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      picker._open();

      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      //simulate apply
      picker.dispatchEvent(new CustomEvent('px-datetime-button-clicked', { 'detail': {'action': true}}))

      assert.isFalse(picker._opened);


      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.clone().add(1, 'day').toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.notEqual(prevRange.to, picker.range.to);
      assert.equal(prevCount + 1, submitEventCount);
    });

    test('clicking cancel should not apply new value', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      picker._open();

      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      //simulate apply
      picker.dispatchEvent(new CustomEvent('px-datetime-button-clicked', { 'detail': {'action': false}}))

      assert.isFalse(picker._opened);

      //shouldn't have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.equal(prevRange.to, picker.range.to);
      assert.equal(prevCount, submitEventCount);
    });

    test('when not opened changing values should apply directly', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      //change a date
      field.toMoment = field.toMoment.clone().add(1, 'day');

      //should have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.clone().add(1, 'day').toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.notEqual(prevRange.to, picker.range.to);
      assert.equal(prevCount + 1, submitEventCount);
    });
  })

  suite('submit without buttons', function() {

    var submitEventCount = 0,
        submitListener;
    suiteSetup(function() {

      picker.showButtons = false;
      submitListener = function(evt) {
        submitEventCount++;
      };

      picker.addEventListener('px-datetime-range-submitted', submitListener);
    });

    suiteTeardown(function() {
      picker.removeEventListener('px-datetime-range-submitted', submitListener);
    });

    test('clicking heading should apply new value', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      picker._open();

      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      heading.click();

      //should have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.clone().add(1, 'day').toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.notEqual(prevRange.to, picker.range.to);
      assert.equal(prevCount + 1, submitEventCount);
    });

    test('clicking heading when time not valid should not apply new value', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      picker._open();

      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');
      //make sure time is invalid
      panel._toTimeIsValid = false;

      heading.click();

      //shouldn't have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.equal(prevRange.to, picker.range.to);
      assert.equal(prevCount, submitEventCount);

      panel._toTimeIsValid = true;
    });

    test('when not opened changing values should apply directly', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      //change a date
      field.toMoment = field.toMoment.clone().add(1, 'day');

      //should have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.clone().add(1, 'day').toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.notEqual(prevRange.to, picker.range.to);
      assert.equal(prevCount + 1, submitEventCount);
    });

    test('when not opened changing invalid values should not apply directly', function() {
      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment,
          prevCount = submitEventCount;

      field._fromValid = false;

      //change a date
      field.toMoment = field.toMoment.clone().add(1, 'day');

      //shouldn't have changed
      assert.equal(prevFrom.toISOString(), picker.range.from);
      assert.equal(prevTo.toISOString(), picker.range.to);
      assert.equal(prevRange.from, picker.range.from);
      assert.equal(prevRange.to, picker.range.to);
      assert.equal(prevCount, submitEventCount);

      field._fromValid = true;
    });
  })

  suite('test past dates', function() {

    test('start date in past should be set to present date', function() {
      picker.setAttribute('block-past-dates',true);

      var prevRange = picker.range,
          prevFrom = picker.fromMoment,
          prevTo = picker.toMoment;

      picker._open();

      //change a date
      panel.fromMoment = panel.fromMoment.clone();
      panel.toMoment = panel.toMoment.clone();

      //make sure time is invalid
      panel._toTimeIsValid = false;
      heading.click();

      //see what dates are
      assert.equal(panel.fromMoment.toISOString(),picker.range.from);
      assert.equal(panel.toMoment.toISOString(),picker.range.to);

      panel._toTimeIsValid = true;
    });
  });
};
