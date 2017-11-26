QUnit.module("Tutorial_en tests", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
    test_utils.program_dir = "/tests/integration_tests/tutorial_en/programs/";
    test_utils.world_dir = "/worlds/tutorial_en/";
    test_utils.runners = [test_utils.run_javascript_2, test_utils.run_python_2];
    }
});

QUnit.test("Home 1, 2, 3, 4", function(assert) {
    var py_js, w, program_files, world_files;
    var done = assert.async();

    program_files = ["home_en.js", "home_en.py"];
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];

    for (py_js in test_utils.runners){
        for (w in world_files) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[w], 
                test_utils.program_dir + program_files[py_js]
                );
            assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></ul>",
                "Feedback text ok.");
        }
    }

    done();
});

