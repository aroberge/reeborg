QUnit.module("world.js", {
  beforeEach: function() {
    RUR.unit_tests.reset();
  }
});
QUnit.test( "Empty worlds", function(assert) {
    deepEqual(RUR.unit_tests.initial_world, RUR.unit_tests.empty_world, "Empty world initially created." );
    deepEqual(RUR.create_empty_world(), RUR.unit_tests.empty_world, "Empty world explicitly created.");
    ok(RUR.object_identical(RUR.create_empty_world(), RUR.unit_tests.empty_world),
        "Empty world explictly created; compare with my own object-comparison method." );
});
QUnit.test("import_world", function(assert) {
    RUR.world.import_world(RUR.unit_tests.empty_world);
    deepEqual(RUR.CURRENT_WORLD, RUR.unit_tests.empty_world, "Empty world created by importing empty world as object." );
    //
    RUR.world.import_world(JSON.stringify(RUR.unit_tests.empty_world));
    deepEqual(RUR.CURRENT_WORLD, RUR.unit_tests.empty_world, "Empty world created by importing empty world as string." );
});

QUnit.module("Testing framework self-consistency", {
  beforeEach: function() {
    RUR.unit_tests.reset();
  }
});
QUnit.test("Load world", function(assert) {
    var url = "/src/worlds/alone.json";
    var world_alone = {
        robots: [ {
                  "x": 1,
                  "y": 1,
                  "_orientation": 0,
                  "_prev_x": 1,
                  "_prev_y": 1,
                  "_prev_orientation": 0,
                  "objects": {}
                }
            ],
        walls: {},
        description: "A simple, empty world, ready for Reeborg to explore.",
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };

    RUR.unit_tests.load_world_file(url);
    deepEqual(world_alone, RUR.CURRENT_WORLD, "Ensuring loading world is done properly in testing framework.");
});

QUnit.module("file_io.js tests", {
  beforeEach: function() {
    RUR.unit_tests.reset();
    RUR.unit_tests.set_human_language("en");
  }
});
QUnit.test("Load world without running program", function(assert) {
    var done = assert.async();
    contents = [["/src/worlds/tutorial_en/home1.json", "Home 1"],
                ["/src/worlds/tutorial_en/home2.json", "Home 2"]];
    RUR.custom_world_select.make(contents);
    assert.throws(function() {RUR.file_io.load_world_from_program('Home 2');},
                 "Raised expected 'error' from successfully loading Home 2.");
    // the previous error is not caught by a running program and no feedback element
    // is shown.

    equal(RUR.file_io.load_world_from_program('Home 2'), "no world change",
          "Loading world twice does not generate an error.");
    assert.throws(function() {RUR.file_io.load_world_from_program('Alone');},
                 "Raised expected error from loading non-existent world.");
    equal(RUR.unit_tests.feedback_element, "#Reeborg-shouts", "Feedback element ok.");
    equal(RUR.unit_tests.content, "Could not find link: Alone", "Feedback content ok.");
    done();
});
QUnit.test("Load world by running Python programs", function(assert) {
    "use strict";
    var frames, last_frame, contents;
    contents = [["/src/worlds/tutorial_en/home1.json", "Home 1"],
                ["/src/worlds/tutorial_en/home2.json", "Home 2"]];
    RUR.custom_world_select.make(contents);

    // first select world Home 2 as our current default
    assert.throws(function() {RUR.file_io.load_world_from_program('Home 2');},
                 "Raised expected 'error' from successfully loading Home 2.");

    // select world from program
    RUR.unit_tests.run_python(null, "/qunit_test/src/select_home1_en.py");
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element expected.");
    equal(RUR.unit_tests.content, "World Home 1 selected");

    // second time runs the rest of the program as the correct world is selected
    RUR.unit_tests.run_python(null, "/qunit_test/src/select_home1_en.py");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");

});

