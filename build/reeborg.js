(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint -W069 */
require("./rur.js");
require("./translator.js");

RUR.blockly = {};
RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

/****  Begin over-riding Blockly's default */
Blockly.Blocks.loops.HUE = 230;

Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};

Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

Blockly.Python.INDENT = '    ';
Blockly.JavaScript.INDENT = '    ';

// removing mutator for simple function definitions as per
// https://groups.google.com/d/msg/blockly/_rrwh-Lc-sE/cHAk5yNfhUEJ

(function(){var old = Blockly.Blocks.procedures_defnoreturn.init;
    Blockly.Blocks.procedures_defnoreturn.init =
    function(){old.call(this);
        this.setMutator(undefined);
        // this.setColour(RUR.color_basic);
    };
})();



RUR.blockly.init = function () {

    // override some defaults
    Blockly.Msg.CONTROLS_IF_MSG_THEN = "    " + Blockly.Msg.CONTROLS_IF_MSG_THEN;
    Blockly.Msg.CONTROLS_REPEAT_INPUT_DO = "    " + Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
    Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = "    " + Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO;


    Blockly.Blocks['_sound_'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RUR.translate("sound"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "SOUND");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(true);\n";
      } else {
          return RUR.translate("sound") + "(false);\n";
      }
    };
    Blockly.Python['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(True)\n";
      } else {
          return RUR.translate("sound") + "(False)\n";
      }
    };

    Blockly.Blocks['_think_'] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField(RUR.translate("think"));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip(RUR.translate("Delay between actions; default is 300 ms."));
      }
    };
    Blockly.Python['_think_'] = function(block) {
      var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+")\n";
    };
    Blockly.JavaScript['_think_'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+");\n";
    };

    Blockly.Blocks['_move_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("move"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("move forward"));
      }
    };
    Blockly.Python['_move_'] = function(block) {
      return RUR.translate("move")+'()\n';
    };
    Blockly.JavaScript['_move_'] = function(block) {
      return RUR.translate("move")+'();\n';
    };


    Blockly.Blocks['_turn_left_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("turn_left")+" \u21BA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("turn left"));
      }
    };
    Blockly.Python['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'()\n';
    };
    Blockly.JavaScript['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'();\n';
    };


    Blockly.Blocks['_take_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("take"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("take object"));
      }
    };
    Blockly.Python['_take_'] = function(block) {
      return RUR.translate("take")+'()\n';
    };
    Blockly.JavaScript['_take_'] = function(block) {
      return RUR.translate("take")+'();\n';
    };


    Blockly.Blocks['_put_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("put"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("put object"));
      }
    };
    Blockly.Python['_put_'] = function(block) {
      return RUR.translate("put")+'()\n';
    };
    Blockly.JavaScript['_put_'] = function(block) {
      return RUR.translate("put")+'();\n';
    };


    Blockly.Blocks['_pause_'] = {
      init: function() {
        this.setColour(30);
        this.appendDummyInput().appendField(RUR.translate("pause"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Pause the program's execution."));
      }
    };
    Blockly.Python['_pause_'] = function(block) {
      return RUR.translate("pause")+'()\n';
    };
    Blockly.JavaScript['_pause_'] = function(block) {
      return RUR.translate("pause")+'();\n';
    };


    Blockly.Blocks['_build_wall_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("build_wall"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Build a wall in front of the robot."));
      }
    };
    Blockly.Python['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'()\n';
    };
    Blockly.JavaScript['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'();\n';
    };


    Blockly.Blocks['_done_'] = {
      init: function() {
        this.setColour(RUR.done_colour);
        this.appendDummyInput().appendField(RUR.translate("done"));
        this.setPreviousStatement(true);
        this.setTooltip(RUR.translate("End the program's execution."));
      }
    };
    Blockly.Python['_done_'] = function(block) {
      return RUR.translate("done")+'()\n';
    };
    Blockly.JavaScript['_done_'] = function(block) {
      return RUR.translate("done")+'();\n';
    };


    Blockly.Blocks['_wall_in_front_or_right_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("wall_in_front"), RUR.translate("wall_in_front")],
            [RUR.translate("wall_on_right"), RUR.translate("wall_on_right")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if a wall is blocking the way."));
      }
    };
    Blockly.Python['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_front_or_right_is_clear_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("front_is_clear"), RUR.translate("front_is_clear")],
            [RUR.translate("right_is_clear"), RUR.translate("right_is_clear")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if nothing is blocking the way."));
      }
    };
    Blockly.Python['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_at_goal_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("at_goal"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if desired destination."));
      }
    };
    Blockly.Python['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };
    Blockly.JavaScript['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };


    Blockly.Blocks['_carries_object_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("carries_object"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot carries at least one object."));
      }
    };
    Blockly.Python['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };
    Blockly.JavaScript['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };


    Blockly.Blocks['_object_here_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("object_here"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if there is at least one object here."));
      }
    };
    Blockly.Python['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };
    Blockly.JavaScript['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };


    Blockly.Blocks['_is_facing_north_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("is_facing_north"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot is facing North."));
      }
    };
    Blockly.Python['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };
    Blockly.JavaScript['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };


    Blockly.Blocks['_star_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("star"))
            .appendField(new Blockly.FieldImage("/src/images/star.png", 15, 15, RUR.translate("star")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_star_'] = function(block) {
      return [RUR.translate("star")];
    };
    Blockly.JavaScript['_star_'] = function(block) {
      return [RUR.translate("star")];
    };

    Blockly.Blocks['_token_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("token"))
            .appendField(new Blockly.FieldImage("/src/images/token.png", 15, 15, RUR.translate("token")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_token_'] = function(block) {
      return [RUR.translate("token")];
    };
    Blockly.JavaScript['_token_'] = function(block) {
      return [RUR.translate("token")];
    };

    Blockly.Blocks['_apple_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("apple"))
            .appendField(new Blockly.FieldImage("/src/images/apple.png", 15, 15, RUR.translate("apple")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };
    Blockly.JavaScript['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };

    Blockly.Blocks['_carrot_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("carrot"))
            .appendField(new Blockly.FieldImage("/src/images/carrot.png", 15, 15, RUR.translate("carrot")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };
    Blockly.JavaScript['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };

    Blockly.Blocks['_dandelion_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("dandelion"))
            .appendField(new Blockly.FieldImage("/src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };
    Blockly.JavaScript['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };

    Blockly.Blocks['_daisy_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("daisy"))
            .appendField(new Blockly.FieldImage("/src/images/daisy.png", 15, 15, RUR.translate("daisy")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };
    Blockly.JavaScript['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };

    Blockly.Blocks['_triangle_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("triangle"))
            .appendField(new Blockly.FieldImage("/src/images/triangle.png", 15, 15, RUR.translate("triangle")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };
    Blockly.JavaScript['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };

    Blockly.Blocks['_square_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("square"))
            .appendField(new Blockly.FieldImage("/src/images/square.png", 15, 15, RUR.translate("square")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_square_'] = function(block) {
      return [RUR.translate("square")];
    };
    Blockly.JavaScript['_square_'] = function(block) {
      return [RUR.translate("square")];
    };

    Blockly.Blocks['_strawberry_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("strawberry"))
            .appendField(new Blockly.FieldImage("/src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };
    Blockly.JavaScript['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };

    Blockly.Blocks['_leaf_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("leaf"))
            .appendField(new Blockly.FieldImage("/src/images/leaf.png", 15, 15, RUR.translate("leaf")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };
    Blockly.JavaScript['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };

    Blockly.Blocks['_banana_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("banana"))
            .appendField(new Blockly.FieldImage("/src/images/banana.png", 15, 15, RUR.translate("banana")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };
    Blockly.JavaScript['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };

    Blockly.Blocks['_orange_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("orange"))
            .appendField(new Blockly.FieldImage("/src/images/orange.png", 15, 15, RUR.translate("orange")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };
    Blockly.JavaScript['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };

    Blockly.Blocks['_tulip_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("tulip"))
            .appendField(new Blockly.FieldImage("/src/images/tulip.png", 15, 15, RUR.translate("tulip")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };
    Blockly.JavaScript['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };

    Blockly.Blocks['_carries_object_or_here_'] = {
      init: function() {
        this.appendValueInput("action")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("carries_object"), RUR.translate("carries_object")],
                [RUR.translate("object_here"), RUR.translate("object_here")]]), "condition");
        this.setOutput(true, "Boolean");
        this.setColour(RUR.color_condition);
      }
    };
    Blockly.Python['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.Python.valueToCode(block, 'action', Blockly.Python.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };
    Blockly.JavaScript['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };


    Blockly.Blocks['_take_or_put_'] = {
      init: function() {
        this.appendValueInput("obj")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("take"), RUR.translate("take")],
                [RUR.translate("put"), RUR.translate("put")]]), "action");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(RUR.color_basic);
      }
    };
    Blockly.Python['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.Python.valueToCode(block, 'obj', Blockly.Python.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '")\n';
    };
    Blockly.JavaScript['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '");\n';
    };



    /** Simple if skeletton from
    https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
    ****/

    Blockly.Blocks['_if_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        // this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      return "if (" + value_condition + ") {\n" + statements_then + "}\n";

    };
    Blockly.Python['_if_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      return "if " + value_condition + ":\n" + statements_then;
    };


    Blockly.Blocks['_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_then + "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_then + "else:\n" + statements_else;
    };


    Blockly.Blocks['_if_else_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("do")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendValueInput("condition2")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput("do2")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
      var value_condition2 = Blockly.JavaScript.valueToCode(block, 'condition2', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_do +
             "} else if (" + value_condition2 + ") {\n" + statements_do2 +
             "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_do = Blockly.Python.statementToCode(block, 'do');
      var value_condition2 = Blockly.Python.valueToCode(block, 'condition2', Blockly.Python.ORDER_ATOMIC);
      var statements_do2 = Blockly.Python.statementToCode(block, 'do2');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_do +
             "elif " + value_condition2 + ":\n" + statements_do2 +
             "else:\n" + statements_else;
    };

    $("#blocklyDiv").remove();
    $("#blockly-wrapper").append('<div id="blocklyDiv"></div>');
    $(".blocklyToolboxDiv").remove();

    /* With the current version of the code, Firefox does not display
       the trashcan and controls properly; so we do not show them ... but
       allow for testing via the console by setting RUR.firefox_ok to true */
    var firefox_present = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (firefox_present && !RUR.firefox_ok) {
        RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            trashcan: false});
    } else {
        RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            zoom:{
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2},
            trashcan: true});
    }

    $("#blocklyDiv").resizable({
        resize: function() {
            $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
            window.dispatchEvent(new Event('resize'));
        }
    });

    if (RUR.state.input_method == "python" ||
        RUR.state.input_method == "javascript" ||
        RUR.state.input_method == "py-repl") {
            $(".blocklyToolboxDiv").css({"pointer-events": "none", "opacity": 0.01});
        }

};
RUR.firefox_ok = false;

$("#blockly-wrapper").draggable({
    cursor: "move",
    handle: "p",
    drag: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    },
    stop: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    }
});



RUR.blockly.getValue = function () {
    var xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
    return Blockly.Xml.domToText(xml);
};
RUR.blockly.setValue = function (xml_text) {
    var xml = Blockly.Xml.textToDom(xml_text);
    RUR.blockly.workspace.clear();
    Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
};

},{"./rur.js":51,"./translator.js":56}],2:[function(require,module,exports){
/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

require("./translator.js");
require("./constants.js");
require("./control.js");
require("./custom_world_select.js");
require("./file_io.js");
require("./output.js");
require("./visible_robot.js");
require("./state.js");
require("./world.js");
require("./world_set.js");
require("./world_set/set_tile.js");

RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.CURRENT_WORLD.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.CURRENT_WORLD.robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.CURRENT_WORLD.robots[0];
    return RUR.control.get_colour_at_position(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    return RUR.CURRENT_WORLD.robots[0];
};

RUR._dir_js_ = RUR.inspect;

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.CURRENT_WORLD.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.CURRENT_WORLD.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.CURRENT_WORLD.robots[0]);
};

RUR._new_robot_images_ = RUR.vis_robot.new_robot_images;

RUR._no_highlight_ = user_no_highlight;

RUR._object_here_ = function (arg) {
    return RUR.world_get.object_at_robot_position(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.CURRENT_WORLD.robots[0];
    RUR.set_tile_at_position(color, robot.x, robot.y);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, append) {
    RUR.output.print_html(html, append);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._recording_ = function(bool) {
    if (bool) {
        RUR.state.do_not_record = false;
    } else {
        RUR.state.do_not_record = true;
    }
};

RUR._remove_robots_ = function () {
    RUR.CURRENT_WORLD.robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.CURRENT_WORLD.robots[0]);
};

RUR._set_max_nb_instructions_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.CURRENT_WORLD.robots[0].trace_color = color;
};

RUR._set_trace_style_ = RUR.vis_robot.set_trace_style;

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.CURRENT_WORLD.robots[0]);
};

RUR._view_source_js_ = RUR.output.view_source_js;

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.CURRENT_WORLD.robots[0]);
};

RUR._write_ = RUR.output.write;

RUR.__write_ = RUR.output._write;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.CURRENT_WORLD.robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR.file_io.load_world_from_program;

/*  methods below */

RUR._UR = {};

RUR._UR.at_goal_ = function (robot) {
    return RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    return RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    return RUR.control.carries_object(robot, obj);
};

RUR._UR.front_is_clear_ = function (robot) {
    return RUR.control.front_is_clear(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    return RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    return RUR.world_get.object_at_robot_position(robot, obj);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    return RUR.control.right_is_clear(robot);
};

RUR._UR.set_model_ = function (robot, model) {
    RUR.control.set_model(robot, model);
};

RUR._UR.set_trace_color_ = function (robot, color) {
    RUR.control.set_trace_color(robot, color);
};

RUR._UR.set_trace_style_ = function (robot, style) {
    RUR.control.set_trace_style(robot, style);
};

RUR._UR.take_ = function (robot, obj) {
    RUR.control.take(robot, obj);
};

RUR._UR.turn_left_ = function (robot) {
    RUR.control.turn_left(robot);
};

RUR._UR.wall_in_front_ = function (robot) {
    return RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    return RUR.control.wall_on_right(robot);
};

},{"./constants.js":3,"./control.js":4,"./custom_world_select.js":6,"./file_io.js":17,"./output.js":41,"./state.js":54,"./translator.js":56,"./visible_robot.js":65,"./world.js":67,"./world_set.js":76,"./world_set/set_tile.js":82}],3:[function(require,module,exports){
require("./rur.js");
RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

// all images are of this size.
RUR.TILE_SIZE = 40;

// current default canvas size.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// TODO: set up all canvas in separate isolated function so that
// unit testing can be done more easily - with contants defined but without
// having to mock document.

RUR.CANVASES = [];

RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas");
RUR.BACKGROUND_CTX = RUR.BACKGROUND_CANVAS.getContext("2d");
RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height; // getting defaults
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;   // from html file
RUR.CANVASES.push(RUR.BACKGROUND_CANVAS);

RUR.TILES_CANVAS = document.getElementById("tiles-canvas");
RUR.TILES_CTX = RUR.TILES_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.TILES_CANVAS);

RUR.TILES_CANVAS_ANIM = document.getElementById("tiles-canvas-anim");
RUR.TILES_ANIM_CTX = RUR.TILES_CANVAS_ANIM.getContext("2d");
RUR.CANVASES.push(RUR.TILES_CANVAS_ANIM);

RUR.OBSTACLES_CANVAS = document.getElementById("obstacles-canvas");
RUR.OBSTACLES_CTX = RUR.OBSTACLES_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.OBSTACLES_CANVAS);

RUR.OBSTACLES_CANVAS_ANIM = document.getElementById("obstacles-canvas-anim");
RUR.OBSTACLES_ANIM_CTX = RUR.OBSTACLES_CANVAS_ANIM.getContext("2d");
RUR.CANVASES.push(RUR.OBSTACLES_CANVAS_ANIM);

RUR.GOAL_CANVAS = document.getElementById("goal-canvas");
RUR.GOAL_CTX = RUR.GOAL_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.GOAL_CANVAS);

RUR.GOAL_CANVAS_ANIM = document.getElementById("goal-canvas-anim");
RUR.GOAL_ANIM_CTX = RUR.GOAL_CANVAS_ANIM.getContext("2d");
RUR.CANVASES.push(RUR.GOAL_CANVAS_ANIM);

RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");
RUR.OBJECTS_CTX = RUR.OBJECTS_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.OBJECTS_CANVAS);

RUR.OBJECTS_CANVAS_ANIM = document.getElementById("objects-canvas-anim");
RUR.OBJECTS_ANIM_CTX = RUR.OBJECTS_CANVAS_ANIM.getContext("2d");
RUR.CANVASES.push(RUR.OBJECTS_CANVAS_ANIM);

RUR.TRACE_CANVAS = document.getElementById("trace-canvas");
RUR.TRACE_CTX = RUR.TRACE_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.TRACE_CANVAS);

RUR.ROBOT_CANVAS = document.getElementById("robot-canvas");
RUR.ROBOT_CTX = RUR.ROBOT_CANVAS.getContext("2d");
RUR.CANVASES.push(RUR.ROBOT_CANVAS);


RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.CURRENT_WORLD.small_tiles become true.

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
// the current default values of RUR.COLS and RUR.ROWS on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.COLS and RUR.ROWS should be used.
RUR.MAX_X = 14;
RUR.MAX_Y = 12;
RUR.USE_SMALL_TILES = false;

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.KNOWN_OBJECTS = [];
RUR.KNOWN_TILES = [];
RUR.KNOWN_OBSTACLES = [];
RUR.ANIMATION_TIME = 120;

RUR._CALLBACK_FN = function () {
    alert("FATAL internal error: RUR._CALLBACK_FN was not initialized.");
};

},{"./rur.js":51}],4:[function(require,module,exports){
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

require("./translator.js");
require("./constants.js");
require("./objects.js");
require("./output.js");
require("./recorder/record_frame.js");
require("./state.js");
require("./exceptions.js");
require("./world_get.js");
require("./world_set.js");
require("./utils/supplant.js");
require("./utils/key_exist.js");

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var tile, tiles, name, objects, tile_beyond, solid_tile_beyond,
        solids_beyond, solid_object_beyond,
        pushable_object_here, pushable_object_beyond,
        wall_beyond, x_beyond, y_beyond;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    x_beyond = robot.x;  // if robot is moving vertically, it x coordinate does not change
    y_beyond = robot.y;

    switch (robot._orientation){
    case RUR.EAST:
        robot.x += 1;
        x_beyond = robot.x + 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        y_beyond = robot.y + 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        x_beyond = robot.x - 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        y_beyond = robot.y - 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }

    pushable_object_here = RUR.world_get.pushable_object_at_position(robot.x, robot.y);

    if (pushable_object_here) {
        // we had assume that we have made a successful move as nothing was
        // blocking the robot which is now at its next position.
        // However, something may have prevented the pushable object from
        // actually being pushed
        wall_beyond = RUR.control.wall_in_front(robot);
        pushable_object_beyond = RUR.world_get.pushable_object_at_position(x_beyond, y_beyond);
        tile_beyond = RUR.world_get.tile_at_position(x_beyond, y_beyond);
        if (tile_beyond && tile_beyond.solid) {
            solid_tile_beyond = true;
            } else {
            solid_tile_beyond = false;
        }

        solids_beyond = RUR.world_get.obstacles_at_position(x_beyond, y_beyond);
        solid_object_beyond = false;
        if (solids_beyond) {
            for (name in solids_beyond) {
                if (RUR.OBSTACLES[name] !== undefined && RUR.OBSTACLES[name].solid) {
                    solid_object_beyond = true;
                    break;
                }
            }
        }

        if (pushable_object_beyond || wall_beyond || solid_tile_beyond || solid_object_beyond) {
            robot.x = robot._prev_x;
            robot.y = robot._prev_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.control.move_object(pushable_object_here, robot.x, robot.y,
            x_beyond, y_beyond);
        }
    }

    RUR.state.sound_id = "#move-sound";
    RUR.record_frame("debug", "RUR.control.move");
    tile = RUR.world_get.tile_at_position(robot.x, robot.y);
    if (tile) {
        if (tile.fatal){
            if (!(tile == RUR.TILES.water && RUR.control.solid_object_here(robot, RUR.translate("bridge"))) ){
                throw new RUR.ReeborgError(RUR.translate(tile.message));
            }
        }
        if (tile.slippery){
            RUR.output.write(RUR.translate(tile.message) + "\n");
            RUR.control.move(robot);
        }
    }

    objects = RUR.world_get.obstacles_at_position(robot.x, robot.y);
    if (objects) {
        for (name in objects) {
            if (RUR.OBSTACLES[name] !== undefined && RUR.OBSTACLES[name].fatal) {
                robot.x = robot._prev_x;
                robot.y = robot._prev_y;
                throw new RUR.ReeborgError(RUR.OBSTACLES[name].message);
            }
        }
    }
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
    }

};

RUR.control.move_object = function(obj, x, y, to_x, to_y){
    "use strict";
    var bridge_already_there = false;
    if (RUR.world_get.obstacles_at_position(to_x, to_y).bridge !== undefined){
        bridge_already_there = true;
    }


    RUR.add_object_at_position(obj, x, y, 0);
    if (RUR.OBJECTS[obj].in_water &&
        RUR.world_get.tile_at_position(to_x, to_y) == RUR.TILES.water &&
        !bridge_already_there){
            // TODO: fix this
        RUR.world_set.add_solid_object(RUR.OBJECTS[obj].in_water, to_x, to_y, 1);
    } else {
        RUR.add_object_at_position(obj, to_x, to_y, 1);
    }
};


RUR.control.turn_left = function(robot){
    "use strict";
    robot._prev_orientation = robot._orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 1;  // could have used "++" instead of "+= 1"
    robot._orientation %= 4;
    RUR.state.sound_id = "#turn-sound";
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("debug", "RUR.control.turn_left");
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("debug", "RUR.control.__turn_right");
};

RUR.control.pause = function (ms) {
    RUR.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    if (RUR.state.input_method === "py-repl") {
        RUR.frames = [];
        RUR.nb_frames = 1;
        RUR.record_frame();
        RUR.rec.conclude();
    } else {
        throw new RUR.ReeborgError(RUR.translate("Done!"));
    }
};

RUR.control.put = function(robot, arg){
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.state.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_carried = robot.objects;
    all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    if (all_objects.length === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.ReeborgError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        } else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }
};

RUR.control._robot_put_down_object = function (robot, obj) {
    "use strict";
    var objects_carried, coords, obj_type;
    if (obj === undefined){
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    if (robot.objects[obj] != "infinite") {
        robot.objects[obj] -= 1;
    }
    if (robot.objects[obj] === 0) {
        delete robot.objects[obj];
    }

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "objects");
    coords = robot.x + "," + robot.y;
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.objects, coords);
    if (RUR.CURRENT_WORLD.objects[coords][obj] === undefined) {
        RUR.CURRENT_WORLD.objects[coords][obj] = 1;
    } else {
        RUR.CURRENT_WORLD.objects[coords][obj] += 1;
    }
    RUR.record_frame("debug", "RUR.control._put_object");
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (objects_here.length === 0 || objects_here == false) { // jshint ignore:line
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
    }  else if (objects_here.length === 0 || objects_here == false){ // jshint ignore:line
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.CURRENT_WORLD.objects[coords][obj] -= 1;

    if (RUR.CURRENT_WORLD.objects[coords][obj] === 0){
        delete RUR.CURRENT_WORLD.objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.world_get.object_at_robot_position(robot) == false){ // jshint ignore:line
            delete RUR.CURRENT_WORLD.objects[coords];
        }
    }
    RUR._ensure_key_exists(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else {
        if (robot.objects[obj] != "infinite") {
            robot.objects[obj]++;
        }
    }
    RUR.record_frame("debug", "RUR.control._take_object");
};


RUR.control.build_wall = function (robot){
    var coords, orientation, x, y, walls;
    if (RUR.control.wall_in_front(robot)){
        throw new RUR.WallCollisionError(RUR.translate("There is already a wall here!"));
    }

    switch (robot._orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        orientation = "east";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        orientation = "north";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.WEST:
        orientation = "east";
        x = robot.x-1;
        y = robot.y;
        break;
    case RUR.SOUTH:
        orientation = "north";
        x = robot.x;
        y = robot.y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }

    coords = x + "," + y;
    walls = RUR.CURRENT_WORLD.walls;
    if (walls === undefined){
        walls = {};
        RUR.CURRENT_WORLD.walls = walls;
    }

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.state.sound_id = "#build-sound";
    RUR.record_frame("debug", "RUR.control.build_wall");
};


RUR.control.wall_in_front = function (robot) {
    var coords;
    switch (robot._orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (robot.x == RUR.COLS){
            return true;
        }
        if (RUR.world_get.is_wall_at(coords, "east")) {
            return true;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (robot.y == RUR.ROWS){
            return true;
        }
        if (RUR.world_get.is_wall_at(coords, "north")) {
            return true;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return true;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.world_get.is_wall_at(coords, "east")) {
                return true;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return true;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.world_get.is_wall_at(coords, "north")) {
                return true;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
    return false;
};

RUR.control.wall_on_right = function (robot) {
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.tile_in_front = function (robot) {
    // returns single tile
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.world_get.tile_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.world_get.tile_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.world_get.tile_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.world_get.tile_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.tile_in_front().");
    }
};


RUR.control.obstacles_in_front = function (robot) {
    // returns list of tiles
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.world_get.obstacles_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.world_get.obstacles_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.world_get.obstacles_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.world_get.obstacles_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.obstacles_in_front().");
    }
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, solid, name;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    tile = RUR.control.tile_in_front(robot);
    if (tile) {
        if (tile.detectable && tile.fatal){
                if (tile == RUR.TILES.water) {
                    if (!RUR.control._bridge_present(robot)){
                        return false;
                    }
                } else {
                    return false;
                }
        }
    }

    solid = RUR.control.obstacles_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (RUR.OBSTACLES[name] !== undefined &&
                RUR.OBSTACLES[name].detectable &&
                RUR.OBSTACLES[name].fatal) {
                return false;
            }
        }
    }

    return true;
};


RUR.control._bridge_present = function(robot) {
    var solid, name;
        solid = RUR.control.obstacles_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (name == "bridge") {
                return true;
            }
        }
    }
    return false;
};


RUR.control.right_is_clear = function(robot){
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.playback_delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.CURRENT_WORLD.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};


// TODO: review this as it seems redundant ... and may not work as expected.
RUR.control.solid_object_here = function (robot, tile) {
    var tile_here, tile_type, all_solid_objects;
    var coords = robot.x + "," + robot.y;

    if (RUR.CURRENT_WORLD.obstacles === undefined ||
        RUR.CURRENT_WORLD.obstacles[coords] === undefined) {
        return false;
    }

    tile_here =  RUR.CURRENT_WORLD.obstacles[coords];

    for (tile_type in tile_here) {
        if (tile_here.hasOwnProperty(tile_type)) {
            if (tile!== undefined && tile_type == RUR.translate_to_english(tile)) {
                return true;
            }
        }
    }
    return false;
};


RUR.control.carries_object = function (robot, obj) {
    var obj_type, all_objects, carried=false;

    if (robot === undefined || robot.objects === undefined) {
        return 0;
    }

    all_objects = {};

    if (obj === undefined) {
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type)) {
                all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
                carried = true;
            }
        }
        if (carried) {
            return all_objects;
        } else {
            return 0;
        }
    } else {
        obj = RUR.translate_to_english(obj);
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type) && obj_type == obj) {
                return robot.objects[obj_type];
            }
        }
        return 0;
    }
};


RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.record_frame();
 };

RUR.control.set_trace_color = function(robot, color){
    robot.trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot.trace_style = style;
 };

if (RUR.state === undefined){
    RUR.state = {};
}

RUR.state.sound_on = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.state.sound_on = false;
        return;
    }
    RUR.state.sound_on = true;
};

RUR.control.get_colour_at_position = function (x, y) {
    if (RUR.world_get.tile_at_position(x, y)===false) {
        return null;
    } else if (RUR.world_get.tile_at_position(x, y)===undefined){
        return RUR.CURRENT_WORLD.tiles[x + "," + y];
    } else {
        return null;
    }
};
RUR.control.get_color_at_position = RUR.control.get_colour_at_position;

},{"./constants.js":3,"./exceptions.js":13,"./objects.js":40,"./output.js":41,"./recorder/record_frame.js":47,"./state.js":54,"./translator.js":56,"./utils/key_exist.js":62,"./utils/supplant.js":64,"./world_get.js":73,"./world_set.js":76}],5:[function(require,module,exports){
function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}

function shiftTab(cm) {
  cm.execCommand("indentLess");
}

window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.library = CodeMirror.fromTextArea(document.getElementById('library-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
library.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.pre_code_editor = CodeMirror.fromTextArea(document.getElementById('pre-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
pre_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});
window.post_code_editor = CodeMirror.fromTextArea(document.getElementById('post-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
post_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.description_editor = CodeMirror.fromTextArea(document.getElementById('description'), {
  mode: {
    name: "htmlmixed"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
description_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.onload_editor = CodeMirror.fromTextArea(document.getElementById('onload-editor'), {
  mode: {
    name: "javascript"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
onload_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

},{}],6:[function(require,module,exports){

require("./translator.js");
require("./world_select.js");
require("./storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {
    "use strict";
    var i, url;
    RUR.world_select.empty_menu();
    for(i=0; i<contents.length; i++){
        RUR.world_select.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    if (RUR.state.session_initialized) {
        RUR.world_select.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;
    RUR.state.creating_menu = true;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
    RUR.state.creating_menu = false;
}


RUR.make_default_menu = function(language) {
    switch (language) {
        case 'en':
        case 'fr-en':
        case 'ko-en':
            RUR.make_default_menu_en();
            break;
        case 'fr':
        case 'en-fr':
            RUR.make_default_menu_fr();
            break;
        default: RUR.make_default_menu_en();
    }
};


RUR.make_default_menu_en = function () {
    "use strict";
    var contents,
        tutorial_en = RUR._BASE_URL + '/src/worlds/tutorial_en/',
        menus = RUR._BASE_URL + '/src/worlds/menus/',
        worlds = RUR._BASE_URL + '/src/worlds/',
        docs = RUR._BASE_URL + '/src/worlds/documentation/',
        permalinks = RUR._BASE_URL + '/src/worlds/permalinks/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [tutorial_en + 'around1.json', 'Around 1'],
        [tutorial_en + 'around2.json', 'Around 2'],
        [tutorial_en + 'around3.json', 'Around 3'],
        [tutorial_en + 'around4.json', 'Around 4'],
        [tutorial_en + 'center1.json', 'Center 1'],
        [tutorial_en + 'center2.json', 'Center 2'],
        [tutorial_en + 'center3.json', 'Center 3'],
        [tutorial_en + 'harvest1.json', 'Harvest 1'],
        [tutorial_en + 'harvest2.json', 'Harvest 2'],
        [tutorial_en + 'harvest3.json', 'Harvest 3'],
        [tutorial_en + 'harvest4a.json', 'Harvest 4a'],
        [tutorial_en + 'harvest4b.json', 'Harvest 4b'],
        [tutorial_en + 'harvest4c.json', 'Harvest 4c'],
        [tutorial_en + 'harvest4d.json', 'Harvest 4d'],
        [tutorial_en + 'home1.json', 'Home 1'],
        [tutorial_en + 'home2.json', 'Home 2'],
        [tutorial_en + 'home3.json', 'Home 3'],
        [tutorial_en + 'hurdle1.json', 'Hurdle 1'],
        [tutorial_en + 'hurdle2.json', 'Hurdle 2'],
        [tutorial_en + 'hurdle3.json', 'Hurdle 3'],
        [tutorial_en + 'hurdle4.json', 'Hurdle 4'],
        [tutorial_en + 'maze1.json', 'Maze 1'],
        [tutorial_en + 'maze2.json', 'Maze 2'],
        [tutorial_en + 'newspaper0.json', 'Newspaper 0'],
        [tutorial_en + 'newspaper1.json', 'Newspaper 1'],
        [tutorial_en + 'newspaper2.json', 'Newspaper 2'],
        [tutorial_en + 'rain1_en.json', 'Rain 1'],
        [tutorial_en + 'rain2_en.json', 'Rain 2'],
        [tutorial_en + 'storm1.json', 'Storm 1'],
        [tutorial_en + 'storm2.json', 'Storm 2'],
        [tutorial_en + 'storm3.json', 'Storm 3'],
        [tutorial_en + 'tokens1.json', 'Tokens 1'],
        [tutorial_en + 'tokens2.json', 'Tokens 2'],
        [tutorial_en + 'tokens3.json', 'Tokens 3'],
        [tutorial_en + 'tokens4.json', 'Tokens 4'],
        [tutorial_en + 'tokens5.json', 'Tokens 5'],
        [tutorial_en + 'tokens6.json', 'Tokens 6'],
        [docs + 'simple_demo1', 'Demo 1 (solution)'],
        [docs + 'simple_demo2', 'Demo 2 (solution)'],
        [docs + 'simple_demo3', 'Demo 3 (solution)'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [permalinks + 'pre_post_demo', 'Pre & Post code demo'],
        [permalinks + 'story', 'Story'],
        [permalinks + 'test_remove', 'Robot replacement'],
        [docs + 'big_maze.json', 'Big maze'],
        [worlds + 'maze_gen_py', 'Maze generation (Python)'],
        [worlds + 'maze_gen_js', 'Maze generation (Javascript)'],
        [worlds + 'blank.json', 'Blank canvas'],
        ];

    RUR.custom_world_select.make(contents);
};

RUR.make_default_menu_fr = function () {
    "use strict";
    var base_url, base_url2, contents, menus, worlds;

    base_url = RUR._BASE_URL + '/src/worlds/tutorial_en/';
    base_url2 = RUR._BASE_URL + '/src/worlds/tutorial_fr/';

    menus = RUR._BASE_URL + '/src/worlds/menus/';
    worlds = RUR._BASE_URL + '/src/worlds/';

    contents = [
        ['/src/worlds/seul.json', 'Seul'],
        ['/src/worlds/empty.json', 'Vide'],
        [base_url2 + 'around1.json', 'Autour 1'],
        [base_url2 + 'around2.json', 'Autour 2'],
        [base_url2 + 'around3.json', 'Autour 3'],
        [base_url2 + 'around4.json', 'Autour 4'],
        [base_url + 'home1.json', 'But 1'],
        [base_url + 'home2.json', 'But 2'],
        [base_url + 'home3.json', 'But 3'],
        [base_url + 'center1.json', 'Centrer 1'],
        [base_url + 'center2.json', 'Centrer 2'],
        [base_url + 'center3.json', 'Centrer 3'],
        [base_url + 'hurdle1.json', 'Haies 1'],
        [base_url + 'hurdle2.json', 'Haies 2'],
        [base_url + 'hurdle3.json', 'Haies 3'],
        [base_url + 'hurdle4.json', 'Haies 4'],
        [base_url + 'tokens1.json', 'Jetons 1'],
        [base_url + 'tokens2.json', 'Jetons 2'],
        [base_url + 'tokens3.json', 'Jetons 3'],
        [base_url + 'tokens4.json', 'Jetons 4'],
        [base_url + 'tokens5.json', 'Jetons 5'],
        [base_url + 'tokens6.json', 'Jetons 6'],
        [base_url + 'newspaper0.json', 'Journal 0'],
        [base_url + 'newspaper1.json', 'Journal 1'],
        [base_url + 'newspaper2.json', 'Journal 2'],
        [base_url + 'maze1.json', 'Labyrinthe 1'],
        [base_url + 'maze2.json', 'Labyrinthe 2'],
        [base_url + 'rain1.json', 'Pluie 1'],
        [base_url + 'rain2.json', 'Pluie 2'],
        [base_url + 'harvest1.json', 'Récolte 1'],
        [base_url + 'harvest2.json', 'Récolte 2'],
        [base_url + 'harvest3.json', 'Récolte 3'],
        [base_url + 'harvest4a.json', 'Récolte 4a'],
        [base_url + 'harvest4b.json', 'Récolte 4b'],
        [base_url + 'harvest4c.json', 'Récolte 4c'],
        [base_url + 'harvest4d.json', 'Récolte 4d'],
        [base_url + 'storm1.json', 'Tempête 1'],
        [base_url + 'storm2.json', 'Tempête 2'],
        [base_url + 'storm3.json', 'Tempête 3'],
        // [menus + 'default_fr', 'Menu par défaut'],
        [worlds + 'menus/documentation_fr', 'Documentation (menu anglais)'],
        [worlds + 'simple_path_fr.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [RUR._BASE_URL + '/src/worlds/blank.json', 'Canevas graphique'],
    ];

    RUR.custom_world_select.make(contents);
};

},{"./storage.js":55,"./translator.js":56,"./world_select.js":75}],7:[function(require,module,exports){
/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_set/add_object.js");
require("./../visible_world.js");
require("./../state.js");
var msg = require("./../../lang/msg.js");

msg.record_id("number-of-objects", "Number of objects:");
msg.record_id("maximum-text", "Maximum:");
msg.record_id("add-object-explain", "ADD OBJECT EXPLAIN");
msg.record_id("input-add-number");
msg.record_id("maximum-number");
msg.record_id("dialog-add-object");
msg.record_title("ui-dialog-title-dialog-add-object", "Add object in the world");

exports.dialog_add_object = dialog_add_object = $("#dialog-add-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            add_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function add_object () {
    "use strict";
    var query, input_add_number_result, input_maximum_result;
    input_add_number_result = parseInt($("#input-add-number").val(), 10);
    input_maximum_result = parseInt($("#maximum-number").val(), 10);
    if (input_maximum_result > input_add_number_result){
        query =  input_add_number_result + "-" + input_maximum_result;
    } else {
        query = input_add_number_result;
    }
    RUR.add_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    add_object();
});

},{"./../../lang/msg.js":87,"./../rur.js":51,"./../state.js":54,"./../visible_world.js":66,"./../world_set/add_object.js":78}],8:[function(require,module,exports){

require("./../libs/jquery.ui.dialog.minmax.js");
require("./../rur.js");
var update_titles = require("./../../lang/msg.js").update_titles;


RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("active-element");
            if (special_fn !== undefined){
                special_fn();
            }
        }
    };
    for (var attrname in add_options) {
        options[attrname] = add_options[attrname];
    }

    button.on("click", function(evt) {
        element.dialog(options);
        button.toggleClass("blue-gradient");
        button.toggleClass("active-element");
        if (button.hasClass("active-element")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
        update_titles();
    });
};

RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
        {autoOpen:false, width:750,  height:330, maximize: false, position:"left"});

$("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                position:{my: "bottom", at: "bottom-20", of: window}});
$("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, dialogClass: "proclaims",
                                position:{my: "bottom", at: "bottom-80", of: window}});
$("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                position:{my: "bottom", at: "bottom-140", of: window}});

},{"./../../lang/msg.js":87,"./../libs/jquery.ui.dialog.minmax.js":21,"./../rur.js":51}],9:[function(require,module,exports){

require("./../world_set.js");
require("./../visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../state.js");
require("./../rur.js");
var msg = require("./../../lang/msg.js");

msg.record_id("give-number-of-objects", "Number of objects:");
msg.record_id("unlimited-text", "Unlimited:");
msg.record_id("give-object-explain", "GIVE OBJECT EXPLAIN");
msg.record_id("input-give-number");
msg.record_id("unlimited-number");
msg.record_id("dialog-give-object");
msg.record_title("ui-dialog-title-dialog-give-object", "Give object to robot");

exports.dialog_give_object = dialog_give_object = $("#dialog-give-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            give_object();
        },
        Cancel: function() {
            dialog_give_object.dialog("close");
        }
    },
    close: function() {
        give_object_form[0].reset();
    }
});
give_object = function () {
    "use strict";
    var query, give_number_result, unlimited_number_result;
    give_number_result = parseInt($("#input-give-number").val(), 10);
    unlimited_number_result = $("#unlimited-number").prop("checked");
    if (unlimited_number_result){
        query = Infinity;
    } else {
        query = give_number_result;
    }
    RUR.give_object_to_robot(RUR.state.specific_object, query);
    RUR.vis_world.refresh_world_edited();
    dialog_give_object.dialog("close");
    return true;
};
give_object_form = dialog_give_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    give_object();
});

},{"./../../lang/msg.js":87,"./../rur.js":51,"./../state.js":54,"./../visible_world.js":66,"./../world_set.js":76,"./../world_set/give_object_to_robot.js":80}],10:[function(require,module,exports){
require("./../visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../state.js");

var msg = require("./../../lang/msg.js");

msg.record_id("dialog-goal-object");
msg.record_title("ui-dialog-title-dialog-goal-object", "Set goal number for object");
msg.record_id("dialog-goal-object-explain", "dialog-goal-object-explain");
msg.record_id("input-goal-number-text", "Number of objects");
msg.record_id("all-objects-text", "All such objects");

exports.dialog_goal_object = dialog_goal_object = $("#dialog-goal-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            goal_objects();
        },
        Cancel: function() {
            dialog_goal_object.dialog("close");
        }
    },
    close: function() {
        goal_objects_form[0].reset();
    }
});
goal_objects = function () {
    "use strict";
    var query, input_goal_number_result, all_objects_result;
    input_goal_number_result = parseInt($("#input-goal-number").val(), 10);
    all_objects_result = $("#all-objects").prop("checked");
    if (all_objects_result){
        query =  "all";
    } else {
        query = input_goal_number_result;
    }
    RUR.add_goal_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});

},{"./../../lang/msg.js":87,"./../state.js":54,"./../visible_world.js":66,"./../world_set/give_object_to_robot.js":80}],11:[function(require,module,exports){
require("./../visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("color-selection-text", "Colour:");
msg.record_id("colour-selection");
msg.record_id("dialog-select-colour");
msg.record_title("ui-dialog-title-dialog-select-colour", "Enter a colour");

exports.dialog_select_colour = dialog_select_colour = $("#dialog-select-colour").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            select_colour();
        },
        Cancel: function() {
            dialog_select_colour.dialog("close");
        }
    }
});

dialog_select_colour.find("form").on("submit", function( event ) {
    event.preventDefault();
    select_colour();
});

select_colour = function () {
    var colour = $("#colour-selection").val();
    if (!colour) {
        colour = false;
    }
    dialog_select_colour.dialog("close");
    RUR._CALLBACK_FN(colour);
    RUR.vis_world.draw_all();
};

},{"./../../lang/msg.js":87,"./../visible_world.js":66}],12:[function(require,module,exports){
require("./../visible_world.js");
var msg = require("./../../lang/msg.js");
var dialog;

msg.record_id("dialog-set-background-image");
msg.record_title("ui-dialog-title-dialog-set-background-image", "Background image");

exports.dialog_set_background_image = dialog = $("#dialog-set-background-image").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_background_image();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});
dialog.find("form").on("submit",
    function( event ) {
        event.preventDefault();
        set_background_image();
});
set_background_image = function () {
    var url = $("#image-url").val();
    if (!url) {
        url = '';
    }
    RUR.CURRENT_WORLD.background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.BACKGROUND_IMAGE.onload = RUR.vis_world.draw_all;
    dialog.dialog("close");
};

},{"./../../lang/msg.js":87,"./../visible_world.js":66}],13:[function(require,module,exports){

require("./rur.js");
require("./state.js");

RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgOK(message);
    }
    this.reeborg_concludes = message;
    this.message = message;
};

