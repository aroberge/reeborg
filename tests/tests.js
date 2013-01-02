module('UsedRobot', {
    setup: function(){
        UNIVERSE.reset();
        ok(true, "module setup run")
    }
});

test( "Creation", 15, function() {
    var reeborg = new UsedRobot();
    strictEqual(reeborg.x, 1, "reeborg default x coordinate");
    strictEqual(reeborg.y, 1, "reeborg default y coordinate");
    strictEqual(reeborg.orientation, 0, "reeborg default orientation");
    strictEqual(reeborg.coins, 0, "reeborg default coins");
    strictEqual(reeborg.changed, true, "reeborg has been changed upon creation");
    strictEqual(UNIVERSE.needs_update, true, "The universe needs to be updated");

    reeborg = new UsedRobot(2, 3, "N", 2);
    strictEqual(reeborg.x, 2, "reeborg assigned x coordinate");
    strictEqual(reeborg.y, 3, "reeborg assigned y coordinate");
    strictEqual(reeborg.orientation, 1, "reeborg assigned orientation");
    strictEqual(reeborg.coins, 2, "reeborg assigned coins");

    reeborg = new UsedRobot(1, 1, "west");
    strictEqual(reeborg.orientation, 2, "reeborg assigned orientation");

    reeborg = new UsedRobot(0, 0, "s");
    strictEqual(reeborg.orientation, 3, "reeborg assigned orientation");
    strictEqual(reeborg.x, 1, "reeborg corrected x coordinate"); // automatically chooses 1 as 0 is considered to be false
    strictEqual(reeborg.y, 1, "reeborg corrected y coordinate");
});

test( "Création en français", 5, function() {
    var reeborg = new RobotUsagé(3, 4, "ouest");
    strictEqual(reeborg.x, 3, "reeborg x coordinate");
    strictEqual(reeborg.y, 4, "reeborg y coordinate");
    strictEqual(reeborg.orientation, 2, "reeborg orientation en français");
    strictEqual(reeborg.pièces, 0, "reeborg pièces de monnaie");
});

test( "Turning - both languages", 7, function() {
    var reeborg = new UsedRobot();
    reeborg.turn_left();
    strictEqual(reeborg.orientation, 1, "reeborg new orientation");

    reeborg.tourne_à_gauche();
    strictEqual(reeborg.orientation, 2, "reeborg new orientation");

    reeborg.turn_left();
    strictEqual(reeborg.orientation, 3, "reeborg new orientation");

    reeborg.turn_left();
    strictEqual(reeborg.orientation, 0, "reeborg new orientation");

    reeborg = new RobotUsagé(3, 4, "ouest");
    strictEqual(reeborg.orientation, 2, "reeborg new orientation");
    reeborg.tourne_à_gauche();
    strictEqual(reeborg.orientation, 3, "reeborg new orientation");
});

