/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri, ReeborgError */

var RUR = RUR || {};

//required for lint.js
var globals_ = "/*globals avance, tourne_a_gauche, RUR, examine, RobotUsage, ReeborgError, rien_devant, rien_a_droite, "+
                    " face_au_nord, termine, depose, prend, objet_ici, Monde, Permalien,"+
                    "transporte, ecrit, au_but, au_but_orientation, narration," +
                    " construit_un_mur, pense, pause, repete, voir_source, son, confirmer */\n";

var avance, tourne_a_gauche, examine, rien_devant, rien_a_droite,
    face_au_nord, termine, depose, prend, objet_ici, Monde, Permalien,
    transporte, ecrit, au_but, construit_un_mur, pense, narration,
    pause, repete, voir_source, son, RobotUsage,
    nombre_de_commandes, confirmer;

RUR.confirmer = function(test) {
    var reeborg, robots, monde, orientation;
    var est, nord, sud, ouest;
    var js_test;
    est = RUR.EAST;
    ouest = RUR.WEST;
    nord = RUR.NORTH;
    sud = RUR.SOUTH;
    monde = RUR.current_world;
    robots = monde.robots;
    reeborg = robots[0];
    orientation = reeborg.orientation;

    // if language is Python ... require spaces around logical operators to simplify
    js_test = test.replace(/ and /g, '&&');
    js_test = js_test.replace(/ or /g, '||');
    js_test = js_test.replace(/ not /g, '!');
    // True and False should not necessary to use ... but just in case
    js_test = js_test.replace(/False/g, 'false');
    js_test = js_test.replace(/True/g, 'true');

    if (eval(js_test)){ // jshint ignore:line
        return;
    }
    throw ReeborgError("Échec : <br>"+test);
};

RUR.reset_definitions = function () {
    // defined above
    confirmer = RUR.confirmer;
    // robot commands - defined in commands.js
    au_but = RUR._at_goal_;
    construit_un_mur = RUR._build_wall_;
    rien_devant = RUR._front_is_clear_;
    transporte = RUR._carries_object_;
    face_au_nord = RUR._is_facing_north_;
    avance = RUR._move_;
    depose = RUR._put_;
    rien_a_droite = RUR._right_is_clear_;
    objet_ici = RUR._object_here_;
    prend = RUR._take_;
    tourne_a_gauche = RUR._turn_left_;
    repete = RUR._repeat_;
    nombre_de_commandes = RUR._set_max_steps_;
    // utilities - defined in rur_utils.js
    examine = RUR.inspect;
    voir_source = RUR.view_source;
    // defined in control.js
    ecrit = RUR.control.write;
    _write = RUR.control._write;
    narration = RUR.control.narration;
    termine = RUR.control.done;
    son = RUR.control.sound;
    pense = RUR.control.think;
    pause = RUR.control.pause;
    // defined in ui.js
    Monde = RUR.ui.load_world;
    Permalien = RUR.load_permalink;
    nombre_de_robots = RUR._set_max_nb_robots_;

    // The following are for OOP programming in Javascript and CoffeeScript

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

    RobotUsage.prototype.carries_object = function () {
        RUR.control.carries_object(this.body);
    };

    RobotUsage.prototype.face_au_nord = function () {
        RUR.control.is_facing_north(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR.control.move(this.body);
    };

    RobotUsage.prototype.depose = function () {
        RUR.control.put(this.body);
    };


    RobotUsage.prototype.rien_a_droite = function () {
        RUR.control.right_is_clear(this.body);
    };

    RobotUsage.prototype.objet_ici = function () {
        RUR.control.object_here(this.body);
    };

    RobotUsage.prototype.prend = function () {
        RUR.control.take(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR.control.turn_left(this.body);
    };
};

RUR.reset_definitions();
