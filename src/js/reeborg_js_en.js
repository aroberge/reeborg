/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library */

var globals_ = "/*globals move, turn_left, RUR, inspect, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, shape_here, select_world,"+
                    " token_here, has_token, write, at_goal, at_goal_orientation," +
                    " build_wall, think, DEBUG, pause, remove_robot, repeat, view_source, side_view, top_view*/\n";

var RUR = RUR || {};

RUR.translation = {};
RUR.translation["/* Your special code goes here */\n\n"] = "/* Your special code goes here */\n\n";
RUR.translation["# Your special code goes here \n\n"] = "# Your special code goes here \n\n";
RUR.translation.ReeborgError = "ReeborgError";
RUR.translation["Too many steps:"] = "Too many steps: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: {delay}";
RUR.translation["No token found here!"] = "No token found here!";
RUR.translation["I don't have any token to put down!"] = "I don't have any token to put down!";
RUR.translation.triangle = "triangle";
RUR.translation.star = "star";
RUR.translation.square = "square";
RUR.translation["Unknown shape"] = "Unknown shape: {shape}";
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

var move, turn_left, inspect, front_is_clear, right_is_clear, 
    is_facing_north, done, put, take, shape_here, select_world, token_here, 
    has_token, write, at_goal, at_goal_orientation, build_wall, think, 
    pause, remove_robot, repeat, view_source, side_view, top_view;

RUR.reset_definitions = function () {
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
  
  if (!RUR.world.robot_world_active){
      move = null;
      turn_left = null;
      UsedRobot = null;
      front_is_clear = null;
      right_is_clear = null;
      is_facing_north = null;
      done = null;
      put = null;
      take = null;
      shape_here = null;
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
  
    write = function (s) {
    RUR.world.add_frame("output", "#output-pre", s.toString());
  };
  
  at_goal = function() {
      return RUR.world.robots[0].at_goal();
  };

  at_goal_orientation = function() {
      return RUR.world.robots[0].at_goal_orientation();
  };

  build_wall = function() {
      RUR.world.robots[0].build_wall();
  };

  done = function () {
      RUR.world.robots[0].done();
  };

  front_is_clear = function() {
      return RUR.world.front_is_clear(RUR.world.robots[0]);
  };

  has_token = function () {
      return RUR.world.robots[0].has_token();
  };

  is_facing_north = function() {
      return RUR.world.robots[0].is_facing_north();
  };

  move = function() {
      RUR.world.robots[0].move();
  };

  pause = function (ms) {
      RUR.world.pause(ms);
  };

  put = function(arg) {
      RUR.world.robots[0].put(arg);
  };

  remove_robot = function (){
      RUR.world.remove_robot();
  };

  repeat = function (f, n) {
      for (var i=0; i < n; i++){
          f();
      }
  };

  right_is_clear = function() {
      return RUR.world.right_is_clear(RUR.world.robots[0]);
  };

  shape_here = function () {
      return RUR.world.find_shape(RUR.world.robots[0].x, RUR.world.robots[0].y);
  };

  take = function(arg) {
      RUR.world.robots[0].take(arg);
  };

  think = function(delay) {
      RUR.world.think(delay);
  };

  token_here = function () {
      return RUR.world.get_tokens(RUR.world.robots[0].x, RUR.world.robots[0].y);
  };

  turn_left = function() {
      RUR.world.robots[0].turn_left();
  };

  side_view = function () {
      RUR.visible_world.top_view = false;
      localStorage.setItem("top_view", "false");
  };

  top_view = function () {
      RUR.visible_world.top_view = true;
      localStorage.setItem("top_view", "true");
  };

  select_world = RUR.select_world;
};

UsedRobot.prototype = Object.create(RUR.Robot.prototype);
UsedRobot.prototype.constructor = UsedRobot;

function UsedRobot(x, y, orientation, tokens)  {
    RUR.Robot.call(this, x, y, orientation, tokens);
    RUR.world.add_robot(this);
}

function _import_library () {
  // adds the library code to the editor code if appropriate string is found
    var separator, import_lib_regex, src, lib_src;  // separates library code from user code
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
}

