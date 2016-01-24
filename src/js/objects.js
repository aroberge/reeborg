

require("./translator.js");
require("./extend/add_object_type.js");

RUR.objects = {};
RUR.tiles = {};
RUR.solid_objects = {};
RUR.home_images = {};
RUR.background_image = new Image();
RUR.background_image.src = '';

_add_new_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_object_type(name, url, url_goal);
};

_add_new_object_type("token");
_add_new_object_type("star");
_add_new_object_type("triangle");
_add_new_object_type("square");
_add_new_object_type("strawberry");
_add_new_object_type("banana");
_add_new_object_type("apple");
_add_new_object_type("leaf");
_add_new_object_type("carrot");
_add_new_object_type("dandelion");
_add_new_object_type("orange");
_add_new_object_type("daisy");
_add_new_object_type("tulip");

_add_new_object_type("box");
RUR.objects.box.name = "box";
RUR.objects.box.pushable = true;
RUR.objects.box.in_water = "bridge";
RUR.objects.box.ctx = RUR.ROBOT_CTX;


RUR.add_new_tile_type = function (name, url) {
    var tiles = RUR.tiles;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.increment_loaded;
    RUR.KNOWN_TILES.push(name);
    RUR._NB_IMAGES_TO_LOAD += 1;
};

RUR.add_new_tile_type("mud");
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = "I'm stuck in mud.";
RUR.tiles.mud.info = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";

RUR.add_new_tile_type("ice");
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = "I'm slipping on ice!";
RUR.tiles.ice.info = "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.";

RUR.add_new_tile_type("grass");
RUR.tiles.grass.info = "Grass: usually safe.";

RUR.add_new_tile_type("pale_grass");
RUR.tiles.grass.info = "Grass: usually safe.";
RUR.tiles.pale_grass.name = "grass"; // replace

RUR.add_new_tile_type("gravel");
RUR.tiles.gravel.info = "Gravel: usually safe.";


RUR.tiles.water = {};
RUR.tiles.water.name = "water";
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = "I'm in water!";
RUR.tiles.water.info = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = RUR._BASE_URL + '/src/images/water.png';
RUR.tiles.water.image2 = new Image();
RUR.tiles.water.image2.src = RUR._BASE_URL + '/src/images/water2.png';
RUR.tiles.water.image3 = new Image();
RUR.tiles.water.image3.src = RUR._BASE_URL + '/src/images/water3.png';
RUR.tiles.water.image4 = new Image();
RUR.tiles.water.image4.src = RUR._BASE_URL + '/src/images/water4.png';
RUR.tiles.water.image5 = new Image();
RUR.tiles.water.image5.src = RUR._BASE_URL + '/src/images/water5.png';
RUR.tiles.water.image6 = new Image();
RUR.tiles.water.image6.src = RUR._BASE_URL + '/src/images/water6.png';
RUR.tiles.water.choose_image = function () {
    var choice = Math.floor(Math.random() * 6) + 1;
    switch (choice) {
        case 1: return RUR.tiles.water.image;
        case 2: return RUR.tiles.water.image2;
        case 3: return RUR.tiles.water.image3;
        case 4: return RUR.tiles.water.image4;
        case 5: return RUR.tiles.water.image5;
        case 6: return RUR.tiles.water.image6;
    }
};
RUR.tiles.water.image.onload = RUR.increment_loaded;
RUR.tiles.water.image2.onload = RUR.increment_loaded;
RUR.tiles.water.image3.onload = RUR.increment_loaded;
RUR.tiles.water.image4.onload = RUR.increment_loaded;
RUR.tiles.water.image5.onload = RUR.increment_loaded;
RUR.tiles.water.image6.onload = RUR.increment_loaded;
RUR._NB_IMAGES_TO_LOAD += 6;

RUR.add_new_tile_type("bricks");
RUR.tiles.bricks.name = "brick wall"; // replace
RUR.tiles.bricks.fatal = true;
RUR.tiles.bricks.solid = true;
RUR.tiles.bricks.detectable = true;
RUR.tiles.bricks.message = "Crash!";
RUR.tiles.bricks.info = "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";


RUR.add_new_home_tile = function (name, info) {
    var home = RUR.home_images;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = info + "Reeborg <b>can</b> detect this tile using at_goal().";
    home[name].image = new Image();
    home[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    home[name].image.onload = RUR.increment_loaded;
    RUR._NB_IMAGES_TO_LOAD += 1;
};

RUR.add_new_home_tile("green_home_tile", "green home tile:");
RUR.add_new_home_tile("house", "house:");
RUR.add_new_home_tile("racing_flag", "racing flag:");


RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.solid_objects;
    obj[name] = {};
    if (nickname === undefined) {
        obj[name].name = name;
    } else {
        obj[name].name = nickname;
        obj[name].fatal = true;
        obj[name].solid = true;
        obj[name].detectable = true;
    }
    obj[name].ctx = RUR.SECOND_LAYER_CTX;
    obj[name].image = new Image();
    if (!url) {
        obj[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        obj[name].image.src = url;
    }
    obj[name].image.onload = RUR.increment_loaded;
    RUR._NB_IMAGES_TO_LOAD += 1;
};

RUR.add_new_solid_object_type("bridge");
RUR.solid_objects.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.solid_objects.fence_right.message = "I hit a fence!";
RUR.solid_objects.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.solid_objects.fence4 = RUR.solid_objects.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.solid_objects.fence_left.message = RUR.solid_objects.fence_right.message;
RUR.solid_objects.fence_left.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence5 = RUR.solid_objects.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.solid_objects.fence_double.message = RUR.solid_objects.fence_right.message;
RUR.solid_objects.fence_double.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence6 = RUR.solid_objects.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.solid_objects.fence_vertical.message = RUR.solid_objects.fence_right.message;
RUR.solid_objects.fence_vertical.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence7 = RUR.solid_objects.fence_vertical;  // compatibility with old worlds
