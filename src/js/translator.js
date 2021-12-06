require("./rur.js");
var uien = require("./../lang/ui_en.js"),
    uifr = require("./../lang/ui_fr.js"),
    uiko = require("./../lang/ui_ko.js"),
    uipl = require("./../lang/ui_pl.js"),
    uicn = require("./../lang/ui_cn.js"),
    en = require("./../lang/en.js"),
    fr = require("./../lang/fr.js"),
    cn = require("./../lang/cn.js"),
    pl = require("./../lang/pl.js");

RUR.ui_en = uien.ui_en;
RUR.en_to_en = uien.en_to_en;
RUR.ui_fr = uifr.ui_fr;
RUR.fr_to_en = uifr.fr_to_en;
RUR.ui_ko = uiko.ui_ko;
RUR.ko_to_en = uiko.ko_to_en;
RUR.ui_pl = uipl.ui_pl;
RUR.pl_to_en = uipl.pl_to_en;
RUR.ui_cn = uicn.ui_cn;
RUR.cn_to_en = uicn.cn_to_en;

RUR.en = en.en;
RUR.fr = fr.fr;
RUR.cn = cn.cn;
RUR.pl = pl.pl

RUR.untranslated = {"en":true, "fr":true, "cn":true, "pl": true};

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

RUR._translation_needed = {};
RUR._translation_to_english_needed = {};

function is_color(s) { // avoid giving warning about missing translation
    if (s.startsWith("#") || s.startsWith("rgb")) {
        return true;
    }
    return false;
}

RUR.translate = function (s) {
    if (s==undefined) {
        return "";
    }
    if (RUR.untranslated[s] || is_color(s)) {
        return s;
    } else if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        if (RUR._translation_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation needed for " + s);
            RUR._translation_needed[s] = true;
        }
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.untranslated[s] || is_color(s)) {
        return s;
    } else if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        if (RUR._translation_to_english_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation to English needed for " + s);
            RUR._translation_to_english_needed[s] = true;
        }
        return s;
    }
};
