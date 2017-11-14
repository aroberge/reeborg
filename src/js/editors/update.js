
require("./../rur.js");
require("./create.js");
require("./../programming_api/blockly.js");
var msg = require("./../../lang/msg.js");

function _update_from_editor(world, name, _editor) {
    if ($("#add-"+name+"-to-world-btn").hasClass("blue-gradient")) {
        delete world[name];
    } else {
        world[name] = _editor.getValue();
    }
}

RUR.update_world_from_editors = function (world) {
    _update_from_editor(world, "blockly",RUR.blockly);
    _update_from_editor(world, "editor", editor);
    _update_from_editor(world, "library", library);
    _update_from_editor(world, "pre", pre_code_editor);
    _update_from_editor(world, "post", post_code_editor);
    _update_from_editor(world, "description", description_editor);
    _update_from_editor(world, "onload", onload_editor);
    return world;
};

function show_update_editor_dialog(world, editor_name, _editor) {
    if (world[editor_name] != _editor.getValue()) {
        dialog_update_editors_from_world.dialog("open");
    }
}

function set_button (name, content_present) {
    if (content_present &&
        $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            $("#add-" + name + "-to-world-btn").removeClass("blue-gradient");
            $("#add-" + name + "-to-world-btn").addClass("active-element");
    } else if (!content_present &&
        ! $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
        $("#add-" + name + "-ok").hide();
        $("#add-" + name + "-not-ok").show();
        $("#add-" + name + "-to-world-btn").addClass("blue-gradient");
        $("#add-" + name + "-to-world-btn").removeClass("active-element");
    }
}

function _update_user_editor (world, name, ed) {
    try {
        if (test_utils !== undefined) return;
    } catch (e) {}
    // For blockly when not running tests,
    // the user is given the choice to update the content or to keep their own.
    // This used to be the case as well for "editor" and library, but
    // we have found that this was too error prone.
    if (world[name]) {
        set_button("name", true);
        $("#update-"+name+"-content").show();
        show_update_editor_dialog(world, name, ed);
    } else {
        set_button("name", false);
        $("#update-"+name+"-content").hide();
    }
}

function _update_world_editor (world, name, ed) {
    // For editors defining the world: pre, post, description, onload.
    content = world[name];
    if (content) {
        if (typeof content != "string") {
            content = content.join("\n");
        }
        set_button(name, true);
        ed.setValue(content);
    } else {
        set_button(name, false);
        ed.setValue('\n');
    }
}

RUR.update_editors = function (world) {
    _update_user_editor(world, "blockly", RUR.blockly);
    _update_world_editor (world, "pre", pre_code_editor);
    _update_world_editor (world, "post", post_code_editor);
    _update_world_editor (world, "description", description_editor);
    _update_world_editor (world, "onload", onload_editor);
};

msg.record_id("update-blockly-content");
msg.record_id("update-blockly-content-text", "UPDATE BLOCKLY CONTENT");
msg.record_id("update-blockly-content-btn", "UPDATE BLOCKLY BUTTON");
msg.record_id("dialog-update-editors-from-world");
msg.record_title("ui-dialog-title-dialog-update-editors-from-world", "Contents from World");

dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        Cancel: function() {
            dialog_update_editors_from_world.dialog("close");
        }
    }
});

$("#update-blockly-content-btn").on("click", function(evt) {
    RUR.blockly.setValue(RUR.get_current_world().blockly);
    $("#update-blockly-content").hide();
    if  (!$("#update-editor-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
