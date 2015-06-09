/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.objects = {};
RUR.objects.known_objects = [];
RUR.tiles = {};
RUR.top_tiles = {};
RUR.home_images = {};

RUR.objects.token = {};
RUR.objects.token.image = new Image();
RUR.objects.token.image.src = 'src/images/token.png';  // adapted from openclipart
RUR.objects.token.image_goal = new Image();
RUR.objects.token.image_goal.src = 'src/images/token_goal.png';  // modified from above
RUR.objects.token.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.token.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("token");


RUR.objects.star = {};
RUR.objects.star.image = new Image();
RUR.objects.star.image.src = 'src/images/star.png';  // adapted from openclipart
RUR.objects.star.image_goal = new Image();
RUR.objects.star.image_goal.src = 'src/images/star_goal.png';  // modified from above
RUR.objects.star.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.star.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("star");

RUR.objects.triangle = {};
RUR.objects.triangle.image = new Image();
RUR.objects.triangle.image.src = 'src/images/triangle.png';  // adapted from openclipart
RUR.objects.triangle.image_goal = new Image();
RUR.objects.triangle.image_goal.src = 'src/images/triangle_goal.png';  // modified from above
RUR.objects.triangle.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.triangle.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("triangle");


RUR.objects.square = {};
RUR.objects.square.image = new Image();
RUR.objects.square.image.src = 'src/images/square.png';
RUR.objects.square.image_goal = new Image();
RUR.objects.square.image_goal.src = 'src/images/square_goal.png';  // modified from above
RUR.objects.square.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.square.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("square");


RUR.objects.strawberry = {};
RUR.objects.strawberry.image = new Image();
RUR.objects.strawberry.image.src = 'src/images/strawberry.png';
RUR.objects.strawberry.image_goal = new Image();
RUR.objects.strawberry.image_goal.src = 'src/images/strawberry_goal.png';  // modified from above
RUR.objects.strawberry.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.strawberry.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("strawberry");

RUR.objects.banana = {};
RUR.objects.banana.image = new Image();
RUR.objects.banana.image.src = 'src/images/banana.png';
RUR.objects.banana.image_goal = new Image();
RUR.objects.banana.image_goal.src = 'src/images/banana_goal.png';  // modified from above
RUR.objects.banana.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.banana.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("banana");


RUR.objects.apple = {};
RUR.objects.apple.image = new Image();
RUR.objects.apple.image.src = 'src/images/apple.png';
RUR.objects.apple.image_goal = new Image();
RUR.objects.apple.image_goal.src = 'src/images/apple_goal.png';  // modified from above
RUR.objects.apple.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.apple.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("apple");


RUR.objects.leaf = {};
RUR.objects.leaf.image = new Image();
RUR.objects.leaf.image.src = 'src/images/leaf.png';
RUR.objects.leaf.image_goal = new Image();
RUR.objects.leaf.image_goal.src = 'src/images/leaf_goal.png';  // modified from above
RUR.objects.leaf.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.leaf.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("leaf");

RUR.objects.carrot = {};
RUR.objects.carrot.image = new Image();
RUR.objects.carrot.image.src = 'src/images/carrot.png';
RUR.objects.carrot.image_goal = new Image();
RUR.objects.carrot.image_goal.src = 'src/images/carrot_goal.png';  // modified from above
RUR.objects.carrot.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.carrot.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("carrot");

RUR.objects.dandelion = {};
RUR.objects.dandelion.image = new Image();
RUR.objects.dandelion.image.src = 'src/images/dandelion.png';
RUR.objects.dandelion.image_goal = new Image();
RUR.objects.dandelion.image_goal.src = 'src/images/dandelion_goal.png';  // modified from above
RUR.objects.dandelion.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.dandelion.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("dandelion");


RUR.objects.orange = {};
RUR.objects.orange.image = new Image();
RUR.objects.orange.image.src = 'src/images/orange.png';
RUR.objects.orange.image_goal = new Image();
RUR.objects.orange.image_goal.src = 'src/images/orange_goal.png';  // modified from above
RUR.objects.orange.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.orange.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("orange");

RUR.objects.daisy = {};
RUR.objects.daisy.image = new Image();
RUR.objects.daisy.image.src = 'src/images/daisy.png';
RUR.objects.daisy.image_goal = new Image();
RUR.objects.daisy.image_goal.src = 'src/images/daisy_goal.png';  // modified from above
RUR.objects.daisy.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.daisy.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("daisy");

RUR.objects.tulip = {};
RUR.objects.tulip.image = new Image();
RUR.objects.tulip.image.src = 'src/images/tulip.png';
RUR.objects.tulip.image_goal = new Image();
RUR.objects.tulip.image_goal.src = 'src/images/tulip_goal.png';  // modified from above
RUR.objects.tulip.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.tulip.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("tulip");

