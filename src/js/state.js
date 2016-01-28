/* Yes, I know, global variables are a terrible thing.
   And, in a sense, the following are global variables recording a given
   state.  However, by using this convention and documentating them in a
   single place, it helps in avoiding the creation of inconsistent states.*/

require("./translator.js");

RUR.state = {};
RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "editor";
RUR.state.programming_language = "javascript"; // default for testing
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.ready = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;


// TODO: create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.


RUR.state.save = function () {
    /* Saves the current state in local storage */
    localStorage.setItem("programming_language", RUR.state.programming_language);
};

// require("./keyboard.js");
//
// RUR.state.set_programming_language = function(lang){
//     if (lang === RUR.state.programming_language) {
//         return;
//     }
//     RUR.state.programming_language = lang;
//     switch(lang){
//         case 'javascript':
//             $("#python-choices").hide();
//             $("#javascript-choices").show();
//             $("#javascript-choices").change();
//             $("#editor-tab").html(RUR.translate("Javascript Code"));
//             editor.setOption("mode", "javascript");
//             pre_code_editor.setOption("mode", "javascript");
//             post_code_editor.setOption("mode", "javascript");
//             $("#library-tab").parent().hide();
//             $("#python-additional-menu p button").attr("disabled", "true");
//             $("#py-console").hide();
//             RUR.kbd.set_programming_language("javascript");
//             break;
//         case 'python':
//             $("#python-choices").show();
//             $("#javascript-choices").hide();
//             $("#python-choices").change();
//             $("#editor-tab").html(RUR.translate("Python Code"));
//             editor.setOption("mode", {name: "python", version: 3});
//             pre_code_editor.setOption("mode", {name: "python", version: 3});
//             post_code_editor.setOption("mode", {name: "python", version: 3});
//             $("#library-tab").parent().show();
//             $("#python-additional-menu p button").removeAttr("disabled");
//             RUR.kbd.set_programming_language("python");
//             break;
//         default:
//             console.log("PROBLEM: RUR.state.set_programming_language called without args.");
//     }
//     $("#editor-tab").click(); // also handles #highlight and #watch-vars
//
//     try {
//         RUR.reset_code_in_editors();
//     } catch (e) {}
// };

RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default,
        default_instruction = RUR.translate("move"),
        library_default_en = "# from library import *";

    if (RUR.state.programming_language == "javascript") {
        editor_default = default_instruction + "();";
    } else if (RUR.state.programming_language == "python") {
        library_default = RUR.translate(library_default_en);
        library_content = localStorage.getItem(RUR.settings.library);
        if (!library_content || library_content == library_default_en){
            library_content = library_default;
        }
        library.setValue(library_content);
        editor_default = default_instruction + "()";
    }
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};
