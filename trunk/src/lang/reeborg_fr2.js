/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri, ReeborgError */

var RUR = RUR || {};

//required for lint.js
var globals_ = "/*globals avance, tourne_a_gauche, RUR, examine, RobotUsage, ReeborgError, rien_devant, rien_a_droite, "+
                    " face_au_nord, termine, depose, prend, objet_ici, selectionne_monde,"+
                    " jeton_ici, a_des_jetons, ecrit, au_but, au_but_orientation, selectionne_defi," +
                    " construit_un_mur, pense, pause, repete, voir_source, son, confirmer, dis */\n";

var avance, tourne_a_gauche, examine, rien_devant, rien_a_droite, selectionne_defi,
    face_au_nord, termine, depose, prend, objet_ici, selectionne_monde, jeton_ici,
    a_des_jetons, ecrit, au_but, au_but_orientation, construit_un_mur, pense,
    pause, repete, voir_source, son, RobotUsage,
    nombre_de_commandes, dis, confirmer;

RUR.confirmer = function(test) {
    var reeborg, robots, monde, jetons, orientation;
    var est, nord, sud, ouest;
    var js_test;
    est = RUR.EAST;
    ouest = RUR.WEST;
    nord = RUR.NORTH;
    sud = RUR.SOUTH;
    monde = RUR.current_world;
    robots = monde.robots;
    reeborg = robots[0];
    jetons = reeborg.tokens;
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

// The following is for OOP programming in Javascript and CoffeeScript

RobotUsage = function (x, y, orientation, tokens)  {
    this.body = RUR.robot.create_robot(x, y, orientation, tokens);
    RUR.world.add_robot(this.body);
};
RobotUsage.prototype.au_but = function () {
    RUR.control.at_goal(this.body);
};

RobotUsage.prototype.au_but_orientation = function () {
    RUR.control.at_goal_orientation(this.body);
};

RobotUsage.prototype.construit_un_mur = function () {
    RUR.control.build_wall(this.body);
};

RobotUsage.prototype.rien_devant = function () {
    RUR.control.front_is_clear(this.body);
};

RobotUsage.prototype.a_des_jetons = function () {
    RUR.control.has_token(this.body);
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

RobotUsage.prototype.jeton_ici = function () {
    RUR.control.token_here(this.body);
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


RUR.reset_definitions = function () {

    // defined above
    confirmer = RUR.confirmer;
    // robot commands - defined in commands.js
    au_but = RUR._at_goal_;
    au_but_orientation = RUR._at_goal_orientation_;
    construit_un_mur = RUR._build_wall_;
    rien_devant = RUR._front_is_clear;
    a_des_jetons = RUR._has_token_;
    face_au_nord = RUR._facing_north_;
    avance = RUR._move_;
    depose = RUR._put_;
    jeton_ici = RUR._token_here;
    rien_a_droite = RUR._right_is_clear;
    objet_ici = RUR._object_here;
    prend = RUR._take_;
    tourne_a_gauche = RUR._turn_left_;
    repete = RUR._repeat_;
    nombre_de_commandes = RUR._set_max_steps_;
    // utilities - defined in rur_utils.js
    examine = RUR.inspect;
    voir_source = RUR.view_source;
    // defined in control.js
    ecrit = RUR.control.write;
    termine = RUR.control.done;
    son = RUR.control.sound;
    pense = RUR.control.think;
    dis = RUR.control.say;
    pause = RUR.control.pause;
    // defined in ui.js
    selectionne_monde = RUR.ui.select_world;
    selectionne_defi = RUR.ui.select_challenge;

};
