

require("./aa_utils.js");
console.log("loading objects");
RUR.objects = {};
RUR.tiles = {};
RUR.solid_objects = {};
RUR.home_images = {};
RUR.objects.known_objects = [];
RUR.tiles.known_tiles = [];

// allow for the possibility of a background image
RUR.background_image = new Image();
RUR.background_image.src = '';

// we will keep track if we have loaded all images
RUR.objects.loaded_images = 0;
RUR.objects.nb_images = 0;

RUR.base_url = RUR.base_url || '';  // enable changing defaults for unit tests

RUR.increment_loaded = function () {
    RUR.objects.loaded_images += 1;
};

RUR.add_object_image = function (name, url, url_goal) {
    var obj = RUR.objects;
    obj[name] = {};
    obj[name].image = new Image();
    obj[name].image_goal = new Image();
    if (url === undefined) {
        obj[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
        obj[name].image_goal.src = RUR.base_url + '/src/images/' + name + '_goal.png';
        obj[name].image.onload = RUR.increment_loaded;
        obj[name].image_goal.onload = RUR.increment_loaded;
        obj.nb_images += 2;
    } else {
        obj[name].image.src = url;
        obj[name].image_goal.src = url_goal;
        obj[name].image.onload = RUR.vis_world.refresh;
        obj[name].image_goal.onload = RUR.vis_world.draw_goal;
    }
    obj.known_objects.push(name);
};

RUR.add_object_image("token");
RUR.add_object_image("star");
RUR.add_object_image("triangle");
RUR.add_object_image("square");
RUR.add_object_image("strawberry");
RUR.add_object_image("banana");
RUR.add_object_image("apple");
RUR.add_object_image("leaf");
RUR.add_object_image("carrot");
RUR.add_object_image("dandelion");
RUR.add_object_image("orange");
RUR.add_object_image("daisy");
RUR.add_object_image("tulip");

RUR.add_object_image("box");
RUR.objects.box.name = "box";
RUR.objects.box.pushable = true;
RUR.objects.box.in_water = "bridge";
RUR.objects.box.ctx = RUR.ROBOT_CTX;


RUR.add_tile_image = function (name, url) {
    var tiles = RUR.tiles;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.increment_loaded;
    tiles.known_tiles.push(name);
    RUR.objects.nb_images += 1;
};

RUR.add_tile_image("mud");
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = Translate("I'm stuck in mud.");
RUR.tiles.mud.info = Translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.");

RUR.add_tile_image("ice");
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = Translate("I'm slipping on ice!");
RUR.tiles.ice.info = Translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.");

RUR.add_tile_image("grass");
RUR.tiles.grass.info = Translate("Grass: usually safe.");

RUR.add_tile_image("pale_grass");
RUR.tiles.grass.info = Translate("Grass: usually safe.");
RUR.tiles.pale_grass.name = "grass"; // replace

RUR.add_tile_image("gravel");
RUR.tiles.gravel.info = Translate("Gravel: usually safe.");


RUR.tiles.water = {};
RUR.tiles.water.name = "water";
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = Translate("I'm in water!");
RUR.tiles.water.info = Translate("Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.");
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = RUR.base_url + '/src/images/water.png';
RUR.tiles.water.image2 = new Image();
RUR.tiles.water.image2.src = RUR.base_url + '/src/images/water2.png';
RUR.tiles.water.image3 = new Image();
RUR.tiles.water.image3.src = RUR.base_url + '/src/images/water3.png';
RUR.tiles.water.image4 = new Image();
RUR.tiles.water.image4.src = RUR.base_url + '/src/images/water4.png';
RUR.tiles.water.image5 = new Image();
RUR.tiles.water.image5.src = RUR.base_url + '/src/images/water5.png';
RUR.tiles.water.image6 = new Image();
RUR.tiles.water.image6.src = RUR.base_url + '/src/images/water6.png';
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
RUR.objects.nb_images += 6;

RUR.add_tile_image("bricks");
RUR.tiles.bricks.name = "brick wall"; // replace
RUR.tiles.bricks.fatal = true;
RUR.tiles.bricks.solid = true;
RUR.tiles.bricks.detectable = true;
RUR.tiles.bricks.message = Translate("Crash!");
RUR.tiles.bricks.info = Translate("brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.");


RUR.add_home_image = function (name, info) {
    var home = RUR.home_images;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = Translate(info) + Translate("Reeborg <b>can</b> detect this tile using at_goal().");
    home[name].image = new Image();
    home[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    home[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_home_image("green_home_tile", "green home tile:");
RUR.add_home_image("house", "house:");
RUR.add_home_image("racing_flag", "racing flag:");


RUR.add_solid_object = function (name, url, nickname) {
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
        obj[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    } else {
        obj[name].image.src = url;
    }
    obj[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_solid_object("bridge");
RUR.solid_objects.bridge.info = Translate("Bridge:") + Translate("Reeborg <b>can</b> detect this and will know that it allows safe passage over water.");

RUR.add_solid_object("fence_right", false, "fence");
RUR.solid_objects.fence_right.message = Translate("I hit a fence!");
RUR.solid_objects.fence_right.info = Translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.solid_objects.fence4 = RUR.solid_objects.fence_right;  // compatibility with old worlds

RUR.add_solid_object("fence_left", false, "fence");
RUR.solid_objects.fence_left.message = Translate("I hit a fence!");
RUR.solid_objects.fence_left.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence5 = RUR.solid_objects.fence_left;  // compatibility with old worlds

RUR.add_solid_object("fence_double", false, "fence");
RUR.solid_objects.fence_double.message = Translate("I hit a fence!");
RUR.solid_objects.fence_double.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence6 = RUR.solid_objects.fence_double;  // compatibility with old worlds

RUR.add_solid_object("fence_vertical", false, "fence");
RUR.solid_objects.fence_vertical.message = Translate("I hit a fence!");
RUR.solid_objects.fence_vertical.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence7 = RUR.solid_objects.fence_vertical;  // compatibility with old worlds
