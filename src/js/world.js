
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.world = {};

RUR.world.create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.pre_code = '';
    world.post_code = '';
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};

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

    if (RUR.current_world.background_image !== undefined) {
        RUR.background_image.src = RUR.current_world.background_image;
        RUR.background_image.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.background_image.src = '';
    }

    if (RUR.current_world.onload !== undefined) {
        try {
            eval(RUR.current_world.onload);  // jshint ignore:line
        } catch (e) {
            RUR.cd.show_feedback("#Reeborg-shouts",
                RUR.translate("Problem with onload code.") + "<br><pre>" +
                RUR.current_world.onload + "</pre>");
        }
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

    if(RUR.current_world.editor !== undefined){
        $("#add_editor_to_world").prop("checked", true);
    }
    if(RUR.current_world.library !== undefined){
        $("#add_library_to_world").prop("checked", true);
    }

    // clean up old worlds
    RUR.world.editors_remove_default_values(RUR.current_world);

    RUR.world.saved_world = RUR.world.clone_world();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
        RUR.editors.set_default_values();
    }
};

RUR.world.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.current_world));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};

RUR.world.reset = function () {
    RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    if (RUR.MAX_NB_ROBOTS !== undefined){
        delete RUR.MAX_NB_ROBOTS;
    }
    RUR.vis_robot.set_trace_style("default");
    RUR.MAX_STEPS = 1000;
    RUR.vis_world.draw_all();
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    if (RUR.MAX_NB_ROBOTS !== undefined &&
        RUR.MAX_NB_ROBOTS >= RUR.current_world.robots.length){
        throw new RUR.ReeborgError(RUR.translate("You cannot create another robot!"));
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.remove_robots = function () {
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.current_world.robots = [];
    }
};

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
RUR.world.editors_default_values = { 'pre-code': 'pre-code', 'post-code': 'post-code',
    'description': 'description', 'onload': '/* Javascript */' };

RUR.world.editors_set_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors){
        if (!world[edit]){
            world[edit] = editors[edit];
        }
    }
};
RUR.world.editors_remove_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors) {
        if (!world[edit]) {
            continue;
        }
        if (world[edit] == editors[edit] || world[edit].trim() === '') {
            delete world[edit];
        }
    }
};

RUR.world.editors_update_extra_code = function () {
    /* When editing a world, new content may be inserted in the additional
       editors.  This function updates the world to include this content,
       while removing the irrelevant, default */
    console.log("update_extra_code called");
    RUR.current_world.pre_code = pre_code_editor.getValue();
    RUR.current_world.post_code = post_code_editor.getValue();
    RUR.current_world.description = description_editor.getValue();
    RUR.current_world.onload = onload_editor.getValue();
    //
    RUR.editors.remove_default_values();
};


// if (RUR.current_world.editor) {
//     if (editor.getValue() != RUR.current_world.editor) {
//         response = confirm(RUR.translate("Replace editor content"));
//         if (response) {
//             try {
//                 editor.setValue(RUR.current_world.editor);
//             } catch(e) {}
//         }
//     }
// }
// if (RUR.current_world.library) {
//     if (library.getValue() != RUR.current_world.library) {
//         response = confirm(RUR.translate("Replace library content"));
//         if (response) {
//             try {
//                 library.setValue(RUR.current_world.library);
//             } catch(e) {}
//         }
//     }
// }
