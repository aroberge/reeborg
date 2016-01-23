/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $*/


require("./world_editor.js");
require("./visible_world.js");
require("./storage.js");
require("./objects.js");
require("./world_set.js");
require("./libs/jquery.ui.dialog.minmax.js");


RUR.cd = {};

RUR.cd.create_custom_dialogs = function() {





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
        RUR.add_goal_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
        RUR.vis_world.refresh_world_edited();
        RUR.cd.dialog_goal_object.dialog("close");
        return true;
    };
    RUR.cd.goal_objects_form = RUR.cd.dialog_goal_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.goal_objects();
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
