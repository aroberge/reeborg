/* Yes, I know, global variables are a terrible thing.
   And, in a sense, the following are global variables recording a given
   state.  However, by using this convention and documentating them in a
   single place, it helps in avoiding the creation of inconsistent states.*/

require("./translator.js");

/** @namespace state
 * @memberof RUR.private
 * @property {boolean} code_evaluated - True if code has been evaluated and ready for playback.
 * @property {boolean} do_not_record - If True, recording of frames do not occur.
 * @property {boolean} editing_world - True if currently editing the world.
 * @property {boolean} highlight - Indicates if the Python code in the editor will be
 *     highlighted during the playback.
 * @property {string} human_language - Standard two letter code
 * @property {boolean} images_loaded - Indicates if all images have been loaded
 *          so that the splash screen can be removed
 * @property {string} input_method - Get program from "editor", "blockly" or "repl"?
 * @property {string} programming_language - "python" or "javascript"
 * @property {boolean} playback - True if playback active and not paused.
 * @property {boolean} prevent_playback - TODO: see if this can be removed.
 * @property {string} sound_id - "global" variable intended for private use.
 * @property {boolean} sound_on - indicates if attempt must be made to play sounds.
 * @property {string} specific_object - Object selected while editing world.
 * @property {boolean} stop_called - True if stop button has been clicked.
 * @property {boolean} watch_vars - Python only: set to True if watching variables
 * @property {integer} x - Position selected while editing world.
 * @property {integer} y - Position selected while editing world.
 */
RUR.state = {};
RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.images_loaded = false;
RUR.state.input_method = "editor";
RUR.state.programming_language = "javascript"; // default for testing
RUR.state.playback = false;
RUR.state.prevent_playback = false;
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

/** @function save
 *  @memberof RUR.private.state
 *  @instance
 *  @summary Intended to save selected subset of state to local storage so that
 *  future sessions can resume in same state.
 */
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
//             $("#python_choices").hide();
//             $("#javascript_choices").show();
//             $("#javascript_choices").change();
//             $("#editor-tab").html(RUR.translate("Javascript Code"));
//             editor.setOption("mode", "javascript");
//             pre_code_editor.setOption("mode", "javascript");
//             post_code_editor.setOption("mode", "javascript");
//             $("#library-tab").parent().hide();
//             $("#python-additional-menu p button").attr("disabled", "true");
//             $("#py_console").hide();
//             RUR.kbd.set_programming_language("javascript");
//             break;
//         case 'python':
//             $("#python_choices").show();
//             $("#javascript_choices").hide();
//             $("#python_choices").change();
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