QUnit.module(" runner.js : Javascript programs", {
  beforeEach: function() {
    RUR.unit_tests.reset();  }
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    RUR.unit_tests.set_human_language("en");
    ok(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_center1.js").success, "Centre1 run successfully.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_center1_fail.js").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_syntax_fail.js").success, "Failing program (syntax error) recognized as such.");
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    RUR.unit_tests.set_human_language("fr");
    ok(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_center1_fr.js").success, "Centre1 run successfully.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_center1_fail_fr.js").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/qunit_test/src/test_syntax_fail_fr.js").success, "Failing program (syntax error) recognized as such.");
});
QUnit.test("Failed goal with zero frame recorded", function(assert) {
    RUR.unit_tests.set_human_language("en");
    RUR.state.programming_language = "javascript";
    RUR.unit_tests.load_world_file("/src/worlds/tutorial_en/center1.json");
    RUR.unit_tests.load_program("/qunit_test/src/test_center1_fail2.js");
    RUR.runner.eval(RUR.unit_tests.program);
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-shouts", "Failure properly recognized.");
});

QUnit.module("Failing Python programs", {
  beforeEach: function() {
    RUR.unit_tests.reset();  }
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    RUR.unit_tests.set_human_language("en");
    notOk(RUR.unit_tests.eval_python(world_url, "/qunit_test/src/test_center1_fail.py").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_python(world_url, "/qunit_test/src/test_syntax_fail.py").success, "Failing program (syntax error) recognized as such.");
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    RUR.unit_tests.set_human_language("fr");
    notOk(RUR.unit_tests.eval_python(world_url, "/qunit_test/src/test_center1_fail_fr.py").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_python(world_url, "/qunit_test/src/test_syntax_fail_fr.py").success, "Failing program (syntax error) recognized as such.");
});

QUnit.module("Tutorial worlds: English Python programs", {
  beforeEach: function() {
    RUR.unit_tests.reset();
    RUR.unit_tests.set_human_language("en");
  }
});

QUnit.test("Around 1, 2, 3, 4", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;

    base_url = "/src/worlds/tutorial_en/";
    world_file = "around1.json";
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/around_en.py");
    equal(frames.length, 40, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<p class='center'>Last instruction completed!</p>",
        "Feedback text ok.");

    world_file = "around2.json";
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/around_en.py");
    equal(frames.length, 44, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");

    world_file = "around3.json";
    frames = RUR.unit_tests.run_python(base_url + world_file);
    equal(frames.length, 55, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");

    world_file = "around4.json";
    frames = RUR.unit_tests.run_python(base_url + world_file);
    equal(frames.length, 61, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<p class='center'>Last instruction completed!</p>",
        "Feedback text ok.");
});
QUnit.test("Center 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["center1.json", "center2.json", "center3.json"];
    RUR.unit_tests.load_program("/qunit_test/src/center_en.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Hurdles 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    RUR.unit_tests.set_human_language("en");
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["hurdle1.json", "hurdle2.json", "hurdle3.json", "hurdle4.json"];
    RUR.unit_tests.load_program("/qunit_test/src/hurdle_en.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Maze 1, 2", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["maze1.json", "maze2.json"];

    // The general program for the hurdles works for the maze world!
    RUR.unit_tests.load_program("/qunit_test/src/hurdle_en.py");
    //**************************************************
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Home 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["home1.json", "home2.json", "home3.json"];
    RUR.unit_tests.load_program("/qunit_test/src/home_en.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Harvests", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";

    world_file = "harvest1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest1_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    equal(last_frame.world.robots[0].objects.carrot, "infinite", "Nb of carrots carried.");

    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "harvest2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest2_en.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest3.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest3_en.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest4a.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest4_en.py").success,
                                      world_file + " run successfully.");
    // reuse same program
    world_file = "harvest4b.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4c.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4d.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
});
QUnit.test("Tokens", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");

    world_file = "tokens1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/tokens1234_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {}, "No objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "tokens2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens3.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens4.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

    world_file = "tokens5.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/tokens56_en.py").success,
                                      world_file + " run successfully.");
    world_file = "tokens6.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

});
QUnit.test("Rain", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");

    world_file = "rain1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/rain_en.py").success,
                                      world_file + " run successfully.");

    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");

    world_file = "rain2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
});
QUnit.test("Newspaper", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");

    world_file = "newspaper1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/newspaper_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {"token": 3}, "3 tokens carried.");
});
QUnit.test("Storm 1", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");

    world_file = "storm1.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm1_en.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm1: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");


});
QUnit.test("Storm 2; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");

    // loading library indirectly
    RUR.unit_tests.load_program("/qunit_test/src/storm_library_en.py");
    RUR.unit_tests.library = RUR.unit_tests.program;
    world_file = "storm2.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm2_en.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm2: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");

    });
