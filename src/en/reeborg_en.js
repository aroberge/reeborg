/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri */

var RUR = RUR || {};

RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default;

    if (RUR.programming_language == "javascript") {
        library_default = RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"];
        editor_default = "move();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"];
        editor_default = "move()";
    }  else if (RUR.programming_language == "coffee") {
        library_default = RUR.translation["# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n"];
        editor_default = "move()";
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
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try { 
        localStorage.setItem("last_programming_language_en", RUR.settings.current_language);
    } catch (e) {}
    switch(RUR.settings.current_language){
        case 'python-en' :
            RUR.settings.editor = "editor_py_en";
            RUR.settings.library = "library_py_en";
            RUR.programming_language = "python";
            $("#editor-link").html("Python Code");
            editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            break;
        case 'javascript-strict-en' :
            RUR.settings.editor = "editor_js_en";
            RUR.settings.library = "library_js_en";
            RUR.programming_language = "javascript";
            $("#editor-link").html("Javascript Code");
            RUR.strict_javascript = true;
            editor.setOption("mode", "javascript");
            library.setOption("mode", "javascript");
            break;
        case 'javascript-en' :
            RUR.settings.editor = "editor_js_en";
            RUR.settings.library = "library_js_en";
            RUR.programming_language = "javascript";
            $("#editor-link").html("Javascript Code");
            RUR.strict_javascript = false;
            editor.setOption("mode", "javascript");
            library.setOption("mode", "javascript");
            break;
        case 'coffeescript-en' :
            RUR.settings.editor = "editor_coffee_en";
            RUR.settings.library = "library_coffee_en";
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
    var prog_lang, url_query, name;
    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
    });
    url_query = parseUri(window.location.href);
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);

        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_en");
        switch (prog_lang) {
            case 'python-en':
            case 'javascript-en':
            case 'javascript-strict-en':
            case 'coffeescript-en':
                $('input[type=radio][name=programming_language]').val([prog_lang]);
                RUR.reset_programming_language(prog_lang);
        }
        // trigger it to load the initial world.
        $("#select_world").change();
    }
});

function update_permalink () {
    url_query = parseUri($("#url_input_textarea").val());
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);

        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }
    $("#url_input").hide();
}



function create_permalink() {
    var proglang, world, _editor, _library, url_query, permalink, parts;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    
    switch(RUR.programming_language) {
        case 'python': 
            proglang = "python-en";
            break;
        case 'coffee': 
            proglang = "coffeescript-en";
            break;
        case 'javascript':
            if (RUR.strict_javascript) {
                proglang = "javascript-strict-en";
            } else {
                proglang = "javascript-en";
            }
    }
    world = encodeURIComponent(RUR.world.export_world());    
    _editor = encodeURIComponent(editor.getValue());
    _library = encodeURIComponent(library.getValue());
    
    permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    $("#url_input_textarea").val(permalink);
    $("#url_input").show();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");
    
    return false;
}

var globals_ = "/*globals move, turn_left, RUR, inspect, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, object_here, select_world,"+
                    " token_here, has_token, write, at_goal, at_goal_orientation," +
                    " build_wall, think, DEBUG, pause, remove_robot, repeat, view_source, sound," +
    // do not translate the following instructions
                    "put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, set_max_steps*/\n";

RUR.translation = {};
RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"] = 
    "/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n";
RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"] = 
    "# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n";
RUR.translation["# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n"] = 
    "# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n";
