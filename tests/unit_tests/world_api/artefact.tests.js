 /** @function test_walls
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* all "walls" related methods.
*
*/

// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("aretefact.js: ", test_name, fn);
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

// main module to test
require("../../../src/js/world_api/artefact.js");


/* testing exceptions =============================================

   For each method, we test every single possible exceptions once,
   trying to use different values each time.  The first time we
   do a test, we ensure that all the exception parameters 
   (message, reeborg_shouts, name) are correct, after which we focus
   on a single message.  This reduces the amount of code that needs
   to be written, while ensuring adequate coverage.
*/

/* ======= Invalid positions  ================*/

// Do a single test that checks all the output
test('is_artefact: invalid position', function (assert) {  
    var args = {x:0, y:0};
    assert.plan(3);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.is_artefact(args);
    } catch (e) {
        assert.equal(e.message, "(0, 0) is an invalid position.", "error message ok");
        assert.equal(e.reeborg_shouts, "(0, 0) is an invalid position.", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
});

test('is_artefact: invalid position (missing coordinates)', function (assert) {  
    var args = {};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.is_artefact(args);
    } catch (e) {
        assert.equal(e.message, "(?, ?) is an invalid position.", "error message ok");
    }
});

test('add_artefact: invalid position', function (assert) {  
    var args = {x:1, y:100};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.add_artefact(args);
    } catch (e) {
        assert.equal(e.message, "(1, 100) is an invalid position.", "error message ok");
    }
});

/* ============= Invalid names ===============*/

// Do a single test that checks all the output
test('is_artefact: invalid name', function (assert) {  
    var args = {x:1, y:1, valid_names: ['a', 'b', 'c'], name: 'd'};
    assert.plan(2);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.is_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
        assert.equal(e.name, "Error", "error name ok");
    }
});

test('add_artefact: invalid name', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'A'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.add_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
    }
});

/*  -----------------------------------------------------------

Testing functionality

---------------------------------------------------------------*/

test('is_artefact: confirm missing, unknown type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(1);  
    // create_empty_world does not create world.unknown;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.notOk(RUR.is_artefact(args));
});

test('is_artefact: confirm missing, known type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(2);  
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR.CURRENT_WORLD.objects, {}, 'confirm "objects" exists');
    assert.notOk(RUR.is_artefact(args));
});

test('is_artefact: confirm present, added by hand', function (assert) {  
    var args = {x:2, y:3, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(1);  
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.CURRENT_WORLD.objects["2,3"] = {'a': 1};
    assert.ok(RUR.is_artefact(args), 'added by hand');
});

test('add_artefact: add to known type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.add_artefact(args);
    console.log(RUR.CURRENT_WORLD.objects);
    assert.ok(RUR.is_artefact(args));
});