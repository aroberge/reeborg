 /* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints,
  translate_python, CoffeeScript */

RUR.runner = {};

RUR.runner.interpreted = false;

RUR.runner.assign_initial_values = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.current_world.objects !== undefined){
        objects = RUR.current_world.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = RUR.randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb != 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) != 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(RUR.current_world.objects[coords]).length === 0){
                    delete RUR.current_world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.objects !== undefined){
        objects = RUR.current_world.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(RUR.current_world.goal.objects[coords]).length === 0){
                    delete RUR.current_world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.current_world.robots !== undefined && RUR.current_world.robots.length == 1){
        robot = RUR.current_world.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[RUR.randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot.orientation == -1){
            RUR.current_world.robots[0].orientation = RUR.randint(0, 3);
            RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0].orientation;
        }
    }

    // then final position for robot

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.possible_positions !== undefined &&
        RUR.current_world.goal.possible_positions.length > 1) {
        goal = RUR.current_world.goal;
        position = goal.possible_positions[RUR.randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    if (RUR.current_world.goal !== undefined) {
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.vis_world.draw_goal();
    }
};


RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
        RUR.runner.assign_initial_values();
        src = editor.getValue();
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (playback() === "stopped") {
            RUR.ui.stop();
        }
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message, response, other_info;
    other_info = '';
    try {
        if (RUR.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.programming_language === "python") {
            RUR.runner.eval_python(src);
        } else if (RUR.programming_language === "coffee") {
            RUR.runner.eval_coffee(src);
        } else {
            alert("Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.__debug){
            console.dir(e);
        }
        if (RUR.programming_language === "python") {
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error_name = response.error_name;
        } else {
            error_name = e.name;
            message = e.message;
        }

        if (error_name === "ReeborgError"){
            if (e.reeborg_shouts !== undefined) {
                e.message = e.reeborg_shouts;
            }
            RUR.rec.record_frame("error", e);
        } else {
            $("#Reeborg-shouts").html("<h3>" + error_name + "</h3><h4>" +
                                      message + "</h4><p>" + other_info +
                                      '</p>').dialog("open");
            RUR.ui.stop();
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code = '', post_code = '';
    RUR.reset_definitions();
    if (RUR.current_world.pre_code){
        pre_code = RUR.current_world.pre_code;
    }
    if (RUR.current_world.post_code){
        post_code = RUR.current_world.post_code;
    }
    translate_python(src, RUR._highlight, pre_code, post_code);
};


RUR.runner.eval_coffee = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};

RUR.runner.compile_coffee = function() {
    if (RUR.programming_language !== "coffee") {
        return;
    }
    var js_code = CoffeeScript.compile(editor.getValue());
    $("#stdout").html(js_code);
    $("#Reeborg-writes").dialog("open");
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {  // src/brython/Lib/site-packages/reeborg_common.py
        if (RUR._automatic_highlight_off) {
            RUR._automatic_highlight_off = false;
            $("#highlight-impossible").hide();
            RUR.ui.highlight(); // turn it back on - we found another problem.
        }
        message = e.$message;
        error_name = e.__name__;
        diagnostic = '';
        switch (error_name) {
            case "SyntaxError":
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (RUR.runner.check_colons(e.args[1][3])) {
                        other_info += RUR.translate("<br>Perhaps a missing colon is the cause.");
                    } else if (RUR.runner.check_func_parentheses(e.args[1][3])){
                        other_info += RUR.translate("<br>Perhaps you forgot to add parentheses ().");
                    }
                } catch (e) { // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "IndentationError":
                message = RUR.translate("The code is not indented correctly.");
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (e.args[1][3].indexOf("RUR.set_lineno_highlight([") == -1){
                        other_info += "<br><code>" + e.args[1][3] + "</code>";
                    }
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "NameError":
                try {
                    other_info = RUR.runner.find_line_number(message);
                    other_info += RUR.translate("<br>Perhaps you misspelled a word or forgot to define a function or a variable.");
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer.";
                }
                break;
            case "Internal Javascript error: SyntaxError":
                error_name = "Invalid Python Code";
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        error_name = "ReeborgError";
    }
    return {message:message, other_info:other_info, error_name:error_name};
};


RUR.runner.find_line_number = function(bad_code) {
    /** With the possibility of having code inserted by the highlighting routine,
        with some pre-code, and with Brython not counting empty lines at the
        beginning of a program, it is more reliable to scan the source code
        for the offending code as identified by Brython and see if it occurs
        only once in the user's program */
    var lines, found, i, lineno;
    if (bad_code.indexOf("RUR.set_lineno_highlight([") != -1){
        bad_code = bad_code.replace("RUR.set_lineno_highlight([", "");
        lines = bad_code.split("]");
        lineno = lines[0] + 1;
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    lines = editor.getValue().split("\n");
    found = false;
    lineno = false;
    for (i=0; i<lines.length; i++) {
        try {
        } catch (e) {
            return '';
        }
         if(lines[i].indexOf(bad_code) != -1){
            if (found){
                return '';   // found the offending code twice; can not rely on this
            } else {
                found = true;
                lineno = i+1;
            }
        }
    }
    if (lineno) {
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    return '';
};


RUR.runner.check_colons = function(line_of_code) {
    var tokens, line, nb_token;
    tokens = ['if ', 'if(', 'else', 'elif ','elif(','while ','while(',
              'for ','for(', 'def '];
    for (nb_token=0; nb_token < tokens.length; nb_token++){
        if (line_of_code.indexOf(tokens[nb_token]) != -1){
            if (line_of_code.indexOf(":") == -1){
                return true;    // missing colon
            }
        }
    }
    return false;  // no missing colon
};

RUR.runner.check_func_parentheses = function(line_of_code) {
    if (line_of_code.indexOf('def') != -1){
        if (line_of_code.indexOf("(") == -1){
            return true;    // missing parentheses
        }
    }
    return false;  // no missing parentheses
};
