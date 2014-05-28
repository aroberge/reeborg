/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode */

var RUR = {};
RUR.settings = {};
RUR.settings.editor = "editor_py";
RUR.settings.library = "library_py";
RUR.programming_language = "python";

RUR.run = function () {
    var src, fatal_error_found = false;
    src = library.getValue() + "\n" + editor.getValue();

    try {
        if (RUR.programming_language === "javascript") {
            eval(src);  // jshint ignore:line
        } else if (RUR.programming_language === "python") {
            // translate_python is found in html file
            translate_python(src);
        } else if (RUR.programming_language === "coffee") {
            eval(CoffeeScript.compile(src)); // jshint ignore:line
        } else {
            alert("Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        alert("Error in code; view console.");
        console.log(e);
        return;
    }

    try {
        localStorage.setItem(RUR.settings.editor, editor.getValue());
        localStorage.setItem(RUR.settings.library, library.getValue());
    } catch (e) {}

};


write = function (s) {
    $("#output-pre").append(s.toString() + "\n");
};

RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default;
    
    if (RUR.programming_language == "javascript") {
        library_default = "/* Put your Library code here*/\n\n";
        editor_default = "// Write code here.\n\n";
    } else if (RUR.programming_language == "python") {
        library_default = "# Put your Library code here.\n\n";
        editor_default = "# Write code here.\n\n";
    } else if (RUR.programming_language == "coffee") {
        library_default = "# Put your Library code here.\n\n";
        editor_default = "# Write code here.\n\n";
    }
    library_content = localStorage.getItem(RUR.settings.library);
    if (!library_content){
        library_content = library_default;
    }
    library.setValue(library_content);
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};


RUR.reset_programming_language = function(choice){
    RUR.settings.current_language = choice;
    try { 
        localStorage.setItem("last_programming_language", RUR.settings.current_language);
    } catch (e) {}
    switch(RUR.settings.current_language){
        case 'python':
            RUR.settings.editor = "editor_py";
            RUR.settings.library = "library_py";
            RUR.programming_language = "python";
            $("#editor-link").html("Python Code");
            editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            break;
        case 'javascript':
            RUR.settings.editor = "editor_js";
            RUR.settings.library = "library_js";
            RUR.programming_language = "javascript";
            $("#editor-link").html("Javascript Code");
            RUR.strict_javascript = false;
            editor.setOption("mode", "javascript");
            library.setOption("mode", "javascript");
            break;
        case 'coffeescript':
            RUR.settings.editor = "editor_coffee";
            RUR.settings.library = "library_coffee";
            RUR.programming_language = "coffee";
            $("#editor-link").html("CoffeeScript Code");
            editor.setOption("mode", "coffeescript");
            library.setOption("mode", "coffeescript");
            break;
    }            
    try { 
        RUR.reset_code_in_editors();
    } catch (e) {}
};

$(document).ready(function() {
    
    var child, button_closed = false, programming_language, _all_files = "";

    $("#header-child button").on("click", function(){
        var index, label, children;
        $(this).toggleClass("active");
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
        label = $(this).attr("label");

        children = $("#panels").children();
        for (index = 0; index < children.length; index++){
            child = $(children[index]);
            if (child.attr("id") === label) {
                child.toggleClass("active");
            }
        }

        if (label === "world-panel"){
            $("#world-panel").toggleClass("active");
        }  else if (label === "output-panel"){
            $("#output-panel").toggleClass("active");
        }  else if (label === "editor-panel"){
            $("#editor-panel").toggleClass("active");
        }
    
        if ($("#output-panel").hasClass("active")) {
            if ( $("#world-panel").hasClass("active")) {
                RUR.canvas_visible = true;
                $("#run2").hide();
                $("#reload2").hide();
            } else {
                $("#run2").show();
                $("#reload2").show();
                RUR.canvas_visible = false;
            }
        }

    });

    $(function() {
        $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
            }
        });
    });
    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
        }
    });
    $("#output-panel").resizable();

    $("#editor-link").on("click", function(){
        $("#save-library").hide();
        $("#load-library").hide();
        $("#save-editor").show();
        $("#load-editor").show();
    });
    $("#library-link").on("click", function(){
        $("#save-editor").hide();
        $("#load-editor").hide();
        $("#save-library").show();
        $("#load-library").show();
    });

    var load_file = function(obj) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                obj.setValue(reader.result);
                fileInput.value = "";
            };
            reader.readAsText(file);	
        }); 
    };

    $("#load-editor").on("click", function(evt) {
        load_file(editor);
    });
  
    $("#load-library").on("click", function(evt) {
        load_file(library);
    });
  

    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });

    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
    });

    RUR.reset_code_in_editors();
});