RUR.ReeborgError = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};

},{"./rur.js":51,"./state.js":54}],14:[function(require,module,exports){
require("./../rur.js");
require("./images.js");


/** @function add_object_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, it is replaced by a new one
 *    which may have completely different characteristics.
 *
 * @desc Cette fonction permet l'ajout de nouveaux tuiles.  Si le nom d'une
 *   tuile existante est spécifiée, elle est remplacée par la nouvelle qui pourrait
 *   avoir des caractéristiques complètement différentes.
 *   N.B. les noms de tuiles par défaut sont
 *   des noms anglais (par exemple "grass" plutôt que "gazon").
 *
 * @param {Object} object A Javascript object (similar to a Python dict) that
 *                      describes the properties of the obj. <br>
 *                      _Un objet javascript (similaire à un dict en Python)
 *                      qui décrit les propriétés de la tuile._
 *
 * @param {string} obj.name  The unique name to be given to the obj. <br>
 *                            _Le nom unique donné à la tuile_
 *
 * @param {string} [obj.public_name] If various objects are meant to represent
 *                                    the same type of object (e.g. different shades of "grass")
 *                                    this attribute can be used to specify that single name.
 *
 * @param {string} [obj.url] If a single image is used, this indicated the source.
 *                            **Either obj.url or obj.images must be specified.**
 *
 * @param {string[]} [obj.images] If multiple images are used (for animated objects),
 *                               this array (list) contains the various URLs.
 *                            **Either obj.url or obj.images must be specified.**
 *
 * @param {string} [obj.selection_method = "random"]  For animated objects; choose one of
 *                           "sync", "ordered" or "random"
 *
 * @param {boolean} [obj.fatal] Program ends if Reeborg steps on such a object set to "true".
 *
 * @param {boolean} [obj.detectable] If `obj.fatal == obj.detectable == True`, Reeborg can
 *                                    detect with `front_is_clear()` and `right_is_clear()`.
 *
 * @param {boolean} [obj.solid] If sets to "true", prevents a box from sliding onto this obj.
 *
 * @param {boolean} [obj.slippery] If sets to "true", Reeborg will keep going to next object if
 *                                  it attempts to move on this obj.
 *
 * @example
 * // This first example shows how to set various objects;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/object1.json", "Example 1")
 *
 * // A second example shows how one can change objects behaviour.
 * // A possible usage of this would be to have Reeborg wear crampons
 * // so that it does not slip on the ice.
 * World("/worlds/examples/object2.json", "Example 2")
 */
RUR.OBJECTS = {};

RUR.add_object_type = function (new_obj) {
    "use strict";
    var i, key, keys, name, obj;
    name = new_obj.name;
    if (RUR.KNOWN_OBJECTS.indexOf(new_obj.name) != -1) {
        console.log("Warning: object name " + name + " already exists");
    } else {
        RUR.KNOWN_OBJECTS.push(name);
        RUR.OBJECTS[name] = {};
    }
    // copy all properties
    keys = Object.keys(new_obj);
    obj = RUR.OBJECTS[name];
    for(i=0; i < keys.length; i++){
        key = keys[i];
        obj[key] = new_obj[key];
    }
    // Object image: either a single image or a list for animation.
    if (obj.url) {
        obj.image = new Image();
        obj.image.src = obj.url;
        RUR.images_onload(obj.image);
    } else if (obj.images) {
        RUR.animate_images(obj);
    } else {
        alert("Fatal error: need either obj.url or a list: obj.images");
    }
    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (obj.goal) {
        if (obj.goal.url) {
            obj.goal.image = new Image();
            obj.goal.image.src = obj.goal.url;
            RUR.images_onload(obj.goal.image);
        } else if (obj.goal.images) {
            RUR.animate_images(obj.goal);
        }
    }
};


// supporting worlds created previously.
//
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_object_type({"name": name, "url": url, "goal": {"url": url_goal}});
};
RUR.add_object_image = RUR.add_new_object_type; // Vincent Maille's book.

},{"./../rur.js":51,"./images.js":16}],15:[function(require,module,exports){
require("./../rur.js");
require("./images.js");
//require("./../init/images_onload.js");

/** @function add_tile_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new tiles. If the name
 *    of an existing tile is specified again, it is replaced by a new one
 *    which may have completely different characteristics.
 *
 * @desc Cette fonction permet l'ajout de nouveaux tuiles.  Si le nom d'une
 *   tuile existante est spécifiée, elle est remplacée par la nouvelle qui pourrait
 *   avoir des caractéristiques complètement différentes.
 *   N.B. les noms de tuiles par défaut sont
 *   des noms anglais (par exemple "grass" plutôt que "gazon").
 *
 * @param {Object} tile A Javascript object (similar to a Python dict) that
 *                      describes the properties of the tile. <br>
 *                      _Un objet javascript (similaire à un dict en Python)
 *                      qui décrit les propriétés de la tuile._
 *
 * @param {string} tile.name  The unique name to be given to the tile. <br>
 *                            _Le nom unique donné à la tuile_
 *
 * @param {string} [tile.public_name] If various tiles are meant to represent
 *                                    the same type of tile (e.g. different shades of "grass")
 *                                    this attribute can be used to specify that single name.
 *
 * @param {string} [tile.url] If a single image is used, this indicated the source.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {string[]} [tile.images] If multiple images are used (for animated tiles),
 *                               this array (list) contains the various URLs.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {string} [tile.selection_method = "random"]  For animated tiles; choose one of
 *                           "sync", "ordered" or "random"
 *
 * @param {boolean} [tile.fatal] Program ends if Reeborg steps on such a tile set to "true".
 *
 * @param {boolean} [tile.detectable] If `tile.fatal == tile.detectable == True`, Reeborg can
 *                                    detect with `front_is_clear()` and `right_is_clear()`.
 *
 * @param {boolean} [tile.solid] If sets to "true", prevents a box from sliding onto this tile.
 *
 * @param {boolean} [tile.slippery] If sets to "true", Reeborg will keep going to next tile if
 *                                  it attempts to move on this tile.
 *
 * @example
 * // This first example shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 * // A second example shows how one can change tiles behaviour.
 * // A possible usage of this would be to have Reeborg wear crampons
 * // so that it does not slip on the ice.
 * World("/worlds/examples/tile2.json", "Example 2")
 */
RUR.TILES = {};

RUR.add_tile_type = function (new_tile) {
    "use strict";
    var i, key, keys, name, tile;
    name = new_tile.name;
    if (RUR.KNOWN_TILES.indexOf(new_tile.name) != -1) {
        console.log("Warning: tile name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }
    RUR.TILES[name] = {};
    tile = RUR.TILES[name];
    // copy all properties
    keys = Object.keys(new_tile);
    for(i=0; i < keys.length; i++){
        key = keys[i];
        tile[key] = new_tile[key];
    }
    // allow multiple tiles to appear under the same name;
    // for example, we might want to visually have different types of grass tiles
    // but referring under the single name "grass" when giving information
    if (tile.public_name) {
        tile.name = tile.public_name;
    }
    if (tile.url) {
        tile.image = new Image();
        tile.image.src = tile.url;
        RUR.images_onload(tile.image);
    } else if (tile.images) {
        RUR.animate_images(tile);
    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }
};

},{"./../rur.js":51,"./images.js":16}],16:[function(require,module,exports){
require("./../rur.js");
require("./../state.js");

var _ORDERED, _SYNC, _SYNC_VALUE;

exports.images_init = images_init = function () {
    _ORDERED = {};
    _SYNC = {};
    _SYNC_VALUE = {};
    RUR.ANIMATION_TIME = 120;
};

/* Important: we need to use a method from visible_world.js ONLY after
   the session is initialized; at that point, we know that visible_world.js
   has been loaded and we know it will be available even if we don't
   put it as a formal requirement.  If we were to put it as a requirement,
   we would end up with a circular requirement (e.g. objs.js require
   visible_world.js which require objs.js) with unpredictable consequences.
*/

//TODO: move RUR.INCREMENT_LOADED_FN here.


RUR.images_onload = function (image) {
    if (RUR.state.session_initialized) {
        image.onload = RUR.vis_world.refresh;
    } else {
        RUR._NB_IMAGES_TO_LOAD += 1;
        image.onload = RUR.INCREMENT_LOADED_FN;
    }
};

RUR.animate_images = function (obj) {
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        RUR.images_onload(obj["image"+i]);
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (coords) {
            return RUR._sync(obj, obj.images.length, coords);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (coords) {
            return RUR._ordered(obj, obj.images.length, coords);
        };
    } else {
        obj.choose_image = function (coords) {
            return RUR._random(obj, obj.images.length);
        };
    }
};




RUR._random = function (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
};

RUR._ordered = function (obj, nb, coords) {
    // each animated image is given a random initial value but then goes in order

    if (_ORDERED[obj.name] === undefined) {
        _ORDERED[obj.name] = {};
        _ORDERED[obj.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(_ORDERED[obj.name]).indexOf(coords) === -1) {
        _ORDERED[obj.name][coords] = Math.floor(Math.random() * nb);
    } else {
        _ORDERED[obj.name][coords] += 1;
        _ORDERED[obj.name][coords] %= nb;
    }
    return obj["image" + _ORDERED[obj.name][coords]];
};

RUR._sync = function (obj, nb, coords) {
    // every animated image of this type is kept in sync
    if (_SYNC[obj.name] === undefined) {
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] = 1;
    } else if (_SYNC[obj.name].indexOf(coords) !== -1) {
        // see an same animated image present: we are starting a new sequence
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] += 1;
        _SYNC_VALUE[obj.name] %= nb;
    }
    _SYNC[obj.name].push(coords);
    return obj["image" + _SYNC_VALUE[obj.name]];
};

},{"./../rur.js":51,"./../state.js":54}],17:[function(require,module,exports){

require("./output.js");
require("./recorder.js");
require("./world.js");
require("./world/import_world.js");
require("./world_select.js");
require("./permalink.js");
require("./translator.js");
require("./exceptions.js");
require("./listeners/stop.js");
require("./utils/supplant.js");


RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.

        If "url" already exists and is the selected world BUT shortname is
        different than the existing name, a call
        World(url, shortname)
        will result in the shortname being updated.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    if (url === undefined) {
        RUR.output.write(RUR.translate("World() needs an argument."));
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_select.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url, shortname);
    if (RUR.file_io.status !== undefined) {
        RUR.frames = [];
        RUR.stop();
        RUR.state.prevent_playback = true;
    }
    if (RUR.file_io.status === "no link") {
        RUR.show_feedback("#Reeborg-shouts",
                RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError("no link");
    } else if (RUR.file_io.status === "success") {
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        throw new RUR.ReeborgOK(RUR.translate("World selected").supplant({world: shortname}));
    }
};

RUR.file_io.last_url_loaded = undefined;
RUR.file_io.last_shortname_loaded = undefined;

RUR.file_io.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    if (RUR.file_io.last_url_loaded == url &&
        RUR.file_io.last_shortname_loaded == shortname) {
            return;
    } else {
        RUR.file_io.last_url_loaded = url;
        RUR.file_io.last_shortname_loaded = shortname;
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io.status = "no link";
            return;
        }
        RUR.world.import_world(data);
        RUR.file_io.status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io.status = "no link";
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world.import_world(data);
                }
                RUR.file_io.status = "success";
            }
        });
    }
};

},{"./exceptions.js":13,"./listeners/stop.js":37,"./output.js":41,"./permalink.js":42,"./recorder.js":46,"./translator.js":56,"./utils/supplant.js":64,"./world.js":67,"./world/import_world.js":71,"./world_select.js":75}],18:[function(require,module,exports){
/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

require("./commands.js");
require("./world_editor.js");

require("./start_session.js");

// TODO: easy function to hide edit world button (to prevent students seeing hidden code)
// TODO: animated robots/ decorative objects, objects
// TODO: document all world-editing functions, make them directly available as methods of RUR.
//       Use jsdoc and put on site.
// TODO: add turtle mode (see blockly for comparing with expected solution); ensure a blockly counterpart
// TODO: implement paint() and colour_here() in Blockly
// TODO: Create offline version as part of the build sequence

},{"./commands.js":2,"./start_session.js":53,"./utils/cors.js":59,"./world_editor.js":72}],19:[function(require,module,exports){
/* This file contains the tiles included by default */
require("./../rur.js");
require("./../extend/add_tile_type.js");

var home_message, tile;

tile = {name: "mud",
    url: RUR._BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: true,
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_tile_type(tile);

tile = {name: "ice",
    url: RUR._BASE_URL + '/src/images/ice.png',
    message: "I'm slipping on ice!",
    slippery: true,
    info: "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."
};
RUR.add_tile_type(tile);

tile = {name: "grass",
    url: RUR._BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_tile_type(tile);

tile = {name: "pale_grass",
    url: RUR._BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
    public_name: "grass"
};
RUR.add_tile_type(tile);

tile = {name: "gravel",
    url: RUR._BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_tile_type(tile);

tile = {
    name:"water",
    images: [RUR._BASE_URL + '/src/images/water.png',
        RUR._BASE_URL + '/src/images/water2.png',
        RUR._BASE_URL + '/src/images/water3.png',
        RUR._BASE_URL + '/src/images/water4.png',
        RUR._BASE_URL + '/src/images/water5.png',
        RUR._BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: true,
    detectable: true,
    message: "I'm in water!"
};
RUR.add_tile_type(tile);


RUR._add_new_tile_type = function (name, url) {
    var tiles = RUR.TILES;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR.KNOWN_TILES.push(name);
    RUR._NB_IMAGES_TO_LOAD += 1;
};

tile = {name: "bricks",
    public_name: "brick wall",
    url: RUR._BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: true,
    solid: true
};
RUR.add_tile_type(tile);

/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR._BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);

tile = {name: "house",
    url: RUR._BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);

tile = {name: "racing_flag",
    url: RUR._BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_tile_type(tile);

},{"./../extend/add_tile_type.js":15,"./../rur.js":51}],20:[function(require,module,exports){
/*  Handler of special on-screen keyboard
*/

require("./state.js");
require("./dialogs/create.js");
require("./listeners/editors_tabs.js");
require("./translator.js");
var msg = require("./../lang/msg.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="py-repl"){
                $("#kbd-py-console-btn").show();
            } else {
                $("#kbd-python-btn").show();
            }
            break;
        case "javascript":
            $("#kbd-javascript-btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert_statement = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
    RUR.kbd.enter();
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py-console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console(txt);
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR.state.input_method==="py-repl") {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd-command").hide();
    $(".kbd-condition").hide();
    $(".kbd-objects").hide();
    $(".kbd-python").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("active-element")) {
        $("#kbd-command-btn").removeClass("active-element");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("active-element")) {
        $("#kbd-condition-btn").removeClass("active-element");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("active-element")) {
        $("#kbd-python-btn").removeClass("active-element");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("active-element")) {
        $("#kbd-py-console-btn").removeClass("active-element");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("active-element")) {
        $("#kbd-javascript-btn").removeClass("active-element");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("active-element")) {
        $("#kbd-objects-btn").removeClass("active-element");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("active-element")) {
        $("#kbd-special-btn").removeClass("active-element");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("active-element");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("active-element");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("active-element");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("active-element");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("active-element");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("active-element");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("active-element");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="py-repl") {
            $(".no-console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

function add_onclick_select(arg) {
    var id = arg + "-btn";
    $("#"+id).on("click", function (evt) {
        RUR.kbd.select(arg);
    });
    msg.record_id(id, id);
}

msg.record_title("ui-dialog-title-special-keyboard", "Reeborg's basic keyboard");
add_onclick_select("kbd-command");
add_onclick_select("kbd-condition");
add_onclick_select("kbd-python");
add_onclick_select("kbd-py-console");
add_onclick_select("kbd-javascript");
add_onclick_select("kbd-objects");
add_onclick_select("kbd-special");

function add_onclick_insert_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}
add_onclick_insert_function_statement("kbd-move", "move");
add_onclick_insert_function_statement("kbd-turn-left", "turn_left");
add_onclick_insert_function_statement("kbd-take", "take");
add_onclick_insert_function_statement("kbd-put", "put");
add_onclick_insert_function_statement("kbd-build-wall", "build_wall");
add_onclick_insert_function_statement("kbd-pause", "pause");
add_onclick_insert_function_statement("kbd-done", "done");
add_onclick_insert_statement("kbd-think", "think(100)");
add_onclick_insert_statement("kbd-sound", "sound(True)");
add_onclick_insert_statement("kbd-sound-js", "sound(true)");
add_onclick_insert_function_statement("kbd-world", 'World');
add_onclick_insert_function_statement("kbd-UsedRobot", "UsedRobot");
add_onclick_insert_function_statement("kbd-newUsedRobot", "new UsedRobot");
add_onclick_insert_function_statement("kbd-no-highlight", "no_highlight");

function add_onclick_insert(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}

add_onclick_insert_function("kbd-at-goal", "at_goal");
add_onclick_insert_function("kbd-front-is-clear", "front_is_clear");
add_onclick_insert_function("kbd-right-is-clear", "right_is_clear");
add_onclick_insert_function("kbd-wall-in-front", "wall_in_front");
add_onclick_insert_function("kbd-wall-on-right", "wall_on_right");
add_onclick_insert_function("kbd-object-here", "object_here");
add_onclick_insert_function("kbd-carries-object", "carries_object");
add_onclick_insert_function("kbd-is-facing-north", "is_facing_north");

function add_onclick_insert_object(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert('"'+RUR.translate(arg)+'"');
    });
    msg.record_id(id);
}
add_onclick_insert_object("kbd-token", "token");
add_onclick_insert_object("kbd-apple", "apple");
add_onclick_insert_object("kbd-banana", "banana");
add_onclick_insert_object("kbd-carrot", "carrot");
add_onclick_insert_object("kbd-daisy", "daisy");
add_onclick_insert_object("kbd-dandelion", "dandelion");
add_onclick_insert_object("kbd-leaf", "leaf");
add_onclick_insert_object("kbd-orange", "orange");
add_onclick_insert_object("kbd-square", "square");
add_onclick_insert_object("kbd-star", "star");
add_onclick_insert_object("kbd-strawberry", "strawberry");
add_onclick_insert_object("kbd-triangle", "triangle");
add_onclick_insert_object("kbd-tulip", "tulip");

add_onclick_insert_untranslated_statement("kbd-js-var", "var ");
add_onclick_insert_untranslated("kbd-js-function", "function ? { \n\n}");
add_onclick_insert_untranslated("kbd-js-if", "if ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-elif", "else if ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-else", "else { \n\n}");
add_onclick_insert_untranslated("kbd-js-while", "while ( ? ) { \n\n}");
add_onclick_insert_untranslated("kbd-js-for", "for (? ; ? ; ?) { \n\n}");
add_onclick_insert_untranslated("kbd-js-true", "true");
add_onclick_insert_untranslated("kbd-js-false", "false");
add_onclick_insert_untranslated("kbd-js-undefined", "undefined");
add_onclick_insert_untranslated("kbd-js-not", "!");
add_onclick_insert_untranslated("kbd-js-and", "&&");
add_onclick_insert_untranslated("kbd-js-or", "||");
add_onclick_insert_function_statement("kbd-js-write", "write");
add_onclick_insert_untranslated_statement("kbd-js-return", "return");
add_onclick_insert_untranslated_statement("kbd-js-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-js-break", "break");

add_onclick_insert_untranslated_statement("kbd-py-def", "def ? ( ):");
add_onclick_insert_untranslated_statement("kbd-py-if", "if ? :");
add_onclick_insert_untranslated_statement("kbd-py-elif", "elif ? :");
add_onclick_insert_untranslated_statement("kbd-py-else", "else:");
add_onclick_insert_untranslated_statement("kbd-py-while", "while ? :");
add_onclick_insert_untranslated_statement("kbd-py-repeat", "repeat ? :");
add_onclick_insert_statement("kbd-py-library", "from library import ?");
add_onclick_insert_untranslated_statement("kbd-py-for", "for ? in ? :");
add_onclick_insert_untranslated_statement("kbd-py-print", "print()");
add_onclick_insert_untranslated_statement("kbd-py-range", "range(?)");
add_onclick_insert_untranslated_statement("kbd-py-true", "True");
add_onclick_insert_untranslated_statement("kbd-py-false", "False");
add_onclick_insert_untranslated_statement("kbd-py-none", "None");
add_onclick_insert_untranslated_statement("kbd-py-not", "not");
add_onclick_insert_untranslated_statement("kbd-py-and", "and");
add_onclick_insert_untranslated_statement("kbd-py-or", "or");
add_onclick_insert_untranslated_statement("kbd-py-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-py-break", "break");
add_onclick_insert_untranslated_statement("kbd-py-return", "return ?");
add_onclick_insert_untranslated_statement("kbd-py-pass", "pass");

add_onclick_insert_untranslated("kbd-pyrepl-def", "def ");
add_onclick_insert_untranslated("kbd-pyrepl-if", "if ");
add_onclick_insert_untranslated("kbd-pyrepl-elif", "elif ");
add_onclick_insert_untranslated("kbd-pyrepl-else", "else:");
add_onclick_insert_untranslated("kbd-pyrepl-while", "while ");
add_onclick_insert("kbd-pyrepl-library", "from library import ?");
add_onclick_insert_untranslated("kbd-pyrepl-for", "for ");
add_onclick_insert_untranslated("kbd-pyrepl-in", "in ");
add_onclick_insert_untranslated("kbd-pyrepl-print", "print(");
add_onclick_insert_untranslated("kbd-pyrepl-range", "range(");
add_onclick_insert_untranslated("kbd-pyrepl-true", "True");
add_onclick_insert_untranslated("kbd-pyrepl-false", "False");
add_onclick_insert_untranslated("kbd-pyrepl-none", "None");
add_onclick_insert_untranslated("kbd-pyrepl-not", "not");
add_onclick_insert_untranslated("kbd-pyrepl-and", "and");
add_onclick_insert_untranslated("kbd-pyrepl-or", "or");
add_onclick_insert_untranslated_statement("kbd-pyrepl-continue", "continue");
add_onclick_insert_untranslated_statement("kbd-pyrepl-break", "break");
add_onclick_insert_untranslated_statement("kbd-pyrepl-return", "return");
add_onclick_insert_untranslated_statement("kbd-pyrepl-pass", "pass");

add_onclick_insert_untranslated("kbd-colon", ":");
add_onclick_insert_untranslated("kbd-semi-colon", ";");
add_onclick_insert_untranslated("kbd-sharp", "#");
add_onclick_insert_untranslated("kbd-double-quote", "\"");
add_onclick_insert_untranslated("kbd-single-quote", "'");
add_onclick_insert_untranslated("kbd-equal", "=");
add_onclick_insert_untranslated("kbd-less-than", "<");
add_onclick_insert_untranslated("kbd-greater-than", ">");
add_onclick_insert_untranslated("kbd-ampersand", "&");
add_onclick_insert_untranslated("kbd-vertical-bar", "|");
add_onclick_insert_untranslated("kbd-parens", "( )");
add_onclick_insert_untranslated("kbd-curly-brackets", "{ }");
add_onclick_insert_untranslated("kbd-square-brackets", "[ ]");

$("#kbd-tab").on("click", function (evt) {
    RUR.kbd.tab();
});
msg.record_id("kbd-tab", "tab");
$("#kbd-shift-tab").on("click", function (evt) {
    RUR.kbd.shift_tab();
});
msg.record_id("kbd-shift-tab", "shift-tab");
$("#kbd-enter").on("click", function (evt) {
    RUR.kbd.enter();
});
msg.record_id("kbd-enter", "enter");
$("#kbd-undo").on("click", function (evt) {
    RUR.kbd.undo();
});
msg.record_id("kbd-undo", "UNDO");
$("#kbd-redo").on("click", function (evt) {
    RUR.kbd.redo();
});
msg.record_id("kbd-redo", "REDO");

function add_onclick(id, fn, arg, record, enter) {
    $("#"+id).on("click", function (evt) {
        fn(arg);
    });
    if (enter) {
        RUR.kbd.enter();
    }
    if (record) {
        msg.record_id(id, id);
    }
}

},{"./../lang/msg.js":87,"./dialogs/create.js":8,"./listeners/editors_tabs.js":24,"./state.js":54,"./translator.js":56}],21:[function(require,module,exports){
/*
 * jQuery UI Dialog 1.8.16
 * w/ Minimize & Maximize Support
 * by Elijah Horton (fieryprophet@yahoo.com)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 *
 * Modified by André Roberge to remove some IE support which is irrelevant for me.
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	// support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 300,
		minimizeText: 'minimize',
		maximizeText: 'maximize',
		minimize: true,
		maximize: true,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog);
			if(options.minimize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMinimize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-minimize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMinimize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMinimize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMinimize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMinimize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.minimize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-minusthick'
					)
					.text(options.minimizeText)
					.appendTo(uiDialogTitlebarMinimize);
			}
			if(options.maximize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMaximize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-maximize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMaximize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMaximize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMaximize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMaximize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.maximize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMaximizeText = (self.uiDialogTitlebarMaximizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-plusthick'
					)
					.text(options.maximizeText)
					.appendTo(uiDialogTitlebarMaximize);
					$(uiDialogTitlebar).dblclick(function(event) {
						self.maximize(event);
						return false;
					});
			}
			if(options.close !== false){
				var uiDialogTitlebarClose = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-close ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarClose.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarClose.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarClose.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarClose.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.close(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-closethick'
					)
					.text(options.closeText)
					.appendTo(uiDialogTitlebarClose);
			}

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		//handling of deprecated beforeclose (vs beforeClose) option
		//Ticket #4669 http://dev.jqueryui.com/ticket/4669
		//TODO: remove in 1.9pre
		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;
		self._min = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	minimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeMinimize', event)) {
			return;
		}
		if(!ui.data('is-minimized')){
			if(self.options.minimize && typeof self.options.minimize !== "boolean" && $(self.options.minimize).length > 0){
				self._min = $('<a>' + (ui.find('span.ui-dialog-title').html().replace(/&nbsp;/, '') || 'Untitled Dialog') + '</a>')
					.attr('title', 'Click to restore dialog').addClass('ui-corner-all ui-button').click(function(event){self.unminimize(event);});
				$(self.options.minimize).append(self._min);
				ui.data('is-minimized', true).hide();
			} else {
				if(ui.is( ":data(resizable)" )) {
					ui.data('was-resizable', true).resizable('destroy');
				} else {
					ui.data('was-resizable', false)
				}
				ui.data('minimized-height', ui.height());
				ui.find('.ui-dialog-content').hide();
				ui.find('.ui-dialog-titlebar-maximize').hide();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '1.8em').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s')
					.find('span').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s').click(function(event){self.unminimize(event); return false;});;
				ui.data('is-minimized', true).height('auto');
			}
		}
		return self;
	},

	unminimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeUnminimize', event)) {
			return;
		}
		if(ui.data('is-minimized')){
			if(self._min){
				self._min.unbind().remove();
				self._min = false;
				ui.data('is-minimized', false).show();
				self.moveToTop();
			} else {
				ui.height(ui.data('minimized-height')).data('is-minimized', false).removeData('minimized-height').find('.ui-dialog-content').show();
				ui.find('.ui-dialog-titlebar-maximize').show();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '3.3em').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick')
					.find('span').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick').click(function(event){self.minimize(event); return false;});
				if(ui.data('was-resizable') == true) {
					self._makeResizable(true);
				}
			}
		}
		return self;
	},

	maximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeMaximize', event)) {
			return;
		}
		if(!ui.data('is-maximized')){
			if(ui.is( ":data(draggable)" )) {
				ui.data('was-draggable', true).draggable('destroy');
			} else {
				ui.data('was-draggable', false)
			}
			if(ui.is( ":data(resizable)" )) {
				ui.data('was-resizable', true).resizable('destroy');
			} else {
				ui.data('was-resizable', false)
			}
			ui.data('maximized-height', ui.height()).data('maximized-width', ui.width()).data('maximized-top', ui.css('top')).data('maximized-left', ui.css('left'))
				.data('is-maximized', true).height($(window).height()-8).width($(window).width()+9).css({"top":0, "left": 0}).find('.ui-dialog-titlebar-minimize').hide();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw')
				.find('span').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw').click(function(event){self.unmaximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.unmaximize(event); return false;});
		}
		return self;
	},

	unmaximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeUnmaximize', event)) {
			return;
		}
		if(ui.data('is-maximized')){
			ui.height(ui.data('maximized-height')).width(ui.data('maximized-width')).css({"top":ui.data('maximized-top'), "left":ui.data('maximized-left')})
				.data('is-maximized', false).removeData('maximized-height').removeData('maximized-width').removeData('maximized-top').removeData('maximized-left').find('.ui-dialog-titlebar-minimize').show();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick')
				.find('span').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick').click(function(){self.maximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.maximize(event); return false;});
			if(ui.data('was-draggable') == true) {
				self._makeDraggable(true);
			}
			if(ui.data('was-resizable') == true) {
				self._makeResizable(true);
			}
		}
		return self;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}
		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		// prevent tabbing out of modal dialogs
		if (options.modal) {
			uiDialog.bind('keypress.ui-dialog', function(event) {
				if (event.keyCode !== $.ui.keyCode.TAB) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		// if we already have a button pane, remove it
		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				// can't use .attr( props, true ) with jQuery 1.3.2.
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}
		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui){
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			//.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			//handling of deprecated beforeclose (vs beforeClose) option
			//Ticket #4669 http://dev.jqueryui.com/ticket/4669
			//TODO: remove in 1.9pre
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				// ensure that we always pass a string
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				// currently resizable, changing handles
				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				// currently non-resizable, becoming resizable
				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.16",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		return $(document).height() + 'px';
	},

	width: function() {
		return $(document).width() + 'px';
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));
},{}],22:[function(require,module,exports){
require("./canvas.js");
require("./editors_tabs.js");
require("./erase_trace.js");
require("./human_language.js");
require("./memorize_world.js");
require("./onclick.js");
require("./pause.js");
require("./programming_mode.js");
require("./reload.js");
require("./reverse_step.js");
require("./robot_model.js");
require("./run.js");
require("./select_world_change.js");
require("./step.js");
require("./stop.js");
require("./toggle_highlight.js");
require("./toggle_watch.js");

},{"./canvas.js":23,"./editors_tabs.js":24,"./erase_trace.js":25,"./human_language.js":26,"./memorize_world.js":27,"./onclick.js":28,"./pause.js":29,"./programming_mode.js":30,"./reload.js":31,"./reverse_step.js":32,"./robot_model.js":33,"./run.js":34,"./select_world_change.js":35,"./step.js":36,"./stop.js":37,"./toggle_highlight.js":38,"./toggle_watch.js":39}],23:[function(require,module,exports){
require("./../rur.js");

$("#robot-canvas").mousemove(function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
    handleMouseMove(evt);
});
$("#robot-canvas").on("click", function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
}); // mouse clicks also requested in world_editor.js (at bottom)

/* tooltip intended to provide information about objects carried by robot */
var tooltip = {};
tooltip.canvas = document.getElementById("tooltip");
tooltip.ctx = tooltip.canvas.getContext("2d");

function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.CURRENT_WORLD;
    x = evt.pageX - $("#robot-canvas").offset().left;
    y = evt.pageY - $("#robot-canvas").offset().top;
    position = RUR.calculate_grid_position();
    tooltip.canvas.style.left = "-200px";
    if (!tooltip.mouse_contained) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.start_positions === undefined) {
                robot.start_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.start_positions.length; j++){
                pos = robot.start_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        tooltip.canvas.style.left = x+20 + "px";
        tooltip.canvas.style.top = y + "px";
        tooltip.ctx.clearRect(0, 0, tooltip.canvas.width, tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.OBJECTS[objects_carried[i]].image;
            if (image === undefined) {
                image = RUR.OBJECTS[objects_carried[i]]["image0"];
            }
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite" || nb_obj == Infinity) {
                nb_obj = "∞";
            }
            tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
}

RUR.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

    tooltip.mouse_contained = true;
    if (x < 1 ) {
        x = 1;
        tooltip.mouse_contained = false;
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
        tooltip.mouse_contained = false;
    }
    if (y < 1 ) {
        y = 1;
        tooltip.mouse_contained = false;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
        tooltip.mouse_contained = false;
    }
    return [x, y];
};

},{"./../rur.js":51}],24:[function(require,module,exports){
require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
    heightStyle: "content",
    activate: function(event, ui){
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
});

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

$("#editor-panel").resizable({
    resize: function() {
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
}).draggable({cursor: "move", handle: "ul"});


$("#editor-tab").on("click", function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
});


$("#library-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});

},{"./../../lang/msg.js":87,"./../create_editors.js":5}],25:[function(require,module,exports){
require("./../constants.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("erase-trace", "ERASE TRACE");
record_id("erase-trace-text", "ERASE TRACE EXPLAIN");
// Make it a method of RUR so that it could be called from a user's program.
RUR.erase_trace = function(){
    "use strict";
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};

},{"./../../lang/msg.js":87,"./../constants.js":3}],26:[function(require,module,exports){
require("./../state.js");
require("./../../lang/reeborg_en.js");
require("./../../lang/reeborg_fr.js");
require("./../custom_world_select.js");
var msg = require("./../../lang/msg.js");
var update_url = require("./../utils/parseuri.js").update_url;

msg.record_id("human-language");
msg.record_id("mixed-language-info");

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}

function update_translations(lang) {
    $("#mixed-language-info").show();
    switch(lang) {
        case "en":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
        case "fr":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_fr();
            $("#mixed-language-info").hide();
            break;
        case "en-fr":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_fr();
            break;
        case "fr-en":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_en();
            break;
        case "ko-en":
            RUR.translation = RUR.ui_ko;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            break;
        default:
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
    }
    $("#mixed-language-info").html(RUR.translate(lang));
}

function update_commands (lang) {
    switch(lang) {
        case "fr":
        case "en-fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "en":
        case "fr-en":
        case "ko-en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}

function update_home_url (lang) {
    switch(lang) {
        case "fr":
        case "fr-en":
            $("#logo").prop("href", "index_fr.html");
            break;
        case "en":
        case "en-fr":
            $("#logo").prop("href", "index_en.html");
            break;
        default:
            $("#logo").prop("href", "index_en.html");
    }
}

$("#human-language").change(function() {
    var lang = $(this).val();
    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    update_home_url(lang);
    RUR.make_default_menu(lang);
    RUR.blockly.init();

    if (RUR.state.programming_language == "python") {
        $("#editor-tab").html(RUR.translate("Python Code"));
    } else {
        $("#editor-tab").html(RUR.translate("Javascript Code"));
    }

    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("human-language change: can not re/start repl", e);
        }
    }
    localStorage.setItem("human_language", lang);
    update_url();
});

},{"./../../lang/msg.js":87,"./../../lang/reeborg_en.js":88,"./../../lang/reeborg_fr.js":89,"./../custom_world_select.js":6,"./../state.js":54,"./../utils/parseuri.js":63}],27:[function(require,module,exports){

require("./../state.js");
require("./../storage.js");
var record_id = require("./../../lang/msg.js").record_id;
var clone_world = require("./../world/clone_world.js").clone_world;

var memorize_button = document.getElementById("memorize-world");
record_id("memorize-world", "Save world in browser");

memorize_world = function () {
    var existing_names, i, key, response;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    dialog.dialog("open");
};
memorize_button.addEventListener("click", memorize_world, false);

dialog = $("#dialog-save-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            save_world();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});

dialog.find("form").on("submit", function( event ) {
    event.preventDefault();
    save_world();
});

save_world = function () {
    RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
    RUR.storage._save_world($("#world-name").val().trim());
    RUR._SAVED_WORLD = clone_world();
    dialog.dialog("close");
    $('#delete-world').show();
};

},{"./../../lang/msg.js":87,"./../state.js":54,"./../storage.js":55,"./../world/clone_world.js":68}],28:[function(require,module,exports){
/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../world.js");
require("./../state.js");
require("./../create_editors.js");
require("./../blockly.js");

var export_world = require("./../world/export_world.js").export_world;
var record_id = require("./../../lang/msg.js").record_id;

function remove_fileInput_listener () {
    // see http://stackoverflow.com/a/19470348
    var el = document.getElementById('fileInput'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

function load_file (obj) {
    remove_fileInput_listener();
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            obj.setValue(reader.result);
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
}


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$("#load-world").on("click", function(evt) {
    remove_fileInput_listener();
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                RUR.world.import_world(reader.result);
                RUR.storage.save_world(file.name);
            } catch (e) {  // jshint ignore:line
                console.log("invalid world", e);
                RUR.show_feedback("#Reeborg-shouts",
                                     RUR.translate("Invalid world file."));
            }
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
});

record_id("save-blockly-btn", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");
$("#save-blockly-btn").on("click", function (evt) {
    var xml, blob = new Blob([RUR.blockly.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename.xml"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-editor-btn", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
$("#save-editor-btn").on("click", function (evt) {
    var blob = new Blob([editor.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-library-btn", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
$("#save-library-btn").on("click", function (evt) {
    var blob = new Blob([library.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");
$("#save-world").on("click", function (evt) {
    RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
    var blob = new Blob([export_world()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename.json", true); // saveAs defined in src/libraries/filesaver.js
});

record_id("load-blockly-btn", "LOAD BLOCKLY");
record_id("load-blockly-text", "LOAD BLOCKLY EXPLAIN");
$("#load-blockly-btn").on("click", function (evt) {
    load_file(RUR.blockly);
});

record_id("load-editor-btn", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
$("#load-editor-btn").on("click", function (evt) {
    load_file(editor);
});

record_id("load-library-btn", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");
$("#load-library-btn").on("click", function (evt) {
    load_file(library);
});


function toggle_content (name, obj) {
    record_id("add-" + name + "-to-world-btn");
    record_id("add-" + name + "-ok");
    record_id("add-" + name + "-not-ok");
    $("#add-" + name + "-to-world-btn").on("click", function(evt) {
        if ($(this).hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            RUR.CURRENT_WORLD[name] = obj.getValue();
        } else {
            $("#add-" + name + "-ok").hide();
            $("#add-" + name + "-not-ok").show();
            delete RUR.CURRENT_WORLD[name];
        }
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("active-element");
    });
}

record_id("add-content-to-world", "ADD CONTENT TO WORLD");
record_id("add-blockly-text", "ADD BLOCKLY TEXT");
toggle_content("blockly", RUR.blockly);

record_id("add-editor-text", "ADD EDITOR TEXT");
toggle_content("editor", editor);

record_id("add-library-text", "ADD LIBRARY TEXT");
toggle_content("library", library);

record_id("add-pre-text", "ADD PRE TEXT");
toggle_content("pre", pre_code_editor);

record_id("add-post-text", "ADD POST TEXT");
toggle_content("post", post_code_editor);

record_id("add-description-text", "ADD DESCRIPTION TEXT");
toggle_content("description", description_editor);

record_id("add-onload-text", "ADD ONLOAD TEXT");
toggle_content("onload", onload_editor);

},{"./../../lang/msg.js":87,"./../blockly.js":1,"./../create_editors.js":5,"./../state.js":54,"./../translator.js":56,"./../world.js":67,"./../world/export_world.js":70}],29:[function(require,module,exports){
require("./../state.js");
;
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var pause_button = document.getElementById("step");
record_id("pause");

RUR.pause = function (ms) {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
    }
};
pause_button.addEventListener("click", pause, false);

},{"./../../lang/msg.js":87,"./../playback/play.js":43,"./../state.js":54}],30:[function(require,module,exports){
require("./../state.js");
require("./../listeners/reload.js");
require("./../keyboard.js");
require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;
var update_url = require("./../utils/parseuri.js").update_url;

record_id("programming-mode");

/** @function onload_set_programming_mode
 * @memberof RUR
 * @instance
 * @summary This function MUST be called from an onload editor. It is used
 *          to specify which of three mode must be used for a given world.
 *          This should only be required if the world contains some content to
 *          be run (either as blocks, in the editor, or in the pre- or post- code stage.)
 *
 * @desc Cette fonction doit être invoquée **uniquement** à partir de l'éditeur "onload".
 *       Son but est de changer le mode de programmation devant être utilisé pour un
 *       monde particulier.  Ceci ne devrait être requis que si le monde en question contient
 *       du code prédéfini (dans l'éditeur, sous forme de blocs, ou dans l'éditeur pre- ou post-.)
 *
 * @param {string} mode  One of "python", "javascript", or "blokcly" <br>
 *                            _Un de trois choix possibles : "python", "javascript", or "blokcly"_
 *
 * @example
 * // shows how to switch mode to Blockly, where some blocks are already placed.
 * World("/worlds/examples/square_blockly.json", "Square")
 */

RUR.onload_set_programming_mode = function(mode) {
    //TODO: Document this function
    //
    //
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_mode should only be called from the 'onload' World component.");
        return;
    }
    /* First determine if any change is needed */
    switch (mode) {
        case "python":
        case "javascript":
            if (RUR.state.input_method == mode) {
                return;
            }
            break;
        case "blockly":
            if (RUR.state.input_method == "blockly-js" ||
                RUR.state.input_method == "blockly-py") {
                return;
            }
            break;
        default:
            alert(mode + " is not allowed; only 'python', 'javascript' and 'blockly' are allowed.");
            return;
    }

    /* When a world is imported from a program using World() or Monde(),
       and the onload editor contains a call to RUR.set_programming_mode,
       it is useful to delay its execution so that any error thrown
       (e.g. info about changed world) be handled properly by the language
       used to run the original program.
     */
    setTimeout( function() {
        switch (mode) {
            case "python":
            case "javascript":
                break;
            case "blockly":
                if (RUR.state.programming_language === "javascript") {
                    mode = "blockly-js";
                } else {
                    mode = "blockly-py";
                }
                break;
            default:
                alert("Unrecognized mode in RUR.set_programming_mode" + mode);
        }
        $("#programming-mode").val(mode);
        $("#programming-mode").change();
    }, 300);
};

$("#programming-mode").change(function() {
    "use strict";
    var choice = $(this).val();
    RUR.state.input_method = choice;
    localStorage.setItem("programming-mode", choice);
    hide_everything();

    switch(choice) {
        case "python":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");            
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            console.log("Problem? Default value used in programming-mode select.");
    }
    RUR.kbd.set_programming_language(RUR.state.programming_language);
    update_url();
});


record_id("editor-visible-input");
$('#editor-visible-input').change(function() {
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
});


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    $("#editor-visible-label").hide();
    $("#editor-visible-input").hide();
    if ($("#special-keyboard-button").hasClass("active-element")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
    try{
        $("#kbd-undo").hide();
        $("#kbd-redo").hide();
    } catch(e) {}

}

function show_blockly () {
    var style_enable = {"pointer-events": "auto", "opacity": 1};
    $("#save-blockly-btn").removeAttr("disabled");
    $(".blocklyToolboxDiv").css(style_enable);
    $("#blockly-wrapper").css(style_enable);
    // $("#blockly-wrapper").show();
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    var style_disable = {"pointer-events": "none", "opacity": 0.01};
    $("#save-blockly-btn").attr("disabled", "true");
    $(".blocklyToolboxDiv").css(style_disable);
    $("#blockly-wrapper").css(style_disable);
    // $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else {
        show_javascript_editor();
    }
    $("#save-editor-btn").removeAttr("disabled");
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    $("#special-keyboard-button").show();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
    }
}

function show_javascript_editor () {
    editor.setOption("mode", "javascript");
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_python_editor () {
    editor.setOption("mode", {name: "python", version: 3});
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    $("#save-editor-btn").attr("disabled", "true");
    $("#save-library-btn").attr("disabled", "true");
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-tab").parent().hide();
    $("#post-code-tab").parent().hide();
    $("#description-tab").parent().hide();
    $("#onload-editor-tab").parent().hide();
}

function show_console() {
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    $("#special-keyboard-button").show();
    $("#py-console").show();
    $("#stop").hide();
    $("#pause").hide();
    $("#run").hide();
    $("#step").hide();
    $("#reverse-step").hide();
    $("#reload").hide();
    $("#reload2").show();
    $("#reload2").removeAttr("disabled");
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure", e);
        console.log("Will try again in 500ms.");
        window.setTimeout(_start_repl, 500);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}

/* Ensure that CodeMirror editors are set up properly
   even if not to be used initially
*/
show_editor("python");
// see start_session.js for initialization.

},{"./../../lang/msg.js":87,"./../create_editors.js":5,"./../keyboard.js":20,"./../listeners/reload.js":31,"./../state.js":54,"./../utils/parseuri.js":63}],31:[function(require,module,exports){

require("./../state.js");
var set_ready_to_run = require("./../ui/set_ready_to_run.js").set_ready_to_run;
var rec_reset = require("./../recorder/reset.js").reset;
var reset_world = require("./../world_set/reset_world.js").reset_world;
var record_id = require("./../../lang/msg.js").record_id;

var reload_button = document.getElementById("reload");
record_id("reload");
var reload2_button = document.getElementById("reload2");
record_id("reload2");

RUR.reload = function() {
    set_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
    RUR.state.code_evaluated = false;
    RUR.state.sound_on = false;
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch-variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    reset_world();
    rec_reset();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};

reload_button.addEventListener("click", RUR.reload, false);
reload2_button.addEventListener("click", RUR.reload2, false);

},{"./../../lang/msg.js":87,"./../recorder/reset.js":48,"./../state.js":54,"./../ui/set_ready_to_run.js":58,"./../world_set/reset_world.js":81}],32:[function(require,module,exports){
require("./../state.js");
require("./../recorder.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("reverse-step");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
$("#reverse-step").on("click", function (evt) {
    reverse_step();
});

reverse_step = function () {
    RUR.current_frame_no -= 2;
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.rec.display_frame();
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};

},{"./../../lang/msg.js":87,"./../recorder.js":46,"./../state.js":54}],33:[function(require,module,exports){
require("./../visible_robot.js");

require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model(0);
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model(1);
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model(2);
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model(3);
});

},{"./../../lang/msg.js":87,"./../state.js":54,"./../visible_robot.js":65}],34:[function(require,module,exports){
;
require("./../state.js");
require("./reload.js");
require("./../runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var run_button = document.getElementById("run");
record_id("run");

function run () {
    if (RUR.state.stop_called){
        RUR.state.stop_called = false;
        RUR.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
}
run_button.addEventListener("click", run, false);

},{"./../../lang/msg.js":87,"./../playback/play.js":43,"./../runner.js":50,"./../state.js":54,"./reload.js":31}],35:[function(require,module,exports){
require("./../file_io.js");
require("./../storage.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");

$("#select-world").change(function() {
    if (RUR.state.creating_menu){
        return;
    }
    if ($(this).val() !== null) {
        RUR.file_io.load_world_file($(this).val());
    }
    try {
        localStorage.setItem("world", $(this).find(':selected').text());
    } catch (e) {}
});

},{"./../../lang/msg.js":87,"./../file_io.js":17,"./../storage.js":55}],36:[function(require,module,exports){

require("./../state.js");
require("./reload.js");
require("./../runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var step_button = document.getElementById("step");
record_id("step");

step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
step_button.addEventListener("click", step, false);

},{"./../../lang/msg.js":87,"./../playback/play.js":43,"./../runner.js":50,"./../state.js":54,"./reload.js":31}],37:[function(require,module,exports){

require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var stop_button = document.getElementById("stop");
record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.state.stop_called = true;
};
stop_button.addEventListener("click", RUR.stop, false);

},{"./../../lang/msg.js":87,"./../state.js":54}],38:[function(require,module,exports){
;
require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var highlight_button = document.getElementById("highlight");
record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("active-element");
        $("#highlight").removeClass("blue-gradient");
    }
};
highlight_button.addEventListener("click", RUR.toggle_highlight, false);

},{"./../../lang/msg.js":87,"./../state.js":54}],39:[function(require,module,exports){
;
require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var watch_button = document.getElementById("watch-variables-btn");
record_id("watch-variables-btn");

toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch-variables-btn").addClass("blue-gradient");
        $("#watch-variables-btn").removeClass("active-element");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch-variables-btn").addClass("active-element");
        $("#watch-variables-btn").removeClass("blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};
watch_button.addEventListener("click", toggle_watch_variables, false);

},{"./../../lang/msg.js":87,"./../state.js":54}],40:[function(require,module,exports){
require("./rur.js");
require("./extend/add_object_type.js");

var obj;

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_object_type({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("orange");
_add_object_type("daisy");
_add_object_type("tulip");

_add_object_type("box");
RUR.OBJECTS.box.name = "box";
RUR.OBJECTS.box.pushable = true;
RUR.OBJECTS.box.in_water = "bridge";
RUR.OBJECTS.box.ctx = RUR.ROBOT_CTX;

obj = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": ['/src/images/beeper_goal.png',
    '/src/images/beeper1.png',
             '/src/images/beeper2.png',
             '/src/images/beeper3.png'],
    "goal": {'url': '/src/images/beeper_goal.png'}
};
RUR.add_object_type(obj);


RUR.OBSTACLES = {};
RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.OBSTACLES;
    obj[name] = {};
    if (nickname === undefined) {
        obj[name].name = name;
    } else {
        obj[name].name = nickname;
        obj[name].fatal = true;
        obj[name].solid = true;
        obj[name].detectable = true;
    }
    obj[name].ctx = RUR.OBSTACLES_CTX;
    obj[name].image = new Image();
    if (!url) {
        obj[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        obj[name].image.src = url;
    }
    obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
    RUR.KNOWN_OBSTACLES.push(name);
};

RUR.add_new_solid_object_type("bridge");
RUR.OBSTACLES.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.OBSTACLES.fence_right.message = "I hit a fence!";
RUR.OBSTACLES.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.OBSTACLES.fence4 = RUR.OBSTACLES.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.OBSTACLES.fence_left.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_left.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence5 = RUR.OBSTACLES.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.OBSTACLES.fence_double.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_double.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence6 = RUR.OBSTACLES.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.OBSTACLES.fence_vertical.message = RUR.OBSTACLES.fence_right.message;
RUR.OBSTACLES.fence_vertical.info = RUR.OBSTACLES.fence_right.info;
RUR.OBSTACLES.fence7 = RUR.OBSTACLES.fence_vertical;  // compatibility with old worlds

},{"./extend/add_object_type.js":14,"./rur.js":51}],41:[function(require,module,exports){


require("./recorder.js");
require("./state.js");

RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, append) {
    if (append) {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg, "append": true});
    } else {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.record_frame("watch_variables", {"element": "#watch-variables", "message": arg});
};


RUR.output.view_source_js = function(fn) {
    $("#Reeborg-explores").dialog("open");
    RUR.show_feedback("#Reeborg-explores", "<pre class='view_source'>" + fn + "</pre>" );
    $('.view_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};

},{"./recorder.js":46,"./state.js":54}],42:[function(require,module,exports){

require("./state.js");
require("./storage.js");
require("./world.js");
require("./translator.js");
require("./listeners/programming_mode.js");
require("./utils/parseuri.js");
require("./create_editors.js");

var export_world = require("./world/export_world.js").export_world;
var record_id = require("./../lang/msg.js").record_id;

record_id("save-permalink", "Save");
record_id("save-permalink-text", "Save permalink explanation");
$("#save-permalink").on("click", function (evt) {
    var blob = new Blob([RUR.permalink.__create()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

/* IMPORTANT: we attempt to maintain compatibility with the old permalinks
   format below.
 */

RUR.permalink = {};

RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.state.programming_language + "-" + RUR.state.human_language;
    world = encodeURIComponent(export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.state.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


record_id("permalink", "PERMALINK");
$("#permalink").on("click", function (evt) {
    RUR.permalink.create();
});
RUR.permalink.create = function () {
    var permalink = RUR.permalink.__create();

    $("#url-input-textarea").val(permalink);
    $("#url-input").toggle();
    return false;
};

RUR.permalink.set_mode = function (url_query) {
    "use strict";
    var mode;
    if (url_query.queryKey.mode !== undefined) {
        mode = url_query.queryKey.mode;
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.startsWith("python")) {
            mode = "python";
        } else {
            mode = "javascript";
        }
    } else if (localStorage.getItem("programming-mode")) {
        mode = localStorage.getItem("programming-mode");
    } else {
        mode = 'python';
    }

    document.getElementById('programming-mode').value = mode;
    $("#programming-mode").change();
    return mode;
};

RUR.permalink.set_language = function (url_query) {
    "use strict";
    var lang;
    if (url_query.queryKey.lang !== undefined) {
        lang = url_query.queryKey.lang;
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.endsWith("fr")) {
            lang = "fr";
        } else {
            lang = 'en';
        }
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};


RUR.permalink.update = function (arg, shortname) {
    "use strict";
    var url_query, mode, name, tmp;

	if (RUR.permalink_update_previous_arg === undefined) {
		RUR.permalink_update_previous_arg = arg;
	} else if (RUR.permalink_update_previous_arg === arg) {
		return;
	} else {
		RUR.permalink_update_previous_arg = arg;
	}

    if (arg !== undefined) {
        url_query = parseUri(arg);
    } else {
        url_query = parseUri($("#url-input-textarea").val());
    }

    RUR.permalink.set_language(url_query);
    RUR.permalink.set_mode(url_query);

    if ( url_query.queryKey.editor !== undefined) { // old permalink
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }
    if (RUR.state.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {  // old permalink
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }
    /* The world can contain some content for the editor and the library which
       would potentially replace what's defined in the permalink.
     */
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
    }

    $("#url-input").hide();
    $("#permalink").removeClass('active-element');
    $("#permalink").addClass('blue-gradient');
};

record_id("replace-permalink", "REPLACE PERMALINK");
record_id("replace-permalink-text", "REPLACE PERMALINK EXPLAIN");
$("#replace-permalink").on("click", function (evt) {
    RUR.permalink.update();
});

record_id("cancel-permalink", "CANCEL");
$("#cancel-permalink").on("click", function (evt) {
    $('#url-input').hide();
    $("#permalink").removeClass('active-element');
    $("#permalink").addClass('blue-gradient');
});

// copy to clipboard
record_id("copy-permalink", "COPY");
record_id("copy-permalink-text", "COPY PERMALINK EXPLAIN");
$("#copy-permalink").on("click", function (evt) {
    document.querySelector('#url-input-textarea').select();
    document.execCommand('copy');
});

// for embedding in iframe
addEventListener("message", receiveMessage, false);
function receiveMessage(event){
    RUR.permalink.update(event.data);
}

},{"./../lang/msg.js":87,"./create_editors.js":5,"./listeners/programming_mode.js":30,"./state.js":54,"./storage.js":55,"./translator.js":56,"./utils/parseuri.js":63,"./world.js":67,"./world/export_world.js":70}],43:[function(require,module,exports){
require("./../state.js");
require("./../listeners/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.visible_world.running
        RUR.state.playback = false;
        return;
    }
    RUR.state.playback = true;
    loop();
};

function loop () {
    "use strict";
    var frame_info;

    if (!RUR.state.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.stop();
        return;
    }
    RUR._TIMER = setTimeout(loop, RUR.playback_delay);
}

},{"./../listeners/stop.js":37,"./../state.js":54}],44:[function(require,module,exports){

RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
};

},{}],45:[function(require,module,exports){

require("./../visible_world.js");
require("./../exceptions.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {
    RUR.vis_world.refresh();
    // TODO: confirm that watching variables work.
    if (name !== undefined && name == "print_html") {
        if (obj.append){
            $(obj.element).append(obj.message);
        } else {
            $(obj.element).html(obj.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }
};

},{"./../exceptions.js":13,"./../visible_world.js":66}],46:[function(require,module,exports){

require("./state.js");
require("./visible_world.js");
require("./world_get.js");
require("./constants.js");
require("./translator.js");
require("./exceptions.js");
require("./listeners/pause.js");
require("./listeners/stop.js");
require("./playback/play_sound.js");
require("./create_editors.js");

var identical = require("./utils/identical.js").identical;
var clone_world = require("./world/clone_world.js").clone_world;

RUR.rec = {};

RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_line_no = lineno;
    if (frame) {
        RUR.record_frame("highlight");
        return true;
    }
};

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status, i, next_frame_line_numbers;

    if (RUR.current_frame_no >= RUR.nb_frames) {
        return RUR.rec.conclude();
    }

    //track line number and highlight line to be executed
    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        try {
            for (i = 0; i < RUR.rec_previous_lines.length; i++){
                editor.removeLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
            }
        }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        if (RUR.rec_line_numbers [RUR.current_frame_no+1] !== undefined){
            next_frame_line_numbers = RUR.rec_line_numbers [RUR.current_frame_no+1];
            for(i = 0; i < next_frame_line_numbers.length; i++){
                editor.addLineClass(next_frame_line_numbers[i], 'background', 'editor-highlight');
            }
            i = next_frame_line_numbers.length - 1;
            if (RUR._max_lineno_highlighted < next_frame_line_numbers[i]) {
                RUR._max_lineno_highlighted = next_frame_line_numbers[i];
            }
            RUR.rec_previous_lines = RUR.rec_line_numbers [RUR.current_frame_no+1];
        } else {
            try {  // try adding back to capture last line of program
                for (i=0; i < RUR.rec_previous_lines.length; i++){
                    editor.addLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
                }
            }catch (e) {console.log("diagnostic: error was raised while trying to addLineClass", e);}
        }
    }

    frame = RUR.frames[RUR.current_frame_no];
    RUR.current_frame_no++;

    if (frame === undefined){
        //RUR.CURRENT_WORLD = RUR._SAVED_WORLD;  // useful when ...
        RUR.vis_world.refresh();                    // ... reversing step
        return;
    }

    if (RUR.__debug && frame.debug) {
        console.log("debug: ", frame.debug);
    }

    // many of these are exlusive of others ... but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses.


    if (frame.delay !== undefined){
        RUR.playback_delay = frame.delay;
    }

    if (frame.pause) {
        RUR.pause(frame.pause.pause_time);
        return "pause";
    }

    if (frame.error !== undefined) {

        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.CURRENT_WORLD = frame.world;
    if (frame.sound_id !== undefined){
        RUR._play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.nb_frames > 0) {
        frame = RUR.frames[RUR.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world = clone_world();
    }
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#error-sound");
            }
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#success-sound");
        }
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else if (frame.error.name == "ReeborgOK") {
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             frame.error.message +
                             "</p>");
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#error-sound");
        }
        RUR.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.CURRENT_WORLD;
    if (frame.world.goal === undefined){
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.objects !== undefined) {
        result = identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};

// A sneaky programmer could teleport a robot on a forbidden tile
// to perform an action; we catch any such potential problem here
RUR.rec.check_robots_on_tiles = function(frame){
    var tile, robots, robot, coords;
    if (frame.world.robots === undefined){
        return;
    }
    for (robot=0; robot < frame.world.robots.length; robot++){
        tile = RUR.world_get.tile_at_position(frame.world.robots[robot]);
        if (tile) {
            if (tile.fatal){
                throw new RUR.ReeborgError(RUR.translate(tile.message));
            }
        }
    }
};

},{"./constants.js":3,"./create_editors.js":5,"./exceptions.js":13,"./listeners/pause.js":29,"./listeners/stop.js":37,"./playback/play_sound.js":44,"./state.js":54,"./translator.js":56,"./utils/identical.js":61,"./visible_world.js":66,"./world/clone_world.js":68,"./world_get.js":73}],47:[function(require,module,exports){

require("./../state.js");
require("./reset.js");
require("./../exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var clone_world = require("./../world/clone_world.js").clone_world;

RUR.record_frame = function (name, obj) {
    "use strict";
    var frame = {};
    if (RUR.state.do_not_record) {
        return;
    }
    if (RUR.state.prevent_playback){  // TODO see if this can be replaced by do_not_record
        return;
    }

    /* if the REPL is active, we do not record anything, and show immediately
       the updated world */
    if (RUR.state.input_method==="py-repl") {
        return RUR._show_immediate(name, obj);
    }

    // Wathched variables are appended to previous frame so as to avoid
    // generating too many extra frames.
    if (name == "watch_variables" && RUR.nb_frames >= 1) {
        RUR.frames[RUR.nb_frames-1]["watch_variables"] = obj;
        return;
    }

    frame.world = clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.playback_delay;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }

   if (RUR.state.programming_language === "python" && RUR.state.highlight) {
       if (RUR.current_line_no !== undefined) {
           if (RUR.nb_frames >= 1){
               if (name=="highlight" &&
                   RUR.current_line_no == RUR.rec_line_numbers [RUR.nb_frames-1]) {
                    // no change: do not include any extra frame
                   return;
               }
           }
           RUR.rec_line_numbers [RUR.nb_frames] = RUR.current_line_no;
       } else{
           RUR.rec_line_numbers [RUR.nb_frames] = [0];
       }
   }

    RUR.previous_lineno = RUR.current_line_no;

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;

    RUR.state.sound_id = undefined;
    if (name === "error"){
        return;
    }

    // catch any robot that teleported itself to a forbidden tile
    // to try to do a sneaky action
    RUR.rec.check_robots_on_tiles(frame);
    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};

},{"./../exceptions.js":13,"./../playback/show_immediate.js":45,"./../state.js":54,"./../utils/supplant.js":64,"./../world/clone_world.js":68,"./reset.js":48}],48:[function(require,module,exports){
require("./../state.js");
require("./../create_editors.js");

exports.reset = reset = function() {
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    RUR.current_line_no = undefined;
    RUR.frames = [];
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.playback_delay = 300;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR._TIMER);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec_previous_lines = [];
    RUR._max_lineno_highlighted = 0;
};

reset();
RUR._reset = reset; // for automated testing

},{"./../create_editors.js":5,"./../state.js":54}],49:[function(require,module,exports){

require("./constants.js");
require("./translator.js");
require("./exceptions.js");
var filterInt = require("./utils/filterint.js").filterInt;

RUR.robot = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:  /*TODO: see if we can get rid of this
                                            and have incoming in English */
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    return robot;
};

RUR.robot.cleanup_objects = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" ||
                 robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
            }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }
};

},{"./constants.js":3,"./exceptions.js":13,"./translator.js":56,"./utils/filterint.js":60}],50:[function(require,module,exports){

require("./rur.js");
require("./translator.js");
require("./visible_world.js");
require("./world.js");
require("./state.js");
require("./blockly.js");
require("./recorder.js");
require("./world_init.js");
require("./create_editors.js");
require("./utils/supplant.js");
var clone_world = require("./world/clone_world.js").clone_world;

RUR.runner = {};

/* A user program is evaluated when the user clicks on "run" or "step" for
   the first time and the result is stored in a series of frames.
   The playback is then done automatically (clicking on "run") or can be done
   frame by frame (clicking on "step").  When clicking on "step" repeatedly,
   we do not need to evaluate the program again, but simply to show a frame
   recorded.  The RUR.state.code_evaluated flag is used to determine if we
   only need to show a frame already recorded, or if we need to evaluate the
   program.
 */

RUR.state.code_evaluated = false;

RUR.runner.run = function (playback) {
    "use strict";
    var fatal_error_found = false, xml, xml_text;
    if (RUR.state.editing_world && !RUR.state.code_evaluated) {
        RUR._SAVED_WORLD = clone_world(RUR.CURRENT_WORLD);
    }
    if (!RUR.state.code_evaluated) {
        RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
        RUR.world_init.set();
        if (RUR.state.input_method === "blockly-py") {
            editor.setValue(Blockly.Python.workspaceToCode(RUR.blockly.workspace));
        } else if (RUR.state.input_method === "blockly-js") {
            editor.setValue(Blockly.JavaScript.workspaceToCode(RUR.blockly.workspace));
        }
        if (RUR.state.input_method === "blockly-py" ||
            RUR.state.input_method === "blockly-js") {
                xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
                xml_text = Blockly.Xml.domToText(xml);
                localStorage.setItem("blockly", xml_text);
        }
        fatal_error_found = RUR.runner.eval(editor.getValue()); // jshint ignore:line
    }
    if (!fatal_error_found) {
        // save program so that it a new browser session can use it as
        // starting point.
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (RUR.state.prevent_playback) {
            return;
        }
        playback();
    }
};

/* RUR.runner.eval returns true if a fatal error is found, false otherwise */
RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message, response, other_info, from_python, error;
    other_info = '';

    /* At some point around version 3.2.0, Brython changed the way it
       handled uncaught errors, and no longer pass a "nice" object
       to the surrounding Javascript environment - since this is not
       the way Brython programmers normally do things.   While this
       has been changed back some time after version 3.2.3, we nonetheless
       guard against any future changes by doing our own handling. */

    RUR.__python_error = false;
    try {
        if (RUR.state.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.state.programming_language === "python") {
            RUR.runner.eval_python(src);
            // This is the error handling referenced in the above comment.
            if (RUR.__python_error) {
                throw RUR.__python_error;
            }
        } else {
            alert("FATAL ERROR: Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        RUR.state.code_evaluated = true;
        if (RUR.__debug){
            console.dir(e);
        }
        error = {};
        if (e.reeborg_concludes !== undefined) {  // indicates success
            error.message = e.reeborg_concludes;
            error.name = "ReeborgOK";
            if (RUR.state.prevent_playback) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
            } else {
                RUR.record_frame("error", error);
            }
            return false; // since success, not a fatal error.
        }
        if (RUR.state.programming_language === "python") {
            error.reeborg_shouts = e.reeborg_shouts;
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error_name = response.error_name;
            error.message = "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>';
        } else {
            error_name = e.name;
            message = e.message;
            other_info = '';
            if (e.reeborg_shouts !== undefined) {
                error.message = e.reeborg_shouts;
                error.reeborg_shouts = e.reeborg_shouts;
            }
        }

        if (e.reeborg_shouts !== undefined){
            RUR.record_frame("error", error);
        } else {
            RUR.show_feedback("#Reeborg-shouts",
                                    "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>');
            return true;
        }
    }
    RUR.state.code_evaluated = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    var pre_code, post_code;
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    RUR.reset_definitions();
    src = pre_code + "\n" + src + "\n" + post_code;
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code, post_code, highlight;
    RUR.reset_definitions();
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    translate_python(src, RUR.state.highlight, RUR.state.watch_vars, pre_code, post_code);
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {
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
            case "Internal Javascript error: TypeError":
                error_name = "Invalid Python Code";
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        if (e.__name__ === undefined) {
            error_name = "ReeborgError";
        } else {
            error_name = e.__name__;
        }
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

},{"./blockly.js":1,"./create_editors.js":5,"./recorder.js":46,"./rur.js":51,"./state.js":54,"./translator.js":56,"./utils/supplant.js":64,"./visible_world.js":66,"./world.js":67,"./world/clone_world.js":68,"./world_init.js":74}],51:[function(require,module,exports){
/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {}; // RUR could be already be defined in the html file

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
try {
    RUR._BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
} catch(e) {  // for testing, window.location... is not defined.
    RUR._BASE_URL = '';
}
RUR.INCREMENT_LOADED_FN = function () {
    RUR._NB_IMAGES_LOADED += 1;
};

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};

},{}],52:[function(require,module,exports){
require("./state.js");
require("./visible_world.js");
require("./visible_robot.js");


function everything_loaded () {
    var loaded, total_images, py_modules=0;
    if (RUR._NB_IMAGES_LOADED == RUR._NB_IMAGES_TO_LOAD &&
        RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images &&
        RUR._NB_IMAGES_LOADED !== undefined){
        RUR.vis_world.draw_all();
        $("#splash-screen").hide();
    } else {
        // loaded = RUR._NB_IMAGES_LOADED + RUR.vis_robot.loaded_images;
        // total_images = RUR._NB_IMAGES_TO_LOAD + RUR.vis_robot.nb_images;
        // $("#splash-text").html("Images: " + loaded + "/" + total_images);
        requestAnimationFrame(everything_loaded);
    }
}
everything_loaded();

},{"./state.js":54,"./visible_robot.js":65,"./visible_world.js":66}],53:[function(require,module,exports){

/* Requiring the following just to get things started */
require("./listeners/add_listeners.js");
require("./splash_screen.js");
/* --- */

require("./init/tiles.js");

require("./utils/parseuri.js");
require("./world/import_world.js");
require("./storage.js");
require("./state.js");
require("./permalink.js");
require("./create_editors.js");

//
brython({debug:1, pythonpath:[RUR._BASE_URL + '/src/python']});
if (__BRYTHON__.__MAGIC__ != "3.2.7") {
    alert("Expecting Brython version 3.2.7 and got " + __BRYTHON__.__MAGIC__);
}

/* Once everything is loaded, we need to decide which UI to show.
   The priority is determined by:

   1. information encoded in the URL.
   2. any previously saved state.
   3. site defaults
*/
function start_session () {
    "use strict";
    var mode, url_query = parseUri(window.location.href);
    RUR.state.session_initialized = false;
    RUR.permalink.set_language(url_query);
    mode = RUR.permalink.set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_editor();
    set_library();
    // The world can include some content for the editor and/or the library, and/or the blocks
    set_world(url_query);
    RUR.state.session_initialized = true;
}
start_session();

function restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
    }
}

function set_editor() {
    "use strict";
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    }
}

function set_world(url_query) {
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        RUR.storage.save_world(RUR.translate("PERMALINK"));
    } else if (localStorage.getItem("world")) {
        try {
            RUR.world_select.set_url(
                RUR.world_select.url_from_shortname(
                    localStorage.getItem("world"))
                );
        } catch (e) {
            RUR.world_select.set_default();
        }
    } else {
        RUR.world_select.set_default();
    }
}

},{"./create_editors.js":5,"./init/tiles.js":19,"./listeners/add_listeners.js":22,"./permalink.js":42,"./splash_screen.js":52,"./state.js":54,"./storage.js":55,"./utils/parseuri.js":63,"./world/import_world.js":71}],54:[function(require,module,exports){
/* Yes, I know, global variables are a terrible thing.
   And, in a sense, the following are global variables recording a given
   state.  However, by using this convention and documentating them in a
   single place, it helps in avoiding the creation of inconsistent states.*/

require("./rur.js");
require("./translator.js");

RUR.state = {};
RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "python";
RUR.state.evaluating_onload = false;
RUR.state.programming_language = "python";
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.session_initialized = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;

RUR.state.changed_cells = [];


// TODO: create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.

},{"./rur.js":51,"./translator.js":56}],55:[function(require,module,exports){

require("./rur.js");
require("./translator.js");
require("./world_select.js");


var export_world = require("./world/export_world.js").export_world;
var clone_world = require("./world/clone_world.js").clone_world;


RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, export_world(RUR.CURRENT_WORLD));
    } else {
        RUR.storage.save_world(name);
    }
    RUR._SAVED_WORLD = clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    localStorage.setItem(url, export_world(RUR.CURRENT_WORLD));
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.
    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(
            RUR.world_select.url_from_shortname(
                localStorage.getItem("world"))
            );
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

},{"./rur.js":51,"./translator.js":56,"./world/clone_world.js":68,"./world/export_world.js":70,"./world_select.js":75}],56:[function(require,module,exports){
require("./rur.js");
require("./../lang/ui_en.js");
require("./../lang/ui_fr.js");
require("./../lang/ui_ko.js");

require("./../lang/en.js");
require("./../lang/fr.js");
RUR.untranslated = {"en":true, "fr":true};

RUR.translation = RUR.ui_en;
RUR.translation_to_english = RUR.en_to_en;

RUR.translate = function (s) {
    if (RUR.untranslated[s]) {
        return s;
    } else if (RUR.translation !== undefined && RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        console.log("Translation needed for");
        console.log("%c" + s, "color:blue;font-weight:bold;");
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        console.log("Translation to English needed for");
        console.log("%c" + s, "color:green;font-weight:bold;");
        return s;
    }
};

},{"./../lang/en.js":85,"./../lang/fr.js":86,"./../lang/ui_en.js":90,"./../lang/ui_fr.js":91,"./../lang/ui_ko.js":92,"./rur.js":51}],57:[function(require,module,exports){

require("./../rur.js");

exports.toggle = function () {
    if ("robots" in RUR.CURRENT_WORLD &&
        RUR.CURRENT_WORLD.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

},{"./../rur.js":51}],58:[function(require,module,exports){

require("./../state.js");

exports.set_ready_to_run = set_ready_to_run = function () {
    RUR.state.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
};

set_ready_to_run();

},{"./../state.js":54}],59:[function(require,module,exports){
;
// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax

// will modify a global object - no need to export anything.
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

},{}],60:[function(require,module,exports){
/* filterInt adapted from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
*/

exports.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return undefined;
};

},{}],61:[function(require,module,exports){
/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js

    Modified to assume that order of arrays is irrelevant
    (which it should be since this is meant to be used to
    compare worlds.)  Also adapted to ignore empty objects
    when doing comparison; for worlds, only non-empty objects
    are meaningful and can be compared.
*/

exports.identical = identical = function (a, b) {

    function sort(object) {
        if (Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        } else if (Object.keys(object).length === 0){
            return undefined;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

RUR.object_identical = identical; // for automated testing.

},{}],62:[function(require,module,exports){
require("./../rur.js");
RUR._ensure_key_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};

},{"./../rur.js":51}],63:[function(require,module,exports){
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

window.parseUri = parseUri;

exports.update_url = update_url = function () {
    /* Used to maintain information about human language used and
       input mode.
    */
    "use strict";
    var proglang, url_query, permalink;
    url_query = parseUri(window.location.href);
    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    permalink += "?lang=" + RUR.state.human_language + "&mode=" + RUR.state.input_method;
    window.history.pushState("dummy", "dummy", permalink);
};

},{}],64:[function(require,module,exports){
// adapted from http://javascript.crockford.com/remedial.html

// will modify a global object - no need to export anything.

String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

},{}],65:[function(require,module,exports){

require("./constants.js");
require("./state.js");
// TODO: RUR._BASE_URL -> need to change it to state...

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}, {}, {}];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

RUR._BASE_URL = RUR._BASE_URL || '';  // enable changing defaults for unit tests

RUR.reset_default_robot_images = function () {

    // classic
    RUR.vis_robot.images[0].robot_e_img = new Image();
    RUR.vis_robot.images[0].robot_e_img.src = RUR._BASE_URL + '/src/images/robot_e.png';
    RUR.vis_robot.images[0].robot_n_img = new Image();
    RUR.vis_robot.images[0].robot_n_img.src = RUR._BASE_URL + '/src/images/robot_n.png';
    RUR.vis_robot.images[0].robot_w_img = new Image();
    RUR.vis_robot.images[0].robot_w_img.src = RUR._BASE_URL + '/src/images/robot_w.png';
    RUR.vis_robot.images[0].robot_s_img = new Image();
    RUR.vis_robot.images[0].robot_s_img.src = RUR._BASE_URL + '/src/images/robot_s.png';
    RUR.vis_robot.images[0].robot_random_img = new Image();
    RUR.vis_robot.images[0].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';
    // rover type
    RUR.vis_robot.images[1].robot_e_img = new Image();
    RUR.vis_robot.images[1].robot_e_img.src = RUR._BASE_URL + '/src/images/rover_e.png';
    RUR.vis_robot.images[1].robot_n_img = new Image();
    RUR.vis_robot.images[1].robot_n_img.src = RUR._BASE_URL + '/src/images/rover_n.png';
    RUR.vis_robot.images[1].robot_w_img = new Image();
    RUR.vis_robot.images[1].robot_w_img.src = RUR._BASE_URL + '/src/images/rover_w.png';
    RUR.vis_robot.images[1].robot_s_img = new Image();
    RUR.vis_robot.images[1].robot_s_img.src = RUR._BASE_URL + '/src/images/rover_s.png';
    RUR.vis_robot.images[1].robot_random_img = new Image();
    RUR.vis_robot.images[1].robot_random_img.src = RUR._BASE_URL + '/src/images/rover_random.png';

    // 3d red type
    RUR.vis_robot.images[2].robot_e_img = new Image();
    RUR.vis_robot.images[2].robot_e_img.src = RUR._BASE_URL + '/src/images/plain_e.png';
    RUR.vis_robot.images[2].robot_n_img = new Image();
    RUR.vis_robot.images[2].robot_n_img.src = RUR._BASE_URL + '/src/images/plain_n.png';
    RUR.vis_robot.images[2].robot_w_img = new Image();
    RUR.vis_robot.images[2].robot_w_img.src = RUR._BASE_URL + '/src/images/plain_w.png';
    RUR.vis_robot.images[2].robot_s_img = new Image();
    RUR.vis_robot.images[2].robot_s_img.src = RUR._BASE_URL + '/src/images/plain_s.png';
    RUR.vis_robot.images[2].robot_random_img = new Image();
    RUR.vis_robot.images[2].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';

    // solar panel type
    RUR.vis_robot.images[3].robot_e_img = new Image();
    RUR.vis_robot.images[3].robot_e_img.src = RUR._BASE_URL + '/src/images/sp_e.png';
    RUR.vis_robot.images[3].robot_n_img = new Image();
    RUR.vis_robot.images[3].robot_n_img.src = RUR._BASE_URL + '/src/images/sp_n.png';
    RUR.vis_robot.images[3].robot_w_img = new Image();
    RUR.vis_robot.images[3].robot_w_img.src = RUR._BASE_URL + '/src/images/sp_w.png';
    RUR.vis_robot.images[3].robot_s_img = new Image();
    RUR.vis_robot.images[3].robot_s_img.src = RUR._BASE_URL + '/src/images/sp_s.png';
    RUR.vis_robot.images[3].robot_random_img = new Image();
    RUR.vis_robot.images[3].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';

    $("#robot0 img").attr("src", RUR.vis_robot.images[0].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images[1].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images[2].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images[3].robot_e_img.src);
    RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));
};

RUR.vis_robot.style = 0;

RUR.select_default_robot_model = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if ( !(style ===0 || style==1 || style==2 || style==3)){
        style = 0;
    }
    RUR.vis_robot.style = style;
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.random_img = RUR.vis_robot.images[style].robot_random_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", style);
};
RUR.reset_default_robot_images();
// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.random_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;



RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (!robot) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    switch(robot._orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        case -1:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_random_img;
            } else {
                image = RUR.vis_robot.random_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace(robot);
};


RUR.vis_robot.draw_trace = function (robot) {
    "use strict";
    if (robot === undefined || robot._is_leaky === false || robot._orientation === -1) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    if (robot.trace_color !== undefined){
        ctx.strokeStyle = robot.trace_color;
    } else {
        ctx.strokeStyle = RUR.vis_robot.trace_color;
    }

    // overrides user choice for large world (small grid size)
    if(RUR.CURRENT_WORLD.small_tiles) {
        RUR.vis_robot.trace_offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        RUR.vis_robot.trace_thickness = 2;
    } else {
        RUR.vis_robot.set_trace_style(RUR.TRACE_STYLE, robot);
    }

    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";

    ctx.beginPath();
    // ensure that _prev_orientation and orientation are within bounds as these could be messed
    // up by a user program and crash the robot program with a message sent to the console and nothing else.
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice, robot){
    "use strict";
    if (choice === undefined) {
        return;
    }
    RUR.TRACE_STYLE = choice;
    if (robot !== undefined && robot.trace_style !== undefined){
        choice = robot.trace_style;
    }
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 4;
    } else if (choice === "invisible") {
        RUR.vis_robot.trace_color = "rgba(0,0,0,0)";
    } else if (choice === "default") {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style("default");

RUR.vis_robot.new_robot_images = function (images) {
    var model;
    if (images.model !== undefined) {
        switch (images.model) {
            case 0:
            case 1:
            case 2:
            case 3:
                model = images.model;
                break;
            default:
                model = 0;
        }
    } else {
        model = 0;
    }

    if (images.east !== undefined) {
        RUR.vis_robot.images[model].robot_e_img.src = images.east;
    }
    if (images.west !== undefined) {
        RUR.vis_robot.images[model].robot_w_img.src = images.west;
    }
    if (images.north !== undefined) {
        RUR.vis_robot.images[model].robot_n_img.src = images.north;
    }
    if (images.south !== undefined) {
        RUR.vis_robot.images[model].robot_s_img.src = images.south;
    }
    if (images.random !== undefined) {
        RUR.vis_robot.images[model].robot_random_img.src = images.random;
    }

    // change the image displayed in the html file.
    switch (model) {
        case 0:
            $("#robot0 img").attr("src", images.east);
            break;
        case 1:
            $("#robot1 img").attr("src", images.east);
            break;
        case 2:
            $("#robot2 img").attr("src", images.east);
            break;
        case 3:
            $("#robot3 img").attr("src", images.east);
            break;
    }

    RUR.select_default_robot_model(model);
};

},{"./constants.js":3,"./state.js":54}],66:[function(require,module,exports){
require("./translator.js");
require("./constants.js");
require("./state.js");
require("./extend/add_object_type.js");
require("./extend/add_tile_type.js");
require("./world/create_empty.js");

//TODO add overlay object (like sensor) on robot canvas.

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

RUR.vis_world.compute_world_geometry = function (cols, rows) {
    "use strict";
    var height, width, canvas;
    if (RUR.CURRENT_WORLD.small_tiles) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 4;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    if (cols !== undefined && rows !== undefined) {
        height = (rows + 1.5) * RUR.WALL_LENGTH;
        width = (cols + 1.5) * RUR.WALL_LENGTH;
        RUR.ROWS = rows;
        RUR.COLS = cols;
    } else {
        height = (RUR.ROWS + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.COLS + 1.5) * RUR.WALL_LENGTH;
    }
    RUR.CURRENT_WORLD.rows = RUR.ROWS;
    RUR.CURRENT_WORLD.cols = RUR.COLS;

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        for (canvas of RUR.CANVASES) { //jshint ignore:line
            canvas.width = width;
            canvas.height = height;
        }
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    RUR.vis_world.draw_all();
};

RUR.vis_world.draw_all = function () {
    "use strict";

    if (RUR.CURRENT_WORLD.blank_canvas) {
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TILES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBSTACLES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

        RUR.OBJECTS_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TILES_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    draw_grid_walls(RUR.BACKGROUND_CTX);
    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        draw_single_object(RUR.BACKGROUND_IMAGE, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
    }
    draw_coordinates(); // on BACKGROUND_CTX
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    var current = RUR.CURRENT_WORLD;
    // meant to be called at each step
    // does not draw background (i.e. coordinates, grid walls and possibly image)
    // does not clear trace

    // start by clearing all the relevant contexts first.
    // some objects are drown on their own contexts.
    RUR.OBSTACLES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.TILES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    if (RUR.state.editing_world) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX);
    }

    // animated images are redrawn according to their own schedule
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    draw_goal();  // on GOAL_CTX
    draw_tiles(current.tiles); // on TILES_CTX
    draw_foreground_walls(current.walls); // on OBJECTS_CTX
    draw_all_objects(current.decorative_objects);
    draw_all_objects(current.objects);  // on OBJECTS_CTX
        // draw_all_objects also called by draw_goal, and draws on GOAL_CTX
        // and, draws some objects on ROBOT_CTX

    // objects: goal is false, tile is true
    draw_all_objects(current.obstacles, false, true); // likely on RUR.OBSTACLES_CTX

    draw_robots(current.robots);  // on ROBOT_CTX
    compile_info();  // on ROBOT_CTX
    draw_info();     // on ROBOT_CTX
};

draw_coordinates = function() {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, size=RUR.WALL_LENGTH;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - size/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*size, y);
    }
    x = size/2 -5;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};

draw_grid_walls = function(ctx){
    var i, j;

    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            draw_north_wall(ctx, i, j);
            draw_east_wall(ctx, i, j);
        }
    }
};

draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.OBJECTS_CTX;


    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        draw_north_wall(ctx, i, 0);
    }
    for (j = 1; j <= RUR.ROWS; j++) {
        draw_east_wall(ctx, RUR.COLS, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        draw_north_wall(ctx, i, RUR.ROWS);
    }


    if (walls === undefined || walls == {}) {
        return;
    }

    // other walls
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_east_wall(ctx, i, j);
        }
    }
};

draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    var length=RUR.WALL_LENGTH, thick=RUR.WALL_THICKNESS;
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect(i*length, RUR.HEIGHT - (j+1)*length, length + thick, thick);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*length, RUR.HEIGHT - (j+1)*length, length + thick, thick);
};

draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    var length=RUR.WALL_LENGTH, thick=RUR.WALL_THICKNESS;
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect((i+1)*length, RUR.HEIGHT - (j+1)*length, thick, length + thick);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*length, RUR.HEIGHT - (j+1)*length, thick, length + thick);
};

draw_robots = function (robots) {
    "use strict";
    var robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        if (robots[robot].start_positions !== undefined && robots[robot].start_positions.length > 1){
            draw_robot_clones(robots[robot]);
        } else {
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        }
    }
};

draw_robot_clones = function(robot){
    "use strict";
    var i, clone;
    RUR.ROBOT_CTX.save();
    RUR.ROBOT_CTX.globalAlpha = 0.4;
    for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            RUR.vis_robot.draw(clone);
    }
    RUR.ROBOT_CTX.restore();
};

draw_goal = function () {
    "use strict";
    var goal, ctx = RUR.GOAL_CTX;

    if (RUR.CURRENT_WORLD.goal === undefined) {
        return;
    }

    goal = RUR.CURRENT_WORLD.goal;
    if (goal.position !== undefined) {
        draw_goal_position(goal, ctx);
    }
    if (goal.objects !== undefined){
        draw_all_objects(goal.objects, true);
        console.log("goal.objects", goal.objects);
    }

    if (goal.walls !== undefined){
        draw_goal_walls(goal, ctx);
    }
};

