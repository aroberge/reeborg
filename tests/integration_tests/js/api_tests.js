QUnit.module("API module", {
  beforeEach: function() {
    test_utils.reset();
    test_utils.set_human_language("fr");
  }
});

QUnit.test("background_en", function(assert) {
    var world_url = "/src/worlds/tutorial_en/alone.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.ok(test_utils.eval_python(world_url,
        "/tests/integration_tests/programs/background_en.py").success,
        "background_en run successfully.");
    done();
});
QUnit.test("background_fr", function(assert) {
    var world_url = "/src/worlds/tutorial_en/alone.json";
    var done = assert.async();
    test_utils.set_human_language("fr");
    assert.ok(test_utils.eval_python(world_url,
        "/tests/integration_tests/programs/background_fr.py").success,
        "background_fr run successfully.");
    done();
});