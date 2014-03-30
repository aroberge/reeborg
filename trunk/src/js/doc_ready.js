/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world*/

$(document).ready(function() {
    try {
        RUR.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.select_world("Alone");
    }
    // init
    var child, button_closed = false;

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
        
        update_controls();

    });

    $(function() {
        $("#tabs").tabs({heightStyle: "auto"});
    });

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
  
    var _all_files = "";
    if (RUR.programming_language == "javascript"){
        _all_files = "*.js";
    } else if (RUR.programming_language == "python") {
        _all_files = "*.py";
    }
  
  
    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });
  
  
    $("#edit-world").on("click", function(evt) {
        toggle_editing_mode();
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
    });
  
    $("#save-world").on("click", function(evt) {
        var blob = new Blob([RUR.world.json_world_string], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "*.json");
    });

  
    $("#load-world").on("click", function(evt) {
        $("#worldfileInput").show();
        var fileInput = document.getElementById('worldfileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    $("#worldfileInput").hide();
                } catch (e) {
                    alert(RUR.translation["Invalid world file."]);
                }
                fileInput.value = "";
            };
            reader.readAsText(file);	
        }); 
    });
    
    $("#memorize-world").on("click", function(evt) {
        var response = prompt("Enter world name to save");
        if (response !== null) {
            RUR.edit_world.save_world(response.trim());
            $('#delete-world').show(); 
        }
    });
    
    $("#delete-world").on("click", function(evt) {
        var response = prompt("Enter world name to delete");
        if (response !== null) {
            RUR.edit_world.delete_world(response.trim()); 
        }
    });
  
    $("#robot_canvas").on("click", function (evt) {
        if (!RUR.editing_world) {
            return;
        }
        RUR.edit_world.edit_world();
    });
    
    try {  
        var library_comment = '', library_content, editor_content;
        if (RUR.programming_language == "javascript") {
            library_comment = RUR.translation["/* Your special code goes here */\n\n"];
        } else if (RUR.programming_language == "python") {
            library_comment = RUR.translation["# Your special code goes here \n\n"];
        }
        library_content = localStorage.getItem(RUR.settings.library) || library_comment;
        library.setValue(library_content);
      
        editor_content = localStorage.getItem(RUR.settings.editor) || editor.getValue();
        editor.setValue(editor_content);
      
    } catch (e){ alert("Your browser does not support localStorage; you will not be able to save your functions in the library or your notes.");
                }

    $("#contents-button").on("click", toggle_contents_button);

    $("#help").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#help-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});
  
    $("#help-button").on("click", function() {
        if ($("#help-button").hasClass("reverse-blue-gradient")) {
            $("#help").dialog("open");
        } else {
            $("#help").dialog("close");
        }
        return;
    });

    $("#Reeborg-says").dialog({minimize: false, maximize: false, autoOpen:false, width:500, position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});

    editor.widgets = [];
    library.widgets = [];

    RUR.__load_world = function(data){
        RUR.world.import_(data);
        RUR.world.reset();
        RUR.controls.reload();
    };

    // Set listener ...  (continuing below)
    $("#select_world").change(function() {
        var data, val = $(this).val();
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
          
        RUR.world.robot_world_active = true;
        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.__load_world(data);
        } else {
            $.get(val, function(data) {
                RUR.__load_world(data);
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });
    // ... and trigger it to load the initial world.
    $("#select_world").change();
    
    RUR.controls.set_ready_to_run();
    
    $("#robot_canvas").click(function(event) {
        RUR.mouse_x = event.clientX;
        RUR.mouse_y = event.clientY;
        console.log(RUR.mouse_x);
    })  ;
    
});
