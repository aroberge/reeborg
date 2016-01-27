require("./../translator.js");
require("./../constants.js");
require("./../robot.js");
require("./../visible_world.js");
require("./../state.js");
require("./../exceptions.js");
edit_robot_menu = require("./../ui/edit_robot_menu.js");
var clone_world = require("./clone_world.js").clone_world;

RUR.world.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content;
    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world.import_world");
        return {};
    }
    if (typeof json_string == "string"){
        try {
            RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
        } catch (e) {
            console.log("Exception caught in import_world.");
            console.log(json_string);
            console.log(e);
            RUR.world.create_empty_world();
            return;
        }
    } else {  // already parsed
        RUR.current_world = json_string;
    }

    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            RUR.robot.cleanup_objects(RUR.current_world.robots[0]);
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        }
    }

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed solid_objects; to ensure compatibility of
    // worlds created prior to using solid_objects, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.current_world.top_tiles !== undefined) {
        Object.defineProperty(RUR.current_world, "solid_objects",
            Object.getOwnPropertyDescriptor(RUR.current_world, "top_tiles"));
        delete RUR.current_world.top_tiles;
    }

    if (RUR.current_world.background_image !== undefined) {
        RUR.background_image.src = RUR.current_world.background_image;
        RUR.background_image.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.background_image.src = '';
    }

    if (RUR.current_world.onload !== undefined) {
        eval_onload();
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

    $("#add-editor-to-world").prop("checked",
                                   RUR.current_world.editor !== undefined);
    $("#add-library-to-world").prop("checked",
                                    RUR.current_world.library !== undefined);

    if (RUR.current_world.editor !== undefined &&
        RUR.current_world.editor !== editor.getValue()) {
        RUR.world.dialog_update_editors_from_world.dialog("open");
        $("#update-editor-content").show();
    } else {
        $("#update-editor-content").hide();
    }
    if (RUR.state.programming_language === "python" &&
        RUR.current_world.library !== undefined &&
        RUR.current_world.library !== library.getValue()) {
        RUR.world.dialog_update_editors_from_world.dialog("open");
        $("#update-library-content").show();
    } else {
        $("#update-library-content").hide();
    }

    // make a clean (predictable) copy
    RUR.current_world = RUR.world.editors_remove_default_values(RUR.current_world);
    RUR._SAVED_WORLD = clone_world();
    // restore defaults everywhere for easier comparison when editing
    RUR.current_world = RUR.world.editors_set_default_values(RUR.current_world);
    RUR.world.update_editors(RUR.current_world);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }
};

eval_onload = function () {
    try {
        eval(RUR.current_world.onload);  // jshint ignore:line
    } catch (e) {
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem with onload code.") + "<br><pre>" +
            RUR.current_world.onload + "</pre>");
        console.log("error in onload:", e);
    }
};
