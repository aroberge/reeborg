window = global;
var test = require('tape');
var silencer =  require('silencer');
global.Image = function () {
    return {};
};

function set_defaults() {
    RUR.KNOWN_TILES = [];
    RUR._NB_IMAGES_LOADED = 0;
    RUR._NB_IMAGES_TO_LOAD = 0;
    RUR.TILES = {};
    RUR.INCREMENT_LOADED_FN = function () {
        RUR._NB_IMAGES_LOADED += 1;
    };
}

test('RUR.augment.new_tile_type: adding new tile type', function (assert) {
    require("../../../src/js/world_augment/add_tile_type.js");   
    var obj = {}, this_obj; 
    set_defaults();
    obj.name = "this name";
    obj.url = "URL";
    obj.goal = {"url": "GOAL"};
    RUR.augment.new_tile_type(obj); 
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

test('RUR.augment.new_tile_type: replace tile type', function (assert) {
    require("../../../src/js/world_augment/add_tile_type.js");
    var obj = {}, this_obj; 
    set_defaults();
    silencer.reset();
    silencer.disable('warn');
    obj.name = "this_name";
    obj.url = "old_URL";
    RUR.augment.new_tile_type(obj); 
    obj.url = "URL";
    RUR.augment.new_tile_type(obj); 
    this_obj = RUR.TILES["this_name"];
    assert.equal(RUR.KNOWN_TILES[0], 'this_name', "tile replaced");
    assert.equal(this_obj.image.src, 'URL', "url for objects ok");
    silencer.restore();
    assert.equal(silencer.getOutput('warn')[0][0], 
                 "Warning: tile name this_name already exists",
                 "Console warning ok.");
    assert.end();
});

test('RUR.augment.new_tile_type: adding tile with no goal attribute', function (assert) {
    // decorative objects do not need "goal" attribute defined
    require("../../../src/js/world_augment/add_tile_type.js");   
    var obj = {}, this_obj; 
    set_defaults();
    obj.name = "name";
    obj.url = "URL";
    RUR.augment.new_tile_type(obj); 
    this_obj = RUR.TILES["name"];
    assert.equal(RUR.KNOWN_TILES[0], 'name', "tile added");
    assert.equal(this_obj.image.src, 'URL', "url for tile ok");
    assert.equal(this_obj.goal, undefined, "no goal set ok");
    assert.end();
});

test('RUR.augment.new_tile_type: error raised if name attribute missing.'), function (assert) {
    var obj={}, message;
    message = "RUR.augment.new_tile_type(new_tile): new_tile.name attribute missing.";
    try {
        RUR.augment.new_tile_type(obj); 
    } catch (e) {
        assert.equal(e.message, message, "error message ok");
        assert.equal(e.reeborg_shouts, message, "reeborg_shouts ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
}