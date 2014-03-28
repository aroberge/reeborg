/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, add_robot */

RUR.__edit_world.edit_world = function  () {
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    switch (RUR.__edit_world_flag) {
        case "robot-teleport":
            RUR.__teleport_robot();
            break;
        case "robot-remove":
        case "robot-add":
        case "robot-turn":
            break;
    }
    RUR.__refresh_world_edited();
};

RUR.__edit_world.select = function (choice) {
    $(".edit-world-submenus").hide();
    RUR.__edit_world_flag = choice;
    switch (choice) {
        case "robot-teleport":
            $("#cmd-result").html("Click on canvas to move robot.");
            break;
        case "robot-remove":
            $("#cmd-result").html("Removed robot.");
            RUR.__remove_robot();
            RUR.__edit_world.edit_world();
            RUR.__change_edit_robot_menu();
            break;
        case "robot-add":
            $("#cmd-result").html("Added robot");
            RUR.__add_robot(RUR.__create_robot());
            RUR.__edit_world.edit_world();
            RUR.__change_edit_robot_menu();
            break;
        case "robot-orientation":
            $("#cmd-result").html("Click on image to turn robot");
            $("#edit-world-turn").show();
            break;
    }
};

RUR.__change_edit_robot_menu = function () {
    if ("robots" in RUR.__current_world && 
        RUR.__current_world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};



function toggle_editing_mode () {
    $("#edit-world-panel").toggleClass("active");
    if (RUR.__editing_world) {
        RUR.__editing_world = false;
        editing_world_show_others();
        RUR.__wall_color = "brown";
        RUR.__shadow_wall_color = "#f0f0f0";
        RUR.__refresh_world_edited();
    } else {
        RUR.__change_edit_robot_menu();
        RUR.__editing_world = true;
        RUR.__wall_color = "black";
        RUR.__shadow_wall_color = "#ccd";
        RUR.__refresh_world_edited();
        editing_world_hide_others();
    }
}

RUR.__refresh_world_edited = function () {
    RUR.__visible_world.draw_all(RUR.__current_world);
}

function editing_world_show_others(){
    $("#contents-button").removeAttr("disabled");
    $("#help-button").removeAttr("disabled");
    $("#world-panel-button").removeAttr("disabled");
    $("#output-panel-button").removeAttr("disabled");
    $("#editor-panel-button").removeAttr("disabled");
    $("#editor-panel-button").click();
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#run2").removeAttr("disabled");
    $("#step2").removeAttr("disabled");
}

function editing_world_hide_others() {
    if ($("#editor-panel-button").hasClass("active")) {
        $("#editor-panel-button").click();
    }
    $("#editor-panel-button").attr("disabled", "true");
    if ($("#output-panel-button").hasClass("active")) {
        $("#output-panel-button").click();
    }
    $("#output-panel-button").attr("disabled", "true");
    $("#world-panel-button").attr("disabled", "true");
    $("#contents-button").attr("disabled", "true");
    $("#help-button").attr("disabled", "true");

    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").attr("disabled", "true");
    $("#step2").attr("disabled", "true");
    $("#reload2").attr("disabled", "true"); 
}