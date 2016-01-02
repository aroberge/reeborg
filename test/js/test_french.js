
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
    RUR.unit_tests.reset();
    RUR.world.add_robot(1);
    equal(RUR.current_world.robots[0], 1, "Added the number 1 as robot placeholder.");
    RUR.world.add_robot(2);
    equal(RUR.current_world.robots[1], 2, "Added the number 2 as second robot placeholder.");
    RUR.unit_tests.reset();
    RUR.world.add_robot("frame1", true);
    equal(RUR.current_world.robots[0], "frame1", "Added the string frame1 as robot placeholder, with recording frame on.");
    RUR.world.add_robot("frame2", true);
    equal(RUR.current_world.robots[1], "frame2", "Added the string frame2 as robot placeholder, with recording frame on.");
    RUR.unit_tests.reset();
});


QUnit.module("Testing framework self-consistency", {
  beforeEach: function() {
    RUR.unit_tests.reset();  },
  afterEach: function() {
    RUR.unit_tests.reset();
  }
});
QUnit.test("Load world", function(assert) {
    var url = "/src/worlds/alone.json";
    var world_alone = {
        robots: [
                {
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
        description: "A simple, empty world, ready for Reeborg to explore.\n<br>--<br><em>Un simple monde vide, que Reeborg peut explorer à sa guise.</em>",
        "onload": "/* Javascript */",
        "post_code": "\"post code\"",
        "pre_code": "\"pre code\"",
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };

    RUR.unit_tests.load_world_file(url);
    deepEqual(world_alone, RUR.current_world, "Ensuring loading world is done properly in testing framework.");
});

QUnit.module(" runner.js : Javascript programs");
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    ok(RUR.unit_tests.eval_javascript(world_url, "/test/src/test_center1_fr.js").success, "Centre1 run successfully.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/test/src/test_center1_fail_fr.js").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_javascript(world_url, "/test/src/test_syntax_fail_fr.js").success, "Failing program (syntax error) recognized as such.");
});


QUnit.module("Failing Python programs");
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    notOk(RUR.unit_tests.eval_python(world_url, "/test/src/test_center1_fail_fr.py").success, "Failing program recognized as such.");
    notOk(RUR.unit_tests.eval_python(world_url, "/test/src/test_syntax_fail_fr.py").success, "Failing program (syntax error) recognized as such.");
});


QUnit.module("Tutorial worlds: Python programs");

QUnit.test("Around 1, 2, 3, 4", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;

    base_url = "/src/worlds/tutorial_en/";
    world_file = "around1.json";
    frames = RUR.unit_tests.run_python(base_url + world_file, "/test/src/around_fr.py");
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
    frames = RUR.unit_tests.run_python(base_url + world_file, "/test/src/around_fr.py");
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


QUnit.test("Center 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["center1.json", "center2.json", "center3.json"];
    RUR.unit_tests.load_program("/test/src/center_fr.py");
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
    RUR.unit_tests.load_program("/test/src/hurdle_fr.py");
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
    RUR.unit_tests.load_program("/test/src/hurdle_fr.py");
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
    RUR.unit_tests.load_program("/test/src/home_fr.py");
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
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/harvest1_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.rec.frames[RUR.rec.frames.length - 1];
    equal(last_frame.world.robots[0].objects.carrot, "infinite", "Nb of carrots carried.");

    RUR.rec.conclude();
    equal(RUR.unit_tests.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    equal(RUR.unit_tests.content,
        "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "harvest2.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/harvest2_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest3.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/harvest3_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest4a.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/harvest4_fr.py").success,
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
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/tokens1234_fr.py").success,
                                      world_file + " run successfully.");
    // Note: the program tokens1234_fr.py also test some translation

    last_frame = RUR.rec.frames[RUR.rec.frames.length - 1];
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
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/tokens56_fr.py").success,
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
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/rain_fr.py").success,
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
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/newspaper0_fr.py").success,
                                      world_file + " run successfully.");


    world_file = "newspaper1.json";
    ok(RUR.unit_tests.eval_python(base_url + world_file, "/test/src/newspaper_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.rec.frames[RUR.rec.frames.length - 1];
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
    last_frame = RUR.rec.frames[RUR.rec.frames.length - 1];
    deepEqual(last_frame.world.robots[0].objects, {"token": 3}, "3 tokens carried.");
});

QUnit.test("Storm 1, 2, 3; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    base_url = "/src/worlds/tutorial_en/";

    world_file = "storm1.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/test/src/storm1_fr.py");
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


    // loading library indirectly
    RUR.unit_tests.load_program("/test/src/storm_library_fr.py");
    RUR.unit_tests.library = RUR.unit_tests.program;

    world_file = "storm2.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/test/src/storm2_fr.py");
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

    world_file = "storm3.json";
    // reuse library as is ...

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = RUR.unit_tests.run_python(base_url + world_file, "/test/src/storm3_fr.py");
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
});
