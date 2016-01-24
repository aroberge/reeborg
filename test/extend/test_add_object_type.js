var test = require('tape');
var mock = require('mock-require');
var silencer =  require('silencer');
mock("../../src/js/state.js", {});
mock("../../src/js/visible_world.js", {});
global.RUR = {};
global.Image = function () {
    return {};
};

test('adding new object type', function (assert) {
    RUR.KNOWN_OBJECTS = [];
    RUR._NB_IMAGES_LOADED = 0;
    RUR._NB_IMAGES_TO_LOAD = 0;
    RUR.objects = {};
    RUR.state = {};
    RUR.state.ready = false;
    require("../../src/js/extend/add_object_type.js");
    RUR.add_new_object_type('name', 'URL', 'GOAL');
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object added");
    assert.equal(RUR.objects.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.objects.name.image_goal.src, 'GOAL', "url for goal ok");
    assert.equal(RUR._NB_IMAGES_TO_LOAD, 2, "two images to load.");
    RUR.objects.name.image.onload();
    RUR.objects.name.image_goal.onload();
    assert.equal(RUR._NB_IMAGES_LOADED, 2, "two images loaded.");
    assert.end();
});

test('replace object type', function (assert) {
    RUR.KNOWN_OBJECTS = [];
    RUR.objects = {};
    RUR.state = {};
    RUR.state.ready = false;
    require("../../src/js/extend/add_object_type.js");
    RUR.add_new_object_type('name', 'old_URL', 'old_GOAL');
    RUR.add_new_object_type('name', 'URL', 'GOAL');
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object replaced");
    assert.equal(RUR.objects.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.objects.name.image_goal.src, 'GOAL', "url for goal ok");
    assert.end();
});
