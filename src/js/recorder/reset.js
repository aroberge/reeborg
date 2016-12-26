require("./../rur.js");
require("./../editors/create.js");
require("./../world_api/animated_images.js");

exports.reset = reset = function() {
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}
    RUR.current_line_no = undefined;
    RUR.frames = [];
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.playback_delay = 300;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR._TIMER);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec_previous_lines = [];
    RUR._max_lineno_highlighted = 0;
    RUR.animated_images_init();
    RUR.state.frame_callback_called = false;
    RUR.frame_callback = undefined;
    RUR.state.error_recorded = false;
};

reset();
RUR._reset = reset; // for automated testing
