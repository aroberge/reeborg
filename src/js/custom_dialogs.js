/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $*/

RUR.cd = {};

$(document).ready(function() {

    RUR.cd.input_add_number = $("#input-add-number");
    RUR.cd.maximum_number = $("#maximum-number");
    RUR.cd.input_give_number = $("#input-give-number");
    RUR.cd.unlimited_number = $("#unlimited-number");
    RUR.cd.input_goal_number = $("#input-goal-number");
    RUR.cd.all_objects = $("#all-objects");
    RUR.cd.input_max_x = $("#input-max-x");
    RUR.cd.input_max_y = $("#input-max-y");
    RUR.cd.use_small_tiles = $("#use-small-tiles");

    RUR.cd.add_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_add_number_result = parseInt(RUR.cd.input_add_number.val(), 10);
        RUR.cd.input_maximum_result = parseInt(RUR.cd.maximum_number.val(), 10);
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


    RUR.cd.give_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_give_number_result = parseInt(RUR.cd.input_give_number.val(), 10);
        RUR.cd.unlimited_number_result = RUR.cd.unlimited_number.prop("checked");
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


    RUR.cd.goal_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_goal_number_result = parseInt(RUR.cd.input_goal_number.val(), 10);
        RUR.cd.all_objects_result = RUR.cd.all_objects.prop("checked");
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


    RUR.cd.set_dimensions = function () {
        "use strict";
        var max_x, max_y;
        max_x = parseInt(RUR.cd.input_max_x.val(), 10);
        max_y = parseInt(RUR.cd.input_max_y.val(), 10);
        RUR.current_world.small_tiles = RUR.cd.use_small_tiles.prop("checked");

        RUR.we._trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
        RUR.vis_world.compute_world_geometry(max_x, max_y);
        RUR.cd.dialog_set_dimensions.dialog("close");
        return true;
    };


    RUR.cd.dialog_add_object = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.add_objects,
            Cancel: function() {
                RUR.cd.dialog_add_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.add_number_form[0].reset();
        }
    });

    RUR.cd.add_number_form = RUR.cd.dialog_add_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.add_objects();
    });

    RUR.cd.dialog_give_object = $("#dialog-form2").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.give_objects,
            Cancel: function() {
                RUR.cd.dialog_give_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.give_number_form[0].reset();
        }
    });

    RUR.cd.give_number_form = RUR.cd.dialog_give_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.give_objects();
    });

    RUR.cd.dialog_goal_object = $("#dialog-form3").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.goal_objects,
            Cancel: function() {
                RUR.cd.dialog_goal_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.goal_number_form[0].reset();
        }
    });

    RUR.cd.goal_number_form = RUR.cd.dialog_goal_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.goal_objects();
    });


    RUR.cd.dialog_set_dimensions = $("#dialog-form4").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        //modal: true,
        buttons: {
            "OK": RUR.cd.set_dimensions,
            Cancel: function() {
                RUR.cd.dialog_set_dimensions.dialog("close");
            }
        },
        close: function() {
            RUR.cd.set_dimensions_form[0].reset();
        }
    });

    RUR.cd.set_dimensions_form = RUR.cd.dialog_set_dimensions.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_dimensions();
    });

});
