
var test = require('./../test_globals.js').tape_test;

test('validator.js: ', 'Testing filterInt()', function (assert) {
      require("../../../src/js/utils/validator.js");
      var filterInt = RUR.utils.filterInt;
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

test('validator.js', 'testing is_valid_position()', function (assert) {
    require("../../../src/js/utils/validator.js");
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    assert.ok(RUR.utils.is_valid_position(1, 1), '(1,1) is a valid position');
    assert.ok(RUR.utils.is_valid_position(10, 10), '(10, 10) is a valid position');
    assert.notOk(RUR.utils.is_valid_position(0, 1), '(0, 1) is not a valid position');
    assert.notOk(RUR.utils.is_valid_position(1, 0), '(1, 0) is not a valid position');
    assert.notOk(RUR.utils.is_valid_position(2.3, 1), '(2.3, 1) is not a valid position');
    assert.notOk(RUR.utils.is_valid_position(1, 2.3), '(1, 2.3) is not a valid position');
    assert.end();
});
