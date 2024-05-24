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
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_lt = function () {

    window.prie_tikslo = RUR._at_goal_;
    window.statyti_sieną = RUR._build_wall_;
    window.neša_objektą = RUR._carries_object_;
    window.color_here = RUR._color_here_;
    window.colour_here = RUR._color_here_;
    window.default_robot = function () {
        var r = Object.create(NaudojamasRobotas.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.baigti = RUR._done_;
    window.priekyje_laisva = RUR._front_is_clear_;
    window.pasisukęs_šiaurėn = RUR._is_facing_north_;
    window.pirmyn = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.aptiktas_objektas = RUR._object_here_;
    window.pauzė = RUR._pause_;
    window.paint_square = RUR._paint_square_;
    window.position_here = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.position_in_front = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.print_html = RUR._print_html_;
    window.padėti = RUR._put_;
    window.mesti = RUR._toss_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.dešinėje_laisva = RUR._right_is_clear_;
    window.set_max_nb_steps = RUR._set_max_nb_steps_;
    window.set_trace_color = RUR._set_trace_color_;
    window.garsas = RUR._sound_;
    window.paimti = RUR._take_;
    window.galvoti = RUR._think_;
    window.suktis_kairėn = RUR._turn_left_;
    window.priekyje_siena = RUR._wall_in_front_;
    window.dešinėje_siena = RUR._wall_on_right_;
    window.rašyti = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.Pasaulis = RUR._World_;


    var NaudojamasRobotas = window.NaudojamasRobotas = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    NaudojamasRobotas.prototype.prie_tikslo = function () {
        return RUR._UR.at_goal_(this.body);
    };

    NaudojamasRobotas.prototype.statyti_sieną = function () {
        RUR._UR.build_wall_(this.body);
    };

    NaudojamasRobotas.prototype.neša_objektą = function () {
        return RUR._UR.carries_object_(this.body);
    };

    NaudojamasRobotas.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    NaudojamasRobotas.prototype.colour_here = NaudojamasRobotas.prototype.color_here;

    NaudojamasRobotas.prototype.priekyje_laisva = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    NaudojamasRobotas.prototype.pasisukęs_šiaurėn = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    NaudojamasRobotas.prototype.pirmyn = function () {
        RUR._UR.move_(this.body);
    };

    NaudojamasRobotas.prototype.aptiktas_objektas = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    NaudojamasRobotas.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    NaudojamasRobotas.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    NaudojamasRobotas.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    NaudojamasRobotas.prototype.padėti = function () {
        RUR._UR.put_(this.body);
    };
    NaudojamasRobotas.prototype.mesti = function () {
        RUR._UR.toss_(this.body);
    };

    NaudojamasRobotas.prototype.dešinėje_laisva = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    NaudojamasRobotas.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    NaudojamasRobotas.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    NaudojamasRobotas.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    NaudojamasRobotas.prototype.paimti = function () {
        RUR._UR.take_(this.body);
    };


    NaudojamasRobotas.prototype.suktis_kairėn = function () {
        RUR._UR.turn_left_(this.body);
    };

    NaudojamasRobotas.prototype.priekyje_siena = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    NaudojamasRobotas.prototype.dešinėje_siena = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = NaudojamasRobotas;

};
