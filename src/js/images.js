
RUR.objects = {};
RUR.tiles = {};
RUR.top_tiles = {};
RUR.home_images = {};
RUR.objects.known_objects = [];

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

    } else {
        obj[name].image.src = url;
        obj[name].image_goal.src = url_goal;
    }
    obj[name].image.onload = RUR.increment_loaded;
    obj[name].image_goal.onload = RUR.increment_loaded;
    obj.nb_images += 2;
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


RUR.add_tile_image = function (name) {
    var tile = RUR.tiles;
    tile[name] = {};
    tile[name].name = name;
    tile[name].image = new Image();
    tile[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    tile[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_tile_image("mud");
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.info = RUR.translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.");

RUR.add_tile_image("ice");
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.info = RUR.translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.");

RUR.add_tile_image("grass");
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");

RUR.add_tile_image("pale_grass");
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");
RUR.tiles.pale_grass.name = "grass"; // replace

RUR.add_tile_image("gravel");
RUR.tiles.gravel.info = RUR.translate("Gravel: usually safe.");


RUR.tiles.water = {};
RUR.tiles.water.name = "water";
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.info = RUR.translate("Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.");
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
RUR.tiles.bricks.message = RUR.translate("Crash!");
RUR.tiles.bricks.info = RUR.translate("brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.");


RUR.add_home_image = function (name, info) {
    var home = RUR.home_images;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = RUR.translate(info) + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
    home[name].image = new Image();
    home[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    home[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_home_image("green_home_tile", "green home tile:");
RUR.add_home_image("house", "house:");
RUR.add_home_image("racing_flag", "racing flag:");


RUR.add_top_tile = function (name, nickname) {
    var tile = RUR.top_tiles;
    tile[name] = {};
    if (nickname === undefined) {
        tile[name].name = name;
    } else {
        tile[name].name = nickname;
        tile[name].fatal = true;
        tile[name].solid = true;
        tile[name].detectable = true;
    }
    tile[name].ctx = RUR.SECOND_LAYER_CTX;
    tile[name].image = new Image();
    tile[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    tile[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_top_tile("bridge");
RUR.top_tiles.bridge.info = RUR.translate("Bridge:") + RUR.translate("Reeborg <b>can</b> detect this and will know that it allows safe passage over water.");

RUR.add_top_tile("fence_right", "fence");
RUR.top_tiles.fence_right.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence_right.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence4 = RUR.top_tiles.fence_right;  // compatibility with old worlds

RUR.add_top_tile("fence_left", "fence");
RUR.top_tiles.fence_left.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence_left.info = RUR.top_tiles.fence_right.info;
RUR.top_tiles.fence5 = RUR.top_tiles.fence_left;  // compatibility with old worlds

RUR.add_top_tile("fence_double", "fence");
RUR.top_tiles.fence_double.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence_double.info = RUR.top_tiles.fence_right.info;
RUR.top_tiles.fence6 = RUR.top_tiles.fence_double;  // compatibility with old worlds

RUR.add_top_tile("fence_vertical", "fence");
RUR.top_tiles.fence_vertical.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence_vertical.info = RUR.top_tiles.fence_right.info;
RUR.top_tiles.fence7 = RUR.top_tiles.fence_vertical;  // compatibility with old worlds
