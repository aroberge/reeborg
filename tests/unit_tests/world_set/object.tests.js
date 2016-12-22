 /** @function test_set_nb_object_at_position
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* {@link RUR#set_nb_object_at_position}.
*
*/

var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');
var mock = require('mock-require');

function test(test_name, fn) {
    tape_test("object.js: ", test_name, fn);
}

RUR.record_frame = function () {};
mock("../../../src/js/recorder/record_frame.js", {});

test('adding known object', function (assert) {    
    require("../../../src/js/world_set/object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.set_nb_object_at_position('a', 2, 3, 4);
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding and removing known object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;  
    require("../../../src/js/world_set/object.js");  
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.set_nb_object_at_position('a', 2, 3, 4);
    RUR.set_nb_object_at_position('a', 2, 3, 0); 
    assert.ok(identical(RUR.CURRENT_WORLD.objects, {}), "nb objects left");
    assert.end();
});

test('adding two and removing one known objects', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical; 
    require("../../../src/js/world_set/object.js");    
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.set_nb_object_at_position('b', 2, 3, 4);
    RUR.set_nb_object_at_position('a', 2, 3, 4);
    RUR.set_nb_object_at_position('b', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('adding unknown object', function (assert) {
    var out;
    silencer.reset();
    silencer.disable('warn');
    require("../../../src/js/world_set/object.js");
    RUR.KNOWN_TILES = [];
    RUR.translation = {};
    RUR.untranslated['a'] = false;
    try {
        RUR.set_nb_object_at_position('a', 2, 3, 4);
    } catch (e) {
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('invalid x value', function (assert) {
    var mess = "RUR.set_nb_object_at_position(specific_object, x, y, nb): x" +
                " must be a positive integer.";
    require("../../../src/js/world_set/object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.set_nb_object_at_position('a', 0, 3, 4);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('invalid y value', function (assert) {
    var mess = "RUR.set_nb_object_at_position(specific_object, x, y, nb): y" +
                " must be a positive integer.";
    require("../../../src/js/world_set/object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.set_nb_object_at_position('a', 3, -1, 4);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('invalid nb value', function (assert) {
    var mess = "RUR.set_nb_object_at_position(specific_object, x, y, nb): nb" +
                " must be a positive integer or zero.";
    require("../../../src/js/world_set/object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.set_nb_object_at_position('a', 3, 2, Infinity);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});
