require("./rur.js");
require("./extend/add_object_type.js");

var obj;

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_object_type({"name": name, "url": url, "goal": {"url": url_goal}});
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
RUR.OBJECTS.box.name = "box";
RUR.OBJECTS.box.pushable = true;
RUR.OBJECTS.box.in_water = "bridge";
RUR.OBJECTS.box.ctx = RUR.ROBOT_CTX;

obj = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": ['/src/images/beeper0.png',
            '/src/images/beeper1.png',
            '/src/images/beeper2.png',
            '/src/images/beeper3.png'],
    "goal": {'url': '/src/images/beeper_goal.png'}
};
RUR.add_object_type(obj);


RUR.OBSTACLES = {};
RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.OBSTACLES;
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
    if (!url) {
        obj[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        obj[name].image.src = url;
    }
    obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
    RUR.KNOWN_OBSTACLES.push(name);
};

RUR.add_new_solid_object_type("bridge");
RUR.OBSTACLES.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.OBSTACLES.fence_right.message = "I hit a fence!";
RUR.OBSTACLES.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.OBSTACLES.fence4 = RUR.OBSTACLES.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.OBSTACLES.fence_left.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_left.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence5 = RUR.OBSTACLES.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.OBSTACLES.fence_double.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_double.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence6 = RUR.OBSTACLES.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.OBSTACLES.fence_vertical.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_vertical.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence7 = RUR.OBSTACLES.fence_vertical;  // compatibility with old worlds