RUR.translation.ReeborgError = "ReeborgError";
RUR.translation["Too many steps:"] = "Too many steps: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: {delay}";
RUR.translation["No token found here!"] = "No token found here!";
RUR.translation["I don't have any token to put down!"] = "I don't have any token to put down!";
RUR.translation.triangle = "triangle";
RUR.translation.star = "star";
RUR.translation.square = "square";
RUR.translation["Unknown object"] = "Unknown object: {shape}";
RUR.translation["No shape found here"] = "No {shape} found here!";
RUR.translation["There is already something here."] = "There is already something here.";
RUR.translation["I don't have any shape to put down!"] = "I don't have any {shape} to put down!";
RUR.translation["There is already a wall here!"] = "There is already a wall here!";
RUR.translation["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
RUR.translation["I am afraid of the void!"] = "I am afraid of the void!";
RUR.translation.east = "east";
RUR.translation.north = "north";
RUR.translation.west = "west";
RUR.translation.south = "south";
RUR.translation.token = "token";
RUR.translation["Unknown orientation for robot."] = "Unknown orientation for robot.";
RUR.translation["Done!"] = "Done!";
RUR.translation["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
RUR.translation["There is no orientation as a goal in this world!"] = "There is no orientation as a goal in this world!";
RUR.translation["There is no goal in this world!"] = "There is no goal in this world!";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"] = "<li class='success'>Reeborg has the correct orientation.</li>";
RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"] = "<li class='failure'>Reeborg has the wrong orientation.</li>";
RUR.translation["<li class='success'>All shapes are at the correct location.</li>"] = "<li class='success'>All shapes are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"] = "<li class='failure'>One or more shapes are not at the correct location.</li>";
RUR.translation["<li class='success'>All tokens are at the correct location.</li>"] = "<li class='success'>All tokens are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"] = "<li class='failure'>One or more tokens are not at the correct location.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
RUR.translation["Last instruction completed!"] = "Last instruction completed!";
RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", tokens=";
RUR.translation["Delete "] = "Delete";
RUR.translation["Undo Delete"] = "Undo Delete";
RUR.translation["World selected"] = "World {world} selected";
RUR.translation["Could not find world"] = "Could not find world {world}";
RUR.translation["Invalid world file."] = "Invalid world file.";

/* translations from world_editor.js */


