require("./utils_namespace.js");
/* short function to make the rest of the code easier
   to read */
RUR.utils.ensure_key_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};
