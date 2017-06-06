QUnit.module("Examples from Advanced World Creation documentation", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("en");
  }
});

QUnit.test("Frame_insertion_1", function(assert) {
    var last_frame, result, world, done = assert.async();
    world = "/worlds/jsdoc/frame_insertion_1.json";
    last_frame = test_utils.run_world(world, "python");
    result = RUR.rec.handle_error(last_frame);
    assert.equal(result, "stopped", "program run successfully");
    assert.equal(test_utils.feedback_element, "#Reeborg-shouts", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<h3>WallCollisionError</h3><h4>Ouch! I hit a wall!</h4><p></p>",
        "Feedback text ok.");
    done();
});