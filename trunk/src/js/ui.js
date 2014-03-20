/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, translate_python, JSHINT, CodeMirror, think, globals_ */


var RUR = RUR || {};

RUR.compile_javascript = function (src) {
    // Note: by having "use strict;" here, it has the interesting effect of requiring user
    // programs to conform to "strict" usage, meaning that all variables have to be declared,
    // etc.
    "use strict";  // will propagate to user's code, enforcing good programming habits.
    // lint, then eval
    editorUpdateHints();
    if(editor.widgets.length === 0) {
        libraryUpdateHints();
        if(library.widgets.length !== 0) {
            $('#library-problem').show().fadeOut(4000);
        }
    }
    eval(src); // jshint ignore:line
};

RUR.compile_no_strict_js = function (src) {
    // bypass linting and does not "use strict"
    // Usually requires "no strict"; as first statement in editor
    eval(src); // jshint ignore:line
};

RUR.compile_python = function (src) {
    // do not  "use strict" as we do not control the output produced by Brython
    // translate_python needs to be included in the html page in a Python script
    eval(translate_python(src)); // jshint ignore:line
};


RUR.Controls = function (programming_language) {
    "use strict";
    RUR.programming_language = programming_language;
    var separator, import_lib_regex;  // separates library code from user code
    if (RUR.programming_language == "javascript") {
        separator = ";\n";
        import_lib_regex = /^\s*import_lib\s*\(\s*\);/m;
    } else if (RUR.programming_language === "python") {
        separator = "\n";
        import_lib_regex = /^import\s* lib\s*$/m;
    }
    this.end_flag = true;
    this.compile_and_run = function (func) {
        var lib_src, src, fatal_error_found = false;
        if (!RUR.visible_world.compiled) {
            lib_src = library.getValue();
            src = editor.getValue();
            console.log(src);
            src = src.replace(import_lib_regex, separator+lib_src);
        }
        if (!RUR.visible_world.compiled) {
            try {
                if (RUR.programming_language === "javascript") {
                    if (src.slice(1, 10) === "no strict") {
                        RUR.compile_no_strict_js(src);
                    } else {
                        RUR.compile_javascript(src);
                    }
                    RUR.visible_world.compiled = true;
                } else if (RUR.programming_language === "python") {
                    RUR.compile_python(src);
                    RUR.visible_world.compiled = true;
                } else {
                    alert("Unrecognized programming language.");
                    fatal_error_found = true;
                }
            } catch (e) {
                if (e.name === RUR.translation.ReeborgError){
                    RUR.world.add_error_frame(e);
                } else {
                    alert(e.name + "\n" + e.message);
                    fatal_error_found = true;
                    this.stop();
                }
            }
        }
        if (!fatal_error_found) {
            func();
        }
    };

    this.set_ready_to_run = function () {
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reload").attr("disabled", "true");
  
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
        $("#reload2").attr("disabled", "true");
    };

    this.run = function () {
        var src;
        $("#stop").removeAttr("disabled");
        $("#pause").removeAttr("disabled");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").attr("disabled", "true");
      
        $("#stop2").removeAttr("disabled");
        $("#pause2").removeAttr("disabled");
        $("#run2").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload2").attr("disabled", "true");
        clearTimeout(RUR.timer);
        if (RUR.world.robot_world_active) {
            RUR.controls.compile_and_run(RUR.visible_world.play_frames);
        } else {
            src = library.getValue() + ";\n";
            src += editor.getValue();
            think(0);
            RUR.controls.end_flag = false;
            RUR.controls.compile_and_run(function () {});
            RUR.controls.stop();
        }
    };

    this.pause = function (ms) {
        RUR.visible_world.running = false;
        clearTimeout(RUR.timer);
        $("#pause").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        if (ms !== undefined){
            RUR.timer = setTimeout(RUR.controls.run, ms);
        } else {
            $("#run").removeAttr("disabled");
            $("#step").removeAttr("disabled");
            $("#run2").removeAttr("disabled");
            $("#step2").removeAttr("disabled");
        }
    };

    this.step = function () {
        RUR.controls.compile_and_run(RUR.visible_world.play_single_frame);
    };

    this.stop = function () {
        clearTimeout(RUR.timer);
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").removeAttr("disabled");
      
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").attr("disabled", "true");
        $("#step2").attr("disabled", "true");
        $("#reload2").removeAttr("disabled");
    };

    this.reload = function() {
        RUR.visible_world.reset();
        this.set_ready_to_run();
        $("#output-pre").html("");
        $("#output-panel pre").remove(".jscode");
        RUR.world.reset();
        clearTimeout(RUR.timer);
        RUR.visible_world.compiled = false;
        RUR.visible_world.running = false;
        editorUpdateHints();
        libraryUpdateHints();
    };
};


function update_controls() {
    if ($("#world-panel").hasClass("active")){
        $("#run2").css("visibility", "hidden");
        $("#step2").css("visibility", "hidden");
        $("#pause2").css("visibility", "hidden");
        $("#stop2").css("visibility", "hidden");
        $("#reload2").css("visibility", "hidden");
    } else {
        $("#run2").css("visibility", "visible");
        $("#step2").css("visibility", "visible");
        $("#pause2").css("visibility", "visible");
        $("#stop2").css("visibility", "visible");
        $("#reload2").css("visibility", "visible");
        RUR.world.reset();
    }
}

RUR.ajax_requests = {};

