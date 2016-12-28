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
test('ensure_common_required_args_present: invalid position', function (assert) {  
    var args = {x:0, y:0, name:'a', type: 'b'};
    assert.plan(3);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(0, 0) is an invalid position.", "error message ok");
        assert.equal(e.reeborg_shouts, "(0, 0) is an invalid position.", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('ensure_common_required_args_present: invalid position (missing coordinates)', function (assert) {  
    var args = {name:'a', type:'b'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(?, ?) is an invalid position.", "error message ok");
    }
    assert.end();
});

test('ensure_common_required_args_present: invalid position (non integer values)', function (assert) {  
    var args = {x:1, y:3.5, name: 'a', type:'b'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "(1, 3.5) is an invalid position.", "error message ok");
    }
    assert.end();
});

/* ============= Type missing ===============*/

test('ensure_common_required_args_present: type missing', function (assert) {  
    var args = {x:1, y:3, name: 'a'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Object type must be specified.", "error message ok");
    }
    assert.end();
});

/* ============= Invalid or missing name ===============*/

test('ensure_common_required_args_present: name missing', function (assert) {  
    var args = {x:1, y:3, type: 'a'};
    assert.plan(1);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Object name must be specified.", "error message ok");
    }
    assert.end();
});

test('ensure_common_required_args_present: invalid name', function (assert) {  
    var args = {x:1, y:1, valid_names: ['a', 'b', 'c'], name: 'd', type:'e'};
    assert.plan(2);  
    try {
        RUR.UnitTest.ensure_common_required_args_present(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
        assert.equal(e.name, "Error", "error name ok");
    }
    assert.end();
});



/*------------------------------------------------------------------------
        Single exception-raising test for each method to confirm they use
        the validating function.
 -------------------------------------------------------------------------*/

test('get_nb_artefact: invalid name', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'A', type:'e', number:3};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.get_nb_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name", "error message ok");
    }
    assert.end();
});
test('set_nb_artefacts: missing name', function (assert) {  
    var args = {x:2, y:2, type:'e', number:4};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.set_nb_artefacts(args);
    } catch (e) {
        assert.equal(e.message, "Object name must be specified.", "error message ok");
    }
    assert.end();
});
test('set_nb_artefacts: missing number', function (assert) {  
    var args = {x:2, y:2, name: 'a', type:'unknown'};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.set_nb_artefacts(args);
    } catch (e) {
        assert.equal(e.message, "Number of objects must be specified.", "error message ok");
    }
    assert.end();
});

test('set_nb_artefacts: 0 as incorrect number', function (assert) {  
    var args = {x:2, y:2, name: 'a', type:'unknown', number:0};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.set_nb_artefacts(args);
    } catch (e) {
        assert.equal(e.message, "Number must be a positive integer.", "error message ok");
    }
    assert.end();
});

test('set_nb_artefacts: non-integer as incorrect number', function (assert) {  
    var args = {x:2, y:2, name: 'a', type:'unknown', number:1.5};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    try {
        RUR.utils.set_nb_artefacts(args);
    } catch (e) {
        assert.equal(e.message, "Number must be a positive integer.", "error message ok");
    }
    assert.end();
});

// test('set_nb_artefacts: add too many', function (assert) {  
//     var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', max_nb:2};
//     assert.plan(1);  
//     RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
//     RUR.utils.set_nb_artefacts(args);
//     RUR.utils.set_nb_artefacts(args); // add 2 == max_nb
//     try {
//         RUR.utils.set_nb_artefacts(args); // attempt to add one more
//     } catch (e) {
//         assert.equal(e.message, "Cannot add more artefact of this kind.", "error message ok");
//     }
//     assert.end();
// });



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

test('get_nb_artefact: confirm goal present, added by hand', function (assert) {  
    var args = {x:2, y:3, valid_names: ['a'], name: 'a', type:'objects', goal:true};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.CURRENT_WORLD.goal = {};
    RUR.CURRENT_WORLD.goal.objects = {};
    RUR.CURRENT_WORLD.goal.objects["2,3"] = {'a': 1};
    assert.equal(RUR.utils.get_nb_artefact(args), 1, 'one goal object added by hand');
    assert.end();
});

test('set_nb_artefacts: adding goal object', function (assert) {  
    var args = {x:2, y:3, name: 'a', type:'objects', goal:true, number:3};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.set_nb_artefacts(args);
    assert.equal(RUR.utils.get_nb_artefact(args), 3, 'goal objects added correctly.');
    assert.end();
});

test('set_nb_artefacts: add to unknown type', function (assert) {  
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', number:12};
    assert.plan(1);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.utils.set_nb_artefacts(args);
    assert.equal(RUR.utils.get_nb_artefact(args), 12, "12 artefacts of one kind added.");
    assert.end();
});


// test('set_nb_artefacts: replace existing', function (assert) {  
//     var args = {x:2, y:3, name: 'a', type:'objects', replace: true};
//     assert.plan(1);  
//     RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
//     // create_empty_world does creates world.objects;
//     RUR.CURRENT_WORLD.objects["2,3"] = {'b': 25};
//     RUR.utils.set_nb_artefacts(args); // replace
//     assert.deepEqual(RUR.CURRENT_WORLD.objects["2,3"], {'a': 1}, 'replaced correctly');
//     assert.end();
// });