require("./rur.js");
require("./world_enhance/add_tile_type.js");

var obj;

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.enhance.new_tile_type({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("orange");
_add_object_type("daisy");
_add_object_type("tulip");

_add_object_type("box");
RUR.TILES.box.name = "box";
RUR.TILES.box.pushable = true;
RUR.TILES.box.in_water = "bridge";
RUR.TILES.box.ctx = RUR.ROBOT_CTX;

obj = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": ['src/images/beeper0.png',
            'src/images/beeper1.png',
            'src/images/beeper2.png',
            'src/images/beeper3.png'],
    "goal": {'url': 'src/images/beeper_goal.png'}
};
RUR.enhance.new_tile_type(obj);

RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.TILES;
    obj[name] = {};
    if (nickname === undefined) {
        obj[name].name = name;
    } else {
        obj[name].name = nickname;
        obj[name].fatal = true;
        obj[name].solid = true;
        obj[name].detectable = true;
    }
    obj[name].ctx = RUR.OBSTACLES_CTX;
    obj[name].image = new Image();
    if (url) {
        obj[name].url = url;
    } else {
        obj[name].url = RUR._BASE_URL + '/src/images/' + name + '.png';
    }
    obj[name].image.src = obj[name].url;

    obj[name].image.onload = RUR._incremented_loaded_images;
    RUR._NB_IMAGES_TO_LOAD += 1;
    RUR.KNOWN_TILES.push(name);
};

RUR.add_new_solid_object_type("bridge");
RUR.TILES.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.TILES.fence_right.message = "I hit a fence!";
RUR.TILES.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.TILES.fence4 = RUR.TILES.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.TILES.fence_left.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_left.info = RUR.TILES.fence_right.info;
RUR.TILES.fence5 = RUR.TILES.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.TILES.fence_double.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_double.info = RUR.TILES.fence_right.info;
RUR.TILES.fence6 = RUR.TILES.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.TILES.fence_vertical.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_vertical.info = RUR.TILES.fence_right.info;
RUR.TILES.fence7 = RUR.TILES.fence_vertical;  // compatibility with old worlds
