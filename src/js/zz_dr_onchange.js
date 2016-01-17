/* Sets up what happens when various changes happened in various html elements.

called by zzz_doc_ready.js
*/
require("./translator.js");
require("./storage.js");
require("./file_io.js");
require("./state.js");
require("./ui.js");
require("./aa_utils.js");

RUR.zz_dr_onchange = function () {

    $("#select_programming_language").change(function() {
        RUR.reset_programming_language($(this).val());
    });

    $("#select_world").change(function() {
        if (RUR.storage.appending_world_name_flag){
            RUR.storage.appending_world_name_flag = false;
            return;
        }
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
            RUR.state.input_method = "editor";
        } else if($(this).val() == "repl") {
            hide_python_editor();
            show_console();
            hide_blockly();
            RUR.state.input_method = "repl";
        } else {
            hide_python_editor();
            hide_console();
            show_blockly();
            RUR.state.input_method = "blockly";
        }
    });

    $("#javascript_choices").change(function() {
        if($(this).val() == "blockly") {
            hide_javascript_editor();
            show_blockly();
            RUR.state.input_method = "blockly";
        } else {
            show_javascript_editor();
            hide_blockly();
            RUR.state.input_method = "editor";
        }
    });

    $('#editor_visible_blockly').change(function() {
        if ($('#editor_visible_blockly')[0].checked) {
            RUR.state.input_method = "editor";
            if (RUR.state.programming_language == "python"){
                show_python_editor();
            } else {
                show_javascript_editor();
            }
        } else {
            RUR.state.input_method = "blockly";
            if (RUR.state.programming_language == "python"){
                hide_python_editor();
            } else {
                hide_javascript_editor();
            }
        }
    });

    function show_blockly () {
        $("#blockly-wrapper").show();
        $("#visible_blockly").show();
        if ($("#special-keyboard-button").hasClass("reverse-blue-gradient")) {
            $("#special-keyboard-button").click();
        }
        $("#special-keyboard-button").hide();
        $("#Reeborg-watches").dialog("close");
        if ($('#editor_visible_blockly')[0].checked) {
            show_python_editor();
        }
        window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
    }

    function hide_blockly () {
        $("#blockly-wrapper").hide();
        window.dispatchEvent(new Event('resize'));
        $("#visible_blockly").hide();
        $("#special-keyboard-button").show();
    }

    function show_javascript_editor () {
        $("#editor-panel").addClass("active");
        $("#kbd_javascript_btn").show();
        RUR.ui.reload();
        editor.refresh();
    }
    function hide_javascript_editor () {
        $("#editor-panel").removeClass("active");
        $("#kbd_javascript_btn").hide();
    }


    function show_python_editor () {
        $("#editor-panel").addClass("active");
        $("#kbd_python_btn").show();
        RUR.state.highlight = RUR.state.highlight || RUR._saved_highlight_value;
        RUR.ui.reload();
        editor.refresh();
    }
    function hide_python_editor () {
        $("#editor-panel").removeClass("active");
        $("#kbd_python_btn").hide();
        RUR._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
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
    }
    function hide_console() {
        $("#py_console").hide();
        $("#kbd_py_console_btn").hide();
        RUR.ui.show_only_reload2(false);
    }

};
