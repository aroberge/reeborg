(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* A bit of history ...

  Initially, Reeborg's World only contained "objects", starting with a
  single one (beeper, which became token) and slowly increasing the number
  and characteristics (e.g. animated object).  The first objects were
  drawn on the canvas; eventually they were replaced by square images.

  In parallel, background images, known as tiles could be added on the grid
  to create worlds that could be more visually appealing.

  Eventually, all custom canvas drawings were replaced by square images for
  simplicity and consistency. */

require("./../rur.js");
require("./../world_api/things.js");

// the following four requirements are for automatic transformations
// via the ".transform" attribute
require("./../world_api/background_tile.js");
require("./../world_api/pushables.js");
require("./../world_api/obstacles.js");
require("./../world_api/objects.js");

var home_message, obj, tile;

tile = {name: "mud",
    url: RUR.BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: "mud",
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "ice",
    url: RUR.BASE_URL + '/src/images/ice.png',
    info: "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "grass",
    url: RUR.BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "pale_grass",
    url: RUR.BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
};
RUR.add_new_thing(tile);

tile = {name: "gravel",
    url: RUR.BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_thing(tile);

tile = {
    name:"water",
    images: [RUR.BASE_URL + '/src/images/water.png',
        RUR.BASE_URL + '/src/images/water2.png',
        RUR.BASE_URL + '/src/images/water3.png',
        RUR.BASE_URL + '/src/images/water4.png',
        RUR.BASE_URL + '/src/images/water5.png',
        RUR.BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: "water",
    detectable: true,
    message: "I'm in water!"
};
RUR.add_new_thing(tile);

tile = {name: "bricks",
    url: RUR.BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: "bricks",
    solid: true
};
RUR.add_new_thing(tile);


// fire adapted from https://commons.wikimedia.org/wiki/File:Icon-Campfire.svg
tile = {name: "fire",
    url: RUR.BASE_URL + '/src/images/fire.png',
    info: "fire: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "My joints are melting!",
    detectable: true,
    fatal: "fire"
};
RUR.add_new_thing(tile);

/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR.BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "house",
    url: RUR.BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "racing_flag",
    url: RUR.BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

/* --- default objects  -----*/

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR.BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
RUR.THINGS.token.info = "tokens are Reeborg's favourite thing.";
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("orange");
_add_object_type("daisy");
_add_object_type("tulip");
_add_object_type("east");
_add_object_type("north");
RUR.THINGS.east.x_offset = 38;
RUR.THINGS.east.y_offset = -2;
RUR.THINGS.north.x_offset = -2;
RUR.THINGS.north.y_offset = -2;

// goal walls treated above
function _add_static_wall(name, x_offset, y_offset) {
    "use strict";
    var url;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing({"name": name, "url": url,
                     "x_offset": x_offset, "y_offset": y_offset});
}
_add_static_wall("east_border", 38, -2);
_add_static_wall("east_grid", 39, -2);
_add_static_wall("east_edit", 38, -2);

_add_static_wall("north_border", -2, -2);
_add_static_wall("north_grid", -2, -1);
_add_static_wall("north_edit", -2, -2);

_add_object_type("box");
RUR.THINGS.box.name = "box";
RUR.THINGS.box.transform = [
    {conditions: [[RUR.is_background_tile, "water"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "mud"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"]]
    },
    {conditions: [[RUR.is_obstacle, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"]]
    }
];

tile = {
    name: "bucket",
    info: "A bucket full of water, useful to put out fires.",
    url: RUR.BASE_URL + '/src/images/water_bucket.png'
};
RUR.add_new_thing(tile);
RUR.THINGS.bucket.transform = [
    {conditions: [[RUR.is_background_tile, "fire"],
                  [RUR.is_object, "bucket"]],
     actions: [[RUR.remove_object, "bucket"],
              [RUR.remove_background_tile, "fire"]]
    },
    {conditions: [[RUR.is_obstacle, "fire"],
                  [RUR.is_object, "bucket"]],
     actions: [[RUR.remove_object, "bucket"],
              [RUR.remove_obstacle, "fire"]]
    },
    {conditions: [[RUR.is_object, "bulb"],
                  [RUR.is_object, "bucket"]],
     actions: [[RUR.remove_object, "bucket"],
              [RUR.remove_object, "bulb"],
              [RUR.add_object, "tulip"]]
    }
];

tile = {
    name: "bulb",
    info: "Tulip bulb: might grow into a nice tulip with some water from a bucket.",
    url: RUR.BASE_URL + '/src/images/seed.png'
};
RUR.add_new_thing(tile);

tile = {
    name: "bridge",
    info: "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.",
    url: RUR.BASE_URL + '/src/images/bridge.png',
    protections: ["water", "mud"]
};
RUR.add_new_thing(tile);

tile = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": [RUR.BASE_URL + '/src/images/beeper0.png',
            RUR.BASE_URL + '/src/images/beeper1.png',
            RUR.BASE_URL + '/src/images/beeper2.png',
            RUR.BASE_URL + '/src/images/beeper3.png'],
    "goal": {'url': RUR.BASE_URL + '/src/images/beeper_goal.png'}
};
RUR.add_new_thing(tile);

add_fence = function (name) {
    var obj = {};
    obj.name = name;
    obj.fatal = "fence";
    obj.solid = true;
    obj.detectable = true;
    obj.message = "I hit a fence!";
    obj.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
    obj.url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing(obj);
};

add_fence("fence_right");
add_fence("fence_left");
add_fence("fence_double");
add_fence("fence_vertical");


},{"./../rur.js":52,"./../world_api/background_tile.js":68,"./../world_api/objects.js":73,"./../world_api/obstacles.js":74,"./../world_api/pushables.js":75,"./../world_api/things.js":77}],2:[function(require,module,exports){
/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_api/objects.js");
// require("./../world_set/object.js");
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("number-of-objects", "Number of objects:");
msg.record_id("maximum-text", "Maximum:");
msg.record_id("add-object-explain", "ADD OBJECT EXPLAIN");
msg.record_id("input-add-number");
msg.record_id("maximum-number");
msg.record_id("dialog-add-object");
msg.record_title("ui-dialog-title-dialog-add-object", "Add object in the world");

exports.dialog_add_object = dialog_add_object = $("#dialog-add-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_nb_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function set_nb_object () {
    "use strict";
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-add-number").val(), 10),
         max: parseInt($("#maximum-number").val(), 10),
         replace: true})
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    add_object();
});

},{"./../../lang/msg.js":88,"./../drawing/visible_world.js":9,"./../rur.js":52,"./../world_api/objects.js":73}],3:[function(require,module,exports){

require("./../libs/jquery.ui.dialog.minmax.js");
require("./../rur.js");
var update_titles = require("./../../lang/msg.js").update_titles;


RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("active-element");
            if (special_fn !== undefined){
                special_fn();
            }
        }
    };
    for (var attrname in add_options) {
        options[attrname] = add_options[attrname];
    }

    button.on("click", function(evt) {
        element.dialog(options);
        button.toggleClass("blue-gradient");
        button.toggleClass("active-element");
        if (button.hasClass("active-element")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
        update_titles();
    });
};

RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
        {autoOpen:false, width:750,  height:330, maximize: false, position:"left"});

$("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:350,
                                position:{my: "bottom", at: "bottom-20", of: window}});
$("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:400, dialogClass: "proclaims",
                                position:{my: "bottom", at: "bottom-80", of: window}});
$("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                position:{my: "bottom", at: "bottom-140", of: window}});

},{"./../../lang/msg.js":88,"./../libs/jquery.ui.dialog.minmax.js":16,"./../rur.js":52}],4:[function(require,module,exports){

require("./../world_set/world_set.js");
require("./../drawing/visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../rur.js");
var msg = require("./../../lang/msg.js");

msg.record_id("give-number-of-objects", "Number of objects:");
msg.record_id("unlimited-text", "Unlimited:");
msg.record_id("give-object-explain", "GIVE OBJECT EXPLAIN");
msg.record_id("input-give-number");
msg.record_id("unlimited-number");
msg.record_id("dialog-give-object");
msg.record_title("ui-dialog-title-dialog-give-object", "Give object to robot");

exports.dialog_give_object = dialog_give_object = $("#dialog-give-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            give_object();
        },
        Cancel: function() {
            dialog_give_object.dialog("close");
        }
    },
    close: function() {
        give_object_form[0].reset();
    }
});
give_object = function () {
    "use strict";
    var query, give_number_result, unlimited_number_result;
    give_number_result = parseInt($("#input-give-number").val(), 10);
    unlimited_number_result = $("#unlimited-number").prop("checked");
    if (unlimited_number_result){
        query = Infinity;
    } else {
        query = give_number_result;
    }
    RUR.give_object_to_robot(RUR.state.specific_object, query);
    RUR.vis_world.refresh_world_edited();
    dialog_give_object.dialog("close");
    return true;
};
give_object_form = dialog_give_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    give_object();
});

},{"./../../lang/msg.js":88,"./../drawing/visible_world.js":9,"./../rur.js":52,"./../world_set/give_object_to_robot.js":81,"./../world_set/world_set.js":83}],5:[function(require,module,exports){
require("./../drawing/visible_world.js");
require("./../world_api/objects.js");
require("./../rur.js");

var msg = require("./../../lang/msg.js");

msg.record_id("dialog-goal-object");
msg.record_title("ui-dialog-title-dialog-goal-object", "Set goal number for object");
msg.record_id("dialog-goal-object-explain", "dialog-goal-object-explain");
msg.record_id("input-goal-number-text", "Number of objects");
msg.record_id("all-objects-text", "All such objects");

exports.dialog_goal_object = dialog_goal_object = $("#dialog-goal-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            goal_objects();
        },
        Cancel: function() {
            dialog_goal_object.dialog("close");
        }
    },
    close: function() {
        goal_objects_form[0].reset();
    }
});
goal_objects = function () {
    "use strict";
    var goal;
    if ( $("#all-objects").prop("checked") ){
        goal =  "all";
    }
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-goal-number").val(), 10),
         goal: goal, replace: true})
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});

},{"./../../lang/msg.js":88,"./../drawing/visible_world.js":9,"./../rur.js":52,"./../world_api/objects.js":73}],6:[function(require,module,exports){
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("color-selection-text", "Colour:");
msg.record_id("colour-selection");
msg.record_id("dialog-select-colour");
msg.record_title("ui-dialog-title-dialog-select-colour", "Enter a colour");

exports.dialog_select_colour = dialog_select_colour = $("#dialog-select-colour").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            select_colour();
        },
        Cancel: function() {
            dialog_select_colour.dialog("close");
        }
    }
});

dialog_select_colour.find("form").on("submit", function( event ) {
    event.preventDefault();
    select_colour();
});

select_colour = function () {
    var colour = $("#colour-selection").val();
    if (!colour) {
        colour = false;
    }
    dialog_select_colour.dialog("close");
    RUR._CALLBACK_FN(colour);
    RUR.vis_world.draw_all();
};

},{"./../../lang/msg.js":88,"./../drawing/visible_world.js":9}],7:[function(require,module,exports){
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");
var dialog;

msg.record_id("dialog-set-background-image");
msg.record_title("ui-dialog-title-dialog-set-background-image", "Background image");

exports.dialog_set_background_image = dialog = $("#dialog-set-background-image").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_background_image();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});
dialog.find("form").on("submit",
    function( event ) {
        event.preventDefault();
        set_background_image();
});
set_background_image = function () {
    var url = $("#image-url").val();
    if (!url) {
        url = '';
    }
    RUR.get_current_world().background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.BACKGROUND_IMAGE.onload = RUR.vis_world.draw_all;
    dialog.dialog("close");
};

},{"./../../lang/msg.js":88,"./../drawing/visible_world.js":9}],8:[function(require,module,exports){

require("./../rur.js");
require("./../utils/validator.js");

RUR.vis_robot = {};
RUR.vis_robot.images = [];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

// elable changing defaults for unit tests or if put on different server location
RUR.BASE_URL = RUR.BASE_URL || '';


function set_images(images) {
    var default_images, east, west, north, south, robot, model = images.model;

    default_images = {east: RUR.BASE_URL + '/src/images/robot_e.png',
        north: RUR.BASE_URL + '/src/images/robot_n.png',
        west: RUR.BASE_URL + '/src/images/robot_w.png',
        south: RUR.BASE_URL + '/src/images/robot_s.png'
    }

    if (RUR.vis_robot.images[model] === undefined) {
        RUR.vis_robot.images[model] = {};
        robot = RUR.vis_robot.images[model];
        robot.robot_e_img = new Image();
        robot.robot_n_img = new Image();
        robot.robot_w_img = new Image();
        robot.robot_s_img = new Image();
    } else {
        robot = RUR.vis_robot.images[model];
    }

    if (robot.robot_e_img.src != images.east) {
        robot.robot_e_img.src = images.east || default_images.east;
        robot.robot_e_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_n_img.src != images.north) {
        robot.robot_n_img.src = images.north || default_images.north;
        robot.robot_n_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_w_img.src != images.west) {
        robot.robot_w_img.src = images.west || default_images.west;
        robot.robot_w_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_s_img.src != images.south) {
        robot.robot_s_img.src = images.south || default_images.south;
        robot.robot_s_img.onload = RUR.onload_new_image;
    }
}

RUR.reset_default_robot_images = function () {
    // classic; uses default
    set_images({model: 0});
    // 2d red rover
    set_images({model: 1,
        east: RUR.BASE_URL + '/src/images/rover_e.png',
        north: RUR.BASE_URL + '/src/images/rover_n.png',
        west: RUR.BASE_URL + '/src/images/rover_w.png',
        south: RUR.BASE_URL + '/src/images/rover_s.png'
    });
    // 3d red rover
    set_images({model: 2,
        east: RUR.BASE_URL + '/src/images/plain_e.png',
        north: RUR.BASE_URL + '/src/images/plain_n.png',
        west: RUR.BASE_URL + '/src/images/plain_w.png',
        south: RUR.BASE_URL + '/src/images/plain_s.png'
    });
    // solar panel
    set_images({model: 3,
        east: RUR.BASE_URL + '/src/images/sp_e.png',
        north: RUR.BASE_URL + '/src/images/sp_n.png',
        west: RUR.BASE_URL + '/src/images/sp_w.png',
        south: RUR.BASE_URL + '/src/images/sp_s.png'
    });

    $("#robot0 img").attr("src", RUR.vis_robot.images[0].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images[1].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images[2].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images[3].robot_e_img.src);
    RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));

    // additional robot images from rur-ple
    set_images({model: 4,
        east: RUR.BASE_URL + '/src/images/blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/blue_robot_s.png'
    });
    set_images({model: 5,
        east: RUR.BASE_URL + '/src/images/purple_robot_e.png',
        north: RUR.BASE_URL + '/src/images/purple_robot_n.png',
        west: RUR.BASE_URL + '/src/images/purple_robot_w.png',
        south: RUR.BASE_URL + '/src/images/purple_robot_s.png'
    });
    set_images({model: 6,
        east: RUR.BASE_URL + '/src/images/green_robot_e.png',
        north: RUR.BASE_URL + '/src/images/green_robot_n.png',
        west: RUR.BASE_URL + '/src/images/green_robot_w.png',
        south: RUR.BASE_URL + '/src/images/green_robot_s.png'
    });
    set_images({model: 7,
        east: RUR.BASE_URL + '/src/images/light_blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/light_blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/light_blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/light_blue_robot_s.png'
    });
    set_images({model: 8,
        east: RUR.BASE_URL + '/src/images/yellow_robot_e.png',
        north: RUR.BASE_URL + '/src/images/yellow_robot_n.png',
        west: RUR.BASE_URL + '/src/images/yellow_robot_w.png',
        south: RUR.BASE_URL + '/src/images/yellow_robot_s.png'
    });
    RUR.state.reset_default_robot_images_needed = false;
};

RUR.vis_robot.style = 0;

RUR.select_default_robot_model = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if ( !(style ===0 || style==1 || style==2 || style==3)){
        style = 0;
    }
    RUR.vis_robot.style = style;
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", style);
};
RUR.reset_default_robot_images();
// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;



RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    if (!robot) {
        console.warn("RUR.vis_robot.draw called with no robot.");
        return;
    }
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (robot.x > RUR.MAX_X || robot.y > RUR.MAX_Y) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    switch(robot._orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        case -1:
            RUR.vis_robot.draw_random(robot);
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace_history(robot);
};


// drawing random orientation robot
RUR.vis_robot.draw_random = function (robot) {
    "use strict";
    var x, y, width, height, image, random_orientation;
    if (!robot) {
        console.warn("RUR.vis_robot.draw_random called with no robot.");
        return;
    }

    if (!(robot._orientation == -1 || robot.orientation == -1)) {
        console.warn("RUR.vis_robot.draw_random but orientation != -1.");
        return;
    }
    if (robot.x > RUR.MAX_X || robot.y > RUR.MAX_Y) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    random_orientation = Math.floor(Math.random() * 4)
    switch(random_orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
            console.warn("default should not happen in RUR.vis_robot.draw_random.");
        }
    RUR.ROBOT_ANIM_CTX.drawImage(image, x, y, width, height);
    RUR.state.random_robot = true;
};




// TODO: extract to its own file, to reduce dependencies
RUR.vis_robot.update_trace_history = function (robot) {
    var offset, prev_offset, trace_segment={};
    // if we keep track of the trace during world editing tests,
    // it can end up saving a world with a trace history
    // defined.
    if (RUR.state.editing_world) {
        robot._trace_history = [];
        return;
    }
    if (robot._prev_x == robot.x &&
        robot._prev_y == robot.y &&
        robot._prev_orientation == robot._orientation) {
            return;
        }

    if (robot._trace_style == "invisible" || !robot._is_leaky) {
        trace_segment["color"] = "rgba(0,0,0,0)";
    } else {
        trace_segment["color"] = robot._trace_color;
    }

    offset = [[30, 30], [30, 20], [20, 20], [20, 30]];

    if(RUR.get_current_world().small_tiles) {
        offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        trace_segment["thickness"] = 2;
    } else if (robot._trace_style === "thick") {
        offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        trace_segment["thickness"] = 4;
    }  else if (robot._trace_style === "default") {
        trace_segment["thickness"] = 1;
    } // else, invisible and we do not care.

    prev_offset = offset[robot._prev_orientation%4];
    offset = offset[robot._orientation%4];

    trace_segment["prev_x"] = robot._prev_x * RUR.WALL_LENGTH + prev_offset[0];
    trace_segment["x"] = robot.x * RUR.WALL_LENGTH + offset[0];
    trace_segment["prev_y"] = RUR.HEIGHT - (robot._prev_y+1) * RUR.WALL_LENGTH + prev_offset[1];
    trace_segment["y"] = RUR.HEIGHT - (robot.y+1) * RUR.WALL_LENGTH + offset[1];

    robot._trace_history.push(trace_segment);
};

RUR.vis_robot.draw_trace_history  = function(robot) {
    var segment;
    for (segment of robot._trace_history) { //jshint ignore:line
        RUR.vis_robot.draw_trace_segment(segment);
    }
};

RUR.vis_robot.draw_trace_segment = function (segment) {
    "use strict";
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = segment["color"];
    ctx.lineWidth = segment["thickness"];
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(segment["prev_x"], segment["prev_y"]);
    ctx.lineTo(segment["x"], segment["y"]);
    ctx.stroke();
};

/** @function new_robot_images
 * @memberof RUR
 * @instance
 *
 * @desc Create new images for the robot.
 *
 * **Suggestion**: use in the Onload editor, so that images can be fetched
 * as soon as the world is loaded.
 *
 * **Python**: You _can_ use `new_robot_images` without the `RUR` prefix. For the
 * French version, you can use `nouvelles_images_de_robot`. However, this form
 * is preferable as it can be used with either Javascript or Python in the
 * Onload editor.
 *
 *
 * @param {Object} images A Javascript object (similar to a Python dict) that
 * holds the relevant attributes.
 *
 * @param {integer} [images.model]  The model number for the robot; it must
 * be a non-negative integer.
 * If it is one of [0, 1, 2, 3], it will take the place of one of the visible
 * robot images that can be selected by the user. The default value is 3.
 *
 * @param {string} [images.east]  A url for the source of the image to be used
 * for the robot in the East orientation. If it is not specified, the
 * default "classic" image will be used.
 *
 * @param {string} [images.north]  Similar to `images.east`.
 * @param {string} [images.west]  Similar to `images.east`.
 * @param {string} [images.south]  Similar to `images.east`.
 *
 * @todo Implement robot animation by cycling model; do it by instance
 * @todo Add example
 */

RUR.new_robot_images = function (images) {
    var model, random;
    if (images.model !== undefined) {
        model = images.model;
        if (!RUR.is_non_negative_integer(model)) {
            throw new ReeborgError(RUR.translate("Robot model must be a non-negative integer."));
        }
    } else {
        model = 3;
    }
    RUR.state.reset_default_robot_images_needed = true;

    set_images(images);

    // change the image displayed in the html file.
    if (model < 4) {
        $("#robot" + model + " img").attr("src", images.east);
    }

    RUR.select_default_robot_model(model);
};

},{"./../rur.js":52,"./../utils/validator.js":65}],9:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../world_api/things.js"); // why ?

//TODO add overlay object (like sensor)

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

/** @function set_world_size
 * @memberof RUR
 * @instance
 *
 * @desc Change the size of the world
 *
 * @param {integer} max_x The width of the world. Internally, we use
 * `cols` instead of `max_x`.
 * @param {integer} max_y The height of the world. Internally, we use
 * `rows` instead of `max_y`.
 * @todo Add example
 */

RUR.set_world_size = function (max_x, max_y) {
    "use strict";
    var height, width, canvas;
    if (RUR.get_current_world().small_tiles) {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH/2;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS/2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    if (max_x !== undefined && max_y !== undefined) {
        height = (max_y + 1.5) * RUR.WALL_LENGTH;
        width = (max_x + 1.5) * RUR.WALL_LENGTH;
        RUR.MAX_Y = max_y;
        RUR.MAX_X = max_x;
    } else {
        height = (RUR.MAX_Y + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.MAX_X + 1.5) * RUR.WALL_LENGTH;
    }
    RUR.get_current_world().rows = RUR.MAX_Y;
    RUR.get_current_world().cols = RUR.MAX_X;

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        for (canvas of RUR.CANVASES) { //jshint ignore:line
            canvas.width = width;
            canvas.height = height;
        }
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    RUR.vis_world.draw_all();
};

// retaining compatibility with some of Vincent Maille's worlds.
RUR.vis_world.compute_world_geometry = RUR.set_world_size;

RUR.vis_world.draw_all = function () {
    "use strict";
    var ctx, world = RUR.get_current_world();

    if (world.blank_canvas) { // for game environment
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        for (ctx of RUR.ALL_CTX) {
            ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        }
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.get_current_world().background_image !== undefined) {
        draw_background_image(RUR.BACKGROUND_IMAGE);
    } else {
        draw_grid_walls(RUR.BACKGROUND_CTX);
    }

    draw_coordinates();
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    var canvas, canvases, goal, world = RUR.get_current_world();

    // This is not the most efficient way to do things; ideally, one
    // would keep track of changes (e.g. addition or deletion of objects)
    // and only redraw when needed.  However, it is not critical at
    // the moment
    canvases = ["TILES_CTX", "BRIDGE_CTX", "DECORATIVE_OBJECTS_CTX",
                "OBSTACLES_CTX", "GOAL_CTX", "OBJECTS_CTX",
                "PUSHABLES_CTX", "TRACE_CTX", "WALL_CTX", "ROBOT_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    draw_border(RUR.WALL_CTX);
    draw_tiles(world.tiles, RUR.TILES_CTX);
    draw_tiles(world.bridge, RUR.BRIDGE_CTX);
    draw_tiles(world.decorative_objects, RUR.DECORATIVE_OBJECTS_CTX);
    draw_tiles(world.obstacles, RUR.OBSTACLES_CTX);
    draw_tiles(world.pushables, RUR.PUSHABLES_CTX);
    draw_tiles(world.walls, RUR.WALL_CTX);
    draw_tiles(world.objects, RUR.OBJECTS_CTX);

    draw_info();     // on ROBOT_CTX
    draw_robots(world.robots);  // on ROBOT_CTX; also draws the trace

    // Animated images are redrawn according to their own schedule
    // If we have not drawn any yet, we should see if we need to draw some
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    if (RUR.state.editing_world || RUR.state.visible_grid) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX, RUR.state.editing_world);
    }

    if (world.goal !== undefined){
        goal = true;
        if (world.goal.objects !== undefined){
            draw_tiles(world.goal.objects, RUR.GOAL_CTX, goal);
        }
        if (world.goal.walls !== undefined){
            draw_tiles(world.goal.walls, RUR.GOAL_CTX, goal);
        }
        if (world.goal.position !== undefined) {
            draw_goal_position(world.goal);
        }
    }

};

function draw_coordinates () {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, grid_size=RUR.WALL_LENGTH;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - grid_size/2;
    for(x=1; x <= RUR.MAX_X; x++){
        ctx.fillText(x, (x+0.5)*grid_size, y);
    }
    x = grid_size/2 -5;
    for(y=1; y <= RUR.MAX_Y; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*grid_size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
}

function draw_grid_walls (ctx, edit){
    "use strict";
    var i, j, image_e, image_n, wall_e, wall_n,
        x_offset_e, x_offset_n, y_offset_e, y_offset_n;

    if (edit) {
        wall_e = RUR.THINGS["east_edit"];
        wall_n = RUR.THINGS["north_edit"];
    } else {
        wall_e = RUR.THINGS["east_grid"];
        wall_n = RUR.THINGS["north_grid"];
    }

    image_e = wall_e.image;
    x_offset_e = wall_e.x_offset;
    y_offset_e = wall_e.y_offset;

    image_n = wall_n.image;
    x_offset_n = wall_n.x_offset;
    y_offset_n = wall_n.y_offset;

    for (i = 1; i <= RUR.MAX_X; i++) {
        for (j = 1; j <= RUR.MAX_Y; j++) {
            draw_single_object(image_e, i, j, ctx, x_offset_e, y_offset_e);
            draw_single_object(image_n, i, j, ctx, x_offset_n, y_offset_n);
        }
    }
}

function draw_border (ctx) {
    "use strict";
    var j, image, wall, x_offset, y_offset;

    wall = RUR.THINGS["east_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, 0, j, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, RUR.MAX_X, j, ctx, x_offset, y_offset);
    }

    wall = RUR.THINGS["north_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, 0, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, RUR.MAX_Y, ctx, x_offset, y_offset);
    }
}


function draw_robots (robots) {
    "use strict";
    var body, robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation == -1) { // skip random
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body);
        } else {
            RUR.vis_robot.draw(body); // draws trace automatically
        }
    }
}

function draw_random_robots (robots) {
    "use strict";
    var body, robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation != -1) { // not random
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body, true);
        } else {
            RUR.vis_robot.draw_random(body);
        }
    }
}


function draw_robot_clones (robot, random){
    "use strict";
    var i, clone;
    if (random) {
        RUR.ROBOT_ANIM_CTX.save();
        RUR.ROBOT_ANIM_CTX.globalAlpha = 0.4;
    } else {
        RUR.ROBOT_CTX.save();
        RUR.ROBOT_CTX.globalAlpha = 0.4;
    }

    for (i=0; i < robot.possible_initial_positions.length; i++){
        clone = JSON.parse(JSON.stringify(robot));
        clone.x = robot.possible_initial_positions[i][0];
        clone.y = robot.possible_initial_positions[i][1];
        clone._prev_x = clone.x;
        clone._prev_y = clone.y;
        if (random) {
            RUR.vis_robot.draw_random(clone);
        } else {
            RUR.vis_robot.draw(clone);
        }
    }
    if (random) {
        RUR.ROBOT_ANIM_CTX.restore();
    } else {
        RUR.ROBOT_CTX.restore();
    }
}



function draw_goal_position (goal) {
    "use strict";
    var image, i, coord, x_offset, y_offset, ctx;

    ctx = RUR.GOAL_CTX;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.THINGS[goal.position.image] !== undefined){
        image = RUR.THINGS[goal.position.image].image;
        x_offset = RUR.THINGS[goal.position.image].x_offset;
        y_offset = RUR.THINGS[goal.position.image].y_offset;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
                // In that case, it is ok to have x_offset and y_offset undefined.
        image = RUR.THINGS["green_home_tile"].image;
    }
    if (goal.possible_final_positions !== undefined && goal.possible_final_positions.length > 1){
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (i=0; i < goal.possible_final_positions.length; i++){
                coord = goal.possible_final_positions[i];
                draw_single_object(image, coord[0], coord[1], ctx, x_offset, y_offset);
        }
        ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx, x_offset, y_offset);
    }
}


function draw_tiles (tiles, ctx, goal){
    "use strict";
    var i, j, coords, keys, key, image, tile, colour, t, tile_array;
    if (tiles === undefined) {
        return;
    }

    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        coords = keys[key].split(",");
        i = parseInt(coords[0], 10);
        j = parseInt(coords[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile_array = tiles[keys[key]];
            if (Object.prototype.toString.call(tile_array) == "[object Object]") {
                tile_array = Object.keys(tile_array);
            }
            for (t=0; t<tile_array.length; t++) {
                tile = RUR.THINGS[tile_array[t]];
                if (tile === undefined || tile.color) {
                    if (tile === undefined) {
                        colour = tiles[keys[key]];
                    } else {
                        colour = tile.color;
                    }
                    draw_coloured_tile(colour, i, j, ctx);
                    continue;
                } else if (goal) {
                    image = tile.goal.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new ReeborgError("Problem in draw_tiles; goal image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                } else if (tile.choose_image === undefined){
                    image = tile.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new ReeborgError("Problem in draw_tiles; image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                }
            }
        }
    }
}

function draw_animated_images (){
    "use strict";
    var i, flag, anims, canvas, canvases, obj, ctx, world = RUR.get_current_world();
    clearTimeout(RUR.ANIMATION_FRAME_ID);

    canvases = ["TILES_ANIM_CTX", "BRIDGE_ANIM_CTX", "DECORATIVE_OBJECTS_ANIM_CTX",
                "OBSTACLES_ANIM_CTX", "GOAL_ANIM_CTX", "OBJECTS_ANIM_CTX",
                "PUSHABLES_ANIM_CTX", "ROBOT_ANIM_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    RUR.state.random_robot = false;
    draw_random_robots(world.robots);
    flag = RUR.state.random_robot; // flag is true when animated images are drawn on a given cycle

    anims = [[world.tiles, RUR.TILES_ANIM_CTX],
             [world.bridge, RUR.BRIDGE_ANIM_CTX],
             [world.decorative_objects, RUR.DECORATIVE_OBJECTS_ANIM_CTX],
             [world.obstacles, RUR.OBSTACLES_ANIM_CTX],
             [world.goal, RUR.GOAL_ANIM_CTX],
             [world.objects, RUR.OBJECTS_ANIM_CTX],
             [world.pushables, RUR.PUSHABLES_ANIM_CTX]];

    for (i=0; i < anims.length; i++) {
        obj = anims[i][0];
        if (obj) {
            ctx = anims[i][1];
            /* Important: flag must come after draw_anim to avoid
               short-circuit evaluation which would result in draw_anim
               being called only once.
            */
            flag = draw_anim(obj, ctx) || flag;
        }
    }

    if (flag) {
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }

    // make it known globally for refresh() whether or not we have drawn
    // animated images
    RUR.animated_images = flag;
}

function draw_anim (objects, ctx) {
    "use strict";
    var i, j, i_j, coords, flag, k, n, image, obj, obj_here, elem,
        recording_state, remove_flag, images_to_remove=[];

    flag = false;
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (Object.prototype.toString.call(obj_here) == "[object Object]") {
            obj_here = Object.keys(obj_here);
        }

        if (Object.prototype.toString.call(obj_here) == "[object Array]") {
            for (n=0; n < obj_here.length; n++) {
                obj = RUR.THINGS[obj_here[n]];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    remove_flag = _draw_single_animated(obj, coords[k], i, j, ctx, obj.x_offset, obj.y_offset);
                    if (remove_flag == RUR.END_CYCLE) {
                        images_to_remove.push([i, j, obj.name, ctx]);
                    }
                    flag = true;
                }
            }
        } else {
            console.warn("Problem: unknown type in draw_anim; canvas =", ctx.canvas);
            console.log("obj_here = ", obj_here, "objects = ", objects);
        }
    }

    for (k=0; k < images_to_remove.length; k++){
        // removing object normally result in the recording of a
        // frame since we normally want the display to be updated
        // to reflect the removal. Here, we are updating the display,
        // and we do not want to trigger new frames recording: at this
        // stage, we are playing back the recorded frames.
        recording_state = RUR.state.do_not_record;
        RUR.state.do_not_record = true;
        __remove_animated_object(images_to_remove[k]);
        RUR.state.do_not_record = false;
    }
    return flag;
}

function __remove_animated_object(args) {
    var x, y, name, ctx;
    x = args[0];
    y = args[1];
    name = args[2];
    ctx = args[3];

    switch (ctx) {
        case RUR.TILES_ANIM_CTX:
            RUR.remove_background_tile(name, x, y);
            break;
        case RUR.OBSTACLES_ANIM_CTX:
            RUR.remove_obstacle(name, x, y);
            break;
        default:
            console.warn("unknown ctx in __remove_animated_object.");
    }
}

function _draw_single_animated (obj, coords, i, j, ctx, x_offset, y_offset){
    var image, id = coords + ctx.canvas.id + obj.name;
    // each image is uniquely identified by its "id".
    image = obj.choose_image(id);
    if (image === undefined){
        console.warn("problem in _draw_single_animated; obj =", obj);
        throw new ReeborgError("Problem in _draw_single_animated at" + coords);
    } else if (image == RUR.END_CYCLE) {
        return RUR.END_CYCLE;
    }
    draw_single_object(image, i, j, ctx, x_offset, y_offset);
    return false;
}

function draw_coloured_tile (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, grid_size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.MAX_X || j > RUR.MAX_Y){
        return;
    }
    x = i*grid_size + thick/2;
    y = RUR.HEIGHT - (j+1)*grid_size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, grid_size, grid_size);
}

function draw_single_object (image, i, j, ctx, x_offset, y_offset) {
    var x, y, offset=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH,
        world = RUR.get_current_world();
    if (x_offset === undefined) {
        x_offset = 0;
    }
    if (y_offset === undefined) {
        y_offset = 0;
    }
    if (world.small_tiles) {
        x_offset /= 2;
        y_offset /= 2;
    }
    x = i*grid_size + offset + x_offset;
    y = RUR.HEIGHT - (j+1)*grid_size + offset + y_offset;
    try{
        if (world.small_tiles) {
            ctx.drawImage(image, x, y, image.width/2, image.height/2);
        } else {
            ctx.drawImage(image, x, y);
        }
    } catch (e) {
        console.warn("problem in draw_single_object", image, ctx, e);
    }
}


function draw_background_image (image) {
    // we draw the image so that it fills the entire world
    var thick=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH,
        image_width, image_height, world_width, world_height,
        x, y, ctx=RUR.BACKGROUND_CTX;

    world_width = RUR.MAX_X*grid_size;  // space to
    world_height = RUR.MAX_Y*grid_size; // be filled

    image_width = image.width;
    image_height = image.height;

    if (image_width > world_width) {
        image_width = world_width;  // crop
    }
    if (image_height > world_height) {
        image_height = world_height;
    }

    y = RUR.HEIGHT - (RUR.MAX_Y+1)*grid_size + thick; // location of top ...
    x = grid_size + thick;                            // ... left corner

    try{
        ctx.drawImage(image, 0, 0, image_width, image_height,
                             x, y, world_width, world_height);
    } catch (e) {
        console.warn("problem in draw_background_image", image, ctx, e);
    }
}

