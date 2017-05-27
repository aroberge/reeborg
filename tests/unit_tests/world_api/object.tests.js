 /** @function test_add_remove_object
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for
* {@link RUR#add_object} and {@link RUR#remove_object}.
*
*/

// Enable silencing warnings - from missing translations
var silencer =  require('silencer');


// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("objects.js: ", test_name, fn);
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

// main module to test
require("../../../src/js/world_api/objects.js");


test('adding known object', function (assert) {
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4});
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding and removing fixed number of known object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4});
    RUR.remove_object('a', 2, 3, {number:4});
    assert.ok(identical(RUR.CURRENT_WORLD.objects, {}), "nb objects left");
    assert.end();
});

test('adding fixed number for two different objects and removing all of one of them objects', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_object('b', 2, 3, {number:4});
    RUR.add_object('a', 2, 3, {number:4});
    RUR.remove_object('b', 2, 3, {number:4});
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('adding unknown object', function (assert) {
    var out;
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = [];
    RUR.translation = {};
    RUR.untranslated['a'] = false;
    try {
        RUR.add_object('a', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('invalid x value', function (assert) {
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.add_object('a', 0, 3, {number:4});
    } catch (e) {
        assert.ok(e.reeborg_shouts, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('invalid y value', function (assert) {
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.add_object('a', 3, -1, {number:4});
    } catch (e) {
        assert.ok(e.reeborg_shouts,"reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

