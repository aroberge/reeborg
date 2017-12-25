/*  Original idea from Dan Schellenberg for saving and loading a solution
    using standard keyboard shortcuts using the world's name as base file name 
    and, if using Python, include the code from the library in the saved file.
*/

require("../rur.js");
require("./../translator.js");
require("./user_progress.js");
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;

// Do not change the value of library_separator()as it could break
// some programs saved previously. Note that it will be different for each
// human language - provided that a translation exists.

function library_separator() {
    return "\n" +
    "################################################################\n# " +
    RUR.translate("WARNING: Do not change this comment.") +    
    "\n# " + RUR.translate("Library Code is below.") +  
    "\n################################################################\n";
}

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
            content = editor.getValue() + library_separator()+ library.getValue();
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
            parts = content.split(library_separator());
            if (parts.length == 2) {
                library.setValue(parts[1]);
            }
            target.setValue(parts[0]);
            fileInput.value = '';
        };

        file = fileInput.files[0];
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


