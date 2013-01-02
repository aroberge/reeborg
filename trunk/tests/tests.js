module("World");

test("Creation", 5, function(){
    // WORLD created by default
    deepEqual(WORLD.robots, {}, "World starts with no robots");
    deepEqual(WORLD.walls, {}, "World starts with no walls - except those at x=0 and at y=0");
    strictEqual(WORLD.robot_counter, 0, "World starts with no robots");
    strictEqual(WORLD.needs_update, true, "World starts needing update - for drawing");

    WORLD.update();
    strictEqual(WORLD.needs_update, false, "World has been updated"); 
});

test("Adding robot", 3, function(){
    var reeborg = new UsedRobot();
    strictEqual(WORLD.needs_update, true, "The world needs to be updated");
    deepEqual(WORLD.robots, {"robot0": reeborg}, "World has one more robot");
    strictEqual(WORLD.robot_counter, 1, "World has one more robot");
});

test("Adding walls", 4, function(){
    WORLD.toggle_wall(1, 1, "NORTH");
    deepEqual(WORLD.walls, {'1,1': ["NORTH"]}, "Added north wall at 1, 1");
    WORLD.toggle_wall(1, 1, "EAST");
    deepEqual(WORLD.walls, {'1,1': ["NORTH", "EAST"]}, "Added east wall at 1, 1");
    WORLD.toggle_wall(1, 1, "NORTH");
    deepEqual(WORLD.walls, {'1,1': ["EAST"]}, "Removed north wall at 1, 1");
    WORLD.toggle_wall(1, 1, "EAST");
    deepEqual(WORLD.walls, {}, "Removed east wall at 1, 1");
})

module('UsedRobot', {
    setup: function(){
        WORLD.reset();
        ok(true, "module setup run")
    }
});

test( "Creation", 20, function() {
    var reeborg = new UsedRobot();
    strictEqual(reeborg.x, 1, "reeborg default x coordinate");
    strictEqual(reeborg.y, 1, "reeborg default y coordinate");
    strictEqual(reeborg.orientation, 0, "reeborg default orientation");
    strictEqual(reeborg.coins, 0, "reeborg default coins");
    strictEqual(reeborg.changed, true, "reeborg has been changed upon creation");
    strictEqual(WORLD.needs_update, true, "The world needs to be updated");
    deepEqual(WORLD.robots, {"robot0": reeborg}, "World has one more robot");
    strictEqual(WORLD.robot_counter, 1, "World has one more robot");

    var reeborg2 = new UsedRobot(2, 3, "N", 2);
    strictEqual(reeborg2.x, 2, "reeborg assigned x coordinate");
    strictEqual(reeborg2.y, 3, "reeborg assigned y coordinate");
    strictEqual(reeborg2.orientation, 1, "reeborg assigned orientation");
    strictEqual(reeborg2.coins, 2, "reeborg assigned coins");
    strictEqual(WORLD.needs_update, true, "The world needs to be updated");
    deepEqual(WORLD.robots, {"robot0": reeborg, "robot1":reeborg2}, "World has two robots");
    strictEqual(WORLD.robot_counter, 2, "World has two robots");

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

test("Moving in empty world - both languages", 7, function(){
    var reeborg = new UsedRobot();
    var reeborg2 = new UsedRobot();
    reeborg.move();
    strictEqual(reeborg.x, 2, "reeborg new position");
    reeborg2.move();
    strictEqual(reeborg2.x, 2, "reeborg2 new position");    
    reeborg.turn_left();
    reeborg.move();
    strictEqual(reeborg.y, 2, "reeborg new position");
    reeborg.turn_left()
    reeborg.avance();
    strictEqual(reeborg.x, 1, "reeborg new position");
    raises(function () {
        reeborg.move();
    }, "Hit wall exception", "Must throw error to pass.");
    strictEqual(reeborg.x, 1, "reeborg unchanged position");
});