function compile_info () {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drawn - if anything.
    var coords, obj, quantity, world = RUR.get_current_world();
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (world.goal !== undefined && world.goal.objects !== undefined) {
        compile_partial_info(RUR.get_current_world().goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }

    if (world.objects !== undefined) {
        compile_partial_info(world.objects, RUR.vis_world.information, 'objects');
    }
}

function compile_partial_info (objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.warn("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], RUR.GREEN];
                            } else {
                                information[coords] = [obj, objects[coords][obj], RUR.RED];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
}

function draw_info () {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;

    if (RUR.state.do_not_draw_info) {
        return;
    }

    compile_info();
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;
    ctx.font = RUR.BACKGROUND_CTX.font;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                text_width = ctx.measureText(info).width/2;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                text_width = ctx.measureText(info).width/2;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
}

},{"./../rur.js":52,"./../translator.js":55,"./../world_api/things.js":77}],10:[function(require,module,exports){
function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}

function shiftTab(cm) {
  cm.execCommand("indentLess");
}

window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.library = CodeMirror.fromTextArea(document.getElementById('library-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
library.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.pre_code_editor = CodeMirror.fromTextArea(document.getElementById('pre-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
pre_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});
window.post_code_editor = CodeMirror.fromTextArea(document.getElementById('post-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
post_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.description_editor = CodeMirror.fromTextArea(document.getElementById('description'), {
  mode: {
    name: "htmlmixed"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
description_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.onload_editor = CodeMirror.fromTextArea(document.getElementById('onload-editor'), {
  mode: {
    name: "javascript"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
onload_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

},{}],11:[function(require,module,exports){

require("./../rur.js");
require("./create.js");
require("./../programming_api/blockly.js");
var msg = require("./../../lang/msg.js");

function _update_from_editor(world, name, _editor) {
    if ($("#add-"+name+"-to-world-btn").hasClass("blue-gradient")) {
        delete world[name];
    } else {
        world[name] = _editor.getValue();
    }
}

RUR.update_world_from_editors = function (world) {
    _update_from_editor(world, "blockly",RUR.blockly);
    _update_from_editor(world, "editor", editor);
    _update_from_editor(world, "library", library);
    _update_from_editor(world, "pre", pre_code_editor);
    _update_from_editor(world, "post", post_code_editor);
    _update_from_editor(world, "description", description_editor);
    _update_from_editor(world, "onload", onload_editor);
    return world;
};

function show_update_editor_dialog(world, editor_name, _editor) {
    if (world[editor_name] != _editor.getValue()) {
        dialog_update_editors_from_world.dialog("open");
    }
}

function set_button (name, content_present) {
    if (content_present &&
        $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            $("#add-" + name + "-to-world-btn").removeClass("blue-gradient");
            $("#add-" + name + "-to-world-btn").addClass("active-element");
    } else if (!content_present &&
        ! $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
        $("#add-" + name + "-ok").hide();
        $("#add-" + name + "-not-ok").show();
        $("#add-" + name + "-to-world-btn").addClass("blue-gradient");
        $("#add-" + name + "-to-world-btn").removeClass("active-element");
    }
}

function _update_user_editor (world, name, ed) {
    try {
        test_utils; // global variable defined for functional testing
        return;
    } catch (e) {}
    // For blockly, editor and library, when not running tests,
    // the user is given the choice to update the content or to keep their own.
    if (world[name]) {
        set_button("name", true);
        $("#update-"+name+"-content").show();
        show_update_editor_dialog(world, name, ed);
    } else {
        set_button("name", false);
        $("#update-"+name+"-content").hide();
    }
}

function _update_world_editor (world, name, ed) {
    // For editors defining the world: pre, post, description, onload.
    if (world[name]) {
        set_button(name, true);
        ed.setValue(world[name]);
    } else {
        set_button(name, false);
        ed.setValue('\n');
    }
}

RUR.update_editors = function (world) {
    _update_user_editor(world, "blockly", RUR.blockly);
    _update_user_editor(world, "editor", editor);
    _update_user_editor(world, "library", library);

    _update_world_editor (world, "pre", pre_code_editor);
    _update_world_editor (world, "post", post_code_editor);
    _update_world_editor (world, "description", description_editor);
    _update_world_editor (world, "onload", onload_editor);
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
    RUR.blockly.setValue(RUR.get_current_world().blockly);
    $("#update-blockly-content").hide();
    if  (!$("#update-editor-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-editor-content-btn").on("click", function(evt) {
    editor.setValue(RUR.get_current_world().editor);
    $("#update-editor-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-library-content-btn").on("click", function(evt) {
    library.setValue(RUR.get_current_world().library);
    $("#update-library-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-editor-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});

},{"./../../lang/msg.js":88,"./../programming_api/blockly.js":39,"./../rur.js":52,"./create.js":10}],12:[function(require,module,exports){

require("./../programming_api/output.js");
require("./../recorder/recorder.js");
require("./../editors/update.js");
require("./../world_utils/import_world.js");
require("./../ui/world_select.js");
require("./../permalink/permalink.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../listeners/stop.js");
require("./../utils/supplant.js");

RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.

        If "url" already exists and is the selected world BUT shortname is
        different than the existing name, a call
        World(url, shortname)
        will result in the shortname being updated.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    //TODO: see if we can replace this by an exception, and get rid of
    //the RUR.output dependency.
    if (url === undefined) {
        RUR.output.write(RUR.translate("World() needs an argument."));
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        // We never pay attention to the return value in the main program.
        // However, it is useful for testing purpose.
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_select.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url, shortname);
    if (RUR.file_io.status === "no link") {
        RUR.show_feedback("#Reeborg-shouts", RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError(RUR.translate("Could not find link: ") + url);
    } else if (RUR.file_io.status === "success") {
        RUR.state.prevent_playback = true;
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        RUR.stop();
        throw new RUR.ReeborgOK(RUR.translate("World selected").supplant({world: shortname}));
    }
};

RUR.file_io.last_url_loaded = undefined;
RUR.file_io.last_shortname_loaded = undefined;

RUR.file_io.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    if (RUR.file_io.last_url_loaded == url &&
        RUR.file_io.last_shortname_loaded == shortname) {
            return;
    } else {
        RUR.file_io.last_url_loaded = url;
        RUR.file_io.last_shortname_loaded = shortname;
    }
    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io.status = "no link";
            return;
        }
        RUR.world_utils.import_world(data);
        RUR.file_io.status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io.status = "no link";
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world_utils.import_world(data);
                }
                RUR.file_io.status = "success";
            }
        });
    }
};

/**
 * `load_js_module` makes it possible to modify Reeborg's World
 * by loading any javascript code and having it executed. To load
 * from other sites, CORS is used.
 *
 * Note that the CORS server may cache the result beyond our local
 * control. A script writer might be surprised to see that
 * things are not working as expected.
 */
RUR.load_js_module = function(url) {
    loadFile(url, eval_js);
};

function eval_js () {
    try {
        eval(this.responseText); //jshint ignore:line
    } catch (e) {
        console.error("error in attempting to evaluated loaded module");
        console.log(this.responseText);
        console.error(e);
    }
}
/* adapted from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests */

function xhrSuccess () { this.callback.apply(this, this.arguments); }

function xhrError () { console.error(this.statusText); }

function loadFile (sURL, fCallback) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.onload = xhrSuccess;
  oReq.onerror = xhrError;

  if (sURL.startsWith("http")){  // TODO: test this...
    sURL = 'http://cors-anywhere.herokuapp.com/' + sURL;
  }
  oReq.open("get", sURL, true);
  oReq.send(null);
}

// TODO: move to load_modules  (see above code too)
//       and ensure that it still works.
// TODO: add (q)unit tests

/* The purpose of install_extra is to enable extensions to Reeborg's World
   to be added.

   See also RUR.load_js_module()
*/
RUR.install_extra = function(url) {
    loadFile(url, RUR.extra_python_content);
};
/**
 * @function extra_python_content
 * @memberof RUR
 * @instance
 *
 * @desc "Installs" a python module defined as a string parameter to
 * this function. Whereas it can be used from both a Javascript or Python code,
 * multi-line code samples are **much** easier to write using Python.
 *
 * To be used as alternative to the Python function `install_extra` which
 * install a python module named `extra` from a url.
 *
 * @param {string} python_code The Python code which is the content of the
 * desired module
 *
 * @todo add example
 * @todo add tutorial
 */
RUR.extra_python_content = function (python_code) {
    if (python_code) {
        $("#extra").html(python_code);
    } else {
        $("#extra").html(this.responseText);
    }
}
window.get_extra_content = function () {
    var extra_content = $("#extra").html();
    console.log("extra content = ", extra_content);
    return extra_content;
};


},{"./../editors/update.js":11,"./../listeners/stop.js":32,"./../permalink/permalink.js":35,"./../programming_api/exceptions.js":42,"./../programming_api/output.js":43,"./../recorder/recorder.js":47,"./../translator.js":55,"./../ui/world_select.js":59,"./../utils/supplant.js":64,"./../world_utils/import_world.js":85}],13:[function(require,module,exports){
/*  Handler of special on-screen keyboard
*/

require("./../rur.js");
require("./../dialogs/create.js");
require("./../listeners/editors_tabs.js");
require("./../translator.js");
var msg = require("./../../lang/msg.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="py-repl"){
                $("#kbd-py-console-btn").show();
            } else {
                $("#kbd-python-btn").show();
            }
            break;
        case "javascript":
            $("#kbd-javascript-btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert_statement = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
    RUR.kbd.enter();
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py-console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console(txt);
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR.state.input_method==="py-repl") {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd-command").hide();
    $(".kbd-condition").hide();
    $(".kbd-objects").hide();
    $(".kbd-python").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("active-element")) {
        $("#kbd-command-btn").removeClass("active-element");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("active-element")) {
        $("#kbd-condition-btn").removeClass("active-element");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("active-element")) {
        $("#kbd-python-btn").removeClass("active-element");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("active-element")) {
        $("#kbd-py-console-btn").removeClass("active-element");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("active-element")) {
        $("#kbd-javascript-btn").removeClass("active-element");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("active-element")) {
        $("#kbd-objects-btn").removeClass("active-element");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("active-element")) {
        $("#kbd-special-btn").removeClass("active-element");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("active-element");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("active-element");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("active-element");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("active-element");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("active-element");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("active-element");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("active-element");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="py-repl") {
            $(".no-console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

function add_onclick_select(arg) {
    var id = arg + "-btn";
    $("#"+id).on("click", function (evt) {
        RUR.kbd.select(arg);
    });
    msg.record_id(id, id);
}

msg.record_title("ui-dialog-title-special-keyboard", "Reeborg's basic keyboard");
add_onclick_select("kbd-command");
add_onclick_select("kbd-condition");
add_onclick_select("kbd-python");
add_onclick_select("kbd-py-console");
add_onclick_select("kbd-javascript");
add_onclick_select("kbd-objects");
add_onclick_select("kbd-special");

function add_onclick_insert_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}
add_onclick_insert_function_statement("kbd-move", "move");
add_onclick_insert_function_statement("kbd-turn-left", "turn_left");
add_onclick_insert_function_statement("kbd-take", "take");
add_onclick_insert_function_statement("kbd-put", "put");
add_onclick_insert_function_statement("kbd-build-wall", "build_wall");
add_onclick_insert_function_statement("kbd-pause", "pause");
add_onclick_insert_function_statement("kbd-done", "done");
add_onclick_insert_statement("kbd-think", "think(100)");
add_onclick_insert_statement("kbd-sound", "sound(True)");
add_onclick_insert_statement("kbd-sound-js", "sound(true)");
add_onclick_insert_function_statement("kbd-world", 'World');
add_onclick_insert_function_statement("kbd-UsedRobot", "UsedRobot");
add_onclick_insert_function_statement("kbd-newUsedRobot", "new UsedRobot");
add_onclick_insert_function_statement("kbd-no-highlight", "no_highlight");

function add_onclick_insert(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}

add_onclick_insert_function("kbd-at-goal", "at_goal");
add_onclick_insert_function("kbd-front-is-clear", "front_is_clear");
add_onclick_insert_function("kbd-right-is-clear", "right_is_clear");
add_onclick_insert_function("kbd-wall-in-front", "wall_in_front");
add_onclick_insert_function("kbd-wall-on-right", "wall_on_right");
add_onclick_insert_function("kbd-object-here", "object_here");
add_onclick_insert_function("kbd-carries-object", "carries_object");
add_onclick_insert_function("kbd-is-facing-north", "is_facing_north");

function add_onclick_insert_object(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert('"'+RUR.translate(arg)+'"');
    });
    msg.record_id(id);
}
add_onclick_insert_object("kbd-token", "token");
add_onclick_insert_object("kbd-apple", "apple");
add_onclick_insert_object("kbd-banana", "banana");
add_onclick_insert_object("kbd-carrot", "carrot");
add_onclick_insert_object("kbd-daisy", "daisy");
add_onclick_insert_object("kbd-dandelion", "dandelion");
add_onclick_insert_object("kbd-leaf", "leaf");
add_onclick_insert_object("kbd-orange", "orange");
add_onclick_insert_object("kbd-square", "square");
add_onclick_insert_object("kbd-star", "star");
add_onclick_insert_object("kbd-strawberry", "strawberry");
add_onclick_insert_object("kbd-triangle", "triangle");
add_onclick_insert_object("kbd-tulip", "tulip");

add_onclick_insert_untranslated_statement("kbd-js-var", "var ");
add_onclick_insert_untranslated("kbd-js-function", "function ? { \n\n}");
add_onclick_insert_untranslated("kbd-js-if", "if ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-elif", "else if ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-else", "else { \n\n}");
add_onclick_insert_untranslated("kbd-js-while", "while ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-for", "for (? ; ? ; ?) { \n\n}");
add_onclick_insert_untranslated("kbd-js-true", "true");
add_onclick_insert_untranslated("kbd-js-false", "false");
add_onclick_insert_untranslated("kbd-js-undefined", "undefined");
add_onclick_insert_untranslated("kbd-js-not", "!");
add_onclick_insert_untranslated("kbd-js-and", "&&");
add_onclick_insert_untranslated("kbd-js-or", "||");
add_onclick_insert_function_statement("kbd-js-write", "write");
add_onclick_insert_untranslated_statement("kbd-js-return", "return");
add_onclick_insert_untranslated_statement("kbd-js-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-js-break", "break");

add_onclick_insert_untranslated_statement("kbd-py-def", "def ? ( ):");
add_onclick_insert_untranslated_statement("kbd-py-if", "if ? :");
add_onclick_insert_untranslated_statement("kbd-py-elif", "elif ? :");
add_onclick_insert_untranslated_statement("kbd-py-else", "else:");
add_onclick_insert_untranslated_statement("kbd-py-while", "while ? :");
add_onclick_insert_untranslated_statement("kbd-py-repeat", "repeat ? :");
add_onclick_insert_statement("kbd-py-library", "from library import ?");
add_onclick_insert_untranslated_statement("kbd-py-for", "for ? in ? :");
add_onclick_insert_untranslated_statement("kbd-py-print", "print()");
add_onclick_insert_untranslated_statement("kbd-py-range", "range(?)");
add_onclick_insert_untranslated_statement("kbd-py-true", "True");
add_onclick_insert_untranslated_statement("kbd-py-false", "False");
add_onclick_insert_untranslated_statement("kbd-py-none", "None");
add_onclick_insert_untranslated_statement("kbd-py-not", "not");
add_onclick_insert_untranslated_statement("kbd-py-and", "and");
add_onclick_insert_untranslated_statement("kbd-py-or", "or");
add_onclick_insert_untranslated_statement("kbd-py-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-py-break", "break");
add_onclick_insert_untranslated_statement("kbd-py-return", "return ?");
add_onclick_insert_untranslated_statement("kbd-py-pass", "pass");

add_onclick_insert_untranslated("kbd-pyrepl-def", "def ");
add_onclick_insert_untranslated("kbd-pyrepl-if", "if ");
add_onclick_insert_untranslated("kbd-pyrepl-elif", "elif ");
add_onclick_insert_untranslated("kbd-pyrepl-else", "else:");
add_onclick_insert_untranslated("kbd-pyrepl-while", "while ");
add_onclick_insert("kbd-pyrepl-library", "from library import ?");
add_onclick_insert_untranslated("kbd-pyrepl-for", "for ");
add_onclick_insert_untranslated("kbd-pyrepl-in", "in ");
add_onclick_insert_untranslated("kbd-pyrepl-print", "print(");
add_onclick_insert_untranslated("kbd-pyrepl-range", "range(");
add_onclick_insert_untranslated("kbd-pyrepl-true", "True");
add_onclick_insert_untranslated("kbd-pyrepl-false", "False");
add_onclick_insert_untranslated("kbd-pyrepl-none", "None");
add_onclick_insert_untranslated("kbd-pyrepl-not", "not");
add_onclick_insert_untranslated("kbd-pyrepl-and", "and");
add_onclick_insert_untranslated("kbd-pyrepl-or", "or");
add_onclick_insert_untranslated_statement("kbd-pyrepl-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-pyrepl-break", "break");
add_onclick_insert_untranslated_statement("kbd-pyrepl-return", "return");
add_onclick_insert_untranslated_statement("kbd-pyrepl-pass", "pass");

add_onclick_insert_untranslated("kbd-colon", ":");
add_onclick_insert_untranslated("kbd-semi-colon", ";");
add_onclick_insert_untranslated("kbd-sharp", "#");
add_onclick_insert_untranslated("kbd-double-quote", "\"");
add_onclick_insert_untranslated("kbd-single-quote", "'");
add_onclick_insert_untranslated("kbd-equal", "=");
add_onclick_insert_untranslated("kbd-less-than", "<");
add_onclick_insert_untranslated("kbd-greater-than", ">");
add_onclick_insert_untranslated("kbd-ampersand", "&");
add_onclick_insert_untranslated("kbd-vertical-bar", "|");
add_onclick_insert_untranslated("kbd-parens", "( )");
add_onclick_insert_untranslated("kbd-curly-brackets", "{ }");
add_onclick_insert_untranslated("kbd-square-brackets", "[ ]");

$("#kbd-tab").on("click", function (evt) {
    RUR.kbd.tab();
});
msg.record_id("kbd-tab", "tab");
$("#kbd-shift-tab").on("click", function (evt) {
    RUR.kbd.shift_tab();
});
msg.record_id("kbd-shift-tab", "shift-tab");
$("#kbd-enter").on("click", function (evt) {
    RUR.kbd.enter();
});
msg.record_id("kbd-enter", "enter");
$("#kbd-undo").on("click", function (evt) {
    RUR.kbd.undo();
});
msg.record_id("kbd-undo", "UNDO");
$("#kbd-redo").on("click", function (evt) {
    RUR.kbd.redo();
});
msg.record_id("kbd-redo", "REDO");

function add_onclick(id, fn, arg, record, enter) {
    $("#"+id).on("click", function (evt) {
        fn(arg);
    });
    if (enter) {
        RUR.kbd.enter();
    }
    if (record) {
        msg.record_id(id, id);
    }
}

},{"./../../lang/msg.js":88,"./../dialogs/create.js":3,"./../listeners/editors_tabs.js":19,"./../rur.js":52,"./../translator.js":55}],14:[function(require,module,exports){
/* Menu driven world editor */


require("./../translator.js");
require("./../rur.js");
require("./../default_tiles/tiles.js");

require("./../robot/robot.js");
require("./../editors/update.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../world_get/world_get.js");
require("./../world_set/world_set.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../editors/create.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/objects.js");
require("./../world_set/add_robot.js");
require("./../world_set/give_object_to_robot.js");

require("./../world_api/walls.js");

var edit_robot_menu = require("./../ui/edit_robot_menu.js");
var dialog_add_object = require("./../dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./../dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./../dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./../dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./../dialogs/select_colour.js").dialog_select_colour;


var identical = require("./../utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.give_to_robot_flag = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root, x, y, position;
    split = RUR.we.edit_world_flag.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects_flag) {
                toggle_decorative_object(value);
            } else {
                add_object(value);
            }
            break;
        case "tile":
            toggle_tile(value);
            break;
        case "solid_object":
            toggle_obstacle(value);
            break;
        case "world":
            if (value == "walls") {
                toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                toggle_goal_wall();
            } else {
                add_goal_object(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

function toggle_decorative_object(value) {
    "use strict";
    var x, y, position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (RUR.is_decorative_object(value, x, y)) {
        RUR.remove_decorative_object(value, x, y);
    } else {
        RUR.add_decorative_object(value, x, y);
    }
}

function alert_1 (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
}

function alert_2 (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
}

RUR.we.select = function (choice) {
    "use strict";
    var value, split, root;
    RUR.we.edit_world_flag = choice;
    split = choice.split("-");
    root = split[0];
    value = split[1];
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    switch (root) {
        case "robot":
            switch (value) {
            case "place":
                alert_1("Click on world to move robot.");
                break;
            case "add":
                RUR.add_robot(RUR.robot.create_robot(1, 1));
                alert_1("Added robot.");
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.give_to_robot_flag = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects_flag = true;
            $("#edit-world-objects").show();
            RUR.we.give_to_robot_flag = false;
            alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects_flag = false;
                $("#edit-world-objects").show();
                RUR.we.give_to_robot_flag = false;
                alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                alert_1("Click on desired object below.");
                break;
            case "walls":
                alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.give_to_robot_flag) {
                give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                alert_2("Click on world to add object.", value);
            }
            break;
        case "tile":
            $("#edit-tile").show();
            alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            fill_with_tile(value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                alert_2("Click on world to set number of goal objects.", value);
                break;
            }
        break;
        case "set":
            RUR.world_set.dialog_set_dimensions.dialog('open');
            break;
    }
};

RUR.we.toggle_editing_mode = function () {
    if (RUR.state.editing_world) {  // done editing
        $("#pre-code-tab").parent().hide();
        $("#post-code-tab").parent().hide();
        $("#description-tab").parent().hide();
        $("#onload-editor-tab").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        // RUR.WALL_COLOR = "brown";
        // RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        $("#editor-tab").trigger('click');
    } else {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        // RUR.WALL_COLOR = "black";
        // RUR.SHADOW_WALL_COLOR = "#ccd";
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
    RUR.vis_world.draw_all();
};

record_id("edit-world", "EDIT WORLD");
record_id("edit-world-text", "EDIT WORLD EXPLAIN");
RUR.create_and_activate_dialogs( $("#edit-world"), $("#edit-world-panel"),
                                 {}, function () {RUR.we.toggle_editing_mode();
                                     $("#more-menus").dialog("minimize"); });

function place_robot () {
    "use strict";
    var position, world=RUR.get_current_world(), robot, arr=[], pos, present=false;
    position = RUR.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.possible_initial_positions){
                robot.possible_initial_positions = [[robot.x, robot.y]];
            }
        } else {
            robot = RUR.robot.create_robot(position[0], position[1]);
            RUR.add_robot(robot);
            robot.possible_initial_positions = [[robot.x, robot.y]];
            return;
        }
    }

    for (var i=0; i < robot.possible_initial_positions.length; i++){
        pos = robot.possible_initial_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
        } else {
            arr.push(pos);
            robot.x = pos[0];
            robot.y = pos[1];
        }
    }
    if (!present){
        arr.push(position);
        robot.x = position[0];
        robot.y = position[1];
    }

    if (arr.length===0){
        RUR.get_current_world().robots = [];
        edit_robot_menu.toggle();
        return;
    }

    robot.possible_initial_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
}


function give_objects_to_robot (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
}


RUR.we.turn_robot = function (orientation) { // function used on reeborg.html
    RUR.get_current_world().robots[0]._orientation = orientation;
    RUR.get_current_world().robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

function calculate_wall_position () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.mouse_x - $("#robot-anim-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-anim-canvas").offset().top;

    y = RUR.BACKGROUND_CANVAS.height - y;  // count from bottom

    x /= RUR.WALL_LENGTH;
    y /= RUR.WALL_LENGTH;
    remain_x = x - Math.floor(x);
    remain_y = y - Math.floor(y);

    // del_  denotes the distance to the closest wall
    if (Math.abs(1.0 - remain_x) < remain_x) {
        del_x = Math.abs(1.0 - remain_x);
    } else {
        del_x = remain_x;
    }

    if (Math.abs(1.0 - remain_y) < remain_y) {
        del_y = Math.abs(1.0 - remain_y);
    } else {
        del_y = remain_y;
    }

    x = Math.floor(x);
    y = Math.floor(y);

    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y < 0.5) {
            y -= 1;
        }
    }

    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.MAX_X) {
        x = RUR.MAX_X;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.MAX_Y) {
        y = RUR.MAX_Y;
    }

    return [x, y, orientation];
}

function __toggle_wall (goal) {
    var position, x, y, orientation;
    position = calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];

    if (RUR.is_wall(orientation, x, y, goal)){
        RUR.remove_wall(orientation, x, y, goal);
    } else {
        RUR.add_wall(orientation, x, y, goal);
    }
}

function toggle_wall () {
    __toggle_wall(false);
}

function toggle_goal_wall () {
    __toggle_wall(true);
}

function set_add_object_position () {
    var position, x, y;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    RUR.state.x = x;
    RUR.state.y = y;
}

function add_object (specific_object){
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
}

function add_goal_object (specific_object){
    "use strict";
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#goal-object-name").html(RUR.translate(specific_object));
    dialog_goal_object.dialog("open");
}

/** @function set_goal_position
 * @memberof RUR
 * @instance
 * @summary TODO This needs to be refactored and documented
 *
 * @desc Ceci doit être documenté
 *
 */


RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.get_current_world(), robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_final_positions === undefined) {
        RUR.utils.ensure_key_for_obj_exists(goal, "possible_final_positions");
        if (goal.position !== undefined) {
            goal.possible_final_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR.utils.ensure_key_for_obj_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
            break;
        } else {
            arr.push(pos);
            goal.position.x = pos[0];
            goal.position.y = pos[1];
        }
    }

    if (!present){
        arr.push(position);
        goal.position.x = position[0];
        goal.position.y = position[1];
    }
    goal.possible_final_positions = arr;

    if (arr.length === 0) {
        delete RUR.get_current_world().goal.position;
        delete RUR.get_current_world().goal.possible_final_positions;
        if (Object.keys(RUR.get_current_world().goal).length === 0) {
            delete RUR.get_current_world().goal;
        }
        $("#edit-world-turn").hide();
    }
};

function toggle_tile (name){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position;

    if (!name) {  // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_background_tile(name, x, y)) {
        RUR.remove_background_tile(name, x, y);
    } else {
        RUR.add_background_tile(name, x, y);
    }
}

function fill_with_tile (name) {
    "use strict";
    var x, y;

    if (!name) {    // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR.fill_background(name);

    RUR.vis_world.refresh_world_edited();
    $("#cmd-result").html("");
}


function toggle_obstacle (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_obstacle(obj, x, y)) {
        RUR.remove_obstacle(obj, x, y);
    } else {
        RUR.add_obstacle(obj, x, y);
    }
}


// mouse clicks also requested in listeners/canvas.js
$("#robot-anim-canvas").on("click", function (evt) {
    if (RUR.state.editing_world && RUR.we.edit_world_flag !== undefined) {
        RUR.we.edit_world();
    }
    RUR.world_get.world_info();
});

},{"./../default_tiles/tiles.js":1,"./../dialogs/add_object.js":2,"./../dialogs/create.js":3,"./../dialogs/give_object.js":4,"./../dialogs/goal_object.js":5,"./../dialogs/select_colour.js":6,"./../dialogs/set_background_image.js":7,"./../drawing/visible_world.js":9,"./../editors/create.js":10,"./../editors/update.js":11,"./../listeners/canvas.js":18,"./../programming_api/exceptions.js":42,"./../robot/robot.js":49,"./../rur.js":52,"./../translator.js":55,"./../ui/edit_robot_menu.js":57,"./../utils/identical.js":61,"./../utils/key_exist.js":62,"./../utils/supplant.js":64,"./../world_api/objects.js":73,"./../world_api/walls.js":78,"./../world_get/world_get.js":79,"./../world_set/add_robot.js":80,"./../world_set/give_object_to_robot.js":81,"./../world_set/world_set.js":83}],15:[function(require,module,exports){
/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

require("./programming_api/commands.js"); // to control Reeborg's actions
require("./gui_tools/world_editor.js"); // the world editor is not required by other modules
require("./start_session.js");

// TODO: animated robots/ decorative objects, objects
// TODO: document all world-editing functions, make them directly available as methods of RUR.
// TODO: Use jsdoc and put on site.
// TODO: add turtle mode (see blockly for comparing with expected solution); ensure a blockly counterpart
// TODO: implement paint() and colour_here() in Blockly

},{"./gui_tools/world_editor.js":14,"./programming_api/commands.js":40,"./start_session.js":53,"./utils/cors.js":60}],16:[function(require,module,exports){
/*
 * jQuery UI Dialog 1.8.16
 * w/ Minimize & Maximize Support
 * by Elijah Horton (fieryprophet@yahoo.com)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 *
 * Modified by André Roberge to remove some IE support which is irrelevant for me.
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	// support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 300,
		minimizeText: 'minimize',
		maximizeText: 'maximize',
		minimize: true,
		maximize: true,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog);
			if(options.minimize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMinimize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-minimize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMinimize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMinimize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMinimize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMinimize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.minimize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-minusthick'
					)
					.text(options.minimizeText)
					.appendTo(uiDialogTitlebarMinimize);
			}
			if(options.maximize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMaximize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-maximize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMaximize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMaximize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMaximize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMaximize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.maximize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMaximizeText = (self.uiDialogTitlebarMaximizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-plusthick'
					)
					.text(options.maximizeText)
					.appendTo(uiDialogTitlebarMaximize);
					$(uiDialogTitlebar).dblclick(function(event) {
						self.maximize(event);
						return false;
					});
			}
			if(options.close !== false){
				var uiDialogTitlebarClose = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-close ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarClose.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarClose.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarClose.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarClose.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.close(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-closethick'
					)
					.text(options.closeText)
					.appendTo(uiDialogTitlebarClose);
			}

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		//handling of deprecated beforeclose (vs beforeClose) option
		//Ticket #4669 http://dev.jqueryui.com/ticket/4669
		//TODO: remove in 1.9pre
		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;
		self._min = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	minimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeMinimize', event)) {
			return;
		}
		if(!ui.data('is-minimized')){
			if(self.options.minimize && typeof self.options.minimize !== "boolean" && $(self.options.minimize).length > 0){
				self._min = $('<a>' + (ui.find('span.ui-dialog-title').html().replace(/&nbsp;/, '') || 'Untitled Dialog') + '</a>')
					.attr('title', 'Click to restore dialog').addClass('ui-corner-all ui-button').click(function(event){self.unminimize(event);});
				$(self.options.minimize).append(self._min);
				ui.data('is-minimized', true).hide();
			} else {
				if(ui.is( ":data(resizable)" )) {
					ui.data('was-resizable', true).resizable('destroy');
				} else {
					ui.data('was-resizable', false)
				}
				ui.data('minimized-height', ui.height());
				ui.find('.ui-dialog-content').hide();
				ui.find('.ui-dialog-titlebar-maximize').hide();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '1.8em').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s')
					.find('span').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s').click(function(event){self.unminimize(event); return false;});;
				ui.data('is-minimized', true).height('auto');
			}
		}
		return self;
	},

	unminimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeUnminimize', event)) {
			return;
		}
		if(ui.data('is-minimized')){
			if(self._min){
				self._min.unbind().remove();
				self._min = false;
				ui.data('is-minimized', false).show();
				self.moveToTop();
			} else {
				ui.height(ui.data('minimized-height')).data('is-minimized', false).removeData('minimized-height').find('.ui-dialog-content').show();
				ui.find('.ui-dialog-titlebar-maximize').show();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '3.3em').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick')
					.find('span').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick').click(function(event){self.minimize(event); return false;});
				if(ui.data('was-resizable') == true) {
					self._makeResizable(true);
				}
			}
		}
		return self;
	},

	maximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeMaximize', event)) {
			return;
		}
		if(!ui.data('is-maximized')){
			if(ui.is( ":data(draggable)" )) {
				ui.data('was-draggable', true).draggable('destroy');
			} else {
				ui.data('was-draggable', false)
			}
			if(ui.is( ":data(resizable)" )) {
				ui.data('was-resizable', true).resizable('destroy');
			} else {
				ui.data('was-resizable', false)
			}
			ui.data('maximized-height', ui.height()).data('maximized-width', ui.width()).data('maximized-top', ui.css('top')).data('maximized-left', ui.css('left'))
				.data('is-maximized', true).height($(window).height()-8).width($(window).width()+9).css({"top":0, "left": 0}).find('.ui-dialog-titlebar-minimize').hide();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw')
				.find('span').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw').click(function(event){self.unmaximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.unmaximize(event); return false;});
		}
		return self;
	},

	unmaximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeUnmaximize', event)) {
			return;
		}
		if(ui.data('is-maximized')){
			ui.height(ui.data('maximized-height')).width(ui.data('maximized-width')).css({"top":ui.data('maximized-top'), "left":ui.data('maximized-left')})
				.data('is-maximized', false).removeData('maximized-height').removeData('maximized-width').removeData('maximized-top').removeData('maximized-left').find('.ui-dialog-titlebar-minimize').show();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick')
				.find('span').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick').click(function(){self.maximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.maximize(event); return false;});
			if(ui.data('was-draggable') == true) {
				self._makeDraggable(true);
			}
			if(ui.data('was-resizable') == true) {
				self._makeResizable(true);
			}
		}
		return self;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}
		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		// prevent tabbing out of modal dialogs
		if (options.modal) {
			uiDialog.bind('keypress.ui-dialog', function(event) {
				if (event.keyCode !== $.ui.keyCode.TAB) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		// if we already have a button pane, remove it
		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				// can't use .attr( props, true ) with jQuery 1.3.2.
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}
		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui){
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			//.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			//handling of deprecated beforeclose (vs beforeClose) option
			//Ticket #4669 http://dev.jqueryui.com/ticket/4669
			//TODO: remove in 1.9pre
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				// ensure that we always pass a string
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				// currently resizable, changing handles
				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				// currently non-resizable, becoming resizable
				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.16",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		return $(document).height() + 'px';
	},

	width: function() {
		return $(document).width() + 'px';
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));
},{}],17:[function(require,module,exports){
require("./canvas.js");
require("./editors_tabs.js");
require("./frame_slider.js");
require("./human_language.js");
require("./memorize_world.js");
require("./onclick.js");
require("./pause.js");
require("./programming_mode.js");
require("./reload.js");
require("./reverse_step.js");
require("./robot_model.js");
require("./run.js");
require("./select_world_change.js");
require("./step.js");
require("./stop.js");
require("./toggle_highlight.js");
require("./toggle_watch.js");

},{"./canvas.js":18,"./editors_tabs.js":19,"./frame_slider.js":20,"./human_language.js":21,"./memorize_world.js":22,"./onclick.js":23,"./pause.js":24,"./programming_mode.js":25,"./reload.js":26,"./reverse_step.js":27,"./robot_model.js":28,"./run.js":29,"./select_world_change.js":30,"./step.js":31,"./stop.js":32,"./toggle_highlight.js":33,"./toggle_watch.js":34}],18:[function(require,module,exports){
require("./../rur.js");

$("#robot-anim-canvas").mousemove(function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
    handleMouseMove(evt);
});
$("#robot-anim-canvas").on("click", function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
}); // mouse clicks also requested in world_editor.js (at bottom)

/* tooltip intended to provide information about objects carried by robot */
var tooltip = {};
tooltip.canvas = document.getElementById("tooltip");
tooltip.ctx = tooltip.canvas.getContext("2d");

function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.get_current_world();
    x = evt.pageX - $("#robot-anim-canvas").offset().left;
    y = evt.pageY - $("#robot-anim-canvas").offset().top;
    position = RUR.calculate_grid_position();
    tooltip.canvas.style.left = "-200px";
    if (!tooltip.mouse_contained) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.possible_initial_positions === undefined) {
                robot.possible_initial_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.possible_initial_positions.length; j++){
                pos = robot.possible_initial_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        tooltip.canvas.style.left = x+20 + "px";
        tooltip.canvas.style.top = y + "px";
        tooltip.ctx.clearRect(0, 0, tooltip.canvas.width, tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.THINGS[objects_carried[i]].image;
            if (image === undefined) {
                image = RUR.THINGS[objects_carried[i]]["image0"];
            }
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite" || nb_obj == Infinity) {
                nb_obj = "∞";
            }
            tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
}

RUR.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.mouse_x - $("#robot-anim-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-anim-canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

    tooltip.mouse_contained = true;
    if (x < 1 ) {
        x = 1;
        tooltip.mouse_contained = false;
    } else if (x > RUR.MAX_X) {
        x = RUR.MAX_X;
        tooltip.mouse_contained = false;
    }
    if (y < 1 ) {
        y = 1;
        tooltip.mouse_contained = false;
    } else if (y > RUR.MAX_Y) {
        y = RUR.MAX_Y;
        tooltip.mouse_contained = false;
    }
    return [x, y];
};

},{"./../rur.js":52}],19:[function(require,module,exports){
require("./../editors/create.js");
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
    heightStyle: "content",
    activate: function(event, ui){
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
});

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

$("#editor-panel").resizable({
    resize: function() {
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
}).draggable({cursor: "move", handle: "ul"});


$("#editor-tab").on("click", function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
});


$("#library-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});

},{"./../../lang/msg.js":88,"./../editors/create.js":10}],20:[function(require,module,exports){
require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");

var frame_selector = document.getElementById("frame-selector"),
    frame_id_info = document.getElementById("frame-id");

RUR.update_frame_nb_info = function() {
    var frame_no=0, max_frame_nb;
    if (RUR.state.error_recorded) {
        max_frame_nb = RUR.nb_frames-1;
    } else {
        max_frame_nb = RUR.nb_frames;
    }
    try {  // termporarily keeping the "old" version compatible
        if (RUR.nb_frames === 0) {
            frame_id_info.innerHTML = "0/0";
            frame_selector.value = 0;
            frame_selector.min = 0;
            frame_selector.max = 0;
        } else {
            frame_selector.max = max_frame_nb;
            frame_selector.value = RUR.current_frame_no;
            // do not display zero-based index as this would confuse
            // beginners ... especially without no additional explanation.
            frame_no = Math.min(RUR.current_frame_no+1, max_frame_nb+1);
            frame_id_info.innerHTML = frame_no + "/" + (max_frame_nb+1);
        }
    } catch (e) {}
};


$("#frame-selector").on("input change", function() {
    if (RUR.state.playback) {
        return;
    }
    RUR.current_frame_no = parseInt(frame_selector.value, 10);
    if (RUR.current_frame_no <= 0){
        $("#reverse-step").attr("disabled", "true");
    } else if ($("#reverse-step").attr("disabled")) {
        $("#reverse-step").removeAttr("disabled");
    }

    if (RUR.current_frame_no == RUR.nb_frames) {
        $("#step").attr("disabled", "true");
    } else if ($("#step").attr("disabled")) {
        $("#step").removeAttr("disabled");
    }
    RUR.update_frame_nb_info();
    // TODO: see if dependency needs to be set properly
    RUR.rec.display_frame();
});

},{"./../runner/runner.js":50,"./../rur.js":52,"./reload.js":26}],21:[function(require,module,exports){
require("./../rur.js");
require("./../programming_api/reeborg_en.js");
require("./../programming_api/reeborg_fr.js");
require("./../programming_api/blockly.js");
require("./../ui/custom_world_select.js");

var msg = require("./../../lang/msg.js");
var update_url = require("./../utils/parseuri.js").update_url;

msg.record_id("human-language");
msg.record_id("mixed-language-info");

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}

function update_translations(lang) {
    $("#mixed-language-info").show();
    switch(lang) {
        case "en":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
        case "fr":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_fr();
            $("#mixed-language-info").hide();
            break;
        case "en-fr":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_fr();
            break;
        case "fr-en":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_en();
            break;
        case "ko-en":
            RUR.translation = RUR.ui_ko;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            break;
        default:
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
    }
    $("#mixed-language-info").html(RUR.translate(lang));
}

function update_commands (lang) {
    switch(lang) {
        case "fr":
        case "en-fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "en":
        case "fr-en":
        case "ko-en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}

function update_home_url (lang) {
    switch(lang) {
        case "fr":
        case "fr-en":
            $("#logo").prop("href", "index_fr.html");
            break;
        case "en":
        case "en-fr":
            $("#logo").prop("href", "index_en.html");
            break;
        default:
            $("#logo").prop("href", "index_en.html");
    }
}

$("#human-language").change(function() {
    var lang = $(this).val();
    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    update_home_url(lang);
    RUR.make_default_menu(lang);
    RUR.blockly.init();

    if (RUR.state.programming_language == "python") {
        $("#editor-tab").html(RUR.translate("Python Code"));
    } else {
        $("#editor-tab").html(RUR.translate("Javascript Code"));
    }

    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("human-language change: can not re/start repl", e);
        }
    }
    localStorage.setItem("human_language", lang);
    update_url();
});

},{"./../../lang/msg.js":88,"./../programming_api/blockly.js":39,"./../programming_api/reeborg_en.js":44,"./../programming_api/reeborg_fr.js":45,"./../rur.js":52,"./../ui/custom_world_select.js":56,"./../utils/parseuri.js":63}],22:[function(require,module,exports){

require("./../rur.js");
require("./../storage/storage.js");
var record_id = require("./../../lang/msg.js").record_id;

var memorize_button = document.getElementById("memorize-world");
record_id("memorize-world", "Save world in browser");

memorize_world = function () {
    var existing_names, i, key, response;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    dialog.dialog("open");
};
memorize_button.addEventListener("click", memorize_world, false);

dialog = $("#dialog-save-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            save_world();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});

dialog.find("form").on("submit", function( event ) {
    event.preventDefault();
    save_world();
});

save_world = function () {
    RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world));
    RUR.storage._save_world($("#world-name").val().trim());
    dialog.dialog("close");
    $('#delete-world').show();
};

},{"./../../lang/msg.js":88,"./../rur.js":52,"./../storage/storage.js":54}],23:[function(require,module,exports){
/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../editors/update.js");
require("./../rur.js");
require("./../editors/create.js");
require("./../programming_api/blockly.js");

var record_id = require("./../../lang/msg.js").record_id;
var record_value = require("./../../lang/msg.js").record_value;

function remove_fileInput_listener () {
    // see http://stackoverflow.com/a/19470348
    var el = document.getElementById('fileInput'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

function load_file (obj) {
    remove_fileInput_listener();
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            obj.setValue(reader.result);
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
}


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$("#load-world").on("click", function(evt) {
    remove_fileInput_listener();
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                RUR.world_utils.import_world(reader.result);
                RUR.storage.save_world(file.name);
            } catch (e) {  // jshint ignore:line
                console.log("invalid world", e);
                RUR.show_feedback("#Reeborg-shouts",
                                     RUR.translate("Invalid world file."));
            }
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
});

record_value("save-blockly", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");
var save_blockly_form = document.getElementById("save-blockly-form");
save_blockly_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var blockly_filename = document.getElementById("blockly-filename");
    var blob = new Blob([library.getValue()], {
        type: "text/xml;charset=utf-8"
    });
    saveAs(blob, (blockly_filename.value || blockly_filename.placeholder) + ".xml", true);
 }, false);

record_value("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
var save_editor_form = document.getElementById("save-editor-form");
save_editor_form.addEventListener("submit", function(event) {
    var blob;
    event.preventDefault();
    var editor_filename = document.getElementById("editor-filename");
    if (RUR.state.programming_language == "python") {
        blob = new Blob([editor.getValue()], {
            type: "text/python;charset=utf-8"
        });
        saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".py", true);
    } else {
        blob = new Blob([editor.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".js", true);
    }

 }, false);

record_value("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
var save_library_form = document.getElementById("save-library-form");
save_library_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var library_filename = document.getElementById("library-filename");
    var blob = new Blob([library.getValue()], {
        type: "text/python;charset=utf-8"
    });
    saveAs(blob, (library_filename.value || library_filename.placeholder) + ".py", true);
 }, false);

record_value("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");
var save_world_form = document.getElementById("save-world-form");
save_world_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var world_filename = document.getElementById("world-filename");
    RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world()));
    var blob = new Blob([RUR.export_world()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, (world_filename.value || world_filename.placeholder) + ".json", true);
 }, false);


