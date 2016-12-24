
QUnit.module(" runner.js : Javascript programs", {
  beforeEach: function() {
    test_utils.reset();  }
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.ok(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_center1.js").success, "Centre1 run successfully.");
    assert.notOk(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_center1_fail.js").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_syntax_fail.js").success, "Failing program (syntax error) recognized as such.");
    done();
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("fr");
    assert.ok(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_center1_fr.js").success, "Centre1 run successfully.");
    assert.notOk(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_center1_fail_fr.js").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_javascript(world_url, "/tests/functional_tests/programs/test_syntax_fail_fr.js").success, "Failing program (syntax error) recognized as such.");
    done();
});
QUnit.test("Failed goal with zero frame recorded", function(assert) {
    var done = assert.async();
    test_utils.set_human_language("en");
    RUR.state.programming_language = "javascript";
    test_utils.load_world_file("/src/worlds/tutorial_en/center1.json");
    test_utils.load_program("/tests/functional_tests/programs/test_center1_fail2.js");
    RUR.runner.eval(test_utils.program);
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-shouts", "Failure properly recognized.");
    done();
});

QUnit.module("Failing Python programs", {
  beforeEach: function() {
    test_utils.reset();  }
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.notOk(test_utils.eval_python(world_url, "/tests/functional_tests/programs/test_center1_fail.py").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_python(world_url, "/tests/functional_tests/programs/test_syntax_fail.py").success, "Failing program (syntax error) recognized as such.");
    done();
});
QUnit.test("Centre 1", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("fr");
    assert.notOk(test_utils.eval_python(world_url, "/tests/functional_tests/programs/test_center1_fail_fr.py").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_python(world_url, "/tests/functional_tests/programs/test_syntax_fail_fr.py").success, "Failing program (syntax error) recognized as such.");
    done();
});

QUnit.module("Tutorial worlds: English Python programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
  }
});

QUnit.test("Around 1, 2, 3, 4", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_file = "around1.json";
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/around_en.py");
    assert.equal(frames.length, 41, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<p class='center'>Last instruction completed!</p>",
        "Feedback text ok.");

    world_file = "around2.json";
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/around_en.py");
    assert.equal(frames.length, 45, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");

    world_file = "around3.json";
    frames = test_utils.run_python(base_url + world_file);
    assert.equal(frames.length, 56, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");

    world_file = "around4.json";
    frames = test_utils.run_python(base_url + world_file);
    assert.equal(frames.length, 62, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<p class='center'>Last instruction completed!</p>",
        "Feedback text ok.");
    done();
});
QUnit.test("Center 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["center1.json", "center2.json", "center3.json"];
    test_utils.load_program("/tests/functional_tests/programs/center_en.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Hurdles 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    test_utils.set_human_language("en");
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["hurdle1.json", "hurdle2.json", "hurdle3.json", "hurdle4.json"];
    test_utils.load_program("/tests/functional_tests/programs/hurdle_en.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Maze 1, 2", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["maze1.json", "maze2.json"];

    // The general program for the hurdles works for the maze world!
    test_utils.load_program("/tests/functional_tests/programs/hurdle_en.py");
    //**************************************************
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Home 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["home1.json", "home2.json", "home3.json"];
    test_utils.load_program("/tests/functional_tests/programs/home_en.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Harvests", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "harvest1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest1_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.world.robots[0].objects.carrot, "infinite", "Nb of carrots carried.");

    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "harvest2.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest2_en.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest3.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest3_en.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest4a.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest4_en.py").success,
                                      world_file + " run successfully.");
    // reuse same program
    world_file = "harvest4b.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4c.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4d.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Tokens", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");

    world_file = "tokens1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/tokens1234_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "No objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "tokens2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens3.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens4.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

    world_file = "tokens5.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/tokens56_en.py").success,
                                      world_file + " run successfully.");
    world_file = "tokens6.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Rain", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");

    world_file = "rain1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/rain_en.py").success,
                                      world_file + " run successfully.");

    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");

    world_file = "rain2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Newspaper", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");

    world_file = "newspaper1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/newspaper_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li></u>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {"token": 3}, "3 tokens carried.");
    done();
});
QUnit.test("Storm 1", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");

    world_file = "storm1.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm1_en.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm1: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Storm 2; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();    
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");

    // loading library indirectly
    test_utils.load_program("/tests/functional_tests/programs/storm_library_en.py");
    test_utils.library = test_utils.program;
    world_file = "storm2.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm2_en.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm2: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");
    done();
    });
