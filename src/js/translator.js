require("./rur.js");
var uien = require("./../lang/ui_en.js"),
    uifr = require("./../lang/ui_fr.js"),
    uiko = require("./../lang/ui_ko.js"),
    en = require("./../lang/en.js"),
    fr = require("./../lang/fr.js");

RUR.ui_en = uien.ui_en;
RUR.en_to_en = uien.en_to_en;
RUR.ui_fr = uifr.ui_fr;
RUR.fr_to_en = uifr.fr_to_en;
RUR.ui_ko = uiko.ui_ko;
RUR.ko_to_en = uiko.ko_to_en;
RUR.en = en.en;
RUR.fr = fr.fr;

RUR.untranslated = {"en":true, "fr":true};

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}
RUR.translation = RUR.ui_en;
merge_dicts(RUR.translation, RUR.en);
RUR.translation_to_english = RUR.en_to_en;

RUR.translate = function (s) {
    if (s==undefined) {
        return "";
    }
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        console.warn("Translation needed for " + s);
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        console.warn("Translation to English needed for " + s);
        return s;
    }
};
