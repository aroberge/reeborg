require("./../editors/create.js");
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
    heightStyle: "content",
    activate: function(event, ui){
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        extra_editor.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
});

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("extra-tab", "EXTRA");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

$("#editor-panel").resizable({
    resize: function() {
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
}).draggable({cursor: "move", handle: "ul"});


$("#editor-tab").on("click", function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
});


$("#library-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});

$("#extra-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});

/**
 * @function set_extra_content
 * @memberof RUR
 * @instance
 *
 * @desc "Installs" a python module defined as a string parameter to
 * this function. When called, the **extra** editor tab is shown in read-only mode.
 * Once "installed", this content remains available only during the current
 * browser's session.  It can be updated at any time by calling this function
 * again. It is suggested to call this function from the **Onload** editor,
 * as part of the world creation.
 *
 * @param {string} python_code The Python code which is the content of the
 * desired module, and shown in the **extra** editor tab.
 * @param {bool} [hide] If `true/True`, the **extra** editor tab (and its
 * content) will be hidden.
 *
 * @example {@lang python}
 * # set the content from a string
 * RUR.set_extra_content('''
 * def turn_right():
 *     turn_left()
 *     turn_left()
 *     turn_left()
 * ''')
 *
 * # set the content from the code present in the editor
 * # when saving/creating the world
 * RUR.set_extra_content(RUR.get_editor_from_world)
 *
 * # similar to the above except for code in the library
 * RUR.set_extra_content(RUR.get_library_from_world)
 */
RUR.set_extra_content = function (python_code, hide) {
    if (python_code) {
        extra_editor.setValue(python_code);
        if (!hide) {
            RUR.state.extra_code_visible = true;
            if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
                $("#extra-tab").parent().show();
            }
        } else {
            RUR.state.extra_code_visible = false;
            $("#extra-tab").parent().hide();
        }
    }
};

/*
 * @function get_extra_content
 * @memberof RUR
 * @instance
 *
 * @desc Returns the content of the extra editor as a string. This is used
 * internally and we currently do not know of any use case for an end-user
 * of the program which is why we do not include this in the public API.
 */
RUR.get_extra_content = function () {
    return extra_editor.getValue();
};

/**
 * @function get_editor_from_world
 * @memberof RUR
 * @instance
 *
 * @desc A world can be saved with the content shown in the main code
 * editor at the time; the person loading the world usually does not
 * see this content since what is shown in the main editor is their own code.
 * However, this content can be retrieved by calling
 * this function. Its only use case is to set the content of the
 * extra editor/module.
 *
 * @example {@lang python}
 * RUR.set_extra_content(RUR.get_editor_from_world)
 *
 */
RUR.get_editor_from_world = function () {
    var world = RUR.get_current_world();
    if (world.editor != undefined) {
        return world.editor;
    }
    return '';
};

/**
 * @function get_library_from_world
 * @memberof RUR
 * @instance
 *
 * @desc A world can be saved with the content shown in the library tab
 * at the time; the person loading the world usually does not
 * see this content since what is shown in the library is their own code.
 * However, this content can be retrieved by calling
 * this function. Its only use case is to set the content of the
 * extra editor/module.
 *
 * @example {@lang python}
 * RUR.set_extra_content(RUR.get_library_from_world)
 *
 */
RUR.get_library_from_world = function () {
    var world = RUR.get_current_world();
    if (world.library != undefined) {
        return world.library;
    }
    return '';
};