draw_goal_position = function (goal, ctx) {
    "use strict";
    var image, i, g;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.TILES[goal.position.image] !== undefined){
        image = RUR.TILES[goal.position.image].image;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
        image = RUR.TILES["green_home_tile"].image;
    }
    if (goal.possible_positions !== undefined && goal.possible_positions.length > 1){
            ctx.save();
            ctx.globalAlpha = 0.5;
            for (i=0; i < goal.possible_positions.length; i++){
                    g = goal.possible_positions[i];
                    draw_single_object(image, g[0], g[1], ctx);
            }
            ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx);
    }
};

draw_goal_walls = function (goal, ctx) {
    "use strict";
    var key, keys, i, j, k;
    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(goal.walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( goal.walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_north_wall(ctx, i, j, true);
        }
        if (goal.walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_east_wall(ctx, i, j, true);
        }
    }
};

draw_tiles = function (tiles){
    "use strict";
    var i, j, k, keys, key, image, tile, colour;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile = RUR.TILES[tiles[keys[key]]];
            if (tile === undefined) {
                colour = tiles[keys[key]];
                draw_coloured_tile(colour, i, j, RUR.TILES_CTX);
                continue;
            }
        }

        if (tile.choose_image === undefined){
            image = tile.image;
            if (image === undefined){
                console.log("problem in draw_tiles; tile =", tile);
                throw new ReeborgError("Problem in draw_tiles.");
            }
            draw_single_object(image, i, j, RUR.TILES_CTX);
        }
    }
};

