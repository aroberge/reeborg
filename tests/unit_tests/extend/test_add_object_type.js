window = global;
var test = require('tape');
var mock = require('mock-require');
var silencer =  require('silencer');
mock("../../../src/js/state.js", {});
mock("../../../src/js/visible_world.js", {});
global.Image = function () {
    return {};
};


test('adding new object type', function (assert) {
    require("../../../src/js/extend/add_object_type.js");    
    RUR.KNOWN_OBJECTS = [];
    RUR._NB_IMAGES_LOADED = 0;
    RUR._NB_IMAGES_TO_LOAD = 0;
    RUR.OBJECTS = {};
    RUR.state = {};
    RUR.state.ready = false;
    RUR.INCREMENT_LOADED_FN = function () {
        RUR._NB_IMAGES_LOADED += 1;
    };
    RUR.add_new_object_type('name', 'URL', 'GOAL');
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object added");
    assert.equal(RUR.OBJECTS.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.OBJECTS.name.goal.image.src, 'GOAL', "url for goal ok");
    assert.equal(RUR._NB_IMAGES_TO_LOAD, 2, "two images to load.");
    RUR.OBJECTS.name.image.onload();
    RUR.OBJECTS.name.goal.image.onload();
    assert.equal(RUR._NB_IMAGES_LOADED, 2, "two images loaded.");
    assert.end();
});

test('replace object type', function (assert) {
    require("../../../src/js/extend/add_object_type.js");
    RUR.KNOWN_OBJECTS = [];
    RUR.OBJECTS = {};
    RUR.state = {};
    RUR.state.ready = false;
    silencer.reset();
    silencer.disable('log');
    RUR.add_new_object_type('name', 'old_URL', 'old_GOAL');
    RUR.add_new_object_type('name', 'URL', 'GOAL');
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object replaced");
    assert.equal(RUR.OBJECTS.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.OBJECTS.name.goal.image.src, 'GOAL', "url for goal ok");
    silencer.restore()
    assert.equal(silencer.getOutput('log')[0][0], 
                 "Warning: object name name already exists",
                 "Console warning ok.")
    assert.end();
});
