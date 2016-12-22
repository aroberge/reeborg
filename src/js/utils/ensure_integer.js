require("./../rur.js");
require("./../exceptions.js");

RUR.utils.require_positive_integer = function(n, info){
    "use strict";
    if (typeof n==='number' && (n%1)===0 && n>0) {
        return;
    }
    throw new RUR.ReeborgError(info + " must be a positive integer.");
};

RUR.utils.require_positive_integer_or_zero = function(n, info){
    "use strict";
    if (typeof n==='number' && (n%1)===0 && n>=0) {
        return;
    }
    throw new RUR.ReeborgError(info + " must be a positive integer or zero.");
};
