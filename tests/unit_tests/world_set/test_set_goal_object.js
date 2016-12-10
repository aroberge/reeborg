/** @function test_set_nb_goal_object_at_position
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* {@link RUR#set_nb_goal_object_at_position}.
*
*/
var test = require('tape');
var silencer =  require('silencer');

test('Goal object: adding known goal object', function (assert) {
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.set_nb_goal_object_at_position('a', 2, 3, 4);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('Goal object: adding and removing known goal object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.set_nb_goal_object_at_position('a', 2, 3, 4);
    RUR.set_nb_goal_object_at_position('a', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal, undefined, "nb objects left");
    assert.end();
});

test('Goal object: adding two and removing one known goal objects', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.set_nb_goal_object_at_position('b', 2, 3, 4);
    RUR.set_nb_goal_object_at_position('a', 2, 3, 4);
    RUR.set_nb_goal_object_at_position('b', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('Goal object: adding unknown goal object', function (assert) {
    silencer.reset();
    silencer.disable('warn');
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = [];
    RUR.untranslated['a'] = false;
    RUR.translation = {};
    try {
        RUR.set_nb_goal_object_at_position('a', 2, 3, 4);
    } catch (e) {
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('Goal object: invalid x value', function (assert) {
    var mess = "RUR.set_nb_goal_object_at_position(specific_object, x, y, nb): x" +
                " must be a positive integer.";
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.record_frame = function () {};
    try {
        RUR.set_nb_goal_object_at_position('a', 0, 3, 4);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('Goal object: invalid y value', function (assert) {
    var mess = "RUR.set_nb_goal_object_at_position(specific_object, x, y, nb): y" +
                " must be a positive integer.";
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.record_frame = function () {};
    try {
        RUR.set_nb_goal_object_at_position('a', 3, -1, 4);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});

test('Goal object: invalid nb value', function (assert) {
    var mess = "RUR.set_nb_goal_object_at_position(specific_object, x, y, nb): nb" +
                " must be a positive integer or zero.";
    require("../../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.record_frame = function () {};
    try {
        RUR.set_nb_goal_object_at_position('a', 3, 2, Infinity);
    } catch (e) {
        assert.equal(e.message, mess, "error message ok");
        assert.equal(e.reeborg_shouts, mess, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});
