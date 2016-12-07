
var test = require('tape');
var filterInt = require("../../../src/js/utils/filterint.js").filterInt;

test('filterInt()', function (assert) {
      assert.equal(filterInt(42), 42, 'pure number');
      assert.equal(filterInt('42'), 42, 'string rep');
      assert.equal(filterInt('-42'), -42, '-42');
      assert.equal(filterInt('+42'), 42, "+42");
      assert.equal(filterInt('Infinity'), Infinity, "Infinity");
      assert.equal(filterInt('42e+0'), undefined, "42e+0");
      assert.equal(filterInt('42h'), undefined, "42h");
      assert.equal(filterInt('h42'), undefined, "h42");
      assert.equal(filterInt('42.0'), undefined, "42.0");
      assert.end();
});
