QUnit.module("Tutorial_fr tests", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    test_utils.program_dir = "/tests/integration_tests/tutorial_fr/programs/";
    test_utils.world_dir = "/worlds/tutorial_fr/";
    test_utils.runners = [test_utils.run_javascript_2, test_utils.run_python_2];
    }
});


QUnit.test("Autour 1, 2, 3, 4", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["around_fr.js", "around_fr.py"];
    world_files = ["around1.json", "around2.json", "around3.json", "around4.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content,
                "Très bien fait !",
                info);
        }
    }
    done();
});


QUnit.test("But 1, 2, 3, 4", function(assert) {
    var py_js, world, program_files, world_files, info;
    var done = assert.async();
    program_files = ["home_fr.js", "home_fr.py"];
    world_files = ["home1.json", "home2.json", "home3.json", "home4.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
                info);
        }
    }
    done();
});


QUnit.test("Récolte 1, 2, 3", function(assert) {
    var py_js, info, program_files, world, world_files, message;
    var done = assert.async();
    program_files = ["harvest12_fr.js", "harvest12_fr.py"];
    world_files = ["harvest1.json", "harvest2.json"];
    message = "<p class=\"success\">Toutes les carottes ont été récoltées.</p>";

    // First two harvesting task
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files[world] + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files[world] + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content, message, "Feedback text ok.", info);
        }
    }

    // Third harvesting task
    message = "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></ul>";
    program_files = ["harvest3_fr.js", "harvest3_fr.py"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        world = test_utils.world_dir + "harvest3.json";
        test_utils.runners[py_js](world,
            test_utils.program_dir + program_files[py_js]
            );
        info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
        assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
        info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
        assert.equal(test_utils.content, message, info);
    }
    done();
});


QUnit.test("Haies 1, 2, 3, 4", function(assert) {
    var py_js, world, program_files, world_files, info;
    var done = assert.async();
    program_files = ["hurdle_fr.js", "hurdle_fr.py"];
    world_files = ["hurdle1.json", "hurdle2.json", "hurdle3.json", "hurdle4.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
                info);
        }
    }
    done();
});


QUnit.test("Labyrinthe", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["maze_fr.js", "maze_fr.py"];
    world_files = ["maze1.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li><li class='success'>Reeborg est à la bonne coordonnée y.</li></ul>",
                "Feedback text ok.");
        }
    }
    done();
});


QUnit.test("Rain 0, 1, 2", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["rain_fr.js", "rain_fr.py"];
    world_files = ["rain0.json", "rain1.json", "rain2.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>" +
                "<li class='success'>Reeborg est à la bonne coordonnée y.</li>" +
                "<li class='success'>Tous les murs ont été construits correctement.</li></ul>",
                info);
        }
    }
    done();
});


QUnit.test("Tempêtes 1, 2, 3, 4", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["storm_fr.js", "storm_fr.py"];
    world_files = ["storm1.json", "storm2.json", "storm3.json", "storm4.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>"+
                "<li class='success'>Reeborg est à la bonne coordonnée y.</li>"+
                "<li class='success'>Tous les objets sont aux bons endroits.</li></ul>",
                "Feedback text ok.");
        }
    }
    done();
});


QUnit.test("Jetons 1, 2, 3, 4, 5", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["tokens_fr.js", "tokens_fr.py"];
    world_files = ["tokens1.json", "tokens2.json", "tokens3.json", "tokens4.json", "tokens5.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            assert.equal(test_utils.content,
                "<ul><li class='success'>Reeborg est à la bonne coordonnée x.</li>"+
                "<li class='success'>Reeborg est à la bonne coordonnée y.</li>"+
                "<li class='success'>Tous les objets sont aux bons endroits.</li></ul>",
                "Feedback text ok.");
        }
    }
    done();
});


QUnit.test("Centrer 1, 2", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["center_fr.js", "center_fr.py"];
    world_files = ["center1.json", "center2.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                test_utils.world_dir + world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            assert.equal(test_utils.content,
                "<ul><li class='success'>Tous les objets sont aux bons endroits.</li></ul>",
                "Feedback text ok.");
        }
    }
    done();
});


// The following is NOT in the tutorial BUT it tests fatal obstacles
// and, more importantly, the handling of their translations.
// This test has been added after a bug was found
QUnit.test("Une marche d'expert", function(assert) {
    var py_js, info, program_files, world, world_files;
    var done = assert.async();
    program_files = ["around_fr.js", "around_fr.py"];
    world_files = ["/worlds/sk_fr/step14b.json"];
    for (py_js = 0; py_js < test_utils.runners.length; py_js++){
        for (world = 0; world < world_files.length; world++) {
            test_utils.runners[py_js](
                world_files[world],
                test_utils.program_dir + program_files[py_js]
                );
            info = "Feedback element ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.feedback_element, "#Reeborg-success", info);
            info = "Feedback text ok for " + world_files + " ; language = " + RUR.state.programming_language;
            assert.equal(test_utils.content, "Bien fait !", info);
        }
    }
    done();
});