QUnit.test("Storm 3; also tests library", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    test_utils.set_human_language("en");
    world_file = "storm3.json";
    // loading library indirectly
    test_utils.load_program("/tests/functional_tests/programs/storm_library_en.py");
    test_utils.library = test_utils.program;

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    test_utils.set_human_language("en"); // make sure it is set correctly
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm3_en.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm3: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li>" +
        "<li class='success'>All walls have been built correctly.</li></u>",
        "Feedback text ok.");
    done();
});

QUnit.module("Tutorial worlds: French Python programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
  }
});

QUnit.test("Around 1, 2, 3, 4", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_file = "around1.json";
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/around_fr.py");
    assert.equal(frames.length, 41, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<p class='center'>Dernière instruction complétée!</p>",
        "Feedback text ok.");

    world_file = "around2.json";
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/around_fr.py");
    assert.equal(frames.length, 45, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 1, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['1,1'].token, 1, "Token put down.");

    world_file = "around3.json";
    frames = test_utils.run_python(base_url + world_file);
    assert.equal(frames.length, 56, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");

    world_file = "around4.json";
    frames = test_utils.run_python(base_url + world_file);
    assert.equal(frames.length, 62, "Nb of frames for solution for world " + world_file);
    last_frame = frames[frames.length-1];
    assert.equal(last_frame.world.robots[0].x, 2, "x-position of robot.");
    assert.equal(last_frame.world.robots[0].y, 1, "y-position of robot.");
    assert.equal(last_frame.world.robots[0].objects.token, "infinite", "Nb of tokens carried.");
    assert.equal(last_frame.world.objects['2,1'].token, 1, "Token put down.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<p class='center'>Dernière instruction complétée!</p>",
        "Feedback text ok.");
    done();
});
QUnit.test("Centre 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["center1.json", "center2.json", "center3.json"];
    test_utils.load_program("/tests/functional_tests/programs/center_fr.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Hurdles 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["hurdle1.json", "hurdle2.json", "hurdle3.json", "hurdle4.json"];
    test_utils.load_program("/tests/functional_tests/programs/hurdle_fr.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Maze 1, 2", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["maze1.json", "maze2.json"];

    // The general program for the hurdles works for the maze world!
    test_utils.load_program("/tests/functional_tests/programs/hurdle_fr.py");
    //**************************************************
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Home 1, 2, 3", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_files = ["home1.json", "home2.json", "home3.json"];
    test_utils.load_program("/tests/functional_tests/programs/home_fr.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
    }
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></u>",
        "Feedback text ok.");
    done();
});
QUnit.test("Harvests", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "harvest1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest1_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.world.robots[0].objects.carrot, "infinite", "Nb of carrots carried.");

    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "harvest2.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest2_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest3.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest3_fr.py").success,
                                      world_file + " run successfully.");

    world_file = "harvest4a.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/harvest4_fr.py").success,
                                      world_file + " run successfully.");
    // reuse same program
    world_file = "harvest4b.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4c.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "harvest4d.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Tokens", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "tokens1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/tokens1234_fr.py").success,
                                      world_file + " run successfully.");
    // Note: the program tokens1234_fr.py also test some translation

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "No objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "tokens2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens3.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    world_file = "tokens4.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");

    world_file = "tokens5.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/tokens56_fr.py").success,
                                      world_file + " run successfully.");
    world_file = "tokens6.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Rain", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "rain1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/rain_fr.py").success,
                                      world_file + " run successfully.");

    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");

    world_file = "rain2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    done();
});
QUnit.test("Newspaper", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_file = "newspaper0.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/newspaper0_fr.py").success,
                                      world_file + " run successfully.");


    world_file = "newspaper1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/functional_tests/programs/newspaper_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li></u>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world.robots[0].objects, {"token": 3}, "3 tokens carried.");
    done();
});
QUnit.test("Storm 1", function(assert) {
    "use strict";
    var frames, last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "storm1.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm1_fr.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm1: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
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
    test_utils.load_program("/tests/functional_tests/programs/storm_library_fr.py");
    test_utils.library = test_utils.program;

    world_file = "storm2.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.
    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm2_fr.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm2: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
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
    test_utils.load_program("/tests/functional_tests/programs/storm_library_fr.py");
    test_utils.library = test_utils.program;

    world_file = "storm3.json";

    // Need to use run_python instead of eval_python to have initially
    // random values set.

    frames = test_utils.run_python(base_url + world_file, "/tests/functional_tests/programs/storm3_fr.py");
    last_frame = frames[frames.length-1];
    assert.deepEqual(last_frame.world.robots[0].objects, {}, "Testing storm3: no objects carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li>" +
        "<li class='success'>Tous les murs ont été construits correctement.</li></u>",
        "Feedback text ok.");
    done();
});