QUnit.test("Storm 3; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    RUR.unit_tests.set_human_language("en");
    world_file = "storm3.json";
    // loading library indirectly
    RUR.unit_tests.load_program("/qunit_test/src/storm_library_en.py");
    RUR.unit_tests.library = RUR.unit_tests.program;

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    RUR.unit_tests.set_human_language("en"); // make sure it is set correctly
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm3_en.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm3: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");
});

QUnit.module("Tutorial worlds: French Python programs", {
  beforeEach: function() {
    RUR.unit_tests.reset();
    RUR.unit_tests.set_human_language("fr");
  }
});

QUnit.test("Around 1, 2, 3, 4", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;

    base_url = "/src/worlds/tutorial_en/";
    world_file = "around1.json";
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/around_fr.py");
    equal(frames.length, 40, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<p class='center'>Dernière instruction complétée!</p>",
        "Feedback text ok.");

    world_file = "around2.json";
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/around_fr.py");
    equal(frames.length, 44, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");

    world_file = "around3.json";
    frames = RUR.unit_tests.run_python(base_url + world_file);
    equal(frames.length, 55, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");

    world_file = "around4.json";
    frames = RUR.unit_tests.run_python(base_url + world_file);
    equal(frames.length, 61, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<p class='center'>Dernière instruction complétée!</p>",
        "Feedback text ok.");
});
QUnit.test("Centre 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["center1.json", "center2.json", "center3.json"];
    RUR.unit_tests.load_program("/qunit_test/src/center_fr.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Hurdles 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["hurdle1.json", "hurdle2.json", "hurdle3.json", "hurdle4.json"];
    RUR.unit_tests.load_program("/qunit_test/src/hurdle_fr.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Maze 1, 2", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["maze1.json", "maze2.json"];

    // The general program for the hurdles works for the maze world!
    RUR.unit_tests.load_program("/qunit_test/src/hurdle_fr.py");
    //**************************************************
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Home 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["home1.json", "home2.json", "home3.json"];
    RUR.unit_tests.load_program("/qunit_test/src/home_fr.py");
    for (i in world_files) {
        ok(RUR.unit_tests.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
});
QUnit.test("Harvests", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";

    world_file = "harvest1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest1_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    equal(last_frame.world.robots[0].objects.carrot, "infinite", "Nb of carrots carried.");

    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "harvest2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest2_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest3.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest3_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest4a.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/harvest4_fr.py").success,
                                      world_file + " run successfully.");
    // reuse same program
    world_file = "harvest4b.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4c.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4d.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
});
QUnit.test("Tokens", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";

    world_file = "tokens1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/tokens1234_fr.py").success,
                                      world_file + " run successfully.");
    // Note: the program tokens1234_fr.py also test some translation

    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {}, "No objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "tokens2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens3.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens4.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

    world_file = "tokens5.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/tokens56_fr.py").success,
                                      world_file + " run successfully.");
    world_file = "tokens6.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

});
QUnit.test("Rain", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";

    world_file = "rain1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/rain_fr.py").success,
                                      world_file + " run successfully.");

    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");

    world_file = "rain2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
});
QUnit.test("Newspaper", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";
    world_file = "newspaper0.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/newspaper0_fr.py").success,
                                      world_file + " run successfully.");


    world_file = "newspaper1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/qunit_test/src/newspaper_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {"token": 3}, "3 tokens carried.");
});
QUnit.test("Storm 1", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "storm1.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm1_fr.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm1: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Storm 2; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    // loading library indirectly
    RUR.unit_tests.load_program("/qunit_test/src/storm_library_fr.py");
    RUR.unit_tests.library = RUR.unit_tests.program;

    world_file = "storm2.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm2_fr.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm2: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Storm 3; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    // loading library indirectly
    RUR.unit_tests.load_program("/qunit_test/src/storm_library_fr.py");
    RUR.unit_tests.library = RUR.unit_tests.program;

    world_file = "storm3.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.

    frames = RUR.unit_tests.run_python(base_url + world_file, "/qunit_test/src/storm3_fr.py");
    last_frame = frames[frames.length-1];
    deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm3: no objects carried.");
    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");
    done();
});
