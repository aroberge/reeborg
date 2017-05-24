stop_server = function () { // for use with custom server.
    $.ajax({url: "/stop_server",
        async: false,
        success: function(data){}
    });
};

test_utils.set_human_language = function (lang) {
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};

test_utils.reset = function () {
    RUR.CURRENT_WORLD = RUR.world_utils.clone_world(test_utils.empty_world);
    RUR._reset();
    RUR.state.code_evaluated = false;
    RUR.state.highlight = false;
    RUR.state.prevent_playback = false;
    test_utils.feedback_element = undefined;
    test_utils.content = undefined;
    test_utils.set_mocks();
};

test_utils.load_world_file = function (url) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data, i;

    $.ajax({url: url,
        async: false,
        error: function(e){
            throw new Error("Problem in _load_world_file");
        },
        success: function(data){
            RUR.world_utils.import_world(data);
        }
    });
};

test_utils.load_program = function (url) {
    /** Loads a program */
    "use strict";
    var data, i;

    $.ajax({url: url,
        async: false,
        dataType: "text",
        error: function(e){
            throw new Error("Problem in _load_program; url=" + url);
        },
        success: function(data){
            test_utils.program = data;
        }
    });
};


test_utils.mock_show_feedback = function(element, content) {
    test_utils.feedback_element = element;
    test_utils.content = content;
};

test_utils.set_mocks = function() {
    RUR.show_feedback = test_utils.mock_show_feedback;
    RUR.blockly.init = function (){};
    RUR.blockly.workspace = function (){};
    window.blockly_init_en = function (){};
    window.blockly_init_fr = function (){};
};
test_utils.set_mocks();

test_utils.eval_javascript = function (world_url, program_url) {
    return test_utils.eval_program(world_url, program_url, "javascript");
};

test_utils.eval_python = function (world_url, program_url) {
    return test_utils.eval_program(world_url, program_url, "python");
};

test_utils.eval_program = function(world_url, program_url, language) {
    var last_frame, world;
    test_utils.reset();
    RUR.state.programming_language = language;

    test_utils.load_world_file(world_url);
    if (program_url !== undefined) {    // otherwise, reuse same program
        test_utils.load_program(program_url);
    }
    RUR.runner.eval(test_utils.program);
    last_frame = RUR.frames[RUR.frames.length - 1];
    try {
        return RUR.rec.check_goal(last_frame);
    } catch(e) {
        console.log(">>=========\nerror raised while trying to check goal.", e);
        console.log("frames = ", RUR.frames);
        console.log("program = ", test_utils.program, "\n------------<<");
        return false;
    }
};

test_utils.run_javascript = function (world_url, program_url) {
    return test_utils.run_program(world_url, program_url, "javascript");
};


test_utils.run_python = function (world_url, program_url) {
    return test_utils.run_program(world_url, program_url, "python");
};


test_utils.run_program = function(world_url, program_url, language) {
    var world;
    test_utils.reset();
    RUR.state.programming_language = language;

    if (world_url !== null) {
        test_utils.load_world_file(world_url);
    }
    if (program_url !== undefined) {    // otherwise, reuse same program
        test_utils.load_program(program_url);
    }
    RUR.runner.run(test_utils.playback);
    return RUR.frames;
};

test_utils.playback = function() {
    return true;
};

test_utils.initial_world = RUR.world_utils.create_empty_world();
test_utils.empty_world = {robots: [],
        objects: {},
        walls: {},
        rows: RUR.MAX_Y_DEFAULT,
        cols: RUR.MAX_X_DEFAULT,
        small_tiles: false
    };

editor.getValue = function() {
    return test_utils.program || '';
};

editor.setValue = function(arg) {
    test_utils.program = arg;
};

library.getValue = function() {
    return test_utils.library || '';
};

pre_code_editor = {};
post_code_editor = {};
description_editor = {};
onload_editor = {};
pre_code_editor.getValue = function () {
    return test_utils.pre_code || '';
};
post_code_editor.getValue = function () {
    return test_utils.post_code || '';
};
description_editor.getValue = function () {
    return test_utils.description || '';
};
onload_editor.getValue = function () {
    return test_utils.onload || "/* Javascript */";
};

pre_code_editor.setValue = function (code) {
    test_utils.pre_code = code;
};
post_code_editor.setValue = function (code) {
    test_utils.post_code = code;
};
description_editor.setValue = function (code) {
    test_utils.description = code;
};
onload_editor.setValue = function (code) {
    test_utils.onload = code;
};