RUR.select_world = function (s) {
    var elt = document.getElementById("select_world");

    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === s) {
            if (elt.options[i].selected) {
                return;
            }
            elt.value = elt.options[i].value;
            $("#select_world").change();
            alert(RUR.translation["World selected"].supplant({world: s}));
            return;
        }
    }
    alert(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.load_user_worlds = function () {
    var key, name, i;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            $('#select_world').append( $('<option style="background-color:#ff9"></option>'
                              ).val("user_world:" + name).html(name));
        }
    }
};


RUR.Controls.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};

function toggle_contents_button () {
    if ($("#contents-button").hasClass("reverse-blue-gradient")) {
        RUR.tutorial_window = window.open("index_en.html", '_blank', 'location=no,height=600,width=800,scrollbars=yes,status=yes');
    } else {
        try {
            RUR.tutorial_window.close();
        }
        catch (e) {}
    }
    return false;
}

function toggle_contents_button_from_child () {
    // called when child window is closed by user
    $("#contents-button").toggleClass("blue-gradient");
    $("#contents-button").toggleClass("reverse-blue-gradient");
}


$(document).ready(function() {
    RUR.select_world("Alone");
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
        $("#lint").show();
        $("#save-library").hide();
    });
    $("#library-link").on("click", function(){
        $("#lint").hide();
        $("#save-library").show();
    });

    $("#save-library").on("click", function() {
        localStorage.setItem(RUR.settings.library, library.getValue());
        $('#saved').show().fadeOut(2000);
    });

    try {  
        var library_comment = '';
        if (RUR.programming_language == "javascript") {
            library_comment = RUR.translation["/* Your special code goes here */\n\n"];
        } else if (RUR.programming_language == "python") {
            library_comment = RUR.translation["# Your special code goes here \n\n"];
        }
        var library_content = localStorage.getItem(RUR.settings.library) || library_comment;
        library.setValue(library_content + "\n");
    } catch (e){ alert("Your browser does not support localStorage; you will not be able to save your functions in the library or your notes.");}

 
    $("#contents-button").on("click", toggle_contents_button);

    $("#help").dialog({autoOpen:false, width:600,  height:500, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#help-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});
    $("#help-button").on("click", function() {
        if (RUR.ajax_requests.help !== undefined){
            if ($("#help-button").hasClass("reverse-blue-gradient")) {
                $("#help").dialog("open");
            } else {
                $("#help").dialog("close");
            }
            return;
        }
        $('#help').load(RUR.settings.xml+"help.xml");
        RUR.ajax_requests.help = true;
        $("#help").dialog("open");
        return false;
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

    // initialize the world and then sets up a listener for subsequent changes
    $.get($("#select_world").val(), function(data) {
            RUR.__load_world(data);
            $("select").attr("style", "background-color:#fff");
            // jquery is sometimes too intelligent; it can guess
            // if the imported object is a string ... or a json object
            // I need a string here;  so make sure to prevent it from identifying.
        }, "text");
    RUR.world.robot_world_active = true;

    $("#select_world").change(function() {
        var data, val = $(this).val();
        RUR.world.robot_world_active = true;
        if (val.substring(0,11) === "user_world:"){
            // $("#step").removeClass("hidden");
            data = localStorage.getItem(val);
            RUR.__load_world(data);
            $("select").attr("style", "background-color:#eff");
        } else {
            // $("#step").removeClass("hidden");
            $.get(val, function(data) {
                RUR.__load_world(data);
                $("select").attr("style", "background-color:#fff");
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });
    RUR.controls.set_ready_to_run();
});

function editorUpdateHints() {
    updateHints(editor);
}

function libraryUpdateHints() {
    updateHints(library);
}
var jshint_options = {
    eqeqeq: true,
    boss: true,
    undef: true,
    curly: true,
    nonew: true,
    browser: true,
    devel: true,
    white: false,
    plusplus: false,
    jquery: true
};


function updateHints(obj) {
    if (RUR.programming_language != "javascript") {
        return;
    }
    var values, nb_lines;
    var import_lib_regex = /^\s*import_lib\s*\(\s*\);/m;
    obj.operation(function () {
        for(var i = 0; i < obj.widgets.length; ++i)
            obj.removeLineWidget(obj.widgets[i]);
        obj.widgets.length = 0;

        if (obj === editor) {
            values = globals_ + editor.getValue().replace(import_lib_regex, library.getValue());
            nb_lines = library.lineCount() + 1;
            JSHINT(values, jshint_options);
        } else {
            JSHINT(globals_ + obj.getValue(), jshint_options);
            nb_lines = 2;
        }
        for(i = 0; i < JSHINT.errors.length; ++i) {
            var err = JSHINT.errors[i];
            if(!err) continue;
            var msg = document.createElement("div");
            var icon = msg.appendChild(document.createElement("span"));
            icon.innerHTML = "!?!";
            icon.className = "lint-error-icon";
            msg.appendChild(document.createTextNode(err.reason));
            msg.className = "lint-error";
            obj.widgets.push(obj.addLineWidget(err.line - nb_lines, msg, {
                coverGutter: false,
                noHScroll: true
            }));
        }
    });

    var info = obj.getScrollInfo();
    var after = obj.charCoords({line: obj.getCursor().line + 1, ch: 0}, "local").top;
    if(info.top + info.clientHeight < after) {
        obj.scrollTo(null, after - info.clientHeight + 3);
    }
}
