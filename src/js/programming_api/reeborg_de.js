require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_de = function () {

    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.ist_am_ziel = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.baue_wand = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.traegt_objekt = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.farbe_hier = UsedRobot.prototype.color_here;

    UsedRobot.prototype.ist_vorne_frei = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.ist_norden = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.schritt = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.ist_objekt_hier = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.male_zelle = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.gib_koordinaten = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.gib_koordinaten_vorne = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.hinlegen = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.hinwerfen = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.ist_rechts_frei = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_modell = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.setze_spur_farbe = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.setze_spur_stil = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.nimm = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.drehe_links = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.ist_wand_vorne = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.ist_wand_rechts = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;

    const API = {

        ist_am_ziel : RUR._at_goal_,
        baue_wand : RUR._build_wall_,
        hat_objekt : RUR._carries_object_,
        gib_farbe : RUR._color_here_,
        standard_roboter : function () {
            var r = Object.create(UsedRobot.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        beenden : RUR._done_,
        ist_vorne_frei : RUR._front_is_clear_,
        ist_norden : RUR._is_facing_north_,
        schritt : RUR._move_,
        neues_roboter_bild : RUR._new_robot_images_,
        ist_objekt_hier : RUR._object_here_,
        pause : RUR._pause_,
        male_zelle : RUR._paint_square_,
        gib_koordinaten : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        gib_koordinaten_vorne : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        drucke_html : RUR._print_html_,
        hinlegen : RUR._put_,
        hinwerfen : RUR._toss_,
        setze_aufnahme : RUR._recording_,
        entferne_roboter : RUR._remove_robots_,
        ist_rechts_frei : RUR._right_is_clear_,
        setze_max_anzahl_instruktionen : RUR._set_max_nb_steps_,
        setze_spur_farbe : RUR._set_trace_color_,
        ton_an : RUR._sound_,
        nimm : RUR._take_,
        denke : RUR._think_,
        drehe_links : RUR._turn_left_,
        ist_wand_vorne : RUR._wall_in_front_,
        ist_wand_rechts : RUR._wall_on_right_,
        gibaus : RUR._write_,
        gibaus_zeile : RUR._write_ln,
        ErstelleEigenesMenu : RUR._MakeCustomMenu_,
        Welt : RUR._World_
    }
    Object.assign(window, API);
    return API;


};
