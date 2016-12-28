 /** @function test_artefacts
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* all "artefacts" related methods.
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
require("../../../src/js/utils/artefact.js");


/* =============================================

                  Testing exceptions

   For the method that checks if required arguments are found, 
   we test every single possible exceptions once,
   trying to use different values each time.  The first time we
   do a test, we ensure that all the exception parameters 
   (message, reeborg_shouts, name) are correct, after which we focus
   on a single message.  
    
   Afterwards, for each specific function, we just do one test that 
   raises an exception, thus (in principle) ensuring that the appropriate
   argument checking method has been invoked.

   This approach reduces the amount of code that needs
   to be written, while ensuring adequate coverage.
*/

/* ============= Invalid positions ===============*/

// Do a single test that checks all the output
test('ensure_require_args_present: invalid position', function (assert) {  
    var args = {x:0, y:0, name:'a', type: 'b'};
    assert.plan(3);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(0, 0) is an invalid position.", "error message ok");
        assert.equal(e.reeborg_shouts, "(0, 0) is an invalid position.", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('ensure_require_args_present: invalid position (missing coordinates)', function (assert) {  
    var args = {name:'a', type:'b'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(?, ?) is an invalid position.", "error message ok");
    }
    assert.end();
});

test('ensure_require_args_present: invalid position (non integer values)', function (assert) {  
    var args = {x:1, y:3.5, name: 'a', type:'b'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(1, 3.5) is an invalid position.", "error message ok");
    }
    assert.end();
});

/* ============= Type missing ===============*/

test('ensure_require_args_present: type missing', function (assert) {  
    var args = {x:1, y:3, name: 'a'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Object type must be specified.", "error message ok");
    }
    assert.end();
});

/* ============= Invalid or missing name ===============*/

test('ensure_require_args_present: name missing', function (assert) {  
    var args = {x:1, y:3, type: 'a'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Object name must be specified.", "error message ok");
    }
    assert.end();
});

test('ensure_require_args_present: invalid name', function (assert) {  
    var args = {x:1, y:1, valid_names: ['a', 'b', 'c'], name: 'd', type:'e'};
    assert.plan(2);  
    try {
        RUR.UnitTest.ensure_require_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
        assert.equal(e.name, "Error", "error name ok");
    }
    assert.end();
});


test('add_artefact: incompatible arguments', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'e',
                replace: true, max_nb: 1};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.add_artefact(args);
    } catch (e) {
        assert.equal(e.message, "'replace' and 'max_nb' are incompatible arguments.", "error message ok");
    }
    assert.end();
});

test('add_artefact: too many artefact to replace', function (assert) {  
    var args1, args2, args3;
    args1 = {x:2, y:2, valid_names: ['a'], name: 'a', type:'e'};
    args2 = {x:2, y:2, valid_names: ['a', 'b'], name: 'b', type:'e'};
    args3 = {x:2, y:2, valid_names: ['a'], name: 'a', type:'e',
                replace: true};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.add_artefact(args1);
    RUR.utils.add_artefact(args2);
    try {
        RUR.utils.add_artefact(args3);
    } catch (e) {
        assert.equal(e.message, "Cannot replace: more than one artefact present.", "error message ok");
    }
    assert.end();
});

test('add_artefact: max_nb must be an integer greater than zero', function (assert) {  
    var args_zero = {x:2, y:2, valid_names: ['a'], name: 'a', type:'e', max_nb: 0},
        args_non_integer = {x:2, y:2, valid_names: ['a'], name: 'a', type:'e', max_nb: 1.5};

    assert.plan(2);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.add_artefact(args_zero);
    } catch (e) {
        assert.equal(e.message, "'max_nb' must be an integer greater than 0", "error message ok");
    }
    try {
        RUR.utils.add_artefact(args_non_integer);
    } catch (e) {
        assert.equal(e.message, "'max_nb' must be an integer greater than 0", "error message ok");
    }
    assert.end();
});
/*------------------------------------------------------------------------
        Single exception-raising test for each method to confirm they use
        the validating function.
 -------------------------------------------------------------------------*/

test('get_nb_artefact: invalid name', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'A', type:'e'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.get_nb_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
    }
    assert.end();
});
test('add_artefact: missing name', function (assert) {  
    var args = {x:2, y:2, type:'e'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.add_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Object name must be specified.", "error message ok");
    }
    assert.end();
});

test('add_artefact: add too many', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', max_nb:2};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.add_artefact(args);
    RUR.utils.add_artefact(args); // add 2 == max_nb
    try {
        RUR.utils.add_artefact(args); // attempt to add one more
    } catch (e) {
        assert.equal(e.message, "Cannot add more artefact of this kind.", "error message ok");
    }
    assert.end();
});



/*-----------------------------------------------------------
                Testing functionality
---------------------------------------------------------------*/

test('get_nb_artefact: confirm missing, unknown type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(1);  
    // create_empty_world does not create world.unknown;
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    assert.equal(RUR.utils.get_nb_artefact(args), 0, "no object found.");
    assert.end();
});

test('get_nb_artefact: confirm missing, known type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(2);  
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    assert.deepEqual(RUR.CURRENT_WORLD.objects, {}, 'confirm "objects" exists');
    assert.equal(RUR.utils.get_nb_artefact(args), 0, "no object found.");
    assert.end();
});

test('get_nb_artefact: confirm present, added by hand', function (assert) {  
    var args = {x:2, y:3, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD.objects["2,3"] = {'a': 1};
    assert.equal(RUR.utils.get_nb_artefact(args), 1, 'one object added by hand');
    assert.end();
});

test('add_artefact: add to unknown type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.add_artefact(args);
    assert.equal(RUR.utils.get_nb_artefact(args), 1, "one artefact added.");
    assert.end();
});

test('add_artefact: add twice unknown type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.add_artefact(args);
    RUR.utils.add_artefact(args);
    assert.equal(RUR.utils.get_nb_artefact(args), 2, "two artefacts added.");
    assert.end();
});

test('add_artefact: replace existing', function (assert) {  
    var args = {x:2, y:3, name: 'a', type:'objects', replace: true};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD.objects["2,3"] = {'b': 25};
    RUR.utils.add_artefact(args); // replace
    assert.deepEqual(RUR.CURRENT_WORLD.objects["2,3"], {'a': 1}, 'replaced correctly');
    assert.end();
});