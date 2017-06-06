// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("key_exists.js: ", test_name, fn);
}

// main module to test
require("../../../src/js/utils/key_exist.js");

test('Testing ensure_key_for_obj_exists()', function (assert) {
    var obj = {};
    assert.plan(1);
    RUR.utils.ensure_key_for_obj_exists(obj, "key");
    assert.deepEqual(obj.key, {}, "empty obj assigned to new key.");
    assert.end();
});

test('Testing ensure_key_for_obj_exists()', function (assert) {
    var obj = {key: {a:1}};
    assert.plan(1);
    RUR.utils.ensure_key_for_obj_exists(obj, "key");
    assert.deepEqual(obj.key, {a:1}, "existing object unchanged.");
    assert.end();
});


test('Testing ensure_key_for_array_exists()', function (assert) {
    var obj = {};
    assert.plan(1);
    RUR.utils.ensure_key_for_array_exists(obj, "key");
    assert.deepEqual(obj.key, [], "empty array assigned to new key.");
    assert.end();
});

test('Testing ensure_key_for_array_exists()', function (assert) {
    var obj = {key: ['a', 'b']};
    assert.plan(1);
    RUR.utils.ensure_key_for_array_exists(obj, "key");
    assert.deepEqual(obj.key, ['a', 'b'], "existing array unchanged.");
    assert.end();
});

//TODO: need to add type checking tests, after type checking is
//successfully implemented.