/**
 * @name THINGS_add_new_thing
 * @memberof TestUnit
 * @instance
 *
 * Fake jsdoc entry so that we can document that the tests exist.
 *
 */
var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("things.js: ", test_name, fn);
}


function set_defaults() {
    RUR.KNOWN_TILES = [];
    RUR._NB_IMAGES_LOADED = 0;
    RUR._NB_IMAGES_TO_LOAD = 0;
    RUR.TILES = {};
}


test('RUR.add_new_thing: adding new tile type', function (assert) {
    require("../../../src/js/world_api/things.js");
    var obj = {}, this_obj;
    set_defaults();
    obj.name = "this name";
    obj.url = "URL";
    obj.goal = {"url": "GOAL"};
    RUR.add_new_thing(obj);
    this_obj = RUR.TILES["this name"];
    assert.equal(RUR.KNOWN_TILES[0], 'this name', "tile added");
    assert.equal(this_obj.image.src, 'URL', "url for tile ok");
    assert.equal(this_obj.goal.image.src, 'GOAL', "url for goal ok");
    assert.equal(RUR._NB_IMAGES_TO_LOAD, 2, "two images to load.");
    this_obj.image.onload();
    this_obj.goal.image.onload();
    assert.equal(RUR._NB_IMAGES_LOADED, 2, "two images loaded.");
    assert.end();
});

test('RUR.add_new_thing: replace tile type', function (assert) {
    require("../../../src/js/world_api/things.js");
    var obj = {}, this_obj;
    set_defaults();
    silencer.reset();
    silencer.disable('warn');
    silencer.disable('log');
    obj.name = "this_name";
    obj.url = "old_URL";
    RUR.add_new_thing(obj);
    RUR.add_new_thing(obj);
    assert.equal(silencer.getOutput('log')[0][0],
                 "this_name is already known; no need to recreate.",
                 "Console log ok.");
    obj.url = "URL";
    RUR.add_new_thing(obj);
    this_obj = RUR.TILES["this_name"];
    assert.equal(RUR.KNOWN_TILES[0], 'this_name', "tile replaced");
    assert.equal(this_obj.image.src, 'URL', "url for objects ok");
    silencer.restore();
    assert.equal(silencer.getOutput('warn')[0][0],
                 "Warning: redefining this_name",
                 "Console warning ok.");
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
    this_obj = RUR.TILES["name"];
    assert.equal(RUR.KNOWN_TILES[0], 'name', "tile added");
    assert.equal(this_obj.image.src, 'URL', "url for tile ok");
    assert.equal(this_obj.goal, undefined, "no goal set ok");
    assert.end();
});

test('RUR.add_new_thing: error raised if name attribute missing.'), function (assert) {
    var obj={}, message;
    message = "RUR.add_new_thing(new_tile): new_tile.name attribute missing.";
    try {
        RUR.add_new_thing(obj);
    } catch (e) {
        assert.equal(e.message, message, "error message ok");
        assert.equal(e.reeborg_shouts, message, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
}