
module("World", {
    setup: function(){
        RUR.world.reset();
        ok(true, "module setup run")
    }
});

test("Creation", 3, function(){
    // RUR.world created by default
    deepEqual(RUR.world.robots, [], "World starts with no robots");
    deepEqual(RUR.world.walls, {}, "World starts with no walls - except those at x=0 and at y=0");
});

test("Adding robot", 2, function(){
    var reeborg = new UsedRobot();
    deepEqual(RUR.world.robots, [reeborg], "World has one more robot");
});

test("Exporting and importing a world", 5, function(){
    var newWorld = new RUR.World();
    var reeborg = new UsedRobot();
    newWorld.import_(RUR.world.export_());
    deepEqual(newWorld.robots, RUR.world.robots, "Same number of robots in both worlds.");
    deepEqual(newWorld.walls, RUR.world.walls, "Same walls configuration in both worlds.");
    var reeborg2 = new UsedRobot(3, 4, "West", 42);
    RUR.world.toggle_wall(1, 1, "NORTH");
    newWorld.import_(RUR.world.export_());
    deepEqual(newWorld.robots, RUR.world.robots, "Same number of robots in both worlds.");
    deepEqual(newWorld.walls, RUR.world.walls, "Same walls configuration in both worlds.");
});

test("Adding walls", 5, function(){
    RUR.world.toggle_wall(1, 1, "NORTH");
    deepEqual(RUR.world.walls, {'1,1': ["NORTH"]}, "Added north wall at 1, 1");
    RUR.world.toggle_wall(1, 1, "EAST");
    deepEqual(RUR.world.walls, {'1,1': ["NORTH", "EAST"]}, "Added east wall at 1, 1");
    RUR.world.toggle_wall(1, 1, "NORTH");
    deepEqual(RUR.world.walls, {'1,1': ["EAST"]}, "Removed north wall at 1, 1");
    RUR.world.toggle_wall(1, 1, "EAST");
    deepEqual(RUR.world.walls, {}, "Removed east wall at 1, 1");
})

module('UsedRobot', {
    setup: function(){
        RUR.world.reset();
        ok(true, "module setup run")
    }
});

test( "Creation", 15, function() {
    var reeborg = new UsedRobot();
    strictEqual(reeborg.x, 1, "reeborg default x coordinate");
    strictEqual(reeborg.y, 1, "reeborg default y coordinate");
    strictEqual(reeborg.orientation, 0, "reeborg default orientation");
    strictEqual(reeborg.tokens, 0, "reeborg default tokens");
    deepEqual(RUR.world.robots, [reeborg], "World has one more robot");

    var reeborg2 = new UsedRobot(2, 3, "N", 2);
    strictEqual(reeborg2.x, 2, "reeborg assigned x coordinate");
    strictEqual(reeborg2.y, 3, "reeborg assigned y coordinate");
    strictEqual(reeborg2.orientation, 1, "reeborg assigned orientation");
    strictEqual(reeborg2.tokens, 2, "reeborg assigned tokens");
    deepEqual(RUR.world.robots, [reeborg, reeborg2], "World has two robots");

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
    strictEqual(reeborg.tokens, 0, "reeborg tokens ");
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