record_id("load-blockly-btn", "LOAD BLOCKLY");
record_id("load-blockly-text", "LOAD BLOCKLY EXPLAIN");
$("#load-blockly-btn").on("click", function (evt) {
    load_file(RUR.blockly);
});

record_id("load-editor-btn", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
$("#load-editor-btn").on("click", function (evt) {
    load_file(editor);
});

record_id("load-library-btn", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");
$("#load-library-btn").on("click", function (evt) {
    load_file(library);
});


function toggle_content (name, obj) {
    var world = RUR.get_current_world();
    record_id("add-" + name + "-to-world-btn");
    record_id("add-" + name + "-ok");
    record_id("add-" + name + "-not-ok");
    $("#add-" + name + "-to-world-btn").on("click", function(evt) {
        if ($(this).hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            world[name] = obj.getValue();
        } else {
            $("#add-" + name + "-ok").hide();
            $("#add-" + name + "-not-ok").show();
            delete world[name];
        }
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("active-element");
    });
}

record_id("add-content-to-world", "ADD CONTENT TO WORLD");
record_id("add-blockly-text", "ADD BLOCKLY TEXT");
toggle_content("blockly", RUR.blockly);

record_id("add-editor-text", "ADD EDITOR TEXT");
toggle_content("editor", editor);

record_id("add-library-text", "ADD LIBRARY TEXT");
toggle_content("library", library);

record_id("add-pre-text", "ADD PRE TEXT");
toggle_content("pre", pre_code_editor);

record_id("add-post-text", "ADD POST TEXT");
toggle_content("post", post_code_editor);

record_id("add-description-text", "ADD DESCRIPTION TEXT");
toggle_content("description", description_editor);

record_id("add-onload-text", "ADD ONLOAD TEXT");
toggle_content("onload", onload_editor);

},{"./../../lang/msg.js":88,"./../editors/create.js":10,"./../editors/update.js":11,"./../programming_api/blockly.js":39,"./../rur.js":52,"./../translator.js":55}],24:[function(require,module,exports){
require("./../rur.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var pause_button = document.getElementById("pause");
record_id("pause");

RUR.pause = function (ms) {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
        $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    }
};

pause = function () {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
};

pause_button.addEventListener("click", pause, false);

},{"./../../lang/msg.js":88,"./../playback/play.js":36,"./../rur.js":52}],25:[function(require,module,exports){
require("./../rur.js");
require("./../listeners/reload.js");
require("./../gui_tools/special_keyboard.js");
require("./../editors/create.js");
var record_id = require("./../../lang/msg.js").record_id;
var update_url = require("./../utils/parseuri.js").update_url;

record_id("programming-mode");

/** @function onload_set_programming_language
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is
 * used to set which of two programming languages are allowed. If the
 * programming mode is compatible with that language, then it is not changed;
 * otherwise, it is change to the default mode (with Code editor) for
 * that language.
 *
 * **This should only be required if the world contains some content to
 * be run** (either in the editor, or in the pre- or post- code editors.)
 * Otherwise, do not use so that the world can be used using either programming
 * language.
 *
 * @param {string} language  Either `"python"` or `"javascript"`. If the language
 * is not recognized, it is set to `"python"`.
 *
 * @see RUR#onload_set_programming_mode
 * @see {@tutorial custom_goals} for more details about the example mentioned below.
 *
 * @example {@lang python}
 * # Execute the following and, after the world has loaded,
 * # click on **World Info** to see how this code is used.
 * World("worlds/examples/simple_path_explain.json")
 */

RUR.onload_set_programming_language = function(language) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_language should only be called from the 'Onload' editor.");
        return;
    }
    language = language.toLowerCase();  // make it more user-friendly
    if (language == "python") {
        if (!(RUR.state.input_method == "py-repl" ||
            RUR.state.input_method == "python" ||
            RUR.state.input_method == "blockly-py")) {
            RUR.onload_set_programming_mode("python");
        }
    } else if (language == "javascript") {
        if (!(RUR.state.input_method == "javascript" ||
            RUR.state.input_method == "blockly-js")) {
            RUR.onload_set_programming_mode("javascript");
        }
    } else {
        RUR.onload_set_programming_mode("python");
    }
}


/** @function onload_set_programming_mode
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is used
 * to specify which of five modes must be used for a given world.
 *
 * **This should only be required if the world contains some content to
 * be run** (either as blocks, in the editor, or in the pre- or post- code editors)
 * which does require a specific mode.
 * Otherwise, do not use so that the world can be used using all possible
 * programming modes.
 *
 * @param {string} mode  One of `["python", "javascript", "py-repl", "blockly-js", "blockly-py"]`.
 *   If the mode is not a recognized value, it will be set to `"python"`.
 *
 * @example
 * // shows how to switch mode to Blockly, where some blocks are already placed.
 * World("/worlds/examples/square_blockly.json", "Square")
 */

RUR.onload_set_programming_mode = function(mode) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_mode should only be called from the 'Onload' editor.");
        return;
    }
    mode = mode.toLowerCase(); // make it more user-friendly
    if (RUR.state.input_method == mode) {
        return;
    }

    /* When a world is imported from a program using World() or Monde(),
       and the onload editor contains a call to RUR.set_programming_mode,
       it is useful to delay its execution so that any error thrown
       (e.g. info about changed world) be handled properly by the language
       used to run the original program.
     */
    setTimeout( function() {
        $("#programming-mode").val(mode);
        // the following will ensure that "python" is used as default if
        // the mode is not recognized as a valid one.
        $("#programming-mode").change();
    }, 600);
};

$("#programming-mode").change(function() {
    "use strict";
    var choice = $(this).val();
    RUR.state.input_method = choice;
    localStorage.setItem("programming-mode", choice);
    hide_everything();

    switch(choice) {
        case "python":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            RUR.state.input_method = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            console.warn(" Default value used in programming-mode select.");
    }
    RUR.kbd.set_programming_language(RUR.state.programming_language);
    update_url();
});


record_id("editor-visible-input");
$('#editor-visible-input').change(function() {
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
});


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    $("#editor-visible-label").hide();
    $("#editor-visible-input").hide();
    if ($("#special-keyboard-button").hasClass("active-element")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
    try{
        $("#kbd-undo").hide();
        $("#kbd-redo").hide();
    } catch(e) {}

}

function show_blockly () {
    var style_enable = {"pointer-events": "auto", "opacity": 1};
    $("#save-blockly-btn").removeAttr("disabled");
    $(".blocklyToolboxDiv").css(style_enable);
    $("#blockly-wrapper").css(style_enable);
    // $("#blockly-wrapper").show();
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    var style_disable = {"pointer-events": "none", "opacity": 0.01};
    $("#save-blockly-btn").attr("disabled", "true");
    $(".blocklyToolboxDiv").css(style_disable);
    $("#blockly-wrapper").css(style_disable);
    // $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else {
        show_javascript_editor();
    }
    $("#save-editor-btn").removeAttr("disabled");
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    $("#special-keyboard-button").show();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
    }
}

function show_javascript_editor () {
    editor.setOption("mode", "javascript");
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_python_editor () {
    editor.setOption("mode", {name: "python", version: 3});
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    $("#save-editor-btn").attr("disabled", "true");
    $("#save-library-btn").attr("disabled", "true");
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-tab").parent().hide();
    $("#post-code-tab").parent().hide();
    $("#description-tab").parent().hide();
    $("#onload-editor-tab").parent().hide();
}

function show_console() {
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    $("#special-keyboard-button").show();
    $("#py-console").show();
    $("#stop").hide();
    $("#pause").hide();
    $("#run").hide();
    $("#step").hide();
    $("#reverse-step").hide();
    $("#reload").hide();
    $("#reload2").show();
    $("#reload2").removeAttr("disabled");
    $("#frame-selector").hide();
    $("#frame-id").hide();
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure; Will try again in 200ms.");
        window.setTimeout(_start_repl, 200);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#frame-selector").show();
    $("#frame-id").show();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}

/* Ensure that CodeMirror editors are set up properly
   even if not to be used initially
*/
show_editor("python");
// see start_session.js for initialization.

},{"./../../lang/msg.js":88,"./../editors/create.js":10,"./../gui_tools/special_keyboard.js":13,"./../listeners/reload.js":26,"./../rur.js":52,"./../utils/parseuri.js":63}],26:[function(require,module,exports){

require("./../rur.js");
var set_ui_ready_to_run = require("./../ui/set_ready_to_run.js").set_ui_ready_to_run;
var rec_reset = require("./../recorder/reset.js").reset;
var reset_world = require("./../world_set/reset_world.js").reset_world;
var record_id = require("./../../lang/msg.js").record_id;

var reload_button = document.getElementById("reload");
record_id("reload");
var reload2_button = document.getElementById("reload2");
record_id("reload2");

RUR.reload = function() {
    set_ui_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
    RUR.state.code_evaluated = false;
    RUR.state.sound_on = false;
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch-variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    reset_world();
    rec_reset();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};

RUR.hide_end_dialogs = function () { // used in py_repl.py
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
};
reload_button.addEventListener("click", RUR.reload, false);
reload2_button.addEventListener("click", RUR.reload2, false);

},{"./../../lang/msg.js":88,"./../recorder/reset.js":48,"./../rur.js":52,"./../ui/set_ready_to_run.js":58,"./../world_set/reset_world.js":82}],27:[function(require,module,exports){
require("./../rur.js");
require("./../recorder/recorder.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("reverse-step");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
$("#reverse-step").on("click", function (evt) {
    reverse_step();
});

reverse_step = function () {
    RUR.current_frame_no -= 2;  // see below call to RUR.rec.display_frame
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    RUR.rec.display_frame(); // increments the current_frame_no by 1
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};

},{"./../../lang/msg.js":88,"./../recorder/recorder.js":47,"./../rur.js":52}],28:[function(require,module,exports){
require("./../drawing/visible_robot.js");

require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model(0);
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model(1);
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model(2);
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model(3);
});

},{"./../../lang/msg.js":88,"./../drawing/visible_robot.js":8,"./../rur.js":52}],29:[function(require,module,exports){

require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var run_button = document.getElementById("run");
record_id("run");

function run () {
    RUR.state.run_button_clicked = true;
    if (RUR.state.stop_called){
        RUR.state.stop_called = false;
        RUR.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    $("#frame-selector").attr("disabled", "true").addClass("disabled").removeClass("enabled");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
    RUR.state.run_button_clicked = false;
}
run_button.addEventListener("click", run, false);

},{"./../../lang/msg.js":88,"./../playback/play.js":36,"./../runner/runner.js":50,"./../rur.js":52,"./reload.js":26}],30:[function(require,module,exports){
require("./../file_io/file_io.js");
require("./../storage/storage.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");

$("#select-world").change(function() {
    if (RUR.state.creating_menu){
        return;
    }
    if ($(this).val() !== null) {
        RUR.file_io.load_world_file($(this).val());
    }
    try {
        localStorage.setItem("world", $(this).find(':selected').text());
    } catch (e) {}
});

},{"./../../lang/msg.js":88,"./../file_io/file_io.js":12,"./../storage/storage.js":54}],31:[function(require,module,exports){

require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var step_button = document.getElementById("step");
record_id("step");

step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    clearTimeout(RUR._TIMER);
};
step_button.addEventListener("click", step, false);

},{"./../../lang/msg.js":88,"./../playback/play.js":36,"./../runner/runner.js":50,"./../rur.js":52,"./reload.js":26}],32:[function(require,module,exports){

require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

var stop_button = document.getElementById("stop");
record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.state.stop_called = true;
};
stop_button.addEventListener("click", RUR.stop, false);

},{"./../../lang/msg.js":88,"./../rur.js":52}],33:[function(require,module,exports){
;
require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

var highlight_button = document.getElementById("highlight");
record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("active-element");
        $("#highlight").removeClass("blue-gradient");
    }
};
highlight_button.addEventListener("click", RUR.toggle_highlight, false);

},{"./../../lang/msg.js":88,"./../rur.js":52}],34:[function(require,module,exports){
;
require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

var watch_button = document.getElementById("watch-variables-btn");
record_id("watch-variables-btn");

toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch-variables-btn").addClass("blue-gradient");
        $("#watch-variables-btn").removeClass("active-element");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch-variables-btn").addClass("active-element");
        $("#watch-variables-btn").removeClass("blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};
watch_button.addEventListener("click", toggle_watch_variables, false);

},{"./../../lang/msg.js":88,"./../rur.js":52}],35:[function(require,module,exports){

require("./../rur.js");
require("./../storage/storage.js");
require("./../editors/update.js");
require("./../translator.js");
require("./../listeners/programming_mode.js");
require("./../utils/parseuri.js");
require("./../editors/create.js");

var record_id = require("./../../lang/msg.js").record_id;

record_id("save-permalink", "Save");
record_id("save-permalink-text", "Save permalink explanation");
$("#save-permalink").on("click", function (evt) {
    var blob = new Blob([RUR.permalink.__create()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

/* IMPORTANT: we attempt to maintain compatibility with the old permalinks
   format below.
 */

RUR.permalink = {};

RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.state.programming_language + "-" + RUR.state.human_language;
    world = encodeURIComponent(RUR.export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.state.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


record_id("permalink", "PERMALINK");
$("#permalink").on("click", function (evt) {
    RUR.permalink.create();
});
RUR.permalink.create = function () {
    var permalink = RUR.permalink.__create();

    $("#url-input-textarea").val(permalink);
    $("#url-input").toggle();
    return false;
};

RUR.permalink.set_mode = function (url_query) {
    "use strict";
    var mode;
    if (url_query.queryKey.mode !== undefined) {
        mode = url_query.queryKey.mode;
    }
    else if (localStorage.getItem("programming-mode")) {
        mode = localStorage.getItem("programming-mode");
    } else {
        mode = 'python';
    }

    document.getElementById('programming-mode').value = mode;
    $("#programming-mode").change();
    return mode;
};

RUR.permalink.set_language = function (url_query) {
    "use strict";
    var lang;
    if (url_query.queryKey.lang !== undefined) {
        lang = url_query.queryKey.lang;
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};

RUR.permalink.from_url = function(url_query) {
    var from_url=false, url=false, name=false;
    if (url_query.queryKey.url !== undefined) {
        url = decodeURIComponent(url_query.queryKey.url);
    }
    if (url_query.queryKey.name !== undefined) {
        name = decodeURIComponent(url_query.queryKey.name);
    }
    if (!(url || name)) {
        return false;
    } else {
        try { // see comment above
            if (url && name) {
                RUR.file_io.load_world_from_program(url, name);
            } else if (url) {
                RUR.file_io.load_world_from_program(url);
            } else {
                RUR.file_io.load_world_from_program(name);
            }
        } catch (e) {
            if (e.reeborg_concludes) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
            } else if (e.reeborg_shouts) {
                RUR.show_feedback("#Reeborg-shouts", e.reeborg_shouts);
            } else {
                console.log("unidentified error", e);
            }
            return false;
        }
        return true;
    }
};

/* IMPORTANT : keep version of copy to clipboard. */
// copy to clipboard
record_id("copy-permalink", "COPY");
record_id("copy-permalink-text", "COPY PERMALINK EXPLAIN");
$("#copy-permalink").on("click", function (evt) {
    document.querySelector('#url-input-textarea').select();
    document.execCommand('copy');
});

// for embedding in iframe
// update() missing so this raises an error.
// addEventListener("message", receiveMessage, false);
// function receiveMessage(event){
//     RUR.permalink.update(event.data);
// }

},{"./../../lang/msg.js":88,"./../editors/create.js":10,"./../editors/update.js":11,"./../listeners/programming_mode.js":25,"./../rur.js":52,"./../storage/storage.js":54,"./../translator.js":55,"./../utils/parseuri.js":63}],36:[function(require,module,exports){
require("./../rur.js");
require("./../listeners/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.drawing/visible_world.running
        RUR.state.playback = false;
        return;
    }
    RUR.state.playback = true;
    loop();
};

function loop () {
    "use strict";
    var frame_info;

    if (!RUR.state.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.stop();
        return;
    }
    RUR._TIMER = setTimeout(loop, RUR.PLAYBACK_TIME_PER_FRAME);
}

},{"./../listeners/stop.js":32,"./../rur.js":52}],37:[function(require,module,exports){

RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
    //TODO see if rewinding to zero instead of load() might not be a better
    //way to do things. In particular, this might enable the removal of
    //the minimum time limit for the sound.
};

},{}],38:[function(require,module,exports){

require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {
    RUR.vis_world.refresh();
    // TODO: confirm that watching variables work.
    if (name !== undefined && name == "print_html") {
        if (obj.append){
            $(obj.element).append(obj.message);
        } else {
            $(obj.element).html(obj.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }
};

},{"./../drawing/visible_world.js":9,"./../programming_api/exceptions.js":42}],39:[function(require,module,exports){
/* jshint -W069 */
require("./../rur.js");
require("./../translator.js");

RUR.blockly = {};
RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

/****  Begin over-riding Blockly's default */
Blockly.Blocks.loops.HUE = 230;

Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};

Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

Blockly.Python.INDENT = '    ';
Blockly.JavaScript.INDENT = '    ';

// removing mutator for simple function definitions as per
// https://groups.google.com/d/msg/blockly/_rrwh-Lc-sE/cHAk5yNfhUEJ

(function(){var old = Blockly.Blocks.procedures_defnoreturn.init;
    Blockly.Blocks.procedures_defnoreturn.init =
    function(){old.call(this);
        this.setMutator(undefined);
        // this.setColour(RUR.color_basic);
    };
})();



RUR.blockly.init = function () {

    // override some defaults
    Blockly.Msg.CONTROLS_IF_MSG_THEN = "    " + Blockly.Msg.CONTROLS_IF_MSG_THEN;
    Blockly.Msg.CONTROLS_REPEAT_INPUT_DO = "    " + Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
    Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = "    " + Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO;


    Blockly.Blocks['_sound_'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RUR.translate("sound"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "SOUND");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(true);\n";
      } else {
          return RUR.translate("sound") + "(false);\n";
      }
    };
    Blockly.Python['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(True)\n";
      } else {
          return RUR.translate("sound") + "(False)\n";
      }
    };

    Blockly.Blocks['_think_'] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField(RUR.translate("think"));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip(RUR.translate("Delay between actions; default is 300 ms."));
      }
    };
    Blockly.Python['_think_'] = function(block) {
      var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+")\n";
    };
    Blockly.JavaScript['_think_'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+");\n";
    };

    Blockly.Blocks['_move_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("move"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("move forward"));
      }
    };
    Blockly.Python['_move_'] = function(block) {
      return RUR.translate("move")+'()\n';
    };
    Blockly.JavaScript['_move_'] = function(block) {
      return RUR.translate("move")+'();\n';
    };


    Blockly.Blocks['_turn_left_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("turn_left")+" \u21BA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("turn left"));
      }
    };
    Blockly.Python['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'()\n';
    };
    Blockly.JavaScript['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'();\n';
    };


    Blockly.Blocks['_take_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("take"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("take object"));
      }
    };
    Blockly.Python['_take_'] = function(block) {
      return RUR.translate("take")+'()\n';
    };
    Blockly.JavaScript['_take_'] = function(block) {
      return RUR.translate("take")+'();\n';
    };


    Blockly.Blocks['_put_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("put"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("put object"));
      }
    };
    Blockly.Python['_put_'] = function(block) {
      return RUR.translate("put")+'()\n';
    };
    Blockly.JavaScript['_put_'] = function(block) {
      return RUR.translate("put")+'();\n';
    };


    Blockly.Blocks['_pause_'] = {
      init: function() {
        this.setColour(30);
        this.appendDummyInput().appendField(RUR.translate("pause"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Pause the program's execution."));
      }
    };
    Blockly.Python['_pause_'] = function(block) {
      return RUR.translate("pause")+'()\n';
    };
    Blockly.JavaScript['_pause_'] = function(block) {
      return RUR.translate("pause")+'();\n';
    };


    Blockly.Blocks['_build_wall_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("build_wall"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Build a wall in front of the robot."));
      }
    };
    Blockly.Python['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'()\n';
    };
    Blockly.JavaScript['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'();\n';
    };


    Blockly.Blocks['_done_'] = {
      init: function() {
        this.setColour(RUR.done_colour);
        this.appendDummyInput().appendField(RUR.translate("done"));
        this.setPreviousStatement(true);
        this.setTooltip(RUR.translate("End the program's execution."));
      }
    };
    Blockly.Python['_done_'] = function(block) {
      return RUR.translate("done")+'()\n';
    };
    Blockly.JavaScript['_done_'] = function(block) {
      return RUR.translate("done")+'();\n';
    };


    Blockly.Blocks['_wall_in_front_or_right_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("wall_in_front"), RUR.translate("wall_in_front")],
            [RUR.translate("wall_on_right"), RUR.translate("wall_on_right")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if a wall is blocking the way."));
      }
    };
    Blockly.Python['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_front_or_right_is_clear_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("front_is_clear"), RUR.translate("front_is_clear")],
            [RUR.translate("right_is_clear"), RUR.translate("right_is_clear")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if nothing is blocking the way."));
      }
    };
    Blockly.Python['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_at_goal_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("at_goal"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if desired destination."));
      }
    };
    Blockly.Python['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };
    Blockly.JavaScript['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };


    Blockly.Blocks['_carries_object_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("carries_object"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot carries at least one object."));
      }
    };
    Blockly.Python['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };
    Blockly.JavaScript['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };


    Blockly.Blocks['_object_here_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("object_here"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if there is at least one object here."));
      }
    };
    Blockly.Python['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };
    Blockly.JavaScript['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };


    Blockly.Blocks['_is_facing_north_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("is_facing_north"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot is facing North."));
      }
    };
    Blockly.Python['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };
    Blockly.JavaScript['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };


    Blockly.Blocks['_star_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("star"))
            .appendField(new Blockly.FieldImage("/src/images/star.png", 15, 15, RUR.translate("star")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_star_'] = function(block) {
      return [RUR.translate("star")];
    };
    Blockly.JavaScript['_star_'] = function(block) {
      return [RUR.translate("star")];
    };

    Blockly.Blocks['_token_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("token"))
            .appendField(new Blockly.FieldImage("/src/images/token.png", 15, 15, RUR.translate("token")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_token_'] = function(block) {
      return [RUR.translate("token")];
    };
    Blockly.JavaScript['_token_'] = function(block) {
      return [RUR.translate("token")];
    };

    Blockly.Blocks['_apple_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("apple"))
            .appendField(new Blockly.FieldImage("/src/images/apple.png", 15, 15, RUR.translate("apple")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };
    Blockly.JavaScript['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };

    Blockly.Blocks['_carrot_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("carrot"))
            .appendField(new Blockly.FieldImage("/src/images/carrot.png", 15, 15, RUR.translate("carrot")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };
    Blockly.JavaScript['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };

    Blockly.Blocks['_dandelion_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("dandelion"))
            .appendField(new Blockly.FieldImage("/src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };
    Blockly.JavaScript['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };

    Blockly.Blocks['_daisy_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("daisy"))
            .appendField(new Blockly.FieldImage("/src/images/daisy.png", 15, 15, RUR.translate("daisy")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };
    Blockly.JavaScript['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };

    Blockly.Blocks['_triangle_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("triangle"))
            .appendField(new Blockly.FieldImage("/src/images/triangle.png", 15, 15, RUR.translate("triangle")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };
    Blockly.JavaScript['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };

    Blockly.Blocks['_square_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("square"))
            .appendField(new Blockly.FieldImage("/src/images/square.png", 15, 15, RUR.translate("square")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_square_'] = function(block) {
      return [RUR.translate("square")];
    };
    Blockly.JavaScript['_square_'] = function(block) {
      return [RUR.translate("square")];
    };

    Blockly.Blocks['_strawberry_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("strawberry"))
            .appendField(new Blockly.FieldImage("/src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };
    Blockly.JavaScript['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };

    Blockly.Blocks['_leaf_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("leaf"))
            .appendField(new Blockly.FieldImage("/src/images/leaf.png", 15, 15, RUR.translate("leaf")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };
    Blockly.JavaScript['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };

    Blockly.Blocks['_banana_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("banana"))
            .appendField(new Blockly.FieldImage("/src/images/banana.png", 15, 15, RUR.translate("banana")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };
    Blockly.JavaScript['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };

    Blockly.Blocks['_orange_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("orange"))
            .appendField(new Blockly.FieldImage("/src/images/orange.png", 15, 15, RUR.translate("orange")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };
    Blockly.JavaScript['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };

    Blockly.Blocks['_tulip_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("tulip"))
            .appendField(new Blockly.FieldImage("/src/images/tulip.png", 15, 15, RUR.translate("tulip")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };
    Blockly.JavaScript['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };

    Blockly.Blocks['_carries_object_or_here_'] = {
      init: function() {
        this.appendValueInput("action")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("carries_object"), RUR.translate("carries_object")],
                [RUR.translate("object_here"), RUR.translate("object_here")]]), "condition");
        this.setOutput(true, "Boolean");
        this.setColour(RUR.color_condition);
      }
    };
    Blockly.Python['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.Python.valueToCode(block, 'action', Blockly.Python.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };
    Blockly.JavaScript['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };


    Blockly.Blocks['_take_or_put_'] = {
      init: function() {
        this.appendValueInput("obj")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("take"), RUR.translate("take")],
                [RUR.translate("put"), RUR.translate("put")]]), "action");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(RUR.color_basic);
      }
    };
    Blockly.Python['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.Python.valueToCode(block, 'obj', Blockly.Python.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '")\n';
    };
    Blockly.JavaScript['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '");\n';
    };



    /** Simple if skeletton from
    https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
    ****/

    Blockly.Blocks['_if_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        // this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      return "if (" + value_condition + ") {\n" + statements_then + "}\n";

    };
    Blockly.Python['_if_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      return "if " + value_condition + ":\n" + statements_then;
    };


    Blockly.Blocks['_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_then + "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_then + "else:\n" + statements_else;
    };


    Blockly.Blocks['_if_else_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("do")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendValueInput("condition2")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput("do2")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
      var value_condition2 = Blockly.JavaScript.valueToCode(block, 'condition2', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_do +
             "} else if (" + value_condition2 + ") {\n" + statements_do2 +
             "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_do = Blockly.Python.statementToCode(block, 'do');
      var value_condition2 = Blockly.Python.valueToCode(block, 'condition2', Blockly.Python.ORDER_ATOMIC);
      var statements_do2 = Blockly.Python.statementToCode(block, 'do2');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_do +
             "elif " + value_condition2 + ":\n" + statements_do2 +
             "else:\n" + statements_else;
    };

    $("#blocklyDiv").remove();
    $("#blockly-wrapper").append('<div id="blocklyDiv"></div>');
    $(".blocklyToolboxDiv").remove();

    /* With the current version of the code, Firefox does not display
       the trashcan and controls properly; so we do not show them ... but
       allow for testing via the console by setting RUR.firefox_ok to true */
    var firefox_present = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (firefox_present && !RUR.firefox_ok) {
        RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            trashcan: false});
    } else {
        RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            zoom:{
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2},
            trashcan: true});
    }

    $("#blocklyDiv").resizable({
        resize: function() {
            $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
            window.dispatchEvent(new Event('resize'));
        }
    });

    if (RUR.state.input_method == "python" ||
        RUR.state.input_method == "javascript" ||
        RUR.state.input_method == "py-repl") {
            $(".blocklyToolboxDiv").css({"pointer-events": "none", "opacity": 0.01});
        }

};
RUR.firefox_ok = false;

$("#blockly-wrapper").draggable({
    cursor: "move",
    handle: "p",
    drag: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    },
    stop: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    }
});



RUR.blockly.getValue = function () {
    var xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
    return Blockly.Xml.domToText(xml);
};
RUR.blockly.setValue = function (xml_text) {
    var xml = Blockly.Xml.textToDom(xml_text);
    RUR.blockly.workspace.clear();
    Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
};

},{"./../rur.js":52,"./../translator.js":55}],40:[function(require,module,exports){
/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

//TODO: review the dependencies

require("./../rur.js");
require("./../translator.js");
require("./control.js");
require("./../ui/custom_world_select.js");
require("./../file_io/file_io.js");
require("./output.js");
require("./../drawing/visible_robot.js");
require("./../editors/update.js");
require("./../world_set/world_set.js");
require("./../world_api/background_tile.js");

RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.get_current_world().robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.get_current_world().robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.get_current_world().robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.get_current_world().robots[0];
    return RUR.control.get_colour_at_position(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    return RUR.get_current_world().robots[0];
};

RUR._dir_js_ = RUR.inspect;

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.get_current_world().robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.get_current_world().robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.get_current_world().robots[0]);
};

RUR._new_robot_images_ = RUR.new_robot_images;

RUR._no_highlight_ = user_no_highlight;

RUR._object_here_ = function (arg) {
    return RUR.world_get.object_at_robot_position(RUR.get_current_world().robots[0], arg);
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.get_current_world().robots[0];
    RUR.add_background_tile(color, robot.x, robot.y);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, replace) {
    RUR.output.print_html(html, replace);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.get_current_world().robots[0], arg);
};

RUR._recording_ = function(bool) {
    var current = !RUR.state.do_not_record;
    RUR.state.do_not_record = !bool;
    return current;
};

RUR._remove_robots_ = function () {
    RUR.get_current_world().robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.get_current_world().robots[0]);
};

RUR._set_max_nb_instructions_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.get_current_world().robots[0]._trace_color = color;
};

RUR._set_trace_style_ = function(style){
    RUR.get_current_world().robots[0]._trace_style = style;
};

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.get_current_world().robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.get_current_world().robots[0]);
};

RUR._view_source_js_ = RUR.output.view_source_js;

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.get_current_world().robots[0]);
};

RUR._write_ = RUR.output.write;

RUR.__write_ = RUR.output._write;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.get_current_world().robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR.file_io.load_world_from_program;

/*  methods below */

RUR._UR = {};

RUR._UR.at_goal_ = function (robot) {
    return RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    return RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    return RUR.control.carries_object(robot, obj);
};

RUR._UR.front_is_clear_ = function (robot) {
    return RUR.control.front_is_clear(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    return RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    return RUR.world_get.object_at_robot_position(robot, obj);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    return RUR.control.right_is_clear(robot);
};

RUR._UR.set_model_ = function (robot, model) {
    RUR.control.set_model(robot, model);
};

RUR._UR.set_trace_color_ = function (robot, color) {
    RUR.control.set_trace_color(robot, color);
};

RUR._UR.set_trace_style_ = function (robot, style) {
    RUR.control.set_trace_style(robot, style);
};

RUR._UR.take_ = function (robot, obj) {
    RUR.control.take(robot, obj);
};

RUR._UR.turn_left_ = function (robot) {
    RUR.control.turn_left(robot);
};

RUR._UR.wall_in_front_ = function (robot) {
    return RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    return RUR.control.wall_on_right(robot);
};

},{"./../drawing/visible_robot.js":8,"./../editors/update.js":11,"./../file_io/file_io.js":12,"./../rur.js":52,"./../translator.js":55,"./../ui/custom_world_select.js":56,"./../world_api/background_tile.js":68,"./../world_set/world_set.js":83,"./control.js":41,"./output.js":43}],41:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../default_tiles/tiles.js");
require("./output.js");
require("./../recorder/record_frame.js");
require("./exceptions.js");
require("./../world_get/world_get.js");
require("./../world_set/world_set.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/walls.js");
require("./../world_api/obstacles.js");
require("./../world_api/background_tile.js");
require("./../world_api/pushables.js");
require("./../world_api/robot.js");
require("./../world_api/composition.js");
require("./../world_api/is_fatal.js");

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var position, next_x, next_y, orientation, pushable_in_the_way, tile, tiles,
        x_beyond, y_beyond, recording_state, next_position, current_x, current_y,
        message;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    // attempt a move, by first saving the current position
    current_x = robot.x;
    current_y = robot.y;
    robot.x = next_x;
    robot.y = next_y;

    // If we move, are we going to push something else in front of us?
    pushable_in_the_way = RUR.get_pushable(next_x, next_y);
    if (pushable_in_the_way !== null) {
        next_position = RUR.get_position_in_front(robot);
        x_beyond = next_position.x;
        y_beyond = next_position.y;

        if (RUR.control.wall_in_front(robot) ||
            RUR.get_pushable(x_beyond, y_beyond) ||
            RUR.get_solid_obstacle(x_beyond, y_beyond) ||
            RUR.is_robot(x_beyond, y_beyond)) {
            // reverse the move
            robot.x = current_x;
            robot.y = current_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.push_pushable(pushable_in_the_way, next_x, next_y, x_beyond, y_beyond);
            RUR.transform_tile(pushable_in_the_way, x_beyond, y_beyond);
        }
    }

    // We can now complete the move
    if (robot._is_leaky !== undefined && !robot._is_leaky) {
        // avoid messing the trace if and when we resume having a leaky robot
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
    } else {
        robot._prev_x = current_x;
        robot._prev_y = current_y;
    }
    RUR.state.sound_id = "#move-sound";


    // A move has been performed ... but it may have been a fatal decision
    message = RUR.is_fatal_position(robot.x, robot.y, robot);
    if (message) {
        throw new RUR.ReeborgError(message);
    }

    RUR.record_frame("move", robot.__id);
};


// leave end of line comments below such as using += 1
// as I (indirectly) refer to these comments in the programming tutorial

RUR.control.turn_left = function(robot){
    "use strict";
    robot._prev_orientation = robot._orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 1;  // could have used "++" instead of "+= 1"
    robot._orientation %= 4;
    RUR.state.sound_id = "#turn-sound";
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("turn_left", robot.__id);
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("__turn_right", robot.__id);
};

RUR.control.pause = function (ms) {
    RUR.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    if (RUR.state.input_method === "py-repl") {
        RUR.frames = [];
        RUR.nb_frames = 1;
        RUR.record_frame("done");
        RUR.rec.conclude();
    } else {
        throw new RUR.ReeborgError(RUR.translate("Done!"));
    }
};

RUR.control.put = function(robot, arg){
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.state.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_carried = robot.objects;
    all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    if (all_objects.length === 0){
        throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.MissingObjectError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        } else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }
};

RUR.control._robot_put_down_object = function (robot, obj) {
    "use strict";
    var objects_carried, coords, obj_type;
    if (obj === undefined){
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    if (robot.objects[obj] != "infinite") {
        robot.objects[obj] -= 1;
    }
    if (robot.objects[obj] === 0) {
        delete robot.objects[obj];
    }

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world(), "objects");
    coords = robot.x + "," + robot.y;
    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world().objects, coords);
    if (RUR.get_current_world().objects[coords][obj] === undefined) {
        RUR.get_current_world().objects[coords][obj] = 1;
    } else {
        RUR.get_current_world().objects[coords][obj] += 1;
    }

    RUR.transform_tile(obj, robot.x, robot.y); // TODO: testing needed

    RUR.record_frame("put", [robot.__id, obj]);
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here, message;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        if (Array.isArray(objects_here) && objects_here.length === 0) {
            throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else if(RUR.is_fatal_thing(arg)) {
            message = RUR.get_property(arg, 'message');
            if (message == undefined) {
                message = "I picked up a fatal object.";
            }
            throw new RUR.ReeborgError(RUR.translate(message));
        } else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
    }  else if (Array.isArray(objects_here) && objects_here.length === 0){
        throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.MissingObjectError(RUR.translate("Many objects are here; I do not know which one to take!"));
    }  else if(RUR.is_fatal_thing(objects_here[0])) {
        message = RUR.get_property(objects_here[0], 'message');
        if (message == undefined) {
            message = "I picked up a fatal object.";
        }
        throw new RUR.ReeborgError(RUR.translate(message));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.get_current_world().objects[coords][obj] -= 1;

    if (RUR.get_current_world().objects[coords][obj] === 0){
        delete RUR.get_current_world().objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.world_get.object_at_robot_position(robot) == false){ // jshint ignore:line
            delete RUR.get_current_world().objects[coords];
        }
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else {
        if (robot.objects[obj] != "infinite") {
            robot.objects[obj]++;
        }
    }
    RUR.record_frame("take", [robot.__id, obj]);
};


RUR.control.build_wall = function (robot){
    RUR.state.sound_id = "#build-sound";
    switch (robot._orientation){
    case RUR.EAST:
        RUR.add_wall("east", robot.x, robot.y); // records automatically
        break;
    case RUR.NORTH:
        RUR.add_wall("north", robot.x, robot.y);
        break;
    case RUR.WEST:
        RUR.add_wall("west", robot.x, robot.y);
        break;
    case RUR.SOUTH:
        RUR.add_wall("south", robot.x, robot.y);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }
};


RUR.control.wall_in_front = function (robot) {
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.is_wall("east", robot.x, robot.y);
    case RUR.NORTH:
        return RUR.is_wall("north", robot.x, robot.y);
    case RUR.WEST:
        return RUR.is_wall("west", robot.x, robot.y);
    case RUR.SOUTH:
        return RUR.is_wall("south", robot.x, robot.y);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
};

RUR.control.wall_on_right = function (robot) {
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, solid, name, position, next_x, next_y;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    if (RUR.is_fatal_position(next_x, next_y, robot) &&
        RUR.is_detectable(next_x, next_y)) {
        return false;
    }

    return true;
};

RUR.control.right_is_clear = function(robot){
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    var old_delay = RUR.PLAYBACK_TIME_PER_FRAME;
    RUR.PLAYBACK_TIME_PER_FRAME = delay;
    return old_delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.get_current_world().goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};


RUR.control.carries_object = function (robot, obj) {
    var obj_type, all_objects, carried=false;

    if (robot === undefined || robot.objects === undefined) {
        return 0;
    }

    all_objects = {};

    if (obj === undefined) {
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type)) {
                all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
                carried = true;
            }
        }
        if (carried) {
            return all_objects;
        } else {
            return 0;
        }
    } else {
        obj = RUR.translate_to_english(obj);
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type) && obj_type == obj) {
                return robot.objects[obj_type];
            }
        }
        return 0;
    }
};


RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.record_frame("set_model", robot.__id);
 };

RUR.control.set_trace_color = function(robot, color){
    robot._trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot._trace_style = style;
 };

if (RUR.state === undefined){
    RUR.state = {};
}

RUR.state.sound_on = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.state.sound_on = false;
        return;
    }
    RUR.state.sound_on = true;
};

RUR.control.get_colour_at_position = function (x, y) {
    if (RUR.world_get.tile_at_position(x, y)===false) {
        return null;
    } else if (RUR.world_get.tile_at_position(x, y)===undefined){
        return RUR.get_current_world().tiles[x + "," + y];
    } else {
        return null;
    }
};

},{"./../default_tiles/tiles.js":1,"./../recorder/record_frame.js":46,"./../rur.js":52,"./../translator.js":55,"./../utils/key_exist.js":62,"./../utils/supplant.js":64,"./../world_api/background_tile.js":68,"./../world_api/composition.js":70,"./../world_api/is_fatal.js":72,"./../world_api/obstacles.js":74,"./../world_api/pushables.js":75,"./../world_api/robot.js":76,"./../world_api/walls.js":78,"./../world_get/world_get.js":79,"./../world_set/world_set.js":83,"./exceptions.js":42,"./output.js":43}],42:[function(require,module,exports){

require("./../rur.js");

// During evaluation of "onload", which is done before a program is
// running and only involves Javascript code, some errors may be thrown.
// In this situation we make sure that these errors are not passed to Brython.

RUR.ReeborgError = function (message) {
    if (RUR.state.input_method == "py-repl" ||
        (RUR.state.programming_language == "python" && !RUR.state.evaluating_onload)){
        try { // see comment above
            return ReeborgError(message);
        } catch (e) {}
    }

    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        try {
            return ReeborgOK(message);
        } catch (e) {}
    }
    this.name = "ReeborgOK";
    this.reeborg_concludes = message;
    this.message = message;
};


RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        return MissingObjectError(message);
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_shouts = message;
};

},{"./../rur.js":52}],43:[function(require,module,exports){

require("./../rur.js");
require("./../recorder/record_frame.js");

RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, replace) {
    if (replace) {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg});
    } else {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg, "append": true});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.record_frame("watch_variables", {"element": "#watch-variables", "message": arg});
};


RUR.output.view_source_js = function(fn) {
    $("#Reeborg-explores").dialog("open");
    RUR.show_feedback("#Reeborg-explores", "<pre class='view_source'>" + fn + "</pre>" );
    $('.view_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};

},{"./../recorder/record_frame.js":46,"./../rur.js":52}],44:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");

/* Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_en = function () {

    window.at_goal = RUR._at_goal_;
    window.build_wall = RUR._build_wall_;
    window.carries_object = RUR._carries_object_;
    window.default_robot = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.done = RUR._done_;
    window.front_is_clear = RUR._front_is_clear_;
    window.is_facing_north = RUR._is_facing_north_;
    window.move = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.object_here = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.put = RUR._put_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.right_is_clear = RUR._right_is_clear_;
    window.set_max_steps = RUR._set_max_steps_;
    window.sound = RUR._sound_;
    window.take = RUR._take_;
    window.think = RUR._think_;
    window.turn_left = RUR._turn_left_;
    window.view_source_js = RUR._view_source_js_;
    window.wall_in_front = RUR._wall_in_front_;
    window.wall_on_right = RUR._wall_on_right_;
    window.write = RUR._write_;
    window._write = RUR.__write_;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.World = RUR._World_;


    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.front_is_clear = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.put = function () {
        RUR._UR.put_(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.set_trace_color_ = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.set_trace_style_ = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.take = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.turn_left = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;

    // English specific and only for compatibility with rur-ple
    // do not translate the following
    window.put_beeper = put;
    window.pick_beeper = take;
    window.turn_off = done;
    window.on_beeper = object_here;
    window.next_to_a_beeper = object_here;
    window.carries_beepers = carries_object;
    window.set_delay = think;
    window.facing_north = is_facing_north;
};

},{"./../rur.js":52,"./commands.js":40}],45:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_fr = function () {

    window.au_but = RUR._at_goal_;
    window.construit_un_mur = RUR._build_wall_;
    window.transporte = RUR._carries_object_;
    window.robot_par_defaut = function () {
        var r = Object.create(RobotUsage.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.termine = RUR._done_;
    window.rien_devant = RUR._front_is_clear_;
    window.est_face_au_nord = RUR._is_facing_north_;
    window.avance = RUR._move_;

    window.mur_devant = RUR._wall_in_front_;
    window.nouvelles_images_de_robot = function (images) {
        if (images.est !== undefined) {
            images.east = images.est;
        }
        if (images.ouest !== undefined) {
            images.west = images.ouest;
        }
        if (images.sud !== undefined) {
            images.south = images.sud;
        }
        if (images.nord !== undefined) {
            images.north = images.nord;
        }
        RUR._new_robot_images_(images);
    };
    window.objet_ici = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.depose = RUR._put_;
    window.enregistrement = RUR._recording_;
    window.plus_de_robots = RUR._remove_robots_;
    window.rien_a_droite = RUR._right_is_clear_;
    window.nombre_d_instructions = RUR._set_max_steps_;
    window.son = RUR._sound_;
    window.prend = RUR._take_;
    window.pense = RUR._think_;
    window.tourne_a_gauche = RUR._turn_left_;
    window.voir_source_js = RUR._view_source_js_;
    window.mur_devant = RUR._wall_in_front_;
    window.mur_a_droite = RUR._wall_on_right_;
    window.ecrit = RUR._write_;
    window._write = RUR.__write_;
    window.MenuPersonnalise = RUR._MakeCustomMenu_;
    window.Monde = RUR._World_;

    // The following are for OOP programming in Javascript
    var RobotUsage = window.RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        RUR._UR.at_goal_(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotUsage.prototype.transporte = function () {
        RUR._UR.carries_object_(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR._UR.move_(this.body);
    };

    RobotUsage.prototype.objet_ici = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    RobotUsage.prototype.depose = function () {
        RUR._UR.put_(this.body);
    };

    RobotUsage.prototype.rien_a_droite = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR.control.wall_in_front(this.body); //TODO: remove control
    };

    RobotUsage.prototype.couleur_de_trace = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotUsage.prototype.style_de_trace = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotUsage.prototype.prend = function () {
        RUR._UR.take_(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = RobotUsage;
};

},{"./../rur.js":52,"./commands.js":40}],46:[function(require,module,exports){

require("./../rur.js");
require("./reset.js");
require("./../programming_api/exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");

function update_trace_history() {
    var world = RUR.get_current_world();
    if (world.robots !== undefined){
        for (robot of world.robots) { // jshint ignore:line
            RUR.vis_robot.update_trace_history(robot);
        }
    }
}

RUR.record_frame = function (name, obj) {
    "use strict";
    var py_err, frame = {}, robot;
    if (RUR.__debug) {
        console.log("from record_frame, name, obj=", name, obj);
    }

    /* TODO: Document RUR.frame_insertion and put a link here.    */

    if (name !== "highlight" && RUR.frame_insertion !== undefined && !RUR.state.frame_insertion_called){
        // avoid recursive calls as this would make it too difficult
        // to use frame_insertion
        if (name === undefined) {
            name = "RUR.record_frame: missing first argument";
        }
        if (obj === undefined) {
            obj = "RUR.record_frame: missing second argument";
        }
        RUR.state.frame_insertion_called = true;
        if (RUR.state.programming_language === "python") {
            py_err = RUR.frame_insertion(name, obj)
            RUR.state.frame_insertion_called = false;
            if (py_err && py_err.__name__) {
                if (RUR[py_err.__name__] !== undefined) {
                    throw new RUR[py_err.__name__](py_err.reeborg_shouts);
                } else {
                    throw new RUR.ReeborgError(py_err.__name__);
                }
            }
        } else {
            try {
                RUR.frame_insertion(name, obj); // may throw an error
            } finally {
                RUR.state.frame_insertion_called = false;
            }
        }
    }

// TODO: document a test that would fail if we were to remove the condition
// name!="error" below -- this addition was done by
// 1. turning off recording
// 2. doing stuff ... including something that should have raised an error
// 3. resuming recording.
// The program stopped, but no error was shown.

    if (RUR.state.input_method==="py-repl") {
        /* if the REPL is active, we do not record anything, and show
           immediately the updated world. */
        update_trace_history();
        return RUR._show_immediate(name, obj);
    } else if ((RUR.state.do_not_record || RUR.state.prevent_playback) && name != "error") {
        return;
    } else if (name == "watch_variables" && RUR.nb_frames >= 1) {
        /* Watched variables are appended to previous frame so as to avoid
          generating too many extra frames. */
        RUR.frames[RUR.nb_frames-1]["watch_variables"] = obj;
        return;
    // } else if (name=="highlight" &&
    //       RUR.current_line_no == RUR.rec_line_numbers [RUR.nb_frames-1]) {
    //     // no highlighting change: do not include any extra frame
    //     return;
    } else if (name=="highlight" && RUR.nb_frames != 0) {
        // no highlighting change: do not include any extra frame
        return;
    }

    update_trace_history();
    frame.world = RUR.clone_world();

    if (name && obj) {
        frame[name] = obj;
    }

    frame.delay = RUR.PLAYBACK_TIME_PER_FRAME;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }


    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        if (RUR.current_line_no !== undefined) {
            RUR.rec_line_numbers [RUR.nb_frames] = RUR.current_line_no;
        } else{
            RUR.rec_line_numbers [RUR.nb_frames] = [0];
        }
    }

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;
    RUR.state.sound_id = undefined;
    if (name === "error"){
        RUR.state.error_recorded = true;
        return;
    }

    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};


},{"./../playback/show_immediate.js":38,"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../utils/supplant.js":64,"./reset.js":48}],47:[function(require,module,exports){

require("./../rur.js");
require("./../drawing/visible_world.js");
require("./../world_get/world_get.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../listeners/pause.js");
require("./../listeners/stop.js");
require("./../playback/play_sound.js");
require("./../editors/create.js");
require("./../recorder/record_frame.js");

var identical = require("./../utils/identical.js").identical;

RUR.rec = {};


RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_line_no = lineno;
    RUR.record_frame("highlight");
};

function update_editor_highlight() {
    "use strict";
    var i, next_frame_line_numbers;
        //track line number and highlight line to be executed
    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        try {
            for (i=0; i < RUR.rec_previous_lines.length; i++){
                editor.removeLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
            }
        }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        if (RUR.rec_line_numbers [RUR.current_frame_no+1] !== undefined){
            next_frame_line_numbers = RUR.rec_line_numbers [RUR.current_frame_no+1];
            for(i=0; i < next_frame_line_numbers.length; i++){
                editor.addLineClass(next_frame_line_numbers[i], 'background', 'editor-highlight');
            }
            i = next_frame_line_numbers.length - 1;
            if (RUR._max_lineno_highlighted < next_frame_line_numbers[i]) {
                RUR._max_lineno_highlighted = next_frame_line_numbers[i];
            }
            RUR.rec_previous_lines = RUR.rec_line_numbers [RUR.current_frame_no+1];
        } else {
            try {  // try adding back to capture last line of program
                for (i=0; i < RUR.rec_previous_lines.length; i++){
                    editor.addLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
                }
            }catch (e) {console.log("diagnostic: error was raised while trying to addLineClass", e);}
        }
    }
}

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status;

    if (RUR.current_frame_no >= RUR.nb_frames) {
        RUR.update_frame_nb_info();
        if (RUR.state.error_recorded) {
            return;
        }
        return RUR.rec.conclude();
    }

    update_editor_highlight();

    frame = RUR.frames[RUR.current_frame_no];
    RUR.update_frame_nb_info();
    RUR.current_frame_no++;

    if (frame === undefined){
        RUR.vis_world.refresh();
        return;
    }

    // many of the following if statements are exlusive of others ...
    // but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses
    // unless it is clear that they are completely independent

    if (frame.delay !== undefined){
        RUR.PLAYBACK_TIME_PER_FRAME = frame.delay;
    }

    if (frame.pause) {
        RUR.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) {
        RUR.set_current_world(frame.world);
        RUR.vis_world.refresh();
        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.set_current_world(frame.world);
    if (frame.sound_id !== undefined){
        RUR._play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.nb_frames > 0) {
        frame = RUR.frames[RUR.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world = RUR.clone_world();
    }
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#error-sound");
            }
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#success-sound");
        }
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else if (frame.error.name == "ReeborgOK") {
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             frame.error.message +
                             "</p>");
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#error-sound");
        }
        RUR.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.get_current_world();
    if (frame.world.goal === undefined){
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {"success": true}, result;
    g = frame.world.goal;
    if (g === undefined) { // This is only needed for some
        return goal_status;        // functional which call check_goal directly
    } else if (Object.keys(g).length === 0) { // no real goal to check
        goal_status.message = "<p class='center'>" +
                     RUR.translate("Last instruction completed!") +
                     "</p>";
        return goal_status;
    }

    world = frame.world;
    goal_status.message = "<ul>";
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.objects !== undefined) {
        result = identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</ul>";
    if (goal_status.message == "<ul></ul>") { // there was no goal to check
        goal_status.message = "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>";
    }
    return goal_status;
};

},{"./../drawing/visible_world.js":9,"./../editors/create.js":10,"./../listeners/pause.js":24,"./../listeners/stop.js":32,"./../playback/play_sound.js":37,"./../programming_api/exceptions.js":42,"./../recorder/record_frame.js":46,"./../rur.js":52,"./../translator.js":55,"./../utils/identical.js":61,"./../world_get/world_get.js":79}],48:[function(require,module,exports){
require("./../rur.js");
require("./../editors/create.js");
require("./../world_api/animated_images.js");

exports.reset = reset = function() {
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}
    RUR.current_line_no = undefined;
    RUR.frames = [];
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.PLAYBACK_TIME_PER_FRAME = 300;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR._TIMER);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec_previous_lines = [];
    RUR._max_lineno_highlighted = 0;
    RUR.animated_images_init();
    RUR.state.frame_insertion_called = false;
    RUR.frame_insertion = undefined;
    RUR.state.error_recorded = false;
};

