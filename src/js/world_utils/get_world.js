require("./../rur.js");

/*  This function returns a World as a json object. Since the
 *  internal structure of worlds is subject to change, it is
 *  not advised to make use of this function inside a world definition. 
 *  
 *  However, it can be useful as a means to explore the
 *  world structure, or assign advanced students to write their own 
 *  functions based on the world structure (for example: find
 *  the shortest path in a maze using various search algorithms.)
 *
 */
exports.get_world = get_world = function () {
    return RUR.CURRENT_WORLD;
};



