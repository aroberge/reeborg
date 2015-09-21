// testing of English version
RUR.unit_tests = {};
// Initial world should be created upon loading world.js module
RUR.unit_tests.initial_world = RUR.current_world;
RUR.unit_tests.empty_world = {robots: [],
        objects: {},
        walls: {},
        pre_code: '',
        post_code: '',
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };

QUnit.module("world.js");
QUnit.test( "Empty worlds", function(assert) {
    deepEqual(RUR.unit_tests.initial_world, RUR.unit_tests.empty_world, "Empty world initially created." );
    deepEqual(RUR.world.create_empty_world(), RUR.unit_tests.empty_world, "Empty world explicitly created.");
    ok(Object.identical(RUR.world.create_empty_world(), RUR.unit_tests.empty_world),
        "Empty world explictly created; compare with my own object-comparison method." );
});

QUnit.test("import_world", function(assert) {
    throws(RUR.world.import_world(''), "Exception caught in import_world.");
    deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty string." );
    //
    RUR.world.import_world(RUR.unit_tests.empty_world);
    deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty world as object." );
    //
    RUR.world.import_world(JSON.stringify(RUR.unit_tests.empty_world));
    deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty world as string." );
});