reset();
RUR._reset = reset; // for automated testing

},{"./../editors/create.js":10,"./../rur.js":52,"./../world_api/animated_images.js":66}],49:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/validator.js");

RUR.robot = {};

RUR.robot.__ID = 1;

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = RUR.utils.filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:  /*TODO: see if we can get rid of this
                                            and have incoming in English */
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    robot.__id = 0;
    }
    RUR.robot.set_private_defaults(robot);

    return robot;
};

RUR.robot.set_private_defaults = function(robot) {
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    robot._trace_history = [];
    robot._trace_style = "default";
    robot._trace_color = RUR.DEFAULT_TRACE_COLOR;
    robot.__id = assign_id();
};

/* Robot definitions in World files has changed as
   new features were added; we make sure that they are properly
   updated when needed. This should be called when a world is
   imported. */
RUR.robot.modernize = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    // In previous version, worlds were recorded with object nb == 0;
    // we need to remove such objects with the new notation.
    // i.e.  {"token": 0} --> {}
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" ||
                 robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
            }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }
    RUR.robot.set_private_defaults(robot);
};

assign_id = function () {
    RUR.robot.__ID += 1;
    return RUR.robot.__ID;
};

},{"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../translator.js":55,"./../utils/validator.js":65}],50:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../drawing/visible_world.js");
require("./../editors/update.js");
require("./../programming_api/blockly.js");
require("./../recorder/recorder.js");
require("./world_init.js");
require("./../editors/create.js");
require("./../utils/supplant.js");

//TODO: refactor this

RUR.runner = {};

/* A user program is evaluated when the user clicks on "run" or "step" for
   the first time and the result is stored in a series of frames.
   The playback is then done automatically (clicking on "run") or can be done
   frame by frame (clicking on "step").  When clicking on "step" repeatedly,
   we do not need to evaluate the program again, but simply to show a frame
   recorded.  The RUR.state.code_evaluated flag is used to determine if we
   only need to show a frame already recorded, or if we need to evaluate the
   program.
 */

RUR.runner.run = function (playback) {
    "use strict";
    var fatal_error_found = false, xml, xml_text;
    if (!RUR.state.code_evaluated) {
        if (RUR.state.editing_world) {
        // TODO: check that this is ok
        RUR.WORLD_AFTER_ONLOAD = RUR.clone_world(RUR.get_current_world());
        }
        RUR.set_current_world(RUR.clone_world(RUR.WORLD_AFTER_ONLOAD));
        RUR.world_init();

        if (!(RUR.state.programming_language === "python" && RUR.state.highlight) ) {
            RUR.record_frame();  // record the starting state as first frame;
            // for python with highlighting on, the first frame will be the first
            // instruction to be executed highlighted.
        }

        if (RUR.state.input_method === "blockly-py") {
            editor.setValue(Blockly.Python.workspaceToCode(RUR.blockly.workspace));
        } else if (RUR.state.input_method === "blockly-js") {
            editor.setValue(Blockly.JavaScript.workspaceToCode(RUR.blockly.workspace));
        }
        if (RUR.state.input_method === "blockly-py" ||
            RUR.state.input_method === "blockly-js") {
                xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
                xml_text = Blockly.Xml.domToText(xml);
                localStorage.setItem("blockly", xml_text);
        }
        fatal_error_found = RUR.runner.eval(editor.getValue()); // jshint ignore:line
    }
    if (!fatal_error_found) {
        // save program so that it a new browser session can use it as
        // starting point.
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (RUR.state.prevent_playback) {
            return;
        }
        playback();
    }
};

