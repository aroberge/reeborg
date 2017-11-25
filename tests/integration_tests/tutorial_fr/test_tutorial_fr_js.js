QUnit.module("Tutorial_fr worlds: Javascript programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    RUR.state.programming_language = "javascript";
    }
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

QUnit.test("Home 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/worlds/tutorial_fr/";
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];

    test_utils.load_program("/tests/integration_tests/tutorial_fr/programs_js/home_fr.js");
    for (i in world_files) {
        assert.ok(test_utils.eval_javascript(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
        RUR.rec.conclude();
        assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
        assert.equal(test_utils.content,
            "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
            "Feedback text ok.");
    }
    done();
});