RUR.translation["Click on world to move robot."] = "Click on world to move robot.";
RUR.translation["Removed robot."] = "Removed robot.";
RUR.translation["Added robot."] = "Added robot.";
RUR.translation["Click on image to turn robot"] = "Click on image to turn robot";
RUR.translation["Robot now has tokens."] = "Robot now has {x_tokens} tokens.";
RUR.translation["Click on world to set number of tokens."] = "Click on world to set number of tokens.";
RUR.translation["Click on desired object below."] = "Click on desired object below.";
RUR.translation["Click on world to toggle star."] = "Click on world to toggle star.";
RUR.translation["Click on world to toggle triangle."] = "Click on world to toggle triangle.";
RUR.translation["Click on world to toggle square."] = "Click on world to toggle square.";
RUR.translation["Click on world to toggle walls."] = "Click on world to toggle walls.";
RUR.translation["Click on world to set home position for robot."] = "Click on world to set home position for robot.";
RUR.translation["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
RUR.translation["Click on desired goal object below."] = "Click on desired goal object below.";
RUR.translation["Click on world to set number of goal tokens."] = "Click on world to set number of goal tokens.";
RUR.translation["Click on world to toggle star goal."] = "Click on world to toggle star goal.";
RUR.translation["Click on world to toggle triangle goal."] = "Click on world to toggle triangle goal.";
RUR.translation["Click on world to toggle square goal."] = "Click on world to toggle square goal.";
RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."] = "Click on world at x=1, y=1 to have no object left as a goal.";                                                     
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for robot to carry (use inf for infinite number)";
RUR.translation[" is not a valid value!"] = " is not a valid value!";
RUR.translation["Other object here; can't put tokens"] = "Other object here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens for at that location.";
RUR.translation["Other object goal here; can't put tokens"] = "Other object goal here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens for at that location.";
RUR.translation["tokens here; can't put another object"] = "tokens here; can't put another object";
RUR.translation["tokens as a goal here; can't set another object as goal."] = "tokens as a goal here; can't set another object as goal.";
RUR.translation["Click on same position to remove, or robot to set orientation."] = "Click on same position to remove, or robot to set orientation.";
RUR.translation["Goal: no object left in world."] = "Goal: no object left in world.";


/*==========================================*/

var move, turn_left, inspect, front_is_clear, right_is_clear, 
    is_facing_north, done, put, take, object_here, select_world, token_here, 
    has_token, write, at_goal, at_goal_orientation, build_wall, think, 
    pause, remove_robot, repeat, view_source, sound, UsedRobot, 
    set_max_steps;

// do not translate the following three instructions; they are included only
// so that most basic programs from rur-ple would run "as-is"
var put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, next_to_a_beeper, set_delay, facing_north;

inspect = function (obj){
  var props, result = "";
  for (props in obj) {
      if (typeof obj[props] === "function") {
          result += props + "()\n";
      } else{
          result += props + "\n";
      }
  }
  write(result);
};

view_source = function(fn) {
  $("#last-pre").before("<pre class='js_code'>" + fn + "</pre>" );
  $('.js_code').each(function() {
      var $this = $(this), $code = $this.text();
      $this.removeClass("js_code");
      $this.addClass("jscode");
      $this.empty();
      var myCodeMirror = CodeMirror(this, {
          value: $code,
          mode: 'javascript',
          lineNumbers: !$this.is('.inline'),
          readOnly: true,
          theme: 'reeborg-dark'
      });
  });
};

sound = function (on) {
    RUR.control.sound(on);  
};

RUR.reset_definitions = function () {
  
  if (!RUR.world.robot_world_active){
      move = null;
      turn_left = null;
      window.UsedRobot = null;
      front_is_clear = null;
      right_is_clear = null;
      is_facing_north = null;
      done = null;
      put = null;
      take = null;
      object_here = null;
      select_world = null;
      set_max_steps = null;
      token_here = null;
      has_token = null;
      at_goal = null;
      at_goal_orientation = null;
      build_wall = null;
      think = null;
      pause = null;
      remove_robot = null;
      write = function (s) {
          $("#output-pre").append(s.toString() + "\n");
      };
      // do not translate the following
      put_beeper = put;
      pick_beeper = take;
      turn_off = done;
      on_beeper = token_here; 
      carries_beepers = has_token;
      return;
  }
  UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };
    
    
    // functions not specific to individual robot.
    write = function (s) {
        RUR.control.write(s);
    };
    done = function () {
      RUR.control.done();
    };
    
    pause = function (ms) {
      RUR.control.pause(ms);
    };
    
    repeat = function (f, n) {
      for (var i=0; i < n; i++){
          f();
      }
    };
    
    think = function(delay) {
        RUR.control.think(delay);
    };

    select_world = RUR.ui.select_world;  
    set_max_steps = function(n){
        RUR.MAX_STEPS = n;
    };


    at_goal = function () {
        return RUR.control.at_goal(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal = function () {
        RUR.control.at_goal(this.body);
    };
    
    at_goal_orientation = function () {
        return RUR.control.at_goal_orientation(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal_orientation = function () {
        RUR.control.at_goal_orientation(this.body);
    };

    build_wall = function() {
        RUR.control.build_wall(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.build_wall = function () {
        RUR.control.build_wall(this.body);
    };

    front_is_clear = function() {
      return RUR.control.front_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.front_is_clear = function () {
        RUR.control.front_is_clear(this.body);
    };

    has_token = function () {
        return RUR.control.has_token(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.has_token = function () {
        RUR.control.has_token(this.body);
    };
    
    is_facing_north = function () {
        return RUR.control.is_facing_north(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.is_facing_north = function () {
        RUR.control.is_facing_north(this.body);
    };

    move = function () {
        RUR.control.move(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.move = function () {
        RUR.control.move(this.body);
    };

    put = function(arg) {
        RUR.control.put(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.put = function () {
        RUR.control.put(this.body);
    };
    
    token_here = function() {
        return RUR.control.token_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.token_here = function () {
        RUR.control.token_here(this.body);
    };

    right_is_clear = function() {
      return RUR.control.right_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.right_is_clear = function () {
        RUR.control.right_is_clear(this.body);
    };
    
    object_here = function () {
        return RUR.control.object_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.object_here = function () {
        RUR.control.object_here(this.body);
    };
    
    take = function(arg) {
        RUR.control.take(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.take = function () {
        RUR.control.take(this.body);
    };

    turn_left = function () {
        RUR.control.turn_left(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.turn_left = function () {
        RUR.control.turn_left(this.body);
    };
    
    // English speficic and only for compatibility with rur-ple
    // do not translate the following
    put_beeper = put;
    pick_beeper = take;
    turn_off = done;
    on_beeper = token_here; 
    next_to_a_beeper = token_here;
    carries_beepers = has_token;
    set_delay = think;
    facing_north = is_facing_north;
    
};


// the regex of the following should be adapted
// so that they make sense in the human language ...
RUR._import_library = function () {
  // adds the library code to the editor code if appropriate string is found
    var separator, import_lib_regex, src, lib_src;  
    if (RUR.programming_language == "javascript") {
        separator = ";\n";
        import_lib_regex = /^\s*import_lib\s*\(\s*\);/m;
    } else if (RUR.programming_language === "python") {
        separator = "\n";
        import_lib_regex = /^import\s* my_lib\s*$/m;
    } else if (RUR.programming_language === "coffee") {
        separator = "\n";
        import_lib_regex = /^\s*import_lib\s*\(\s*\)/m;
    }

    lib_src = library.getValue();
    src = editor.getValue();
    return src.replace(import_lib_regex, separator+lib_src);
};

var biblio = function() {
    return library.getValue();
};