/* RUR.runner.eval returns true if a fatal error is found, false otherwise */
RUR.runner.eval = function(src) {  // jshint ignore:line
    var message, response, other_info, from_python, error;
    other_info = '';

    /* At some point around version 3.2.0, Brython changed the way it
       handled uncaught errors, and no longer pass a "nice" object
       to the surrounding Javascript environment - since this is not
       the way Brython programmers normally do things.   While this
       has been changed back some time after version 3.2.3, we nonetheless
       guard against any future changes by doing our own handling. */

    RUR.__python_error = false;
    try {
        if (RUR.state.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.state.programming_language === "python") {
            RUR.runner.eval_python(src);
            // This is the error handling referenced in the above comment.
            if (RUR.__python_error) {
                throw RUR.__python_error;
            }
        } else {
            alert("FATAL ERROR: Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        RUR.state.code_evaluated = true;
        if (RUR.__debug){
            console.dir(e);
        }
        error = {};
        if (e.reeborg_concludes !== undefined) {  // indicates success
            error.message = e.reeborg_concludes;
            error.name = "ReeborgOK";
            if (RUR.state.prevent_playback) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
            } else {
                RUR.record_frame("error", error);
            }
            return false; // since success, not a fatal error.
        }
        if (RUR.state.programming_language === "python") {
            error.reeborg_shouts = e.reeborg_shouts;
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error.name = response.error_name;
            error.message = "<h3>" + error.name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>';
        } else {
            error.name = e.name;
            message = e.message;
            other_info = '';
            if (e.reeborg_shouts !== undefined) {
                error.message = e.reeborg_shouts;
                error.reeborg_shouts = e.reeborg_shouts;
            }
        }

        if (e.reeborg_shouts !== undefined){
            RUR.record_frame("error", error);
        } else {
            RUR.show_feedback("#Reeborg-shouts",
                                    "<h3>" + error.name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>');
            return true;
        }
    }
    RUR.state.code_evaluated = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    var pre_code, post_code;
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    RUR.reset_definitions();
    src = pre_code + "\n" + src + "\n" + post_code;
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code, post_code;
    RUR.reset_definitions();
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    translate_python(src, RUR.state.highlight, RUR.state.watch_vars, pre_code, post_code);
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {
        message = e.$message;
        error_name = e.__name__;
        diagnostic = '';
        switch (error_name) {
            case "SyntaxError":
                try {
                    other_info = RUR.runner.find_line_number(e.args[4]);
                    if (RUR.runner.check_colons(e.args[4])) {
                        other_info += RUR.translate("<br>Perhaps a missing colon is the cause.");
                    } else if (RUR.runner.check_func_parentheses(e.args[4])){
                        other_info += RUR.translate("<br>Perhaps you forgot to add parentheses ().");
                    } else {
                        console.log(e.args);
                        try {
                            other_info += e.args[4];
                        } catch (e) {
                            console.log("error in simplifying traceback: ", e);
                        }
                    }
                } catch (e) { // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                    console.log("error in simplifying traceback: ", e);
                }
                break;
            case "IndentationError":
                message = RUR.translate("The code is not indented correctly.");
                try {
                    other_info = RUR.runner.find_line_number(e.args[4]);
                    if (e.args[4].indexOf("RUR.set_lineno_highlight([") == -1){
                        other_info += "<br><code>" + e.args[4] + "</code>";
                    } else if (RUR.state.highlight) {
                        other_info += "Try turning off syntax highlighting; if this fixes the problem, please file a bug.";
                    }
                } catch (e) {  // jshint ignore:line
                    if (RUR.state.highlight) {
                        other_info += "Try turning off syntax highlighting; if this fixes the problem, please file a bug.";
                    } else {
                        other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                    }
                }
                break;
            case "NameError":
                try {
                    other_info = RUR.runner.find_line_number(message);
                    other_info += RUR.translate("<br>Perhaps you misspelled a word or forgot to define a function or a variable.");
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer.";
                }
                break;
            case "Internal Javascript error: SyntaxError":
            case "Internal Javascript error: TypeError":
                error_name = "Invalid Python Code - " + error_name;
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        if (e.__name__ === undefined) {
            error_name = "ReeborgError";
        } else {
            error_name = e.__name__;
        }
    }
    return {message:message, other_info:other_info, error_name:error_name};
};


RUR.runner.find_line_number = function(bad_code) {
    /** With the possibility of having code inserted by the highlighting routine,
        with some pre-code, and with Brython not counting empty lines at the
        beginning of a program, it is more reliable to scan the source code
        for the offending code as identified by Brython and see if it occurs
        only once in the user's program */
    var lines, found, i, lineno;
    if (bad_code.indexOf("RUR.set_lineno_highlight([") != -1){
        bad_code = bad_code.replace("RUR.set_lineno_highlight([", "");
        lines = bad_code.split("]");
        lineno = lines[0] + 1;
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    lines = editor.getValue().split("\n");
    found = false;
    lineno = false;
    for (i=0; i<lines.length; i++) {
        try {
        } catch (e) {
            return '';
        }
         if(lines[i].indexOf(bad_code) != -1){
            if (found){
                return '';   // found the offending code twice; can not rely on this
            } else {
                found = true;
                lineno = i+1;
            }
        }
    }
    if (lineno) {
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    return '';
};


RUR.runner.check_colons = function(line_of_code) {
    var tokens, line, nb_token;
    tokens = ['if ', 'if(', 'else', 'elif ','elif(','while ','while(',
              'for ','for(', 'def '];
    for (nb_token=0; nb_token < tokens.length; nb_token++){
        if (line_of_code.indexOf(tokens[nb_token]) != -1){
            if (line_of_code.indexOf(":") == -1){
                return true;    // missing colon
            }
        }
    }
    return false;  // no missing colon
};

RUR.runner.check_func_parentheses = function(line_of_code) {
    if (line_of_code.indexOf('def') != -1){
        if (line_of_code.indexOf("(") == -1){
            return true;    // missing parentheses
        }
    }
    return false;  // no missing parentheses
};

},{"./../drawing/visible_world.js":9,"./../editors/create.js":10,"./../editors/update.js":11,"./../programming_api/blockly.js":39,"./../recorder/recorder.js":47,"./../rur.js":52,"./../translator.js":55,"./../utils/supplant.js":64,"./world_init.js":51}],51:[function(require,module,exports){
require("./../drawing/visible_world.js");
require("./../rur.js");

// Returns a random integer between min and max (both included)
randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/** @function world_init
 * @memberof RUR
 * @instance
 * @summary This function is called automatically just before a program is run.
 * It identifies which objects (including goals) are initially assigned unknown
 * random values, and assigns the required values.  A world creator should
 * never need to call this function.
 *
 */
RUR.world_init = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};
    var world = RUR.get_current_world();

   // First, deal with objects

    if (world.objects !== undefined){
        objects = world.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(world.objects[coords]).length === 0){
                    delete world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (world.goal !== undefined &&
        world.goal.objects !== undefined){
        objects = world.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(world.goal.objects[coords]).length === 0){
                    delete world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (world.robots !== undefined && world.robots.length == 1){
        robot = world.robots[0];
        if (robot.possible_initial_positions !== undefined) {
            position = robot.possible_initial_positions[randint(0, robot.possible_initial_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.possible_initial_positions;
        }
        if (robot._orientation == -1){
            world.robots[0]._orientation = randint(0, 3);
            world.robots[0]._prev_orientation = world.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (world.goal !== undefined &&
        world.goal.possible_final_positions !== undefined &&
        world.goal.possible_final_positions.length > 1) {
        goal = world.goal;
        position = goal.possible_final_positions[randint(0, goal.possible_final_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_final_positions;
    }
    RUR.vis_world.refresh();
};

},{"./../drawing/visible_world.js":9,"./../rur.js":52}],52:[function(require,module,exports){
/** @namespace RUR
 * @desc The namespace reserved for all the core Reeborg World methods.
 *
 */

/*====================================================
 Yes, I know, global variables are a terrible thing.
======================================================*/

window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.
RUR.utils = {};
RUR.world_utils = {};
RUR.FuncTest = {};

RUR.THINGS = {}; // javascript objects which can be drawn, like "token"
RUR.KNOWN_THINGS = []; // keeping track of their names only

/* In order to make it easier to have a version of Reeborg's World
   installed on different servers, or from different location with
   respect to the base directory, we introduce a global variables that
   is used to obtain the relative path to use when loading various
   files elsewhere */
var pathname;
try {
    pathname = window.location.pathname;  // not defined for unit tests
    if (pathname.indexOf("qunit") !== -1 ){  // running functional/qunit test
        RUR.BASE_URL = '../..';
    } else {
        RUR.BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR.BASE_URL = '';
}

/* Reeborg's World can be in different states (running a program,
 * editing a world, etc.) and the behaviour of some features can be affected
 * (e.g. enabled or disabled) depending on that state.
 * RUR.state is the name space used to group all constants describing
 * these various states
 */
RUR.state = {};

RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.do_not_draw_info = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "python";
RUR.state.error_recorded = false;
RUR.state.evaluating_onload = false;
RUR.state.frame_insertion_called = false;
RUR.state.programming_language = "python";
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.reset_default_robot_images_needed = false;
RUR.state.refresh_needed = false;
RUR.state.run_button_clicked = false;
RUR.state.running_program = false;
RUR.state.session_initialized = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;
RUR.state.changed_cells = [];
RUR.state.visible_grid = false;

RUR.onload_new_image = function  () {
    // we do not require the file in which it is defined
    // to avoid a circular import.
    if (RUR.vis_world === undefined) { // not ready yet
        return;
    }
    try {
        requestAnimationFrame(RUR.vis_world.draw_all);
    }
    catch(e) {
        console.log("requestAnimationFrame failed in rur.js.");
    }
};



// TODO: see if worthwhile to create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.TILE_SIZE = 40;

// current default canvas size; can be changed based on world definition.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// The following non-default values can be cut in half
// when using worlds with "small tiles".
RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH = 40;
RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS = 4;

//----------------------------------------------------------------
// We use multiple canvases to facilitate the drawing of objects
// without having to worry much about the order in which we draw
// the various types of objects.
//
// The order in which the canvases are overlayed one on top of another
// is set in the CSS file and should not be inferred from the
// Javascript code below.
//
// Note that, when doing unit tests (not functional tests), we do not
// have canvases defined; so we enclose these definitions in a function
// that does ignores canvases when appropriate.
function set_canvases () {
    if (window.document === undefined) {
        return;
    }
    RUR.CANVASES = [];
    RUR.ALL_CTX = [];

    function create_ctx(canvas, ctx) {
        RUR[ctx] = canvas.getContext("2d");
        RUR.CANVASES.push(canvas);
        RUR.ALL_CTX.push(RUR[ctx]);
    }

    RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas"); //1
    create_ctx(RUR.BACKGROUND_CANVAS, "BACKGROUND_CTX");
    RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    // Get default width and height from html files; these are shared
    // by all canvases, and can be changed when a new world is
    // loaded or created
    RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
    RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

    RUR.THINGS_CANVAS = document.getElementById("tiles-canvas");  //2
    create_ctx(RUR.THINGS_CANVAS, "TILES_CTX");

    RUR.THINGS_CANVAS_ANIM = document.getElementById("tiles-canvas-anim"); // 3
    create_ctx(RUR.THINGS_CANVAS_ANIM, "TILES_ANIM_CTX");

    RUR.BRIDGE_CANVAS = document.getElementById("bridge-canvas");  //4
    create_ctx(RUR.BRIDGE_CANVAS, "BRIDGE_CTX");

    RUR.BRIDGE_CANVAS_ANIM = document.getElementById("bridge-canvas-anim");  //5
    create_ctx(RUR.BRIDGE_CANVAS_ANIM, "BRIDGE_ANIM_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS = document.getElementById("decorative-objects-canvas"); // 6
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS, "DECORATIVE_OBJECTS_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS_ANIM = document.getElementById("decorative-objects-canvas-anim"); // 7
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS_ANIM, "DECORATIVE_OBJECTS_ANIM_CTX");

    RUR.OBSTACLES_CANVAS = document.getElementById("obstacles-canvas"); // 8
    create_ctx(RUR.OBSTACLES_CANVAS, "OBSTACLES_CTX");

    RUR.OBSTACLES_CANVAS_ANIM = document.getElementById("obstacles-canvas-anim"); // 9
    create_ctx(RUR.OBSTACLES_CANVAS_ANIM, "OBSTACLES_ANIM_CTX");

    RUR.GOAL_CANVAS = document.getElementById("goal-canvas"); // 10
    create_ctx(RUR.GOAL_CANVAS, "GOAL_CTX");

    // 11 removed

    RUR.GOAL_CANVAS_ANIM = document.getElementById("goal-canvas-anim"); //12
    create_ctx(RUR.GOAL_CANVAS_ANIM, "GOAL_ANIM_CTX");

    RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");  //13
    create_ctx(RUR.OBJECTS_CANVAS, "OBJECTS_CTX");

    RUR.OBJECTS_CANVAS_ANIM = document.getElementById("objects-canvas-anim"); //14
    create_ctx(RUR.OBJECTS_CANVAS_ANIM, "OBJECTS_ANIM_CTX");

    RUR.TRACE_CANVAS = document.getElementById("trace-canvas"); //15
    create_ctx(RUR.TRACE_CANVAS, "TRACE_CTX");

    RUR.PUSHABLES_CANVAS = document.getElementById("pushables-canvas"); //16
    create_ctx(RUR.PUSHABLES_CANVAS, "PUSHABLES_CTX");

    RUR.PUSHABLES_CANVAS_ANIM = document.getElementById("pushables-canvas-anim"); //17
    create_ctx(RUR.PUSHABLES_CANVAS_ANIM, "PUSHABLES_ANIM_CTX");

    RUR.WALL_CANVAS = document.getElementById("wall-canvas"); //18
    create_ctx(RUR.WALL_CANVAS, "WALL_CTX");

    RUR.ROBOT_CANVAS = document.getElementById("robot-canvas"); //19
    create_ctx(RUR.ROBOT_CANVAS, "ROBOT_CTX");

    RUR.ROBOT_ANIM_CANVAS = document.getElementById("robot-anim-canvas"); //20
    create_ctx(RUR.ROBOT_ANIM_CANVAS, "ROBOT_ANIM_CTX");
}

// We immediately create the canvases.
set_canvases();

RUR.MAX_Y = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.MAX_X = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;

// The current default values of RUR.MAX_X and RUR.MAX_Y on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.MAX_X and RUR.MAX_Y should be used.
RUR.MAX_X_DEFAULT = 14;
RUR.MAX_Y_DEFAULT = 12;
RUR.USE_SMALL_TILES = false;

RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;
RUR.PLAYBACK_TIME_PER_FRAME = 300;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.ANIMATION_TIME = 120;
RUR.END_CYCLE = "end cycle"; // for animated images

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

// RUR.CURRENT_WORLD should not be used in other javascript functions;
// some of the functions defined below should be used instead.
RUR.CURRENT_WORLD = null; // needs to be created explicitly

/** @function get_current_world
 * @memberof RUR
 * @instance
 *
 * @desc  This function returns a World as a json object. Since the
 *  internal structure of worlds is subject to change, it is
 *  not advised to make use of this function inside a world definition.
 *
 *  However, **when using javascript**, it can be useful as a means to explore
 *  the world structure, or assign advanced students to write their own
 *  functions based on the world structure (for example: find
 *  the shortest path in a maze using various search algorithms.)
 *
 * **When using Python, see instead `SatelliteInfo()`.
 */
RUR.get_current_world = function () {
    return RUR.CURRENT_WORLD;
};

// No need to document this with JSDoc as it should not be called by external users.
RUR.set_current_world = function (world) {
    RUR.CURRENT_WORLD = world;
}

RUR.export_world = function (world) {
    if (world === undefined) {
        return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
    } else {
        return JSON.stringify(world, null, 2);
    }
};

RUR.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.CURRENT_WORLD));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};



RUR.frame_insertion = undefined; // special function available to world creators

// for colour blind people
RUR.GREEN = "green";
RUR.RED = "red";
/** @function configure_red_green
 * @memberof RUR
 * @instance
 *
 * @desc  Colour blind users may use this function to choose two colours,
 * instead of red and green, to indicate if the number of objects required
 * as a goal at a given location has been achieved or not.  The choices made
 * are saved in the browser's local storage and should only need to be
 * entered once.
 *
 * @param {string} red A colour indicated either as a named colour, like
 * `"red"`, `"indigo"`, etc., an rgb value like `"rgb(125, 34, 22)"`,
 * or an rgba value, or a hexadecimal colour like `"#FA2336"`.
 *
 * @param {string} green Another colour, seen as contrasting with `red` by
 * the user.
 */
RUR.configure_red_green = function (red, green) {
    RUR.GREEN = green;
    RUR.RED = red;
    localStorage.setItem("userchoice_red", red);
    localStorage.setItem("userchoice_green", green);
};

//--------------------------------------------------------
// We communicate information to the user using various
// styled dialog windows; this generic function specifies
// which dialog (html "element") to use and the content to
// display to the user.
//
RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};
},{}],53:[function(require,module,exports){

require("./rur.js");
/* Requiring the following just to get things started */
require("./listeners/add_listeners.js");
/* --- */

require("./programming_api/blockly.js");

require("./default_tiles/tiles.js");

require("./utils/parseuri.js");
require("./world_utils/import_world.js");
require("./storage/storage.js");

require("./permalink/permalink.js");
require("./editors/create.js");

// ensure that all world_api methods are defined, even though they
// might be already imported by the menu-driven world editor.
//
// TODO: Add functional test ensuring that each type is appropriately loaded
require("./world_api/background_tile.js");
require("./world_api/bridges.js");
require("./world_api/decorative_objects.js");
require("./world_api/objects.js");
require("./world_api/obstacles.js");
require("./world_api/pushables.js");
require("./world_api/robot.js");
require("./world_api/walls.js");



brython({debug:1, pythonpath:[RUR.BASE_URL + '/src/python']});
if (__BRYTHON__.__MAGIC__ != "3.2.7") {
    alert("Expecting Brython version 3.2.7 and got " + __BRYTHON__.__MAGIC__);
}

/* Once everything is loaded, we need to decide which UI to show.
   The priority is determined by:

   1. information encoded in the URL.
   2. any previously saved state.
   3. site defaults
*/
function start_session () {
    "use strict";
    var mode, url_query = parseUri(window.location.href);
    RUR.state.session_initialized = false;
    set_editor();
    set_library();
    get_red_green();
    // The world can include some content for the editor and/or the library, and/or the blocks
    RUR.permalink.set_language(url_query);
    mode = RUR.permalink.set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_world(url_query);
    RUR.state.session_initialized = true;
}
start_session();

function restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
    }
}

function set_editor() {
    "use strict";
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    }
}

function get_red_green () {
    var red, green;
    if (localStorage.getItem("userchoice_red") && localStorage.getItem("userchoice_green")){
        red = localStorage.getItem("userchoice_red");
        green = localStorage.getItem("userchoice_green");
        RUR.configure_red_green(red, green);
    }
}

function set_world(url_query) {
    var world, name;
    if (RUR.permalink.from_url(url_query)){
        return;
    }
    name = localStorage.getItem("world");
    if (name) {
        world = RUR.world_select.url_from_shortname(name);
        if (world) {
            RUR.world_select.set_url(world);
        } else {
            RUR.world_select.set_default();
        }
    } else {
        RUR.world_select.set_default();
    }
}

},{"./default_tiles/tiles.js":1,"./editors/create.js":10,"./listeners/add_listeners.js":17,"./permalink/permalink.js":35,"./programming_api/blockly.js":39,"./rur.js":52,"./storage/storage.js":54,"./utils/parseuri.js":63,"./world_api/background_tile.js":68,"./world_api/bridges.js":69,"./world_api/decorative_objects.js":71,"./world_api/objects.js":73,"./world_api/obstacles.js":74,"./world_api/pushables.js":75,"./world_api/robot.js":76,"./world_api/walls.js":78,"./world_utils/import_world.js":85}],54:[function(require,module,exports){
/* This file documents methods used to save worlds to and retrieve them
   from a browser's local storage.

   When a program is run successfully, it is saved in the browser; this
   way, when a user quits the site and starts a new session, he or she
   can resume from where they were.

   Furthermore, when editing a world, it is useful to save it; it is stored
   in the browser and its name is appended to the world html select menu.
   All such worlds are available to a user, unless they explicitly delete
   them from the menu.
*/

require("./../rur.js");
require("./../translator.js");
require("./../ui/world_select.js");

RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, RUR.export_world(RUR.get_current_world()));
    } else {
        RUR.storage.save_world(name);
    }
    /* We make an assumption here that the onload code has not been run */
    RUR.WORLD_BEFORE_ONLOAD = RUR.clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    if (RUR.state.editing_world) {
        localStorage.setItem(url, RUR.export_world(RUR.get_current_world()));
    } else {
        localStorage.setItem(url, RUR.export_world(RUR.WORLD_BEFORE_ONLOAD));
    }
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.
    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(
            RUR.world_select.url_from_shortname(
                localStorage.getItem("world"))
            );
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

},{"./../rur.js":52,"./../translator.js":55,"./../ui/world_select.js":59}],55:[function(require,module,exports){
require("./rur.js");
var uien = require("./../lang/ui_en.js"),
    uifr = require("./../lang/ui_fr.js"),
    uiko = require("./../lang/ui_ko.js"),
    en = require("./../lang/en.js"),
    fr = require("./../lang/fr.js");

RUR.ui_en = uien.ui_en;
RUR.en_to_en = uien.en_to_en;
RUR.ui_fr = uifr.ui_fr;
RUR.fr_to_en = uifr.fr_to_en;
RUR.ui_ko = uiko.ui_ko;
RUR.ko_to_en = uiko.ko_to_en;
RUR.en = en.en;
RUR.fr = fr.fr;

RUR.untranslated = {"en":true, "fr":true};

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}
RUR.translation = RUR.ui_en;
merge_dicts(RUR.translation, RUR.en);
RUR.translation_to_english = RUR.en_to_en;

RUR._translation_needed = {};
RUR._translation_to_english_needed = {};


RUR.translate = function (s) {
    if (s==undefined) {
        return "";
    }
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        if (RUR._translation_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation needed for " + s);
            RUR._translation_needed[s] = true;
        }
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        if (RUR._translation_to_english_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation to English needed for " + s);
            RUR._translation_to_english_needed[s] = true;
        }
        return s;
    }
};

},{"./../lang/en.js":86,"./../lang/fr.js":87,"./../lang/ui_en.js":89,"./../lang/ui_fr.js":90,"./../lang/ui_ko.js":91,"./rur.js":52}],56:[function(require,module,exports){
/* In this module, we make it possible for a user to define their
   own world menu selection. We also include some default world menus. */
require("./../translator.js");
require("./world_select.js");
require("./../storage/storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {
    "use strict";
    var i, url;
    RUR.world_select.empty_menu();
    for(i=0; i<contents.length; i++){
        RUR.world_select.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    if (RUR.state.session_initialized) {
        RUR.world_select.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;
    RUR.state.creating_menu = true;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
    RUR.state.creating_menu = false;
}


RUR.make_default_menu = function(language) {
    switch (language) {
        case 'en':
        case 'fr-en':
        case 'ko-en':
            RUR.make_default_menu_en();
            break;
        case 'fr':
        case 'en-fr':
            RUR.make_default_menu_fr();
            break;
        default: RUR.make_default_menu_en();
    }
};


RUR.make_default_menu_en = function () {
    "use strict";
    var contents,
        new_tutorial_en = RUR.BASE_URL + '/worlds/tutorial_en/',
        tutorial_en = RUR.BASE_URL + '/src/worlds/tutorial_en/',
        menus = RUR.BASE_URL + '/src/worlds/menus/',
        worlds = RUR.BASE_URL + '/src/worlds/',
        docs = RUR.BASE_URL + '/src/worlds/documentation/',
        permalinks = RUR.BASE_URL + '/src/worlds/permalinks/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [new_tutorial_en + 'around1.json', 'Around 1'],
        [new_tutorial_en + 'around2.json', 'Around 2'],
        [new_tutorial_en + 'around3.json', 'Around 3'],
        [new_tutorial_en + 'around4.json', 'Around 4'],
        [tutorial_en + 'center1.json', 'Center 1'],
        [tutorial_en + 'center2.json', 'Center 2'],
        [tutorial_en + 'center3.json', 'Center 3'],
        [tutorial_en + 'harvest1.json', 'Harvest 1'],
        [tutorial_en + 'harvest2.json', 'Harvest 2'],
        [tutorial_en + 'harvest3.json', 'Harvest 3'],
        [tutorial_en + 'harvest4a.json', 'Harvest 4a'],
        [tutorial_en + 'harvest4b.json', 'Harvest 4b'],
        [tutorial_en + 'harvest4c.json', 'Harvest 4c'],
        [tutorial_en + 'harvest4d.json', 'Harvest 4d'],
        [new_tutorial_en + 'home1.json', 'Home 1'],
        [new_tutorial_en + 'home2.json', 'Home 2'],
        [new_tutorial_en + 'home3.json', 'Home 3'],
        [tutorial_en + 'hurdle1.json', 'Hurdle 1'],
        [tutorial_en + 'hurdle2.json', 'Hurdle 2'],
        [tutorial_en + 'hurdle3.json', 'Hurdle 3'],
        [tutorial_en + 'hurdle4.json', 'Hurdle 4'],
        [tutorial_en + 'maze1.json', 'Maze 1'],
        [tutorial_en + 'maze2.json', 'Maze 2'],
        [tutorial_en + 'newspaper0.json', 'Newspaper 0'],
        [tutorial_en + 'newspaper1.json', 'Newspaper 1'],
        [tutorial_en + 'newspaper2.json', 'Newspaper 2'],
        [tutorial_en + 'rain1_en.json', 'Rain 1'],
        [tutorial_en + 'rain2_en.json', 'Rain 2'],
        [tutorial_en + 'storm1.json', 'Storm 1'],
        [tutorial_en + 'storm2.json', 'Storm 2'],
        [tutorial_en + 'storm3.json', 'Storm 3'],
        [tutorial_en + 'tokens1.json', 'Tokens 1'],
        [tutorial_en + 'tokens2.json', 'Tokens 2'],
        [tutorial_en + 'tokens3.json', 'Tokens 3'],
        [tutorial_en + 'tokens4.json', 'Tokens 4'],
        [tutorial_en + 'tokens5.json', 'Tokens 5'],
        [tutorial_en + 'tokens6.json', 'Tokens 6'],
        [docs + 'simple_demo1', 'Demo 1 (solution)'],
        [docs + 'simple_demo2', 'Demo 2 (solution)'],
        [docs + 'simple_demo3', 'Demo 3 (solution)'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [permalinks + 'pre_post_demo', 'Pre & Post code demo'],
        [permalinks + 'story', 'Story'],
        [permalinks + 'test_remove', 'Robot replacement'],
        [docs + 'big_maze.json', 'Big maze'],
        [worlds + 'maze_gen_py', 'Maze generation (Python)'],
        [worlds + 'maze_gen_js', 'Maze generation (Javascript)'],
        [worlds + 'blank.json', 'Blank canvas'],
        ];

    RUR.custom_world_select.make(contents);
};

RUR.make_default_menu_fr = function () {
    "use strict";
    var base_url, base_url2, contents, menus, worlds, new_tutorial_fr;

    base_url = RUR.BASE_URL + '/src/worlds/tutorial_en/';
    base_url2 = RUR.BASE_URL + '/src/worlds/tutorial_fr/';

    menus = RUR.BASE_URL + '/src/worlds/menus/';
    worlds = RUR.BASE_URL + '/src/worlds/';
    new_tutorial_fr = RUR.BASE_URL + '/worlds/tutorial_fr/',

    contents = [
        [RUR.BASE_URL + '/src/worlds/seul.json', 'Seul'],
        [RUR.BASE_URL + '/src/worlds/empty.json', 'Vide'],
        [new_tutorial_fr + 'around1.json', 'Autour 1'],
        [new_tutorial_fr + 'around2.json', 'Autour 2'],
        [new_tutorial_fr + 'around3.json', 'Autour 3'],
        [new_tutorial_fr + 'around4.json', 'Autour 4'],
        [new_tutorial_fr + 'home1.json', 'But 1'],
        [new_tutorial_fr + 'home2.json', 'But 2'],
        [new_tutorial_fr + 'home3.json', 'But 3'],
        [base_url + 'center1.json', 'Centrer 1'],
        [base_url + 'center2.json', 'Centrer 2'],
        [base_url + 'center3.json', 'Centrer 3'],
        [base_url + 'hurdle1.json', 'Haies 1'],
        [base_url + 'hurdle2.json', 'Haies 2'],
        [base_url + 'hurdle3.json', 'Haies 3'],
        [base_url + 'hurdle4.json', 'Haies 4'],
        [base_url + 'tokens1.json', 'Jetons 1'],
        [base_url + 'tokens2.json', 'Jetons 2'],
        [base_url + 'tokens3.json', 'Jetons 3'],
        [base_url + 'tokens4.json', 'Jetons 4'],
        [base_url + 'tokens5.json', 'Jetons 5'],
        [base_url + 'tokens6.json', 'Jetons 6'],
        [base_url + 'newspaper0.json', 'Journal 0'],
        [base_url + 'newspaper1.json', 'Journal 1'],
        [base_url + 'newspaper2.json', 'Journal 2'],
        [base_url + 'maze1.json', 'Labyrinthe 1'],
        [base_url + 'maze2.json', 'Labyrinthe 2'],
        [base_url + 'rain1.json', 'Pluie 1'],
        [base_url + 'rain2.json', 'Pluie 2'],
        [base_url + 'harvest1.json', 'Récolte 1'],
        [base_url + 'harvest2.json', 'Récolte 2'],
        [base_url + 'harvest3.json', 'Récolte 3'],
        [base_url + 'harvest4a.json', 'Récolte 4a'],
        [base_url + 'harvest4b.json', 'Récolte 4b'],
        [base_url + 'harvest4c.json', 'Récolte 4c'],
        [base_url + 'harvest4d.json', 'Récolte 4d'],
        [base_url + 'storm1.json', 'Tempête 1'],
        [base_url + 'storm2.json', 'Tempête 2'],
        [base_url + 'storm3.json', 'Tempête 3'],
        // [menus + 'default_fr', 'Menu par défaut'],
        [worlds + 'menus/documentation_fr', 'Documentation (menu anglais)'],
        [worlds + 'simple_path_fr.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [RUR.BASE_URL + 'src/worlds/blank.json', 'Canevas graphique'],
    ];

    RUR.custom_world_select.make(contents);
};

},{"./../storage/storage.js":54,"./../translator.js":55,"./world_select.js":59}],57:[function(require,module,exports){

require("./../rur.js");

exports.toggle = function () {
    var world = RUR.get_current_world();
    if ("robots" in world && world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

},{"./../rur.js":52}],58:[function(require,module,exports){

require("./../rur.js");

exports.set_ui_ready_to_run = set_ui_ready_to_run = function () {
    RUR.state.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
};

set_ui_ready_to_run();

},{"./../rur.js":52}],59:[function(require,module,exports){

/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.

    The world menu is currently an html select element with
    id = select-world.  Doing a global search for "#select-world" should
    only find items in this file.
*/

RUR.world_select = {};

RUR.world_select.empty_menu = function () {
    $("#select-world").html('');
};

RUR.world_select.set_default = function () {
    document.getElementById("select-world").selectedIndex = 0;
    $("#select-world").change();
};

RUR.world_select.set_url = function (url) {
    $('#select-world').val(url);
    $("#select-world").change();
};

RUR.world_select.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select-world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_select.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    shortname = shortname.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].text.toLowerCase() === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_select.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_select.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = arg.shortname;
    } else {
        shortname = url;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_select.replace_shortname(url, shortname)) {
        $('#select-world').append( $(option_elt).val(url).html(shortname));
    }
};

},{}],60:[function(require,module,exports){
;
// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax

// will modify a global object - no need to export anything.
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

},{}],61:[function(require,module,exports){
/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js

    Modified to assume that order of arrays is irrelevant
    (which it should be since this is meant to be used to
    compare worlds.)  Also adapted to ignore empty objects
    when doing comparison; for worlds, only non-empty objects
    are meaningful and can be compared.
*/

exports.identical = identical = function (a, b) {

    function sort(object) {
        if (Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        } else if (Object.keys(object).length === 0){
            return undefined;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

require("./../rur.js");
RUR.FuncTest.object_identical = identical; // for automated testing.

},{"./../rur.js":52}],62:[function(require,module,exports){
require("./../rur.js");
/* short functions to make the rest of the code easier
   to read */

//TODO: add tests and documentation

RUR.utils.ensure_key_for_obj_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    } else if (Object.prototype.toString.call(obj[key]) != "[object Object]") {
        throw Error("Expected an object.");
    }
};

RUR.utils.ensure_key_for_array_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = [];
    } else if (Object.prototype.toString.call(obj[key]) != "[object Array]") {
        throw Error("Expected an array.");
    }
};

},{"./../rur.js":52}],63:[function(require,module,exports){
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

window.parseUri = parseUri;

exports.update_url = update_url = function () {
    /* Used to maintain information about human language used and
       input mode.
    */
    "use strict";
    var proglang, url_query, permalink;
    url_query = parseUri(window.location.href);
    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    permalink += "?lang=" + RUR.state.human_language + "&mode=" + RUR.state.input_method;
    window.history.pushState("dummy", "dummy", permalink);
};

},{}],64:[function(require,module,exports){
// adapted from http://javascript.crockford.com/remedial.html

// will modify a global object - no need to export anything.

String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

},{}],65:[function(require,module,exports){

require("./../rur.js");
require("./../programming_api/exceptions.js");

_is_integer = function(n) {
    return typeof n==='number' && (n%1)===0;
};

_is_non_negative_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=0;
};

_is_positive_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=1;
};

RUR.is_integer = _is_integer;
RUR.is_non_negative_integer = _is_non_negative_integer;
RUR.is_positive_integer = _is_positive_integer;

RUR.is_valid_position = function(x, y) {
    var world = RUR.get_current_world();
    return (_is_positive_integer(x) && _is_positive_integer(y) &&
           x <= world.cols && y <= world.rows);
};


/* filterInt taken from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt

It is a stricter way than parseInt to extract integer values, and supports
Infinity as a valid integer.

See tests/unit_tests/utils/filterint.tests.js for tests illustrating sample
uses.
*/
RUR.utils.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){
    return Number(value);
  }
  return undefined;
};

},{"./../programming_api/exceptions.js":42,"./../rur.js":52}],66:[function(require,module,exports){
/* This file contains methods used to create animated images by creating
   the appropriate selection sequence from a list of images.
 */

require("./../rur.js");

RUR.animated_images_init = function () {
    RUR._ORDERED = {};
    RUR._SYNC = {};
    RUR._SYNC_VALUE = {};
    RUR._CYCLE_STAY = {};
    RUR._CYCLE_REMOVE = {};
    RUR.ANIMATION_TIME = 120;
};

// RUR._NB_IMAGES_TO_LOAD = 0;
// RUR._NB_IMAGES_LOADED = 0;
// RUR._incremented_loaded_images = function () {
//     RUR._NB_IMAGES_LOADED += 1;
// };



RUR.animate_images = function (obj) {
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        obj["image"+i].onload = RUR.onload_new_image;
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (id) {
            return RUR._sync(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (id) {
            return RUR._ordered(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle stay") {
        obj.choose_image = function (id) {
            return RUR._cycle_stay(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle remove") {
        obj.choose_image = function (id) {
            return RUR._cycle_remove(obj, obj.images.length, id);
        };
    } else {
        obj.choose_image = function (id) {
            return RUR._random(obj, obj.images.length);
        };
    }
};


RUR._random = function (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
};

RUR._ordered = function (obj, nb, id) {
    // each animated image is given a random initial value but then goes in order
    if (RUR._ORDERED[obj.name] === undefined) {
        RUR._ORDERED[obj.name] = {};
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED[obj.name]).indexOf(id) === -1) {
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED[obj.name][id] += 1;
        RUR._ORDERED[obj.name][id] %= nb;
    }
    return obj["image" + RUR._ORDERED[obj.name][id]];
};

RUR._cycle_stay = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, displaying the last
    // image as a permanent one.
    if (RUR._CYCLE_STAY[obj.name] === undefined) {
        RUR._CYCLE_STAY[obj.name] = {};
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_STAY[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else {
        RUR._CYCLE_STAY[obj.name][id] += 1;
        RUR._CYCLE_STAY[obj.name][id] = Math.min(nb-1, RUR._CYCLE_STAY[obj.name][id]);
    }
    return obj["image" + RUR._CYCLE_STAY[obj.name][id]];
};

RUR._cycle_remove = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, and, after displaying the last
    // image, returns a "flag" instructing the calling function
    // to remove the object
    if (RUR._CYCLE_REMOVE[obj.name] === undefined) {
        RUR._CYCLE_REMOVE[obj.name] = {};
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_REMOVE[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else {
        RUR._CYCLE_REMOVE[obj.name][id] += 1;
    }
    if (RUR._CYCLE_REMOVE[obj.name][id] >= nb) {
        return RUR.END_CYCLE;
    }
    return obj["image" + RUR._CYCLE_REMOVE[obj.name][id]];
};

RUR._sync = function (obj, nb, id) {
    // every animated image of this type is kept in sync
    if (RUR._SYNC[obj.name] === undefined) {
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] = 1;
    } else if (RUR._SYNC[obj.name].indexOf(id) !== -1) {
        // see an same animated image present: we are starting a new sequence
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] += 1;
        RUR._SYNC_VALUE[obj.name] %= nb;
    }
    RUR._SYNC[obj.name].push(id);
    return obj["image" + RUR._SYNC_VALUE[obj.name]];
};

},{"./../rur.js":52}],67:[function(require,module,exports){
/*  This file contains generic methods called by more specialized methods
    used to create worlds. */

require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");

// private helper function that
// ensures that the position is within the world boundaries
function ensure_valid_position(args) {
    "use strict";
    var position;
    if (args.x === undefined) args.x = "?";
    if (args.y === undefined) args.y = "?";
    if (!RUR.is_valid_position(args.x, args.y)) {
        position = "(" + args.x + ", " + args.y + ")";
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position.").supplant({pos:position}));
    }
}

function ensure_common_required_args_present(args) {
    "use strict";
    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new Error("Object type must be specified.");
    }
    if (args.name === undefined) {
        throw new Error("Object name must be specified.");
    }
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new Error("Invalid name");
        }
    }
}

// for testing purpose
if (RUR.UnitTest === undefined) {
    RUR.UnitTest = {};
}
RUR.UnitTest.ensure_common_required_args_present = ensure_common_required_args_present;

/** @function set_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.
 * It should not be called directly**
 *
 *    This function sets a specified number of a named artefact of a
 *    specified type (e.g. object, goal object) at a given location.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer|string} args.number  The number of artefacts to be set; an error
 * will be thrown if it is missing. If it is zero, any artefact already present
 * will be removed. String arguments are accepted so that `"all"` for
 * "objects as goals" and `"min-max"` for range of objects can be set.
 *
 * @param {string} args.type  The type of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal that
 *                        must be set.
 *
 *
 * @param {string} [args.valid_names] A list containing the name of the
 *                        acceptable objects. If this argument is specified,
 *                        `args.name` must be found in that list, otherwise an
 *                        error will be thrown.
 *
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if `number` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 *
 */
RUR.set_nb_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    if (args.number === undefined) {
        throw new Error("Number of objects must be specified.");
    }

    coords = args.x + "," + args.y;
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }

    // While it may not be as efficient, the logic
    // is easier if we proceed as though we need to add
    // artefact, and then remove and cleanup if the number
    // of artefact is zero
    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
    base[args.type][coords][args.name] = args.number;
    if (args.number === 0) {
        delete base[args.type][coords][args.name];
        // remove any empty remaining JS object, up to world.
        if (Object.keys(base[args.type]).length === 0) {
            delete base[args.type];
            if (args.goal) {
                if (Object.keys(world.goal).length === 0){
                    delete world.goal;
                }
            }
        }
    }
};


/** @function add_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function adds a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location, potentially subject to some limitations.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 *
 * @param {string} [args.valid_names] A list containing the name of the
 *                        acceptable objects. If this argument is specified,
 *                        `args.name` must be found in that list, otherwise an
 *                        error will be thrown.
 *
 * @param {boolean} [args.single] Specifies if only one of a given kind of
 *                        artefact is permitted at a given location.
 *
 * @todo document number
 * @todo document range
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if `single` is "true" but more than one kind
 * of artefact is found at that location.
 *
 *
 */
RUR.add_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }
    coords = args.x + "," + args.y;

    // This should not happen if functions upstream always
    // use args.single consistently
    if (args.single && base[args.type] !== undefined &&
               base[args.type][coords] !== undefined &&
               base[args.type][coords].length > 1) {
        throw new Error("Cannot replace: more than one artefact present.");
    }

    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    if (args.range) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        base[args.type][coords][args.name] = args.range;
    } else if (args.number) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        if (base[args.type][coords][args.name] === undefined) {
            base[args.type][coords][args.name] = args.number;
        } else {
            base[args.type][coords][args.name] += args.number;
        }
    }

    else {
        RUR.utils.ensure_key_for_array_exists(base[args.type], coords);
        if (args.single) {
            base[args.type][coords] = [args.name];
        } else {
            base[args.type][coords].push(args.name);
        }
    }
};


/** @function get_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function returns the number of a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 * @param {array} [args.valid_names] A list containing the name of the
 *                        acceptable objects. If this argument is specified,
 *                        `args.name` must be found in that list, otherwise an
 *                        error will be thrown.
 *
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 *
 */
RUR.get_nb_artefact = function(args) {
    "use strict";
    var coords, container, world = RUR.get_current_world();

    ensure_common_required_args_present(args);

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return 0;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return 0;
    } else {
        container = world[args.type][coords];
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        if (Object.keys(container).indexOf(args.name) == -1) {
            return 0;
        } else {
            return container[args.name];
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        if (container.indexOf(args.name) == -1) {
            return 0;
        } else {
            return 1;
        }
    } else { // should never happen
        throw new Error("Unknown container type; need Object or Array");
    }
};

/** @function get_artefacts
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    **Important:** This is the only function named with artefacts in plural
 *    form as other deal with a single artefact at a time, whereas this one
 *    returns a container that can contain many artefacts.
 *
 *    This function returns a container (Javascript Object or Array) with the
 *    artefacts found at a location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        kind that we are interested about.
 *
 *
 * @returns      A container (Array or Object) with the artefacts found at that
 *              location, or `null` if no container is found at that location.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 *
 */
RUR.get_artefacts = function(args) {
    "use strict";
    var base, coords, container, world = RUR.get_current_world();

    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new Error("Object type must be specified.");
    }

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return null;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return null;
    } else {
        container = world[args.type][coords];
    }
    // return a copy so that we cannot accidently modify the original object.
    return JSON.parse(JSON.stringify(container));
};



/** @function remove_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function removes a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location. For artefacts that can have more than 1 instance
 *    at a given location, it can either remove a single instance or all
 *    of them.
 *
 *    If no artefact of that kind is left at that location, that location is
 *    pruned (removed). If nothing is left for that kind, it is removed.
 *    If nothing is left but an empty goal, the goal object is removed
 *    as well.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 * @param {string} [args.number] Used for objects that can be manipulated by
 * Reeborg (so that more than one can be found at a given location),
 * this will result in `number` named
 * artefact removed from that location; the default value of 1 does not
 * need to be specified.  If a larger number of artefact are requested to
 * be removed than are present, an error will be raised.
 *
 * @param {string} [args.all] If true, all instances of the named artefact
 *       will be removed; otherwise, their number will simply be reduced by 1..
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if no such artefact is found at that location.
 *
 * @todo  Need to implement `args.all`
 * @todo  Need to implement tests for  `args.all`
 * @todo Need to implement `args.number`
 * @todo Need to add full tests for `args.number`
 *
 */
RUR.remove_artefact = function (args) {
    "use strict";
    var base, container, coords, index, number, world = RUR.get_current_world();

    // Calling get_nb_artefact will do all the required validation of basic arguments
    if (RUR.get_nb_artefact(args) === 0) {
        throw new Error("No artefact to remove");
    }

    base = world;
    if (args.goal) {
        base = world.goal;
    }
    coords = args.x + "," + args.y;
    container = base[args.type][coords];
    if (args.number) {
        number = args.number;
    } else {
        number = 1;
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        container[args.name] -= number;
        if (container[args.name] === 0) {
            delete container[args.name];
        }
        if (Object.keys(container).length === 0) { // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        index = container.indexOf(args.name);
        container.splice(index, 1);
        if (container.length === 0){ // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else { // should never happen
        throw new Error("Unknown container type; need Object or Array");
    }

    // remove any empty remaining JS object, up to world.
    if (Object.keys(base[args.type]).length === 0) {
        delete base[args.type];
        if (args.goal) {
            if (Object.keys(world.goal).length === 0){
                delete world.goal;
            }
        }
    }
};

},{"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../translator.js":55,"./../utils/key_exist.js":62,"./../utils/supplant.js":64,"./../utils/validator.js":65}],68:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");


/** @function fill_background
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background for the entire world
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */

RUR.fill_background = function(name) {
    var recording_state = RUR._recording_(false);
    for (x = 1; x <= RUR.MAX_X; x++) {
        for (y = 1; y <= RUR.MAX_Y; y++) {
            RUR.add_background_tile(name, x, y);
        }
    }
    RUR._recording_(recording_state);
    RUR.record_frame("RUR.fill_background", name);
};



/** @function add_background_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 *
 * @example
 *
 * // Show how to set a color
 * World("Alone")
 * RUR.add_background_tile("blue", 1, 8)
 * RUR.add_background_tile("#00ff00", 3, 8)
 * RUR.add_background_tile("rgb(255, 0, 0)", 5, 8)
 * RUR.add_background_tile("rgba(255, 0, 0, 0.1)", 7, 8)
 * RUR.add_background_tile("hsl(24, 71%, 77%)", 9, 8)
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python
 * World("/worlds/examples/background1.json", "Background 1")
 *
 * @example
 * // Like Background 1 above, except that all the tiles
 * // are added in the Onload editor.  Click on World Info
 * // to see the code.
 * World("/worlds/examples/background2.json", "Background 2")
 *
 */
RUR.add_background_tile = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"tiles", single:true};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_background_tile", args);
};


/** @function remove_background_tile
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_background_tile = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"tiles", name:name};
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_background_tile", args);
};


/** @function get_background_tile
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 * @returns {string} The name of the tile found at that location or `null/None`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_background_tile = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"tiles"};
    tiles = RUR.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles[0];
    }
};


/** @function is_background_tile
 * @memberof RUR
 * @instance
 *
 * @todo finish writing documentation
 * @todo check all other is_XXX for documentation
 *
 * @example {@lang python}
 * no_highlight()
 * World("worlds/examples/simple_path.json", "simple_path")
 * x, y = position_in_front()
 *     if RUR.is_background_tile("gravel", x, y):
 *         move()
 *     else:
 *         turn_left()
 */


RUR.is_background_tile = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"tiles"};
    tile = RUR.get_background_tile(x, y);
    if (tile === null) {
        return false;
    } else if (tile == name){
        return true;
    } else {
        return false;
    }
};



},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],69:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_bridge
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as a bridge at that location.
 *          If a bridge was already located there, it will be replaced by
 *          this new bridge.
 *
 * @param {string} name The name of a tile. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.add_bridge = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"bridge", single:true};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.set_bridge", args);
};

/** @function remove_bridge
 * @memberof RUR
 * @instance
 * @summary This function removes a bridge at a location.
 *
 * @param {string} name
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named bridge to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_bridge = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"bridge", name:name};
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No bridge to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_bridge", args);
};


/** @function get_bridge
 * @memberof RUR
 * @instance
 * @summary This function gets the name of the bridge name found at given location.
 *    If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_bridge = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"bridge"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return tile[0];
    }
};

/** @function is_bridge
 * @memberof RUR
 * @instance
 * @summary This function indicates if a named bridge is present at a given location
 *
 * @param {string} name The name of the bridge
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */


RUR.is_bridge = function (name, x, y) {
    if (RUR.get_bridge(x, y) == name) {
        return true;
    } else {
        return false;
    }
};


/** @function get_bridge_protections
 * @memberof RUR
 * @instance
 * @summary This function gets the bridge name found at given location.
 *    If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns {Array} An array of strings, each string being a protection
 *                 against a specific type of artefact; this could be
 *                 an empty array.
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_bridge_protections = function (x, y) {
    "use strict";
    var tile;
    tile = RUR.get_bridge(x, y);
    if (tile === null) {
        return [];
    } else if (RUR.THINGS[tile].protections !== undefined) {
        return RUR.THINGS[tile].protections;
    } else {
        return [];
    }
};

},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],70:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./obstacles.js");
require("./background_tile.js");

function conditions_satisfied (conditions, x, y) {
    "use strict";
    var c, cond, fn, name;
    if (Object.prototype.toString.call(conditions) != "[object Array]" ||
        conditions.length === 0) {
        console.log(conditions);
        throw new ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
    try {
        for (c=0; c < conditions.length; c++) {
            cond = conditions[c];
            fn = cond[0];
            name = cond[1];
            if (!fn(name, x, y)) {
                return false;
            }
        }
    return true;
} catch (e) {
    console.log(e);
    throw new ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
}

function do_transformations (actions, x, y) {
    "use strict";
    var a, act, fn, name;
    if (Object.prototype.toString.call(actions) != "[object Array]" ||
        actions.length === 0) {
        console.log(actions);
        throw new ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
    try {
        for (a=0; a < actions.length; a++) {
            act = actions[a];
            fn = act[0];
            name = act[1];
            fn(name, x, y);
        }
    } catch (e) {
        console.log(e);
        throw new ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
}


RUR.transform_tile = function (name, x, y) {
    "use strict";
    var t, transf, transformations, recording_state;
    if (RUR.THINGS[name].transform === undefined) {
        return false;
    }
    transformations = RUR.THINGS[name].transform;
    for (t=0; t < transformations.length; t++) {
        transf = transformations[t];
        if (conditions_satisfied(transf.conditions, x, y)) {

            recording_state = RUR.state.do_not_record;
            RUR.state.do_not_record = true;

            do_transformations(transf.actions, x, y);

            RUR.state.do_not_record = recording_state;
            return;
        }
    }
};

},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67,"./background_tile.js":68,"./obstacles.js":74}],71:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_decorative_object = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"decorative_objects"};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_decorative_object", args);
};


/** @function remove_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"decorative_objects", name:name};
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_decorative_object", args);
};


/** @function get_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_decorative_object = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"decorative_objects"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return RUR.THINGS[tile[0]];
    }
};

RUR.is_decorative_object = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"decorative_objects"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return false;
    } else if (tile[0] == name){
        return true;
    } else {
        return false;
    }
};


},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],72:[function(require,module,exports){
require("./../rur.js");
require("./background_tile.js");
require("./bridges.js");
require("./obstacles.js");

/** @function get_protections
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @param {object} robot Determine if robot or robot body.
 *
 * @returns an array of protections
 */
