var test = require('tape');
var silencer =  require('silencer');

test('adding known goal object', function (assert) {
    require("../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_goal_object_at_position('a', 2, 3, 4);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding and removing known goal object', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    require("../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_goal_object_at_position('a', 2, 3, 4);
    RUR.add_goal_object_at_position('a', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal, undefined, "nb objects left");
    assert.end();
});

test('adding two and removing one known goal objects', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    require("../../src/js/world_set/add_goal_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_goal_object_at_position('b', 2, 3, 4);
    RUR.add_goal_object_at_position('a', 2, 3, 4);
    RUR.add_goal_object_at_position('b', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('adding unknown goal object', function (assert) {
    silencer.reset();
    silencer.disable('log');
    require("../../src/js/world_set/add_goal_object.js");
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = [];
    RUR.untranslated['a'] = false;
    RUR.translation = {};
    try {
        RUR.add_goal_object_at_position('a', 2, 3, 4);
    } catch (e) {
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});
