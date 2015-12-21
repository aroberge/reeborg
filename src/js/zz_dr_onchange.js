/* Sets up what happens when various changes happened in various html elements.

called by zzz_doc_ready.js
*/
RUR.zz_dr_onchange = function () {

    $("#select_programming_language").change(function() {
        RUR.reset_programming_language($(this).val());
    });

    $("#select_world").change(function() {
        if ($(this).val() !== null) {
            RUR.file_io.load_world_file($(this).val());
        }
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
    });

    $("#python_choices").change(function() {
        if($(this).val() == "editor") {
            show_python_editor();
            hide_console();
            hide_blockly();
            $("#editor-panel").addClass("active");
        } else if($(this).val() == "repl") {
            hide_python_editor();
            show_console();
            hide_blockly();
            $("#editor-panel").removeClass("active");
        } else {
            hide_python_editor();
            hide_console();
            show_blockly();
            $("#editor-panel").removeClass("active");
        }
    });

    function show_blockly () {
        $("#blockly-wrapper").show();
        RUR.blockly.active = true;
    }

    function hide_blockly () {
        $("#blockly-wrapper").hide();
        RUR.blockly.active = false;
    }

    function show_python_editor () {
        $("#kbd_python_btn").show();
        RUR._highlight = RUR._saved_highlight_value;
        RUR.ui.reload();
    }
    function hide_python_editor () {
        $("#kbd_python_btn").hide();
        RUR._saved_highlight_value = RUR._highlight;
        RUR._saved_highlight_value = RUR._highlight;
        RUR._highlight = false;
    }
    function show_console() {
        $("#py_console").show();
        $("#kbd_py_console_btn").show();
        RUR.ui.show_only_reload2(true);
        try {
            restart_repl();
        } catch (e) {
            console.log("trying to restart repl failure", e);
        }
        RUR._immediate_playback = true;
        RUR._active_console = true;
    }
    function hide_console() {
        $("#py_console").hide();
        $("#kbd_py_console_btn").hide();
        RUR.ui.show_only_reload2(false);
        RUR._immediate_playback = false;
        RUR._active_console = false;
    }

};
