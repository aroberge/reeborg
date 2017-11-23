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