require("./../rur.js");

/** @function add_new_tile_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, the images for that object are
 *    replaced.  Two images must be provided: one for the object itself, and
 *    another when this object is specified as a goal. N.B. existing names
 *    are the English ones.
 *
 * @desc Cette fonction permet l'ajout de nouveaux objets.  Si le nom d'un
 *   objet existant est spécifié, les images pour cet objet seront remplacées
 *   par les nouvelles images fournies.  N.B. les noms d'objets par défaut sont
 *   des noms anglais (par exemple "token" plutôt que "jeton").
 *
 * @param {string} specific_object The name of the object type ; e.g. "mouse" <br>
 *                        _Le nom du type de l'objet; par exemple, "souris"._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} url_goal - URL where the image as a goal can be found.
 *                    <br> _URL où l'image comme but peut être trouvée_
 *
 */
RUR.TILES = {};

RUR.add_new_tile_type = function (tile) {
    var i, tiles = RUR.TILES;
    name = tile.name;
    tiles[name] = {};
    tiles[name].name = tile.name;
    if (tile.public_name) {
        tiles[name].name = tile.public_name;
    }
    if (tile.url) {
        tiles[name].image = new Image();
        tiles[name].image.src = tile.url;
        RUR._NB_IMAGES_TO_LOAD += 1;
        tiles[name].image.onload = RUR.INCREMENT_LOADED_FN;
    } else if (tile.images) {
        for (i=0; i < tile.images.length; i++){
            tiles[name]["image"+i] = new Image();
            tiles[name]["image"+i].src = tile.images[i];
            tiles[name]["image"+i].onload = RUR.INCREMENT_LOADED_FN;
        }
        RUR._NB_IMAGES_TO_LOAD += tile.images.length;
        if (tile.selection_method === "sync") {
            tiles[name].choose_image = function (coords) {
                return _sync(tiles[name], tile.images.length, coords);
            };
        } else if (tile.selection_method === "ordered") {
            tiles[name].choose_image = function (coords) {
                return _ordered(tiles[name], tile.images.length, coords);
            };
        } else {
            tiles[name].choose_image = function (coords) {
                return _random(tiles[name], tile.images.length);
            };
        }

    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }

    tiles[name].info = tile.info;
    if (tile.home) {
        tiles[name].detectable = true;
    } else {
        tiles[name].fatal = tile.fatal;
        tiles[name].detectable = tile.detectable;
        tiles[name].message = tile.message;
        tiles[name].slippery = tile.slippery;
        tiles[name].solid = tile.solid;
    }

    RUR.KNOWN_TILES.push(name);
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
