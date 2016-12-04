/** @module test/world_set/test_set_objects  */

var test = require('tape');
var silencer =  require('silencer');

test('adding known object', function (assert) {    
    require("../../src/js/world_set/object.js");
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.record_frame = function () {};
    RUR.set_object_nb_at_position('a', 2, 3, 4);
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    silencer.restore();
    assert.end();
});

test('adding and removing known object', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;  
    require("../../src/js/world_set/object.js");  
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.record_frame = function () {};
    RUR.set_object_nb_at_position('a', 2, 3, 4);
    RUR.set_object_nb_at_position('a', 2, 3, 0); 
    assert.ok(identical(RUR.CURRENT_WORLD.objects, {}), "nb objects left");
    assert.end();
});

test('adding two and removing one known objects', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical; 
    require("../../src/js/world_set/object.js");    
    RUR.CURRENT_WORLD = {};
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = ['a', 'b'];
    RUR.record_frame = function () {};
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.set_object_nb_at_position('b', 2, 3, 4);
    RUR.set_object_nb_at_position('a', 2, 3, 4);
    RUR.set_object_nb_at_position('b', 2, 3, 0);
    assert.equal(RUR.CURRENT_WORLD.objects['2,3'].a, 4, "nb objects ok");
    assert.end();
});


test('adding unknown object', function (assert) {
    var out;
    silencer.reset();
    silencer.disable('log');
    require("../../src/js/world_set/object.js");
    RUR.OBJECTS = {};
    RUR.KNOWN_OBJECTS = [];
    RUR.record_frame = function () {};    
    RUR.translation = {};
    RUR.untranslated['a'] = false;
    try {
        RUR.set_object_nb_at_position('a', 2, 3, 4);
    } catch (e) {
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.end();
    }
});
