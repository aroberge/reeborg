// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("artefact.js: ", test_name, fn);
}

// main module to test
require("../../../src/js/world_api/artefact.js");

/* =============================================

                  Testing exceptions

   For the method that checks if required arguments are found,
   we test every single possible exceptions once,
   trying to use different values each time.  The first time we
   do a test, we ensure that all the exception parameters
   (message, reeborg_failure, name) are correct, after which we focus
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
        assert.equal(e.reeborg_failure, "(0, 0) is an invalid position.", "reeborg_failure");
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
        RUR.untranslated['a'] = true;
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
        assert.equal(e.message, "Invalid name: d", "error message ok");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});



/*------------------------------------------------------------------------
        Single exception-raising test for each method to confirm they use
        the validating function.
 -------------------------------------------------------------------------*/

test('_get_nb_artefact: invalid name', function (assert) {
    var args = {x:2, y:2, valid_names: ['a'], name: 'A', type:'e', number:3};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR._get_nb_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Invalid name: A", "error message ok");
    }
    assert.end();
});
test('_set_nb_artefact: missing name', function (assert) {
    var args = {x:2, y:2, type:'e', number:4};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR._set_nb_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Object name must be specified.", "error message ok");
    }
    assert.end();
});
test('_set_nb_artefact: missing number', function (assert) {
    var args = {x:2, y:2, name: 'a', type:'unknown'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR._set_nb_artefact(args);
    } catch (e) {
        assert.equal(e.message, "Number of objects must be specified.", "error message ok");
    }
    assert.end();
});

test('_add_artefact: inconsistent use of single', function (assert) {
    var args_a = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', single:true},
        args_b = {x:2, y:2, valid_names: ['b'], name: 'b', type:'unknown'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    try {
        RUR._add_artefact(args_a);
    } catch (e) {
        assert.equal(e.message,
            "Inconsistent state: single type with more than one artefact present.",
            "error message ok");
    }
    assert.end();
});


/*-----------------------------------------------------------
                Testing functionality
---------------------------------------------------------------*/

test('_add_artefact: add to unknown type', function (assert) {
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args);
    assert.equal(RUR._get_nb_artefact(args), 1, "1 artefact added.");
    assert.deepEqual(RUR.CURRENT_WORLD.unknown["2,2"], ['a'], 'direct comparison with expected ok.');
    assert.end();
});

test('_add_artefact: adding goal object', function (assert) {
    var args = {x:2, y:3, name: 'a', type:'objects', goal:true};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args);
    assert.equal(RUR._get_nb_artefact(args), 1, 'goal objects added correctly.');
    assert.deepEqual(RUR.CURRENT_WORLD.goal.objects["2,3"], ['a'], 'direct comparison with expected ok.');
    assert.end();
});

test('_add_artefact: replace ok', function (assert) {
    var args_a = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', single:true},
        args_b = {x:2, y:2, valid_names: ['b'], name: 'b', type:'unknown', single:true};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    assert.equal(RUR._get_nb_artefact(args_b), 1, "1 artefact replaced.");
    assert.deepEqual(RUR.CURRENT_WORLD.unknown["2,2"], ['b'], 'direct comparison with expected ok.');
    assert.end();
});

test('_add_artefact: add after range was set', function (assert) {
    var args_set = {x:2, y:2, name: 'a', type:'unknown', number: "3-9"},
        args_add = {x:2, y:2, name: 'a', type:'unknown'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args_set);
    try {
        RUR._add_artefact(args_add);
    } catch (e) {
        assert.equal(e.message, 'Expected an array in RUR.utils.ensure_key_for_array_exists.');
        //assert.equal(e.message, "Cannot add number (integer) to range (string)", "error message ok");
    }
    assert.end();
});

test('_get_artefacts: confirm object present, array type added by hand', function (assert) {
    var args_a = {x:2, y:3, type:'objects'};
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.objects = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.objects["2,3"] = ['a', 'b'];
    assert.deepEqual(RUR._get_artefacts(args_a), ['a', 'b'], 'complete array returned');
    assert.end();
});

test('_get_artefacts: confirm objects present, array type added by function', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects'},
        args_b = {x:2, y:3, name:'b', type:'objects'},
        args = {x:2, y:3,  type:'objects'};
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.objects = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    assert.deepEqual(RUR._get_artefacts(args), ['a', 'b'], 'complete array returned');
    assert.end();
});

test('_get_artefacts: confirm objects present, object container type added by function', function (assert) {
    var args_a = {x:2, y:3, name:'a', number:4, type:'objects'},
        args_b = {x:2, y:3, name:'b', number:6, type:'objects'},
        args = {x:2, y:3,  type:'objects'};
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.objects = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR._set_nb_artefact(args_a);
    RUR._set_nb_artefact(args_b);
    assert.deepEqual(RUR._get_artefacts(args), {'a':4, 'b':6}, 'complete object returned');
    assert.end();
});


test('_get_artefacts: confirm goal present, array type added by hand', function (assert) {
    var args_a = {x:2, y:3, type:'objects', goal:true};
    assert.plan(4);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.goal = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.goal.objects = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.goal.objects["2,3"] = ['a', 'b'];
    assert.deepEqual(RUR._get_artefacts(args_a), ['a', 'b'], 'complete array returned');
    assert.end();
});

test('_get_artefacts: confirm goal present, array type added by function', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects', goal:true},
        args_b = {x:2, y:3, name:'b', type:'objects', goal:true};
    assert.plan(4);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.goal = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR.CURRENT_WORLD.goal.objects = {};
    assert.deepEqual(RUR._get_artefacts(args_a), null, 'no container yet');
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    assert.deepEqual(RUR._get_artefacts(args_a), ['a', 'b'], 'complete array returned');
    assert.end();
});

