QUnit.module("Examples from Vincent Maille", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
    test_utils.base_url = "/tests/integration_tests/vincent_maille/";
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
    assert.equal(last_frame.error.reeborg_failure,
                 "Il reste du fromage !",
                 "Failure to complete task properly recognized.");
    done();
});

