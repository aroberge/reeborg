/*  conversion utilities */

function convert_world (old_world){
    /** Converts world (from website) using the format pre-summer 2015
    to the new format introduced in late spring/early summer 2015.

    Input: world as a string  (i.e. json object "stringified")
    Output: world as a string

    In the old format, at each grid coordinate, we could have
    either 1) an arbitrary number of tokens or 2) a single
    shape, but not both.

    In the new format, an arbitrary number of objects can be found
    at a single grid location.

    Unchanged format:
        * robot initial position
        * robot final position  (final orientation ignored in new world)
        * walls
        * walls to be built
    */
    "use strict";
    var new_world, coord, shape, robot, i;

    new_world = JSON.parse(old_world);

    /* Robot carrying tokens */
    if (new_world.robots.length === 1){
        robot = new_world.robots[0];
        if (robot.tokens !== undefined) {
            robot.objects = {"token": robot.tokens};
            delete robot.tokens;
        }
    }

    /* Tokens found in world */
    if (new_world.tokens !== undefined) {
        new_world.objects = {};
        for (coord in new_world.tokens) {
            if (new_world.tokens.hasOwnProperty(coord)) {
                new_world.objects[coord] = {"token":new_world.tokens[coord]};
            }
        }
        delete new_world.tokens;
    }

    /* Various shapes found in world */
    if (new_world.shapes !== undefined){
        if (new_world.objects === undefined) {
            new_world.objects = {};
        }
        for (coord in new_world.shapes) {
            if (new_world.shapes.hasOwnProperty(coord)) {
                shape = new_world.shapes[coord];
                new_world.objects[coord] = {};
                new_world.objects[coord][shape] = 1;
            }
        }
        delete new_world.shapes;
    }

    /*  In the old format, only one special tile type existed (mud)
        and it was done as "other".
    */
    if (new_world.other !== undefined){
        if (new_world.other.mud !== undefined) {
            if (new_world.tiles === undefined) {
                new_world.tiles = {};
            }
            for (i=0; i<new_world.other.mud.length; i++) {
                coord = new_world.other.mud[i];
                new_world.tiles[coord] = "mud";
            }
        }
        delete new_world.other;
    }


    /* small tile size */
    if (new_world.large_world !== undefined && new_world.large_world) {
        new_world.small_tiles = true;
        new_world.rows = 26;
        new_world.cols = 29;
        delete new_world.large_world;
    }


    /****  Converting goals  ****/

    /* Tokens to be put in world */
    if (new_world.goal !== undefined) {
        if (new_world.goal.tokens !== undefined) {
            new_world.goal.objects = {};
            for (coord in new_world.goal.tokens) {
                if (new_world.goal.tokens.hasOwnProperty(coord)) {
                    new_world.goal.objects[coord] = {"tokens":new_world.goal.tokens[coord]};
                }
            }
            delete new_world.goal.tokens;
        }
    }

    /* Various shapes found in world */
    if (new_world.goal !== undefined) {
        if (new_world.goal.shapes !== undefined){
            if (new_world.goal.objects === undefined) {
                new_world.goal.objects = {};
            }
            for (coord in new_world.goal.shapes) {
                if (new_world.goal.shapes.hasOwnProperty(coord)) {
                    shape = new_world.goal.shapes[coord];
                    new_world.goal.objects[coord] = {};
                    new_world.goal.objects[coord][shape] = 1;
                }
            }
            delete new_world.goal.shapes;
        }
    }

    return JSON.stringify(new_world);
}

function convert_permalink(old_permalink){
    var url_query, new_permalink, world, query_keys;

    url_query = parseUri(old_permalink);
    if (url_query.queryKey.world === undefined) {
        return old_permalink;
    }

    world = decodeURIComponent(url_query.queryKey.world);
    world = convert_world(world);
    world = encodeURIComponent(world);

    // reconstruct permalink

    new_permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        new_permalink += ":" + url_query.port;
    }
    new_permalink += url_query.path;

    new_permalink += "?proglang=" + url_query.queryKey.proglang;
    if (url_query.queryKey.world !== undefined){
        new_permalink += "&world=" + world;
    }
    if (url_query.queryKey.editor !== undefined){
        new_permalink += "&editor=" + url_query.queryKey.editor;
    }
    if (url_query.queryKey.library !== undefined){
        new_permalink += "&library=" + url_query.queryKey.library;
    }
    return new_permalink;
}
