/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints */

var RUR = RUR || {};

RUR.reset_code_in_editors = function () {
    var library_comment = '', library_content, editor_content;

    if (RUR.programming_language == "javascript") {
        library_comment = RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"];
    } else if (RUR.programming_language == "python") {
        library_comment = RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"];
    }
    library_content = localStorage.getItem(RUR.settings.library);
    if (!library_content){
        library_content = library_comment;
    }
    library.setValue(library_content);
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor.getValue();
    }
    editor.setValue(editor_content);
};


$(document).ready(function() {
    $('input[type=radio][name=programming_language]').on('change', function(){
        var library_comment = '', library_content, editor_content;
        RUR.removeHints();
        switch($(this).val()){
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
        }            
        try { 
            RUR.reset_code_in_editors();
        } catch (e) {}
    });
});

var globals_ = "/*globals move, turn_left, RUR, inspect, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, object_here, select_world,"+
                    " token_here, has_token, write, at_goal, at_goal_orientation," +
                    " build_wall, think, DEBUG, pause, remove_robot, repeat, view_source, side_view, top_view, sound*/\n";

RUR.translation = {};
RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"] = 
    "/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n";
RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"] = 
    "# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n";
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

//TODO

/*==========================================*/

var move, turn_left, inspect, front_is_clear, right_is_clear, 
    is_facing_north, done, put, take, object_here, select_world, token_here, 
    has_token, write, at_goal, at_goal_orientation, build_wall, think, 
    pause, remove_robot, repeat, view_source, side_view, top_view, sound;

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
      token_here = null;
      has_token = null;
      at_goal = null;
      at_goal_orientation = null;
      build_wall = null;
      think = null;
      pause = null;
      remove_robot = null;
      repeat = null;
      side_view = null;
      top_view = null;
      write = function (s) {
          $("#output-pre").append(s.toString() + "\n");
      };
      return;
  }
    function UsedRobot(x, y, orientation, tokens)  {
        this.robot = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.robot);
    }
    
    
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
    
    // Robot specific functions.
    // ensure it is known outside this function, available to the user.
    window.UsedRobot = UsedRobot;  


    at_goal = function () {
        return RUR.control.at_goal(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal = function () {
        RUR.control.at_goal(this.robot);
    };
    
    at_goal_orientation = function () {
        return RUR.control.at_goal_orientation(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal_orientation = function () {
        RUR.control.at_goal_orientation(this.robot);
    };

    build_wall = function() {
        RUR.control.build_wall(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.build_wall = function () {
        RUR.control.build_wall(this.robot);
    };

    front_is_clear = function() {
      return RUR.control.front_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.front_is_clear = function () {
        RUR.control.front_is_clear(this.robot);
    };

    has_token = function () {
        return RUR.control.has_token(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.has_token = function () {
        RUR.control.has_token(this.robot);
    };
    
    is_facing_north = function () {
        return RUR.control.is_facing_north(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.is_facing_north = function () {
        RUR.control.is_facing_north(this.robot);
    };

    move = function () {
        RUR.control.move(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.move = function () {
        RUR.control.move(this.robot);
    };

    put = function(arg) {
        RUR.control.put(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.put = function () {
        RUR.control.put(this.robot);
    };
    
    token_here = function() {
        return RUR.control.token_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.token_here = function () {
        RUR.control.token_here(this.robot);
    };

    right_is_clear = function() {
      return RUR.control.right_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.right_is_clear = function () {
        RUR.control.right_is_clear(this.robot);
    };
    
    object_here = function () {
        return RUR.control.object_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.object_here = function () {
        RUR.control.object_here(this.robot);
    };
    
    take = function(arg) {
        RUR.control.take(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.take = function () {
        RUR.control.take(this.robot);
    };

    turn_left = function () {
        RUR.control.turn_left(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.turn_left = function () {
        RUR.control.turn_left(this.robot);
    };
    
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
    }

    lib_src = library.getValue();
    src = editor.getValue();
    return src.replace(import_lib_regex, separator+lib_src);
};

