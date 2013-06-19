var globals_ = "/*globals avance, tourne_a_gauche, tourne_à_gauche, RUR, examine, RobotUsagé, RobotUsage, " +
                "rien_devant, rien_à_droite, rien_a_droite, face_au_nord, termine, terminé, "+
                    " dépose_jeton, depose_jeton, prend_jeton, dépose, depose, prend, objet_ici,"+
                    " jeton_ici, a_des_jetons, écrit, ecrit, écrit_maintenant, ecrit_maintenant, au_but, " +
                    " au_but_orientation, construit_un_mur, pense, DEBUG, pause, supprimer_le_robot, " +
                    " repete, répète, voir_source, vue_de_cote, vue_de_côté, vue_de_haut, sélectionne_monde, selectionne_monde*/\n";
//RUR = RUR || {};

RUR.xml = "src/xml_fr/";
RUR.translation = {};
RUR.translation["/* Your special code goes here */\n\n"] = "/* Sauvegardez vos définitions ici. */\n\n"
RUR.translation.ReeborgError = "ReeborgError";
RUR.translation["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Le temps de réflexion de Reeborg doit être spécifié en millisecondes, entre 0 et 10000; la valeur spécifiée était : {delay}";
RUR.translation["No token found here!"] = "Pas de jetons trouvés ici !";
RUR.translation["I don't have any token to put down!"] = "Je n'ai pas de jetons !";
RUR.translation.triangle = "triangle";
RUR.translation.star = "étoile";
RUR.translation.square = "carré";
// reverse translation needed as well
RUR.translation["étoile"] = "star";
RUR.translation["carré"] = "square";

RUR.translation["Unknown shape"] = "Forme inconnue: {shape}";
RUR.translation["No shape found here"] = "Pas de {shape} trouvé ici !";
RUR.translation["There is already something here."] = "Il y a déjà quelque chose ici.";
RUR.translation["I don't have any shape to put down!"] = "Je n'ai pas de {shape}!";
RUR.translation["There is already a wall here!"] = "Il y a déjà un mur ici !";
RUR.translation["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
RUR.translation["I am afraid of the void!"] = "J'ai peur du néant !";
RUR.translation.east = "est";
RUR.translation.north = "nord";
RUR.translation.west = "ouest";
RUR.translation.south = "sud";
RUR.translation["Unknown orientation for robot."] = "Orientation inconnue.";
RUR.translation["Done!"] = "Terminé !";
RUR.translation["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no orientation as a goal in this world!"] = "Aucune orientation n'a été spécifiée comme but dans ce monde!";
RUR.translation["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"] = "<li class='success'>Reeborg a la bonne orientation.</li>";
RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"] = "<li class='failure'>Reeborg a la mauvaise orientation.</li>";
RUR.translation["<li class='success'>All shapes are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
RUR.translation["<li class='success'>All tokens are at the correct location.</li>"] = "<li class='success'>Tous les jetons sont aux bons endroits.</li>";
RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs jetons ne sont pas aux bons endroits.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
RUR.translation["Last instruction completed!"] = "Dernière instruction complétée!";
RUR.translation["<p class='center'>Instruction <code>done;()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé;()</code> exécutée.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", jetons=";
RUR.translation["Delete "] = "Supprimer";
RUR.translation["Undo Delete"] = "Annuler la suppression";
RUR.translation["World selected"] = "Monde {world} choisi";
RUR.translation["Could not find world"] = "Je ne peux pas trouver {world}";

var au_but = function() {
    return RUR.world.robots[0].at_goal();
};

var au_but_orientation = function() {
    return RUR.world.robots[0].at_goal_orientation();
};

var construit_un_mur = function() {
    RUR.world.robots[0].build_wall();
};

var terminé = function () {
    RUR.world.robots[0].done();
};
var termine = terminé;

var rien_devant = function() {
    return RUR.world.front_is_clear(RUR.world.robots[0]);
};

var a_des_jetons = function () {
    return RUR.world.robots[0].has_token();
};

var examine = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    write_now(result);
};

var face_au_nord = function() {
    return RUR.world.robots[0].is_facing_north();
};

var avance = function() {
    RUR.world.robots[0].move();
};

var pause = function (ms) {
    RUR.world.pause(ms);
};

var dépose = function(arg) {
    RUR.world.robots[0].put(arg);
};
var depose = dépose;

var dépose_jeton = function() {
    RUR.world.robots[0].put_token();
};
var depose_jeton = dépose_jeton;

var supprimer_le_robot = function (){
    RUR.world.remove_robot();
};

var répète = function (f, n) {
    for (var i=0; i < n; i++){
        f();
    }
};
var repete = répète;

var rien_à_droite = function() {
    return RUR.world.right_is_clear(RUR.world.robots[0]);
};
var rien_a_droite = rien_à_droite;

var objet_ici = function () {
    return RUR.world.find_shape(RUR.world.robots[0].x, RUR.world.robots[0].y);
};

var prend = function(arg) {
    RUR.world.robots[0].take(arg);
};

var prend_jeton = function() {
    RUR.world.robots[0].take_token();
};

var pense = function(delay) {
    RUR.world.think(delay);
};

var jeton_ici = function () {
    return RUR.world.get_tokens(RUR.world.robots[0].x, RUR.world.robots[0].y);
};

var tourne_à_gauche = function() {
    RUR.world.robots[0].turn_left();
};
var tourne_a_gauche = tourne_à_gauche;

var écrit = function (s) {
    RUR.world.add_output_frame("#output-pre", s);
};
var ecrit = écrit;

var écrit_maintenant = function (s){
    $("#output-pre").append(s + "\n");
};
var ecrit_maintenant = écrit_maintenant;

var voir_source = function(fn) {
    $("#last-pre").before("<pre class='js_code'>" + fn + "</pre>" );
    $('.js_code').each(function() {
        var $this = $(this), $code = $this.text();
        $this.removeClass("js_code");
        $this.addClass("jscode");
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-dark'
        });
    });
};

var vue_de_côté = function () {
    RUR.visible_world.top_view = false;
    localStorage.setItem("top_view", "false");
};
var vue_de_cote = vue_de_côté;

var vue_de_haut = function () {
    RUR.visible_world.top_view = true;
    localStorage.setItem("top_view", "true");
};

UsedRobot.prototype = Object.create(RUR.Robot.prototype);
UsedRobot.prototype.constructor = UsedRobot;

function UsedRobot(x, y, orientation, jetons)  {
    RUR.Robot.call(this, x, y, orientation, jetons);
    RUR.world.add_robot(this);
}
var RobotUsagé = UsedRobot;
var RobotUsage = RobotUsagé;

RUR.Robot.prototype.a_une_fuite = RUR.Robot.prototype.is_leaky;
RUR.Robot.prototype.tourne_à_gauche = RUR.Robot.prototype.turn_left;
RUR.Robot.prototype.tourne_a_gauche = RUR.Robot.prototype.turn_left;
RUR.Robot.prototype.avance = RUR.Robot.prototype.move;

var sélectionne_monde = RUR.select_world;
var selectionne_monde = RUR.select_world;