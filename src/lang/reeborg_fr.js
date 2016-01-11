/* See reeborg_en.js */
var RUR = RUR || {};

var RobotUsage;

RUR.reset_definitions = function () {

    window.au_but = RUR._at_goal_;
    window.construit_un_mur = RUR._build_wall_;
    window.transporte = RUR._carries_object_;
    window.robot_par_defaut = function () {
        var r = Object.create(RobotUsage.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.termine = RUR.control.done;
    window.rien_devant = RUR._front_is_clear_;
    window.est_face_au_nord = RUR._is_facing_north_;
    window.dans_le_sac = RUR._in_the_bag_;
    window.avance = RUR._move_;

    mur_devant = RUR._wall_in_front_;
    window.nouvelles_images_de_robot = function (image) {
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
    window.pause = RUR.control.pause;
    window.print_html = RUR.output.print_html;
    window.depose = RUR._put_;
    window.enregistrement = RUR._recording_;
    window.plus_de_robots = RUR._remove_robots_;
    window.rien_a_droite = RUR._right_is_clear_;
    window.nombre_de_robots = RUR._set_max_nb_robots_;
    window.nombre_d_instructions = RUR._set_max_steps_;
    window.son = RUR.control.sound;
    window.prend = RUR._take_;
    window.pense = RUR.control.think;
    window.tourne_a_gauche = RUR._turn_left_;
    window.voir_source_js = RUR._view_source_js_;
    window.mur_devant = RUR._wall_in_front_;
    window.mur_a_droite = RUR._wall_on_right_;
    window.ecrit = RUR.output.write;
    window._write = RUR.output._write;
    window.Monde = RUR.file_io.load_world_from_program;

    // The following are for OOP programming in Javascript
    RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        RUR.control.at_goal(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR.control.build_wall(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        RUR.control.front_is_clear(this.body);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR.control.wall_in_front(this.body);
    };


    RobotUsage.prototype.transporte = function () {
        RUR.control.carries_object(this.body);
    };

    RobotUsage.prototype.dans_le_sac = function () {
        RUR.control.in_the_bag(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        RUR.control.is_facing_north(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR.control.move(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR.control.set_model(this.body, model);
    };

    RobotUsage.prototype.depose = function () {
        RUR.control.put(this.body);
    };


    RobotUsage.prototype.rien_a_droite = function () {
        RUR.control.right_is_clear(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        RUR.control.wall_on_right(this.body);
    };


    RobotUsage.prototype.objet_ici = function (obj) {
        RUR.control.object_here(this.body, obj);
    };

    RobotUsage.prototype.prend = function () {
        RUR.control.take(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR.control.turn_left(this.body);
    };
};

RUR.reset_definitions();
