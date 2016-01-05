
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
        RUR.world.eval_onload();
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

    $("#add_editor_to_world").prop("checked",
                                   RUR.current_world.editor !== undefined);
    $("#add_library_to_world").prop("checked",
                                    RUR.current_world.library !== undefined);

    if (RUR.current_world.editor !== undefined &&
        RUR.current_world.editor !== editor.getValue()) {
        RUR.cd.dialog_update_editors_from_world.dialog("open");
        $("#update-editor-content").show();
    } else {
        $("#update-editor-content").hide();
    }
    if (RUR.programming_language === "python" &&
        RUR.current_world.library !== undefined &&
        RUR.current_world.library !== library.getValue()) {
        RUR.cd.dialog_update_editors_from_world.dialog("open");
        $("#update-library-content").show();
    } else {
        $("#update-library-content").hide();
    }

    // make a clean (predictable) copy
    RUR.current_world = RUR.world.editors_remove_default_values(RUR.current_world);
    RUR.world.saved_world = RUR.world.clone_world();
    // restore defaults everywhere for easier comparison when editing
    RUR.current_world = RUR.world.editors_set_default_values(RUR.current_world);
    RUR.world.update_editors(RUR.current_world);

    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.eval_onload = function () {
    try {
        eval(RUR.current_world.onload);  // jshint ignore:line
    } catch (e) {
        RUR.cd.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem with onload code.") + "<br><pre>" +
            RUR.current_world.onload + "</pre>");
        console.log("error in onload:", e);
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
    if (RUR.we.editing_world){
        return;
    }
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
   // todo: conditionally update editor and library.
};
