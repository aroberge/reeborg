require("./../rur.js");

/** @function add_tile_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new tiles. If the name
 *    of an existing tile is specified again, it is replaced by a new one
 *    which may have completely different characteristics.
 *
 * @desc Cette fonction permet l'ajout de nouveaux tuiles.  Si le nom d'une
 *   tuile existante est spécifiée, elle est remplacée par la nouvelle qui pourrait
 *   avoir des caractéristiques complètement différentes.
 *   N.B. les noms de tuiles par défaut sont
 *   des noms anglais (par exemple "grass" plutôt que "gazon").
 */
RUR.TILES = {};

RUR.add_tile_type = function (new_tile) {
    "use strict";
    var i, key, keys, name, tile;
    name = new_tile.name;
    if (RUR.KNOWN_TILES.indexOf(new_tile.name) != -1) {
        console.log("Warning: tile name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }
    RUR.TILES[name] = {};
    tile = RUR.TILES[name];
    // copy all properties
    keys = Object.keys(new_tile);
    for(i=0; i < keys.length; i++){
        key = keys[i];
        tile[key] = new_tile[key];
    }
    // allow multiple tiles to appear under the same name;
    // for example, we might want to visually have different types of grass tiles
    // but referring under the single name "grass" when giving information
    if (tile.public_name) {
        tile.name = tile.public_name;
    }
    if (tile.url) {
        tile.image = new Image();
        tile.image.src = tile.url;
        RUR._NB_IMAGES_TO_LOAD += 1;
        tile.image.onload = RUR.INCREMENT_LOADED_FN;
    } else if (tile.images) {
        for (i=0; i < tile.images.length; i++){
            tile["image"+i] = new Image();
            tile["image"+i].src = tile.images[i];
            tile["image"+i].onload = RUR.INCREMENT_LOADED_FN;
        }
        RUR._NB_IMAGES_TO_LOAD += tile.images.length;
        if (tile.selection_method === "sync") {
            tile.choose_image = function (coords) {
                return _sync(tile, tile.images.length, coords);
            };
        } else if (tile.selection_method === "ordered") {
            tile.choose_image = function (coords) {
                return _ordered(tile, tile.images.length, coords);
            };
        } else {
            tile.choose_image = function (coords) {
                return _random(tile, tile.images.length);
            };
        }
    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }
};

_random = function (tile, nb) {
    // each tile is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return tile["image" + choice];
};
_ordered = function (tile, nb, coords) {
    // each tile is given a random initial value but then goes in order

    if (RUR._ORDERED_TILES[tile.name] === undefined) {
        RUR._ORDERED_TILES[tile.name] = {};
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED_TILES[tile.name]).indexOf(coords) === -1) {
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED_TILES[tile.name][coords] += 1;
        RUR._ORDERED_TILES[tile.name][coords] %= nb;
    }
    return tile["image" + RUR._ORDERED_TILES[tile.name][coords]];
};
_sync = function (tile, nb, coords) {
    // every tile of this type is kept in sync
    if (RUR._SYNC_TILES[tile.name] === undefined) {
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] = 1;
    } else if (RUR._SYNC_TILES[tile.name].indexOf(coords) !== -1) {
        // see a same tile present: we are starting a new sequence
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] += 1;
        RUR._SYNC_TILES_VALUE[tile.name] %= nb;
    }
    RUR._SYNC_TILES[tile.name].push(coords);
    return tile["image" + RUR._SYNC_TILES_VALUE[tile.name]];
};
