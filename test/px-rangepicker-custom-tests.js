// This is the placeholder suite to place custom tests in
// Use testCase(options) for a more convenient setup of the test cases
suite('interaction', function() {

  let picker, dropdown, heading;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    dropdown = Polymer.dom(picker.root).querySelector('#dropdown'),
    heading = document.querySelector('h3');

    flush(()=>{
      done();
    });
  });

  test('panel hidden at startup', function() {
    assert.isFalse(dropdown.opened);
  });

  test('open shows the panel', function() {
    picker.opened = true;
    assert.isTrue(dropdown.opened);
  });


  test('click on heading closes panel', function(done) {
    picker.opened = true;
    heading.click();
    flush(()=>{
      assert.isFalse(dropdown.opened);
      done();
    });
  });
});

suite('submit with buttons', function() {

  let picker, panel, field, heading, submitEventCount = 0,
      submitListener;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
    field = Polymer.dom(picker.root).querySelector('px-datetime-range-field'),
    heading = document.querySelector('h3');
    picker.set('fromMoment', moment("2017-01-05T00:30:00.000Z").tz(picker.timeZone));
    picker.set('toMoment', moment("2018-01-05T00:30:00.000Z").tz(picker.timeZone));
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

  test('clicking heading should not apply new value', function(done) {
    var prevCount = submitEventCount;

    picker.opened = true;
    flush(()=>{
      //change a date
      panel.toMoment = panel.toMoment.clone().add(1, 'day');

      heading.click();

      //shouldn't have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");
      assert.equal(prevCount, submitEventCount);
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
      assert.equal(prevCount + 1, submitEventCount);
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
      assert.equal(prevCount, submitEventCount);
      done();
    });
  });

  test('when not opened changing values should apply directly', function(done) {
    var prevCount = submitEventCount,
        e = document.createEvent('Event');

    //change a date
    field.toMoment = field.toMoment.clone().add(1, 'day');
    e.initEvent("blur", true, true);
    picker.dispatchEvent(e);

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });
});

suite('submit without buttons', function() {

  let picker, panel, field, heading,
  submitEventCount = 0,
  submitListener;

  setup(function(done) {
    picker = fixture('px-rangepicker'),
    panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
    field = Polymer.dom(picker.root).querySelector('px-datetime-range-field'),
    heading = document.querySelector('h3');
    picker.set('fromMoment', moment("2017-01-05T00:30:00.000Z").tz(picker.timeZone));
    picker.set('toMoment', moment("2018-01-05T00:30:00.000Z").tz(picker.timeZone));
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

  test('clicking heading should apply new value', function(done) {
    var prevCount = submitEventCount;

    picker.opened = true;

    //change a date
    panel.toMoment = panel.toMoment.clone().add(1, 'day');
    picker.opened = false;

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('clicking heading when time not valid should not apply new value', function(done) {
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
      assert.equal(prevCount, submitEventCount);

      panel._toTimeIsValid = true;
      done();
    });
  });

  test('when not opened changing values should apply directly', function(done) {
    var prevCount = submitEventCount;
        e = document.createEvent('Event');

    //change a date
    field.toMoment = field.toMoment.clone().add(1, 'day');
    e.initEvent("blur", true, true);
    picker.dispatchEvent(e);

    flush(()=>{
      //should have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-06T00:30:00.000Z");
      assert.equal(prevCount + 1, submitEventCount);
      done();
    });
  });

  test('when not opened changing invalid values should not apply directly', function(done) {
    var prevCount = submitEventCount;
        e = document.createEvent('Event');

    field._fromValid = false;

    //change a date
    field.toMoment = field.toMoment.clone().add(1, 'day');
    e.initEvent("blur", true, true);
    picker.dispatchEvent(e);

    flush(()=>{
      //shouldn't have changed
      assert.equal(picker.fromMoment.toISOString(), "2017-01-05T00:30:00.000Z");
      assert.equal(picker.toMoment.toISOString(), "2018-01-05T00:30:00.000Z");
      assert.equal(prevCount, submitEventCount);

      field._fromValid = true;
      done();
    });
  });
});

suite('test past dates', function() {

  let picker, panel, heading;

  setup(function(done) {
    picker = fixture('px-rangepicker');
    panel = Polymer.dom(picker.root).querySelector('px-datetime-range-panel'),
    heading = document.querySelector('h3');
    now = Px.moment();
    picker.set('fromMoment', moment("2017-01-05T00:30:00.000Z").tz(picker.timeZone));
    picker.set('toMoment', moment("2018-01-05T00:30:00.000Z").tz(picker.timeZone));

    flush(()=>{
      done();
    });
  });

  test('start date in past should be set to present date', function(done) {
    picker.setAttribute('block-past-dates',true);

    picker.opened = true;

    //change a date
    debugger
    panel.fromMoment = panel.fromMoment.clone();
    panel.toMoment = panel.toMoment.clone();

    //make sure time is invalid
    panel._toTimeIsValid = false;
    picker.opened = false;

    flush(()=>{
      //see what dates are
      assert.equal(panel.fromMoment.toISOString(),picker.range.from);
      assert.equal(panel.toMoment.toISOString(),picker.range.to);

      panel._toTimeIsValid = true;
      done();
    });
  });
});
