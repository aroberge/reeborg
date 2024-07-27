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
            RobotWUzyciu.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            RobotWUzyciu.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_pl = function () {

    var RobotWUzyciu = window.RobotWUzyciu = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    RobotWUzyciu.prototype.u_celu = function () {
        return RUR._UR.at_goal_(this.body);
    };

    RobotWUzyciu.prototype.wybuduj_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotWUzyciu.prototype.obiekt_niesiony = function () {
        return RUR._UR.carries_object_(this.body);
    };

    RobotWUzyciu.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    RobotWUzyciu.prototype.colour_here = RobotWUzyciu.prototype.color_here;

    RobotWUzyciu.prototype.droga_wolna = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    RobotWUzyciu.prototype.skierowany_na_polnoc = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    RobotWUzyciu.prototype.ruch = function () {
        RUR._UR.move_(this.body);
    };

    RobotWUzyciu.prototype.wykryto_obiekt = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    RobotWUzyciu.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    RobotWUzyciu.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    RobotWUzyciu.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    RobotWUzyciu.prototype.odloz = function () {
        RUR._UR.put_(this.body);
    };
    RobotWUzyciu.prototype.toss = function () {
        RUR._UR.toss_(this.body);
    };

    RobotWUzyciu.prototype.prawo_wolne = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    RobotWUzyciu.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotWUzyciu.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotWUzyciu.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotWUzyciu.prototype.wez = function () {
        RUR._UR.take_(this.body);
    };


    RobotWUzyciu.prototype.obrot_w_lewo = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotWUzyciu.prototype.mur_z_przodu = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    RobotWUzyciu.prototype.mur_po_prawej = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = RobotWUzyciu;
    
    const API = {
        u_celu : RUR._at_goal_,
        wybuduj_mur : RUR._build_wall_,
        obiekt_niesiony : RUR._carries_object_,
        color_here : RUR._color_here_,
        colour_here : RUR._color_here_,
        default_robot : function () {
            var r = Object.create(RobotWUzyciu.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        skonczone : RUR._done_,
        droga_wolna : RUR._front_is_clear_,
        skierowany_na_polnoc : RUR._is_facing_north_,
        ruch : RUR._move_,
        new_robot_images : RUR._new_robot_images_,
        wykryto_obiekt : RUR._object_here_,
        pauza : RUR._pause_,
        paint_square : RUR._paint_square_,
        position_here : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        position_in_front : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]]
            } else {
                return undefined
            }
        },
        print_html : RUR._print_html_,
        odloz : RUR._put_,
        toss : RUR._toss_,
        recording : RUR._recording_,
        remove_robots : RUR._remove_robots_,
        prawo_wolne : RUR._right_is_clear_,
        set_max_nb_steps : RUR._set_max_nb_steps_,
        set_trace_color : RUR._set_trace_color_,
        dzwiek : RUR._sound_,
        wez : RUR._take_,
        mysl : RUR._think_,
        obrot_w_lewo : RUR._turn_left_,
        mur_z_przodu : RUR._wall_in_front_,
        mur_po_prawej : RUR._wall_on_right_,
        napisz : RUR._write_,
        writeln : RUR._write_ln,
        MakeCustomMenu : RUR._MakeCustomMenu_,
        swiat : RUR._World_
    }
    Object.assign(window, API);
    return API;
};
