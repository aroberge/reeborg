require("./../rur.js");
/* short functions to make the rest of the code easier
   to read */

RUR.utils.ensure_key_for_obj_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    } else if ((Object.prototype.toString.call(obj[key]) != "[object Object]") && (Object.prototype.toString.call(obj[key]) != "[object String]")) {
    //} else if (Object.prototype.toString.call(obj[key]) !== "[object Object]") {
        throw Error("Expected an object in RUR.utils.ensure_key_for_obj_exists.");
    }
};

RUR.utils.ensure_key_for_array_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = [];
    } else if (Object.prototype.toString.call(obj[key]) !== "[object Array]") {
        throw Error("Expected an array in RUR.utils.ensure_key_for_array_exists.");
    }
};
