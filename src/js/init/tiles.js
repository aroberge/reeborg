/* This file contains the tiles included by default */
require("./../rur.js");
require("./../world_augment/add_tile_type.js");

var home_message, tile;

tile = {name: "mud",
    url: RUR._BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: true,
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_tile_type(tile);

tile = {name: "ice",
    url: RUR._BASE_URL + '/src/images/ice.png',
    message: "I'm slipping on ice!",
    slippery: true,
    info: "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."
};
RUR.add_tile_type(tile);

tile = {name: "grass",
    url: RUR._BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_tile_type(tile);

tile = {name: "pale_grass",
    url: RUR._BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
    public_name: "grass"
};
RUR.add_tile_type(tile);

tile = {name: "gravel",
    url: RUR._BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_tile_type(tile);

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
RUR.add_tile_type(tile);


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

tile = {name: "bricks",
    public_name: "brick wall",
    url: RUR._BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: true,
    solid: true
};
RUR.add_tile_type(tile);

/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR._BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);

tile = {name: "house",
    url: RUR._BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);

tile = {name: "racing_flag",
    url: RUR._BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);
