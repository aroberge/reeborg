QUnit.module("Tutorial_en worlds: Javascript programs", {
  beforeEach: function() {
    test_utils.reset();  }
});

QUnit.test("Centre 1", function(assert) {
    var programs_path = "/tests/integration_tests/tutorial_en/programs_js/",
        worlds_path = "/src/worlds/tutorial_en/",
        world_url = worlds_path + "center1.json",
        done = assert.async();
    test_utils.set_human_language("en");
    assert.ok(test_utils.eval_javascript(world_url, programs_path + "test_center1.js").success, "Centre1 run successfully.");
    assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_center1_fail.js").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_syntax_fail.js").success, "Failing program (syntax error) recognized as such.");
    done();
});
QUnit.test("Failed goal with zero frame recorded", function(assert) {
    var programs_path = "/tests/integration_tests/tutorial_en/programs_js/",
        worlds_path = "/src/worlds/tutorial_en/",
        world_url = worlds_path + "center1.json",
        done = assert.async();
    test_utils.set_human_language("en");
    RUR.state.programming_language = "javascript";
    test_utils.load_world_file(worlds_path + "center1.json");
    test_utils.load_program(programs_path + "test_center1_fail2.js");
    RUR.runner.eval(test_utils.program);
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-shouts", "Failure properly recognized.");
    done();
});

QUnit.test("Home 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/worlds/tutorial_en/";
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];

    test_utils.set_human_language("en");
    RUR.state.programming_language = "javascript";

    test_utils.load_program("/tests/integration_tests/tutorial_en/programs_js/home_en.js");
    for (i in world_files) {
        assert.ok(test_utils.eval_javascript(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
        RUR.rec.conclude();
        assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
        assert.equal(test_utils.content,
            "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></ul>",
            "Feedback text ok.");
    }
    done();
});

