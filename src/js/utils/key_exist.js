require("./utils_namespace.js");
RUR.utils.ensure_key_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};
