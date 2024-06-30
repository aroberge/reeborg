
QUnit.module("Failing Python programs", {
  beforeEach: function() {
    test_utils.reset();  }
});

QUnit.test("Centre 1 - failing English", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.notOk(test_utils.eval_python(world_url, "/tests/integration_tests/programs/test_center1_fail.py").success, "Failing program recognized as such.");
    done();
});
QUnit.test("failing English program - syntax error", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.notOk(test_utils.eval_python(world_url, "/tests/integration_tests/programs/test_syntax_fail.py").success, "Failing program (syntax error) recognized as such.");
    done();
});
QUnit.test("Centre 1 - failing French", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("fr");
    assert.notOk(test_utils.eval_python(world_url, "/tests/integration_tests/programs/test_center1_fail_fr.py").success, "Failing program recognized as such.");
    done();
});
QUnit.test("Failing French program - syntax error", function(assert) {
    var world_url = "/src/worlds/tutorial_en/center1.json";
    var done = assert.async();
    test_utils.set_human_language("fr");
    assert.notOk(test_utils.eval_python(world_url, "/tests/integration_tests/programs/test_syntax_fail_fr.py").success, "Failing program (syntax error) recognized as such.");
    done();
});

QUnit.module("Tutorial worlds: English Python programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
  }
});


QUnit.test("Harvest 4", function(assert) { //TODO: Move this!!
    "use strict";
    var base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";


    world_file = "harvest4a.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/integration_tests/programs/harvest4_en.py").success,
                                      world_file + " run successfully.");
    done();
});

QUnit.test("Newspaper", function(assert) {
    "use strict";
    var last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";

    world_file = "newspaper1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/integration_tests/programs/newspaper_en.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world_map.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-success", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li>" +
        "<li class='success'>Reeborg is at the correct y position.</li>" +
        "<li class='success'>All objects are at the correct location.</li></ul>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world_map.robots[0].objects, {"token": 3}, "3 tokens carried.");
    done();
});


QUnit.module("Tutorial worlds: French Python programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
  }
});


QUnit.test("Newspaper", function(assert) {
    "use strict";
    var last_frame, base_url, world_file;
    var done = assert.async();
    base_url = "/src/worlds/tutorial_en/";
    world_file = "newspaper0.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/integration_tests/programs/newspaper0_fr.py").success,
                                      world_file + " run successfully.");


    world_file = "newspaper1.json";
    assert.ok(test_utils.eval_python(base_url + world_file, "/tests/integration_tests/programs/newspaper_fr.py").success,
                                      world_file + " run successfully.");

    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world_map.robots[0].objects, {"token": 5}, "5 tokens carried.");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-success", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
        "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
        "<li class='success'>Tous les objets sont aux bons endroits.</li></ul>",
        "Feedback text ok.");

    world_file = "newspaper2.json";
    assert.ok(test_utils.eval_python(base_url + world_file).success,
                                      world_file + " run successfully.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.deepEqual(last_frame.world_map.robots[0].objects, {"token": 3}, "3 tokens carried.");
    done();
});


QUnit.module("Advanced world creation API", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
    test_utils.base_url = "/worlds/examples/";
    RUR.state.programming_language = "python";
  }
});

QUnit.test("API: Testing add/remove/is/get",
           function(assert) {
    "use strict";
    var last_frame, done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "add_remove_is_get.json");
    // The code we wish to test is in the Pre editor; we
    // run a simple program as a test.
    RUR.runner.eval("done()");
    // 10 frames below is a lower bound; we chose this number as a sign
    // that the test has run correctly, but without making this test
    // "brittle", having to update it for something inconsequential
    // every time we make changes.
    assert.ok(RUR.frames.length > 10, "Pre has been executed.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_failure, "Done!", "Task run correctly.");
    done();
});

QUnit.test("API: Protection given by bridges",
           function(assert) {
    "use strict";
    var last_frame, done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "protection_bridge.json");
    // The code we wish to test is in the Pre editor; we
    // run a simple program as a test.
    RUR.runner.eval("done()");
    // 10 frames below is a lower bound; we chose this number as a sign
    // that the test has run correctly, but without making this test
    // "brittle", having to update it for something inconsequential
    // every time we make changes.
    assert.ok(RUR.frames.length > 10, "Pre has been executed.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_failure, "Done!", "Task run correctly.");
    done();
});

QUnit.test("API: Protection given by carried objects",
           function(assert) {
    "use strict";
    var last_frame, done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "protection_objects.json");
    // The code we wish to test is in the Pre editor; we
    // run a simple program as a test.
    RUR.runner.eval("example()");
    // 5 frames below is a lower bound; we chose this number as a sign
    // that the test has run correctly, but without making this test
    // "brittle", having to update it for something inconsequential
    // every time we make changes.
    assert.ok(RUR.frames.length > 10, "Pre has been executed.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_failure, "The wicked witch got me.", "Task run correctly.");
    done();
});

QUnit.test("API: Protection given by carried objects - second test function",
           function(assert) {
    "use strict";
    var last_frame, done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "protection_objects.json");
    RUR.runner.eval("test_front_is_clear()");
    assert.ok(RUR.frames.length > 10, "Pre has been executed.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_failure, "The wicked witch got me.", "Task run correctly.");
    done();
});
