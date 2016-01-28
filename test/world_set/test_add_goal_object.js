var test = require('tape');
var silencer =  require('silencer');

global.RUR = {};

test('adding known goal object', function (assert) {
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    require("../../src/js/world_set/add_goal_object.js");
    global.RUR.add_goal_object_at_position('a', 2, 3, 4);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding and removing known goal object', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    require("../../src/js/world_set/add_goal_object.js");
    RUR.add_goal_object_at_position('a', 2, 3, 4);
    RUR.add_goal_object_at_position('a', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal, undefined, "nb objects left");
    assert.end();
});

test('adding two and removing one known goal objects', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a', 'b'];
    require("../../src/js/world_set/add_goal_object.js");
    RUR.add_goal_object_at_position('b', 2, 3, 4);
    RUR.add_goal_object_at_position('a', 2, 3, 4);
    RUR.add_goal_object_at_position('b', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('adding unknown goal object', function (assert) {
    silencer.reset();
    silencer.disable();
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = [];
    require("../../src/js/world_set/add_goal_object.js");
    try {
        RUR.add_goal_object_at_position('a', 2, 3, 4);
    } catch (e) {
        silencer.restore();
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.ok(silencer.getOutput('log')[0][0].startsWith("Translation needed for"),
                  "Console log ok.");
        assert.end();
    }
});
