var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("things.js: ", test_name, fn);
}


function set_defaults() {
    RUR.KNOWN_THINGS = [];
    RUR.THINGS = {};
}


test('RUR.add_new_thing: adding new tile type', function (assert) {
    require("../../../src/js/world_api/things.js");
    var obj = {}, this_obj;
    set_defaults();
    obj.name = "this name";
    obj.url = "URL";
    obj.goal = {"url": "GOAL"};
    RUR.add_new_thing(obj);
    this_obj = RUR.THINGS["this name"];
    assert.equal(RUR.KNOWN_THINGS[0], 'this name', "tile added");
    assert.equal(this_obj.image.src, 'URL', "url for tile ok");
    assert.equal(this_obj.goal.image.src, 'GOAL', "url for goal ok");
    assert.end();
});

test('RUR.add_new_thing: replace tile type', function (assert) {
    require("../../../src/js/world_api/things.js");
    var obj = {}, this_obj;
    set_defaults();
    obj.name = "this_name";
    obj.url = "old_URL";
    RUR.UnitTest.logtest = true;
    RUR.add_new_thing(obj);
    RUR.add_new_thing(obj);
    obj.url = "URL";
    RUR.add_new_thing(obj);
    this_obj = RUR.THINGS["this_name"];
    assert.equal(RUR.KNOWN_THINGS[0], 'this_name', "tile replaced");
    assert.equal(this_obj.image.src, 'URL', "url for objects ok");
    assert.end();
});

test('RUR.add_new_thing: adding tile with no goal attribute', function (assert) {
    // decorative objects do not need "goal" attribute defined
    require("../../../src/js/world_api/things.js");
    var obj = {}, this_obj;
    set_defaults();
    obj.name = "name";
    obj.url = "URL";
    RUR.add_new_thing(obj);
    this_obj = RUR.THINGS["name"];
    assert.equal(RUR.KNOWN_THINGS[0], 'name', "tile added");
    assert.equal(this_obj.image.src, 'URL', "url for tile ok");
    assert.equal(this_obj.goal, undefined, "no goal set ok");
    assert.end();
});

test('RUR.add_new_thing: error raised if name attribute missing.', function (assert) {
    var obj={}, message;
    message = "RUR.add_new_thing(thing): thing.name attribute missing.";
    try {
        RUR.add_new_thing(obj);
    } catch (e) {
        assert.equal(e.message, message, "error message ok");
        assert.equal(e.reeborg_failure, message, "reeborg_failure ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});