RUR.objects.box = {};
RUR.objects.box.pushable = true;
RUR.objects.box.in_water = "bridge";
RUR.objects.box.ctx = RUR.ROBOT_CTX;
RUR.objects.box.image = new Image();
RUR.objects.box.image.src = 'src/images/box.png';
RUR.objects.box.image_goal = new Image();
RUR.objects.box.image_goal.src = 'src/images/box_goal.png';
RUR.objects.box.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.box.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("box");


RUR.tiles.mud = {};
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.info = RUR.translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.");
RUR.tiles.mud.image = new Image();
RUR.tiles.mud.image.src = 'src/images/mud.png';
RUR.tiles.mud.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.ice = {};
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.info = RUR.translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.");
RUR.tiles.ice.image = new Image();
RUR.tiles.ice.image.src = 'src/images/ice.png';
RUR.tiles.ice.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.grass = {};
RUR.tiles.grass.image = new Image();
RUR.tiles.grass.image.src = 'src/images/grass.png';
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");
RUR.tiles.grass.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.gravel = {};
RUR.tiles.gravel.image = new Image();
RUR.tiles.gravel.image.src = 'src/images/gravel.png';
RUR.tiles.gravel.info = RUR.translate("Gravel: usually safe.");
RUR.tiles.gravel.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.water = {};
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.info = RUR.translate("Water: Reeborg <b>can</b> detect this but will drown if it moves to this location.");
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = 'src/images/water.png';
RUR.tiles.water.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.bricks = {};
RUR.tiles.bricks.fatal = true;
RUR.tiles.bricks.solid = true;
RUR.tiles.bricks.detectable = true;
RUR.tiles.bricks.message = RUR.translate("Crash!");
RUR.tiles.bricks.info = RUR.translate("brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.");
RUR.tiles.bricks.image = new Image();
RUR.tiles.bricks.image.src = 'src/images/bricks.png';
RUR.tiles.bricks.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.home_images.green_home_tile = {};
RUR.home_images.green_home_tile.fatal = true;
RUR.home_images.green_home_tile.detectable = true;
RUR.home_images.green_home_tile.info = RUR.translate("green home tile:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.green_home_tile.image = new Image();
RUR.home_images.green_home_tile.image.src = 'src/images/green_home_tile.png';
RUR.home_images.green_home_tile.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};

RUR.home_images.house = {};
RUR.home_images.house.fatal = true;
RUR.home_images.house.detectable = true;
RUR.home_images.house.info = RUR.translate("house:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.house.image = new Image();
RUR.home_images.house.image.src = 'src/images/house.png';
RUR.home_images.house.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};

RUR.home_images.racing_flag = {};
RUR.home_images.racing_flag.fatal = true;
RUR.home_images.racing_flag.detectable = true;
RUR.home_images.racing_flag.info = RUR.translate("racing flag:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.racing_flag.image = new Image();
RUR.home_images.racing_flag.image.src = 'src/images/racing_flag.png';
RUR.home_images.racing_flag.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};


RUR.top_tiles.bridge = {};
RUR.top_tiles.bridge.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.bridge.image = new Image();
RUR.top_tiles.bridge.image.src = 'src/images/bridge.png';
RUR.top_tiles.bridge.info = RUR.translate("Bridge:") + RUR.translate("Reeborg <b>can</b> detect this and will know that it allows safe passage over water.");
RUR.top_tiles.bridge.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence4 = {};
RUR.top_tiles.fence4.name = "fence";
RUR.top_tiles.fence4.fatal = true;
RUR.top_tiles.fence4.solid = true;
RUR.top_tiles.fence4.detectable = true;
RUR.top_tiles.fence4.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence4.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence4.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence4.image = new Image();
RUR.top_tiles.fence4.image.src = 'src/images/fence4.png';
RUR.top_tiles.fence4.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence5 = {};
RUR.top_tiles.fence5.name = "fence";
RUR.top_tiles.fence5.fatal = true;
RUR.top_tiles.fence5.solid = true;
RUR.top_tiles.fence5.detectable = true;
RUR.top_tiles.fence5.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence5.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence5.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence5.image = new Image();
RUR.top_tiles.fence5.image.src = 'src/images/fence5.png';
RUR.top_tiles.fence5.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence6 = {};
RUR.top_tiles.fence6.name = "fence";
RUR.top_tiles.fence6.fatal = true;
RUR.top_tiles.fence6.solid = true;
RUR.top_tiles.fence6.detectable = true;
RUR.top_tiles.fence6.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence6.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence6.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence6.image = new Image();
RUR.top_tiles.fence6.image.src = 'src/images/fence6.png';
RUR.top_tiles.fence6.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence7 = {};
RUR.top_tiles.fence7.name = "fence";
RUR.top_tiles.fence7.fatal = true;
RUR.top_tiles.fence7.solid = true;
RUR.top_tiles.fence7.detectable = true;
RUR.top_tiles.fence7.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence7.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence7.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence7.image = new Image();
RUR.top_tiles.fence7.image.src = 'src/images/fence7.png';
RUR.top_tiles.fence7.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};