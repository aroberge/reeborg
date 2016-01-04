/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $*/

RUR.cd = {};

RUR.cd.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


RUR.cd.create_custom_dialogs = function() {

    RUR.cd.dialog_add_object = $("#dialog-add-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.add_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_add_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.add_objects_form[0].reset();
        }
    });
    RUR.cd.add_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_add_number_result = parseInt($("#input-add-number").val(), 10);
        RUR.cd.input_maximum_result = parseInt($("#maximum-number").val(), 10);
        if (RUR.cd.input_maximum_result > RUR.cd.input_add_number_result){
            query =  RUR.cd.input_add_number_result + "-" + RUR.cd.input_maximum_result;
        } else {
            query = RUR.cd.input_add_number_result;
        }
        RUR.we.add_object(RUR.we.specific_object, RUR.we.x, RUR.we.y, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_add_object.dialog("close");
        return true;
    };
    RUR.cd.add_objects_form = RUR.cd.dialog_add_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.add_objects();
    });

    RUR.cd.dialog_give_object = $("#dialog-give-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.give_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_give_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.give_objects_form[0].reset();
        }
    });
    RUR.cd.give_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_give_number_result = parseInt($("#input-give-number").val(), 10);
        RUR.cd.unlimited_number_result = $("#unlimited-number").prop("checked");
        if (RUR.cd.unlimited_number_result){
            query =  "inf";
        } else {
            query = RUR.cd.input_give_number_result;
        }
        RUR.we.give_objects_to_robot(RUR.we.specific_object, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_give_object.dialog("close");
        return true;
    };
    RUR.cd.give_objects_form = RUR.cd.dialog_give_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.give_objects();
    });

    RUR.cd.dialog_goal_object = $("#dialog-goal-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.goal_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_goal_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.goal_objects_form[0].reset();
        }
    });
    RUR.cd.goal_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_goal_number_result = parseInt($("#input-goal-number").val(), 10);
        RUR.cd.all_objects_result = $("#all-objects").prop("checked");
        if (RUR.cd.all_objects_result){
            query =  "all";
        } else {
            query = RUR.cd.input_goal_number_result;
        }
        RUR.we.add_goal_objects(RUR.we.specific_object, RUR.we.x, RUR.we.y, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_goal_object.dialog("close");
        return true;
    };
    RUR.cd.goal_objects_form = RUR.cd.dialog_goal_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.goal_objects();
    });


    RUR.cd.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        //modal: true,
        buttons: {
            OK: function () {
                RUR.cd.set_dimensions();
            },
            Cancel: function() {
                RUR.cd.dialog_set_dimensions.dialog("close");
            }
        },
        close: function() {
            RUR.cd.set_dimensions_form[0].reset();
        }
    });
    RUR.cd.set_dimensions = function () {
        "use strict";
        var max_x, max_y;
        max_x = parseInt($("#input-max-x").val(), 10);
        max_y = parseInt($("#input-max-y").val(), 10);
        RUR.current_world.small_tiles = $("#use-small-tiles").prop("checked");

        RUR.we._trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
        RUR.vis_world.compute_world_geometry(max_x, max_y);
        RUR.cd.dialog_set_dimensions.dialog("close");
        return true;
    };
    RUR.cd.set_dimensions_form = RUR.cd.dialog_set_dimensions.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_dimensions();
    });

    RUR.cd.dialog_save_world = $("#dialog-save-world").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.save_world();
            },
            Cancel: function() {
                RUR.cd.dialog_save_world.dialog("close");
            }
        }
    });
    RUR.cd.save_dialog_form = RUR.cd.dialog_save_world.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.save_world();
    });
    RUR.cd.save_world = function () {
        RUR.storage._save_world($("#world-name").val().trim());
        RUR.world.saved_world = RUR.world.clone_world();
        RUR.cd.dialog_save_world.dialog("close");
        $('#delete-world').show();
    };

    RUR.cd.dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            Cancel: function() {
                RUR.cd.dialog_update_editors_from_world.dialog("close");
            }
        }
    });

    RUR.cd.dialog_set_background_image = $("#dialog-set-background-image").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.set_background_image();
            },
            Cancel: function() {
                RUR.cd.dialog_set_background_image.dialog("close");
            }
        }
    });
    RUR.cd.set_background_image_form = RUR.cd.dialog_set_background_image.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_background_image();
    });
    RUR.cd.set_background_image = function () {
        var url = $("#image-url").val();
        if (!url) {
            url = '';
        }
        RUR.current_world.background_image = url;
        RUR.background_image.src = url;
        RUR.background_image.onload = RUR.vis_world.draw_all;
        RUR.cd.dialog_set_background_image.dialog("close");
    };


    RUR.cd.dialog_select_colour = $("#dialog-select-colour").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.select_colour();
            },
            Cancel: function() {
                RUR.cd.dialog_select_colour.dialog("close");
            }
        }
    });
    RUR.cd.select_colour_form = RUR.cd.dialog_select_colour.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.select_colour();
    });
    RUR.cd.select_colour = function () {
        var colour = $("#colour-selection").val();
        if (!colour) {
            colour = false;
        }
        RUR.cd.dialog_select_colour.dialog("close");
        RUR.we.call_back(colour);
        RUR.vis_world.draw_all();
    };



};
