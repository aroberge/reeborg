var tape = require('tape');
var silencer =  require('silencer');
global.window = {};
global.RUR = {};
global.Image = function () {
    return {};
};
function test(info, fn) {
    tape("Decorative_object.js: "+info, fn);
}

test('adding known decorative object', function (assert) {
    require("../../../src/js/world_set/decorative_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.toggle_decorative_object_at_position('a', 2, 3, 4);
    assert.ok(RUR.CURRENT_WORLD.decorative_objects['2,3'].a, "decorative objects ok");
    assert.end();
});

test('adding and removing known decorative object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_set/decorative_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a'];
    RUR.untranslated['a'] = true;
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, {}), "nb decorative objects left");
    assert.end();
});

test('adding two and removing one known decorative objects', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_set/decorative_object.js");
    RUR.CURRENT_WORLD = {};
    RUR.KNOWN_TILES = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.toggle_decorative_object_at_position('b', 2, 3);
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    RUR.toggle_decorative_object_at_position('b', 2, 3);
    assert.ok(RUR.CURRENT_WORLD.decorative_objects['2,3'].a, "decorative objects ok");
    assert.end();
});


test('adding unknown decorative object', function (assert) {
    silencer.reset();
    silencer.disable();
    require("../../../src/js/world_set/decorative_object.js");
    RUR.KNOWN_TILES = [];
    RUR.translation = {};
    RUR.untranslated['a'] = false;
    try {
        RUR.toggle_decorative_object_at_position('a', 2, 3, 4);
    } catch (e) {
        silencer.restore();
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.ok(silencer.getOutput('warn')[0][0].startsWith("Translation to English"),
                  "Console log ok.");
        assert.end();
    }
});
