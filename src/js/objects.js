require("./extend/add_object_type.js");
require("./extend/add_tile_type.js");
require("./extend/new_home_tile.js");

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
RUR.OBJECTS.box.name = "box";
RUR.OBJECTS.box.pushable = true;
RUR.OBJECTS.box.in_water = "bridge";
RUR.OBJECTS.box.ctx = RUR.ROBOT_CTX;


RUR._add_new_tile_type = function (name, url) {
    var tiles = RUR.TILES;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR.KNOWN_TILES.push(name);
    RUR._NB_IMAGES_TO_LOAD += 1;
};


tile = {name: "mud",
    url: RUR._BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: true,
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_tile_type(tile);

tile = {name: "ice",
    url: RUR._BASE_URL + '/src/images/ice.png',
    message: "I'm slipping on ice!",
    slippery: true,
    info: "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."
};
RUR.add_new_tile_type(tile);

tile = {name: "grass",
    url: RUR._BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_tile_type(tile);

tile = {name: "pale_grass",
    url: RUR._BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
    public_name: "grass"
};
RUR.add_new_tile_type(tile);


tile = {name: "gravel",
    url: RUR._BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_tile_type(tile);

tile = {
    name:"water",
    images: [RUR._BASE_URL + '/src/images/water.png',
        RUR._BASE_URL + '/src/images/water2.png',
        RUR._BASE_URL + '/src/images/water3.png',
        RUR._BASE_URL + '/src/images/water4.png',
        RUR._BASE_URL + '/src/images/water5.png',
        RUR._BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: true,
    detectable: true,
    message: "I'm in water!"
};

RUR.add_new_tile_type(tile);

RUR._add_new_tile_type("bricks");
RUR.TILES.bricks.name = "brick wall"; // replace
RUR.TILES.bricks.fatal = true;
RUR.TILES.bricks.solid = true;
RUR.TILES.bricks.detectable = true;
RUR.TILES.bricks.message = "Crash!";
RUR.TILES.bricks.info = "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";

_add_new_home_tile = function (name, info) {
    info = info + "Reeborg <b>can</b> detect this tile using at_goal().";
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_home_tile(name, url, info);
};

_add_new_home_tile("green_home_tile", "green home tile:");
_add_new_home_tile("house", "house:");
_add_new_home_tile("racing_flag", "racing flag:");


RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.SOLID_OBJECTS;
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
    obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
};

RUR.add_new_solid_object_type("bridge");
RUR.SOLID_OBJECTS.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.SOLID_OBJECTS.fence_right.message = "I hit a fence!";
RUR.SOLID_OBJECTS.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.SOLID_OBJECTS.fence4 = RUR.SOLID_OBJECTS.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.SOLID_OBJECTS.fence_left.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_left.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence5 = RUR.SOLID_OBJECTS.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.SOLID_OBJECTS.fence_double.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_double.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence6 = RUR.SOLID_OBJECTS.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.SOLID_OBJECTS.fence_vertical.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_vertical.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence7 = RUR.SOLID_OBJECTS.fence_vertical;  // compatibility with old worlds
