require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

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
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_en = function () {

    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    UsedRobot.prototype.colour_here = UsedRobot.prototype.color_here;

    UsedRobot.prototype.front_is_clear = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.put = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.toss = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.take = function () {
        RUR._UR.take_(this.body);
    };

    UsedRobot.prototype.turn_left = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;

    const API = {
        at_goal : RUR._at_goal_,
        build_wall : RUR._build_wall_,
        carries_object : RUR._carries_object_,
        color_here : RUR._color_here_,
        colour_here : RUR._color_here_,
        default_robot : function () {
            var r = Object.create(UsedRobot.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        done : RUR._done_,
        front_is_clear : RUR._front_is_clear_,
        is_facing_north : RUR._is_facing_north_,
        move : RUR._move_,
        new_robot_images : RUR._new_robot_images_,
        object_here : RUR._object_here_,
        pause : RUR._pause_,
        paint_square : RUR._paint_square_,
        position_here : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        position_in_front : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        print_html : RUR._print_html_,
        put : RUR._put_,
        toss : RUR._toss_,
        recording : RUR._recording_,
        remove_robots : RUR._remove_robots_,
        right_is_clear : RUR._right_is_clear_,
        set_max_nb_steps : RUR._set_max_nb_steps_,
        set_trace_color : RUR._set_trace_color_,
        sound : RUR._sound_,
        take : RUR._take_,
        think : RUR._think_,
        turn_left : RUR._turn_left_,
        wall_in_front : RUR._wall_in_front_,
        wall_on_right : RUR._wall_on_right_,
        write : RUR._write_,
        writeln : RUR._write_ln,
        MakeCustomMenu : RUR._MakeCustomMenu_,
        World : RUR._World_
    }
    Object.assign(window, API);

    // English specific and only for compatibility with rur-ple
    // do not translate the following
    window.put_beeper = API.put;
    window.pick_beeper = API.take;
    window.turn_off = API.done;
    window.on_beeper = API.object_here;
    window.next_to_a_beeper = API.object_here;
    window.carries_beepers = API.carries_object;
    window.set_delay = API.think;
    window.facing_north = API.is_facing_north;

    return API;
};