draw_animated_images = function (){
    "use strict";
    var objects;

    RUR.OBJECTS_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.TILES_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    RUR.animated_images = false;
    objects = RUR.CURRENT_WORLD.tiles;
    RUR.animated_images = __draw_animated_images(objects,
                                RUR.animated_images, RUR.TILES, RUR.TILES_ANIM_CTX);
    objects = RUR.CURRENT_WORLD.objects;
    RUR.animated_images = __draw_animated_images(objects,
                                RUR.animated_images, RUR.OBJECTS, RUR.OBJECTS_ANIM_CTX);
    if (RUR.animated_images) {
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }
};

function __draw_animated_images (objects, flag, obj_ref, ctx) {
    "use strict";
    var i, j, i_j, coords, k, image, obj, obj_here, elem;
    if (objects === undefined) {
        return flag;
    }
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (typeof obj_here == "string") {  // e.g. tiles: single object at position
            obj = obj_ref[obj_here];
            if (obj === undefined) {
                continue;
            } else if (obj.choose_image !== undefined){
                _draw_single_animated(obj, coords[k], i, j, ctx);
                flag = true;
            }
        } else if (typeof obj_here == "object") { // e.g. objects: many at position
            for (elem in obj_here) {
                obj = obj_ref[elem];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    clear_single_cell(i, j, ctx);
                    _draw_single_animated(obj, coords[k], i, j, ctx);
                    flag = true;
                }
            }
        } else {
            console.log("Unknown type in __draw_animated_images");
        }
    }
    return flag;
}

function _draw_single_animated (obj, coords, i, j, ctx){
    var image;
    image = obj.choose_image(coords);
    if (image === undefined){
        console.log("problem in _draw_single_animated; obj =", obj);
        throw new ReeborgError("Problem in _draw_single_animated at" + coords);
    }
    draw_single_object(image, i, j, ctx);
}

draw_coloured_tile = function (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*size + thick/2;
    y = RUR.HEIGHT - (j+1)*size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

draw_all_objects = function (objects, goal, tile){
    "use strict";
    var i, j, image, ctx, coords, specific_object, objects_here, obj_name, grid_pos;
    if (objects === undefined) {
        return;
    }

    for (coords in objects){
        if (objects.hasOwnProperty(coords)){
            objects_here = objects[coords];
            grid_pos = coords.split(",");
            i = parseInt(grid_pos[0], 10);
            j = parseInt(grid_pos[1], 10);
            if (i <= RUR.COLS && j <= RUR.ROWS) {
                for (obj_name in objects_here){
                    if (objects_here.hasOwnProperty(obj_name)){
                        if (tile){
                            specific_object = RUR.OBSTACLES[obj_name];
                        } else {
                            specific_object = RUR.OBJECTS[obj_name];
                        }
                        if (goal) {
                            ctx = RUR.GOAL_CTX;
                            image = specific_object.goal.image;
                            console.log("goal image,", image);
                        } else if (specific_object === undefined){
                            console.log("specific_object is undefined");
                            console.log("obj_name = ", obj_name, "  tile = ", tile);
                            if (tile) {
                                console.log("RUR.OBSTACLES = ", RUR.OBSTACLES);
                            } else {
                                console.log("RUR.OBJECTS = ", RUR.OBJECTS);
                            }
                            image = undefined;
                        } else if (specific_object.ctx !== undefined){
                            ctx = specific_object.ctx;
                            image = specific_object.image;
                        } else {
                            ctx = RUR.OBJECTS_CTX;
                            image = specific_object.image;
                        }

                        if (goal) {
                            console.log("before draw_single_object, image=", image);
                            draw_single_object(image, i, j, ctx);
                        } else if (specific_object.choose_image === undefined){
                            if (image === undefined){
                                console.log("problem in draw_all_objects; obj =", specific_object);
                            }
                            draw_single_object(image, i, j, ctx);
                        }
                    }
                }
            }
        }
    }
};

draw_single_object = function (image, i, j, ctx) {
    var thick=RUR.WALL_THICKNESS/2, size=RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*size + thick;
    y = RUR.HEIGHT - (j+1)*size + thick;
    try{
       ctx.drawImage(image, x, y, size, size);
   } catch (e) {
       console.log("problem in draw_single_object", image, ctx, e);
   }
};

clear_single_cell = function (i, j, ctx) {
    var x, y, thick=RUR.WALL_THICKNESS/2, size=RUR.WALL_LENGTH;
    x = i*size + thick;
    y = RUR.HEIGHT - (j+1)*size + thick;
    ctx.clearRect(x, y, size, size);
};

compile_info = function() {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drown - if anything.
    var coords, obj, quantity;
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined) {
        compile_partial_info(RUR.CURRENT_WORLD.goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }


    if (RUR.CURRENT_WORLD.objects !== undefined) {
        compile_partial_info(RUR.CURRENT_WORLD.objects,
            RUR.vis_world.information, 'objects');
    }
};

compile_partial_info = function(objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.log("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], 'green'];
                            } else {
                                information[coords] = [obj, objects[coords][obj], 'red'];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
};

draw_info = function() {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
};

},{"./constants.js":3,"./extend/add_object_type.js":14,"./extend/add_tile_type.js":15,"./state.js":54,"./translator.js":56,"./world/create_empty.js":69}],67:[function(require,module,exports){

require("./state.js");
require("./create_editors.js");
var msg = require("./../lang/msg.js");

RUR.world = {};

function _update_from_editor(world, name, _editor) {
    if ($("#add-"+name+"-to-world-btn").hasClass("blue-gradient")) {
        delete world[name];
    } else {
        world[name] = _editor.getValue();
    }
}

RUR.world.update_from_editors = function (world) {
    _update_from_editor(world, "blockly",RUR.blockly);
    _update_from_editor(world, "editor", editor);
    _update_from_editor(world, "library", library);
    _update_from_editor(world, "pre", pre_code_editor);
    _update_from_editor(world, "post", post_code_editor);
    _update_from_editor(world, "description", description_editor);
    _update_from_editor(world, "onload", onload_editor);
    return world;
};

function show_update_editor_dialog(world, editor_name, _editor) {
    if (world[editor_name] != _editor.getValue()) {
        dialog_update_editors_from_world.dialog("open");
    }
}

function set_button (name, content_present) {
    if (content_present &&
        $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            $("#add-" + name + "-to-world-btn").removeClass("blue-gradient");
            $("#add-" + name + "-to-world-btn").addClass("active-element");
    } else if (!content_present &&
        ! $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
        $("#add-" + name + "-ok").hide();
        $("#add-" + name + "-not-ok").show();
        $("#add-" + name + "-to-world-btn").addClass("blue-gradient");
        $("#add-" + name + "-to-world-btn").removeClass("active-element");
    }
}

function _update_user_editor (world, name, ed) {
    // For blockly, editor and library, the user is given the choice to
    // update the content or to keep their own.
    if (world[name]) {
        set_button("name", true);
        $("#update-"+name+"-content").show();
        show_update_editor_dialog(world, name, ed);
    } else {
        set_button("name", false);
        $("#update-"+name+"-content").hide();
    }
}

function _update_world_editor (world, name, ed) {
    // For editors defining the world: pre, post, description, onload.
    if (world[name]) {
        set_button(name, true);
        ed.setValue(world[name]);
    } else {
        set_button(name, false);
        ed.setValue('\n');
    }
}

RUR.world.update_editors = function (world) {
    _update_user_editor(world, "blockly", RUR.blockly);
    _update_user_editor(world, "editor", editor);
    _update_user_editor(world, "library", library);

    _update_world_editor (world, "pre", pre_code_editor);
    _update_world_editor (world, "post", post_code_editor);
    _update_world_editor (world, "description", description_editor);
    _update_world_editor (world, "onload", onload_editor);
};

msg.record_id("update-blockly-content");
msg.record_id("update-blockly-content-text", "UPDATE BLOCKLY CONTENT");
msg.record_id("update-blockly-content-btn", "UPDATE BLOCKLY BUTTON");
msg.record_id("update-editor-content");
msg.record_id("update-editor-content-text", "UPDATE EDITOR CONTENT");
msg.record_id("update-editor-content-btn", "UPDATE EDITOR BUTTON");
msg.record_id("update-library-content");
msg.record_id("update-library-content-text", "UPDATE LIBRARY CONTENT");
msg.record_id("update-library-content-btn", "UPDATE LIBRARY BUTTON");
msg.record_id("dialog-update-editors-from-world");
msg.record_title("ui-dialog-title-dialog-update-editors-from-world", "Contents from World");

dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        Cancel: function() {
            dialog_update_editors_from_world.dialog("close");
        }
    }
});

$("#update-blockly-content-btn").on("click", function(evt) {
    RUR.blockly.setValue(RUR.CURRENT_WORLD.blockly);
    $("#update-blockly-content").hide();
    if  (!$("#update-editor-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-editor-content-btn").on("click", function(evt) {
    editor.setValue(RUR.CURRENT_WORLD.editor);
    $("#update-editor-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-library-content-btn").on("click", function(evt) {
    library.setValue(RUR.CURRENT_WORLD.library);
    $("#update-library-content").hide();
    if  (!$("#update-blockly-content").is(":visible") &&
         !$("#update-editor-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});

},{"./../lang/msg.js":87,"./create_editors.js":5,"./state.js":54}],68:[function(require,module,exports){

exports.clone_world = clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.CURRENT_WORLD));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};
RUR.clone_world = clone_world; // for automated testing

},{}],69:[function(require,module,exports){
require("./../constants.js");

create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    RUR.CURRENT_WORLD = world;
    return world;
};
RUR.create_empty_world = create_empty_world; // for automated tests.
RUR.CURRENT_WORLD = create_empty_world();

},{"./../constants.js":3}],70:[function(require,module,exports){

exports.export_world = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};

},{}],71:[function(require,module,exports){
require("./../translator.js");
require("./../constants.js");
require("./../robot.js");
require("./../visible_world.js");
require("./../state.js");
require("./../exceptions.js");
require("./../create_editors.js");
require("./create_empty.js");
var images_init = require("./../extend/images.js").images_init;
var edit_robot_menu = require("./../ui/edit_robot_menu.js");
var clone_world = require("./clone_world.js").clone_world;

RUR.world.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content;
    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world.import_world");
        return {};
    }
    images_init();
    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.create_empty_world();
        } catch (e) {
            alert(e);
            console.log("Exception caught in import_world.");
            console.log("json_string = ", json_string);
            console.log("error = ", e);
            RUR.create_empty_world();
            return;
        }
    } else {  // already parsed
        RUR.CURRENT_WORLD = json_string;
    }

    if (RUR.CURRENT_WORLD.robots !== undefined) {
        if (RUR.CURRENT_WORLD.robots[0] !== undefined) {
            RUR.robot.cleanup_objects(RUR.CURRENT_WORLD.robots[0]);
            body = RUR.CURRENT_WORLD.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        }
    }

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed obstacles; to ensure compatibility of
    // worlds created prior to using solid_objects, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.CURRENT_WORLD.top_tiles !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "top_tiles"));
        delete RUR.CURRENT_WORLD.top_tiles;
    }

    // Backward compatibility change done on March 28, 2016, where
    // "pre_code" and "post_code" were simplified to "pre" and "post"
    // for consistency with other editor contents.
    if (RUR.CURRENT_WORLD.pre_code !== undefined) {
        RUR.CURRENT_WORLD.pre = RUR.CURRENT_WORLD.pre_code;
        delete RUR.CURRENT_WORLD.pre_code;
    }
    if (RUR.CURRENT_WORLD.post_code !== undefined) {
        RUR.CURRENT_WORLD.post = RUR.CURRENT_WORLD.post_code;
        delete RUR.CURRENT_WORLD.post_code;
    }

    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        RUR.BACKGROUND_IMAGE.src = RUR.CURRENT_WORLD.background_image;
        RUR.BACKGROUND_IMAGE.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    RUR.world.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }

    if (RUR.CURRENT_WORLD.onload !== undefined) {
        eval_onload();
    }
    RUR._SAVED_WORLD = clone_world();

};

eval_onload = function () {
    RUR.state.evaluating_onload = true;
    try {
        eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
    } catch (e) {
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem with onload code.") + "<br><pre>" +
            RUR.CURRENT_WORLD.onload + "</pre>");
        console.log("error in onload:", e);
    }
    RUR.state.evaluating_onload = false;
    RUR.vis_world.draw_all();
};

},{"./../constants.js":3,"./../create_editors.js":5,"./../exceptions.js":13,"./../extend/images.js":16,"./../robot.js":49,"./../state.js":54,"./../translator.js":56,"./../ui/edit_robot_menu.js":57,"./../visible_world.js":66,"./clone_world.js":68,"./create_empty.js":69}],72:[function(require,module,exports){

require("./translator.js");
require("./constants.js");
require("./objects.js");
require("./robot.js");
require("./world.js");
require("./visible_world.js");
require("./exceptions.js");
require("./state.js");
require("./world_get.js");
require("./world_set.js");
require("./dialogs/create.js");
require("./listeners/canvas.js");
require("./create_editors.js");
require("./utils/supplant.js");
require("./utils/key_exist.js");

require("./world_set/add_object.js");
require("./world_set/add_goal_object.js");
require("./world_set/add_robot.js");
require("./world_set/toggle_decorative_object.js");
require("./world_set/toggle_obstacle.js");
require("./world_set/give_object_to_robot.js");


var edit_robot_menu = require("./ui/edit_robot_menu.js");
var dialog_add_object = require("./dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./dialogs/select_colour.js").dialog_select_colour;


var filterInt = require("./utils/filterint.js").filterInt;
var identical = require("./utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.__give_to_robot = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root, x, y, position;
    split = RUR.we.edit_world_flag.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                RUR.we.place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects) {
                position = RUR.calculate_grid_position();
                x = position[0];
                y = position[1];
                RUR.toggle_decorative_object_at_position(value, x, y);
            } else {
                RUR.we._add_object(value);
            }
            break;
        case "tile":
            RUR.we.toggle_tile(value);
            break;
        case "solid_object":
            RUR.we.toggle_obstacle(value);
            break;
        case "world":
            if (value == "walls") {
                RUR.we._toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                RUR.we.toggle_goal_wall();
            } else {
                RUR.we._add_goal_objects(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

RUR.we.alert_1 = function (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
};
RUR.we.alert_2 = function (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
};

RUR.we.select = function (choice) {
    "use strict";
    var value, split, root;
    RUR.we.edit_world_flag = choice;
    split = choice.split("-");
    root = split[0];
    value = split[1];
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    switch (root) {
        case "robot":
            switch (value) {
            case "place":
                RUR.we.alert_1("Click on world to move robot.");
                break;
            case "add":
                RUR.we.alert_1("Added robot.");
                RUR._add_robot();
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                RUR.we.alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.__give_to_robot = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                RUR.we.alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects = true;
            $("#edit-world-objects").show();
            RUR.we.__give_to_robot = false;
            RUR.we.alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects = false;
                $("#edit-world-objects").show();
                $(".not-for-robot").show();  // box
                RUR.we.__give_to_robot = false;
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "walls":
                RUR.we.alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.__give_to_robot) {
                $(".not-for-robot").hide();
                RUR.we._give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                if (RUR.we.decorative_objects) {
                    $(".not-for-robot").show();
                }
                if (value == "box"){
                    RUR.we.alert_2("Click on world to add single object.", value);
                } else {
                    RUR.we.alert_2("Click on world to add object.", value);
                }
            }
            break;
        case "tile":
            $("#edit-tile").show();
            RUR.we.alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            RUR.we.fill_with_tile(value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            RUR.we.alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            RUR.we.alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                RUR.we.alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                RUR.we.alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                RUR.we.alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                if (value == "box"){
                RUR.we.alert_2("Click on world to set number of single goal objects.", value);
                } else {
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
                }
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
                break;
            }
        break;
        case "set":
            RUR.world_set.dialog_set_dimensions.dialog('open');
            break;
    }
};

RUR.we.toggle_editing_mode = function () {
    if (RUR.state.editing_world) {  // done editing
        $("#pre-code-tab").parent().hide();
        $("#post-code-tab").parent().hide();
        $("#description-tab").parent().hide();
        $("#onload-editor-tab").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        $("#editor-tab").trigger('click');
    } else {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
    RUR.vis_world.draw_all();
};

record_id("edit-world", "EDIT WORLD");
record_id("edit-world-text", "EDIT WORLD EXPLAIN");
RUR.create_and_activate_dialogs( $("#edit-world"), $("#edit-world-panel"),
                                 {}, function () {RUR.we.toggle_editing_mode();
                                     $("#more-menus").dialog("minimize"); });




RUR.we.place_robot = function () {
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false;
    position = RUR.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.start_positions){
                robot.start_positions = [[robot.x, robot.y]];
            }
        } else {
            RUR._add_robot();
            robot = world.robots[0];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot.start_positions = [[robot.x, robot.y]];
            return;
        }
    }

    for (var i=0; i < robot.start_positions.length; i++){
        pos = robot.start_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
        } else {
            arr.push(pos);
            robot.x = pos[0];
            robot.y = pos[1];
        }
    }
    if (!present){
        arr.push(position);
        robot.x = position[0];
        robot.y = position[1];
    }

    if (arr.length===0){
        RUR.CURRENT_WORLD.robots = [];
        edit_robot_menu.toggle();
        return;
    }

    robot.start_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
};


RUR.we._give_objects_to_robot = function (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
};

RUR.we.turn_robot = function (orientation) {

    RUR.CURRENT_WORLD.robots[0]._orientation = orientation;
    RUR.CURRENT_WORLD.robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

RUR.we.calculate_wall_position = function () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    y = RUR.BACKGROUND_CANVAS.height - y;  // count from bottom

    x /= RUR.WALL_LENGTH;
    y /= RUR.WALL_LENGTH;
    remain_x = x - Math.floor(x);
    remain_y = y - Math.floor(y);

    // del_  denotes the distance to the closest wall
    if (Math.abs(1.0 - remain_x) < remain_x) {
        del_x = Math.abs(1.0 - remain_x);
    } else {
        del_x = remain_x;
    }

    if (Math.abs(1.0 - remain_y) < remain_y) {
        del_y = Math.abs(1.0 - remain_y);
    } else {
        del_y = remain_y;
    }

    x = Math.floor(x);
    y = Math.floor(y);

    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y < 0.5) {
            y -= 1;
        }
    }

    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
    }

    return [x, y, orientation];
};

RUR.we._toggle_wall = function () {
    var position, x, y, orientation;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    RUR.we.toggle_wall(x, y, orientation);
};

/** @function toggle_wall
 * @memberof RUR
 * @instance
 * @summary TODO  This needs to be documented
 *
 * @desc Ceci doit être documenté
 *
 */

RUR.we.toggle_wall = function (x, y, orientation) {
    var coords, index;
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "walls");
    if (RUR.CURRENT_WORLD.walls[coords] === undefined){
        RUR.CURRENT_WORLD.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.walls[coords].splice(index, 1);
            if (RUR.CURRENT_WORLD.walls[coords].length === 0){
                delete RUR.CURRENT_WORLD.walls[coords];
            }
        }
    }
};


/** @function toggle_goal_wall
 * @memberof RUR
 * @instance
 * @summary TODO This needs to be refactored and documented
 *
 * @desc Ceci doit être documenté
 *
 */


RUR.we.toggle_goal_wall = function () {
    var position, response, x, y, orientation, coords, index;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "walls");
    if (RUR.CURRENT_WORLD.goal.walls[coords] === undefined){
        RUR.CURRENT_WORLD.goal.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.goal.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.goal.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.goal.walls[coords].splice(index, 1);
            if (Object.keys(RUR.CURRENT_WORLD.goal.walls[coords]).length === 0){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
                if (Object.keys(RUR.CURRENT_WORLD.goal.walls).length === 0) {
                    delete RUR.CURRENT_WORLD.goal.walls;
                    if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
                        delete RUR.CURRENT_WORLD.goal;
                    }
                }
            }
        }
    }
};

RUR.we._add_object = function (specific_object){
    "use strict";
    var position, x, y, query, tmp;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.objects !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y] !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y]["box"] == 1){  // jshint ignore:line
            RUR.add_object_at_position("box", x, y, 0);
        } else {
            RUR.add_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
};

RUR.we._add_goal_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    // TODO investigate potential bug; should toggle if box ...
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.goal !== undefined &&
            RUR.CURRENT_WORLD.goal.objects !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords] !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords].box ==1){
                RUR.add_goal_object_at_position("box", x, y, 0);
        } else {
            RUR.add_goal_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    dialog_goal_object.dialog("open");
};

/** @function set_goal_position
 * @memberof RUR
 * @instance
 * @summary TODO This needs to be refactored and documented
 *
 * @desc Ceci doit être documenté
 *
 */


RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR._ensure_key_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_positions === undefined) {
        RUR._ensure_key_exists(goal, "possible_positions");
        if (goal.position !== undefined) {
            goal.possible_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR._ensure_key_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_positions.length; i++) {
        pos = goal.possible_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
            break;
        } else {
            arr.push(pos);
            goal.position.x = pos[0];
            goal.position.y = pos[1];
        }
    }

    if (!present){
        arr.push(position);
        goal.position.x = position[0];
        goal.position.y = position[1];
    }
    goal.possible_positions = arr;

    if (arr.length === 0) {
        delete RUR.CURRENT_WORLD.goal.position;
        delete RUR.CURRENT_WORLD.goal.possible_positions;
        if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
            delete RUR.CURRENT_WORLD.goal;
        }
        $("#edit-world-turn").hide();
    }
};

RUR.we.toggle_tile = function (tile){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position, coords, index;

    if (!tile) {  // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined ||
        RUR.CURRENT_WORLD.tiles[coords] != tile){
        RUR.CURRENT_WORLD.tiles[coords] = tile;
    } else {
        delete RUR.CURRENT_WORLD.tiles[coords];
    }
};

RUR.we.fill_with_tile = function (tile) {
    var x, y, coords;

    if (!tile) {    // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    for (x = 1; x <= RUR.COLS; x++) {
        for (y = 1; y <= RUR.ROWS; y++) {
            coords = x + "," + y;
            RUR.CURRENT_WORLD.tiles[coords] = tile;
        }
    }
    RUR.vis_world.refresh_world_edited();
    $("#cmd-result").html("");
};


RUR.we.toggle_obstacle = function (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    RUR.toggle_obstacle_at_position(obj, x, y);


    // if (RUR.world_get.obstacles_at_position(x, y)[obj] !== undefined) {
    //     RUR.world_set.add_solid_object(obj, x, y, 0);
    // } else {
    //     RUR.world_set.add_solid_object(obj, x, y, 1);
    // }
};


// mouse clicks also requested in listeners/canvas.js
$("#robot-canvas").on("click", function (evt) {
    if (RUR.state.editing_world && RUR.we.edit_world_flag !== undefined) {
        RUR.we.edit_world();
    }
    RUR.world_get.world_info();
});

},{"./constants.js":3,"./create_editors.js":5,"./dialogs/add_object.js":7,"./dialogs/create.js":8,"./dialogs/give_object.js":9,"./dialogs/goal_object.js":10,"./dialogs/select_colour.js":11,"./dialogs/set_background_image.js":12,"./exceptions.js":13,"./listeners/canvas.js":23,"./objects.js":40,"./robot.js":49,"./state.js":54,"./translator.js":56,"./ui/edit_robot_menu.js":57,"./utils/filterint.js":60,"./utils/identical.js":61,"./utils/key_exist.js":62,"./utils/supplant.js":64,"./visible_world.js":66,"./world.js":67,"./world_get.js":73,"./world_set.js":76,"./world_set/add_goal_object.js":77,"./world_set/add_object.js":78,"./world_set/add_robot.js":79,"./world_set/give_object_to_robot.js":80,"./world_set/toggle_decorative_object.js":83,"./world_set/toggle_obstacle.js":84}],73:[function(require,module,exports){
/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./objects.js");
require("./dialogs/create.js");
require("./listeners/canvas.js");
require("./utils/supplant.js");

RUR.world_get = {};

RUR.world_get.is_wall_at = function (coords, orientation) {
    if (RUR.CURRENT_WORLD.walls === undefined) {
        return false;
    }
    if (RUR.CURRENT_WORLD.walls[coords] !== undefined){
        if (RUR.CURRENT_WORLD.walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
    }
    return false;
};


RUR.world_get.tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.CURRENT_WORLD.tiles === undefined) return false;
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined) return false;
    return RUR.TILES[RUR.CURRENT_WORLD.tiles[coords]];
};

RUR.world_get.pushable_object_at_position = function(x, y) {
    "use strict";
    var objects_here, obj_here, obj_type, coords = x + ',' + y;
    if (RUR.CURRENT_WORLD.objects === undefined) return false;
    if (RUR.CURRENT_WORLD.objects[coords] === undefined) return false;
    objects_here = RUR.CURRENT_WORLD.objects[coords];

    for (obj_type in objects_here) {
        if (objects_here.hasOwnProperty(obj_type)) {
            if (RUR.OBJECTS[obj_type].pushable) {
                return obj_type;
            }
        }
    }
    return false;
};

RUR.world_get.obstacles_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.CURRENT_WORLD.obstacles === undefined) return false;
    if (RUR.CURRENT_WORLD.obstacles[coords] === undefined) return false;
    return RUR.CURRENT_WORLD.obstacles[coords];
};

RUR.world_get.object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.objects);
};

RUR.world_get.decorative_object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.decorative_objects);
};


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.CURRENT_WORLD.objects or RUR.CURRENT_WORLD.decorative_objects
    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (object_type === undefined ||
        object_type[coords] === undefined) {
        return [];
    }

    obj_here =  object_type[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
}

RUR.world_get.world_map = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};

