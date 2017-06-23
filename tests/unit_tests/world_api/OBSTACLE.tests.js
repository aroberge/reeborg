var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("obstacle.js: ", test_name, fn);
}


// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

test('adding known object', function (assert) {
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {'a':true};
    RUR.untranslated['a'] = true;
    global.RUR.add_obstacle('a', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.obstacles['2,3'], ["a"], "obstacle ok");
    assert.end();
});

test('adding and removing known solid object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {'a':true};
    RUR.untranslated['a'] = true;
    RUR.add_obstacle('a', 2, 3);
    RUR.remove_obstacle('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, RUR.create_empty_world()), "no obstacle left");
    assert.end();
});

test('adding two and removing one known solid objects', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {'a':true, 'b': true};
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_obstacle('b', 2, 3);
    RUR.add_obstacle('a', 2, 3);
    RUR.remove_obstacle('b', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.obstacles['2,3'], ['a'], "obstacle ok");
    assert.end();
});


// test_only('adding unknown solid object', function (assert) {
//     silencer.reset();
//     silencer.disable();
//     assert.plan(4);
//     require("../../../src/js/world_api/obstacles.js");
//     RUR.CURRENT_WORLD = RUR.create_empty_world();
//     RUR.THINGS = [];
//     RUR.translation = {};
//     try {
//         RUR.add_obstacle('a', 2, 3);
//     } catch (e) {
//         silencer.restore();
//         assert.equal(e.message, "Unknown object", "error message");
//         assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
//         assert.equal(e.name, "ReeborgError", "error name ok");
//         assert.ok(silencer.getOutput('warn')[0][0].startsWith("Translation needed for"),
//                   "Console log ok.");
//     }
//     assert.end();
// });
