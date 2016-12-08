RUR.unit_tests = {};

RUR.unit_tests.stop_server = function () { // for use with custom server.
    $.ajax({url: "/stop_server",
        async: false,
        success: function(data){}
    });
};

RUR.unit_tests.set_human_language = function (lang) {
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};

RUR.unit_tests.reset = function () {
    RUR.CURRENT_WORLD = RUR.clone_world(RUR.unit_tests.empty_world);
    RUR._reset();
    RUR.state.highlight = false;
    RUR.state.prevent_playback = false;
    RUR.unit_tests.feedback_element = undefined;
    RUR.unit_tests.content = undefined;
    RUR.unit_tests.set_mocks();
};

RUR.unit_tests.load_world_file = function (url) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data, i;

    $.ajax({url: url,
        async: false,
        error: function(e){
            throw new Error("Problem in _load_world_file");
        },
        success: function(data){
            RUR.world.import_world(data);
        }
    });
};

RUR.unit_tests.load_program = function (url) {
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
            RUR.unit_tests.program = data;
        }
    });
};


RUR.unit_tests.mock_show_feedback = function(element, content) {
    RUR.unit_tests.feedback_element = element;
    RUR.unit_tests.content = content;
};

RUR.unit_tests.set_mocks = function() {
    RUR.show_feedback = RUR.unit_tests.mock_show_feedback;
    RUR.blockly.init = function (){};
    RUR.blockly.workspace = function (){};
    window.blockly_init_en = function (){};
    window.blockly_init_fr = function (){};
};
RUR.unit_tests.set_mocks();

RUR.unit_tests.eval_javascript = function (world_url, program_url) {
    return RUR.unit_tests.eval_program(world_url, program_url, "javascript");
};

RUR.unit_tests.eval_python = function (world_url, program_url) {
    return RUR.unit_tests.eval_program(world_url, program_url, "python");
};

RUR.unit_tests.eval_program = function(world_url, program_url, language) {
    var last_frame, world;
    RUR.unit_tests.reset();
    RUR.state.programming_language = language;

    RUR.unit_tests.load_world_file(world_url);
    if (program_url !== undefined) {    // otherwise, reuse same program
        RUR.unit_tests.load_program(program_url);
    }
    RUR.runner.eval(RUR.unit_tests.program);
    last_frame = RUR.frames[RUR.frames.length - 1];
    return RUR.rec.check_goal(last_frame);
};

RUR.unit_tests.run_javascript = function (world_url, program_url) {
    return RUR.unit_tests.run_program(world_url, program_url, "javascript");
};


RUR.unit_tests.run_python = function (world_url, program_url) {
    return RUR.unit_tests.run_program(world_url, program_url, "python");
};


RUR.unit_tests.run_program = function(world_url, program_url, language) {
    var world;
    RUR.unit_tests.reset();
    RUR.state.programming_language = language;
    RUR.state.code_evaluated = false;

    if (world_url !== null) {
        RUR.unit_tests.load_world_file(world_url);
    }
    if (program_url !== undefined) {    // otherwise, reuse same program
        RUR.unit_tests.load_program(program_url);
    }
    RUR.runner.run(RUR.unit_tests.playback);
    return RUR.frames;
};

RUR.unit_tests.playback = function() {
    return true;
};

RUR.unit_tests.initial_world = RUR.create_empty_world();
RUR.unit_tests.empty_world = {robots: [],
        objects: {},
        walls: {},
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };

editor.getValue = function() {
    return RUR.unit_tests.program || '';
};

editor.setValue = function(arg) {
    RUR.unit_tests.program = arg;
};

library.getValue = function() {
    return RUR.unit_tests.library || '';
};

pre_code_editor = {};
post_code_editor = {};
description_editor = {};
onload_editor = {};
pre_code_editor.getValue = function () {
    return RUR.unit_tests.pre_code || '';
};
post_code_editor.getValue = function () {
    return RUR.unit_tests.post_code || '';
};
description_editor.getValue = function () {
    return RUR.unit_tests.description || '';
};
onload_editor.getValue = function () {
    return RUR.unit_tests.onload || "/* Javascript */";
};

pre_code_editor.setValue = function (code) {
    RUR.unit_tests.pre_code = code;
};
post_code_editor.setValue = function (code) {
    RUR.unit_tests.post_code = code;
};
description_editor.setValue = function (code) {
    RUR.unit_tests.description = code;
};
onload_editor.setValue = function (code) {
    RUR.unit_tests.onload = code;
};
