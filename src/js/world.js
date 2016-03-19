
require("./state.js");
require("./create_editors.js");
var msg = require("./../lang/msg.js");

RUR.world = {};

RUR.world.update_from_editors = function (world) {
   if (!$("#add-blockly-to-world-btn").hasClass("blue-gradient")) {
       world.blockly = RUR.blockly.getValue();
   }
   if (!$("#add-editor-to-world-btn").hasClass("blue-gradient")) {
       world.editor = editor.getValue();
   }
   if (!$("#add-library-to-world-btn").hasClass("blue-gradient")) {
       world.library = library.getValue();
   }
   if (!$("#add-pre-to-world-btn").hasClass("blue-gradient")) {
       world.pre = pre_code_editor.getValue();
   }
   if (!$("#add-post-to-world-btn").hasClass("blue-gradient")) {
       world.post = post_code_editor.getValue();
   }
   if (!$("#add-description-to-world-btn").hasClass("blue-gradient")) {
       world.description = description_editor.getValue();
   }
   if (!$("#add-onload-to-world-btn").hasClass("blue-gradient")) {
       world.onload = onload_editor.getValue();
   }
    return world;
};

function show_update_editor_dialog(world, editor_name, _editor, _id) {
    if (world[editor_name] !== _editor.getValue()) {
        dialog_update_editors_from_world.dialog("open");
        $(_id).show();
    } else {
        $(_id).hide();
    }
}

function set_button (name, content_present) {
    if (content_present &&
        $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            $("#add-" + name + "-to-world-btn").removeClass("blue-gradient");
    } else if (!content_present &&
        ! $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
        $("#add-" + name + "-ok").hide();
        $("#add-" + name + "-not-ok").show();
        $("#add-" + name + "-to-world-btn").addClass("blue-gradient");
    }
}

RUR.world.update_editors = function (world) {

    // For blockly, editor and library, the user is given the choice to
    // update the content or to keep their own.
    if (world.blockly) {
        set_button("blockly", true);
        show_update_editor_dialog(world, "blockly", RUR.blockly, "#update-blockly-content");
    } else {
        set_button("blockly", false);
    }

    if (world.editor) {
        set_button("editor", true);
        show_update_editor_dialog(world, "editor", editor, "#update-editor-content");
    } else {
        set_button("editor", false);
    }

    if (world.library) {
        set_button("library", true);
        show_update_editor_dialog(world, "library", library, "#update-library-content");
    } else {
        set_button("library", false);
    }

    // For pre, post, description, onload, the values in set by the world
    // designer/creator.
    if (world.pre_code) {
        set_button("pre", true);
        pre_code_editor.setValue(world.pre_code);
    } else {
        set_button("pre", false);
        pre_code_editor.setValue('\n');
    }

    if (world.post_code) {
        set_button("post", true);
        post_code_editor.setValue(world.post_code);
    } else {
        set_button("post", false);
        post_code_editor.setValue('\n');
    }

    if (world.description) {
        set_button("description", true);
        description_editor.setValue(world.description);
    } else {
        set_button("description", false);
        description_editor.setValue('\n');
    }

    if (world.onload) {
        set_button("onload", true);
        onload_editor.setValue(world.onload);
    } else {
        set_button("onload", false);
        onload_editor.setValue('\n');
    }
};

msg.record_id("update-blockly-content");
msg.record_id("update-blockly-content-text", "UPDATE BLOCKLY CONTENT");
msg.record_id("update-blockly-content-btn", "UPDATE BLOCKLY BUTTON");
msg.record_id("update-editor-content");
msg.record_id("update-editor-content-text", "UPDATE EDITOR CONTENT");
msg.record_id("update-editor-content-btn", "UPDATE EDITOR BUTTON");
msg.record_id("update-library-content");
msg.record_id("update-library-content-text", "UPDATE LIBRARY CONTENT");
msg.record_id("update-library-content-btn", "UPDATE LIBRARY BUTTON");
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
    RUR.blockly.setValue(RUR.CURRENT_WORLD.blockly);
    $("#update-blockly-content").hide();
    if  (!$("#update-editor-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-editor-content-btn").on("click", function(evt) {
    editor.setValue(RUR.CURRENT_WORLD.editor);
    $("#update-editor-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-library-content-btn").on("click", function(evt) {
    library.setValue(RUR.CURRENT_WORLD.library);
    $("#update-library-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-editor-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
