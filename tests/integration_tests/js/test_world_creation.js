
// we cannot predict what the robot id will be when we create a
// world and wish to compare it with some predictable state.
function remove_robot_id(world) {
  try {
      delete world.robots[0].__id;
    } catch (e) {}
  return world;
}

QUnit.module("World creation, loading, and format consistency", {
  beforeEach: function() {
    test_utils.reset();
  }
});
QUnit.test( "Empty worlds", function(assert) {
    assert.deepEqual(test_utils.initial_world, test_utils.empty_world, "Empty world initially created." );
    RUR.create_empty_world();
    assert.deepEqual(remove_robot_id(RUR.CURRENT_WORLD), test_utils.empty_world, "Empty world explicitly created.");
    assert.ok(RUR.FuncTest.object_identical(remove_robot_id(RUR.CURRENT_WORLD), test_utils.empty_world),
        "Empty world explictly created; compare with my own object-comparison method." );
});
QUnit.test("import_world", function(assert) {
    RUR.world_utils.import_world(test_utils.empty_world);
    assert.deepEqual(remove_robot_id(RUR.CURRENT_WORLD), test_utils.empty_world, "Empty world created by importing empty world as object." );
    //
    RUR.world_utils.import_world(JSON.stringify(test_utils.empty_world));
    assert.deepEqual(remove_robot_id(RUR.CURRENT_WORLD), test_utils.empty_world, "Empty world created by importing empty world as string." );
});

QUnit.test("Load world", function(assert) {
    var url = "/src/worlds/alone.json";
    var done = assert.async();
    var world_alone = {
        robots: [ {
                  "x": 1,
                  "y": 1,
                  "_orientation": 0,
                  "_prev_x": 1,
                  "_prev_y": 1,
                  "_prev_orientation": 0,
                  "_is_leaky": true,
                  "_trace_color": "seagreen",
                  "_trace_history": [],
                  "_trace_style": "default",
                  "objects": {}
                }
            ],
        walls: {},
        description: "A simple, empty world, ready for Reeborg to explore.",
        rows: RUR.MAX_Y_DEFAULT,
        cols: RUR.MAX_X_DEFAULT,
        small_tiles: false
    };

    test_utils.load_world_file(url);
    assert.deepEqual(remove_robot_id(RUR.CURRENT_WORLD), world_alone, "Ensuring loading world is done properly in testing framework.");
    done();
});

QUnit.test("Load world from url-permalink", function(assert) {
    var url =  window.location.origin + "/src/worlds/alone.json";
    var query = {};
    query.queryKey = {"mode": "python", "lang": "en", "url": url};
    var done = assert.async();
    var world_alone = {
        robots: [ {
                  "x": 1,
                  "y": 1,
                  "_orientation": 0,
                  "_prev_x": 1,
                  "_prev_y": 1,
                  "_prev_orientation": 0,
                  "_is_leaky": true,
                  "_trace_color": "seagreen",
                  "_trace_history": [],
                  "_trace_style": "default",
                  "objects": {}
                }
            ],
        walls: {},
        description: "A simple, empty world, ready for Reeborg to explore.",
        rows: RUR.MAX_Y_DEFAULT,
        cols: RUR.MAX_X_DEFAULT,
        small_tiles: false
    };

    RUR.permalink.from_url(query);
    assert.deepEqual(world_alone, remove_robot_id(RUR.CURRENT_WORLD), "Ensuring loading world from url is done properly.");
    done();
});


QUnit.test("Load world without running program", function(assert) {
    var contents, done = assert.async();
    test_utils.set_human_language("en"); // language needed for comparison with error message
    contents = [["/src/worlds/tutorial_en/home1.json", "Home 1"],
                ["/src/worlds/tutorial_en/home2.json", "Home 2"]];
    RUR.custom_world_select.make(contents);
    assert.throws(function() {RUR.file_io.load_world_from_program('Home 2');},
                 "Raised expected 'error' from successfully loading Home 2.");
    // the previous error is not caught by a running program and no feedback element
    // is shown.

    assert.equal(RUR.file_io.load_world_from_program('Home 2'), "no world change",
          "Loading world twice does not generate an error.");
    /* World files that are not found result in the following message in the
       console:
    GET http://localhost:8800/tests/integration_tests/Alone 404 (File not found)

    We add our own console message so that no one should be surprised by this.
    */
    console.log("404 (File not found) expected for 'Alone'.")
    assert.throws(function() {RUR.file_io.load_world_from_program('Alone');},
                 "Raised expected error from loading non-existent world.");
    assert.equal(test_utils.feedback_element, "#Reeborg-shouts", "Feedback element ok.");
    assert.equal(test_utils.content, "Could not find link: Alone", "Feedback content ok.");
    done();
});
QUnit.test("Load world by running Python programs", function(assert) {
    "use strict";
    var frames, last_frame, contents;
    var done = assert.async();
    test_utils.set_human_language("en"); // language needed for comparison with error message
    contents = [["/src/worlds/tutorial_en/home2.json", "Home 2"],
                ["/src/worlds/tutorial_en/home1.json", "Home 1"]];
    RUR.custom_world_select.make(contents);

    test_utils.run_python(null, "/tests/integration_tests/programs/select_home1_en.py");
    //playback should have been prevented, and only the feedback shown.
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element expected.");
    assert.equal(test_utils.content, "World Home 1 selected", "Correct information about world selected.");

    // second time runs the rest of the program as the correct world is selected
    test_utils.run_python(null, "/tests/integration_tests/programs/select_home1_en.py");
    RUR.rec.conclude();
    assert.equal(test_utils.feedback_element, "#Reeborg-concludes", "Feedback element ok.");
    assert.equal(test_utils.content,
        "<ul><li class='success'>Reeborg is at the correct x position.</li><li class='success'>Reeborg is at the correct y position.</li></ul>",
        "Feedback text ok.");
    done();
});
