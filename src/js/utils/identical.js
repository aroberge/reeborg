/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js

    Modified to assume that order of arrays is irrelevant
    (which it should be since this is meant to be used to
    compare worlds.)  Also adapted to ignore empty objects
    when doing comparison; for worlds, only non-empty objects
    are meaningful and can be compared.
*/

exports.identical = identical = function (a, b) {
    if (a===b) {
        return true;
    }
    // make copies to avoid chaning the original
    if (a !== undefined) {
        a = JSON.parse(JSON.stringify(a));
    }
    if (b !== undefined) {
        b = JSON.parse(JSON.stringify(b));
    }


    function sort(object) {
        if (object === undefined) {
            return undefined;
        }
        if (Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        } else if (Object.keys(object).length === 0){
            return undefined;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

