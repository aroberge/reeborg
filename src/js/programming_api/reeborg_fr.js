require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_fr = function () {

    // The following are for OOP programming in Javascript
    var RobotUsage = window.RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        return RUR._UR.at_goal_(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotUsage.prototype.transporte = function () {
        return RUR._UR.carries_object_(this.body);
    };

    RobotUsage.prototype.couleur_ici = function() {
        return RUR._UR.color_here_(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR._UR.move_(this.body);
    };

    RobotUsage.prototype.objet_ici = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    RobotUsage.prototype.position_ici = function () {
        return [this.body.x, this.body.y];
    };

    RobotUsage.prototype.position_ici = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    RobotUsage.prototype.colorie = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    RobotUsage.prototype.depose = function () {
        RUR._UR.put_(this.body);
    };

    RobotUsage.prototype.lance = function () {
        RUR._UR.toss_(this.body);
    };

    RobotUsage.prototype.rien_a_droite = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR._UR.set_model_(this.body, model);
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
        return RUR._UR.wall_in_front_(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = RobotUsage;

    const API = {

        au_but : RUR._at_goal_,
        construit_un_mur : RUR._build_wall_,
        transporte : RUR._carries_object_,
        couleur_ici : RUR._color_here_,
        robot_par_defaut : function () {
            var r = Object.create(RobotUsage.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        termine : RUR._done_,
        rien_devant : RUR._front_is_clear_,
        est_face_au_nord : RUR._is_facing_north_,
        avance : RUR._move_,

        mur_devant : RUR._wall_in_front_,
        nouvelles_images_de_robot : function (images) {
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
        },
        objet_ici : RUR._object_here_,
        colorie : RUR._paint_square_,
        couleur_de_trace : RUR._set_trace_color_,
        pause : RUR._pause_,
        print_html : RUR._print_html_,
        depose : RUR._put_,
        dépose : RUR._put_,
        lance : RUR._toss_,
        enregistrement : RUR._recording_,
        plus_de_robots : RUR._remove_robots_,
        rien_a_droite : RUR._right_is_clear_,
        rien_à_droite : RUR._right_is_clear_,
        max_nb_instructions : RUR._set_max_nb_steps_,
        son : RUR._sound_,
        prend : RUR._take_,
        pense : RUR._think_,
        position_ici : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        position_devant : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        tourne_a_gauche : RUR._turn_left_,
        tourne_à_gauche : RUR._turn_left_,
        mur_devant : RUR._wall_in_front_,
        mur_a_droite : RUR._wall_on_right_,
        mur_à_droite : RUR._wall_on_right_,
        ecrit : RUR._write_,
        writeln : RUR._write_ln,
        MenuPersonnalise : RUR._MakeCustomMenu_,
        MakeCustomMenu : RUR._MakeCustomMenu_,
        Monde : RUR._World_
    }
    Object.assign(window, API);
    return API;
};
