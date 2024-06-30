// Enable silencing warnings - from missing translations
var silencer =  require('silencer');


// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("objects.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

// main module to test
require("../../../src/js/world_api/objects.js");

test('adding known object', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4});
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding known goal object', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4, goal:true});
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb goal objects ok");
    assert.end();
});

test('adding and removing fixed number of known object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4});
    RUR.remove_object('a', 2, 3, {number:4});
    assert.ok(identical(RUR.CURRENT_WORLD.objects, {}), "nb objects left");
    assert.end();
});

test('adding and removing fixed number of known object as goal', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_object('a', 2, 3, {number:4, goal:true});
    RUR.remove_object('a', 2, 3, {number:4, goal:true});
    assert.equal(RUR.CURRENT_WORLD.goal, undefined, "nb goal objects left");
    assert.end();
});

test('adding fixed number for two different objects and removing one type', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_object('b', 2, 3, {number:4});
    RUR.add_object('a', 2, 3, {number:4});
    RUR.remove_object('b', 2, 3, {number:4});
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});

test('adding fixed number for two different objects as goal and removing one type', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_object('b', 2, 3, {number:4, goal:true});
    RUR.add_object('a', 2, 3, {number:4, goal:true});
    RUR.remove_object('b', 2, 3, {number:4, goal:true});
    assert.equal(RUR.CURRENT_WORLD.goal.objects['2,3'].a, 4, "nb goal objects ok");
    assert.end();
});

test('adding unknown object', function (assert) {
    assert.plan(3);
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.translation = {};
    RUR.untranslated['a'] = false;
    try {
        RUR.add_object('a', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, "Invalid name: a", "error message");
        assert.equal(e.reeborg_failure, "Invalid name: a", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('removing unknown object', function (assert) {
    assert.plan(3);
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.translation = {};
    RUR.untranslated['an object'] = false;
    try {
        RUR.add_object('an object', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, "Invalid name: an object", "error message");
        assert.equal(e.reeborg_failure, "Invalid name: an object", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('invalid x value', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.add_object('a', 0, 3, {number:4});
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('invalid y value', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    try {
        RUR.add_object('a', 3, -1, {number:4});
    } catch (e) {
        assert.ok(e.reeborg_failure,"reeborg_failure ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('is/add/remove objects', function (assert) {
    var original_world;
    assert.plan(5);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];
    original_world = clone(RUR.CURRENT_WORLD);
    assert.deepEqual(RUR.CURRENT_WORLD.objects, {}, "confirm that key is initially present.");
    assert.ok(RUR.is_object("thing", 2, 3)===false, "start with no object.");
    RUR.add_object("thing", 2, 3);
    assert.ok(RUR.is_object("thing", 2, 3)===true, "confirm add_object worked.");
    RUR.remove_object("thing", 2, 3);
    assert.ok(RUR.is_object("thing", 2, 3)===false, "confirm remove_object worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('is_add_remove goal objects', function (assert) {
    var original_world, options={goal:true};
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.ok(RUR.CURRENT_WORLD.goal === undefined, "confirm that goal key is not present initially.");
    RUR.KNOWN_THINGS = ['thing'];
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.is_object("thing", 2, 3, options)===false, "start with no goal object.");
    RUR.add_object("thing", 2, 3, options);
    assert.ok(RUR.CURRENT_WORLD.goal !== undefined, "confirm that goal key is now present.");
    assert.ok(RUR.is_object("thing", 2, 3, options)===true, "confirm add_object for goal worked.");
    RUR.remove_object("thing", 2, 3, options);
    assert.ok(RUR.is_object("thing", 2, 3, options)===false, "confirm remove_object for goal worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});
