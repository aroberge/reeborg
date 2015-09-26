
QUnit.module("world.js");
QUnit.test( "Empty worlds", function(assert) {
    deepEqual(RUR.unit_tests.initial_world, RUR.unit_tests.empty_world, "Empty world initially created." );
    deepEqual(RUR.world.create_empty_world(), RUR.unit_tests.empty_world, "Empty world explicitly created.");
    ok(Object.identical(RUR.world.create_empty_world(), RUR.unit_tests.empty_world),
        "Empty world explictly created; compare with my own object-comparison method." );
});

QUnit.test("import_world", function(assert) {
    // throws(RUR.world.import_world(''), "Exception caught in import_world.");
    // deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty string." );
    //
    RUR.world.import_world(RUR.unit_tests.empty_world);
    deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty world as object." );
    //
    RUR.world.import_world(JSON.stringify(RUR.unit_tests.empty_world));
    deepEqual(RUR.current_world, RUR.unit_tests.empty_world, "Empty world created by importing empty world as string." );
});

QUnit.test("add_robot", function(assert) {
    _reset();
    RUR.world.add_robot(1);
    equal(RUR.current_world.robots[0], 1, "Added the number 1 as robot placeholder.");
    RUR.world.add_robot(2);
    equal(RUR.current_world.robots[1], 2, "Added the number 2 as second robot placeholder.");
    _reset();
    RUR.world.add_robot("frame1", true);
    equal(RUR.current_world.robots[0], "frame1", "Added the string frame1 as robot placeholder, with recording frame on.");
    RUR.world.add_robot("frame2", true);
    equal(RUR.current_world.robots[1], "frame2", "Added the string frame2 as robot placeholder, with recording frame on.");
    _reset();
});


QUnit.module("Testing framework self-consistency", {
  beforeEach: function() {
    _reset();  },
  afterEach: function() {
    _reset();
  }
});
QUnit.test("Load world", function(assert) {
    var url = "../../src/worlds/alone.json";
    var world_alone = {
        robots: [
                {
                  "x": 1,
                  "y": 1,
                  "orientation": 0,
                  "_prev_x": 1,
                  "_prev_y": 1,
                  "_prev_orientation": 0,
                  "objects": {}
                }
            ],
        walls: {},
        description: "A simple, empty world, ready for Reeborg to explore.\n<br>--<br><em>Un simple monde vide, que Reeborg peut explorer à sa guise.</em>",
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };

    _load_world_file(url);
    deepEqual(world_alone, RUR.current_world, "Ensuring loading world is done properly in testing framework.");
});

QUnit.module("runner.js : Javascript programs");
QUnit.test("Centre 1", function(assert) {
    var world_url = "../../src/worlds/tutorial_en/center1.json";
    ok(_run_javascript(world_url, "src/test_center1.js").success, "Centre1 run successfully.");
    notOk(_run_javascript(world_url, "src/test_center1_fail.js").success, "Failing program recognized as such.");
    notOk(_run_javascript(world_url, "src/test_syntax_fail.js").success, "Failing program (syntax error) recognized as such.");
});


QUnit.module("runner.js : Python programs");
QUnit.test("Centre 1", function(assert) {
    var world_url = "../../src/worlds/tutorial_en/center1.json";
    ok(_run_python(world_url, "src/test_center1.py").success, "Centre1 run successfully.");
    notOk(_run_python(world_url, "src/test_center1_fail.py").success, "Failing program recognized as such.");
    notOk(_run_python(world_url, "src/test_syntax_fail.py").success, "Failing program (syntax error) recognized as such.");
});
