// This is the placeholder suite to place custom tests in
// Use testCase(options) for a more convenient setup of the test cases
suite('interaction', function() {

  let picker, dropdown, rangeField;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    dropdown = Polymer.dom(picker.root).querySelector('#dropdown'),
    rangeField = Polymer.dom(picker.root).querySelector('px-datetime-range-field');

    flush(()=>{
      done();
    });
  });

  test('panel hidden at startup', function() {
    assert.isFalse(picker.opened);
  });

  test('clicking icon opens the panel', function() {
  var field = Polymer.dom(rangeField.root).querySelector('px-datetime-field'),
      entry = Polymer.dom(field.root).querySelector('px-datetime-entry'),
      icons = Polymer.dom(entry.root).querySelectorAll('px-icon');

  icons[0].click();
  assert.isTrue(picker.opened);
  });

});

suite('submit with buttons', function() {

  let picker, panel, rangeField, submitEventCount = 0,
      submitListener;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
    rangeField = Polymer.dom(picker.root).querySelector('px-datetime-range-field'),
    picker.set('fromMoment', moment("2017-01-05T00:30:00.000Z"));
    picker.set('toMoment', moment("2018-01-05T00:30:00.000Z"));
    picker.showButtons = true;

    submitListener = function(evt) {
      submitEventCount++;
    };
    picker.addEventListener('px-datetime-range-submitted', submitListener);

    flush(()=>{
      done();
    });
  });

  suiteTeardown(function() {
    picker.removeEventListener('px-datetime-range-submitted', submitListener);
  });

  test('closing panel should not apply new value', function(done) {
    var prevCount = submitEventCount;

    picker.opened = true;
    flush(()=>{
      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      picker.opened = false;

      //shouldn't have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");
      // assert.equal(prevCount, submitEventCount);
      done();
    });
  });

  test('clicking apply should apply new value', function(done) {
    var prevCount = submitEventCount,
        buttons = Polymer.dom(panel.root).querySelectorAll('px-datetime-buttons'),
        applyBtn = Polymer.dom(buttons[0].root).querySelectorAll('#submitButton');

    picker.opened = true;

    //change a date

    flush(()=>{
      panel.toMoment = panel.toMoment.clone().add(1, 'day');
      //simulate apply
      applyBtn[0].click();
      assert.isFalse(picker.opened);

      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      // assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('clicking cancel should not apply new value', function(done) {
    var prevCount = submitEventCount,
        buttons = Polymer.dom(panel.root).querySelectorAll('px-datetime-buttons'),
        bothBtn = Polymer.dom(buttons[0].root).querySelectorAll('button');

    picker.opened = true;

    //change a date
    panel.toMoment = panel.toMoment.clone().add(1, 'day');

    //simulate apply
    bothBtn[0].click();

    flush(()=>{
      assert.isFalse(picker.opened);

      //shouldn't have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");
      // assert.equal(prevCount, submitEventCount);
      done();
    });
  });

  test('when not opened changing values should apply directly', function(done) {
    var prevCount = submitEventCount,
        e = document.createEvent('Event');

    //change a date
    rangeField.toMoment = rangeField.toMoment.clone().add(1, 'day');
    e.initEvent("blur", true, true);
    picker.dispatchEvent(e);

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      // assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });
});

suite('submit without buttons', function() {

  let picker, panel, rangeField,
  submitEventCount = 0,
  submitListener;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
    rangeField = Polymer.dom(picker.root).querySelector('px-datetime-range-field'),
    picker.set('fromMoment', moment("2017-01-05T00:30:00.000Z"));
    picker.set('toMoment', moment("2018-01-05T00:30:00.000Z"));
    picker.showButtons = false;

    submitListener = function(evt) {
      submitEventCount++;
    };
    picker.addEventListener('px-datetime-range-submitted', submitListener);

    flush(()=>{
      done();
    });
  });

  suiteTeardown(function() {
    picker.removeEventListener('px-datetime-range-submitted', submitListener);
  });

  test('closing panel should apply new value', function(done) {
    var prevCount = submitEventCount;

    picker.opened = true;

    //change a date
    panel.toMoment = panel.toMoment.clone().add(1, 'day');
    picker.opened = false;

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      // assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('closing panel when time not valid should not apply new value', function(done) {
    var prevCount = submitEventCount;

    picker.opened = true;

    //change a date
    panel.toMoment = panel.toMoment.clone().add(1, 'day');
    //make sure time is invalid
    panel._toTimeIsValid = false;

    picker.opened = false;

    flush(()=>{
      //shouldn't have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");
      // assert.equal(prevCount, submitEventCount);

      panel._toTimeIsValid = true;
      done();
    });
  });

  test('when not opened changing values should apply directly on blur', function(done) {
    var prevCount = submitEventCount;
        e = document.createEvent('Event');

    //change a date
    rangeField.toMoment = rangeField.toMoment.clone().add(1, 'day');
    e.initEvent("blur", true, true);
    picker.dispatchEvent(e);

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      // assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('when not opened changing values should apply directly on Enter', function(done) {
    var prevCount = submitEventCount;
        e = document.createEvent('Event');

    //change a date
    rangeField.toMoment = rangeField.toMoment.clone().add(1, 'day');
    MockInteractions.pressAndReleaseKeyOn(rangeField, 13, [], 'Enter');

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      // assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('when not opened changing invalid values should not apply directly', function(done) {
    var prevCount = submitEventCount,
        e = document.createEvent('Event'),
        field = Polymer.dom(rangeField.root).querySelector('px-datetime-field'),
        entries = Polymer.dom(field.root).querySelectorAll('px-datetime-entry'),
        dateCells = Polymer.dom(entries[0].root).querySelectorAll('px-datetime-entry-cell'),
        dateInput = Polymer.dom(dateCells[1].root).querySelector('input');

    //change a date
    dateInput.value = "99";
    MockInteractions.pressAndReleaseKeyOn(field, 13, [], 'Enter');

    flush(()=>{
      //shouldn't have changed
      assert.isFalse(rangeField.isValid);
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");

      done();
    });
  });
});
