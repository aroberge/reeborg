/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

RUR.cd = {};

$(document).ready(function() {

    RUR.cd.input_add_number = $("#input-add-number"),
    RUR.cd.maximum_number = $("#maximum-number"),


    RUR.cd.add_objects = function () {
        console.log("entering add_objects");
        RUR.cd.input_add_number_result = parseInt(RUR.cd.input_add_number.val(), 10);
        RUR.cd.input_maximum_result = parseInt(RUR.cd.maximum_number.val(), 10);
        console.log("min, max = ", RUR.cd.input_add_number_result, RUR.cd.input_maximum_result);
        if (RUR.cd.input_maximum_result > RUR.cd.input_add_number_result){
            query =  RUR.cd.input_add_number_result + "-" + RUR.cd.input_maximum_result;
        } else {
            query = RUR.cd.input_add_number_result;
        }
        console.log("query = ", query);
        RUR.we.add_object(RUR.we.specific_object, RUR.we.x, RUR.we.y, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_add_object.dialog("close");
        return true;
    };

    RUR.cd.dialog_add_object = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "Add objects": RUR.cd.add_objects,
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

  });