RUR.get_protections = function (robot) {
    "use strict";
    var objects_carried, obj_type, protections;

    objects_carried = RUR.control.carries_object(robot);
    if (!objects_carried || !Object.keys(objects_carried)) {
        return [];
    }

    protections = [];
    for(obj_type of Object.keys(objects_carried)){
        obj_type = RUR.translate_to_english(obj_type);
        if (RUR.THINGS[obj_type] !== undefined && RUR.THINGS[obj_type].protections !== undefined) {
            protections = protections.concat(RUR.THINGS[obj_type].protections);
        }
    }

    return protections;
};

/** @function is_fatal_position
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_fatal_position = function (x, y, robot){
    "use strict";
    // protections is from objects carried by the robot
    var protections, tile, tiles;

    protections = RUR.get_protections(robot);
    /* Both obstacles and background tiles can be fatal;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    // tile is a name; it could be a colour, which is never fatal.
    if (tile && RUR.THINGS[tile] !== undefined) {
        tiles.push(tile);
    }

    // both existing bridges and objects carried can offer protection
    // against some types of otherwise fatal obstacles

    protections = protections.concat(RUR.get_bridge_protections(x, y));
    for (tile of tiles) {
        if (RUR.get_property(tile, "fatal")) {
            if (protections.indexOf(RUR.THINGS[tile].fatal) === -1) {
                if (RUR.THINGS[tile].message) {
                    return RUR.THINGS[tile].message;
                } else {
                    return "Fatal tile needs message defined";
                }
            }
        }
    }
    return false;
};


/** @function is_detectable
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_detectable = function (x, y){
    "use strict";
    var detectable, tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    if (tile && RUR.THINGS[tile] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        if (RUR.get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};

/** @function is_fatal_thing
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_fatal_thing = function (name){
    name = RUR.translate_to_english(name);
    if (RUR.get_property(name, 'fatal')) {
        return true;
    }
    return false;
}
},{"./../rur.js":52,"./background_tile.js":68,"./bridges.js":69,"./obstacles.js":74}],73:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_object
 * @memberof RUR
 * @instance
 * @summary This function adds one or more of a given object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position of the object.
 * @param {integer} y  Position of the object.
 * @param {object} options  Need to include: `goal`, `number`, `replace`,
 * `min`, `max`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @example
 * // shows how to set various objects;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/object1.json", "Example 1")
 *
 */
RUR.add_object = function (name, x, y, options) {
    "use strict";
    var k, keys, args = {name: name, x:x, y:y, type:"objects"};
    if (options === undefined) {
        args.number = 1;
    } else {
        if (options.goal && options.goal == "all") {
            options.number = "all";
        } else if (options.min !== undefined) {
            if (options.max !== undefined && options.max > options.min) {
                options.number = options.min + "-" + options.max;
            } else {
                options.number = options.min;
            }
        } else if (options.number === undefined) {
            options.number = 1
        }
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    if (args.replace) {
        RUR.set_nb_artefact(args);
    } else {
        RUR.add_artefact(args);
    }
    RUR.record_frame("RUR.add_object", args);
};


/** @function remove_object
 * @memberof RUR
 * @instance
 * @summary This function removes an object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position of the object.
 * @param {integer} y  Position of the object.
 * @param {object} options  Need to include: `goal`, `number`, `all`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background object to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_object = function (name, x, y, options) {
    "use strict";
    var args, k, keys, world = RUR.get_current_world();
    args= {x:x, y:y, type:"objects", name:name};
    if (options !== undefined) {
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No object to remove here.");
        } else {
            throw e;
        }
    }
    // For historical reason, worlds are always created with an "objects" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "objects");
    RUR.record_frame("RUR.remove_object", args);
};


/** @function get_objects
 * @memberof RUR
 * @instance
 * @summary This function returns a Javascript Object/Python dict containing
 * the names of the objects found at that location.
 * If nothing is found at that location,
 * `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position on the grid.
 * @param {integer} y  Position on the grid.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @todo make sure it returns the correct info
 *
 */

RUR.get_objects = function (x, y) {
    "use strict";
    return RUR.get_artefacts({x:x, y:y, type:"objects"});
};

RUR.is_object = function (name, x, y, options) {
    "use strict";
    var nb, args = {x:x, y:y, name:name, type:"objects"};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    nb = RUR.get_nb_artefact(args);
    if (nb === 0) {
        return false;
    } else {
        return true;
    }
};


/** @function add_object_at_position
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR#add_object} instead.
 */
RUR.add_object_at_position = function(name, x, y, number) { // Vincent Maille's book
    RUR.add_object(name, x, y, {number:number});
}


/** @function add_goal_object_at_position
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR#add_object} instead.
 */
},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],74:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_obstacle
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a the tile representing the obstacle.
 *
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @todo Make sure we cover the case of two or more obstacles at a given location
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"obstacles", valid_names:Object.keys(RUR.THINGS)};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_obstacle", args);
};


/** @function remove_obstacle
 * @memberof RUR
 * @instance
 * @summary This function removes an obstacle at a location.
 *
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args, obstacles;
    obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        throw new ReeborgError("No obstacles to remove here.");
    }
    args= {x:x, y:y, type:"obstacles", name:name, valid_names:Object.keys(RUR.THINGS)};
    RUR.remove_artefact(args);
    RUR.record_frame("RUR.remove_obstacle", args);
};


/** @function get_obstacles
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @todo deal properly with cases of two or more obstacles
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_obstacles = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"obstacles"};
    tiles = RUR.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles;
    }
};

// TODO: this may not be needed after more general functions written
// i.e. instead of looking for specific obstacle, look for
// obstacle with properties.
RUR.is_obstacle = function (name, x, y) {
    "use strict";
    var args={name:name, x:x, y:y, type:"obstacles"};
    if (RUR.get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
};

// TODO: include get_obstacle which would return all
// obstacles at a given location ... although is_obstacle_safe
// may cover this case appropriately.

RUR.get_solid_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].solid) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

RUR.get_fatal_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].fatal) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

RUR.get_fatal_detectable_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].fatal && RUR.THINGS[obs].detectable) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

// TODO: modify this to take into account bridges.
// safe obstacles only protect from fatal background tiles,
// but not from fatal obstacles
RUR.is_obstacle_safe = function (x, y) {
    "use strict";
    var obs, safe_found = false, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) { //TODO: change to make sure that all obstacles are included
        if (RUR.THINGS[obs].fatal) {
            return false;
        }
        if (RUR.THINGS[obs].safe) {
            safe_found = true;
        }
    }
    return safe_found;
};
},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],75:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");


/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function adds a named pushable at a location.
 *
 * @param {string} name The name of a the tile representing the pushable.
 *
 * @param {string} name Name.
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is another pushable already at that location.
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @todo **Important** Add goal for pushables
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_pushable = function (name, x, y) {
    "use strict";
    var pushable, args = {name: name, x:x, y:y, type:"pushables", valid_names:Object.keys(RUR.THINGS)};
    pushable = RUR.get_pushable(x, y);
    if (pushable !== null) {
        throw new ReeborgError("There can be at most one pushable object at a given location.");
    }
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_pushable", args);
};


/** @function remove_pushable
 * @memberof RUR
 * @instance
 * @summary This function removes a pushable at a location.
 *
 * **Assumption**: only one pushable allowed at a given location.
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no pushable
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 *
 *
 */
RUR.remove_pushable = function (name, x, y) {
    "use strict";
    var args, pushable;
    pushable = RUR.get_pushable(x, y);
    if (pushable === null) {
        throw new ReeborgError("No pushable to remove here.");
    }
    args= {x:x, y:y, type:"pushables", name:name, valid_names:Object.keys(RUR.THINGS)};
    RUR.remove_artefact(args);
    RUR.record_frame("RUR.remove_pushable", args);
};


/** @function get_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          For worlds designed "normally", such a list should contain only
 *          one item since pushables cannot be pushed onto other pushables.
 *          If nothing is found at that location,`null` is returned
 *          (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 * @returns {string} The name of the pushable at that location, or `null`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_pushable = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"pushables"};
    tiles = RUR.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles[0];
    }
};
/** @function is_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          For worlds designed "normally", such a list should contain only
 *          one item since pushables cannot be pushed onto other pushables.
 *          If nothing is found at that location,`null` is returned
 *          (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 * @returns {string} The name of the pushable at that location, or `null`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.is_pushable = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"pushables"};
    tile = RUR.get_artefacts(args);
    return tile == name;
};


RUR.push_pushable = function (name, from_x, from_y, to_x, to_y) {
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    RUR.remove_pushable(name, from_x, from_y);
    RUR.add_pushable(name, to_x, to_y);
    RUR.state.do_not_record = recording_state;
};
},{"./../recorder/record_frame.js":46,"./../rur.js":52,"./../utils/key_exist.js":62,"./../utils/validator.js":65,"./artefact.js":67}],76:[function(require,module,exports){
require("./../rur.js");


/** @function is_robot
 * @memberof RUR
 * @instance
 * @summary This function indicates if at least one robot is found at
 *   the specified location, false otherwise. No error checking
 *   is performed on the arguments.  If some exception is raised,
 *   it is simply logged in the browser's console.
 *
 * @param {integer} x  Position
 * @param {integer} y  Position
 *
 * @returns {bool} True if a robot is found at that position, false otherwise.
 *
 **/

 RUR.is_robot = function (x, y) {
    "use strict";
    var r, robot, world=RUR.get_current_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return false;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot = world.robots[r];
            if (robot.x == x && robot.y == y){
                return true;
            }
        }
    } catch(e) {
        console.warn("error in RUR.is_robot ", e);
    }
    return false;
 };

 /** @function get_robot_body_by_id
 *
 * @memberof RUR
 * @instance
 * @summary This function indicates returns a robot "body" specified by
 * its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.  If some exception is raised,
 * it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible. (If you want, you can convert the result
 * to a Python dict() -- provided it is not None, of course.)
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} the body of the robot as a Javascript object, `null` if
 *         a robot with this id cannot be found.
 *
 **/

RUR.get_robot_body_by_id = function (id) {
    "use strict";
    var r, robot_body, world=RUR.get_current_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return null;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot_body = world.robots[r];
            if (robot_body.__id == id){
                return robot_body;
            }
        }
    } catch(e) {
        console.warn("error in RUR.get_robot_body_by_id ", e);
    }
    return null;
 };

 /** @function get_robot_by_id
 *
 * @memberof RUR
 * @instance
 * @summary This function indicates returns a Javascript UsedRobot instance
 * specified by its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.
 * If some exception is raised, it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible.
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} A Javascript UsedRobot instance corresponding to the
 * robot with the specified id, or `null` if a robot with this id cannot be found.
 *
 **/

RUR.get_robot_by_id = function (id) {
    "use strict";
    var body, robot;
    body = RUR.get_robot_body_by_id(id);
    if (body === null) {
        return null;
    } else {
        robot = Object.create(RUR.UsedRobot.prototype);
        robot.body = body;
        return robot;
    }
 };

 /** @function get_robot_position
 *
 * @memberof RUR
 * @instance
 * @summary This function returns the location of a robot.
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function,
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value, orientation:orientation_value} where
 *      `x_value` and `y_value` are integers and
 *      `orientation_value` is one of `"east"`, `"west"`, `"north"`, `"south"`.
 *
 **/

RUR.get_robot_position = function (robot_body) {
    "use strict";
    var x, y, orientation;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined ||
        robot_body._orientation === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location().");
    }

    switch (robot_body._orientation){
    case RUR.EAST:
        orientation = "east";
        break;
    case RUR.NORTH:
        orientation = "north";
        break;
    case RUR.WEST:
        orientation = "west";
        break;
    case RUR.SOUTH:
        orientation = "south";
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_location().");
    }
    return {x:robot_body.x, y:robot_body.y, orientation:orientation};
};


 /** @function get_position_in_front
 *
 * @memberof RUR
 * @instance
 * @summary This function returns the location of a robot.
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value} where `x_value` and `y_value` are integers.
 *
 * @example {@lang python}
 * no_highlight()
 * World("worlds/examples/simple_path.json", "simple_path")
 * reeborg = default_robot()
 * while not at_goal():
 *     pos = RUR.get_position_in_front(reeborg.body)
 *     x, y = pos["x"], pos["y"]
 *     if RUR.is_background_tile("gravel", x, y):
 *         move()
 *     else:
 *         turn_left()
 *
 **/

RUR.get_position_in_front = function (robot_body) {
    "use strict";
    var x, y;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location_in_front().");
    }
    switch (robot_body._orientation){
    case RUR.EAST:
        x = robot_body.x + 1;
        y = robot_body.y;
        break;
    case RUR.NORTH:
        y = robot_body.y + 1;
        x = robot_body.x;
        break;
    case RUR.WEST:
        x = robot_body.x - 1;
        y = robot_body.y;
        break;
    case RUR.SOUTH:
        y = robot_body.y - 1;
        x = robot_body.x;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_position_in_front().");
    }
    return {x:x, y:y};
};

 /** @function add_final_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds a final position as a goal for the default robot.
 * It is possible to call this function multiple times, with different
 * `x, y` positions; doing so will result in a final position chosen
 * randomly (among the choices recorded) each time a program is run.
 *
 * @param {string} name The name of the object/image we wish to use to
 *  represent the final position of the robot. Only one
 *  image can be used for a given world, even if many possible
 *  choices exist for the final position: each time this
 *  function is called, the `name` argument replaces any
 *  such argument that was previously recorded.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is already included
 **/


RUR.add_final_position = function (name, x, y) {
    "use strict";
    var goal, pos, world=RUR.get_current_world();

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;
    RUR.utils.ensure_key_for_obj_exists(goal, "position");
    RUR.utils.ensure_key_for_array_exists(goal, "possible_final_positions");

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==x && pos[1]==y){
            throw new ReeborgError("This final position is already included!");
        }
    }

    goal.position.x = x;
    goal.position.y = y;
    goal.position.image = name;
    goal.possible_final_positions.push([x, y]);
    RUR.record_frame("add_final_position", {name:name, x:x, y:y});
};

 /** @function add_initial_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds an initial (starting) position as a possibility
 * for the default robot. It is possible to call this function multiple times,
 * with different `x, y` positions; doing so will result in a initial position
 * chosen randomly (among the choices recorded) each time a program is run.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is already included
 **/

RUR.add_initial_position = function (x, y) {
    "use strict";
    var robot, pos, world=RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new ReeborgError("This world has no robot; cannot set initial position.");
    }

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
    }

    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            throw new ReeborgError("This initial position is already included!");
        }
    }

    robot.possible_initial_positions.push([x, y]);
    RUR.record_frame("add_initial_position", {x:x, y:y});
};
},{"./../rur.js":52}],77:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");

/** @function add_new_thing
 * @memberof RUR
 * @instance
 * @summary This method makes it possible to add new "things", represented
 * by an image.
 *
 * If the name of an existing thing is specified with different properties,
 * it is replaced by the new one.
 *
 * **Important** Other than for testing purposes, This method should
 * only be called from the "Onload" editor so that it can start fetching
 * the required images as soon as possible, and try to ensure that the
 * images will be ready to be shown when a program is executed.
 *
 * @param {Object} thing A Javascript object (similar to a Python dict) that
 * describes the properties of the "thing".
 *
 * @param {string} thing.name  The name to be given to the "thing"; an exception
 * will be raisd if it is missing.
 *
 * @param {string} [thing.info] Some information to be displayed about this "thing"
 * when a user clicks on "World Info" and then on this thing on the world canvas.
 * It is highly recommended to include this.
 *
 * @param {string} [thing.color] A string representing a valid html color
 * (named, rgb, rgba, hsl or #-notation).
 * **Either `thing.color`, thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.url] If a single image is used, this indicated the source.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {strings[]} [thing.images] If multiple images are used
 * (for animated "things"), this array (list) contains the various URLs.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.selection_method]  For animated "things"; choose one of
 *
 *  * `"sync"`,
 *  * `"ordered"`,
 *  * `"random"`,
 *  * `"cycle stay"` or
 *  * `"cycle remove"`.
 *
 *  If the selection method is not recognized, `"random"` will
 *  be used, and no error will be thrown.
 *
 * @param {object} [thing.goal]  If the "things" can be used for an object that can be
 * picked up or put down by Reeborg, includes `thing.goal` to describe the image(s),
 * following the same pattern as above (`thing.goal.url`, `thing.goal.images`,
 * `thing.goal.selection_method`), except that `goal` is ignored if `color` is true.
 *
 * @param {string} [thing.fatal] Program ends if Reeborg steps on such a "thing" with
 * a value that is equivalent to "true" when used as background things or obstacles,
 * unless a bridge offering the adequate protection is present or an object
 * carried by Reeborg has the right protection defined.
 * This value is usually set to the name of the "things" so as to facilitate
 * defining objects or bridges which offer the right protection.
 * For `fatal` things, `message` should be defined as well.
 *
 * @param {string} [thing.message] The message shown when Reeborg steps on
 * a `fatal` tile.
 *
 * @param {string} [thing.detectable] If `thing.fatal` and  `thing.detectable` are
 * both equivalent to "true", Reeborg can detect this "thing" with
 * `front_is_clear()` and `right_is_clear()` if it is set as an obstacle
 * or a background thing.
 *
 * @param {strings[]} [thing.protections] Indicates against which `fatal` thing this
 * offer protection.  Protection is given when things are used as a bridge or
 * when they are carried.
 *
 * @param {boolean} [thing.solid] If sets to `True`, prevents a pushable object
 * from sliding onto this "things" when used as a background thing or as an
 * obstacle.
 *
 * @param {integer} [thing.x_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `x_offset` result in the "things" drawn off grid, by a
 * number of pixel equal to `x_offset`. This is only valid for images - not for
 * colors.
 *
 * @param {integer} [thing.y_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `y_offset` result in the "thing" drawn off grid, by a
 * number of pixel equal to `y_offset`. This is only valid for images - not for
 * colors.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if no image is supplied (either via the `url`
 *         or the `images` attribute) and `color` does not evaluate to true.
 *
 * @see Unit tests are found in {@link UnitTest#test_add_new_thing}
 * @example
 * // This first example shows how to set various "things";
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/thing1.json", "Example 1")
 *
 * // A second example shows how one can change "things" behaviour.
 * World("/worlds/examples/thing2.json", "Example 2")
 */

RUR.add_new_thing = function (thing) {
    "use strict";
    var i, key, keys, name, original_arg;
    name = thing.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_thing(thing): thing.name attribute missing.");
    }

    // avoid modifying the original object
    original_arg = JSON.stringify(thing);  // for comparison below
    thing = JSON.parse(original_arg);  // clone of original

    if (RUR.KNOWN_THINGS.indexOf(name) != -1) {
        if (original_arg == RUR.THINGS[name].original_arg) {
            // use concatenation in log and warn, for comparison with unit tests.
            if (RUR.UnitTest !== undefined && RUR.UnitTest.logtest !== undefined){
                console.log(name + " is already known; no need to recreate.");
            }
            return;
        }
        console.warn("Warning: redefining " + name);
    } else {
        RUR.KNOWN_THINGS.push(name);
    }

    thing.original_arg = original_arg;
    RUR.THINGS[name] = thing;
    if (thing.color) {
        return;
    }
    create_images(thing);
    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (thing.goal) {
        create_images(thing.goal);
    }
};

function create_images(obj) {
    if (obj.url) {
        obj.image = new Image();
        obj.image.src = obj.url;
        obj.image.onload = RUR.onload_new_image;
    } else if (obj.images) {
        RUR.animate_images(obj);
    } else {
        throw new RUR.ReeborgError("Fatal error: need either thing.url or a list [thing.images]");
    }
}

/** @function show_all_things
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known "things" in a table, with the exception
 * of those defined with the `color` attribute. If a language
 * other than English is selected, the translated name appears as well; this
 * can be helpful to identify missing translations.
 * If multiple images are shown, it means that the "thing" is shown as an
 * animation in a world.
 * Missing images in the **goal** column indicate that this "thing" cannot
 * be used as an object to be picked up by Reeborg.
 *
 * @param {string} [property] If this argument is provided, only "things" for
 * which this property/attribute is defined will be shown,
 * and the value of the attribute will be shown as well.
 *
 * @example
 * RUR.show_all_things()
 * RUR.show_all_things("fatal")
 */
RUR.show_all_things = function (property) {
    var i, j, info, images, name, url, begin, end, prop_str;
    if (property !== undefined) {
        info = "<h3>Things with property <code>" + property + "</code></h3>";
        prop_str = "<th>" + property + "</th>";
    } else {
        info = '';
        prop_str = '';
    }
    begin = "<table border='1'><tr><th>name</th>";
    end = "<th>image(s)</th><th>goal?</th></tr>";
    if (RUR.state.human_language != 'en') {
            info += begin + "<th>translation</th>" + prop_str + end;
        } else {
            info += begin + prop_str + end;
        }
    for (i=0; i< RUR.KNOWN_THINGS.length; i++) {
        name = RUR.KNOWN_THINGS[i];
        if (property !== undefined) {
            if (RUR.THINGS[name][property] === undefined) {
                continue;
            }
        }
        if (RUR.THINGS[name].color) {
            continue;
        }
        url = RUR.THINGS[name].url;
        images = RUR.THINGS[name].images;
        info += "<tr><td>" +  name + "</td><td>";
        if (RUR.state.human_language != 'en') {
            info += RUR.translate(name) + "</td><td>";
        }
        if (property !== undefined) {
            info +=  RUR.THINGS[name][property] + "</td><td>";
        }
        if (url !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].url + "'></td><td>";
        } else if (images !== undefined) {
            for(j=0; j<images.length; j++) {
                info += "<img src = '" + images[j] + "'> - ";
            }
            info += "</td><td>";
        } else {
            info += "Missing image</td><td>";
        }
        if (RUR.THINGS[name].goal !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].goal.url + "'>";
        }
        info += "</td></tr>";
    }
    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};

/** @function has_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns "true" if a "thing" has the stated property,
 * and "false" otherwise
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property
 *
 * @example {@lang python}
 * # Python example
 * print(RUR.has_property("water", "fatal"))
 *
 * @example
 * // Javascript example
 * write(RUR.has_property("water", "fatal"))
 */
RUR.has_property = function (name, property) {
    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    if (RUR.THINGS[name][property] === undefined) {
        return false;
    } else {
        return true;
    }
};

/** @function get_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns the value of a given property for a "thing".
 * **Important:** the value shown will be the English default even if a
 * translation exists and might appear in other contexts, like the
 * "World Info".
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property
 *
 * @example {@lang python}
 * print(RUR.get_property("water", "info"))  # Python
 *
 * @example {@lang javascript}
 * write(RUR.get_property("water", "fatal"))  // Javascript
 */
RUR.get_property = function (name, property) {
    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    return RUR.THINGS[name][property];
};


/*=============================
/
/   Deprecated methods below
/
/===========================*/

/** @function add_new_object_type
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_thing} instead.
 */
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};
/** @function add_object_image
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_thing} instead.
 */
RUR.add_object_image = RUR.add_new_object_type; // Vincent Maille's book.

},{"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../translator.js":55,"./animated_images.js":66}],78:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/*=========================================
Walls data structure

Worlds are defined such that walls are listed only to the East or to the
North of a given position. However, this is an implementation detail
which could be changed without affecting what information is
given to the user.

Also, worlds are defined so that they are rectangular with walls on
all sides. However, these walls are not included in the data structure
that lists the walls, and must be handled separately.
*/

/** @function get_walls
 * @memberof RUR
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world. The order they are listed,
 * if present, are `"east"`, `"north"`, `"west"`, `"south"`.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, list the goal walls found at that position
 *                      instead of regular walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 *
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 *
 * World("worlds/examples/walls.json", "Wall example")
 *
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.get_walls = function(x, y, goal) {
    // var world = RUR.get_current_world();
    var args = {x:x, y:y, goal:goal, type:"walls"}, walls;

    walls = RUR.get_artefacts(args); // gets "east" and "north" if present
    if (walls === null) {
        walls = [];
    }
    if (RUR.is_wall("west", x, y, goal)) {
        walls.push("west");
    }
    if (RUR.is_wall("south", x, y, goal)) {
        walls.push("south");
    }
    return walls;
};


/** @function is_wall
 * @memberof RUR
 * @instance
 * @summary This function returns `true` if a wall is found at the
 * stated position and orientation, and `false` otherwise.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls
 *                      instead of regular walls.
 *
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 *
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 *
 * World("worlds/examples/walls.json", "Wall example")
 *
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.is_wall = function(orientation, x, y, goal) {
    var args;
    if (["east", "north", "west", "south"].indexOf(orientation) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    if (is_boundary_wall(orientation, x, y)) {
        return true;
    }
    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    if (RUR.get_nb_artefact(args) === 0) {
        return false;
    } else {
        return true;
    }
};

// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function is_boundary_wall(orientation, x, y) {
    if ( (orientation == "east"  && x === RUR.MAX_X) ||
         (orientation == "north" && y === RUR.MAX_Y) ||
         (orientation == "west"  && x === 1) ||
         (orientation == "south" && y === 1) ) {
        return true;
    }
    return false;
}


/** @function add_wall
 * @memberof RUR
 * @instance
 * @summary This function adds a wall at the stated
 * stated position and orientation if there is none already located there;
 * otherwise, it raises an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is already a wall there.
 *
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 *
 * World("worlds/examples/walls.json", "Wall example")
 *
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.add_wall = function(orientation, x, y, goal) {
    "use strict";
    var args;

    if (RUR.is_wall(orientation, x, y, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
    }
    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    RUR.add_artefact(args);
    RUR.record_frame("add_wall", args);
};

/** @function remove_wall
 * @memberof RUR
 * @instance
 * @summary This function removes a wall at the stated
 * stated position and orientation if there there is one already located there;
 * otherwise, it raises an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is no wall to remove.
 *
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 *
 * World("worlds/examples/walls.json", "Wall example")
 *
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.remove_wall = function(orientation, x, y, goal) {
    var args, world=RUR.get_current_world();
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, goal);
    if (!RUR.is_wall(orientation, x, y, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }

    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    RUR.remove_artefact(args);
    // For historical reason, worlds are always created with a "walls" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "walls");
    RUR.record_frame("remove_wall", args);
};

function convert_position (orientation, x, y) {
    var _x, _y, _orientation;
    switch (orientation){
    case "east":
        _orientation = "east";
        _x = x;
        _y = y;
        break;
    case "north":
        _orientation = "north";
        _x = x;
        _y = y;
        break;
    case "west":
        _orientation = "east";
        _x = x-1;
        _y = y;
        break;
    case "south":
        _orientation = "north";
        _x = x;
        _y = y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall().");
    }
    return {name:_orientation, x:_x, y:_y};
}

},{"./../programming_api/exceptions.js":42,"./../recorder/record_frame.js":46,"./../rur.js":52,"./../translator.js":55,"./../utils/key_exist.js":62,"./../utils/supplant.js":64,"./../utils/validator.js":65,"./artefact.js":67}],79:[function(require,module,exports){
/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../default_tiles/tiles.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../utils/supplant.js");
require("./../world_api/things.js");

RUR.world_get = {};

RUR.world_get.tile_at_position = function (x, y) { // TODO: still needed or move elswhere?
    "use strict";
    var coords = x + "," + y;
    if (RUR.get_current_world().tiles === undefined) return false;
    if (RUR.get_current_world().tiles[coords] === undefined) return false;
    return RUR.THINGS[RUR.get_current_world().tiles[coords]];
};


RUR.world_get.object_at_robot_position = function (robot, obj) { // TODO: still needed or move elswhere?
    return object_of_type_here(robot, obj, RUR.get_current_world().objects);
};


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.get_current_world().objects or RUR.get_current_world().decorative_objects
    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (object_type === undefined ||
        object_type[coords] === undefined) {
        return [];
    }

    obj_here =  object_type[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
}

RUR.world_get.world_map = function () {
    return JSON.stringify(RUR.get_current_world(), null, 2);
};

RUR.world_get.world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in zz_dr_onclick.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;
    var description, insertion, to_replace;


    information = "<div class='automatic-description'>";

    if (RUR.get_current_world().description) {
        description = RUR.get_current_world().description;
        if (RUR.get_current_world().pre) { // can be either javascript or python code
            insertion = "<pre class='world_info_source'>" + RUR.get_current_world().pre + "</pre>";
            to_replace = "INSERT_PRE";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().post) { // can be either javascript or python code
            insertion = "<pre class='world_info_source'>" + RUR.get_current_world().post + "</pre>";
            to_replace = "INSERT_POST";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().onload) { // only javascript, hence different class
            insertion = "<pre class='world_info_onload'>" + RUR.get_current_world().onload + "</pre>";
            to_replace = "INSERT_ONLOAD";
            description = description.replace(to_replace, insertion);
        }
        information +="<h2>" + RUR.translate("Description") + "</h2>" + description + "</div>";
    }

    if (!no_grid) {
        position = RUR.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information += "<br>x,y = " + coords + "<br><br>";
        }
    }

    try {
        tile = RUR.world_get.tile_at_position(x, y);
    } catch (e) {
        tile = false;
    }
    topic = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            if (topic){
                topic = false;
                information += "<b>" + RUR.translate("Special information about this location:") + "</b>";
            }
            information += "<br>" + RUR.translate(tile.info);
        }
    }

    try {
        tiles = RUR.get_obstacles(x, y);
    } catch (e) {
        tiles = false;
    }
    if (tiles) {
        for (tilename of tiles) {
            tile = RUR.THINGS[tilename];
            if (RUR.translate(tile.info)){
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
                }
                if (tile.name == "fence") {
                    if (!fence_noted) {
                        fence_noted = true;
                        information += "<br>" + RUR.translate(tile.info);
                    }
                } else {
                    information +=  "<br>" + RUR.translate(tile.info);
                }
            }
        }
    }

    obj = RUR.get_current_world().objects;
    topic = true;
    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Objects found here:") + "</b>";
                }
                information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                information += " " + RUR.translate(RUR.get_property(obj_type, "info"));
            }
        }
    }

    goals = RUR.get_current_world().goal;
    if (goals !== undefined){
        obj = goals.objects;
        topic = true;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
                    }
                   information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                }
            }
        }
    }


    if (goals !== undefined){
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built east of this location.");
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built north of this location.");
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built west of this location.");
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built south of this location.");
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    robots = RUR.get_current_world().robots;
    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.possible_initial_positions !== undefined && robot.possible_initial_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }


    goals = RUR.get_current_world().goal;
    if (goals !== undefined &&
         (goals.possible_final_positions !== undefined || goals.position !== undefined)){
        if (topic){
            topic = false;
            information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
        }
        if (goals.possible_final_positions !== undefined && goals.possible_final_positions.length > 2) {
            information += "<br>" + RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += "<br>" + RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    $("#World-info").html(information);
    $('.world_info_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode:  RUR.state.programming_language,
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
    $('.world_info_onload').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode:  "javascript",
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};

RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:600, width:800}, RUR.world_get.world_info);
},{"./../default_tiles/tiles.js":1,"./../dialogs/create.js":3,"./../listeners/canvas.js":18,"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../utils/supplant.js":64,"./../world_api/things.js":77}],80:[function(require,module,exports){
require("./../rur.js");
require("./../recorder/record_frame.js");


RUR.add_robot = function (robot) {
    var world = RUR.get_current_world();
    if (world.robots === undefined){
        world.robots = [];
    }
    if (robot == undefined) {
        robot = RUR.robot.create_robot();
    }
    world.robots.push(robot);
    RUR.record_frame("RUR.add_robot", robot.__id);
};

},{"./../recorder/record_frame.js":46,"./../rur.js":52}],81:[function(require,module,exports){
require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/validator.js");

/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 * @desc Donne un nombre d'objet à transporter par le robot (robot.body).
 *    Si le robot n'est pas spécifié, le robot par défaut est utilisé.
 *
 * @param {string} obj The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 * @param {robot.body} [robot] - Optional argument
 *                    <br> _argument optionnel_
 */

RUR.give_object_to_robot = function (obj, nb, robot) {
    var _nb, world=RUR.get_current_world(), translated_arg=RUR.translate_to_english(obj);

    if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = world.robots[0];
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");

    _nb = RUR.utils.filterInt(nb);
    if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};

},{"./../programming_api/exceptions.js":42,"./../rur.js":52,"./../translator.js":55,"./../utils/key_exist.js":62,"./../utils/validator.js":65}],82:[function(require,module,exports){
require("./../rur.js");
require("./../world_utils/import_world.js");
require("./../drawing/visible_robot.js");
require("./../drawing/visible_world.js");

//TODO: See if all defaults could be incorporated here, e.g. robot images, etc.

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images();
    }
    RUR.MAX_STEPS = 1000;
    RUR.ANIMATION_TIME = 120;

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    if (RUR.state.run_button_clicked) { // do not process_onload
        return;
    }
    RUR.world_utils.process_onload();
};

