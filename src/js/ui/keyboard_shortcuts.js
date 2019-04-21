/*  Original idea from Dan Schellenberg for saving and loading a solution
    using standard keyboard shortcuts using the world's name as base file name
    and, if using Python, include the code from the library in the saved file.
*/

require("../rur.js");
require("./../translator.js");
require("./user_progress.js");
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;


function saveSolution() {
    /* Saves the solution (code in the editor and, if using Python,
    code in the library) for a given world in a single file.

    The base file name is taken to be the World's name, as it appears
    in the html selector.
    */
    var blob, extension, filename, filetype, parts, selectedWorld;

    selectedWorld = document.getElementById("select-world");

    filename = selectedWorld.options[selectedWorld.selectedIndex].text;
    // If the world was loaded from a URL without using a second argument
    // the filename might contain "/" which is an invalid filename character
    if (filename.indexOf("/") !== -1) {
        parts = filename.split("/");
        filename = parts[parts.length-1];
    }

    filename = RUR.strip_checkmark(filename); // remove marks for completed task.


    switch(RUR.state.input_method) {
        case "python":
            filetype = "text/python;charset=utf-8";
            extension = ".py";
            content = editor.getValue() + RUR.library_separator()+ library.getValue();
            break;
        case "blockly-py":
        case "blockly-js":
            filetype = "text/xml;charset=utf-8";
            extension = ".xml";
            content = RUR.blockly.getValue();
            break;
        case "javascript":
            filetype = "text/javascript;charset=utf-8";
            extension = ".js";
            content = editor.getValue();
            break;
        case "py-repl":
            alert(RUR.translate("No solution can be saved when using REPL (Py)."));
            return;
    }

    blob = new Blob([content], {type: filetype});
    saveAs(blob, filename + extension, true);
}


function loadSolution () {
    /* see saveSolution above */
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();
    fileInput = document.getElementById('fileInput');


    fileInput.addEventListener('change', function(e) {
        var file, reader;
        reader = new FileReader();
        reader.onload = function(e) {
            var content, parts, target;
            switch(RUR.state.input_method) {
                case "python":
                case "javascript":
                    target = editor;
                    break;
                case "blockly-py":
                case "blockly-js":
                    target = RUR.blockly;
                    break;
                case "py-repl":
                    alert(RUR.translate(
                            "No solution can be loaded when using REPL (Py).")
                         );
                    return;
            }
            content = reader.result;
            parts = content.split(RUR.library_separator());
            if (parts.length == 2) {
                library.setValue(parts[1]);
            }
            target.setValue(parts[0]);
            fileInput.value = '';
        };

        file = fileInput.files[0];
        // We assume that the file name has been saved with the default
        //    world name.py
        // where "world name" is the name of the corresponding world as
        // shown in the HTML select. We thus remove the .py extension
        // and try to load that world, for convenience.
        let worldToLoad = file.name.split(".")[0];
        let worldURL = RUR.world_selector.url_from_shortname(worldToLoad);
        if (worldURL !== undefined) {
            RUR.world_selector.set_url(worldURL);
        }
        //It could be a good idea to provide a UI dialogue if the world can't auto-load?
        // else {
        //     alert("Can't auto-load the correct world file... please select the correct world from the menu."));
        // }
        RUR.reload();
        reader.readAsText(file);
    });
}


document.onkeydown = function (e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        saveSolution();
    }

    if (e.keyCode == 79 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        loadSolution();
    }
};

$(document).ready(function() {
    $("#open-solution-btn").on("click", function (evt) {
    loadSolution();
    });
    $("#save-solution-btn").on("click", function (evt) {
        saveSolution();
    });
});


