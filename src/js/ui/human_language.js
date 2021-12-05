require("./../rur.js");
require("./../programming_api/reeborg_en.js");
require("./../programming_api/reeborg_fr.js");
require("./../programming_api/reeborg_cn.js");
require("./../programming_api/reeborg_pl.js");

require("./../programming_api/blockly.js");
require("./../ui/custom_world_select.js");
require("./../permalink/permalink.js");

var msg = require("./../../lang/msg.js");
msg.record_id("human-language");
msg.record_id("mixed-language-info");

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}

function update_translations(lang) {
    $("#mixed-language-info").show();
    $("#mixed-language-info").fadeOut(5000);
    switch(lang) {
        case "en":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
        case "fr":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_fr();
            $("#mixed-language-info").hide();
            break;
        case "pl":
            RUR.translation = RUR.ui_pl;
            merge_dicts(RUR.translation, RUR.pl);
            RUR.translation_to_english = RUR.pl_to_en;
            blockly_init_pl();
            $("#mixed-language-info").hide();
            break;
        case "cn":
            RUR.translation = RUR.ui_cn;
            merge_dicts(RUR.translation, RUR.cn);
            RUR.translation_to_english = RUR.cn_to_en;
            blockly_init_cn();
            $("#mixed-language-info").hide();
            break;
        case "en-fr":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_fr();
            break;
        case "fr-en":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_en();
            break;
        case "ko-en":
            RUR.translation = RUR.ui_ko;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            break;
        case "pl-en":
            RUR.translation = RUR.ui_pl;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.pl_to_en;
            blockly_init_pl(); // to be updated
            break;
        case "en-cn":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.cn);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_cn();
            break;
        case "cn-en":
            RUR.translation = RUR.ui_cn;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.cn_to_en;
            blockly_init_en();
            break;
        default:
        console.log("Default used");
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
    }
    $("#mixed-language-info").html(RUR.translate(lang));
}

function update_commands (lang) {
    switch(lang) {
        case "fr":
        case "en-fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "pl":  // TODO: complete this
        case "en-pl":
            RUR.reset_definitions = RUR.reset_definitions_pl;
            RUR.library_name = "biblioteka";
            RUR.from_import = "from reeborg_pl import *";
            break;
        case "cn":
        case "en-cn":
            RUR.reset_definitions = RUR.reset_definitions_cn;
            RUR.library_name = "库";
            RUR.from_import = "from reeborg_cn import *";
            break;
        case "en":
        case "fr-en":
        case "ko-en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}

function update_home_url (lang) {
    switch(lang) {
        case "fr":
        case "fr-en":
            $("#logo").prop("href", "index_fr.html");
            break;
        case "cn":
        case "cn-en":
            $("#logo").prop("href", "index_cn.html");
            break;
        case "en":
        case "en-fr":
            $("#logo").prop("href", "index_en.html");
            break;
        default:
            $("#logo").prop("href", "index_en.html");
    }
}

RUR.listeners['human-language'] = function() {
    var lang = $(this).val();

    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    update_home_url(lang);
    RUR.make_default_menu(lang);

    RUR.blockly.init();

    if (RUR.state.programming_language == "python") {
        $("#editor-tab").html(RUR.translate("Python Code"));
    } else {
        $("#editor-tab").html(RUR.translate("Javascript Code"));
    }

    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.warn("Problem with human-language change: can not re/start repl", e);
        }
    }
    localStorage.setItem("human_language", lang);
    if (RUR.state.session_initialized) {
        RUR.permalink.update_URI();
    }
};