reset_world();
},{"./../drawing/visible_robot.js":8,"./../drawing/visible_world.js":9,"./../rur.js":52,"./../world_utils/import_world.js":85}],83:[function(require,module,exports){
/* In some ways, this is the counterpart of world_get/world_get.js
*/
require("./../rur.js");
require("./../default_tiles/tiles.js");
require("./../programming_api/exceptions.js");
require("./../drawing/visible_world.js");
require("./../recorder/recorder.js"); // TODO: investigate if needed.
require("./../utils/key_exist.js");

var msg = require("./../../lang/msg.js");

RUR.world_set = {};

var set_dimension_form;


function trim_world (new_max_x, new_max_y, old_max_x, old_max_y) {
    var x, y, coords, world=RUR.get_current_world();
    // remove stuff from outside new boundaries

    for (x = new_max_x+1; x <= old_max_x; x++) {
        for (y = 1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= old_max_x; x++) {
        for (y = new_max_y+1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (world.possible_initial_positions !== undefined) {
        delete world.possible_initial_positions;
    }
    if (world.goal !== undefined) {
        if (world.goal.possible_final_positions !== undefined) {
            delete world.goal.possible_final_positions;
        }
    }
}

function remove_all_at_location (coords) {
    var world = RUR.get_current_world();
    // trading efficiency for clarity
    if (world.tiles !== undefined) {
        if (world.tiles[coords] !== undefined){
            delete world.tiles[coords];
        }
    }
    if (world.bridge !== undefined) {
        if (world.bridge[coords] !== undefined){
            delete world.bridge[coords];
        }
    }
    if (world.decorative_objects !== undefined) {
        if (world.decorative_objects[coords] !== undefined){
            delete world.decorative_objects[coords];
        }
    }
    if (world.obstacles !== undefined) {
        if (world.obstacles[coords] !== undefined){
            delete world.obstacles[coords];
        }
    }
    if (world.pushables !== undefined) {
        if (world.pushables[coords] !== undefined){
            delete world.pushables[coords];
        }
    }
    if (world.walls !== undefined) {
        if (world.walls[coords] !== undefined){
            delete world.walls[coords];
        }
    }
    if (world.objects !== undefined) {
        if (world.objects[coords] !== undefined){
            delete world.objects[coords];
        }
    }
    if (world.goal !== undefined) {
        if (world.goal.walls !== undefined) {
            if (world.goal.walls[coords] !== undefined){
                delete world.goal.walls[coords];
            }
        }
        if (world.goal.objects !== undefined) {
            if (world.goal.objects[coords] !== undefined){
                delete world.goal.objects[coords];
            }
        }
    }
}

msg.record_id("dialog-set-dimensions");
msg.record_title("ui-dialog-title-dialog-set-dimensions", "Set the world's dimensions");
msg.record_id("set-dimensions-explain", "set-dimensions-explain");
msg.record_id("input-max-x-text", "Maximum x value:");
msg.record_id("input-max-y-text", "Maximum y value:");
msg.record_id("use-small-tiles-text", "Use small tiles");

RUR.world_set.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.world_set.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y, world = RUR.get_current_world();
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    world.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.MAX_X, RUR.MAX_Y);   // remove extra objects
    RUR.set_world_size(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});

},{"./../../lang/msg.js":88,"./../default_tiles/tiles.js":1,"./../drawing/visible_world.js":9,"./../programming_api/exceptions.js":42,"./../recorder/recorder.js":47,"./../rur.js":52,"./../utils/key_exist.js":62}],84:[function(require,module,exports){
require("./../rur.js");

/* The following is used in a few places, including in unit and
   functional tests. It is not documented with JSdoc as it should not
   be required for normal world creation; the recommended practice being
   to start with an existing world. */
RUR.world_utils.create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    world.small_tiles = false;
    world.rows = RUR.MAX_Y_DEFAULT;
    world.cols = RUR.MAX_X_DEFAULT;

    return world;
};
RUR.set_current_world(RUR.world_utils.create_empty_world());
},{"./../rur.js":52}],85:[function(require,module,exports){
require("./../translator.js");
require("./../rur.js");
require("./../robot/robot.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../editors/create.js");
require("./create_empty_world.js");
require("./../world_api/animated_images.js");

var edit_robot_menu = require("./../ui/edit_robot_menu.js");

RUR.world_utils.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content, i, keys, more_keys, coord, index, obstacles;

    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world_utils.import_world");
        return {};
    }
    RUR.animated_images_init();
    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.world_utils.create_empty_world();
        } catch (e) {
            alert("Exception caught in import_world; see console for details.");
            console.warn("Exception caught in import_world.");
            console.log("First 80 characters of json_string = ", json_string.substring(0, 80));
            console.log("Error = ", e);
            RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
        }
    } else {  // already parsed into a Javascript Object
        RUR.CURRENT_WORLD = json_string;
    }

    if (RUR.CURRENT_WORLD.robots !== undefined) {
        if (RUR.CURRENT_WORLD.robots[0]) {
            RUR.robot.modernize(RUR.CURRENT_WORLD.robots[0]);
            body = RUR.CURRENT_WORLD.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        } else {
            // protect against robots[0] == (undefined or null)
            RUR.CURRENT_WORLD.robots = [];
        }
    }

    //TODO: put the conversion into new function

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed obstacles (and prior to that [or after?],
    // they were known as solid_objects); to ensure compatibility of
    // worlds created before, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.CURRENT_WORLD.top_tiles !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "top_tiles"));
        delete RUR.CURRENT_WORLD.top_tiles;
    } else if (RUR.CURRENT_WORLD.solid_objects !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "solid_objects"));
        delete RUR.CURRENT_WORLD.solid_objects;
    }

    // Backward compatibility change done on December 29, 2016.
    // tiles were written as e.g. "water"; need to be written as ["water"]
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.tiles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (typeof RUR.CURRENT_WORLD.tiles[coord] == "string") {
                RUR.CURRENT_WORLD.tiles[coord] = [RUR.CURRENT_WORLD.tiles[coord]];
            } else {
                break;
            }
        }
    }
    // and obstacles were written in the form {fence:1} and need to be simply
    // ["fence"]
    if (RUR.CURRENT_WORLD.obstacles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.obstacles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (Object.prototype.toString.call(RUR.CURRENT_WORLD.obstacles[coord]) == "[object Object]") {
                obstacles = Object.keys(RUR.CURRENT_WORLD.obstacles[coord]);
                // also convert from the old names to the new ones
                index = obstacles.indexOf("fence4");
                if (index !== -1) {
                    obstacles[index] = "fence_right";
                }
                index = obstacles.indexOf("fence5");
                if (index !== -1) {
                    obstacles[index] = "fence_left";
                }
                index = obstacles.indexOf("fence6");
                if (index !== -1) {
                    obstacles[index] = "fence_double";
                }
                index = obstacles.indexOf("fence7");
                if (index !== -1) {
                    obstacles[index] = "fence_vertical";
                }
                RUR.CURRENT_WORLD.obstacles[coord] = obstacles;
            } else {
                break;
            }
        }
    }


    // Backward compatibility change done on March 28, 2016, where
    // "pre_code" and "post_code" were simplified to "pre" and "post"
    // for consistency with other editor contents.
    if (RUR.CURRENT_WORLD.pre_code !== undefined) {
        RUR.CURRENT_WORLD.pre = RUR.CURRENT_WORLD.pre_code;
        delete RUR.CURRENT_WORLD.pre_code;
    }
    if (RUR.CURRENT_WORLD.post_code !== undefined) {
        RUR.CURRENT_WORLD.post = RUR.CURRENT_WORLD.post_code;
        delete RUR.CURRENT_WORLD.post_code;
    }

    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        RUR.BACKGROUND_IMAGE.src = RUR.CURRENT_WORLD.background_image;
        RUR.BACKGROUND_IMAGE.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y_DEFAULT;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X_DEFAULT;
    RUR.set_world_size(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    RUR.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }
    start_process_onload();
};

function start_process_onload() {
    if (window.translate_python == undefined) {
        console.log("startup delay: translate_python not available; will try again in 200ms.");
        window.setTimeout(start_process_onload, 200);
    }
    else {
        RUR.WORLD_BEFORE_ONLOAD = RUR.clone_world();
        process_onload();
    }
}

function show_onload_feedback (e) {
    RUR.show_feedback("#Reeborg-shouts", e.message + "<br>" +
        RUR.translate("Problem with onload code.") + "<pre>" +
        RUR.CURRENT_WORLD.onload + "</pre>");
    console.log("error in onload:", e);
}

process_onload = function () {
    // TODO: review everything that needs to be reset and puts it here
    // or put in reset_world.js and make sure to call it.
    RUR.state.visible_grid = false;
    RUR.state.do_not_draw_info = false;
    //
    if (RUR.CURRENT_WORLD.onload !== undefined && !RUR.state.editing_world) {
        RUR.state.evaluating_onload = true; // affects the way errors are treated
        if (RUR.CURRENT_WORLD.onload[0]=="#") {
            try {
               window.translate_python(RUR.CURRENT_WORLD.onload);
            } catch (e) {
                show_onload_feedback(e);
            }
        } else {
            try {
                eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
            } catch (e) {
                show_onload_feedback(e);
            }
        }

        RUR.state.evaluating_onload = false;
        // remove any frames created by onload
        RUR.frames = [];
        RUR.nb_frames = 0;
        RUR.current_frame_no = 0;
    }
    RUR.WORLD_AFTER_ONLOAD = RUR.clone_world();
    RUR.vis_world.draw_all();

};
RUR.world_utils.process_onload = process_onload;

function convert_old_worlds () {
    // TODO: add code here
    // TODO: convert goal.possible_positions to goal.possible_final_positions
    // TODO: convert start_positions to possible_initial_positions
}

},{"./../drawing/visible_world.js":9,"./../editors/create.js":10,"./../programming_api/exceptions.js":42,"./../robot/robot.js":49,"./../rur.js":52,"./../translator.js":55,"./../ui/edit_robot_menu.js":57,"./../world_api/animated_images.js":66,"./create_empty_world.js":84}],86:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.en = en = {};

en["at_goal"] = "at_goal";
en["front_is_clear"] = "front_is_clear";
en["right_is_clear"] = "right_is_clear";
en["wall_in_front"] = "wall_in_front";
en["wall_on_right"] = "wall_on_right";
en["object_here"] = "object_here";
en["carries_object"] = "carries_object";
en["is_facing_north"] = "is_facing_north";

en["move"] = "move";
en["turn_left"] = "turn_left";
en["take"] = "take";
en["put"] = "put";
en["build_wall"] = "build_wall";
en["pause"] = "pause";
en["done"] = "done";
en["think"] = "think";
en["think(100)"] = "think(100)";
en["sound"] = "sound";
en["sound(True)"] = "sound(True)";
en["sound(true)"] = "sound(true)";
en["World"] = "World";
en["UsedRobot"] = "UsedRobot";
en["new UsedRobot"] = "new UsedRobot";
en["no_highlight"] = "no_highlight";
en["write"] = "write";

en["from library import ?"] = "from library import ?";

},{}],87:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.fr = fr = {};

fr["at_goal"] = "au_but";
fr["front_is_clear"] = "rien_devant";
fr["right_is_clear"] = "rien_a_droite";
fr["wall_in_front"] = "mur_devant";
fr["wall_on_right"] = "mur_a_droite";
fr["object_here"] = "objet_ici";
fr["carries_object"] = "transporte";
fr["is_facing_north"] = "est_face_au_nord";

fr["move"] = "avance";
fr["turn_left"] = "tourne_a_gauche";
fr["take"] = "prend";
fr["put"] = "depose";
fr["build_wall"] = "construit_un_mur";
fr["pause"] = "pause";
fr["done"] = "termine";
fr["think"] = "pense";
fr["think(100)"] = "pense(100)";
fr["sound"] = "son";
fr["sound(True)"] = "son(True)";
fr["sound(true)"] = "son(true)";
fr["World"] = "Monde";
fr["UsedRobot"] = "RobotUsage";
fr["new UsedRobot"] = "new RobotUsage";
fr["no_highlight"] = "pas_de_surlignement";
fr["write"] = "ecrit";

fr["from library import ?"] = "from biblio import ?";

},{}],88:[function(require,module,exports){
var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];
var _function_names = [];
var _value_names = [];

__record_id = function(id){
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
};

record_id = function (id, text) {
    __record_id(id);
    if (text !== undefined) {
        _text_elements.push([id, text]);
    }
};

record_value = function (id, text) {
    __record_id(id);
    _value_names.push([id, text]);
};
record_fn = function (id, text) {
    __record_id(id);
    _function_names.push([id, text]);
};
record_name = function (id, text) {
    __record_id(id);
    _elements_names.push([id, text]);
};
record_title = function (id, text) {
    __record_id(id);
    _elements_titles.push([id, text]);
};


update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_function_names.length; i++) {
        id = "#" + _function_names[i][0];
        msg = _function_names[i][1];
        $(id).html(RUR.translate(msg) + "()");
    }
    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).html(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    for(i=0; i<_value_names.length; i++) {
        id = "#" + _value_names[i][0];
        msg = _value_names[i][1];
        $(id).attr("value", RUR.translate(msg));
    }
    update_titles();
};

update_titles = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_elements_titles.length; i++) {
        id = "#" + _elements_titles[i][0];
        msg = _elements_titles[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;
exports.update_titles = update_titles;
exports.record_title = record_title;
exports.record_fn = record_fn;
exports.record_value = record_value;

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("editor-visible-label", "EDITOR VISIBLE");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");


record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
record_name("blockly-basic-commands", "BASIC COMMANDS");
record_name("blockly-defining", "DEFINING");
record_name("blockly-loops", "LOOPS");
record_name("blockly-decisions", "DECISIONS");
record_name("blockly-conditions", "CONDITIONS");
record_name("blockly-using-variables", "USING VARIABLES");
record_name("blockly-commands-var", "COMMANDS");
record_name("blockly-conditions-var", "CONDITIONS");
record_name("blockly-other", "OTHER");
record_name("blockly-objects", "OBJECTS");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("program-in-blockly-workspace", "PROGRAM IN BLOCKLY WORKSPACE");
record_id("contact", "CONTACT");
record_id("issues", "ISSUES");
record_id("help", "HELP");
record_id("forum", "FORUM");
record_id("documentation", "DOCUMENTATION");
record_id("python-help", "PYTHON HELP");
record_id("keyboard-help", "KEYBOARD HELP");

record_title("ui-dialog-title-edit-world-panel", "WORLD EDITOR");
record_id("east", "m-east");
record_id("north", "m-north");
record_id("west", "m-west");
record_id("south", "m-south");
record_id("random", "m-random");
record_id("m-dimensions", "m-dimensions");
record_id("m-add-robot", "m-add-robot");
record_id("m-robot", "m-robot");
record_id("m-position", "m-position");
record_id("m-turn", "m-turn");
record_id("m-objects", "m-objects");
record_id("m-add", "m-add");
record_id("m-walls", "m-walls");
record_id("m-objects2", "m-objects2");
record_id("m-tiles", "m-tiles");
record_id("m-fill", "m-fill");
record_id("m-solid", "m-solid");
record_id("m-decorative", "m-decorative");
record_id("m-background", "m-background");
record_id("m-goal", "m-goal");
record_id("mg-robot", "mg-robot");
record_id("mg-walls", "mg-walls");
record_id("mg-objects", "mg-objects");

record_title("ui-dialog-title-Reeborg-concludes", "Reeborg says: I'm done!");
record_title("ui-dialog-title-Reeborg-writes", "Reeborg writes:");
record_title("ui-dialog-title-Reeborg-shouts", "Reeborg shouts: Something is wrong!");
record_title("ui-dialog-title-Reeborg-explores", "Reeborg explores some Javascript code");
record_title("ui-dialog-title-Reeborg-proclaims", "Reeborg states:");
record_title("ui-dialog-title-Reeborg-watches", "Reeborg watches some variables!");
record_title("ui-dialog-title-World-info", "Click on the world to get some additional information.");

record_id("kbd-repeat-not-keyword", "<code>repeat</code> is not a true Python keyword.");

},{}],89:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_en = ui_en = {};
exports.en_to_en = en_to_en = {};

ui_en["en-fr"] = "Mixed mode: User Interface in English; programming language in French.<br>" +
    "Mode mixte: interface graphique en anglais; programmation en français.";

ui_en["SITE NAME"] = "Reeborg's World";
ui_en["WORLD INFO"] = "World Info";
ui_en["EDITOR VISIBLE"] = "Keep editor visible";

ui_en["apple"] = en_to_en["apple"] = "apple";
ui_en["banana"] = en_to_en["banana"] = "banana";
ui_en["beeper"] = en_to_en["beeper"] = "beeper";
ui_en["box"] = en_to_en["box"] = "box";
ui_en["bridge"] = en_to_en["bridge"] = "bridge";
ui_en["carrot"] = en_to_en["carrot"] = "carrot";
ui_en["daisy"] = en_to_en["daisy"] = "daisy";
ui_en["dandelion"] = en_to_en["dandelion"] = "dandelion";
ui_en["leaf"] = en_to_en["leaf"] = "leaf";
ui_en["orange"] = en_to_en["orange"] = "orange";
ui_en["square"] = en_to_en["square"] = "square";
ui_en["star"] = en_to_en["star"] = "star";
ui_en["strawberry"] = en_to_en["strawberry"] = "strawberry";
ui_en["token"] = en_to_en["token"] = "token";
ui_en["tokens are Reeborg's favourite thing."] = "tokens are Reeborg's favourite thing.";
ui_en["triangle"] = en_to_en["triangle"] = "triangle";
ui_en["tulip"] = en_to_en["tulip"] = "tulip";

ui_en["Problem with onload code."] = "Invalid Javascript onload code; contact the creator of this world.";

