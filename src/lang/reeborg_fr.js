/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri */

var RUR = RUR || {};

/*==========================================*/

var globals_ = "/*globals avance, tourne_a_gauche, RUR, examine, RobotUsage, rien_devant, rien_a_droite, "+
                    " face_au_nord, termine, depose, prend, objet_ici, selectionne_monde,"+
                    " jeton_ici, a_des_jetons, ecrit, au_but, au_but_orientation, selectionne_defi," +
                    " construit_un_mur, pense, pause, repete, voir_source, son, confirmer, dis */\n";

var avance, tourne_a_gauche, examine, rien_devant, rien_a_droite, selectionne_defi,
    face_au_nord, termine, depose, prend, objet_ici, selectionne_monde, jeton_ici,
    a_des_jetons, ecrit, au_but, au_but_orientation, construit_un_mur, pense,
    pause, repete, voir_source, son, RobotUsage,
    nombre_de_commandes, dis;

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

    if (eval(js_test)){
        return;
    }
    throw ReeborgError("Échec : <br>"+test);
};


RUR.reset_definitions = function () {

  RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };

    ecrit = function (s) {
        RUR.control.write(s);
    };
    termine = function () {
      RUR.control.done();
    };
    dis = function (message) {
        RUR.control.say(message);
    }
    pause = function (ms) {
      RUR.control.pause(ms);
    };

    repete = function (f, n) {
      for (var i=0; i < n; i++){
          f();
      }
    };

    pense = function(delay) {
        RUR.control.think(delay);
    };

    selectionne_monde = RUR.ui.select_world;

    selectionne_defi = RUR.ui.select_challenge;

    nombre_de_commandes = function(n){
        RUR.MAX_STEPS = n;
    };

    au_but = function () {
        return RUR.control.at_goal(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.au_but = function () {
        RUR.control.at_goal(this.body);
    };

    au_but_orientation = function () {
        return RUR.control.at_goal_orientation(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.au_but_orientation = function () {
        RUR.control.at_goal_orientation(this.body);
    };

    construit_un_mur = function() {
        RUR.control.build_wall(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.construit_un_mur = function () {
        RUR.control.build_wall(this.body);
    };

    rien_devant = function() {
      return RUR.control.front_is_clear(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.rien_devant = function () {
        RUR.control.front_is_clear(this.body);
    };

    a_des_jetons = function () {
        return RUR.control.has_token(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.a_des_jetons = function () {
        RUR.control.has_token(this.body);
    };

    face_au_nord = function () {
        return RUR.control.is_facing_north(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.face_au_nord = function () {
        RUR.control.is_facing_north(this.body);
    };

    avance = function () {
        RUR.control.move(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.avance = function () {
        RUR.control.move(this.body);
    };

    depose = function(arg) {
        RUR.control.put(RUR.current_world.robots[0], arg);
    };
    RobotUsage.prototype.depose = function () {
        RUR.control.put(this.body);
    };

    jeton_ici = function() {
        return RUR.control.token_here(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.jeton_ici = function () {
        RUR.control.token_here(this.body);
    };

    rien_a_droite = function() {
      return RUR.control.right_is_clear(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.rien_a_droite = function () {
        RUR.control.right_is_clear(this.body);
    };

    objet_ici = function () {
        return RUR.control.object_here(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.objet_ici = function () {
        RUR.control.object_here(this.body);
    };

    prend = function(arg) {
        RUR.control.take(RUR.current_world.robots[0], arg);
    };
    RobotUsage.prototype.prend = function () {
        RUR.control.take(this.body);
    };

    tourne_a_gauche = function () {
        RUR.control.turn_left(RUR.current_world.robots[0]);
    };
    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR.control.turn_left(this.body);
    };

    examine = RUR.inspect;

    voir_source = RUR.view_source;
    confirmer = RUR.confirmer;

    son = function (on) {
        RUR.control.sound(on);
    };
};


// the regex of the following should be adapted
// so that they make sense in the human language ...

RUR.import_lib_regex_js = /^\s*import_biblio\s*\(\s*\);/m;
RUR.import_lib_regex_py = /^from\s* biblio\s* import\s* \*\s*$/m;
RUR.import_lib_regex_coffee = /^\s*import_biblio\s*\(\s*\)/m;


