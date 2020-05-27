/*  conversion utilities */

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


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

    /* variable number of tokens
       We have three variables defined - only one needs to be converted
       */
    if (new_world.tokens_range !== undefined) {
        if (new_world.objects === undefined) {
            new_world.objects = {};
        }

        for (coord in new_world.tokens_range) {
            if (new_world.tokens_range.hasOwnProperty(coord)) {
                new_world.objects[coord] = {"token":new_world.tokens_range[coord]};
            }
        }
        delete new_world.tokens_range;
    }
    if (new_world.min_tokens !== undefined) {
        delete new_world.min_tokens;
    }
    if (new_world.max_tokens !== undefined) {
        delete new_world.max_tokens;
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
                    new_world.goal.objects[coord] = {"token":new_world.goal.tokens[coord]};
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
    var url_query, new_permalink, world;

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
    new_permalink += "&world=" + world;
    if (url_query.queryKey.editor !== undefined){
        new_permalink += "&editor=" + url_query.queryKey.editor;
    }
    if (url_query.queryKey.library !== undefined){
        new_permalink += "&library=" + url_query.queryKey.library;
    }
    return new_permalink;
}

function convert_rurple_world (wld_file) {
    var coord, i, world_info, new_coord, reeborg, orientation, wall_info;
    var world = {"robots": []};

    wld_file = wld_file.replace(/\(/g, '"').replace(/\)/g, '"').replace(/ /g, '');
    eval(wld_file);
    if (avenues !== undefined) {
        world.cols = avenues;
    }

    if (streets !== undefined) {
        world.rows = streets;
    }

    if (beepers !== undefined) {
        world.objects = {};
        for (coord in beepers) {
            if (beepers.hasOwnProperty(coord)) {
                world.objects[coord] = {"token": beepers[coord]};
            }
        }
    }

    if (walls !== undefined) {
        world.walls = {};
        for (i=0; i<walls.length; i++) {
            coord = walls[i];
            wall_info = locate_wall(coord);
            new_coord = wall_info.x + "," + wall_info.y;
            if (world.walls[new_coord] === undefined) {
                world.walls[new_coord] = [wall_info.side];
            } else {
                world.walls[new_coord].push(wall_info.side);
            }
        }
    }

    if (robot !== undefined) {
        robot = robot.split(",");
        reeborg = {};
        reeborg.x = parseInt(robot[0]);
        reeborg.y = parseInt(robot[1]);
        orientation = {"e":0, "n":1, "w":2, "s":3};
        reeborg.orientation = orientation[eval(robot[2]).toLowerCase()];
        reeborg.objects = {"token": robot[3]};
        world.robots.push(reeborg);
    }

    return JSON.stringify(world);
}

function locate_wall(coord) {
    /* In RUR-PLE, the location of walls was obtained by dividing
       each of the coordinates x and y by 2. Only one of x and y was
       even.  If x was even, we had an East wall, otherwise it was a
       North wall. */
    var x, y;
    coord = coord.split(",");
    wall = {};

    x = parseInt(coord[0]);
    y = parseInt(coord[1]);
    wall.x = Math.floor(x/2);
    wall.y = Math.floor(y/2);
    if (x%2 === 0) {
        wall.side = "east";
        wall.y += 1;
    } else {
        wall.side = "north";
        wall.x += 1;
    }


    return wall;
}
