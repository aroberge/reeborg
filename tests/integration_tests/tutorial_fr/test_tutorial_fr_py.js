QUnit.module("Tutorial worlds: French Python programs", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    RUR.state.programming_language = "python";
  }
});

QUnit.test("Home 1, 2, 3, 4", function(assert) {
    var base_url, i, world_files;
    var done = assert.async();
    base_url = "/worlds/tutorial_fr/";
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];

    test_utils.load_program("/tests/integration_tests/tutorial_fr/programs_py/home_fr.py");
    for (i in world_files) {
        assert.ok(test_utils.eval_python(base_url + world_files[i]).success,
                                      world_files[i] + " run successfully.");
        RUR.rec.conclude();
        assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
        assert.equal(test_utils.content,
            "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
            "Feedback text ok.");
    }
    done();
});

