
var test = require('tape');
var filterInt = require("../../src/js/utils/filterint.js").filterInt;

test('filterInt()', function (assert) {
      assert.equal(42, filterInt(42), 'pure number');
      assert.equal(42, filterInt('42'), 'string rep');
      assert.equal(-42, filterInt('-42'), '-42');
      assert.equal(42, filterInt('+42'), "+42");
      assert.equal(Infinity, filterInt('Infinity'), "Infinity");
      assert.equal(undefined, filterInt('42e+0'), "42e+0");
      assert.equal(undefined, filterInt('42h'), "42h");
      assert.equal(undefined, filterInt('h42'), "h42");
      assert.equal(undefined, filterInt('42.0'), "42.0");
      assert.end();
});
