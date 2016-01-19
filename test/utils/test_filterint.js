
var test = require('tape');
var filterInt = require("../../src/js/utils/filterint.js").filterInt;

test('filterInt()', function (assert) {

      assert.equal(42, filterInt(42));
      assert.equal(42, filterInt('42'));
      assert.equal(-42, filterInt('-42'));
      assert.equal(42, filterInt('+42'));
      assert.equal(Infinity, filterInt('Infinity'));
      assert.equal(undefined, filterInt('42e+0'));
      assert.equal(undefined, filterInt('42h'));
      assert.equal(undefined, filterInt('h42'));
      assert.equal(undefined, filterInt('42.0'));
      assert.end();
});

// var assert = require('assert');
// var filterInt = require("../../src/js/utils/filterint.js").filterInt;
//
// describe('filterint utility', function() {
//   describe('filterInt()', function () {
//     it('should return an integer (including Infinity) or undefined', function () {
//       assert.equal(42, filterInt(42));
//       assert.equal(42, filterInt('42'));
//       assert.equal(-42, filterInt('-42'));
//       assert.equal(42, filterInt('+42'));
//       assert.equal(Infinity, filterInt('Infinity'));
//       assert.equal(undefined, filterInt('42e+0'));
//       assert.equal(undefined, filterInt('42h'));
//       assert.equal(undefined, filterInt('h42'));
//       assert.equal(undefined, filterInt('42.0'));
//     });
//   });
// });