test('_get_nb_artefact: confirm missing, unknown type', function (assert) {
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown'};
    assert.plan(1);
    // create_empty_world does not create world.unknown;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.equal(RUR._get_nb_artefact(args), 0, "no object found.");
    assert.end();
});

test('_get_nb_artefact: confirm present, object type added by hand', function (assert) {
    var args = {x:2, y:3, valid_names: ['a'], name: 'a', type:'objects'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    // create_empty_world does creates world.objects;
    RUR.CURRENT_WORLD.objects["2,3"] = {'a': 1};
    assert.equal(RUR._get_nb_artefact(args), 1, 'one object added by hand');
    assert.end();
});

test('_get_nb_artefact: confirm goal present, object type added by hand', function (assert) {
    var args = {x:2, y:3, valid_names: ['a'], name: 'a', type:'objects', goal:true};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.CURRENT_WORLD.goal = {};
    RUR.CURRENT_WORLD.goal.objects = {};
    RUR.CURRENT_WORLD.goal.objects["2,3"] = {'a': 1};
    assert.equal(RUR._get_nb_artefact(args), 1, 'one goal object added by hand');
    assert.end();
});

test('_get_nb_artefact: confirm present, array type added by hand', function (assert) {
    var args_a = {x:2, y:3, name: 'a', type:'objects'};
    var args_c = {x:2, y:3, name: 'c', type:'objects'};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.CURRENT_WORLD.objects["2,3"] = ['a', 'b'];
    assert.equal(RUR._get_nb_artefact(args_a), 1, 'one object added by hand');
    assert.equal(RUR._get_nb_artefact(args_c), 0, 'not an object added by hand');
    assert.end();
});

test('_get_nb_artefact: confirm goal present, array type added by hand', function (assert) {
    var args_a = {x:2, y:3, name: 'a', type:'objects', goal:true};
    var args_c = {x:2, y:3, name: 'c', type:'objects', goal:true};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.CURRENT_WORLD.goal = {};
    RUR.CURRENT_WORLD.goal.objects = {};
    RUR.CURRENT_WORLD.goal.objects["2,3"] = ['a', 'b'];
    assert.equal(RUR._get_nb_artefact(args_a), 1, 'one goal object added by hand');
    assert.equal(RUR._get_nb_artefact(args_c), 0, 'not a goal object added by hand');
    assert.end();
});

test('_remove_artefact: add 2 remove 1 to array type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects'},
        args_b = {x:2, y:3, name:'b', type:'objects'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    RUR._remove_artefact(args_a);
    // name:'a'  should be ignored in call to get_artefacts
    assert.deepEqual(RUR._get_artefacts(args_a), ['b'], 'array with one element returned.');
    assert.end();
});

test('_remove_artefact: with goal, add 2 remove 1 to array type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects', goal:true},
        args_b = {x:2, y:3, name:'b', type:'objects', goal:true};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args_a);
    RUR._add_artefact(args_b);
    RUR._remove_artefact(args_a);
    // name:'a'  should be ignored in call to get_artefacts
    assert.deepEqual(RUR._get_artefacts(args_a), ['b'], 'array with one element returned.');
    assert.end();
});

test('_remove_artefact: add 1 remove 1 to array type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects'};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._add_artefact(args_a);
    RUR._remove_artefact(args_a);
    assert.deepEqual(RUR.CURRENT_WORLD.objects, undefined, 'nothing left');
    assert.end();
});

test('_remove_artefact: add 12 of one kind remove 1 to object type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects', number:12};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args_a);
    delete args_a["number"];
    RUR._remove_artefact(args_a);
    assert.deepEqual(RUR._get_nb_artefact(args_a), 11, '11 returned.');
    assert.end();
});

test('_remove_artefact: add 12 of one kind remove 1 to object type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects', number:1},
        args_b = {x:2, y:3, name:'b', type:'objects', number:3};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args_a);
    RUR._set_nb_artefact(args_b);
    RUR._remove_artefact(args_a);
    assert.deepEqual(RUR._get_nb_artefact(args_a), 0, 'None left');
    assert.deepEqual(RUR._get_nb_artefact(args_b), 3, '3 left untouched.');
    assert.end();
});

test('_remove_artefact: add 1 remove 1 to object type.', function (assert) {
    var args_a = {x:2, y:3, name:'a', type:'objects', number:1};
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args_a);
    RUR._remove_artefact(args_a);
    assert.deepEqual(RUR.CURRENT_WORLD.objects, undefined, 'nothing left');
    assert.end();
});

test('_set_nb_artefact: add to unknown type', function (assert) {
    var args = {x:2, y:2, valid_names: ['a'], name: 'a', type:'unknown', number:12};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args);
    assert.equal(RUR._get_nb_artefact(args), 12, "12 artefacts of one kind added.");
    assert.deepEqual(RUR.CURRENT_WORLD.unknown["2,2"], {'a':12}, 'direct comparison with expected ok.');
    assert.end();
});

test('_set_nb_artefact: adding goal object', function (assert) {
    var args = {x:2, y:3, name: 'a', type:'objects', goal:true, number:3};
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR._set_nb_artefact(args);
    assert.equal(RUR._get_nb_artefact(args), 3, 'goal objects added correctly.');
    assert.deepEqual(RUR.CURRENT_WORLD.goal.objects["2,3"], {'a':3}, 'direct comparison with expected ok.');
    assert.end();
});