QUnit.module("Tutorial_fr tests", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    test_utils.program_dir = "/tests/integration_tests/tutorial_fr/programs/";
    test_utils.world_dir = "/worlds/tutorial_fr/";
    test_utils.runners = [test_utils.run_javascript_2, test_utils.run_python_2];
    }
});
// var programs_path = "/tests/integration_tests/tutorial_fr/programs/",
//     worlds_path = "/src/worlds/tutorial_en/";  //TODO: fix this by moving tutorial file

// QUnit.test("Centre 1", function(assert) {
//     var programs_path = "/tests/integration_tests/tutorial_fr/programs/",
//         worlds_path = "/src/worlds/tutorial_en/",  //TODO: fix this  by moving tutorial file
//         world_url = worlds_path + "center1.json",
//         done = assert.async();
//     test_utils.set_human_language("fr");
//     assert.ok(test_utils.eval_javascript(world_url, programs_path + "test_center1_fr.js").success, "Centre1 run successfully.");
//     assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_center1_fail_fr.js").success, "Failing program recognized as such.");
//     assert.notOk(test_utils.eval_javascript(world_url, programs_path + "test_syntax_fail_fr.js").success, "Failing program (syntax error) recognized as such.");
//     done();
// });
// 

QUnit.test("Autour 1, 2, 3, 4", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["around_fr.js", "around_fr.py"];
    world_files = ["around1.json", "around2.json", "around3.json", "around4.json"];
    for (py_js in test_utils.runners){
        for (world in world_files) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world], 
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-concludes", info);
            assert.equal(test_utils.content,
                "Très bien fait !",
                "Feedback text ok.");
        }
    }
    done();
});

QUnit.test("But 1, 2, 3, 4", function(assert) {
    var py_js, w, program_files, world_files;
    var done = assert.async();

    program_files = ["home_fr.js", "home_fr.py"];
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];

    for (py_js in test_utils.runners){
        for (w in world_files) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[w], 
                test_utils.program_dir + program_files[py_js]
                );
            assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
                "Feedback text ok.");
        }
    }

    done();
});

