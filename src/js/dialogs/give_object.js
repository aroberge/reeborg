require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");

require("./../drawing/visible_world.js");
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
        query = "infinite";
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


/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 *
 * @param {string} obj The name of the object type ; e.g. "token"
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 * @param {robot.body} [robot_body]
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

    _nb = RUR.utils.filterInt(nb); // required for the menu-driven world editor
    if (_nb == "infinite") {
        robot.objects[obj] = _nb;
    } else if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-failure", nb + RUR.translate(" is not a valid value!"));
    }
};
