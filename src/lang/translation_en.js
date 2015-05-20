/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */

var RUR = RUR || {};

RUR.translation = {};
RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"] =
    "/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n";
RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"] =
    "# 'from my_lib import *' in Python Code is required to use\n# the code in this library. \n\n";
RUR.translation["# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n"] =
    "# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n";

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
RUR.translation.move = "move";
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
RUR.translation["<li class='success'>All shapes are at the correct location.</li>"] = "<li class='success'>All non-token objects are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"] = "<li class='failure'>One or more non-token objects are not at the correct location.</li>";
RUR.translation["<li class='success'>All tokens are at the correct location.</li>"] = "<li class='success'>All tokens are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"] = "<li class='failure'>One or more tokens are not at the correct location.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
RUR.translation["Last instruction completed!"] = "Last instruction completed!";
RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", tokens=";
RUR.translation["World selected"] = "World {world} selected";
RUR.translation["Could not find world"] = "Could not find world {world}";
RUR.translation["Invalid world file."] = "Invalid world file.";

RUR.translation["Python Code"] = "Python Code";
RUR.translation["Javascript Code"] = "Javascript Code";
RUR.translation["CoffeeScript Code"] = "CoffeeScript Code";
/* translations from world_editor.js */

RUR.translation["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
RUR.translation["Added robot."] = "Added Reeborg.";
RUR.translation["Click on image to turn robot"] = "Click on image to turn Reeborg";
RUR.translation["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
RUR.translation["Click on world to set number of tokens."] = "Click on world to set number of tokens (use a-b to indicate random integer values from a to b inclusively).";
RUR.translation["Click on desired object below."] = "Click on desired object below.";
RUR.translation["Click on world to toggle star."] = "Click on world to toggle star.";
RUR.translation["Click on world to toggle triangle."] = "Click on world to toggle triangle.";
RUR.translation["Click on world to toggle square."] = "Click on world to toggle square.";
RUR.translation["Click on world to toggle walls."] = "Click on world to toggle walls.";
RUR.translation["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot or (if visible below) robot to set orientation.";
RUR.translation["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
RUR.translation["Click on desired goal object below."] = "Click on desired goal object below.";
RUR.translation["Click on world to set number of goal tokens."] = "Click on world to set number of goal tokens.";
RUR.translation["Click on world to toggle star goal."] = "Click on world to toggle star goal.";
RUR.translation["Click on world to toggle triangle goal."] = "Click on world to toggle triangle goal.";
RUR.translation["Click on world to toggle square goal."] = "Click on world to toggle square goal.";
RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."] = "Click on world at x=1, y=1 to confirm having no object (excluding tokens) left as a goal.";
RUR.translation["Click on world at x=1, y=1 to have no tokens left as a goal."] = "Click on world at x=1, y=1 to confirm having no tokens left as a goal.";
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry (use inf for infinite number or a-b to indicate random integer values from a to b inclusively)";
RUR.translation[" is not a valid value!"] = " is not a valid value!";
RUR.translation["Other object here; can't put tokens"] = "Other object here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens desired at that location.";
RUR.translation["Other object goal here; can't put tokens"] = "Other object goal here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens required at that location.";
RUR.translation["tokens here; can't put another object"] = "tokens here; can't put another object";
RUR.translation["tokens as a goal here; can't set another object as goal."] = "tokens as a goal here; can't set another object as goal.";
RUR.translation["Click on same position to remove, or robot to set orientation."] = "Click on same position to remove, or robot to set orientation.";
RUR.translation["Goal: no object left in world."] = "Goal: no object (excluding tokens) left in world.";
RUR.translation["Goal: no tokens left in world."] = "Goal: no tokens left in world.";
RUR.translation["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
RUR.translation["No such world!"] = "No such world!";
RUR.translation["Enter world name to save"] = "Enter world name to save";
RUR.translation["Enter world name to delete"] = "Enter world name to delete";
RUR.translation["Object names"] = " my_lib, token, star, triangle, square.";
RUR.translation["Unexplained Error"] = "Unexplained Error";
RUR.translation["Please turn highlighting off"] = "Please turn highlighting off";
RUR.translation["and try running your program again."] = "and try running your program again.";

RUR.translation["<br><br>Error found at or near line {number}."] = "<br><br>Error found at or near line {number}.";
RUR.translation["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
RUR.translation["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
RUR.translation["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";
RUR.translation["I do not understand what you are asking me to do."] = "I do not understand what you are asking me to do.";
