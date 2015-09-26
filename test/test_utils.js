RUR.unit_tests = {};

_load_world_file = function (url) {
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


_load_program = function (url) {
    /** Loads a program */
    "use strict";
    var data, i;

    $.ajax({url: url,
        async: false,
        dataType: "text",
        error: function(e){
            throw new Error("Problem in _load_world_file");        },
        success: function(data){
            RUR.unit_tests.program = data;
        }
    });
};

function _reset () {
    RUR.current_world = RUR.world.clone_world(RUR.unit_tests.empty_world);
    RUR.rec.frames = [];
}


function _run_javascript(world_url, program_url) {
    return _run_program(world_url, program_url, "javascript");
}


function _run_python(world_url, program_url) {
    return _run_program(world_url, program_url, "python");
}


function _run_program(world_url, program_url, language) {
    var last_frame, world;
    _reset();
    RUR.programming_language = language;

    _load_world_file(world_url);
    _load_program(program_url);
    RUR.runner.eval(RUR.unit_tests.program);
    last_frame = RUR.rec.frames[RUR.rec.frames.length - 1];
    return RUR.rec.check_goal(last_frame);
}


// Initial world should be created upon loading world.js module
RUR.unit_tests.initial_world = RUR.current_world;
RUR.unit_tests.empty_world = {robots: [],
        objects: {},
        walls: {},
        pre_code: '',
        post_code: '',
        rows: RUR.MAX_Y,
        cols: RUR.MAX_X,
        small_tiles: false
    };
