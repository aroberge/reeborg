
require("./translator.js");
require("./constants.js");
require("./robot.js");
require("./visible_world.js");
require("./state.js");
require("./exceptions.js");
require("./create_editors.js");
edit_robot_menu = require("./ui/edit_robot_menu.js");
var clone_world = require("./world/clone_world.js").clone_world;
var msg = require("./../lang/msg.js");

RUR.world = {};


/* When a world is edited, as we are about to leave the editing mode,
   a comparison of the world before editing and after is performed.
   If the content of the world before and after has changed, including that
   of the editors, this is taken as an indication that the world should
   perhaps be saved.  Some worlds are saved without having some content in
   the extra editors (perhaps because they were created before new editors
   were added, or since the new cleanup procedure was introduced). To avoid
   erroneous indication that the world content has changed, we use the
   following.
*/
RUR.world.editors_default_values = {
    'pre_code': '"pre code"',
    'post_code': '"post code"',
    'description': 'description',
    'onload': '/* Javascript */'
};

RUR.world.editors_set_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors){
        if (!world[edit]){
            world[edit] = editors[edit];
        }
    }
    return world;
};

RUR.world.editors_remove_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors) {
        if (world[edit] === undefined) {
            continue;
        }
        if (world[edit] == editors[edit] || world[edit].trim().length < 3) {
            try {
                delete world[edit];
            } catch (e) {}
        }
    }
    return world;
};

RUR.world.update_from_editors = function (world) {
    /* When editing a world, new content may be inserted in the additional
       editors.  This function updates the world to include this content,
       while removing the irrelevant, default */
    world.pre_code = pre_code_editor.getValue();
    world.post_code = post_code_editor.getValue();
    world.description = description_editor.getValue();
    world.onload = onload_editor.getValue();
    return RUR.world.editors_remove_default_values(world);
};

RUR.world.update_editors = function (world) {
   pre_code_editor.setValue(world.pre_code);
   post_code_editor.setValue(world.post_code);
   description_editor.setValue(world.description);
   onload_editor.setValue(world.onload);
};

msg.record_id("update-editor-content");
msg.record_id("update-editor-content-text", "UPDATE EDITOR CONTENT");
msg.record_id("update-editor-content-btn", "UPDATE EDITOR BUTTON");
msg.record_id("update-library-content");
msg.record_id("update-library-content-text", "UPDATE LIBRARY CONTENT");
msg.record_id("update-library-content-btn", "UPDATE LIBRARY BUTTON");
msg.record_id("dialog-update-editors-from-world");
msg.record_title("ui-dialog-title-dialog-update-editors-from-world", "Contents from World");

RUR.world.dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        Cancel: function() {
            RUR.world.dialog_update_editors_from_world.dialog("close");
        }
    }
});

$("#update-editor-content-btn").on("click", function(evt) {
    editor.setValue(RUR.CURRENT_WORLD.editor);
    $("#update-editor-content").hide();
    if (! $("#update-library-content").is(":visible")) {
        RUR.world.dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-library-content-btn").on("click", function(evt) {
    library.setValue(RUR.CURRENT_WORLD.library);
    $("#update-library-content").hide();
    if (! $("#update-editor-content").is(":visible")) {
        RUR.world.dialog_update_editors_from_world.dialog("close");
    }
});
