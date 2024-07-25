QUnit.module("Examples from Advanced World Creation documentation", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
    test_utils.base_url = "/worlds/examples/";
  }
});

// TODO: recreate frame insertion and test it properly
//
// QUnit.test("Frame_insertion_1", function(assert) {
//     var last_frame, result, world, done = assert.async();
//     world = "/worlds/jsdoc/frame_insertion_1.json";
//     last_frame = test_utils.run_world(world, "python");
//     result = RUR.rec.handle_error(last_frame);
//     assert.equal(result, "stopped", "program run successfully");
//     assert.equal(test_utils.feedback_element, "#Reeborg-failure", "Feedback element ok.");
//     assert.equal(test_utils.content,
//         "<h3>WallCollisionError</h3><p>Ouch! I hit a wall!</p><p></p>",
//         "Feedback text ok.");
//     done();
// });

QUnit.test("colors", function(assert) {
    var last_frame;
    const done = assert.async();
    test_utils.load_world_file(test_utils.base_url + "colors.json");
    // The code we wish to test is in the Pre editor; we
    // run a simple program as a test.
    RUR.runner.eval("done()");
    // 10 frames below is a lower bound; we chose this number as a sign
    // that the test has run correctly, but without making this test
    // "brittle", having to update it for something inconsequential
    // every time we make changes.
    assert.ok(RUR.frames.length > 10, "Pre has been executed.");
    last_frame = RUR.frames[RUR.frames.length - 1];
    assert.equal(last_frame.error.reeborg_failure, "Done!", "Task run correctly.");
    done();
});