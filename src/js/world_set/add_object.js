/* This function adds a specified quantity of a given object as a certain
   location.  By "object" we mean a type of object that can be

*/
require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../objects.js");
require("./../translator.js");

RUR.add_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;
    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    RUR._ensure_key_exists(RUR.current_world, "objects");
    RUR._ensure_key_exists(RUR.current_world.objects, coords);

    if (nb === 0) {
        delete RUR.current_world.objects[coords][specific_object];
        if (Object.keys(RUR.current_world.objects[coords]).length === 0){
            delete RUR.current_world.objects[coords];
        }
    } else {
        RUR.current_world.objects[coords][specific_object] = nb;
    }
};