RUR.world_get.world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in zz_dr_onclick.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;

    information = "";

    if (RUR.CURRENT_WORLD.description) {
        information +="<b>" + RUR.translate("Description") + "</b><br>" + RUR.CURRENT_WORLD.description + "<hr>";
    }

    if (!no_grid) {
        position = RUR.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information += "x = " + x + ", y = " + y;
        }
    }

    tile = RUR.world_get.tile_at_position(x, y);
    topic = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            if (topic){
                topic = false;
                information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
            }
            information += "<br>" + RUR.translate(tile.info);
        }
    }

    tiles = RUR.world_get.obstacles_at_position(x, y);
    if (tiles) {
        for (tilename in tiles) {
            tile = RUR.OBSTACLES[tilename];
            if (RUR.translate(tile.info)){
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
                }
                if (tile.name == "fence") {
                    if (!fence_noted) {
                        fence_noted = true;
                        information += "<br>" + RUR.translate(tile.info);
                    }
                } else {
                    information +=  "<br>" + RUR.translate(tile.info);
                }
            }
        }
    }

    obj = RUR.CURRENT_WORLD.objects;
    topic = true;
    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Objects found here:") + "</b>";
                    }
               information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
            }
        }
    }

    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined){
        obj = goals.objects;
        topic = true;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
                    }
                   information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                }
            }
        }
    }


    if (goals !== undefined){
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built east of this location.");
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built north of this location.");
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built west of this location.");
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built south of this location.");
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    robots = RUR.CURRENT_WORLD.robots;
    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.start_positions !== undefined && robot.start_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }


    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined &&
         (goals.possible_positions !== undefined || goals.position !== undefined)){
        if (topic){
            topic = false;
            information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
        }
        if (goals.possible_positions !== undefined && goals.possible_positions.length > 2) {
            information += "<br>" + RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += "<br>" + RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    $("#World-info").html(information);
};

RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:300, width:600}, RUR.world_get.world_info);

},{"./dialogs/create.js":8,"./listeners/canvas.js":23,"./objects.js":40,"./utils/supplant.js":64}],74:[function(require,module,exports){

require("./visible_world.js");
require("./constants.js");

RUR.world_init = {};

// Returns a random integer between min and max (both included)
randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// assigns initial values
RUR.world_init.set = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.CURRENT_WORLD.objects !== undefined){
        objects = RUR.CURRENT_WORLD.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(RUR.CURRENT_WORLD.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined){
        objects = RUR.CURRENT_WORLD.goal.objects;
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
                if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.CURRENT_WORLD.robots !== undefined && RUR.CURRENT_WORLD.robots.length == 1){
        robot = RUR.CURRENT_WORLD.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot._orientation == -1){
            RUR.CURRENT_WORLD.robots[0]._orientation = randint(0, 3);
            RUR.CURRENT_WORLD.robots[0]._prev_orientation = RUR.CURRENT_WORLD.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions.length > 1) {
        goal = RUR.CURRENT_WORLD.goal;
        position = goal.possible_positions[randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    RUR.vis_world.refresh();
};

},{"./constants.js":3,"./visible_world.js":66}],75:[function(require,module,exports){

/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.

    The world menu is currently an html select element with
    id = select-world.  Doing a global search for "#select-world" should
    only find items in this file.
*/

RUR.world_select = {};

RUR.world_select.empty_menu = function () {
    $("#select-world").html('');
};

RUR.world_select.set_default = function () {
    document.getElementById("select-world").selectedIndex = 0;
    $("#select-world").change();
};

RUR.world_select.set_url = function (url) {
    $('#select-world').val(url);
    $("#select-world").change();
};

RUR.world_select.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select-world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_select.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    shortname = shortname.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].text.toLowerCase() === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_select.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_select.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = arg.shortname;
    } else {
        shortname = url;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_select.replace_shortname(url, shortname)) {
        $('#select-world').append( $(option_elt).val(url).html(shortname));
    }
};

},{}],76:[function(require,module,exports){
/* In some ways, this is the counterpart of world_get.js
*/

require("./objects.js");
require("./exceptions.js");
require("./visible_world.js");
require("./recorder.js"); // TODO: investigate if needed.
require("./utils/key_exist.js");

var msg = require("./../lang/msg.js");

RUR.world_set = {};

var set_dimension_form;

//TODO: move add_solid_object to world_set folder
RUR.world_set.add_solid_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "obstacles");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.obstacles, coords);

    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}

    if (nb === 0) {
        delete RUR.CURRENT_WORLD.obstacles[coords][specific_object];
        if (Object.keys(RUR.CURRENT_WORLD.obstacles[coords]).length === 0){
            delete RUR.CURRENT_WORLD.obstacles[coords];
        }
        if (Object.keys(RUR.CURRENT_WORLD.obstacles).length === 0){
            delete RUR.CURRENT_WORLD.obstacles;
        }
    } else {
        RUR.CURRENT_WORLD.obstacles[coords][specific_object] = nb;
    }
};



RUR.world_set.remove_all = function () {
    RUR.CURRENT_WORLD.robots = [];
    trim_world(0,0, RUR.COLS, RUR.ROWS);
};

function trim_world (min_x, min_y, max_x, max_y) {
    var x, y, coords;

    for (x = min_x+1; x <= max_x; x++) {
        for (y = 1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= max_x; x++) {
        for (y = min_y+1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.possible_positions !== undefined) {
            delete RUR.CURRENT_WORLD.goal.possible_positions;
            delete RUR.CURRENT_WORLD.goal.position;
            RUR.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
}

function remove_all_at_location (coords) {
    // trading efficiency for clarity
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        if (RUR.CURRENT_WORLD.tiles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.tiles[coords];
        }
    }
    if (RUR.CURRENT_WORLD.obstacles !== undefined) {
        if (RUR.CURRENT_WORLD.obstacles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.obstacles[coords];
        }
    }
    if (RUR.CURRENT_WORLD.objects !== undefined) {
        if (RUR.CURRENT_WORLD.objects[coords] !== undefined){
            delete RUR.CURRENT_WORLD.objects[coords];
        }
    }
    if (RUR.CURRENT_WORLD.walls !== undefined) {
        if (RUR.CURRENT_WORLD.walls[coords] !== undefined){
            delete RUR.CURRENT_WORLD.walls[coords];
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.objects !== undefined) {
            if (RUR.CURRENT_WORLD.goal.objects[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.objects[coords];
            }
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.walls !== undefined) {
            if (RUR.CURRENT_WORLD.goal.walls[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
            }
        }
    }
}

msg.record_id("dialog-set-dimensions");
msg.record_title("ui-dialog-title-dialog-set-dimensions", "Set the world's dimensions");
msg.record_id("set-dimensions-explain", "set-dimensions-explain");
msg.record_id("input-max-x-text", "Maximum x value:");
msg.record_id("input-max-y-text", "Maximum y value:");
msg.record_id("use-small-tiles-text", "Use small tiles");

RUR.world_set.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.world_set.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y;
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    RUR.CURRENT_WORLD.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
    RUR.vis_world.compute_world_geometry(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});

},{"./../lang/msg.js":87,"./exceptions.js":13,"./objects.js":40,"./recorder.js":46,"./utils/key_exist.js":62,"./visible_world.js":66}],77:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function add_goal_object
* @memberof RUR
* @instance
* @summary This function sets a specified quantity of a given object
* as a goal at a certain location.
* By "object" we mean a type of object that can be taken or put down by Reeborg.
*
* @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
* mis comme but à un endroit donné.
* Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
*
* @param {string} specific_object The name of the object type ; e.g. "token" <br>
*                        _Le nom du type de l'objet; par exemple, "jeton"._
* @param {integer} x - Position of the object
*                    <br> _position de l'objet_
* @param {integer} y - Position of the object
*                    <br> _position de l'objet_
* @param {integer} nb - Number of desired objects at that location;
*           a value of zero is used to remove any such goal set.
*           <br> _Nombre d'objets désiré à cet endroit;
*  une valeur de zéro est utilisée pour supprimer un but semblable pré-existant._
*
*/
RUR.add_goal_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "objects");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal.objects, coords);
    if (nb === 0) {
        try {
            delete RUR.CURRENT_WORLD.goal.objects[coords][specific_object];
        } catch (e) {}

        if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
            delete RUR.CURRENT_WORLD.goal.objects[coords];
            if (Object.keys(RUR.CURRENT_WORLD.goal.objects).length === 0){
                delete RUR.CURRENT_WORLD.goal.objects;
                if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0){
                    delete RUR.CURRENT_WORLD.goal;
                }
            }
        }
    } else {
        RUR.CURRENT_WORLD.goal.objects[coords][specific_object] = nb;
    }
    try {
        RUR.record_frame("debug", "add_goal_object_at_position");
    } catch (e) {}
};

},{"./../exceptions.js":13,"./../translator.js":56,"./../utils/key_exist.js":62,"./../utils/supplant.js":64}],78:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function add_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a specified quantity of a given object
 * at a certain location.
 * By "object" we mean a type of object that can be taken or put down by Reeborg.
 *
 * @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
 * mis à un endroit donné.
 * Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 *
 */

RUR.add_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "objects");
    RUR._ensure_key_exists(cw.objects, coords);
    if (nb !== 0) {
        cw.objects[coords][specific_object] = nb;
    } else {
        try {
            delete cw.objects[coords][specific_object];
        } catch (e) {}
        if (Object.keys(cw.objects[coords]).length === 0){
            delete cw.objects[coords];
        }
    }
    RUR.record_frame("debug", "add_object_at_position");
};

},{"./../exceptions.js":13,"./../translator.js":56,"./../utils/key_exist.js":62,"./../utils/supplant.js":64}],79:[function(require,module,exports){
require("./../recorder/record_frame.js");


RUR._add_robot = function (robot) {
    if (RUR.CURRENT_WORLD.robots === undefined){
        RUR.CURRENT_WORLD.robots = [];
    }
    RUR.CURRENT_WORLD.robots.push(robot);
    RUR.record_frame();
};

},{"./../recorder/record_frame.js":47}],80:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
var filterInt = require("./../utils/filterint.js").filterInt;

/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 * @desc Donne un nombre d'objet à transporter par le robot (robot.body).
 *    Si le robot n'est pas spécifié, le robot par défaut est utilisé.
 *
 * @param {string} obj The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 * @param {robot.body} robot - Optional argument
 *                    <br> _argument optionnel_
 */

RUR.give_object_to_robot = function (obj, nb, robot) {
    var _nb, translated_arg = RUR.translate_to_english(obj);

    if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = RUR.CURRENT_WORLD.robots[0];
    }
    RUR._ensure_key_exists(robot, "objects");

    _nb = filterInt(nb);
    if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};

},{"./../exceptions.js":13,"./../translator.js":56,"./../utils/filterint.js":60,"./../utils/key_exist.js":62}],81:[function(require,module,exports){
require("./../world/create_empty.js");
require("./../visible_robot.js");
require("./../visible_world.js");
var clone_world = require("./../world/clone_world.js").clone_world;

//TODO: code for evaluating onload is essentially repeated in two different
//files; it should be refactored.
//
//TODO: See if all defaults could be incorporated here, e.g. robot images, etc.

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
    RUR.vis_robot.set_trace_style("default");
    RUR.reset_default_robot_images();
    RUR.MAX_STEPS = 1000;
    RUR.ANIMATION_TIME = 120;
    if (RUR.CURRENT_WORLD.onload) {
        RUR.state.evaluating_onload = true;
        try {
            eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
        } catch (e) {
            RUR.show_feedback("#Reeborg-shouts",
                RUR.translate("Problem with onload code.") + "<br><pre>" +
                RUR.CURRENT_WORLD.onload + "</pre>");
            console.log("error in onload:", e);
        }
        RUR.state.evaluating_onload = false;
    }
    RUR.vis_world.draw_all();
};

reset_world();

},{"./../visible_robot.js":65,"./../visible_world.js":66,"./../world/clone_world.js":68,"./../world/create_empty.js":69}],82:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../recorder/record_frame.js");

/** @function set_tile_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a given tile type at a location.
 *
 * @desc Cette fonction spécifie le type de tuile à un endroit.
 *
 * @param {string} tile The name of a tile **or** a colour recognized by HTML.
 *                      Note that rgba format for the colour has an unexpected result
 *                      since the tiles are redrawn each time so that semi-transparent
 *                      tiles will get progressively darker at each step. <br>
 *                      _Le nom d'une tuile **ou** celui d'une couleur reconnue par HTML._
 *
 * @param {integer} x  Position of the tile. <br>  _Position de la tuile_
 *
 * @param {integer} y  Position of the tile. <br>  _Position de la tuile_
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.set_tile_at_position = function (tile, x, y) {
    "use strict";
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    RUR.CURRENT_WORLD.tiles[x + "," + y] = tile;
    RUR.record_frame("debug", "set_tile_at_position");
};

},{"./../recorder/record_frame.js":47,"./../rur.js":51,"./../utils/key_exist.js":62}],83:[function(require,module,exports){
require("./../exceptions.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/supplant.js");

/** @function toggle_decorative_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or remove a given decorative object
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet décoratif à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom (anglais) du type de l'objet; par exemple, "token"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_decorative_object_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "decorative_objects");
    RUR._ensure_key_exists(cw.decorative_objects, coords);

    if (cw.decorative_objects[coords][specific_object]) {
        delete cw.decorative_objects[coords][specific_object];
        if (Object.keys(cw.decorative_objects[coords]).length === 0) {
            delete cw.decorative_objects[coords];
            if (Object.keys(cw.decorative_objects).length === 0) {
                delete cw.decorative_objects;
            }
        }
    } else {
        cw.decorative_objects[coords][specific_object] = true;
    }
};

},{"./../exceptions.js":13,"./../translator.js":56,"./../utils/key_exist.js":62,"./../utils/supplant.js":64}],84:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/supplant.js");

/** @function toggle_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or removes a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_OBSTACLES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "obstacles");
    RUR._ensure_key_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        delete cw.obstacles[coords][specific_object];
        if (Object.keys(cw.obstacles[coords]).length === 0) {
            delete cw.obstacles[coords];
            if (Object.keys(cw.obstacles).length === 0) {
                delete cw.obstacles;
            }
        }
    } else {
        cw.obstacles[coords][specific_object] = true;
    }
};

/** @function add_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction ajoute un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.add_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_OBSTACLES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "obstacles");
    RUR._ensure_key_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        RUR.output.print_html("<h2>Warning</h2><p>" +
            specific_object +
            " is already present at the requested location.</p>", true);
    } else {
        cw.obstacles[coords][specific_object] = true;
    }
};

/** @function remove_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function removes a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction enlève un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.remove_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_OBSTACLES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "obstacles");
    RUR._ensure_key_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        delete cw.obstacles[coords][specific_object];
        if (Object.keys(cw.obstacles[coords]).length === 0) {
            delete cw.obstacles[coords];
            if (Object.keys(cw.obstacles).length === 0) {
                delete cw.obstacles;
            }
        }
    } else {
        RUR.output.print_html("<h2>Warning</h2><p>" +
            specific_object +
            " is <b>not</b> present at the requested location.</p>", true);
        cw.obstacles[coords][specific_object] = true;
    }
};

},{"./../exceptions.js":13,"./../translator.js":56,"./../utils/key_exist.js":62,"./../utils/supplant.js":64}],85:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py
RUR.en = {};
RUR.en["at_goal"] = "at_goal";
RUR.en["front_is_clear"] = "front_is_clear";
RUR.en["right_is_clear"] = "right_is_clear";
RUR.en["wall_in_front"] = "wall_in_front";
RUR.en["wall_on_right"] = "wall_on_right";
RUR.en["object_here"] = "object_here";
RUR.en["carries_object"] = "carries_object";
RUR.en["is_facing_north"] = "is_facing_north";

RUR.en["move"] = "move";
RUR.en["turn_left"] = "turn_left";
RUR.en["take"] = "take";
RUR.en["put"] = "put";
RUR.en["build_wall"] = "build_wall";
RUR.en["pause"] = "pause";
RUR.en["done"] = "done";
RUR.en["think"] = "think";
RUR.en["think(100)"] = "think(100)";
RUR.en["sound"] = "sound";
RUR.en["sound(True)"] = "sound(True)";
RUR.en["sound(true)"] = "sound(true)";
RUR.en["World"] = "World";
RUR.en["UsedRobot"] = "UsedRobot";
RUR.en["new UsedRobot"] = "new UsedRobot";
RUR.en["no_highlight"] = "no_highlight";
RUR.en["write"] = "write";

RUR.en["from library import ?"] = "from library import ?";

},{}],86:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

RUR.fr = {};

RUR.ui_fr["fr-en"] = "Mode mixte: interface graphique en français; programmation en anglais.<br>" +
    "Mixed mode: User Interface in French; programming language in English.<br>";

RUR.fr["at_goal"] = "au_but";
RUR.fr["front_is_clear"] = "rien_devant";
RUR.fr["right_is_clear"] = "rien_a_droite";
RUR.fr["wall_in_front"] = "mur_devant";
RUR.fr["wall_on_right"] = "mur_a_droite";
RUR.fr["object_here"] = "objet_ici";
RUR.fr["carries_object"] = "transporte";
RUR.fr["is_facing_north"] = "est_face_au_nord";

RUR.fr["move"] = "avance";
RUR.fr["turn_left"] = "tourne_a_gauche";
RUR.fr["take"] = "prend";
RUR.fr["put"] = "depose";
RUR.fr["build_wall"] = "construit_un_mur";
RUR.fr["pause"] = "pause";
RUR.fr["done"] = "termine";
RUR.fr["think"] = "pense";
RUR.fr["think(100)"] = "pense(100)";
RUR.fr["sound"] = "son";
RUR.fr["sound(True)"] = "son(True)";
RUR.fr["sound(true)"] = "son(true)";
RUR.fr["World"] = "Monde";
RUR.fr["UsedRobot"] = "RobotUsage";
RUR.fr["new UsedRobot"] = "new RobotUsage";
RUR.fr["no_highlight"] = "pas_de_surlignement";
RUR.fr["write"] = "ecrit";

RUR.fr["from library import ?"] = "from biblio import ?";

},{}],87:[function(require,module,exports){
var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];
var _function_names = [];

__record_id = function(id){
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
};

record_id = function (id, text) {
    __record_id(id);
    if (text !== undefined) {
        _text_elements.push([id, text]);
    }
};

record_fn = function (id, text) {
    __record_id(id);
    _function_names.push([id, text]);
};
record_name = function (id, text) {
    __record_id(id);
    _elements_names.push([id, text]);
};
record_title = function (id, text) {
    __record_id(id);
    _elements_titles.push([id, text]);
};


update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_function_names.length; i++) {
        id = "#" + _function_names[i][0];
        msg = _function_names[i][1];
        $(id).html(RUR.translate(msg) + "()");
    }
    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).html(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    update_titles();
};

update_titles = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_elements_titles.length; i++) {
        id = "#" + _elements_titles[i][0];
        msg = _elements_titles[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;
exports.update_titles = update_titles;
exports.record_title = record_title;
exports.record_fn = record_fn;

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("editor-visible-label", "EDITOR VISIBLE");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");


record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
record_name("blockly-basic-commands", "BASIC COMMANDS");
record_name("blockly-defining", "DEFINING");
record_name("blockly-loops", "LOOPS");
record_name("blockly-decisions", "DECISIONS");
record_name("blockly-conditions", "CONDITIONS");
record_name("blockly-using-variables", "USING VARIABLES");
record_name("blockly-commands-var", "COMMANDS");
record_name("blockly-conditions-var", "CONDITIONS");
record_name("blockly-other", "OTHER");
record_name("blockly-objects", "OBJECTS");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("program-in-blockly-workspace", "PROGRAM IN BLOCKLY WORKSPACE");
record_id("special-execution", "SPECIAL EXECUTION");
record_id("contact", "CONTACT");
record_id("issues", "ISSUES");
record_id("help", "HELP");
record_id("forum", "FORUM");
record_id("documentation", "DOCUMENTATION");
record_id("python-help", "PYTHON HELP");
record_id("keyboard-help", "KEYBOARD HELP");

record_title("ui-dialog-title-edit-world-panel", "WORLD EDITOR");
record_id("east", "m-east");
record_id("north", "m-north");
record_id("west", "m-west");
record_id("south", "m-south");
record_id("random", "m-random");
record_id("m-dimensions", "m-dimensions");
record_id("m-add-robot", "m-add-robot");
record_id("m-robot", "m-robot");
record_id("m-position", "m-position");
record_id("m-turn", "m-turn");
record_id("m-objects", "m-objects");
record_id("m-add", "m-add");
record_id("m-walls", "m-walls");
record_id("m-objects2", "m-objects2");
record_id("m-tiles", "m-tiles");
record_id("m-fill", "m-fill");
record_id("m-solid", "m-solid");
record_id("m-decorative", "m-decorative");
record_id("m-background", "m-background");
record_id("m-goal", "m-goal");
record_id("mg-robot", "mg-robot");
record_id("mg-walls", "mg-walls");
record_id("mg-objects", "mg-objects");

record_title("ui-dialog-title-Reeborg-concludes", "Reeborg says: I'm done!");
record_title("ui-dialog-title-Reeborg-writes", "Reeborg writes:");
record_title("ui-dialog-title-Reeborg-shouts", "Reeborg shouts: Something is wrong!");
record_title("ui-dialog-title-Reeborg-explores", "Reeborg explores some Javascript code");
record_title("ui-dialog-title-Reeborg-proclaims", "Reeborg states:");
record_title("ui-dialog-title-Reeborg-watches", "Reeborg watches some variables!");
record_title("ui-dialog-title-World-info", "Click on the world to get some additional information.");

record_id("kbd-repeat-not-keyword", "<code>repeat</code> is not a true Python keyword.");

},{}],88:[function(require,module,exports){
/** Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/

window.RUR = RUR || {};

RUR.reset_definitions_en = function () {

    window.at_goal = RUR._at_goal_;
    window.build_wall = RUR._build_wall_;
    window.carries_object = RUR._carries_object_;
    window.default_robot = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.done = RUR._done_;
    window.front_is_clear = RUR._front_is_clear_;
    window.is_facing_north = RUR._is_facing_north_;
    window.move = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.object_here = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.put = RUR._put_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.right_is_clear = RUR._right_is_clear_;
    window.set_max_steps = RUR._set_max_steps_;
    window.sound = RUR._sound_;
    window.take = RUR._take_;
    window.think = RUR._think_;
    window.turn_left = RUR._turn_left_;
    window.view_source_js = RUR._view_source_js_;
    window.wall_in_front = RUR._wall_in_front_;
    window.wall_on_right = RUR._wall_on_right_;
    window.write = RUR._write_;
    window._write = RUR.__write_;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.World = RUR._World_;


    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR._add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.front_is_clear = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.put = function () {
        RUR._UR.put_(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.set_trace_color_ = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.set_trace_style_ = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.take = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.turn_left = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        RUR._UR.wall_on_right_(this.body);
    };

    // English specific and only for compatibility with rur-ple
    // do not translate the following
    window.put_beeper = put;
    window.pick_beeper = take;
    window.turn_off = done;
    window.on_beeper = object_here;
    window.next_to_a_beeper = object_here;
    window.carries_beepers = carries_object;
    window.set_delay = think;
    window.facing_north = is_facing_north;
};

},{}],89:[function(require,module,exports){
/* See reeborg_en.js */
window.RUR = RUR || {};

