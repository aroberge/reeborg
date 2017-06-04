QUnit.module("Examples from Vincent Maille", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    test_utils.base_url = "/tests/functional_tests/vincent_maille/";
    RUR.state.programming_language = "python";
  }
});

QUnit.test("L3: Test obsolete RUR.add_object_image; test nouvelles_images_de_robot",
           function(assert) {
    "use strict";
    var last_frame, done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "l3.json");
    // We run a program that is definitely **not** a solution for this world.
    RUR.runner.eval("avance()");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_shouts,
                 "Il reste du fromage !",
                 "Failure properly recognized.");
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
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></ul>",
        "Feedback text ok.");
    done();
});