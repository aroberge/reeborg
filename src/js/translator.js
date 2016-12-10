require("./rur.js");
require("./../lang/ui_en.js");
require("./../lang/ui_fr.js");
require("./../lang/ui_ko.js");

require("./../lang/en.js");
require("./../lang/fr.js");
RUR.untranslated = {"en":true, "fr":true};

RUR.translation = RUR.ui_en;
RUR.translation_to_english = RUR.en_to_en;

RUR.translate = function (s) {
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation !== undefined && RUR.translation[s] !== undefined) {
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
