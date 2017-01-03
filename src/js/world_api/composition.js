require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");
require("./obstacles.js");
require("./background_tile.js");

RUR.transform_tile = function(x, y, name, type) {
    "use strict";
    var i, transformations, t, tile1, tile2, tile3, tile4;
    transformations = RUR.TILES[name].transform;
    if (!transformations) {
        return;
    }
    tile1 = {name:name, type:type};

    for (i=0; i<transformations.length; i++) {
        tile2 = transformations[i][0];
        tile3 = transformations[i][1];
        tile4 = transformations[i][2];
        if (RUR.compose_tiles(x, y, tile1, tile2, tile3, tile4)) {
            return;
        }
    }
};

// add note about possibly needing to record frame explicitly
RUR.compose_tiles = function(x, y, tile1, tile2, tile3, tile4) {
    var name1, name2, name3, name4, tile,
        type1, type2, type3, type4, recording_state;

    name2 = tile2.name;
    type2 = tile2.type;

    tile = get_tile(x, y, name2, type2);
    if (tile === null) {
        return false;
    }

    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;

    name1 = tile1.name;
    type1 = tile1.type;
    remove_tile(x, y, name1, type1);

    if (tile3) {
        name3 = tile3.name;
        type3 = tile3.type;
        add_tile(x, y, name3, type3);        
    }

    if (tile4) {
        remove_tile(x, y, name2, type2);
        name4 = tile4.name;
        type4 = tile4.type;
        add_tile(x, y, name4, type4);   
    }
    RUR.state.do_not_record = recording_state;
    return true;
};

function get_tile(x, y, name, type) {
    switch(type) {
        case "tiles": 
            obj = RUR.get_background_tile(x, y);
            if (obj && obj.name == name) return true;
            break;
        case "obstacles":
            if (RUR.is_obstacle(name, x, y)) return true; 
            break;
        case "pushables":
            obj = RUR.get_pushable(x, y);
            if (obj && obj.name == name) return true;
            break;
        case "bridge":
            obj = RUR.get_bridge(x, y);
            if (obj && obj.name == name) return true;
            break;
        default:
            throw new ReeborgError("Unrecognized type in RUR.compose_tiles/get_tile: " + type);
    }
    return null;
}

function add_tile(x, y, name, type) {
    switch(type) {
        case "tiles": 
            RUR.set_background_tile(name, x, y);
            break;
        case "obstacles":
            RUR.add_obstacle(name, x, y);
            break;
        case "pushables":
            RUR.add_pushable(name, x, y);
            break;
        case "bridge":
            RUR.add_bridge(name, x, y);
            break;
        default:
            throw new ReeborgError("Unrecognized type in RUR.compose_tiles/add_tile: " + type);
    }
}

function remove_tile(x, y, name, type) {
    switch(type) {
        case "tiles": 
            RUR.remove_background_tile(name, x, y);
            break;
        case "obstacles":
            RUR.remove_obstacle(name, x, y);
            break;
        case "pushables":
            RUR.remove_pushable(name, x, y);
            break;
        case "bridge":
            RUR.remove_bridge(name, x, y);
            break;
        default:
            throw new ReeborgError("Unrecognized type in RUR.compose_tiles/remove_tile: " + type);
    }
}