ui_en["Too many steps:"] = "Too many steps: {max_steps}<br>Use <code>set_max_nb_instructions(nb)</code> to increase the limit.";
ui_en["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
ui_en["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
ui_en["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>All objects are at the correct location.</li>";
ui_en["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>One or more objects are not at the correct location.</li>";
ui_en["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
ui_en["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
ui_en["Last instruction completed!"] = "Last instruction completed!";
ui_en["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";

ui_en["Unknown object"] = "Unknown object: <code>{obj}</code>";
ui_en["No object found here"] = "No <code>{obj}</code> found here!";
ui_en["object"] = "object";
ui_en["I don't have any object to put down!"] = "I don't have any <code>{obj}</code> to put down!";
ui_en["There is already a wall here!"] = "There is already a wall here!";
ui_en["There is no wall to remove!"] = "There is no wall to remove!";
ui_en["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
ui_en["Done!"] = "Done!";
ui_en["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
ui_en["There is no goal in this world!"] = "There is no goal in this world!";
ui_en["I carry too many different objects. I don't know which one to put down!"] = "I carry too many different objects. I don't know which one to put down!";
ui_en["Many objects are here; I do not know which one to take!"] = "Many different objects are here; I do not know which one to take!";

ui_en.east = "east";
ui_en.north = "north";
ui_en.west = "west";
ui_en.south = "south";
ui_en["Unknown orientation for robot."] = "Unknown orientation for robot.";

ui_en["Invalid position."] = "{pos} is an invalid position.";
ui_en["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_en["World selected"] = "World {world} selected";
ui_en["Could not find world"] = "Could not find world {world}";
ui_en["Object names"] = " library, token, star, triangle, square, etc.";

ui_en["Invalid world file."] = "Invalid world file.";
ui_en["PERMALINK"] = "PERMALINK";
ui_en["Could not find link: "] = "Could not find link: ";

ui_en["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
ui_en["Added robot."] = "Added Reeborg.";
ui_en["Click on image to turn robot"] = "Click on image to turn Reeborg";
ui_en["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
ui_en["Click on world to add object."] = "Click on world to set number of <code>{obj}</code>.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Click on world to toggle walls."] = "Click on world to toggle walls.";
ui_en["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot.";
ui_en["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
ui_en["Click on desired goal object below."] = "Click on desired goal object below.";
ui_en["Click on world to set number of goal objects."] = "Click on world to set number of goal <code>{obj}</code>.";
ui_en["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry.";
ui_en[" is not a valid value!"] = " is not a valid value!";
ui_en["Enter number of objects desired at that location."] = "Click on world to set number <code>{obj}</code>.";
ui_en["Objects found here:"] = "Objects found here:";
ui_en["Description"] = "Description";
ui_en["A robot located here carries no objects."] = "A robot located at {x},{y} carries no objects.";
ui_en["Goal to achieve:"] = "Goal to achieve:";
ui_en["A robot located here carries:"] = "A robot located at {x},{y} carries:";
ui_en["random location"] = "random location";
ui_en["Enter number of objects to give to robot."] = "Enter number of <code>{obj}</code> to give to robot.";
ui_en["Special information about this location:"] = "Special information about this location:";
ui_en["Click on world to toggle tile."] = "Click on world to toggle <code>{obj}</code> tile.";
ui_en["Click on desired tile below."] = "Click on desired tile below or on the colour selector.";
ui_en["mud"] = "mud";
ui_en["water"] = "water";
ui_en["grass"] = "grass";
ui_en["gravel"] = "gravel";
ui_en["ice"] = "ice";
ui_en["A wall must be built east of this location."] = "A wall must be built east of this location.";
ui_en["A wall must be built north of this location."] = "A wall must be built north of this location.";
ui_en["A wall must be built west of this location."] = "A wall must be built west of this location.";
ui_en["A wall must be built south of this location."] = "A wall must be built south of this location.";
ui_en["The final required position of the robot will be chosen at random."] = "The final required position of the robot will be chosen at random.";
ui_en["The final position of the robot must be (x, y) = "] = "The final position of the robot must be (x, y) = ";
ui_en["Click on world to fill with given tile."] = "Click on world to fill with given tile.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Enter url of image to use as background."] = "Enter url of image to use as background.";
ui_en["Replace editor content"] = "Do you wish to replace your editor code by that provided by the creator of this world?";
ui_en["Replace library content"] = "Do you wish to replace your library code by that provided by the creator of this world?";
ui_en["colour"] = "colour";

ui_en["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
ui_en["No such world!"] = "No such world!";
ui_en["Enter world name to save"] = "Enter world name to save; names in use: ";
ui_en["Enter world name to delete"] = "Enter world name to delete; existing worlds: ";
ui_en["Delete "] = "Delete ";

ui_en["Error found at or near line {number}."] = "Error found at or near line {number}.";
ui_en["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
ui_en["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
ui_en["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";
ui_en["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_en["I'm stuck in mud."] = "I'm stuck in mud.";
ui_en["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";
ui_en["I'm slipping on ice!"] = "I'm slipping on ice!";
ui_en["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location.";
ui_en["Grass: usually safe."] = "Grass: usually safe.";
ui_en["Gravel: usually safe."] = "Gravel: usually safe.";
ui_en["I'm in water!"] = "I'm in water!";
ui_en["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
ui_en["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: Reeborg <b>can</b> detect this tile using at_goal().";
ui_en["Crash!"] = "Crash!";
ui_en["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";
ui_en["I hit a fence!"] = "I hit a fence!";
ui_en["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
ui_en["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Bridge: Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

ui_en["Something is blocking the way!"] = "Something is blocking the way!";
ui_en["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> detect this using at_goal().";
ui_en["green home tile:"] = "green home tile:";
ui_en["home:"] = "home:";
ui_en["racing flag:"] = "racing flag:";
ui_en["house:"] = "house:";

ui_en["fence_right"] = "fence";
ui_en["fence_left"] = "fence";
ui_en["fence_double"] = "fence";
ui_en["fence_vertical"] = "fence";

ui_en["Local variables"] = "Local variables";
ui_en["Global variables"] = "Global variables";
ui_en["Watched expressions"] = "Watched expressions";

ui_en["move forward"] = "move forward";
ui_en["turn left"] = "turn left";
ui_en["take object"] = "take object";
ui_en["put object"] = "put object";
ui_en["Pause the program's execution."] = "Pause the program's execution.";
ui_en["Build a wall in front of the robot."] = "Build a wall in front of the robot.";
ui_en["End the program's execution."] = "End the program's execution.";
ui_en["True if a wall is blocking the way."] = "True if a wall is blocking the way";
ui_en["True if nothing is blocking the way."] = "True if nothing is blocking the way.";
ui_en["True if desired destination."] = "True if desired destination.";
ui_en["True if robot carries at least one object."] = "True if robot carries at least one object.";
ui_en["True if there is at least one object here."] = "True if there is at least one object here.";
ui_en["True if robot is facing North."] = "True if robot is facing North.";
ui_en["Delay between actions; default is 300 ms."] = "Delay between actions; default is 300 ms.";

ui_en["Save world in browser"] = "Save world in browser";
ui_en["LOAD BLOCKLY"] = "Import program (blocks) from file";
ui_en["LOAD BLOCKLY EXPLAIN"] = "Opens a local file and use its content to replace the content of the Blockly workspace.";
ui_en["LOAD EDITOR"] = "Import program from file";
ui_en["LOAD EDITOR EXPLAIN"] = "Opens a local file and use its content to replace the content of the Code editor.";
ui_en["LOAD LIBRARY"] = "Import library from a file";
ui_en["LOAD LIBRARY EXPLAIN"] = "Opens a file and use its content to replace the current content of the Library.";
ui_en["LOAD WORLD"] = "Open world from file";
ui_en["LOAD WORLD EXPLAIN"] = "Loads a world from a file on your computer.";
ui_en["SAVE BLOCKLY"] = "Save program to file";
ui_en["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_en;
ui_en["SAVE EDITOR"] = "Save program to file";
ui_en["SAVE EDITOR EXPLAIN"] = "Saves the content of the editor in a file." + mac_user_save_files_en;
ui_en["SAVE LIBRARY"] = "Save the library";
ui_en["SAVE LIBRARY EXPLAIN"] = "Saves the content of the library in a file." + mac_user_save_files_en;
ui_en["SAVE WORLD"] = "Save world to file";
ui_en["SAVE WORLD EXPLAIN"] = "Saves the world (as a json object) to a file on your computer." + mac_user_save_files_en;

ui_en["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_en["ADD BLOCKLY TEXT"] = "Code blocks";
ui_en["ADD EDITOR TEXT"] = "Code in editor";
ui_en["ADD LIBRARY TEXT"] = "Library";
ui_en["ADD PRE TEXT"] = "Pre";
ui_en["ADD POST TEXT"] = "Post";
ui_en["ADD DESCRIPTION TEXT"] = "Description";
ui_en["ADD ONLOAD TEXT"] = "Onload";

ui_en["KEYBOARD BUTTON"] = "Reeborg's keyboard";
ui_en["ADDITIONAL OPTIONS"] = "Additional options";

ui_en["BASIC COMMANDS"] = "Basic commands";
ui_en["DEFINING"] = "Defining";
ui_en["LOOPS"] = "Loops";
ui_en["DECISIONS"] = "Decisions";
ui_en["CONDITIONS"] = "Conditions";
ui_en["USING VARIABLES"] = "Using variables";
ui_en["COMMANDS"] = "Commandes";
ui_en["OTHER"] = "Other";
ui_en["OBJECTS"] = "Objects";

ui_en["Python Code"] = "Python Code";
ui_en["Javascript Code"] = "Javascript Code";
ui_en["LIBRARY"] = "library";
ui_en["PRE"] = "Pre";
ui_en["POST"] = "Post";
ui_en["DESCRIPTION"] = "Desc.";
ui_en["ONLOAD"] = "Onload";

ui_en["HIGHLIGHT IMPOSSIBLE"] = "A problem with your code has caused me to turn off the code highlighting.";
ui_en["COMMAND RESULT"] = "Select action to perform from menu below.";

ui_en["COPY"] = "Copy";
ui_en["COPY PERMALINK EXPLAIN"] = "Copy the permalink to the clipboard.";
ui_en["Save"] = "Save";
ui_en["Save permalink explanation"] = "Saves a copy of the permalink to a file.";
ui_en["REPLACE PERMALINK"] = "Replace";
ui_en["REPLACE PERMALINK EXPLAIN"] = "Replace the content above by a different permalink and click on Replace";
ui_en["CANCEL"] = "Cancel";

ui_en["DELETE WORLD TEXT"] = "The following refers to worlds currently stored in your browser which you can delete:";
ui_en["PYTHON ONLY"] = "Python only";
ui_en["COLLABORATION"] = "Collaboration";
ui_en["TOGETHERJS EXPLAIN"] = "Tool which permits collaboration with one or more other user using Mozilla's TogetherJS. Does not work with Blockly.";
ui_en["WORLD CREATION TITLE"] = "World: creation, edition, ...";
ui_en["EDIT WORLD"] = "Edit world";
ui_en["EDIT WORLD EXPLAIN"] = "You can create your own world by editing the current one.";
ui_en["PROGRAM IN EDITOR"] = "Program in editor";
ui_en["PROGRAM IN BLOCKLY WORKSPACE"] = "Program in blockly workspace";
ui_en["REVERSE STEP EXPLAIN"] = "Reverses the previous execution step.";
ui_en["CONTACT"] = "(English/French only) Email:";
ui_en["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
ui_en["FORUM"] = "Discussion forum (English/French only)";
ui_en["HELP"] = "Help";
ui_en["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentation</a>';
ui_en["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
ui_en["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

ui_en["WORLD EDITOR"] = "World editor";
ui_en["m-east"] = "East";
ui_en["m-north"] = "North";
ui_en["m-west"] = "West";
ui_en["m-south"] = "South";
ui_en["m-random"] = "Random";
ui_en["m-dimensions"] = "World dimensions";
ui_en["m-add"] = "Add";
ui_en["m-add-robot"] = "Add robot";
ui_en["m-robot"] = "Robot";
ui_en["m-position"] = "Position(s)";
ui_en["m-turn"] = "Turn";
ui_en["m-objects"] = "Objects";
ui_en["m-walls"] = "Walls";
ui_en["m-objects2"] = "Objects";
ui_en["m-tiles"] = "Tiles";
ui_en["m-fill"] = "Fill";
ui_en["m-solid"] = "Obstacles";
ui_en["m-decorative"] = "Decorative objects";
ui_en["m-background"] = "Background image";
ui_en["m-goal"] = "Goal";
ui_en["mg-robot"] = "Robot";
ui_en["mg-walls"] = "Walls";
ui_en["mg-objects"] = "Objects";

ui_en["Reeborg says: I'm done!"] = "Reeborg says: I'm done!";
ui_en["Reeborg writes:"] = "Reeborg writes:";
ui_en["Reeborg shouts: Something is wrong!"] = "Reeborg shouts: Something is wrong!";
ui_en["Reeborg explores some Javascript code"] = "Reeborg explores some Javascript code";
ui_en["Reeborg states:"] = "Reeborg states:";
ui_en["Reeborg watches some variables!"] = "Reeborg watches some variables!";
ui_en["Click on the world to get some additional information."] = "Click on the world to get some additional information.";

ui_en["Reeborg's basic keyboard"] = "Reeborg's basic keyboard";
ui_en["kbd-command-btn"] = "Commands";
ui_en["kbd-condition-btn"] = "Conditions";
ui_en["kbd-python-btn"] = "Python";
ui_en["kbd-py-console-btn"] = "Python";
ui_en["kbd-javascript-btn"] = "Javascript";
ui_en["kbd-objects-btn"] = "Objects";
ui_en["kbd-special-btn"] = "Special";

ui_en["UNDO"] = "UNDO";
ui_en["REDO"] = "REDO";
ui_en["tab"] = "TAB";
ui_en["shift-tab"] = "Shift-TAB";
ui_en["enter"] = "\u23CE";
ui_en["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> is not a true Python keyword.";

ui_en["Colour:"] = "Colour:";
ui_en["Enter a colour"] = "Enter a colour";

ui_en["Background image"] = "Background image";

ui_en["NAME:"] = "Name:";
ui_en["Save world in browser"] = "Save world in browser";

ui_en["Set the world's dimensions"] = "Set the world's dimensions";
ui_en["set-dimensions-explain"] = "If so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screen may not be able to display very large worlds.";
ui_en["Maximum x value:"] = "Maximum x value:";
ui_en["Maximum y value:"] = "Maximum y value:";
ui_en["Use small tiles"] = "Use small tiles";

ui_en["Set goal number for object"] = "Set goal number for object";
ui_en["dialog-goal-object-explain"] = "Click on the checkbox if you wish that number to be equal to the total number of such objects found in the world at the beginning.";
ui_en["Number of objects"] = "Number of objects";
ui_en["All such objects"] = "All such objects";

ui_en["Number of objects:"] = "Number of objects:";
ui_en["Maximum:"] = "Maximum:";
ui_en["Add object in the world"] = "Set number of object";
ui_en["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_en["Unlimited:"] = "Unlimited:";
ui_en["Give object to robot"] = "Give object to robot";
ui_en["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

ui_en["UPDATE EDITOR CONTENT"] = "This world has some default content for the editor. To replace the current content of your editor, click on the button";
ui_en["UPDATE EDITOR BUTTON"] = "Replace editor content";
ui_en["UPDATE LIBRARY CONTENT"] = "This world has some default content for the library. To replace the current content of your library, click on the button";
ui_en["UPDATE LIBRARY BUTTON"] = "Replace library content";
ui_en["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_en["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_en["Contents from World"] = "Contents from World";

},{}],90:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_fr = ' <b>Utilisateurs Mac:</b> consultez <a href="https://github.com/aroberge/reeborg/blob/master/known_problems.md" target="_blank" rel="noopener">Problèmes connus</a>.';

exports.ui_fr = ui_fr = {};
exports.fr_to_en = fr_to_en = {};

ui_fr["fr-en"] = "Mode mixte: interface graphique en français; programmation en anglais.<br>" +
    "Mixed mode: User Interface in French; programming language in English.<br>";

ui_fr["SITE NAME"] = "Le monde de Reeborg";
ui_fr["WORLD INFO"] = "Description";
ui_fr["EDITOR VISIBLE"] = "Garder l'éditeur visible";

ui_fr["apple"] = "pomme";
fr_to_en["pomme"] = "apple";
ui_fr["banana"] = "banane";
fr_to_en["banane"] = "banana";
ui_fr["beeper"] = "sonnette";
fr_to_en["sonnette"] = "beeper";
ui_fr["box"] = "boîte";
fr_to_en["boîte"] = "box";
ui_fr["bridge"] = "pont";
fr_to_en["pont"] = "bridge";
ui_fr["carrot"] = "carotte";
fr_to_en["carotte"] = "carrot";
ui_fr["daisy"] = "marguerite";
fr_to_en["marguerite"] = "daisy";
ui_fr["dandelion"] = "pissenlit";
fr_to_en["pissenlit"] = "dandelion";
ui_fr["leaf"] = "feuille";
fr_to_en["feuille"] = "leaf";
ui_fr["orange"] = "orange";
fr_to_en["orange"] = "orange";
ui_fr.square = "carré";
fr_to_en["carré"] = "square";
ui_fr.star = "étoile";
fr_to_en["étoile"] = "star";
ui_fr["strawberry"] = "fraise";
fr_to_en["fraise"] = "strawberry";
ui_fr.token = "jeton";
ui_fr["tokens are Reeborg's favourite thing."] = "Les jetons sont les objets favoris de Reeborg.";
fr_to_en["jeton"] = "token";
ui_fr.triangle = "triangle";
fr_to_en["triangle"] = "triangle";
ui_fr["tulip"] = "tulipe";
fr_to_en["tulipe"] = "tulip";

ui_fr["Problem with onload code."] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";

ui_fr["Too many steps:"] = "Trop d'instructions: {max_steps}<br>Utilisez <code>max_nb_instructions()(nb)</code> pour augmenter la limite.";
ui_fr["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
ui_fr["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
ui_fr["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
ui_fr["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
ui_fr["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
ui_fr["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
ui_fr["Last instruction completed!"] = "Dernière instruction complétée!";
ui_fr["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";

ui_fr["Unknown object"] = "Objet inconnu: <code>{obj}</code>";
ui_fr["No object found here"] = "Pas d'objet <code>{obj}</code> trouvé ici !";
ui_fr["object"] = "objet";
ui_fr["I don't have any object to put down!"] = "Je n'ai pas d'objet <code>{obj}</code>!";
ui_fr["There is already a wall here!"] = "Il y a déjà un mur ici !";
ui_fr["There is no wall to remove!"] = "Il n'y a pas de mur à enlever d'ici !";
ui_fr["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
ui_fr["Done!"] = "Terminé !";
ui_fr["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
ui_fr["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
ui_fr["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
ui_fr["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";

ui_fr.east = "est";
ui_fr.north = "nord";
ui_fr.west = "ouest";
ui_fr.south = "sud";
ui_fr["Unknown orientation for robot."] = "Orientation inconnue.";

ui_en["Invalid position."] = "{pos} n'est pas une position valide.";
ui_en["Invalid orientation."] = "'{orient}' est une orientation inconnue.";

ui_fr["World selected"] = "Monde {world} choisi";
ui_fr["Could not find world"] = "Je ne peux pas trouver {world}";
ui_fr["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";

ui_fr["Invalid world file."] = "Fichier monde invalide.";
ui_fr["Could not find link: "] = "Lien introuvable : ";

ui_fr["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
ui_fr["Added robot."] = "Reeborg ajouté.";
ui_fr["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
ui_fr["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
ui_fr["Click on world to add object."] = "Cliquez sur le monde pour ajouter des <code>{obj}</code>.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
ui_fr["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
ui_fr["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
ui_fr["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
ui_fr["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
ui_fr["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> comme but.";
ui_fr["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
ui_fr[" is not a valid value!"] = " n'est pas une valeur valide!";
ui_fr["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> désiré à cet endroit.";
ui_fr["Objects found here:"] = "Objets trouvés ici:";
ui_fr["Description"] = "Description";
ui_fr["A robot located here carries no objects."] = "A robot situé à {x},{y} ne transporte aucun objet.";
ui_fr["A robot located here carries:"] = "Un robot situé à {x},{y} transporte:";
ui_fr["random location"] = "une position choisie au hasard";
ui_fr["Enter number of objects to give to robot."] = "Quel nombre de <code>{obj}</code> voulez-vous donner au robot?";
ui_fr["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
ui_fr["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: <code>{obj}</code>.";
ui_fr["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous ou sur le sélecteur de couleur.";
ui_fr["mud"] = "boue";
ui_fr["water"] = "eau";
ui_fr["grass"] = "gazon";
ui_fr["gravel"] = "gravier";
ui_fr["ice"] = "glace";
ui_fr["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
ui_fr["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
ui_fr["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
ui_fr["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
ui_fr["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
ui_fr["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
ui_fr["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré.";
ui_fr["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
ui_fr["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
ui_fr["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
ui_fr["colour"] = "couleur";

ui_fr["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
ui_fr["No such world!"] = "Ce monde n'existe pas !";
ui_fr["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
ui_fr["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
ui_fr["Goal to achieve:"] = "Résultat désiré :";
ui_fr["Delete "] = "Effacer ";

ui_fr["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
ui_fr["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
ui_fr["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
ui_fr["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";
ui_fr["I cannot help you with this problem."] = "Je ne peux pas vous aider avec ce problème.";

ui_fr["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
ui_fr["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
ui_fr["I'm slipping on ice!"] = "Je glisse sur la glace!";
ui_fr["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et pourrait glisser à la prochaine case.";
ui_fr["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
ui_fr["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
ui_fr["I'm in water!"] = "Je suis dans l'eau!";
ui_fr["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
ui_fr["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["Crash!"] = "Crash!";
ui_fr["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
ui_fr["I hit a fence!"] = "J'ai frappé une clôture!";
ui_fr["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
ui_fr["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Pont: Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";

fr_to_en["pont"] = "bridge";
ui_fr["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
ui_fr["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["green home tile:"] = "tuile verte pour l'arrivée :";
ui_fr["home:"] = "la maison :";
ui_fr["racing flag:"] = "drapeau d'arrivée :";
ui_fr["house:"] = "maison :";

ui_fr["fence_right"] = "clôture_droite";
ui_fr["fence_left"] = "clôture_gauche";
ui_fr["fence_double"] = "clôture_double";
ui_fr["fence_vertical"] = "clôture_verticale";

ui_fr["Local variables"] = "Variables locales";
ui_fr["Global variables"] = "Variables globales";
ui_fr["Watched expressions"] = "Watched expressions";

ui_fr["move forward"] = "avance";
ui_fr["turn left"] = "tourne à gauche";
ui_fr["take object"] = "prend l'objet";
ui_fr["put object"] = "dépose l'objet";
ui_fr["Pause the program's execution."] = "Pause l'exécution du programme.";
ui_fr["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
ui_fr["End the program's execution."] = "Termine l'exécution du programme.";
ui_fr["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
ui_fr["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
ui_fr["True if desired destination."] = "Vrai si c'est la destination désirée.";
ui_fr["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
ui_fr["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
ui_fr["True if robot is facing North."] = "Vrai se le robot est face au nord.";
ui_fr["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";

ui_fr["Save world in browser"] = "Sauvegarder le monde dans le navigateur";
ui_fr["Save permalink"] = "Sauvegarder le permalien";
ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
ui_fr["LOAD BLOCKLY"] = "Ouvrir un programme (blocs)";
ui_fr["LOAD BLOCKLY EXPLAIN"] = "Ouvre un fichier local et remplace les blocs (Blockly) par le contenu du fichier.";
ui_fr["LOAD EDITOR"] = "Ouvrir un programme";
ui_fr["LOAD EDITOR EXPLAIN"] = "Ouvre un fichier local et remplace le contenu de l'éditeur par le contenu du fichier.";
ui_fr["LOAD LIBRARY"] = "Importer une bibliothèque";
ui_fr["LOAD LIBRARY EXPLAIN"] = "Ouvre un fichier contenant un programme et remplace le contenu de la bibliothèque par le contenu du fichier choisi.";
ui_fr["LOAD WORLD"] = "Ouvrir un monde";
ui_fr["LOAD WORLD EXPLAIN"] = "Ouvre un monde à partir d'un fichier.";
ui_fr["SAVE BLOCKLY"] = "Sauvegarder les blocs.";
ui_fr["SAVE BLOCKLY EXPLAIN"] = "Sauvegarde le programme (blocs)." + mac_user_save_files_fr;
ui_fr["SAVE EDITOR"] = "Sauvegarder le programme";
ui_fr["SAVE EDITOR EXPLAIN"] = "Sauvegarde le contenu de l'éditeur dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE LIBRARY"] = "Sauvegarder la bibliothèque";
ui_fr["SAVE LIBRARY EXPLAIN"] = "Sauvegarde le contenu de la bibliothèque dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE WORLD"] = "Sauvegarder le monde";
ui_fr["SAVE WORLD EXPLAIN"] = "Sauvegarde le monde dans un fichier (format json) sur votre ordinateur." + mac_user_save_files_fr;

ui_fr["ADD CONTENT TO WORLD"] = "Ajouter au monde le contenu des items indiqués ci-dessous.";
ui_fr["ADD BLOCKLY TEXT"] = "Blocs de code";
ui_fr["ADD EDITOR TEXT"] = "Code dans l'éditeur";
ui_fr["ADD LIBRARY TEXT"] = "Biblio";
ui_fr["ADD PRE TEXT"] = "Pre";
ui_fr["ADD POST TEXT"] = "Post";
ui_fr["ADD DESCRIPTION TEXT"] = "Description";
ui_fr["ADD ONLOAD TEXT"] = "Onload";

ui_fr["KEYBOARD BUTTON"] = "Clavier de Reeborg";
ui_fr["ADDITIONAL OPTIONS"] = "Autres options";

ui_fr["BASIC COMMANDS"] = "Commandes";
ui_fr["DEFINING"] = "Définitions";
ui_fr["LOOPS"] = "Boucles";
ui_fr["DECISIONS"] = "Décisions";
ui_fr["CONDITIONS"] = "Conditions";
ui_fr["USING VARIABLES"] = "Utiliser des variables";
ui_fr["COMMANDS"] = "Commandes";
ui_fr["OTHER"] = "Autres";
ui_fr["OBJECTS"] = "Objets";

ui_fr["Python Code"] = "Code Python";
ui_fr["Javascript Code"] = "Code Javascript";
ui_fr["LIBRARY"] = "biblio";
ui_fr["PRE"] = "Pre";
ui_fr["POST"] = "Post";
ui_fr["DESCRIPTION"] = "Desc.";
ui_fr["ONLOAD"] = "Onload";

ui_fr["HIGHLIGHT IMPOSSIBLE"] = "Un problème non-identifié avec votre code a fait en sorte que j'ai arrêté le surlignage du code dans l'éditeur.";
ui_fr["COMMAND RESULT"] = "Sélectionnez l'action à performer dans le menu ci-dessous.";

ui_fr["PERMALINK"] = "Permalien";
ui_fr["COPY"] = "Copier";
ui_fr["COPY PERMALINK EXPLAIN"] = "Copie le permalien dans le presse-papier.";
ui_fr["Save"] = "Sauvegarder";
ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
ui_fr["REPLACE PERMALINK"] = "Remplacer";
ui_fr["REPLACE PERMALINK EXPLAIN"] = "Remplacez le contenu ci-dessus par un nouveau permalien puis cliquez sur Remplacer.";
ui_fr["CANCEL"] = "Annuler";

ui_fr["DELETE WORLD TEXT"] = "En cliquant sur un bouton, éliminez un monde connu de la mémoire de votre nagivageur.";
ui_fr["PYTHON ONLY"] = "Python seulement";
ui_fr["COLLABORATION"] = "Collaboration";
ui_fr["TOGETHERJS EXPLAIN"] = "Outil qui permet la collaboration à distance en utilisant l'outil TogetherJS de Mozilla (interface en anglais seulement). Ne fonctionne pas avec Blockly.";
ui_fr["WORLD CREATION TITLE"] = "Monde : édition, création, ...";
ui_fr["EDIT WORLD"] = "Édition du monde";
ui_fr["EDIT WORLD EXPLAIN"] = "Vous pouvez créer vos propres mondes en modifiant un monde existant.";
ui_fr["PROGRAM IN EDITOR"] = "Programme dans l'éditeur";
ui_fr["PROGRAM IN BLOCKLY WORKSPACE"] = "Programme de blocs";
ui_fr["REVERSE STEP EXPLAIN"] = "Renverse l'instruction précédemment exécutée.";
ui_fr["CONTACT"] = "Courriel :";
ui_fr["ISSUES"] = "Rapports de bogues, suggestions, autres problèmes, etc. (en anglais ou en français seulement).";
ui_fr["FORUM"] = "Forum de discussions (en anglais ou en français seulement).";
ui_fr["HELP"] = "Aide";
ui_fr["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/fr" target="_blank" rel="noopener">Documentation</a>';
ui_fr["PYTHON HELP"] = "En utilisant Python, executez un programme avec <code>help()</code> pour obtenir une liste de commandes ou <code>help(avance)</code> pour obtenir de l'aide sur la fonction <code>avance()</code>, etc.";
ui_fr["KEYBOARD HELP"] = "Cliquez sur le clavier de Reeborg keyboard pour voir une liste des commandes, la syntaxe Python, etc.";

ui_fr["WORLD EDITOR"] = "Éditeur de monde";
ui_fr["m-east"] = "Est";
ui_fr["m-north"] = "Nord";
ui_fr["m-west"] = "Ouest";
ui_fr["m-south"] = "Sud";
ui_fr["m-random"] = "Aléatoire";
ui_fr["m-dimensions"] = "Taille du monde";
ui_fr["m-add"] = "Ajouter";
ui_fr["m-add-robot"] = "Ajouter Reeborg";
ui_fr["m-robot"] = "Robot";
ui_fr["m-position"] = "Position(s)";
ui_fr["m-turn"] = "Orientation";
ui_fr["m-objects"] = "Objets";
ui_fr["m-walls"] = "Murs";
ui_fr["m-objects2"] = "Objets";
ui_fr["m-tiles"] = "Tuiles";
ui_fr["m-fill"] = "Remplir";
ui_fr["m-solid"] = "Obstacles";
ui_fr["m-decorative"] = "Objets décoratifs";
ui_fr["m-background"] = "Image de fond";
ui_fr["m-goal"] = "But";
ui_fr["mg-robot"] = "Robot";
ui_fr["mg-walls"] = "Murs";
ui_fr["mg-objects"] = "Objets";

ui_fr["Reeborg says: I'm done!"] = "Reeborg dit : J'ai fini !";
ui_fr["Reeborg writes:"] = "Reeborg écrit :";
ui_fr["Reeborg shouts: Something is wrong!"] = "Reeborg crie: Quelque chose ne va pas !";
ui_fr["Reeborg explores some Javascript code"] = "Reeborg explore le code Javascript";
ui_fr["Reeborg states:"] = "Reeborg informe :";
ui_fr["Reeborg watches some variables!"] = "Reeborg observe des variables !";
ui_fr["Click on the world to get some additional information."] = "Cliquez sur le monde pour obtenir de l'information supplémentaire.";

ui_fr["Reeborg's basic keyboard"] = "Le clavier spécial de Reeborg";
ui_fr["kbd-command-btn"] = "Commandes";
ui_fr["kbd-condition-btn"] = "Conditions";
ui_fr["kbd-python-btn"] = "Python";
ui_fr["kbd-py-console-btn"] = "Python";
ui_fr["kbd-javascript-btn"] = "Javascript";
ui_fr["kbd-objects-btn"] = "Objets";
ui_fr["kbd-special-btn"] = "Spécial";

ui_fr["UNDO"] = "RENVERSER";
ui_fr["REDO"] = "REFAIRE";
ui_fr["tab"] = "TAB";
ui_fr["shift-tab"] = "Maj-TAB";
ui_fr["enter"] = "\u23CE";
ui_fr["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> n'est pas un véritable mot-clé Python.";

ui_fr["Colour:"] = "Couleur :";
ui_fr["Enter a colour"] = "Spécifiez une couleur";

ui_fr["Background image"] = "Image de fond";

ui_fr["NAME:"] = "Nom :";
ui_fr["Save world in browser"] = "Mémoriser une copie du monde";


ui_fr["Set the world's dimensions"] = "Dimensions du monde";
ui_fr["set-dimensions-explain"] = "Vous pouvez changer les dimensions (hauteur et largeur) du monde. Rappelez-vous que les mondes très grands pourraient être difficile à visualiser sur des écrans plus petits.";
ui_fr["Maximum x value:"] = "Valeur maximale pour 'x'";
ui_fr["Maximum y value:"] = "Valeur maximale pour 'y'";
ui_fr["Use small tiles"] = "Utilisez une petite grille";

ui_fr["Set goal number for object"] = "Nombre d'objets désirés";
ui_fr["dialog-goal-object-explain"] = "Cliquez sur la case à cocher si vous désirez que le nombre d'objet soit égal au nombre total d'objet de ce genre présent dans le monde au tout début.";
ui_fr["Number of objects"] = "Nombre d'objets";
ui_fr["All such objects"] = "Tous les objets de ce genre";

ui_fr["Number of objects:"] = "Nombre d'objets :";
ui_fr["Maximum:"] = "Maximum :";
ui_fr["Add object in the world"] = "Modifier le nombre d'objets";
ui_fr["ADD OBJECT EXPLAIN"] = "Choisissez la valeur zéro pour ne pas avoir un tel objet à cet endroit. Si <code>Maximum</code> a une valeur supérieure à <code>Nombre d'objets</code> alors un nombre aléatoire d'objets, entre ces deux valeurs, sera choisi au tout début de l'exécution d'un programme.";

ui_fr["Unlimited:"] = "Nombre illimité ";
ui_fr["Give object to robot"] = "Donner des objets à Reeborg";
ui_fr["GIVE OBJECT EXPLAIN"] = "Choisissez un nombre d'objects que Reeborg aura en sa possession au début du programme. Cliquez sur la case à cocher si vous voulez un nombre illimité.";

ui_fr["UPDATE EDITOR CONTENT"] = "Ce monde inclus un contenu pour l'éditeur qui est différent de celui qui s'y trouve présentement. Pour remplacer le contenu de l'éditeur par celui défini par le monde, cliquez sur le bouton.";
ui_fr["UPDATE EDITOR BUTTON"] = "Remplacer le contenu de l'éditeur";
ui_fr["UPDATE LIBRARY CONTENT"] = "Ce monde inclus un contenu pour la bibliothèque qui est différent de celui qui s'y trouve présentement. Pour remplacer le contenu de la bibliothèque par celui défini par le monde, cliquez sur le bouton.";
ui_fr["UPDATE LIBRARY BUTTON"] = "Remplacer le contenu de la bibliothèque";
ui_fr["UPDATE BLOCKLY CONTENT"] = "Ce monde inclus des blocs différents de ceux qui s'y trouvent présentement. Pour remplacer les blocs présents par ceux définis par le monde, cliquez sur le bouton.";
ui_fr["UPDATE BLOCKLY BUTTON"] = "Remplacer les blocs";
ui_fr["Contents from World"] = "Remplacement de contenus";

},{}],91:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_ko = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_ko = ui_ko = {};
exports.ko_to_en = ko_to_en = {};

ui_ko["ko-en"] = "혼용된 모드: 사용자 환경은 한국어로 번역되어 있지만, 프로그래밍 언어는 영어로 이루어져 있습니다. <br>" +
 "Mixed mode: User Interface in Korean; programming language in English.<br>";

ui_ko["SITE NAME"] = "리보그의 세상";
ui_ko["WORLD INFO"] = "월드 정보";
ui_ko["EDITOR VISIBLE"] = "에디터 유지하기";


ui_ko["apple"] = "사과";
ko_to_en["사과"] = "apple";
ui_ko["banana"] = "바나나";
ko_to_en["바나나"] = "banana";
ui_ko["beeper"] = "beeper";
ko_to_en["beeper"] = "beeper";
ui_ko["box"] = "상자";
ko_to_en["상자"] = "box";
ui_ko["bridge"] = "다리";
ko_to_en["다리"] = "bridge";
ui_ko["carrot"] = "당근";
ko_to_en["당근"] = "carrot";
ui_ko["daisy"] = "데이지 꽃";
ko_to_en["데이지 꽃"] = "daisy";
ui_ko["dandelion"] = "민들레";
ko_to_en["민들레"] = "dandelion";
ui_ko["leaf"] = "잎";
ko_to_en["잎"] = "leaf";
ui_ko["orange"] = "귤";
ko_to_en["귤"] = "orange";
ui_ko.square = "사각형";
ko_to_en["사각형"] = "square";
ui_ko.star = "별";
ko_to_en["별"] = "star";
ui_ko["strawberry"] = "딸기";
ko_to_en["딸기"] = "strawberry";
ui_ko.token = "토큰";
ui_en["tokens are Reeborg's favourite thing."] = "토큰 are Reeborg's favourite thing.";
ko_to_en["토큰"] = "token";
ui_ko.triangle = "삼각형";
ko_to_en["삼각형"] = "triangle";
ui_ko["tulip"] = "튤립";
ko_to_en["튤립"] = "tulip";

ui_ko["Problem with onload code."] = "유효하지 않은 자바스크립트 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";

ui_ko["Too many steps:"] = "너무 많은 steps: {max_steps}<br>Use <code>set_max_nb_instructions(nb)</code> to increase the limit.";
ui_ko["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>리보그는 올바른 x 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>리보그는 잘못된 x 위치에 있습니다. </li>";
ui_ko["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>리보그는 올바른 y 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>리보그는 잘못된 y 위치에 있습니다. </li>";
ui_ko["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>모든 객체가 올바른 위치에 있습니다. </li>";
ui_ko["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>하나 이상의 객체가 올바른 위치에 있지 않습니다.</li>";
ui_ko["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>모든 벽은 제대로 지어지고 있습니다. </li>";
ui_ko["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>하나 이상의 벽이 빠지거나 잘못된 위치에서 건설됐습니다/li>";
ui_ko["Last instruction completed!"] = "마지막 명령이 완료됐습니다!";
ui_ko["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>명령 <code>done()</code> 실행.</p>";

ui_ko["Unknown object"] = "알 수 없는 객체: <code>{obj}</code>";
ui_ko["No object found here"] = "여기서 <code>{obj}</code> 를 찾을 수 없어요!";
ui_ko["object"] = "객체";
ui_ko["I don't have any object to put down!"] = "나는 집어넣을 <code>{obj}</code> 가 없어요!";
ui_ko["There is already a wall here!"] = "벽이 여기에 이미 있어요!";
ui_en["There is no wall to remove!"] = "There is no wall to remove!";
ui_ko["Ouch! I hit a wall!"] = "아으, 아파요! 저는 벽을 부딪혔어요!";
ui_ko["Done!"] = "끝!";
ui_ko["There is no position as a goal in this world!"] = "위치에 대한 목표가 없어요!";
ui_ko["There is no goal in this world!"] = "이 월드는 목표가 없어요.";
ui_ko["I carry too many different objects. I don't know which one to put down!"] = "저는 너무 많은 다른 객체들을 싣고 있어요. 저는 이중 어떤 걸 내려놓을지 모르겠어요!";
ui_ko["Many objects are here; I do not know which one to take!"] = "많은 객체가 여기에 있어요; 저는 그 중 어떤 걸 가져갈지 모르겠어요!";

ui_ko.east = "동쪽";
ui_ko.north = "북쪽";
ui_ko.west = "서쪽";
ui_ko.south = "남쪽";
ui_ko["Unknown orientation for robot."] = "로봇의 방향을 알 수 없습니다.";

ui_en["Invalid position."] = "{pos} is an invalid position.";
ui_en["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_ko["World selected"] = "월드 {world} 가 선택되었습니다";
ui_ko["Could not find world"] = "월드를 찾을 수 없습니다. {world}";
ui_ko["Object names"] = " 라이브러리, 토큰, 별, 삼각형, 사각형, 등.";

ui_ko["Invalid world file."] = "유효하지 않은 월드 파일.";
ui_ko["Could not find link: "] = "링크를 찾을 수 없습니다: ";

ui_ko["Click on world to move robot."] = "월드를 클릭해서 추가하거나 시작 가능한 리보그 위치를 제거합니다.";
ui_ko["Added robot."] = "리보그 추가됨.";
ui_ko["Click on image to turn robot"] = "리보그를 회전하기 위해 이미지를 클릭하세요.";
ui_ko["Robot now has tokens."] = "이제 리보그는 {x_tokens} 토근을 가지고 있습니다.";
ui_ko["Click on world to add object."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Click on desired object below."] = "아래에서 원하는 개체를 클릭합니다.";
ui_ko["Click on world to toggle walls."] = "벽을 달기 위해 월드를 클락하세요.";
ui_ko["Click on world to set home position for robot."] = "로봇의 최종위치를 정하기 위해 월드를 클릭하세요.";
ui_ko["Click on world to toggle additional walls to build."] = "추가로 벽을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired goal object below."] = "아래에서 원하는 목표 객체를 클릭하세요.";
ui_ko["Click on world to set number of goal objects."] = "<code>{obj}</code>의 목표를 설정하기 위해 객체를 클릭하세요.";
ui_ko["Enter number of tokens for robot to carry (use inf for infinite number)"] = "싣고 갈 토큰의 수를 입력하세요.";
ui_ko[" is not a valid value!"] = " 유효하지 않은 값입니다!";
ui_ko["Enter number of objects desired at that location."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Objects found here:"] = "객체를 여기서 찾음:";
ui_ko["Description"] = "설명";
ui_ko["A robot located here carries no objects."] = "로봇은 {x},{y}에 위치해 있고 싣고 있는 객체는 없습니다.";
ui_ko["Goal to achieve:"] = "목표 달성:";
ui_ko["A robot located here carries:"] = "로봇은 {x},{y}에 위치해 있습니다. 싣고 있는 객체:";
ui_ko["random location"] = "무작위 위치";
ui_ko["Enter number of objects to give to robot."] = "로봇에게 주기 위해 <code>{obj}</code> 의 수를 입력하세요..";
ui_ko["Special information about this location:"] = "이 위치에 대한 특별한 정보:";
ui_ko["Click on world to toggle tile."] = "<code>{obj}</code> 타일을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired tile below."] = "아래에서 원하는 타일을 클릭합니다. (or color selector)";
ui_ko["mud"] = "진흙";
ui_ko["water"] = "물";
ui_ko["grass"] = "잔디";
ui_ko["gravel"] = "자갈";
ui_ko["ice"] = "얼음";
ui_ko["A wall must be built east of this location."] = "벽은 이 위치의 동쪽에 지어져야 합니다.";
ui_ko["A wall must be built north of this location."] = "벽은 이 위치의 북쪽에 지어져야 합니다.";
ui_ko["A wall must be built west of this location."] = "벽은 이 위치의 서쪽에 지어져야 합니다.";
ui_ko["A wall must be built south of this location."] = "벽은 이 위치의 남쪽에 지어져야 합니다.";
ui_ko["The final required position of the robot will be chosen at random."] = "로봇의 마지막으로 필요한 위치가 무작위로 선택됩니다.";
ui_ko["The final position of the robot must be (x, y) = "] = "로봇의 최종위치는 반드시 (x, y) = ";
ui_ko["Click on world to fill with given tile."] = "주어진 타일을 채우기 위해 월드를 클릭합니다.";
ui_ko["Click on desired object below."] = "아래에서 원하는 객체를 클릭합니다.";
ui_ko["Enter url of image to use as background."] = "배경화면으로 쓰일 이미지나 이미지 주소를 입력해 주세요.";
ui_ko["Replace editor content"] = "당신의 이 월드의 제작자에 의해 제공되는 에디터 코드를 대체 하고 싶나요?";
ui_ko["Replace library content"] = "당신은 이 월드의 제작자에 의해 제공되는 라이브러리 코드를 대체 하고 싶나요?";
ui_ko["colour"] = "색";

ui_ko["Name already exist; confirm that you want to replace its content."] = "이름이 이미 존재합니다; 당신이 내용을 교체하고 싶으면 확인합니다.";
ui_ko["No such world!"] = "월드가 존재하지 않습니다!";
ui_ko["Enter world name to save"] = "월드를 저장하기 위해 월드 이름을 입력해주세요; 사용될 이름: ";
ui_ko["Enter world name to delete"] = "월드를 삭제하기 위해 월드 이름을 입력 해주세요; 기존 세계: ";
ui_ko["Delete "] = "삭제 ";

ui_ko["Error found at or near line {number}."] = "오류를 발견했습니다 혹은 라인 근처에서 발견됬습니다. : {number}.";
ui_ko["<br>Perhaps a missing colon is the cause."] = "<br>아마도 콜론(:)을 놓쳐서 문제가 발생했을 겁니다.";
ui_ko["<br>Perhaps you forgot to add parentheses ()."] = "<br>아마도 당신은 괄호를 추가하는 것을 잊어버렸을 겁니다 ().";
ui_ko["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>아마도 당신은 단어의 철자나 함수를 정의하는것을 잊었거나 변수를 까먹었을 겁니다.";
ui_ko["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_ko["I'm stuck in mud."] = "난 진흙에 걸렸어요.";
ui_ko["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "진흙: 리보그는 이것을 탐지 <b>하지 못하고<b> 이 위치로 이동하게 되면 걸리게 됩니다.";
ui_ko["I'm slipping on ice!"] = "저는 얼음에 미끄러지고 있어요!";
ui_ko["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "얼음: 리보그는 이것을 탐지 <b>하지 못하고</b> 만약 이 위치로 이동하게 되면 미끄러지고 다음 위치로 이동하게 됩니다.";
ui_ko["Grass: usually safe."] = "잔디: 보통 안전함.";
ui_ko["Gravel: usually safe."] = "자갈: 보통 안전함.";
ui_ko["I'm in water!"] = "난 물 속에 있어요!";
ui_ko["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "물: 리보그는 이것을 탐지 할 수 <b>있지만</b> 이 위치로 이동하는 경우 상처를 입히게 됩니다.";
ui_ko["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: 리보그는 at_goal 를 사용하면 이 타일을 감지 할 수 <b>있어요<b>.";
ui_ko["Crash!"] = "Crash!";
ui_ko["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "벽돌 벽: 리보그는 이것을 탐지 할 수 있지만 만약 벽돌 벽으로 간다면 자신을 다치게 합니다.";
ui_ko["I hit a fence!"] = "I hit a fence!";
ui_ko["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "울타리: 리보그는 이것을  <b>can</b> 탐지 할 수 있지만 그것에 의해 중지됩니다.";
ui_ko["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "리보그는 이것을 탐지 할 수 <b>있으며</b> 이 물 위에서 안전한 통행을 허용하는것을 알게 될 것입니다.";

ui_ko["Something is blocking the way!"] = "뭔가가 길을 막고 있어요!";
ui_ko["Reeborg <b>can</b> detect this tile using at_goal()."] = "리보그는 at_goal() 를 사용해서 탐지 할 수 <b>있어요</b>.";
ui_ko["green home tile:"] = "초록색 홈 타일:";
ui_ko["home:"] = "홈:";
ui_ko["racing flag:"] = "레이싱 깃발:";
ui_ko["house:"] = "집:";

ui_ko["fence_right"] = "울타리";
ui_ko["fence_left"] = "울타리";
ui_ko["fence_double"] = "울타리";
ui_ko["fence_vertical"] = "울타리";

ui_ko["Local variables"] = "지역 변수";
ui_ko["Global variables"] = "전역 변수";
ui_ko["Watched expressions"] = "문장 결과 보기";

ui_ko["move forward"] = "앞으로 움직이기";
ui_ko["turn left"] = "왼쪽으로 움직이기";
ui_ko["take object"] = "객체 가지기";
ui_ko["put object"] = "객체 넣기";
ui_ko["Pause the program's execution."] = "프로그램 일시 정지.";
ui_ko["Build a wall in front of the robot."] = "벽을 로봇 앞에 짓기.";
ui_ko["End the program's execution."] = "프로그램 실행 종료.";
ui_ko["True if a wall is blocking the way."] = "벽이 길을 막고 있는 경우가 사실이라면.";
ui_ko["True if nothing is blocking the way."] = "아무것도 차단 하지 않는 경우가 사실이라면.";
ui_ko["True if desired destination."] = "원하는 목적지가 있는 경우가 사실이라면";
ui_ko["True if robot carries at least one object."] = "로봇이 적어도 하나의 객체를 싣고 있는 경우가 사실이라면.";
ui_ko["True if there is at least one object here."] = "적어도 하나의 객체가 여기에 있는 경우가 사실이라면.";
ui_ko["True if robot is facing North."] = "만약 로봇이 북쪽을 바라보고 있는 경우가 사실이라면.";
ui_ko["Delay between actions; default is 300 ms."] = "행동을 지연시킵니다; 기본값은 300 밀리초.";

ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";
ui_ko["Save permalink"] = "퍼머 저장";
ui_ko["Save permalink explanation"] = "파일의 퍼머링크 복사본을 저장하기";
ui_ko["LOAD BLOCKLY"] = "프로그램(블럭들)을 파일에서 불러오기";
ui_ko["LOAD BLOCKLY EXPLAIN"] = "로컬 파일을 열고 Blockly 작업공간의 요소 대신에 이 요소를 사용합니다";
ui_ko["LOAD EDITOR"] = "파일로 불러오기";
ui_ko["LOAD EDITOR EXPLAIN"] = "로컬 저장소에서 소스코드 불러오기";
ui_ko["LOAD LIBRARY"] = "파일에서 라이브러리를 가져오기";
ui_ko["LOAD LIBRARY EXPLAIN"] = "파일을 열고 라이브러리의 컨텐츠를 지금 사용합니다.";
ui_ko["LOAD WORLD"] = "파일로 불러오기";
ui_ko["LOAD WORLD EXPLAIN"] = "컴퓨터안의 파일로 월드를 불러오기";
ui_ko["SAVE BLOCKLY"] = "Save program to file";
ui_ko["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_ko;
ui_ko["SAVE EDITOR"] = "파일로 저장";
ui_ko["SAVE EDITOR EXPLAIN"] = "에디터 소스코드 저장" + mac_user_save_files_ko;
ui_ko["SAVE LIBRARY"] = "라이브러리 저장";
ui_ko["SAVE LIBRARY EXPLAIN"] = "파일 라이브러리의 내용 저장" + mac_user_save_files_ko;
ui_ko["SAVE WORLD"] = "파일로 저장";
ui_ko["SAVE WORLD EXPLAIN"] = "(json 확장자) 월드를 컴퓨터에 저장" + mac_user_save_files_ko;

ui_ko["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_ko["ADD BLOCKLY TEXT"] = "Code blocks";
ui_ko["ADD EDITOR TEXT"] = "Code in editor";
ui_ko["ADD LIBRARY TEXT"] = "Library";
ui_ko["ADD PRE TEXT"] = "Pre";
ui_ko["ADD POST TEXT"] = "Post";
ui_ko["ADD DESCRIPTION TEXT"] = "Description";
ui_ko["ADD ONLOAD TEXT"] = "Onload";

ui_ko["KEYBOARD BUTTON"] = "리보그의 키보드";
ui_ko["ADDITIONAL OPTIONS"] = "추가 설정";

ui_ko["BASIC COMMANDS"] = "기본적인 명령어";
ui_ko["DEFINING"] = "정의";
ui_ko["LOOPS"] = "루프";
ui_ko["DECISIONS"] = "결정";
ui_ko["CONDITIONS"] = "상태";
ui_ko["USING VARIABLES"] = "변수 사용하기";
ui_ko["COMMANDS"] = "명령어들";
ui_ko["OTHER"] = "그 외";
ui_ko["OBJECTS"] = "객체들";

ui_ko["Python Code"] = "파이썬 코드";
ui_ko["Javascript Code"] = "자바스크립트 코드";
ui_ko["LIBRARY"] = "라이브러리";
ui_ko["PRE"] = "전에";
ui_ko["POST"] = "후";
ui_ko["DESCRIPTION"] = "월드 정보";
ui_ko["ONLOAD"] = "Onload";

ui_ko["HIGHLIGHT IMPOSSIBLE"] = "구문 강조를 꺼서 문제가 발생했습니다.";
ui_ko["COMMAND RESULT"] = "아래 메뉴에서 수행할 작업을 선택합니다.";

ui_ko["PERMALINK"] = "퍼머링크";
ui_ko["COPY"] = "복사";
ui_ko["COPY PERMALINK EXPLAIN"] = "퍼머링크를 클립보드로 복사하기.";
ui_ko["Save"] = "저장";
ui_ko["Save permalink explanation"] = "퍼머링크의 복사본을 파일로 저장합니다.";
ui_ko["REPLACE PERMALINK"] = "되돌리기";
ui_ko["REPLACE PERMALINK EXPLAIN"] = "위의 내용을 퍼머링크로 교체하고 교체를 클릭합니다.";
ui_ko["CANCEL"] = "취소";

ui_ko["DELETE WORLD TEXT"] = "버튼을 클릭하면 브라우져의 메모리에 저장된 월드를 제거합니다:";
ui_ko["PYTHON ONLY"] = "파이썬 전용";
ui_ko["COLLABORATION"] = "협업";
ui_ko["TOGETHERJS EXPLAIN"] = "다른 사용자는 Mozilla의 TogetherJS를 이용하여 협업에 참여 할 수 있습니다.  (Does not work with Blockly.)";
ui_ko["WORLD CREATION TITLE"] = "월드 : 창조, 수정..";
ui_ko["EDIT WORLD"] = "월드 수정";
ui_ko["EDIT WORLD EXPLAIN"] = "기존 월드를 수정하여 자신 만의 월드를 만들 수 있습니다.";
ui_ko["PROGRAM IN EDITOR"] = "에디터";
ui_ko["PROGRAM IN BLOCKLY WORKSPACE"] = "blockly 작업 공간 프로그램";
ui_ko["REVERSE STEP EXPLAIN"] = "이전 실행 상태를 되돌립니다.";
ui_ko["CONTACT"] = "(English/French only) 이메일:";
ui_ko["ISSUES"] = "버그 제보, 건의 그외 문제 등. (영어/프랑스어만 됨)";
ui_ko["FORUM"] = "토론 포럼 (영어/프랑스어만 됨";
ui_ko["HELP"] = "도움말";
ui_ko["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/ko" target="_blank" rel="noopener">Documentation (참고 문서)</a>';
ui_ko["PYTHON HELP"] = "파이썬을 사용해서, <code>help()</code>를 실행해서 명령어의 목록을 얻으세요 또는 <code>help(함수명)</code>으로 해당 <code>함수명()</code>의 정보를 확인할 수 있습니다. 예를 들어, <code>help(move)</code>로 <code>move</code>함수의 정보를 얻을 수 있습니다.";
ui_ko["KEYBOARD HELP"] = "리보그의 키보드를 클릭해서 파이썬 키워드 등, 사용할수 있는 명령어의 목록을 보세요.";

ui_ko["WORLD EDITOR"] = "월드 편집기";
ui_ko["m-east"] = "동쪽";
ui_ko["m-north"] = "북쪽";
ui_ko["m-west"] = "서쪽";
ui_ko["m-south"] = "남쪽";
ui_ko["m-random"] = "랜덤";
ui_ko["m-dimensions"] = "월드 크기";
ui_ko["m-add"] = "추가";
ui_ko["m-add-robot"] = "로봇 추가";
ui_ko["m-robot"] = "로봇";
ui_ko["m-position"] = "위치(들)";
ui_ko["m-turn"] = "회전";
ui_ko["m-objects"] = "객체";
ui_ko["m-walls"] = "벽";
ui_ko["m-objects2"] = "객체";
ui_ko["m-tiles"] = "타일들";
ui_ko["m-fill"] = "체우기";
ui_ko["m-solid"] = "특정 객체";
ui_ko["m-decorative"] = "꾸미기용 객체";
ui_ko["m-background"] = "배경 사진";
ui_ko["m-goal"] = "목표";
ui_ko["mg-robot"] = "로봇";
ui_ko["mg-walls"] = "벽";
ui_ko["mg-objects"] = "객체";

ui_ko["Reeborg says: I'm done!"] = "리보그 : 다했어요";
ui_ko["Reeborg writes:"] = "리보그 쓰기:";
ui_ko["Reeborg shouts: Something is wrong!"] = "리보그 : 뭔가가 잘못 됬어요!";
ui_ko["Reeborg explores some Javascript code"] = "리보그는 일부 자바스크립트 코드를 조사했습니다";
ui_ko["Reeborg states:"] = "리보그 상태:";
ui_ko["Reeborg watches some variables!"] = "리보그는 몇가지의 변수를 보고 있습니다!";
ui_ko["Click on the world to get some additional information."] = "추가 정보를 얻기 위해 월드를 클릭합니다.";

ui_ko["Reeborg's basic keyboard"] = "리보그의 기본적인 키보드";
ui_ko["kbd-command-btn"] = "명령어";
ui_ko["kbd-condition-btn"] = "상태";
ui_ko["kbd-python-btn"] = "파이썬";
ui_ko["kbd-py-console-btn"] = "파이썬";
ui_ko["kbd-javascript-btn"] = "자비스크립트";
ui_ko["kbd-objects-btn"] = "객체";
ui_ko["kbd-special-btn"] = "특수키";

ui_ko["UNDO"] = "되돌리기";
ui_ko["REDO"] = "다시 실행";
ui_ko["tab"] = "TAB";
ui_ko["shift-tab"] = "Shift-TAB";
ui_ko["enter"] = "\u23CE";
ui_ko["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>는 여기에서만 작동하는 파이썬 키워드입니다.";

ui_ko["Colour:"] = "색상:";
ui_ko["Enter a colour"] = "색상을 입력하세요";

ui_ko["Background image"] = "배경 이미지";

ui_ko["NAME:"] = "이름:";
ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";


ui_ko["Set the world's dimensions"] = "월드의 크기를 조절하세요";
ui_ko["set-dimensions-explain"] = "원하는 경우 월드의 기본 크기를 다르게 설정할 수 있습니다. 작은 해상도의 화면은 매우 큰 세계를 볼수 없음을 기억하세요.";
ui_ko["Maximum x value:"] = "최대 x 값:";
ui_ko["Maximum y value:"] = "최대 y 값:";
ui_ko["Use small tiles"] = "작은 타일 사용하기";

ui_ko["Set goal number for object"] = "객체의 목표 수를 설정합니다.";
ui_ko["dialog-goal-object-explain"] = "체크박스를 클릭하세요. 월드가 시작될때 당신의 원하는 객체의 모든 숫자가 보입니다.";
ui_ko["Number of objects"] = "객체의 수:";
ui_ko["All such objects"] = "모든 종류의 객체";

ui_ko["Number of objects:"] = "객체의 수:";
ui_ko["Maximum:"] = "최대 값:";
ui_ko["Add object in the world"] = "Set number of object";
ui_ko["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_ko["Unlimited:"] = "Unlimited:";
ui_ko["Give object to robot"] = "Give object to robot";
ui_ko["GIVE OBJECT EXPLAIN"] = "로봇이 운반 할 객체의 수를 고르세요. 더 많은 수를 원한다면 체크박스를 클릭하세요.";

ui_ko["UPDATE EDITOR CONTENT"] = "This world has some default content for the editor. To replace the current content of your editor, click on the button";
ui_ko["UPDATE EDITOR BUTTON"] = "Replace editor content";
ui_ko["UPDATE LIBRARY CONTENT"] = "This world has some default content for the library. To replace the current content of your library, click on the button";
ui_ko["UPDATE LIBRARY BUTTON"] = "Replace library content";
ui_ko["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_ko["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_ko["Contents from World"] = "Contents from World";

},{}]},{},[15]);
