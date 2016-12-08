window = global;
var test = require('tape');
var mock = require('mock-require');
var silencer =  require('silencer');
mock("../../../src/js/state.js", {});
mock("../../../src/js/visible_world.js", {});
global.Image = function () {
    return {};
};

function set_defaults() {
    RUR.KNOWN_OBJECTS = [];
    RUR._NB_IMAGES_LOADED = 0;
    RUR._NB_IMAGES_TO_LOAD = 0;
    RUR.OBJECTS = {};
    RUR.state = {};
    RUR.state.ready = false;
    RUR.INCREMENT_LOADED_FN = function () {
        RUR._NB_IMAGES_LOADED += 1;
    };
}

test('adding new object type', function (assert) {
    require("../../../src/js/world_augment/add_object_type.js");   
    var obj = {}; 
    set_defaults();
    obj.name = "name";
    obj.url = "URL";
    obj.goal = {"url": "GOAL"};
    RUR.augment.add_object_type(obj); 
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
    require("../../../src/js/world_augment/add_object_type.js");
    var obj = {}; 
    set_defaults();
    silencer.reset();
    silencer.disable('warn');
    obj.name = "name";
    obj.url = "old_URL";
    obj.goal = {"url": "old_GOAL"};
    RUR.augment.add_object_type(obj); 
    obj.url = "URL";
    obj.goal = {"url": "GOAL"};
    RUR.augment.add_object_type(obj); 
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object replaced");
    assert.equal(RUR.OBJECTS.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.OBJECTS.name.goal.image.src, 'GOAL', "url for goal ok");
    silencer.restore()
    assert.equal(silencer.getOutput('warn')[0][0], 
                 "Warning: object name name already exists",
                 "Console warning ok.")
    assert.end();
});

test('adding new decorative object type', function (assert) {
    // decorative objects do not need "goal" attribute defined
    require("../../../src/js/world_augment/add_object_type.js");   
    var obj = {}; 
    set_defaults();
    obj.name = "name";
    obj.url = "URL";
    RUR.augment.add_object_type(obj); 
    assert.equal(RUR.KNOWN_OBJECTS[0], 'name', "object added");
    assert.equal(RUR.OBJECTS.name.image.src, 'URL', "url for objects ok");
    assert.equal(RUR.OBJECTS.name.goal, undefined, "no goal set ok");
    assert.end();
});