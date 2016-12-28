require("./utils_namespace.js");
/* short functions to make the rest of the code easier
   to read */

//TODO: add tests and documentation

RUR.utils.ensure_key_for_obj_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    } else if (Object.prototype.toString.call(obj[key]) != "[object Object]") {
        throw Error("Expected an object.");
    }
};

RUR.utils.ensure_key_for_array_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = [];
    } else if (Object.prototype.toString.call(obj[key]) != "[object Array]") {
        throw Error("Expected an array.");
    }
};
