//window.px = window.px || {};
//
//window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//
//window.px = {
//  isHidden: function (el) {
//    var style = window.getComputedStyle(el);
//    return (style.display === 'none')
//  },
//  beforeEachWithFixture: function(fn){
//
//    beforeEach(function (done) {
//      // create a new sandbox
//      setFixtures(sandbox({
//        id: 'test-container'
//      }));
//
//      window.$fixture = $('#test-container');
//
//      fn();
//      setTimeout(function () {
//        done();
//      }, 0)
//    });
//
//  },
//  beforeEachAsync: function(fn){
//    beforeEach(function (done) {
//      fn();
//      setTimeout(function () {
//        done();
//      }, 0)
//    });
//  }
//};
