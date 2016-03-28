require("./rur.js");
require("./extend/add_object_type.js");

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


RUR.SOLID_OBJECTS = {};
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