RUR.reset_definitions_fr = function () {

    window.au_but = RUR._at_goal_;
    window.construit_un_mur = RUR._build_wall_;
    window.transporte = RUR._carries_object_;
    window.robot_par_defaut = function () {
        var r = Object.create(RobotUsage.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.termine = RUR._done_;
    window.rien_devant = RUR._front_is_clear_;
    window.est_face_au_nord = RUR._is_facing_north_;
    window.avance = RUR._move_;

    window.mur_devant = RUR._wall_in_front_;
    window.nouvelles_images_de_robot = function (images) {
        if (images.est !== undefined) {
            images.east = images.est;
        }
        if (images.ouest !== undefined) {
            images.west = images.ouest;
        }
        if (images.sud !== undefined) {
            images.south = images.sud;
        }
        if (images.nord !== undefined) {
            images.north = images.nord;
        }
        RUR._new_robot_images_(images);
    };
    window.objet_ici = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.depose = RUR._put_;
    window.enregistrement = RUR._recording_;
    window.plus_de_robots = RUR._remove_robots_;
    window.rien_a_droite = RUR._right_is_clear_;
    window.nombre_d_instructions = RUR._set_max_steps_;
    window.son = RUR._sound_;
    window.prend = RUR._take_;
    window.pense = RUR._think_;
    window.tourne_a_gauche = RUR._turn_left_;
    window.voir_source_js = RUR._view_source_js_;
    window.mur_devant = RUR._wall_in_front_;
    window.mur_a_droite = RUR._wall_on_right_;
    window.ecrit = RUR._write_;
    window._write = RUR.__write_;
    window.MenuPersonalise = RUR._MakeCustomMenu_;
    window.Monde = RUR._World_;

    // The following are for OOP programming in Javascript
    var RobotUsage = window.RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR._add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        RUR._UR.at_goal_(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotUsage.prototype.transporte = function () {
        RUR._UR.carries_object_(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR._UR.move_(this.body);
    };

    RobotUsage.prototype.objet_ici = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    RobotUsage.prototype.depose = function () {
        RUR._UR.put_(this.body);
    };

    RobotUsage.prototype.rien_a_droite = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR.control.wall_in_front(this.body);
    };

    RobotUsage.prototype.couleur_de_trace = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotUsage.prototype.style_de_trace = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotUsage.prototype.prend = function () {
        RUR._UR.take_(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        RUR._UR.wall_on_right_(this.body);
    };

};

},{}],90:[function(require,module,exports){
RUR.ui_en = {};
RUR.en_to_en = {};

RUR.ui_en["en-fr"] = "Mixed mode: User Interface in English; programming language in French.<br>" +
    "Mode mixte: interface graphique en anglais; programmation en français.";

RUR.ui_en["SITE NAME"] = "Reeborg's World";
RUR.ui_en["WORLD INFO"] = "World Info";
RUR.ui_en["EDITOR VISIBLE"] = "Keep editor visible";

RUR.ui_en["apple"] = "apple";
RUR.en_to_en["apple"] = "apple";
RUR.ui_en["banana"] = "banana";
RUR.en_to_en["banana"] = "banana";
RUR.ui_en["beeper"] = "beeper";
RUR.en_to_en["beeper"] = "beeper";
RUR.ui_en["box"] = "box";
RUR.en_to_en["box"] = "box";
RUR.ui_en["bridge"] = "bridge";
RUR.en_to_en["bridge"] = "bridge";
RUR.ui_en["carrot"] = "carrot";
RUR.en_to_en["carrot"] = "carrot";
RUR.ui_en["daisy"] = "daisy";
RUR.en_to_en["daisy"] = "daisy";
RUR.ui_en["dandelion"] = "dandelion";
RUR.en_to_en["dandelion"] = "dandelion";
RUR.ui_en["leaf"] = "leaf";
RUR.en_to_en["leaf"] = "leaf";
RUR.ui_en["orange"] = "orange";
RUR.en_to_en["orange"] = "orange";
RUR.ui_en.square = "square";
RUR.en_to_en["square"] = "square";
RUR.ui_en.star = "star";
RUR.en_to_en["star"] = "star";
RUR.ui_en["strawberry"] = "strawberry";
RUR.en_to_en["strawberry"] = "strawberry";
RUR.ui_en.token = "token";
RUR.en_to_en["token"] = "token";
RUR.ui_en.triangle = "triangle";
RUR.en_to_en["triangle"] = "triangle";
RUR.ui_en["tulip"] = "tulip";
RUR.en_to_en["tulip"] = "tulip";

RUR.ui_en["Problem with onload code."] = "Invalid Javascript onload code; contact the creator of this world.";

RUR.ui_en["Too many steps:"] = "Too many steps: {max_steps}";
RUR.ui_en["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
RUR.ui_en["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
RUR.ui_en["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
RUR.ui_en["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
RUR.ui_en["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>All objects are at the correct location.</li>";
RUR.ui_en["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>One or more objects are not at the correct location.</li>";
RUR.ui_en["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
RUR.ui_en["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
RUR.ui_en["Last instruction completed!"] = "Last instruction completed!";
RUR.ui_en["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";

RUR.ui_en["Unknown object"] = "Unknown object: {obj}";
RUR.ui_en["No object found here"] = "No {obj} found here!";
RUR.ui_en["object"] = "object";
RUR.ui_en["I don't have any object to put down!"] = "I don't have any {obj} to put down!";
RUR.ui_en["There is already a wall here!"] = "There is already a wall here!";
RUR.ui_en["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
RUR.ui_en["Done!"] = "Done!";
RUR.ui_en["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
RUR.ui_en["There is no goal in this world!"] = "There is no goal in this world!";
RUR.ui_en["I carry too many different objects. I don't know which one to put down!"] = "I carry too many different objects. I don't know which one to put down!";
RUR.ui_en["Many objects are here; I do not know which one to take!"] = "Many different objects are here; I do not know which one to take!";

RUR.ui_en.east = "east";
RUR.ui_en.north = "north";
RUR.ui_en.west = "west";
RUR.ui_en.south = "south";
RUR.ui_en["Unknown orientation for robot."] = "Unknown orientation for robot.";

RUR.ui_en["World selected"] = "World {world} selected";
RUR.ui_en["Could not find world"] = "Could not find world {world}";
RUR.ui_en["Object names"] = " library, token, star, triangle, square, etc.";

RUR.ui_en["Invalid world file."] = "Invalid world file.";
RUR.ui_en["PERMALINK"] = "PERMALINK";
RUR.ui_en["Could not find link: "] = "Could not find link: ";

RUR.ui_en["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
RUR.ui_en["Added robot."] = "Added Reeborg.";
RUR.ui_en["Click on image to turn robot"] = "Click on image to turn Reeborg";
RUR.ui_en["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
RUR.ui_en["Click on world to add object."] = "Click on world to set number of {obj}.";
RUR.ui_en["Click on desired object below."] = "Click on desired object below.";
RUR.ui_en["Click on world to toggle walls."] = "Click on world to toggle walls.";
RUR.ui_en["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot.";
RUR.ui_en["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
RUR.ui_en["Click on desired goal object below."] = "Click on desired goal object below.";
RUR.ui_en["Click on world to set number of goal objects."] = "Click on world to set number of goal {obj}.";
RUR.ui_en["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry.";
RUR.ui_en[" is not a valid value!"] = " is not a valid value!";
RUR.ui_en["Enter number of objects desired at that location."] = "Click on world to set number {obj}.";
RUR.ui_en["Objects found here:"] = "Objects found here:";
RUR.ui_en["Description"] = "Description";
RUR.ui_en["A robot located here carries no objects."] = "A robot located at {x},{y} carries no objects.";
RUR.ui_en["Goal to achieve:"] = "Goal to achieve:";
RUR.ui_en["A robot located here carries:"] = "A robot located at {x},{y} carries:";
RUR.ui_en["random location"] = "random location";
RUR.ui_en["Enter number of objects to give to robot."] = "Enter number of {obj} to give to robot.";
RUR.ui_en["Special information about this location:"] = "Special information about this location:";
RUR.ui_en["Click on world to toggle tile."] = "Click on world to toggle {obj} tile.";
RUR.ui_en["Click on desired tile below."] = "Click on desired tile below or on the colour selector.";
RUR.ui_en["mud"] = "mud";
RUR.ui_en["water"] = "water";
RUR.ui_en["grass"] = "grass";
RUR.ui_en["gravel"] = "gravel";
RUR.ui_en["ice"] = "ice";
RUR.ui_en["A wall must be built east of this location."] = "A wall must be built east of this location.";
RUR.ui_en["A wall must be built north of this location."] = "A wall must be built north of this location.";
RUR.ui_en["A wall must be built west of this location."] = "A wall must be built west of this location.";
RUR.ui_en["A wall must be built south of this location."] = "A wall must be built south of this location.";
RUR.ui_en["The final required position of the robot will be chosen at random."] = "The final required position of the robot will be chosen at random.";
RUR.ui_en["The final position of the robot must be (x, y) = "] = "The final position of the robot must be (x, y) = ";
RUR.ui_en["Click on world to fill with given tile."] = "Click on world to fill with given tile.";
RUR.ui_en["Click on desired object below."] = "Click on desired object below.";
RUR.ui_en["Enter url of image to use as background."] = "Enter url of image to use as background.";
RUR.ui_en["Replace editor content"] = "Do you wish to replace your editor code by that provided by the creator of this world?";
RUR.ui_en["Replace library content"] = "Do you wish to replace your library code by that provided by the creator of this world?";
RUR.ui_en["colour"] = "colour";

RUR.ui_en["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
RUR.ui_en["No such world!"] = "No such world!";
RUR.ui_en["Enter world name to save"] = "Enter world name to save; names in use: ";
RUR.ui_en["Enter world name to delete"] = "Enter world name to delete; existing worlds: ";
RUR.ui_en["Delete "] = "Delete ";

RUR.ui_en["Error found at or near line {number}."] = "Error found at or near line {number}.";
RUR.ui_en["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
RUR.ui_en["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
RUR.ui_en["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";
RUR.ui_en["I cannot help you with this problem."] = "I cannot help you with this problem.";

RUR.ui_en["I'm stuck in mud."] = "I'm stuck in mud.";
RUR.ui_en["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";
RUR.ui_en["I'm slipping on ice!"] = "I'm slipping on ice!";
RUR.ui_en["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.";
RUR.ui_en["Grass: usually safe."] = "Grass: usually safe.";
RUR.ui_en["Gravel: usually safe."] = "Gravel: usually safe.";
RUR.ui_en["I'm in water!"] = "I'm in water!";
RUR.ui_en["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
RUR.ui_en["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green_home_tile: Reeborg <b>can</b> detect this tile using at_goal().";
RUR.ui_en["Crash!"] = "Crash!";
RUR.ui_en["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";
RUR.ui_en["I hit a fence!"] = "I hit a fence!";
RUR.ui_en["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.ui_en["Bridge:"] = "Bridge: ";
RUR.ui_en["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.ui_en["Something is blocking the way!"] = "Something is blocking the way!";
RUR.ui_en["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> detect this using at_goal().";
RUR.ui_en["green home tile:"] = "green home tile:";
RUR.ui_en["home:"] = "home:";
RUR.ui_en["racing flag:"] = "racing flag:";
RUR.ui_en["house:"] = "house:";

RUR.ui_en["fence_right"] = "fence";
RUR.ui_en["fence_left"] = "fence";
RUR.ui_en["fence_double"] = "fence";
RUR.ui_en["fence_vertical"] = "fence";

RUR.ui_en["Local variables"] = "Local variables";
RUR.ui_en["Global variables"] = "Global variables";
RUR.ui_en["Watched expressions"] = "Watched expressions";

RUR.ui_en["move forward"] = "move forward";
RUR.ui_en["turn left"] = "turn left";
RUR.ui_en["take object"] = "take object";
RUR.ui_en["put object"] = "put object";
RUR.ui_en["Pause the program's execution."] = "Pause the program's execution.";
RUR.ui_en["Build a wall in front of the robot."] = "Build a wall in front of the robot.";
RUR.ui_en["End the program's execution."] = "End the program's execution.";
RUR.ui_en["True if a wall is blocking the way."] = "True if a wall is blocking the way";
RUR.ui_en["True if nothing is blocking the way."] = "True if nothing is blocking the way.";
RUR.ui_en["True if desired destination."] = "True if desired destination.";
RUR.ui_en["True if robot carries at least one object."] = "True if robot carries at least one object.";
RUR.ui_en["True if there is at least one object here."] = "True if there is at least one object here.";
RUR.ui_en["True if robot is facing North."] = "True if robot is facing North.";
RUR.ui_en["Delay between actions; default is 300 ms."] = "Delay between actions; default is 300 ms.";

RUR.ui_en["Save world in browser"] = "Save world in browser";
RUR.ui_en["LOAD BLOCKLY"] = "Import program (blocks) from file";
RUR.ui_en["LOAD BLOCKLY EXPLAIN"] = "Opens a local file and use its content to replace the content of the Blockly workspace.";
RUR.ui_en["LOAD EDITOR"] = "Import program from file";
RUR.ui_en["LOAD EDITOR EXPLAIN"] = "Opens a local file and use its content to replace the content of the Code editor.";
RUR.ui_en["LOAD LIBRARY"] = "Import library from a file";
RUR.ui_en["LOAD LIBRARY EXPLAIN"] = "Opens a file and use its content to replace the current content of the Library.";
RUR.ui_en["LOAD WORLD"] = "Open world from file";
RUR.ui_en["LOAD WORLD EXPLAIN"] = "Loads a world from a file on your computer.";
RUR.ui_en["SAVE BLOCKLY"] = "Save program to file";
RUR.ui_en["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file.";
RUR.ui_en["SAVE EDITOR"] = "Save program to file";
RUR.ui_en["SAVE EDITOR EXPLAIN"] = "Saves the content of the editor in a file.";
RUR.ui_en["SAVE LIBRARY"] = "Save the library";
RUR.ui_en["SAVE LIBRARY EXPLAIN"] = "Saves the content of the library in a file.";
RUR.ui_en["SAVE WORLD"] = "Save world to file";
RUR.ui_en["SAVE WORLD EXPLAIN"] = "Saves the world (as a json object) to a file on your computer.";

RUR.ui_en["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
RUR.ui_en["ADD BLOCKLY TEXT"] = "Code blocks";
RUR.ui_en["ADD EDITOR TEXT"] = "Code in editor";
RUR.ui_en["ADD LIBRARY TEXT"] = "Library";
RUR.ui_en["ADD PRE TEXT"] = "Pre";
RUR.ui_en["ADD POST TEXT"] = "Post";
RUR.ui_en["ADD DESCRIPTION TEXT"] = "Description";
RUR.ui_en["ADD ONLOAD TEXT"] = "Onload";

RUR.ui_en["KEYBOARD BUTTON"] = "Reeborg's keyboard";
RUR.ui_en["ADDITIONAL OPTIONS"] = "Additional options";

RUR.ui_en["BASIC COMMANDS"] = "Basic commands";
RUR.ui_en["DEFINING"] = "Defining";
RUR.ui_en["LOOPS"] = "Loops";
RUR.ui_en["DECISIONS"] = "Decisions";
RUR.ui_en["CONDITIONS"] = "Conditions";
RUR.ui_en["USING VARIABLES"] = "Using variables";
RUR.ui_en["COMMANDS"] = "Commandes";
RUR.ui_en["OTHER"] = "Other";
RUR.ui_en["OBJECTS"] = "Objects";

RUR.ui_en["Python Code"] = "Python Code";
RUR.ui_en["Javascript Code"] = "Javascript Code";
RUR.ui_en["LIBRARY"] = "library";
RUR.ui_en["PRE"] = "Pre";
RUR.ui_en["POST"] = "Post";
RUR.ui_en["DESCRIPTION"] = "Desc.";
RUR.ui_en["ONLOAD"] = "Onload";

RUR.ui_en["HIGHLIGHT IMPOSSIBLE"] = "A problem with your code has caused me to turn off the code highlighting.";
RUR.ui_en["COMMAND RESULT"] = "Select action to perform from menu below.";

RUR.ui_en["COPY"] = "Copy";
RUR.ui_en["COPY PERMALINK EXPLAIN"] = "Copy the permalink to the clipboard.";
RUR.ui_en["Save"] = "Save";
RUR.ui_en["Save permalink explanation"] = "Saves a copy of the permalink to a file.";
RUR.ui_en["REPLACE PERMALINK"] = "Replace";
RUR.ui_en["REPLACE PERMALINK EXPLAIN"] = "Replace the content above by a different permalink and click on Replace";
RUR.ui_en["CANCEL"] = "Cancel";

RUR.ui_en["DELETE WORLD TEXT"] = "The following refers to worlds currently stored in your browser which you can delete:";
RUR.ui_en["PYTHON ONLY"] = "Python only";
RUR.ui_en["COLLABORATION"] = "Collaboration";
RUR.ui_en["TOGETHERJS EXPLAIN"] = "Tool which permits collaboration with one or more other user using Mozilla's TogetherJS.";
RUR.ui_en["WORLD CREATION TITLE"] = "World: creation, edition, ...";
RUR.ui_en["EDIT WORLD"] = "Edit world";
RUR.ui_en["EDIT WORLD EXPLAIN"] = "You can create your own world by editing the current one.";
RUR.ui_en["PROGRAM IN EDITOR"] = "Program in editor";
RUR.ui_en["PROGRAM IN BLOCKLY WORKSPACE"] = "Program in blockly workspace";
RUR.ui_en["SPECIAL EXECUTION"] = "Special execution features";
RUR.ui_en["REVERSE STEP EXPLAIN"] = "Reverses the previous execution step.";
RUR.ui_en["ERASE TRACE"] = "Erase trace";
RUR.ui_en["ERASE TRACE EXPLAIN"] = "Erases the trace left by Reeborg. This can be useful to focus on what happens after a program is paused.";
RUR.ui_en["CONTACT"] = "(English/French only) Email:";
RUR.ui_en["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
RUR.ui_en["FORUM"] = "Discussion forum (English/French only)";
RUR.ui_en["HELP"] = "Help";
RUR.ui_en["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank">Documentation</a>';
RUR.ui_en["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
RUR.ui_en["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

RUR.ui_en["WORLD EDITOR"] = "World editor";
RUR.ui_en["m-east"] = "East";
RUR.ui_en["m-north"] = "North";
RUR.ui_en["m-west"] = "West";
RUR.ui_en["m-south"] = "South";
RUR.ui_en["m-random"] = "Random";
RUR.ui_en["m-dimensions"] = "World dimensions";
RUR.ui_en["m-add"] = "Add";
RUR.ui_en["m-add-robot"] = "Add robot";
RUR.ui_en["m-robot"] = "Robot";
RUR.ui_en["m-position"] = "Position(s)";
RUR.ui_en["m-turn"] = "Turn";
RUR.ui_en["m-objects"] = "Objects";
RUR.ui_en["m-walls"] = "Walls";
RUR.ui_en["m-objects2"] = "Objects";
RUR.ui_en["m-tiles"] = "Tiles";
RUR.ui_en["m-fill"] = "Fill";
RUR.ui_en["m-solid"] = "Solid objects";
RUR.ui_en["m-decorative"] = "Decorative objects";
RUR.ui_en["m-background"] = "Background image";
RUR.ui_en["m-goal"] = "Goal";
RUR.ui_en["mg-robot"] = "Robot";
RUR.ui_en["mg-walls"] = "Walls";
RUR.ui_en["mg-objects"] = "Objects";

RUR.ui_en["Reeborg says: I'm done!"] = "Reeborg says: I'm done!";
RUR.ui_en["Reeborg writes:"] = "Reeborg writes:";
RUR.ui_en["Reeborg shouts: Something is wrong!"] = "Reeborg shouts: Something is wrong!";
RUR.ui_en["Reeborg explores some Javascript code"] = "Reeborg explores some Javascript code";
RUR.ui_en["Reeborg states:"] = "Reeborg states:";
RUR.ui_en["Reeborg watches some variables!"] = "Reeborg watches some variables!";
RUR.ui_en["Click on the world to get some additional information."] = "Click on the world to get some additional information.";

RUR.ui_en["Reeborg's basic keyboard"] = "Reeborg's basic keyboard";
RUR.ui_en["kbd-command-btn"] = "Commands";
RUR.ui_en["kbd-condition-btn"] = "Conditions";
RUR.ui_en["kbd-python-btn"] = "Python";
RUR.ui_en["kbd-py-console-btn"] = "Python";
RUR.ui_en["kbd-javascript-btn"] = "Javascript";
RUR.ui_en["kbd-objects-btn"] = "Objects";
RUR.ui_en["kbd-special-btn"] = "Special";

RUR.ui_en["UNDO"] = "UNDO";
RUR.ui_en["REDO"] = "REDO";
RUR.ui_en["tab"] = "TAB";
RUR.ui_en["shift-tab"] = "Shift-TAB";
RUR.ui_en["enter"] = "\u23CE";
RUR.ui_en["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> is not a true Python keyword.";

RUR.ui_en["Colour:"] = "Colour:";
RUR.ui_en["Enter a colour"] = "Enter a colour";

RUR.ui_en["Background image"] = "Background image";

RUR.ui_en["NAME:"] = "Name:";
RUR.ui_en["Save world in browser"] = "Save world in browser";

RUR.ui_en["Set the world's dimensions"] = "Set the world's dimensions";
RUR.ui_en["set-dimensions-explain"] = "If so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screen may not be able to display very large worlds.";
RUR.ui_en["Maximum x value:"] = "Maximum x value:";
RUR.ui_en["Maximum y value:"] = "Maximum y value:";
RUR.ui_en["Use small tiles"] = "Use small tiles";

RUR.ui_en["Set goal number for object"] = "Set goal number for object";
RUR.ui_en["dialog-goal-object-explain"] = "Click on the checkbox if you wish that number to be equal to the total number of such objects found in the world at the beginning.";
RUR.ui_en["Number of objects"] = "Number of objects";
RUR.ui_en["All such objects"] = "All such objects";

RUR.ui_en["Number of objects:"] = "Number of objects:";
RUR.ui_en["Maximum:"] = "Maximum:";
RUR.ui_en["Add object in the world"] = "Set number of object";
RUR.ui_en["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

RUR.ui_en["Unlimited:"] = "Unlimited:";
RUR.ui_en["Give object to robot"] = "Give object to robot";
RUR.ui_en["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

RUR.ui_en["UPDATE EDITOR CONTENT"] = "This world has some default content for the editor. To replace the current content of your editor, click on the button";
RUR.ui_en["UPDATE EDITOR BUTTON"] = "Replace editor content";
RUR.ui_en["UPDATE LIBRARY CONTENT"] = "This world has some default content for the library. To replace the current content of your library, click on the button";
RUR.ui_en["UPDATE LIBRARY BUTTON"] = "Replace library content";
RUR.ui_en["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
RUR.ui_en["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
RUR.ui_en["Contents from World"] = "Contents from World";

},{}],91:[function(require,module,exports){
RUR.ui_fr = {};
RUR.fr_to_en = {};

RUR.ui_fr["SITE NAME"] = "Le monde de Reeborg";
RUR.ui_fr["WORLD INFO"] = "Description";
RUR.ui_fr["EDITOR VISIBLE"] = "Garder l'éditeur visible";

RUR.ui_fr["apple"] = "pomme";
RUR.fr_to_en["pomme"] = "apple";
RUR.ui_fr["banana"] = "banane";
RUR.fr_to_en["banane"] = "banana";
RUR.ui_fr["beeper"] = "sonnette";
RUR.fr_to_en["sonnette"] = "beeper";
RUR.ui_fr["box"] = "boîte";
RUR.fr_to_en["boîte"] = "box";
RUR.ui_fr["bridge"] = "pont";
RUR.fr_to_en["pont"] = "bridge";
RUR.ui_fr["carrot"] = "carotte";
RUR.fr_to_en["carotte"] = "carrot";
RUR.ui_fr["daisy"] = "marguerite";
RUR.fr_to_en["marguerite"] = "daisy";
RUR.ui_fr["dandelion"] = "pissenlit";
RUR.fr_to_en["pissenlit"] = "dandelion";
RUR.ui_fr["leaf"] = "feuille";
RUR.fr_to_en["feuille"] = "leaf";
RUR.ui_fr["orange"] = "orange";
RUR.fr_to_en["orange"] = "orange";
RUR.ui_fr.square = "carré";
RUR.fr_to_en["carré"] = "square";
RUR.ui_fr.star = "étoile";
RUR.fr_to_en["étoile"] = "star";
RUR.ui_fr["strawberry"] = "fraise";
RUR.fr_to_en["fraise"] = "strawberry";
RUR.ui_fr.token = "jeton";
RUR.fr_to_en["jeton"] = "token";
RUR.ui_fr.triangle = "triangle";
RUR.fr_to_en["triangle"] = "triangle";
RUR.ui_fr["tulip"] = "tulipe";
RUR.fr_to_en["tulipe"] = "tulip";

RUR.ui_fr["Problem with onload code."] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";

RUR.ui_fr["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.ui_fr["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.ui_fr["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.ui_fr["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.ui_fr["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.ui_fr["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
RUR.ui_fr["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
RUR.ui_fr["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
RUR.ui_fr["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
RUR.ui_fr["Last instruction completed!"] = "Dernière instruction complétée!";
RUR.ui_fr["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";

RUR.ui_fr["Unknown object"] = "Objet inconnu: {obj}";
RUR.ui_fr["No object found here"] = "Pas d'objet '{obj}'' trouvé ici !";
RUR.ui_fr["object"] = "objet";
RUR.ui_fr["I don't have any object to put down!"] = "Je n'ai pas de '{obj}'!";
RUR.ui_fr["There is already a wall here!"] = "Il y a déjà un mur ici !";
RUR.ui_fr["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
RUR.ui_fr["Done!"] = "Terminé !";
RUR.ui_fr["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.ui_fr["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
RUR.ui_fr["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
RUR.ui_fr["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";

RUR.ui_fr.east = "est";
RUR.ui_fr.north = "nord";
RUR.ui_fr.west = "ouest";
RUR.ui_fr.south = "sud";
RUR.ui_fr["Unknown orientation for robot."] = "Orientation inconnue.";

RUR.ui_fr["World selected"] = "Monde {world} choisi";
RUR.ui_fr["Could not find world"] = "Je ne peux pas trouver {world}";
RUR.ui_fr["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";

RUR.ui_fr["Invalid world file."] = "Fichier monde invalide.";
RUR.ui_fr["Could not find link: "] = "Lien introuvable : ";

RUR.ui_fr["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
RUR.ui_fr["Added robot."] = "Reeborg ajouté.";
RUR.ui_fr["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
RUR.ui_fr["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
RUR.ui_fr["Click on world to add object."] = "Cliquez sur le monde pour ajouter des {obj}.";
RUR.ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
RUR.ui_fr["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
RUR.ui_fr["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
RUR.ui_fr["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
RUR.ui_fr["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
RUR.ui_fr["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' comme but.";
RUR.ui_fr["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
RUR.ui_fr[" is not a valid value!"] = " n'est pas une valeur valide!";
RUR.ui_fr["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' désiré à cet endroit.";
RUR.ui_fr["Objects found here:"] = "Objets trouvés ici:";
RUR.ui_fr["Description"] = "Description";
RUR.ui_fr["A robot located here carries no objects."] = "A robot situé à {x},{y} ne transporte aucun objet.";
RUR.ui_fr["A robot located here carries:"] = "Un robot situé à {x},{y} transporte:";
RUR.ui_fr["random location"] = "une position choisie au hasard";
RUR.ui_fr["Enter number of objects to give to robot."] = "Quel nombre de {obj} voulez-vous donner au robot?";
RUR.ui_fr["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
RUR.ui_fr["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: '{obj}'.";
RUR.ui_fr["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous ou sur le sélecteur de couleur.";
RUR.ui_fr["mud"] = "boue";
RUR.ui_fr["water"] = "eau";
RUR.ui_fr["grass"] = "gazon";
RUR.ui_fr["gravel"] = "gravier";
RUR.ui_fr["ice"] = "glace";
RUR.ui_fr["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
RUR.ui_fr["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
RUR.ui_fr["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
RUR.ui_fr["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
RUR.ui_fr["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
RUR.ui_fr["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
RUR.ui_fr["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
RUR.ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré.";
RUR.ui_fr["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
RUR.ui_fr["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
RUR.ui_fr["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
RUR.ui_fr["colour"] = "couleur";

RUR.ui_fr["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
RUR.ui_fr["No such world!"] = "Ce monde n'existe pas !";
RUR.ui_fr["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
RUR.ui_fr["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
RUR.ui_fr["Goal to achieve:"] = "Résultat désiré :";
RUR.ui_fr["Delete "] = "Effacer ";

RUR.ui_fr["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
RUR.ui_fr["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
RUR.ui_fr["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
RUR.ui_fr["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";
RUR.ui_fr["I cannot help you with this problem."] = "Je ne peux pas vous aider avec ce problème.";

RUR.ui_fr["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
RUR.ui_fr["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
RUR.ui_fr["I'm slipping on ice!"] = "Je glisse sur la glace!";
RUR.ui_fr["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et glissera à la prochaine case.";
RUR.ui_fr["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
RUR.ui_fr["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
RUR.ui_fr["I'm in water!"] = "Je suis dans l'eau!";
RUR.ui_fr["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
RUR.ui_fr["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.ui_fr["Crash!"] = "Crash!";
RUR.ui_fr["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
RUR.ui_fr["I hit a fence!"] = "J'ai frappé une clôture!";
RUR.ui_fr["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
RUR.ui_fr["Bridge:"] = "Pont: ";
RUR.ui_fr["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";

RUR.fr_to_en["pont"] = "bridge";
RUR.ui_fr["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
RUR.ui_fr["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.ui_fr["green home tile:"] = "tuile verte pour l'arrivée:";
RUR.ui_fr["home:"] = "la maison:";
RUR.ui_fr["racing flag:"] = "drapeau d'arrivée:";
RUR.ui_fr["house:"] = "maison:";

RUR.ui_fr["fence_right"] = "clôture";
RUR.ui_fr["fence_left"] = "clôture";
RUR.ui_fr["fence_double"] = "clôture";
RUR.ui_fr["fence_vertical"] = "clôture";

RUR.ui_fr["Local variables"] = "Variables locales";
RUR.ui_fr["Global variables"] = "Variables globales";
RUR.ui_fr["Watched expressions"] = "Watched expressions";

RUR.ui_fr["move forward"] = "avance";
RUR.ui_fr["turn left"] = "tourne à gauche";
RUR.ui_fr["take object"] = "prend l'objet";
RUR.ui_fr["put object"] = "dépose l'objet";
RUR.ui_fr["Pause the program's execution."] = "Pause l'exécution du programme.";
RUR.ui_fr["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
RUR.ui_fr["End the program's execution."] = "Termine l'exécution du programme.";
RUR.ui_fr["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
RUR.ui_fr["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
RUR.ui_fr["True if desired destination."] = "Vrai si c'est la destination désirée.";
RUR.ui_fr["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
RUR.ui_fr["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
RUR.ui_fr["True if robot is facing North."] = "Vrai se le robot est face au nord.";
RUR.ui_fr["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";

RUR.ui_fr["Save world in browser"] = "Sauvegarder le monde dans le navigateur";
RUR.ui_fr["Save permalink"] = "Sauvegarder le permalien";
RUR.ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
RUR.ui_fr["LOAD BLOCKLY"] = "Ouvrir un programme (blocs)";
RUR.ui_fr["LOAD BLOCKLY EXPLAIN"] = "Ouvre un fichier local et remplace les blocs (Blockly) par le contenu du fichier.";
RUR.ui_fr["LOAD EDITOR"] = "Ouvrir un programme";
RUR.ui_fr["LOAD EDITOR EXPLAIN"] = "Ouvre un fichier local et remplace le contenu de l'éditeur par le contenu du fichier.";
RUR.ui_fr["LOAD LIBRARY"] = "Importer une bibliothèque";
RUR.ui_fr["LOAD LIBRARY EXPLAIN"] = "Ouvre un fichier contenant un programme et remplace le contenu de la bibliothèque par le contenu du fichier choisi.";
RUR.ui_fr["LOAD WORLD"] = "Ouvrir un monde";
RUR.ui_fr["LOAD WORLD EXPLAIN"] = "Ouvre un monde à partir d'un fichier.";
RUR.ui_fr["SAVE BLOCKLY"] = "Sauvegarder les blocs.";
RUR.ui_fr["SAVE BLOCKLY EXPLAIN"] = "Sauvegarde le programme (blocs).";
RUR.ui_fr["SAVE EDITOR"] = "Sauvegarder le programme";
RUR.ui_fr["SAVE EDITOR EXPLAIN"] = "Sauvegarde le contenu de l'éditeur dans un fichier.";
RUR.ui_fr["SAVE LIBRARY"] = "Sauvegarder la bibliothèque";
RUR.ui_fr["SAVE LIBRARY EXPLAIN"] = "Sauvegarde le contenu de la bibliothèque dans un fichier.";
RUR.ui_fr["SAVE WORLD"] = "Sauvegarder le monde";
RUR.ui_fr["SAVE WORLD EXPLAIN"] = "Sauvegarde le monde dans un fichier (format json) sur votre ordinateur.";

RUR.ui_fr["ADD CONTENT TO WORLD"] = "Ajouter au monde le contenu des items indiqués ci-dessous.";
RUR.ui_fr["ADD BLOCKLY TEXT"] = "Blocs de code";
RUR.ui_fr["ADD EDITOR TEXT"] = "Code dans l'éditeur";
RUR.ui_fr["ADD LIBRARY TEXT"] = "Biblio";
RUR.ui_fr["ADD PRE TEXT"] = "Pre";
RUR.ui_fr["ADD POST TEXT"] = "Post";
RUR.ui_fr["ADD DESCRIPTION TEXT"] = "Description";
RUR.ui_fr["ADD ONLOAD TEXT"] = "Onload";

RUR.ui_fr["KEYBOARD BUTTON"] = "Clavier de Reeborg";
RUR.ui_fr["ADDITIONAL OPTIONS"] = "Autres options";

RUR.ui_fr["BASIC COMMANDS"] = "Commandes";
RUR.ui_fr["DEFINING"] = "Définitions";
RUR.ui_fr["LOOPS"] = "Boucles";
RUR.ui_fr["DECISIONS"] = "Décisions";
RUR.ui_fr["CONDITIONS"] = "Conditions";
RUR.ui_fr["USING VARIABLES"] = "Utiliser des variables";
RUR.ui_fr["COMMANDS"] = "Commandes";
RUR.ui_fr["OTHER"] = "Autres";
RUR.ui_fr["OBJECTS"] = "Objets";

RUR.ui_fr["Python Code"] = "Code Python";
RUR.ui_fr["Javascript Code"] = "Code Javascript";
RUR.ui_fr["LIBRARY"] = "biblio";
RUR.ui_fr["PRE"] = "Pre";
RUR.ui_fr["POST"] = "Post";
RUR.ui_fr["DESCRIPTION"] = "Desc.";
RUR.ui_fr["ONLOAD"] = "Onload";

RUR.ui_fr["HIGHLIGHT IMPOSSIBLE"] = "Un problème non-identifié avec votre code a fait en sorte que j'ai arrêté le surlignage du code dans l'éditeur.";
RUR.ui_fr["COMMAND RESULT"] = "Sélectionnez l'action à performer dans le menu ci-dessous.";

RUR.ui_fr["PERMALINK"] = "Permalien";
RUR.ui_fr["COPY"] = "Copier";
RUR.ui_fr["COPY PERMALINK EXPLAIN"] = "Copie le permalien dans le presse-papier.";
RUR.ui_fr["Save"] = "Sauvegarder";
RUR.ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
RUR.ui_fr["REPLACE PERMALINK"] = "Remplacer";
RUR.ui_fr["REPLACE PERMALINK EXPLAIN"] = "Remplacez le contenu ci-dessus par un nouveau permalien puis cliquez sur Remplacer.";
RUR.ui_fr["CANCEL"] = "Annuler";

RUR.ui_fr["DELETE WORLD TEXT"] = "En cliquant sur un bouton, éliminez un monde connu de la mémoire de votre nagivageur.";
RUR.ui_fr["PYTHON ONLY"] = "Python seulement";
RUR.ui_fr["COLLABORATION"] = "Collaboration";
RUR.ui_fr["TOGETHERJS EXPLAIN"] = "Outil qui permet la collaboration à distance en utilisant l'outil TogetherJS de Mozilla (interface en anglais seulement).";
RUR.ui_fr["WORLD CREATION TITLE"] = "Monde : édition, création, ...";
RUR.ui_fr["EDIT WORLD"] = "Édition du monde";
RUR.ui_fr["EDIT WORLD EXPLAIN"] = "Vous pouvez créer vos propres mondes en modifiant un monde existant.";
RUR.ui_fr["PROGRAM IN EDITOR"] = "Programme dans l'éditeur";
RUR.ui_fr["PROGRAM IN BLOCKLY WORKSPACE"] = "Programme de blocs";
RUR.ui_fr["SPECIAL EXECUTION"] = "Options d'exécution";
RUR.ui_fr["REVERSE STEP EXPLAIN"] = "Renverse l'instruction précédemment exécutée.";
RUR.ui_fr["ERASE TRACE"] = "Effacer la trace";
RUR.ui_fr["ERASE TRACE EXPLAIN"] = "Efface la trace laissée par Reeborg.  Ceci est utile pour permettre de se concentrer sur ce qui arrive lorsqu'on résume un programme après une pause.";
RUR.ui_fr["CONTACT"] = "Courriel :";
RUR.ui_fr["ISSUES"] = "Rapports de bogues, suggestions, autres problèmes, etc. (en anglais ou en français seulement).";
RUR.ui_fr["FORUM"] = "Forum de discussions (en anglais ou en français seulement).";
RUR.ui_fr["HELP"] = "Aide";
RUR.ui_fr["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/fr" target="_blank">Documentation</a>';
RUR.ui_fr["PYTHON HELP"] = "En utilisant Python, executez un programme avec <code>help()</code> pour obtenir une liste de commandes ou <code>help(avance)</code> pour obtenir de l'aide sur la fonction <code>avance()</code>, etc.";
RUR.ui_fr["KEYBOARD HELP"] = "Cliquez sur le clavier de Reeborg keyboard pour voir une liste des commandes, la syntaxe Python, etc.";

RUR.ui_fr["WORLD EDITOR"] = "Éditeur de monde";
RUR.ui_fr["m-east"] = "Est";
RUR.ui_fr["m-north"] = "Nord";
RUR.ui_fr["m-west"] = "Ouest";
RUR.ui_fr["m-south"] = "Sud";
RUR.ui_fr["m-random"] = "Aléatoire";
RUR.ui_fr["m-dimensions"] = "Taille du monde";
RUR.ui_fr["m-add"] = "Ajouter";
RUR.ui_fr["m-add-robot"] = "Ajouter Reeborg";
RUR.ui_fr["m-robot"] = "Robot";
RUR.ui_fr["m-position"] = "Position(s)";
RUR.ui_fr["m-turn"] = "Orientation";
RUR.ui_fr["m-objects"] = "Objets";
RUR.ui_fr["m-walls"] = "Murs";
RUR.ui_fr["m-objects2"] = "Objets";
RUR.ui_fr["m-tiles"] = "Tuiles";
RUR.ui_fr["m-fill"] = "Remplir";
RUR.ui_fr["m-solid"] = "Objets solides";
RUR.ui_fr["m-decorative"] = "Objets décoratifs";
RUR.ui_fr["m-background"] = "Image de fond";
RUR.ui_fr["m-goal"] = "But";
RUR.ui_fr["mg-robot"] = "Robot";
RUR.ui_fr["mg-walls"] = "Murs";
RUR.ui_fr["mg-objects"] = "Objets";

RUR.ui_fr["Reeborg says: I'm done!"] = "Reeborg dit : J'ai fini !";
RUR.ui_fr["Reeborg writes:"] = "Reeborg écrit :";
RUR.ui_fr["Reeborg shouts: Something is wrong!"] = "Reeborg crie: Quelque chose ne va pas !";
RUR.ui_fr["Reeborg explores some Javascript code"] = "Reeborg explore le code Javascript";
RUR.ui_fr["Reeborg states:"] = "Reeborg informe :";
RUR.ui_fr["Reeborg watches some variables!"] = "Reeborg observe des variables !";
RUR.ui_fr["Click on the world to get some additional information."] = "Cliquez sur le monde pour obtenir de l'information supplémentaire.";

RUR.ui_fr["Reeborg's basic keyboard"] = "Le clavier spécial de Reeborg";
RUR.ui_fr["kbd-command-btn"] = "Commandes";
RUR.ui_fr["kbd-condition-btn"] = "Conditions";
RUR.ui_fr["kbd-python-btn"] = "Python";
RUR.ui_fr["kbd-py-console-btn"] = "Python";
RUR.ui_fr["kbd-javascript-btn"] = "Javascript";
RUR.ui_fr["kbd-objects-btn"] = "Objets";
RUR.ui_fr["kbd-special-btn"] = "Spécial";

RUR.ui_fr["UNDO"] = "RENVERSER";
RUR.ui_fr["REDO"] = "REFAIRE";
RUR.ui_fr["tab"] = "TAB";
RUR.ui_fr["shift-tab"] = "Maj-TAB";
RUR.ui_fr["enter"] = "\u23CE";
RUR.ui_fr["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> n'est pas un véritable mot-clé Python.";

RUR.ui_fr["Colour:"] = "Couleur :";
RUR.ui_fr["Enter a colour"] = "Spécifiez une couleur";

RUR.ui_fr["Background image"] = "Image de fond";

RUR.ui_fr["NAME:"] = "Nom :";
RUR.ui_fr["Save world in browser"] = "Mémoriser une copie du monde";


RUR.ui_fr["Set the world's dimensions"] = "Dimensions du monde";
RUR.ui_fr["set-dimensions-explain"] = "Vous pouvez changer les dimensions (hauteur et largeur) du monde. Rappelez-vous que les mondes très grands pourraient être difficile à visualiser sur des écrans plus petits.";
RUR.ui_fr["Maximum x value:"] = "Valeur maximale pour 'x'";
RUR.ui_fr["Maximum y value:"] = "Valeur maximale pour 'y'";
RUR.ui_fr["Use small tiles"] = "Utilisez une petite grille";

RUR.ui_fr["Set goal number for object"] = "Nombre d'objets désirés";
RUR.ui_fr["dialog-goal-object-explain"] = "Cliquez sur la case à cocher si vous désirez que le nombre d'objet soit égal au nombre total d'objet de ce genre présent dans le monde au tout début.";
RUR.ui_fr["Number of objects"] = "Nombre d'objets";
RUR.ui_fr["All such objects"] = "Tous les objets de ce genre";

RUR.ui_fr["Number of objects:"] = "Nombre d'objets :";
RUR.ui_fr["Maximum:"] = "Maximum :";
RUR.ui_fr["Add object in the world"] = "Modifier le nombre d'objets";
RUR.ui_fr["ADD OBJECT EXPLAIN"] = "Choisissez la valeur zéro pour ne pas avoir un tel objet à cet endroit. Si <code>Maximum</code> a une valeur supérieure à <code>Nombre d'objets</code> alors un nombre aléatoire d'objets, entre ces deux valeurs, sera choisi au tout début de l'exécution d'un programme.";

RUR.ui_fr["Unlimited:"] = "Nombre illimité ";
RUR.ui_fr["Give object to robot"] = "Donner des objets à Reeborg";
RUR.ui_fr["GIVE OBJECT EXPLAIN"] = "Choisissez un nombre d'objects que Reeborg aura en sa possession au début du programme. Cliquez sur la case à cocher si vous voulez un nombre illimité.";

RUR.ui_fr["UPDATE EDITOR CONTENT"] = "Ce monde inclus un contenu pour l'éditeur qui est différent de celui qui s'y trouve présentement. Pour remplacer le contenu de l'éditeur par celui défini par le monde, cliquez sur le bouton.";
RUR.ui_fr["UPDATE EDITOR BUTTON"] = "Remplacer le contenu de l'éditeur";
RUR.ui_fr["UPDATE LIBRARY CONTENT"] = "Ce monde inclus un contenu pour la bibliothèque qui est différent de celui qui s'y trouve présentement. Pour remplacer le contenu de la bibliothèque par celui défini par le monde, cliquez sur le bouton.";
RUR.ui_fr["UPDATE LIBRARY BUTTON"] = "Remplacer le contenu de la bibliothèque";
RUR.ui_fr["UPDATE BLOCKLY CONTENT"] = "Ce monde inclus des blocs différents de ceux qui s'y trouvent présentement. Pour remplacer les blocs présents par ceux définis par le monde, cliquez sur le bouton.";
RUR.ui_fr["UPDATE BLOCKLY BUTTON"] = "Remplacer les blocs";
RUR.ui_fr["Contents from World"] = "Remplacement de contenus";

},{}],92:[function(require,module,exports){
RUR.ui_ko = {};
RUR.ko_to_en = {};

RUR.ui_ko["ko-en"] = "혼용된 모드: 사용자 환경은 한국어로 번역되어 있지만, 프로그래밍 언어는 영어로 이루어져 있습니다. <br>" +
 "Mixed mode: User Interface in Korean; programming language in English.<br>";

RUR.ui_ko["SITE NAME"] = "리보그의 세상";
RUR.ui_ko["WORLD INFO"] = "월드 정보";
RUR.ui_ko["EDITOR VISIBLE"] = "에디터 유지하기";


RUR.ui_ko["apple"] = "사과";
RUR.ko_to_en["사과"] = "apple";
RUR.ui_ko["banana"] = "바나나";
RUR.ko_to_en["바나나"] = "banana";
RUR.ui_ko["beeper"] = "beeper";
RUR.ko_to_en["beeper"] = "beeper";
RUR.ui_ko["box"] = "상자";
RUR.ko_to_en["상자"] = "box";
RUR.ui_ko["bridge"] = "다리";
RUR.ko_to_en["다리"] = "bridge";
RUR.ui_ko["carrot"] = "당근";
RUR.ko_to_en["당근"] = "carrot";
RUR.ui_ko["daisy"] = "데이지 꽃";
RUR.ko_to_en["데이지 꽃"] = "daisy";
RUR.ui_ko["dandelion"] = "민들레";
RUR.ko_to_en["민들레"] = "dandelion";
RUR.ui_ko["leaf"] = "잎";
RUR.ko_to_en["잎"] = "leaf";
RUR.ui_ko["orange"] = "귤";
RUR.ko_to_en["귤"] = "orange";
RUR.ui_ko.square = "사각형";
RUR.ko_to_en["사각형"] = "square";
RUR.ui_ko.star = "별";
RUR.ko_to_en["별"] = "star";
RUR.ui_ko["strawberry"] = "딸기";
RUR.ko_to_en["딸기"] = "strawberry";
RUR.ui_ko.token = "토큰";
RUR.ko_to_en["토큰"] = "token";
RUR.ui_ko.triangle = "삼각형";
RUR.ko_to_en["삼각형"] = "triangle";
RUR.ui_ko["tulip"] = "튤립";
RUR.ko_to_en["튤립"] = "tulip";

RUR.ui_ko["Problem with onload code."] = "유효하지 않은 자바스크립트 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";

RUR.ui_ko["Too many steps:"] = "너무 많은 steps: {max_steps}";
RUR.ui_ko["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>리보그는 올바른 x 위치에 있습니다. </li>";
RUR.ui_ko["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>리보그는 잘못된 x 위치에 있습니다. </li>";
RUR.ui_ko["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>리보그는 올바른 y 위치에 있습니다. </li>";
RUR.ui_ko["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>리보그는 잘못된 y 위치에 있습니다. </li>";
RUR.ui_ko["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>모든 객체가 올바른 위치에 있습니다. </li>";
RUR.ui_ko["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>하나 이상의 객체가 올바른 위치에 있지 않습니다.</li>";
RUR.ui_ko["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>모든 벽은 제대로 지어지고 있습니다. </li>";
RUR.ui_ko["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>하나 이상의 벽이 빠지거나 잘못된 위치에서 건설됐습니다/li>";
RUR.ui_ko["Last instruction completed!"] = "마지막 명령이 완료됐습니다!";
RUR.ui_ko["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>명령 <code>done()</code> 실행.</p>";

RUR.ui_ko["Unknown object"] = "알 수 없는 객체: {obj}";
RUR.ui_ko["No object found here"] = "여기서 {obj} 를 찾을 수 없어요!";
RUR.ui_ko["object"] = "객체";
RUR.ui_ko["I don't have any object to put down!"] = "나는 집어넣을 {obj} 가 없어요!";
RUR.ui_ko["There is already a wall here!"] = "벽이 여기에 이미 있어요!";
RUR.ui_ko["Ouch! I hit a wall!"] = "아으, 아파요! 저는 벽을 부딪혔어요!";
RUR.ui_ko["Done!"] = "끝!";
RUR.ui_ko["There is no position as a goal in this world!"] = "위치에 대한 목표가 없어요!";
RUR.ui_ko["There is no goal in this world!"] = "이 월드는 목표가 없어요.";
RUR.ui_ko["I carry too many different objects. I don't know which one to put down!"] = "저는 너무 많은 다른 객체들을 싣고 있어요. 저는 이중 어떤 걸 내려놓을지 모르겠어요!";
RUR.ui_ko["Many objects are here; I do not know which one to take!"] = "많은 객체가 여기에 있어요; 저는 그 중 어떤 걸 가져갈지 모르겠어요!";

RUR.ui_ko.east = "동쪽";
RUR.ui_ko.north = "북쪽";
RUR.ui_ko.west = "서쪽";
RUR.ui_ko.south = "남쪽";
RUR.ui_ko["Unknown orientation for robot."] = "로봇의 방향을 알 수 없습니다.";

RUR.ui_ko["World selected"] = "월드 {world} 가 선택되었습니다";
RUR.ui_ko["Could not find world"] = "월드를 찾을 수 없습니다. {world}";
RUR.ui_ko["Object names"] = " 라이브러리, 토큰, 별, 삼각형, 사각형, 등.";

RUR.ui_ko["Invalid world file."] = "유효하지 않은 월드 파일.";
RUR.ui_ko["Could not find link: "] = "링크를 찾을 수 없습니다: ";

RUR.ui_ko["Click on world to move robot."] = "월드를 클릭해서 추가하거나 시작 가능한 리보그 위치를 제거합니다.";
RUR.ui_ko["Added robot."] = "리보그 추가됨.";
RUR.ui_ko["Click on image to turn robot"] = "리보그를 회전하기 위해 이미지를 클릭하세요.";
RUR.ui_ko["Robot now has tokens."] = "이제 리보그는 {x_tokens} 토근을 가지고 있습니다.";
RUR.ui_ko["Click on world to add object."] = "{obj} 의 수를 설정하기 위해 월드를 클릭하세요.";
RUR.ui_ko["Click on desired object below."] = "아래에서 원하는 개체를 클릭합니다.";
RUR.ui_ko["Click on world to toggle walls."] = "벽을 달기 위해 월드를 클락하세요.";
RUR.ui_ko["Click on world to set home position for robot."] = "로봇의 최종위치를 정하기 위해 월드를 클릭하세요.";
RUR.ui_ko["Click on world to toggle additional walls to build."] = "추가로 벽을 달기 위해 월드를 클릭하세요.";
RUR.ui_ko["Click on desired goal object below."] = "아래에서 원하는 목표 객체를 클릭하세요.";
RUR.ui_ko["Click on world to set number of goal objects."] = "{obj}의 목표를 설정하기 위해 객체를 클릭하세요.";
RUR.ui_ko["Enter number of tokens for robot to carry (use inf for infinite number)"] = "싣고 갈 토큰의 수를 입력하세요.";
RUR.ui_ko[" is not a valid value!"] = " 유효하지 않은 값입니다!";
RUR.ui_ko["Enter number of objects desired at that location."] = "{obj} 의 수를 설정하기 위해 월드를 클릭하세요.";
RUR.ui_ko["Objects found here:"] = "객체를 여기서 찾음:";
RUR.ui_ko["Description"] = "설명";
RUR.ui_ko["A robot located here carries no objects."] = "로봇은 {x},{y}에 위치해 있고 싣고 있는 객체는 없습니다.";
RUR.ui_ko["Goal to achieve:"] = "목표 달성:";
RUR.ui_ko["A robot located here carries:"] = "로봇은 {x},{y}에 위치해 있습니다. 싣고 있는 객체:";
RUR.ui_ko["random location"] = "무작위 위치";
RUR.ui_ko["Enter number of objects to give to robot."] = "로봇에게 주기 위해 {obj} 의 수를 입력하세요..";
RUR.ui_ko["Special information about this location:"] = "이 위치에 대한 특별한 정보:";
RUR.ui_ko["Click on world to toggle tile."] = "{obj} 타일을 달기 위해 월드를 클릭하세요.";
RUR.ui_ko["Click on desired tile below."] = "아래에서 원하는 타일을 클릭합니다. (or color selector)";
RUR.ui_ko["mud"] = "진흙";
RUR.ui_ko["water"] = "물";
RUR.ui_ko["grass"] = "잔디";
RUR.ui_ko["gravel"] = "자갈";
RUR.ui_ko["ice"] = "얼음";
RUR.ui_ko["A wall must be built east of this location."] = "벽은 이 위치의 동쪽에 지어져야 합니다.";
RUR.ui_ko["A wall must be built north of this location."] = "벽은 이 위치의 북쪽에 지어져야 합니다.";
RUR.ui_ko["A wall must be built west of this location."] = "벽은 이 위치의 서쪽에 지어져야 합니다.";
RUR.ui_ko["A wall must be built south of this location."] = "벽은 이 위치의 남쪽에 지어져야 합니다.";
RUR.ui_ko["The final required position of the robot will be chosen at random."] = "로봇의 마지막으로 필요한 위치가 무작위로 선택됩니다.";
RUR.ui_ko["The final position of the robot must be (x, y) = "] = "로봇의 최종위치는 반드시 (x, y) = ";
RUR.ui_ko["Click on world to fill with given tile."] = "주어진 타일을 채우기 위해 월드를 클릭합니다.";
RUR.ui_ko["Click on desired object below."] = "아래에서 원하는 객체를 클릭합니다.";
RUR.ui_ko["Enter url of image to use as background."] = "배경화면으로 쓰일 이미지나 이미지 주소를 입력해 주세요.";
RUR.ui_ko["Replace editor content"] = "당신의 이 월드의 제작자에 의해 제공되는 에디터 코드를 대체 하고 싶나요?";
RUR.ui_ko["Replace library content"] = "당신은 이 월드의 제작자에 의해 제공되는 라이브러리 코드를 대체 하고 싶나요?";
RUR.ui_ko["colour"] = "색";

RUR.ui_ko["Name already exist; confirm that you want to replace its content."] = "이름이 이미 존재합니다; 당신이 내용을 교체하고 싶으면 확인합니다.";
RUR.ui_ko["No such world!"] = "월드가 존재하지 않습니다!";
RUR.ui_ko["Enter world name to save"] = "월드를 저장하기 위해 월드 이름을 입력해주세요; 사용될 이름: ";
RUR.ui_ko["Enter world name to delete"] = "월드를 삭제하기 위해 월드 이름을 입력 해주세요; 기존 세계: ";
RUR.ui_ko["Delete "] = "삭제 ";

RUR.ui_ko["Error found at or near line {number}."] = "오류를 발견했습니다 혹은 라인 근처에서 발견됬습니다. : {number}.";
RUR.ui_ko["<br>Perhaps a missing colon is the cause."] = "<br>아마도 콜론(:)을 놓쳐서 문제가 발생했을 겁니다.";
RUR.ui_ko["<br>Perhaps you forgot to add parentheses ()."] = "<br>아마도 당신은 괄호를 추가하는 것을 잊어버렸을 겁니다 ().";
RUR.ui_ko["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>아마도 당신은 단어의 철자나 함수를 정의하는것을 잊었거나 변수를 까먹었을 겁니다.";
RUR.ui_ko["I cannot help you with this problem."] = "I cannot help you with this problem.";

RUR.ui_ko["I'm stuck in mud."] = "난 진흙에 걸렸어요.";
RUR.ui_ko["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "진흙: 리보그는 이것을 탐지 <b>하지 못하고<b> 이 위치로 이동하게 되면 걸리게 됩니다.";
RUR.ui_ko["I'm slipping on ice!"] = "저는 얼음에 미끄러지고 있어요!";
RUR.ui_ko["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "얼음: 리보그는 이것을 탐지 <b>하지 못하고</b> 만약 이 위치로 이동하게 되면 미끄러지고 다음 위치로 이동하게 됩니다.";
RUR.ui_ko["Grass: usually safe."] = "잔디: 보통 안전함.";
RUR.ui_ko["Gravel: usually safe."] = "자갈: 보통 안전함.";
RUR.ui_ko["I'm in water!"] = "난 물 속에 있어요!";
RUR.ui_ko["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "물: 리보그는 이것을 탐지 할 수 <b>있지만</b> 이 위치로 이동하는 경우 상처를 입히게 됩니다.";
RUR.ui_ko["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green_home_tile: 리보그는 at_goal 를 사용하면 이 타일을 감지 할 수 <b>있어요<b>.";
RUR.ui_ko["Crash!"] = "Crash!";
RUR.ui_ko["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "벽돌 벽: 리보그는 이것을 탐지 할 수 있지만 만약 벽돌 벽으로 간다면 자신을 다치게 합니다.";
RUR.ui_ko["I hit a fence!"] = "I hit a fence!";
RUR.ui_ko["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "울타리: 리보그는 이것을  <b>can</b> 탐지 할 수 있지만 그것에 의해 중지됩니다.";
RUR.ui_ko["Bridge:"] = "Bridge: ";
RUR.ui_ko["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "리보그는 이것을 탐지 할 수 <b>있으며</b> 이 물 위에서 안전한 통행을 허용하는것을 알게 될 것입니다.";

RUR.ui_ko["Something is blocking the way!"] = "뭔가가 길을 막고 있어요!";
RUR.ui_ko["Reeborg <b>can</b> detect this tile using at_goal()."] = "리보그는 at_goal() 를 사용해서 탐지 할 수 <b>있어요</b>.";
RUR.ui_ko["green home tile:"] = "초록색 홈 타일:";
RUR.ui_ko["home:"] = "홈:";
RUR.ui_ko["racing flag:"] = "레이싱 깃발:";
RUR.ui_ko["house:"] = "집:";

RUR.ui_ko["fence_right"] = "울타리";
RUR.ui_ko["fence_left"] = "울타리";
RUR.ui_ko["fence_double"] = "울타리";
RUR.ui_ko["fence_vertical"] = "울타리";

RUR.ui_ko["Local variables"] = "지역 변수";
RUR.ui_ko["Global variables"] = "전역 변수";
RUR.ui_ko["Watched expressions"] = "문장 결과 보기";

RUR.ui_ko["move forward"] = "앞으로 움직이기";
RUR.ui_ko["turn left"] = "왼쪽으로 움직이기";
RUR.ui_ko["take object"] = "객체 가지기";
RUR.ui_ko["put object"] = "객체 넣기";
RUR.ui_ko["Pause the program's execution."] = "프로그램 일시 정지.";
RUR.ui_ko["Build a wall in front of the robot."] = "벽을 로봇 앞에 짓기.";
RUR.ui_ko["End the program's execution."] = "프로그램 실행 종료.";
RUR.ui_ko["True if a wall is blocking the way."] = "벽이 길을 막고 있는 경우가 사실이라면.";
RUR.ui_ko["True if nothing is blocking the way."] = "아무것도 차단 하지 않는 경우가 사실이라면.";
RUR.ui_ko["True if desired destination."] = "원하는 목적지가 있는 경우가 사실이라면";
RUR.ui_ko["True if robot carries at least one object."] = "로봇이 적어도 하나의 객체를 싣고 있는 경우가 사실이라면.";
RUR.ui_ko["True if there is at least one object here."] = "적어도 하나의 객체가 여기에 있는 경우가 사실이라면.";
RUR.ui_ko["True if robot is facing North."] = "만약 로봇이 북쪽을 바라보고 있는 경우가 사실이라면.";
RUR.ui_ko["Delay between actions; default is 300 ms."] = "행동을 지연시킵니다; 기본값은 300 밀리초.";

RUR.ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";
RUR.ui_ko["Save permalink"] = "퍼머 저장";
RUR.ui_ko["Save permalink explanation"] = "파일의 퍼머링크 복사본을 저장하기";
RUR.ui_ko["LOAD BLOCKLY"] = "프로그램(블럭들)을 파일에서 불러오기";
RUR.ui_ko["LOAD BLOCKLY EXPLAIN"] = "로컬 파일을 열고 Blockly 작업공간의 요소 대신에 이 요소를 사용합니다";
RUR.ui_ko["LOAD EDITOR"] = "파일로 불러오기";
RUR.ui_ko["LOAD EDITOR EXPLAIN"] = "로컬 저장소에서 소스코드 불러오기";
RUR.ui_ko["LOAD LIBRARY"] = "파일에서 라이브러리를 가져오기";
RUR.ui_ko["LOAD LIBRARY EXPLAIN"] = "파일을 열고 라이브러리의 컨텐츠를 지금 사용합니다.";
RUR.ui_ko["LOAD WORLD"] = "파일로 불러오기";
RUR.ui_ko["LOAD WORLD EXPLAIN"] = "컴퓨터안의 파일로 월드를 불러오기";
RUR.ui_ko["SAVE BLOCKLY"] = "Save program to file";
RUR.ui_ko["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file.";
RUR.ui_ko["SAVE EDITOR"] = "파일로 저장";
RUR.ui_ko["SAVE EDITOR EXPLAIN"] = "에디터 소스코드 저장";
RUR.ui_ko["SAVE LIBRARY"] = "라이브러리 저장";
RUR.ui_ko["SAVE LIBRARY EXPLAIN"] = "파일 라이브러리의 내용 저장";
RUR.ui_ko["SAVE WORLD"] = "파일로 저장";
RUR.ui_ko["SAVE WORLD EXPLAIN"] = "(json 확장자) 월드를 컴퓨터에 저장";

RUR.ui_ko["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
RUR.ui_ko["ADD BLOCKLY TEXT"] = "Code blocks";
RUR.ui_ko["ADD EDITOR TEXT"] = "Code in editor";
RUR.ui_ko["ADD LIBRARY TEXT"] = "Library";
RUR.ui_ko["ADD PRE TEXT"] = "Pre";
RUR.ui_ko["ADD POST TEXT"] = "Post";
RUR.ui_ko["ADD DESCRIPTION TEXT"] = "Description";
RUR.ui_ko["ADD ONLOAD TEXT"] = "Onload";

RUR.ui_ko["KEYBOARD BUTTON"] = "리보그의 키보드";
RUR.ui_ko["ADDITIONAL OPTIONS"] = "추가 설정";

RUR.ui_ko["BASIC COMMANDS"] = "기본적인 명령어";
RUR.ui_ko["DEFINING"] = "정의";
RUR.ui_ko["LOOPS"] = "루프";
RUR.ui_ko["DECISIONS"] = "결정";
RUR.ui_ko["CONDITIONS"] = "상태";
RUR.ui_ko["USING VARIABLES"] = "변수 사용하기";
RUR.ui_ko["COMMANDS"] = "명령어들";
RUR.ui_ko["OTHER"] = "그 외";
RUR.ui_ko["OBJECTS"] = "객체들";

RUR.ui_ko["Python Code"] = "파이썬 코드";
RUR.ui_ko["Javascript Code"] = "자바스크립트 코드";
RUR.ui_ko["LIBRARY"] = "라이브러리";
RUR.ui_ko["PRE"] = "전에";
RUR.ui_ko["POST"] = "후";
RUR.ui_ko["DESCRIPTION"] = "월드 정보";
RUR.ui_ko["ONLOAD"] = "Onload";

RUR.ui_ko["HIGHLIGHT IMPOSSIBLE"] = "구문 강조를 꺼서 문제가 발생했습니다.";
RUR.ui_ko["COMMAND RESULT"] = "아래 메뉴에서 수행할 작업을 선택합니다.";

RUR.ui_ko["PERMALINK"] = "퍼머링크";
RUR.ui_ko["COPY"] = "복사";
RUR.ui_ko["COPY PERMALINK EXPLAIN"] = "퍼머링크를 클립보드로 복사하기.";
RUR.ui_ko["Save"] = "저장";
RUR.ui_ko["Save permalink explanation"] = "퍼머링크의 복사본을 파일로 저장합니다.";
RUR.ui_ko["REPLACE PERMALINK"] = "되돌리기";
RUR.ui_ko["REPLACE PERMALINK EXPLAIN"] = "위의 내용을 퍼머링크로 교체하고 교체를 클릭합니다.";
RUR.ui_ko["CANCEL"] = "취소";

RUR.ui_ko["DELETE WORLD TEXT"] = "버튼을 클릭하면 브라우져의 메모리에 저장된 월드를 제거합니다:";
RUR.ui_ko["PYTHON ONLY"] = "파이썬 전용";
RUR.ui_ko["COLLABORATION"] = "협업";
RUR.ui_ko["TOGETHERJS EXPLAIN"] = "다른 사용자는 Mozilla의 TogetherJS를 이용하여 협업에 참여 할 수 있습니다.";
RUR.ui_ko["WORLD CREATION TITLE"] = "월드 : 창조, 수정..";
RUR.ui_ko["EDIT WORLD"] = "월드 수정";
RUR.ui_ko["EDIT WORLD EXPLAIN"] = "기존 월드를 수정하여 자신 만의 월드를 만들 수 있습니다.";
RUR.ui_ko["PROGRAM IN EDITOR"] = "에디터";
RUR.ui_ko["PROGRAM IN BLOCKLY WORKSPACE"] = "blockly 작업 공간 프로그램";
RUR.ui_ko["SPECIAL EXECUTION"] = "미래에 생겨날 기능";
RUR.ui_ko["REVERSE STEP EXPLAIN"] = "이전 실행 상태를 되돌립니다.";
RUR.ui_ko["ERASE TRACE"] = "흔적 지우기";
RUR.ui_ko["ERASE TRACE EXPLAIN"] = "흔적을 리보그만 남기고 지웁니다. 이 기능은 프로그램이 멈추었을때 유용합니다.";
RUR.ui_ko["CONTACT"] = "(English/French only) 이메일:";
RUR.ui_ko["ISSUES"] = "버그 제보, 건의 그외 문제 등. (영어/프랑스어만 됨)";
RUR.ui_ko["FORUM"] = "토론 포럼 (영어/프랑스어만 됨";
RUR.ui_ko["HELP"] = "도움말";
RUR.ui_ko["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/ko" target="_blank">Documentation (참고 문서)</a>';
RUR.ui_ko["PYTHON HELP"] = "파이썬을 사용해서, <code>help()</code>를 실행해서 명령어의 목록을 얻으세요 또는 <code>help(함수명)</code>으로 해당 <code>함수명()</code>의 정보를 확인할 수 있습니다. 예를 들어, <code>help(move)</code>로 <code>move</code>함수의 정보를 얻을 수 있습니다.";
RUR.ui_ko["KEYBOARD HELP"] = "리보그의 키보드를 클릭해서 파이썬 키워드 등, 사용할수 있는 명령어의 목록을 보세요.";

RUR.ui_ko["WORLD EDITOR"] = "월드 편집기";
RUR.ui_ko["m-east"] = "동쪽";
RUR.ui_ko["m-north"] = "북쪽";
RUR.ui_ko["m-west"] = "서쪽";
RUR.ui_ko["m-south"] = "남쪽";
RUR.ui_ko["m-random"] = "랜덤";
RUR.ui_ko["m-dimensions"] = "월드 크기";
RUR.ui_ko["m-add"] = "추가";
RUR.ui_ko["m-add-robot"] = "로봇 추가";
RUR.ui_ko["m-robot"] = "로봇";
RUR.ui_ko["m-position"] = "위치(들)";
RUR.ui_ko["m-turn"] = "회전";
RUR.ui_ko["m-objects"] = "객체";
RUR.ui_ko["m-walls"] = "벽";
RUR.ui_ko["m-objects2"] = "객체";
RUR.ui_ko["m-tiles"] = "타일들";
RUR.ui_ko["m-fill"] = "체우기";
RUR.ui_ko["m-solid"] = "특정 객체";
RUR.ui_ko["m-decorative"] = "꾸미기용 객체";
RUR.ui_ko["m-background"] = "배경 사진";
RUR.ui_ko["m-goal"] = "목표";
RUR.ui_ko["mg-robot"] = "로봇";
RUR.ui_ko["mg-walls"] = "벽";
RUR.ui_ko["mg-objects"] = "객체";

RUR.ui_ko["Reeborg says: I'm done!"] = "리보그 : 다했어요";
RUR.ui_ko["Reeborg writes:"] = "리보그 쓰기:";
RUR.ui_ko["Reeborg shouts: Something is wrong!"] = "리보그 : 뭔가가 잘못 됬어요!";
RUR.ui_ko["Reeborg explores some Javascript code"] = "리보그는 일부 자바스크립트 코드를 조사했습니다";
RUR.ui_ko["Reeborg states:"] = "리보그 상태:";
RUR.ui_ko["Reeborg watches some variables!"] = "리보그는 몇가지의 변수를 보고 있습니다!";
RUR.ui_ko["Click on the world to get some additional information."] = "추가 정보를 얻기 위해 월드를 클릭합니다.";

RUR.ui_ko["Reeborg's basic keyboard"] = "리보그의 기본적인 키보드";
RUR.ui_ko["kbd-command-btn"] = "명령어";
RUR.ui_ko["kbd-condition-btn"] = "상태";
RUR.ui_ko["kbd-python-btn"] = "파이썬";
RUR.ui_ko["kbd-py-console-btn"] = "파이썬";
RUR.ui_ko["kbd-javascript-btn"] = "자비스크립트";
RUR.ui_ko["kbd-objects-btn"] = "객체";
RUR.ui_ko["kbd-special-btn"] = "특수키";

RUR.ui_ko["UNDO"] = "되돌리기";
RUR.ui_ko["REDO"] = "다시 실행";
RUR.ui_ko["tab"] = "TAB";
RUR.ui_ko["shift-tab"] = "Shift-TAB";
RUR.ui_ko["enter"] = "\u23CE";
RUR.ui_ko["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>는 여기에서만 작동하는 파이썬 키워드입니다.";

RUR.ui_ko["Colour:"] = "색상:";
RUR.ui_ko["Enter a colour"] = "색상을 입력하세요";

RUR.ui_ko["Background image"] = "배경 이미지";

RUR.ui_ko["NAME:"] = "이름:";
RUR.ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";


RUR.ui_ko["Set the world's dimensions"] = "월드의 크기를 조절하세요";
RUR.ui_ko["set-dimensions-explain"] = "원하는 경우 월드의 기본 크기를 다르게 설정할 수 있습니다. 작은 해상도의 화면은 매우 큰 세계를 볼수 없음을 기억하세요.";
RUR.ui_ko["Maximum x value:"] = "최대 x 값:";
RUR.ui_ko["Maximum y value:"] = "최대 y 값:";
RUR.ui_ko["Use small tiles"] = "작은 타일 사용하기";

RUR.ui_ko["Set goal number for object"] = "객체의 목표 수를 설정합니다.";
RUR.ui_ko["dialog-goal-object-explain"] = "체크박스를 클릭하세요. 월드가 시작될때 당신의 원하는 객체의 모든 숫자가 보입니다.";
RUR.ui_ko["Number of objects"] = "객체의 수:";
RUR.ui_ko["All such objects"] = "모든 종류의 객체";

RUR.ui_ko["Number of objects:"] = "객체의 수:";
RUR.ui_ko["Maximum:"] = "최대 값:";
RUR.ui_ko["Add object in the world"] = "Set number of object";
RUR.ui_ko["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

RUR.ui_ko["Unlimited:"] = "Unlimited:";
RUR.ui_ko["Give object to robot"] = "Give object to robot";
RUR.ui_ko["GIVE OBJECT EXPLAIN"] = "로봇이 운반 할 객체의 수를 고르세요. 더 많은 수를 원한다면 체크박스를 클릭하세요.";

RUR.ui_ko["UPDATE EDITOR CONTENT"] = "This world has some default content for the editor. To replace the current content of your editor, click on the button";
RUR.ui_ko["UPDATE EDITOR BUTTON"] = "Replace editor content";
RUR.ui_ko["UPDATE LIBRARY CONTENT"] = "This world has some default content for the library. To replace the current content of your library, click on the button";
RUR.ui_ko["UPDATE LIBRARY BUTTON"] = "Replace library content";
RUR.ui_ko["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
RUR.ui_ko["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
RUR.ui_ko["Contents from World"] = "Contents from World";

},{}]},{},[18]);
