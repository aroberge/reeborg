QUnit.module("Tutorial_fr worlds: Javascript programs", {
  beforeEach: function() {
    test_utils.reset();  }
});
var programs_path = "/tests/integration_tests/tutorial_fr/programs_js/",
    worlds_path = "/src/worlds/tutorial_en/";  //TODO: fix this by moving tutorial file

QUnit.test("Centre 1", function(assert) {
    var programs_path = "/tests/integration_tests/tutorial_fr/programs_js/",
        worlds_path = "/src/worlds/tutorial_en/",  //TODO: fix this  by moving tutorial file
        world_url = worlds_path + "center1.json",
        done = assert.async();
    test_utils.set_human_language("fr");
    assert.ok(test_utils.eval_javascript(world_url, programs_path + "test_center1_fr.js").success, "Centre1 run successfully.");
    assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_center1_fail_fr.js").success, "Failing program recognized as such.");
    assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_syntax_fail_fr.js").success, "Failing program (syntax error) recognized as such.");
    done();
});
